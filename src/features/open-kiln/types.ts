export type EvidenceCategory = "Manifest" | "Methodology & Monitoring" | "PCB & OPTOCE" | "History" | "Governance";
export type SearchKind = "manifest" | "generator" | "date";
export type Milestone = { date: string; title: string; description: string };

export type TreatmentRecord = {
  id: string;
  generator: string;
  sector: string;
  facility: string;
  wasteType: string;
  wasteId: string;
  quantity: number;
  unit: "tonnes";
  receiptDate: string;
  treatmentDate: string | null;
  status: "Completed" | "Processing";
  evidenceStatus: "Complete" | "Partial";
  publishedAt: string;
  version: number;
  methodology: string;
  limitations: string;
  monitoring: string | null;
  milestones: Array<Milestone>;
  publications: Array<Milestone>;
};

export type EvidenceResource = {
  id: string;
  title: string;
  category: EvidenceCategory;
  summary: string;
  publisher: string;
  date: string;
  version: string;
  kind: "Practice guide" | "Illustrative brief" | "External reference";
  sections: Array<{ title: string; body: string }>;
  url?: string;
};

export type GovernanceSnapshot = {
  quarter: "Q1" | "Q2";
  participants: number;
  totalTenants: number;
  completeRecords: number;
  totalRecords: number;
  months: Array<{ label: string; tonnes: number }>;
  issues: Array<{
    id: string;
    title: string;
    count: number;
    owner: string;
    action: string;
    dueDate: string;
  }>;
};

export type RequestContext = {
  kind: "visit" | "roundtable" | "evidence" | "updates" | "followup";
  title: string;
  context: string;
};

export type RequestFormValues = { name: string; organisation: string; email: string; message: string; date: string };
export type ModalView =
  | { kind: "record"; record: TreatmentRecord }
  | { kind: "resource"; resource: EvidenceResource }
  | { kind: "request"; request: RequestContext }
  | { kind: "overview" };
