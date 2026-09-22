import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { OpenKilnPage } from "~/modules/open-kiln/OpenKilnPage";

function search(value: string) {
  fireEvent.change(screen.getByLabelText("Manifest ID"), { target: { value } });
  fireEvent.click(screen.getByRole("button", { name: "Verify record" }));
}

describe("Open Kiln visitor journeys", () => {
  it("explains empty searches and opens a sample with a real evidence gap", async () => {
    render(<OpenKilnPage />);
    fireEvent.click(screen.getByRole("button", { name: "Verify record" }));
    expect(screen.getByRole("alert")).toHaveTextContent("Enter a manifest id");
    expect(screen.getByLabelText("Manifest ID")).toHaveFocus();
    search("OK-DEMO-003");
    fireEvent.click(screen.getByRole("button", { name: "View evidence" }));
    const dialog = screen.getByRole("dialog");
    expect(within(dialog).getByText("Completed")).toBeInTheDocument();
    expect(within(dialog).getByText("Evidence partial")).toBeInTheDocument();
    const evidenceTab = within(dialog).getByRole("tab", { name: "Evidence" });
    fireEvent.mouseDown(evidenceTab, { button: 0, ctrlKey: false });
    fireEvent.click(evidenceTab);
    fireEvent.focus(evidenceTab);
    await waitFor(() => expect(within(dialog).getByText("Not available")).toBeInTheDocument());
    expect(within(dialog).getByText(/monitoring summary has not been published/)).toBeInTheDocument();
  });
  it("keeps processing dates absent and retains publication revisions", () => {
    render(<OpenKilnPage />);
    search("OK-DEMO-002");
    fireEvent.click(screen.getByRole("button", { name: "View evidence" }));
    expect(within(screen.getByRole("dialog")).getByText("Not yet completed")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Close" }));
    search("OK-DEMO-004");
    fireEvent.click(screen.getByRole("button", { name: "View evidence" }));
    const dialog = screen.getByRole("dialog");
    fireEvent.focus(within(dialog).getByRole("tab", { name: "History" }));
    expect(within(dialog).getByText("Version 2 published")).toBeInTheDocument();
    expect(within(dialog).getByText("Version 1 published")).toBeInTheDocument();
  });
  it("opens repeated hero samples and keeps record search independent from the library", () => {
    render(<OpenKilnPage />);
    const heroSample = screen.getByRole("button", { name: "Explore a sample" });
    fireEvent.click(heroSample);
    expect(screen.getByText("1 record found for “OK-DEMO-001”")).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText("Search the evidence library"), { target: { value: "EPA:" } });
    expect(screen.getByText("1 resource · Sources and scope included")).toBeInTheDocument();
    expect(screen.getByText("1 record found for “OK-DEMO-001”")).toBeInTheDocument();
    search("UNKNOWN");
    expect(screen.getByText("No matching sample records")).toBeInTheDocument();
    fireEvent.click(heroSample);
    expect(screen.getByLabelText("Manifest ID")).toHaveValue("OK-DEMO-001");
    fireEvent.click(screen.getByRole("button", { name: /Treatment Methodology/ }));
    expect(screen.getByLabelText("Search the evidence library")).toHaveValue("");
    expect(screen.getByText("3 resources · Methodology & Monitoring")).toBeInTheDocument();
    expect(screen.getByText("1 record found for “OK-DEMO-001”")).toBeInTheDocument();
  });
  it("switches audiences and reconciles quarter values", () => {
    render(<OpenKilnPage />);
    fireEvent.focus(screen.getByRole("tab", { name: /Industrial Park Boards/ }));
    const dashboard = screen.getByLabelText("Sample park governance dashboard");
    expect(within(dashboard).getByText("14 records need a closer look.")).toBeInTheDocument();
    expect(within(dashboard).getByText("86 of 100 records")).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText("Reporting period"), { target: { value: "Q1" } });
    expect(within(dashboard).getByText("78 of 90 records")).toBeInTheDocument();
    expect(within(dashboard).getByText("12 records need a closer look.")).toBeInTheDocument();
    expect(within(dashboard).getByRole("table")).toHaveTextContent("Jan30Feb32Mar38");
  });
  it("validates demo forms without network submission and discards closed form values", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch");
    render(<OpenKilnPage />);
    fireEvent.click(screen.getByRole("button", { name: "Book a verification visit" }));
    fireEvent.click(screen.getByRole("button", { name: "Preview request" }));
    await waitFor(() => expect(screen.getByText("Enter your name.")).toBeInTheDocument());
    expect(screen.getByLabelText("Your name")).toHaveFocus();
    fireEvent.click(screen.getByRole("button", { name: "Fill sample details" }));
    fireEvent.change(screen.getByLabelText("Email address"), { target: { value: "invalid" } });
    fireEvent.click(screen.getByRole("button", { name: "Preview request" }));
    await waitFor(() => expect(screen.getByText("Enter a valid email address.")).toBeInTheDocument());
    fireEvent.change(screen.getByLabelText("Email address"), { target: { value: "alex@example.com" } });
    fireEvent.click(screen.getByRole("button", { name: "Preview request" }));
    await waitFor(() => expect(screen.getByRole("status")).toHaveTextContent("Demo complete. No request was sent."));
    expect(fetchSpy).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole("button", { name: "Close preview" }));
    fireEvent.click(screen.getByRole("button", { name: "Book a verification visit" }));
    expect(screen.getByLabelText("Email address")).toHaveValue("");
    fetchSpy.mockRestore();
  });
});
