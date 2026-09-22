import { describe, expect, it } from "vitest";

import { governance, records, resources } from "@/features/open-kiln/data";
import { filterResources, searchRecords, validateDemoRequest } from "@/features/open-kiln/logic";

describe("record lookup", () => {
  it("normalises manifest input but does not return partial ID matches", () => {
    expect(searchRecords(records, "manifest", "  ok-demo-001  ").map((r) => r.id)).toEqual(["OK-DEMO-001"]);
    expect(searchRecords(records, "manifest", "OK-DEMO")).toEqual([]);
  });
  it("finds multiple generator matches without changing case-sensitive display names", () => {
    expect(searchRecords(records, "generator", "  MANUFACTURING a ").map((r) => r.id)).toEqual([
      "OK-DEMO-001",
      "OK-DEMO-002",
    ]);
  });
  it("matches treatment date, not receipt date or a processing record", () => {
    expect(searchRecords(records, "date", "2026-09-18").map((r) => r.id)).toEqual(["OK-DEMO-001", "OK-DEMO-004"]);
    expect(searchRecords(records, "date", "2026-09-20")).toEqual([]);
    expect(records[1].treatmentDate).toBeNull();
  });
  it("returns no records for blank or unknown values", () => {
    expect(searchRecords(records, "generator", "  ")).toEqual([]);
    expect(searchRecords(records, "manifest", "UNKNOWN")).toEqual([]);
  });
});

describe("evidence integrity", () => {
  it("does not equate completed treatment with complete evidence", () => {
    const missingMonitoring = records[2];
    expect(missingMonitoring.status).toBe("Completed");
    expect(missingMonitoring.evidenceStatus).toBe("Partial");
    expect(missingMonitoring.monitoring).toBeNull();
  });
  it("keeps chronological treatment and publication histories", () => {
    for (const record of records) {
      if (record.treatmentDate) expect(record.treatmentDate >= record.receiptDate).toBe(true);
      expect(record.publications.map((p) => p.date)).toEqual(record.publications.map((p) => p.date).sort());
      if (record.evidenceStatus === "Complete") expect(record.monitoring).not.toBeNull();
    }
    expect(records[3].publications).toHaveLength(2);
  });
  it("combines library category and text filters", () => {
    expect(filterResources(resources, "PCB & OPTOCE", "EPA:").map((r) => r.id)).toEqual(["epa"]);
    expect(filterResources(resources, "Governance", "EPA:")).toEqual([]);
    expect(filterResources(resources, "All", " ")).toHaveLength(resources.length);
  });
  it("reconciles monthly governance volumes and evidence denominators", () => {
    expect(governance.map((q) => q.months.reduce((sum, month) => sum + month.tonnes, 0))).toEqual([100, 120]);
    expect(governance.map((q) => q.totalRecords - q.completeRecords)).toEqual([12, 14]);
    expect(governance.every((q) => q.participants <= q.totalTenants && q.completeRecords <= q.totalRecords)).toBe(true);
  });
});

describe("demo request validation", () => {
  const values = {
    name: "Alex",
    organisation: "Demo",
    email: "alex@example.com",
    date: "2026-10-20",
    message: "Review evidence",
  };
  it("requires only email for updates", () => {
    expect(validateDemoRequest("updates", { ...values, name: "", organisation: "", date: "", message: "" })).toEqual(
      {},
    );
  });
  it("checks whitespace fields, email and a visit date", () => {
    expect(validateDemoRequest("visit", { name: " ", organisation: "", email: "bad", message: "", date: "" })).toEqual({
      name: expect.any(String),
      organisation: expect.any(String),
      email: expect.any(String),
      message: expect.any(String),
      date: expect.any(String),
    });
    expect(validateDemoRequest("visit", values)).toEqual({});
    expect(validateDemoRequest("roundtable", { ...values, date: "" })).toEqual({});
  });
});
