import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { OpenKilnPage } from "@/features/open-kiln/OpenKilnPage";

function search(value: string) {
  fireEvent.change(screen.getByLabelText("Manifest ID"), { target: { value } });
  fireEvent.click(screen.getByRole("button", { name: "Verify record" }));
}

describe("Open Kiln visitor journeys", () => {
  it("closes mobile navigation with Escape and restores toggle focus", () => {
    render(<OpenKilnPage />);
    const toggle = screen.getByRole("button", { name: "Open navigation" });
    expect(toggle).toHaveAttribute("aria-controls", "main-navigation");
    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    const navigation = screen.getByRole("navigation", { name: "Main navigation" });
    within(navigation).getAllByRole("link")[0].focus();
    fireEvent.keyDown(document, { key: "Escape" });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(toggle).toHaveFocus();
  });
  it("explains empty searches and opens a sample with a real evidence gap", async () => {
    render(<OpenKilnPage />);
    fireEvent.click(screen.getByRole("button", { name: "Verify record" }));
    expect(screen.getByRole("alert")).toHaveTextContent("Enter a manifest id");
    expect(screen.getByLabelText("Manifest ID")).toHaveFocus();
    search("OK-2026-0144");
    fireEvent.click(screen.getByRole("button", { name: /^View evidence for/ }));
    const dialog = await screen.findByRole("dialog");
    expect(await within(dialog).findByText("Completed")).toBeInTheDocument();
    expect(within(dialog).getByText("Evidence partial")).toBeInTheDocument();
    const evidenceTab = within(dialog).getByRole("tab", { name: "Evidence" });
    fireEvent.mouseDown(evidenceTab, { button: 0, ctrlKey: false });
    fireEvent.click(evidenceTab);
    fireEvent.focus(evidenceTab);
    await waitFor(() => expect(within(dialog).getByText("Not available")).toBeInTheDocument());
    expect(within(dialog).getByText(/monitoring summary has not been published/)).toBeInTheDocument();
  });
  it("keeps processing dates absent and retains publication revisions", async () => {
    render(<OpenKilnPage />);
    search("OK-2026-0143");
    fireEvent.click(screen.getByRole("button", { name: /^View evidence for/ }));
    expect(await within(await screen.findByRole("dialog")).findByText("Not yet completed")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Close" }));
    search("OK-2026-0145");
    fireEvent.click(screen.getByRole("button", { name: /^View evidence for/ }));
    const dialog = await screen.findByRole("dialog");
    fireEvent.focus(await within(dialog).findByRole("tab", { name: "History" }));
    expect(within(dialog).getByText("Version 2 published")).toBeInTheDocument();
    expect(within(dialog).getByText("Version 1 published")).toBeInTheDocument();
  });
  it("opens repeated hero samples and keeps record search independent from the library", () => {
    render(<OpenKilnPage />);
    const heroSample = screen.getByRole("button", { name: "Use a record ID" });
    fireEvent.click(heroSample);
    expect(screen.getByText("1 record found for “OK-2026-0142”")).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText("Search the evidence library"), { target: { value: "EPA:" } });
    expect(screen.getByText("1 resource · Sources and scope included")).toBeInTheDocument();
    expect(screen.getByText("1 record found for “OK-2026-0142”")).toBeInTheDocument();
    search("UNKNOWN");
    expect(screen.getByText("No matching records")).toBeInTheDocument();
    fireEvent.click(heroSample);
    expect(screen.getByLabelText("Manifest ID")).toHaveValue("OK-2026-0142");
    fireEvent.click(screen.getByRole("button", { name: /Treatment Methodology/ }));
    expect(screen.getByLabelText("Search the evidence library")).toHaveValue("");
    expect(screen.getByText("4 resources · Methodology & Monitoring")).toBeInTheDocument();
    expect(screen.getByText("1 record found for “OK-2026-0142”")).toBeInTheDocument();
  });
  it("switches audiences and reconciles quarter values", () => {
    render(<OpenKilnPage />);
    fireEvent.focus(screen.getByRole("tab", { name: /Industrial Park Boards/ }));
    const dashboard = screen.getByLabelText("Park governance dashboard");
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
    await screen.findByRole("dialog");
    fireEvent.click(await screen.findByRole("button", { name: "Review request" }));
    await waitFor(() => expect(screen.getByText("Enter your name.")).toBeInTheDocument());
    expect(screen.getByLabelText("Your name")).toHaveFocus();
    expect(screen.getByLabelText("Your name")).toHaveAccessibleDescription("Enter your name.");
    fireEvent.click(screen.getByRole("button", { name: "Use example details" }));
    fireEvent.change(screen.getByLabelText("Email address"), { target: { value: "invalid" } });
    fireEvent.click(await screen.findByRole("button", { name: "Review request" }));
    await waitFor(() => expect(screen.getByText("Enter a valid email address.")).toBeInTheDocument());
    fireEvent.change(screen.getByLabelText("Email address"), { target: { value: "alex@example.com" } });
    fireEvent.click(await screen.findByRole("button", { name: "Review request" }));
    await waitFor(() => expect(screen.getByRole("status")).toHaveTextContent("Your request summary is ready."));
    expect(fetchSpy).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole("button", { name: "Close summary" }));
    fireEvent.click(screen.getByRole("button", { name: "Book a verification visit" }));
    await screen.findByRole("dialog");
    expect(await screen.findByLabelText("Email address")).toHaveValue("");
    fetchSpy.mockRestore();
  });
});
