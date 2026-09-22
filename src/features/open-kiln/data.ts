import type { EvidenceCategory, EvidenceResource, GovernanceSnapshot } from "@/features/open-kiln/types";

export const categories: Array<EvidenceCategory> = [
  "Manifest",
  "Methodology & Monitoring",
  "PCB & OPTOCE",
  "History",
  "Governance",
];

export { records, featuredRecord } from "@/features/open-kiln/treatment-records";

const methodology =
  "Receipt and identification, suitability review, controlled feeding, treatment completion and publication form a traceable co-processing evidence journey. Record-specific acceptance and operating conditions require their own supporting documents.";
const limitations =
  "Operational records in this register are constructed examples. No laboratory results or plant measurements are represented. A treatment milestone does not establish emissions performance, legal compliance or independent certification.";

const editorialPublisher = "Open Kiln editorial";
import { publicResources } from "@/features/open-kiln/references";

export const resources: Array<EvidenceResource> = [
  ...publicResources,
  {
    id: "manifest",
    title: "Inside a treatment manifest",
    category: "Manifest",
    summary: "Follow waste identity, handover quantity and treatment completion in one record.",
    publisher: editorialPublisher,
    date: "2026-09-19",
    version: "1.0",
    kind: "Practice guide",
    sections: [
      {
        title: "A record you can follow",
        body: "The illustrative record OK-2026-0142 links Mekong Precision Works, waste ID WR-2609-0142, a quantity of 2.4 tonnes, receipt on 16 September and treatment completion on 18 September 2026.",
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
    publisher: editorialPublisher,
    date: "2026-09-19",
    version: "1.0",
    kind: "Practice guide",
    sections: [
      { title: "The proposed method", body: methodology },
      { title: "Know the boundaries", body: limitations },
      {
        title: "Traceability",
        body: "Each illustrative treatment record carries its own publication timestamp and version. Background technical guidance is labelled separately from record-specific evidence.",
      },
    ],
  },
  {
    id: "monitoring",
    title: "Reading a monitoring summary",
    category: "Methodology & Monitoring",
    summary: "See what monitoring covers, what is missing and which questions to ask.",
    publisher: editorialPublisher,
    date: "2026-09-21",
    version: "2.0",
    kind: "Practice guide",
    sections: [
      {
        title: "Coverage comes first",
        body: "A useful summary names the treatment window, operational checkpoints, observation method and any gaps. Our examples describe this structure without inventing emissions measurements.",
      },
      {
        title: "Missing evidence stays visible",
        body: "OK-2026-0144 has a completed treatment milestone but no monitoring summary. Its evidence status remains Partial. OK-2026-0143 is still processing and also has no monitoring summary.",
      },
      {
        title: "Version history",
        body: "OK-2026-0145 demonstrates a second publication that clarifies monitoring scope while preserving its original treatment milestones.",
      },
    ],
  },
  {
    id: "pcb",
    title: "PCB evidence: questions to ask",
    category: "PCB & OPTOCE",
    summary: "A guide to separating technical references from treatment-specific proof.",
    publisher: editorialPublisher,
    date: "2026-09-19",
    version: "1.0",
    kind: "Practice guide",
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
        body: "The EPA resource in this library describes the United States e-Manifest context. It is not an INSEE Vietnam licence. None of the illustrative shipments is represented as PCB treatment.",
      },
    ],
  },
  {
    id: "optoce",
    title: "OPTOCE: the research programme",
    category: "PCB & OPTOCE",
    summary: "SINTEF’s programme exploring energy recovery from non-recyclable plastics, including work in Vietnam.",
    publisher: "SINTEF",
    date: "2026-09-23",
    version: "Project page · accessed 23 Sep 2026",
    kind: "External reference",
    url: "https://www.sintef.no/en/projects/2019/optoce/",
    sections: [
      {
        title: "What the programme investigates",
        body: "OPTOCE stands for Ocean Plastic Turned into an Opportunity in Circular Economy. SINTEF describes partnerships that collect and prepare non-recyclable plastic for energy recovery in local industry, while directing recyclable fractions to recycling.",
      },
      {
        title: "Geographic scope",
        body: "The project page names China, India, Thailand, Vietnam and Myanmar as its initial partner countries. Its findings provide research context, not evidence for a particular customer shipment.",
      },
      {
        title: "Follow the original source",
        body: "The linked project page provides programme information and research contacts. The separate Vietnam pilot article in this library reports historical results with a defined observation period.",
      },
    ],
  },
  {
    id: "history",
    title: "An evidence trail, not a black box",
    category: "History",
    summary: "Distinguish treatment milestones from publication and revision history.",
    publisher: editorialPublisher,
    date: "2026-09-21",
    version: "2.0",
    kind: "Practice guide",
    sections: [
      {
        title: "Two connected timelines",
        body: "Treatment milestones describe when waste was received and processed. Publication history describes when supporting evidence was made available or revised. These dates need not be the same.",
      },
      {
        title: "Publication revision",
        body: "OK-2026-0145 was received on 15 September and completed on 18 September. Evidence version 1 was published on 19 September; version 2 clarified monitoring scope on 21 September.",
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
    summary: "An illustrative Q2 2026 board brief covering participation, treatment and evidence gaps.",
    publisher: editorialPublisher,
    date: "2026-07-08",
    version: "Q2 2026",
    kind: "Illustrative brief",
    sections: [
      {
        title: "Q2 at a glance",
        body: "The fictional park has 12 participating tenants out of 18. The quarter records 120 tonnes treated: 36 in April, 38 in May and 46 in June. Complete evidence is available for 86 of 100 records.",
      },
      {
        title: "Priorities for discussion",
        body: "Seven records need monitoring summaries, three need receipt reconciliation, and four await publication approval. Each record is assigned one primary issue; the categories total 14. Assign an owner and review progress at the next board meeting. The dashboard provides no tenant-level access. All figures are synthetic.",
      },
      {
        title: "Reporting boundary",
        body: "This is a prewritten illustrative brief. Integrated report exports belong to the proposed Year 2 roadmap. Evidence completeness is not a regulatory compliance score.",
      },
    ],
  },
  {
    id: "policy",
    title: "Policy update pack",
    category: "Governance",
    summary: "A structured approach to source, scope and follow-up for policy reviews.",
    publisher: editorialPublisher,
    date: "2026-09-19",
    version: "1.0",
    kind: "Practice guide",
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
        title: "Scope of this guide",
        body: "This guide contains no live regulatory updates and makes no claim that a specific law or permit applies to a tenant.",
      },
    ],
  },
  {
    id: "esg-toolkit",
    title: "ESG discussion toolkit",
    category: "Governance",
    summary: "Turn aggregated evidence into focused questions and follow-up actions.",
    publisher: editorialPublisher,
    date: "2026-09-19",
    version: "1.0",
    kind: "Practice guide",
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
    publisher: editorialPublisher,
    date: "2026-09-19",
    version: "1.0",
    kind: "Practice guide",
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
        body: "Use it for background context, with its jurisdiction and publisher visible. It does not establish an INSEE Vietnam permit or prove an individual treatment outcome. Check the publisher for revisions.",
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
    url: "https://www.giz.de/sites/default/files/media/pkb-document/2025-07/giz-2020-en-guidelines-pre-coprocessing.pdf",
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
    issues: [
      {
        id: "monitoring",
        title: "Monitoring summary outstanding",
        count: 6,
        owner: "Environmental reporting",
        action: "Publish the treatment-window summary and identify any coverage gaps.",
        dueDate: "2026-04-15",
      },
      {
        id: "reconciliation",
        title: "Receipt reconciliation needed",
        count: 4,
        owner: "Operations records",
        action: "Reconcile the receiving quantity with the handover entry and document corrections.",
        dueDate: "2026-04-12",
      },
      {
        id: "publication",
        title: "Publication review pending",
        count: 2,
        owner: "Evidence publisher",
        action: "Complete the version review and publish the approved evidence set.",
        dueDate: "2026-04-18",
      },
    ],
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
    issues: [
      {
        id: "monitoring",
        title: "Monitoring summary outstanding",
        count: 7,
        owner: "Environmental reporting",
        action: "Publish the treatment-window summary and identify any coverage gaps.",
        dueDate: "2026-07-15",
      },
      {
        id: "reconciliation",
        title: "Receipt reconciliation needed",
        count: 3,
        owner: "Operations records",
        action: "Reconcile the receiving quantity with the handover entry and document corrections.",
        dueDate: "2026-07-12",
      },
      {
        id: "publication",
        title: "Publication review pending",
        count: 4,
        owner: "Evidence publisher",
        action: "Complete the version review and publish the approved evidence set.",
        dueDate: "2026-07-18",
      },
    ],
    months: [
      { label: "Apr", tonnes: 36 },
      { label: "May", tonnes: 38 },
      { label: "Jun", tonnes: 46 },
    ],
  },
];
