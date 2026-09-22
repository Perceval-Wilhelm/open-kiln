import { describe, expect, it } from "vitest";
import { governance, records, resources } from "@/features/open-kiln/data";
import { filterResources, searchRecords, validateRequest } from "@/features/open-kiln/logic";

describe("record lookup", () => {
  it("normalises exact manifest input without returning partial matches", () => {
    expect(searchRecords(records, "manifest", "  ok-2026-0142  ").map((record) => record.id)).toEqual(["OK-2026-0142"]);
    expect(searchRecords(records, "manifest", "OK-2026")).toEqual([]);
  });
  it("finds every generator match across the expanded register", () => {
    expect(searchRecords(records, "generator", "  MEKONG precision ").map((record) => record.id)).toEqual([
      "OK-2026-0142",
      "OK-2026-0143",
      "OK-2026-0151",
      "OK-2026-0159",
    ]);
  });
  it("matches treatment date, not receipt date or processing records", () => {
    expect(searchRecords(records, "date", "2026-09-18").map((record) => record.id)).toEqual([
      "OK-2026-0142",
      "OK-2026-0145",
    ]);
    expect(searchRecords(records, "date", "2026-09-22")).toEqual([]);
    expect(searchRecords(records, "date", "2026-09-20").map((record) => record.id)).toEqual(["OK-2026-0157"]);
  });
  it("handles blank and unknown values", () => {
    expect(searchRecords(records, "generator", "  ")).toEqual([]);
    expect(searchRecords(records, "manifest", "UNKNOWN")).toEqual([]);
  });
});

describe("evidence integrity", () => {
  it("provides unique, varied operational records with explicit provenance", () => {
    expect(records).toHaveLength(24);
    expect(new Set(records.map((record) => record.id)).size).toBe(24);
    expect(new Set(records.map((record) => record.generator)).size).toBe(8);
    for (const record of records) {
      expect(record.id).toMatch(/^OK-2026-\d{4}$/);
      expect(record.quantity).toBeGreaterThan(0);
      expect(record.limitations).toContain("fictional organisation");
      expect(record.status === "Processing").toBe(record.treatmentDate === null);
      if (record.status === "Processing") expect(record.evidenceStatus).toBe("Partial");
    }
  });
  it("does not equate completed treatment with complete evidence", () => {
    expect(records[2]).toMatchObject({ status: "Completed", evidenceStatus: "Partial", monitoring: null });
    expect(records.some((record) => record.status === "Processing")).toBe(true);
  });
  it("keeps milestones and publication revisions consistent for every record", () => {
    for (const record of records) {
      if (record.treatmentDate) expect(record.treatmentDate >= record.receiptDate).toBe(true);
      expect(record.milestones.map((item) => item.date)).toEqual(record.milestones.map((item) => item.date).sort());
      expect(record.publications.map((item) => item.date)).toEqual(record.publications.map((item) => item.date).sort());
      expect(record.version).toBe(record.publications.length);
      expect(record.publishedAt.startsWith(record.publications.at(-1)!.date)).toBe(true);
      expect(record.evidenceStatus === "Complete").toBe(record.monitoring !== null);
      expect(record.publications[0].date >= (record.treatmentDate ?? record.receiptDate)).toBe(true);
    }
    expect(records[3].publications).toHaveLength(2);
  });
  it("filters resource category and text independently of record search", () => {
    expect(filterResources(resources, "PCB & OPTOCE", "EPA:").map((resource) => resource.id)).toEqual(["epa"]);
    expect(filterResources(resources, "Governance", "EPA:")).toEqual([]);
    expect(filterResources(resources, "All", "SINTEF")).toHaveLength(2);
    expect(filterResources(resources, "All", " ")).toHaveLength(resources.length);
  });
  it("attributes real references independently of editorial examples", () => {
    const external = resources.filter((resource) => resource.kind === "External reference");
    expect(external).toHaveLength(6);
    for (const resource of external) {
      expect(resource.url).toMatch(/^https:\/\//);
      expect(resource.publisher).not.toContain("Open Kiln");
      expect(resource.sections.length).toBeGreaterThan(0);
    }
    expect(resources.find((resource) => resource.id === "vietnam-pilot")!.sections[0].body).toContain("December 2021");
  });
  it("reconciles governance quantities, unique issue counts and denominators", () => {
    expect(governance.map((quarter) => quarter.months.reduce((sum, month) => sum + month.tonnes, 0))).toEqual([
      100, 120,
    ]);
    for (const quarter of governance) {
      expect(quarter.issues.reduce((sum, issue) => sum + issue.count, 0)).toBe(
        quarter.totalRecords - quarter.completeRecords,
      );
      expect(new Set(quarter.issues.map((issue) => issue.id)).size).toBe(quarter.issues.length);
      expect(quarter.participants).toBeLessThanOrEqual(quarter.totalTenants);
    }
    const rate = (index: number) =>
      ((governance[index].totalRecords - governance[index].completeRecords) / governance[index].totalRecords) * 100;
    expect((rate(1) - rate(0)).toFixed(1)).toBe("0.7");
  });
});

describe("request validation", () => {
  const values = {
    name: "Alex",
    organisation: "Mekong Precision Works",
    email: "alex@example.com",
    date: "2026-10-20",
    message: "Review evidence",
  };
  it("requires only email for updates", () => {
    expect(validateRequest("updates", { ...values, name: "", organisation: "", date: "", message: "" })).toEqual({});
  });
  it("checks whitespace, email and a visit date", () => {
    expect(validateRequest("visit", { name: " ", organisation: "", email: "bad", message: "", date: "" })).toEqual({
      name: expect.any(String),
      organisation: expect.any(String),
      email: expect.any(String),
      message: expect.any(String),
      date: expect.any(String),
    });
    expect(validateRequest("visit", values)).toEqual({});
    expect(validateRequest("roundtable", { ...values, date: "" })).toEqual({});
  });
});
