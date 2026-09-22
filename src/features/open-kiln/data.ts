import type {
  EvidenceCategory,
  EvidenceResource,
  GovernanceSnapshot,
  TreatmentRecord,
} from "@/features/open-kiln/types";

export const categories: Array<EvidenceCategory> = [
  "Manifest",
  "Methodology & Monitoring",
  "PCB & OPTOCE",
  "History",
  "Governance",
];

const methodology =
  "This demonstration follows a documented co-processing journey: receipt and identification, suitability review, controlled feeding, treatment completion and publication of supporting records.";
const limitations =
  "Illustrative evidence only. No laboratory results or plant measurements were collected for this demo. A treatment milestone does not establish emissions performance, regulatory compliance or independent certification.";

export const records: Array<TreatmentRecord> = [
  {
    id: "OK-DEMO-001",
    generator: "Demo Manufacturing A",
    wasteType: "Industrial solvent residue",
    wasteId: "SAMPLE-SR-01",
    quantity: 2.4,
    unit: "tonnes",
    receiptDate: "2026-09-16",
    treatmentDate: "2026-09-18",
    status: "Completed",
    evidenceStatus: "Complete",
    publishedAt: "2026-09-19T09:00:00+07:00",
    version: 1,
    methodology,
    limitations,
    monitoring:
      "Sample monitoring summary covers the treatment window on 18 September, receipt reconciliation and operational checkpoints. Numerical emissions measurements are not supplied. Complete means all example evidence sections are present.",
    milestones: [
      {
        date: "2026-09-16",
        title: "Waste received",
        description: "2.4 tonnes reconciled against the sample handover record.",
      },
      {
        date: "2026-09-17",
        title: "Treatment preparation",
        description: "Waste identity and suitability review recorded.",
      },
      {
        date: "2026-09-18",
        title: "Treatment completed",
        description: "Completion milestone entered in the demonstration record.",
      },
    ],
    publications: [
      {
        date: "2026-09-19",
        title: "Version 1 published",
        description: "Manifest, methodology and sample monitoring summary linked to this record.",
      },
    ],
  },
  {
    id: "OK-DEMO-002",
    generator: "Demo Manufacturing A",
    wasteType: "Contaminated absorbents",
    wasteId: "SAMPLE-CA-02",
    quantity: 1.8,
    unit: "tonnes",
    receiptDate: "2026-09-20",
    treatmentDate: null,
    status: "Processing",
    evidenceStatus: "Partial",
    publishedAt: "2026-09-21T10:30:00+07:00",
    version: 1,
    methodology,
    limitations,
    monitoring: null,
    milestones: [
      {
        date: "2026-09-20",
        title: "Waste received",
        description: "1.8 tonnes logged at the sample receiving facility.",
      },
      {
        date: "2026-09-21",
        title: "Processing",
        description: "Preparation is recorded. A completion milestone has not been published.",
      },
    ],
    publications: [
      {
        date: "2026-09-21",
        title: "Partial record published",
        description: "Receipt and methodology are available; treatment completion and monitoring remain pending.",
      },
    ],
  },
  {
    id: "OK-DEMO-003",
    generator: "Demo Electronics B",
    wasteType: "Production cleaning residue",
    wasteId: "SAMPLE-CR-03",
    quantity: 3.1,
    unit: "tonnes",
    receiptDate: "2026-09-17",
    treatmentDate: "2026-09-19",
    status: "Completed",
    evidenceStatus: "Partial",
    publishedAt: "2026-09-20T14:00:00+07:00",
    version: 1,
    methodology,
    limitations,
    monitoring: null,
    milestones: [
      { date: "2026-09-17", title: "Waste received", description: "3.1 tonnes documented in the sample manifest." },
      {
        date: "2026-09-19",
        title: "Treatment completed",
        description: "The completion record is present. Supporting monitoring information is still missing.",
      },
    ],
    publications: [
      {
        date: "2026-09-20",
        title: "Version 1 published",
        description: "Manifest and methodology published with a visible monitoring evidence gap.",
      },
    ],
  },
  {
    id: "OK-DEMO-004",
    generator: "Demo Packaging C",
    wasteType: "Contaminated packaging",
    wasteId: "SAMPLE-CP-04",
    quantity: 0.9,
    unit: "tonnes",
    receiptDate: "2026-09-15",
    treatmentDate: "2026-09-18",
    status: "Completed",
    evidenceStatus: "Complete",
    publishedAt: "2026-09-21T11:00:00+07:00",
    version: 2,
    methodology,
    limitations,
    monitoring:
      "Sample operational checkpoints and the treatment-window summary are attached. Version 2 clarifies the monitoring scope; it does not alter the recorded quantity or completion date. No live measurement feed is connected.",
    milestones: [
      { date: "2026-09-15", title: "Waste received", description: "0.9 tonnes reconciled with the handover record." },
      {
        date: "2026-09-18",
        title: "Treatment completed",
        description: "Completion milestone entered in the sample record.",
      },
    ],
    publications: [
      { date: "2026-09-19", title: "Version 1 published", description: "Initial evidence set published." },
      {
        date: "2026-09-21",
        title: "Version 2 published",
        description:
          "Monitoring scope clarified. Quantity and treatment date unchanged; earlier publication remains in the history.",
      },
    ],
  },
];

