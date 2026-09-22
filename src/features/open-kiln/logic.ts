import type {
  DemoFormValues,
  DemoRequest,
  EvidenceCategory,
  EvidenceResource,
  SearchKind,
  TreatmentRecord,
} from "@/features/open-kiln/types";

export function searchRecords(records: Array<TreatmentRecord>, kind: SearchKind, value: string) {
  const query = value.trim().toLowerCase();
  if (!query) return [];
  return records.filter((record) => {
    if (kind === "manifest") return record.id.toLowerCase() === query;
    if (kind === "generator") return record.generator.toLowerCase().includes(query);
    return record.treatmentDate === query;
  });
}

export function filterResources(resources: Array<EvidenceResource>, category: EvidenceCategory | "All", value: string) {
  const query = value.trim().toLowerCase();
  return resources.filter(
    (resource) =>
      (category === "All" || resource.category === category) &&
      `${resource.title} ${resource.summary} ${resource.publisher}`.toLowerCase().includes(query),
  );
}

export function formatDate(date: string | null) {
  if (!date) return "Not yet completed";
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "Asia/Ho_Chi_Minh",
  }).format(new Date(date));
}

export function formatTimestamp(value: string) {
  return `${new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "Asia/Ho_Chi_Minh" }).format(new Date(value))} (UTC+7)`;
}

export function validateDemoRequest(kind: DemoRequest["kind"], values: DemoFormValues) {
  const errors: Partial<Record<keyof DemoFormValues, string>> = {};
  if (kind !== "updates") {
    if (!values.name.trim()) errors.name = "Enter your name.";
    if (!values.organisation.trim()) errors.organisation = "Enter your organisation.";
    if (!values.message.trim()) errors.message = "Tell us what you would like to explore.";
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) errors.email = "Enter a valid email address.";
  if (kind === "visit" && !values.date) errors.date = "Choose a preferred date.";
  return errors;
}