const samplePublisher = "Open Kiln demo editorial team";
export const resources: Array<EvidenceResource> = [
  {
    id: "manifest",
    title: "Inside a treatment manifest",
    category: "Manifest",
    summary: "Follow waste identity, handover quantity and treatment completion in one record.",
    publisher: samplePublisher,
    date: "2026-09-19",
    version: "1.0",
    kind: "Sample document",
    sections: [
      {
        title: "A record you can follow",
        body: "The sample OK-DEMO-001 links Demo Manufacturing A, waste ID SAMPLE-SR-01, a quantity of 2.4 tonnes, receipt on 16 September and treatment completion on 18 September 2026.",
      },
      {
        title: "What to check",
        body: "Compare the generator and waste identity, reconcile quantity and units, and distinguish receipt from treatment completion. Follow the linked monitoring summary and methodology before drawing conclusions.",
      },
      {
        title: "Scope",
        body: "This is an educational preview, not a statutory manifest or a record of an actual waste shipment.",
      },
    ],
  },
  {
    id: "methodology",
    title: "How the evidence is produced",
    category: "Methodology & Monitoring",
    summary: "Understand the treatment journey, measurement scope and its boundaries.",
    publisher: samplePublisher,
    date: "2026-09-19",
    version: "1.0",
    kind: "Sample document",
    sections: [
      { title: "The proposed method", body: methodology },
      { title: "Know the boundaries", body: limitations },
      {
        title: "Traceability",
        body: "Each sample treatment record carries its own publication timestamp and version. Background technical guidance is labelled separately from record-specific evidence.",
      },
    ],
  },
  {
    id: "monitoring",
    title: "Reading a monitoring summary",
    category: "Methodology & Monitoring",
    summary: "See what monitoring covers, what is missing and which questions to ask.",
    publisher: samplePublisher,
    date: "2026-09-21",
    version: "2.0",
    kind: "Sample document",
    sections: [
      {
        title: "Coverage comes first",
        body: "A useful summary names the treatment window, operational checkpoints, observation method and any gaps. Our examples describe this structure without inventing emissions measurements.",
      },
      {
        title: "Missing evidence stays visible",
        body: "OK-DEMO-003 has a completed treatment milestone but no monitoring summary. Its evidence status remains Partial. OK-DEMO-002 is still processing and also has no monitoring summary.",
      },
      {
        title: "Version history",
        body: "OK-DEMO-004 demonstrates a second publication that clarifies monitoring scope while preserving its original treatment milestones.",
      },
    ],
  },
  {
    id: "pcb",
    title: "PCB evidence: questions to ask",
    category: "PCB & OPTOCE",
    summary: "A guide to separating technical references from treatment-specific proof.",
    publisher: samplePublisher,
    date: "2026-09-19",
    version: "1.0",
    kind: "Sample document",
    sections: [
      {
        title: "Check the document's role",
        body: "A PCB fact sheet can explain terminology and handling context. It does not replace a treatment record, analytical result or current facility-specific authorisation.",
      },
      {
        title: "Useful evidence questions",
        body: "Who issued the document? Which waste, facility, jurisdiction and period does it cover? Is the version current? Is it background information or evidence linked to your record?",
      },
      {
        title: "Reference boundary",
        body: "The EPA resource in this library describes the United States e-Manifest context. It is not an INSEE Vietnam licence. No sample shipment in this demo claims to be a PCB treatment.",
      },
    ],
  },
  {
    id: "optoce",
    title: "OPTOCE reference guide",
    category: "PCB & OPTOCE",
    summary: "Explore the questions behind a circular-economy project reference.",
    publisher: samplePublisher,
    date: "2026-09-19",
    version: "1.0",
    kind: "Sample document",
    sections: [
      {
        title: "A supporting reference",
        body: "The campaign proposal includes OPTOCE material in its technical evidence library. This demo provides a review framework; the source attachment did not include an original OPTOCE fact sheet.",
      },
      {
        title: "Before applying a project finding",
        body: "Identify the original publisher, project location, waste stream, methodology, observation period and limitations. Keep project-level findings separate from a customer's individual treatment evidence.",
      },
      {
        title: "Publication status",
        body: "No OPTOCE performance figures or official approvals are asserted in this preview. Requesting supporting evidence opens a demonstration form only.",
      },
    ],
  },
  {
    id: "history",
    title: "An evidence trail, not a black box",
    category: "History",
    summary: "Distinguish treatment milestones from publication and revision history.",
    publisher: samplePublisher,
    date: "2026-09-21",
    version: "2.0",
    kind: "Sample document",
    sections: [
      {
        title: "Two connected timelines",
        body: "Treatment milestones describe when waste was received and processed. Publication history describes when supporting evidence was made available or revised. These dates need not be the same.",
      },
      {
        title: "Sample revision",
        body: "OK-DEMO-004 was received on 15 September and completed on 18 September. Evidence version 1 was published on 19 September; version 2 clarified monitoring scope on 21 September.",
      },
      {
        title: "Your review",
        body: "Opening a record is an opportunity to inspect evidence. It does not add an independent verification or certification to the record.",
      },
    ],
  },
  {
    id: "governance",
    title: "Quarterly governance brief",
    category: "Governance",
    summary: "A sample Q2 2026 board brief covering participation, treatment and evidence gaps.",
    publisher: samplePublisher,
    date: "2026-07-08",
    version: "Q2 2026",
    kind: "Sample document",
    sections: [
      {
        title: "Q2 at a glance",
        body: "The fictional park has 12 participating tenants out of 18. The quarter records 120 tonnes treated: 36 in April, 38 in May and 46 in June. Complete evidence is available for 86 of 100 records.",
      },
      {
        title: "Priorities for discussion",
        body: "Review the 14 records with incomplete evidence, clarify publication responsibilities and agree follow-up actions. The dashboard provides no tenant-level access. All figures are synthetic.",
      },
      {
        title: "Reporting boundary",
        body: "This is a prewritten sample brief. Downloadable reporting integration belongs to the proposed Year 2 roadmap. Evidence completeness is not a regulatory compliance score.",
      },
    ],
  },
  {
    id: "policy",
    title: "Policy update pack",
    category: "Governance",
    summary: "A sample structure for reviewing regulatory developments with a board.",
    publisher: samplePublisher,
    date: "2026-09-19",
    version: "1.0",
    kind: "Sample document",
    sections: [
      {
        title: "Review structure",
        body: "Record the issuing authority, original source, publication and effective dates, affected activities and the owner of each follow-up action.",
      },
      {
        title: "Board discussion",
        body: "Confirm which developments are relevant to participating tenants and which evidence needs updating. Use approved source material before changing an operational process.",
      },
      {
        title: "Demo scope",
        body: "This sample contains no live regulatory updates and makes no claim that a specific law or permit applies to a tenant.",
      },
    ],
  },
  {
    id: "esg-toolkit",
    title: "ESG discussion toolkit",
    category: "Governance",
    summary: "Turn aggregated evidence into focused questions and follow-up actions.",
    publisher: samplePublisher,
    date: "2026-09-19",
    version: "1.0",
    kind: "Sample document",
    sections: [
      {
        title: "Start with scope",
        body: "Identify the reporting period, participating-tenant count and evidence coverage. Keep the denominator visible when comparing percentages.",
      },
      {
        title: "Discuss and act",
        body: "Review trends, identify evidence gaps, assign follow-up owners and revisit progress at the next governance review.",
      },
    ],
  },
  {
    id: "compliance-toolkit",
    title: "Evidence readiness checklist",
    category: "Governance",
    summary: "Prepare a structured evidence review without turning it into a compliance verdict.",
    publisher: samplePublisher,
    date: "2026-09-19",
    version: "1.0",
    kind: "Sample document",
    sections: [
      {
        title: "Review checklist",
        body: "Confirm identity and quantity; reconcile receipt and completion; inspect methodology and monitoring coverage; check dates, versions and unresolved gaps.",
      },
      {
        title: "Escalate gaps",
        body: "Request missing documents and record who will follow up. Evidence readiness describes document availability; legal compliance requires the appropriate substantive assessment.",
      },
    ],
  },
  {
    id: "epa",
    title: "EPA: PCB waste handlers",
    category: "PCB & OPTOCE",
    summary: "United States e-Manifest fact sheet. External background reference.",
    publisher: "US Environmental Protection Agency",
    date: "2026-08-01",
    version: "August 2026",
    kind: "External reference",
    url: "https://www.epa.gov/system/files/documents/2024-09/e-manifest_pcb_waste_handlers_factsheet.pdf",
    sections: [
      {
        title: "Source and scope",
        body: "This EPA fact sheet explains the United States e-Manifest system for PCB waste handlers. The publisher's document was marked August 2026 when reviewed; the original proposal pictured an older version.",
      },
      {
        title: "How to use it",
        body: "Use it for background context, with its jurisdiction and publisher visible. It does not establish an INSEE Vietnam permit or prove a sample treatment outcome. Check the publisher for revisions.",
      },
    ],
  },
  {
    id: "giz",
    title: "Co-processing technical guidance",
    category: "Methodology & Monitoring",
    summary: "GIZ / LafargeHolcim guidance on pre- and co-processing in cement production.",
    publisher: "GIZ / LafargeHolcim",
    date: "2020-01-01",
    version: "2020 edition",
    kind: "External reference",
    url: "https://www.giz.de/en/downloads/giz-2020_en_guidelines-pre-coprocessing.pdf",
    sections: [
      {
        title: "Source and scope",
        body: "General technical guidance on pre- and co-processing of waste in cement production, published by GIZ and LafargeHolcim in 2020.",
      },
      {
        title: "Application boundary",
        body: "The guidance provides general orientation. Local conditions and applicable frameworks need their own assessment. It is background reading, not an INSEE-specific methodology or treatment record.",
      },
    ],
  },
];

export const governance: Array<GovernanceSnapshot> = [
  {
    quarter: "Q1",
    participants: 10,
    totalTenants: 18,
    completeRecords: 78,
    totalRecords: 90,
    months: [
      { label: "Jan", tonnes: 30 },
      { label: "Feb", tonnes: 32 },
      { label: "Mar", tonnes: 38 },
    ],
  },
  {
    quarter: "Q2",
    participants: 12,
    totalTenants: 18,
    completeRecords: 86,
    totalRecords: 100,
    months: [
      { label: "Apr", tonnes: 36 },
      { label: "May", tonnes: 38 },
      { label: "Jun", tonnes: 46 },
    ],
  },
];
