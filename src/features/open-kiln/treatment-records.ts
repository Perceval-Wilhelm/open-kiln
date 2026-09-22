import type { TreatmentRecord } from "@/features/open-kiln/types";

// Constructed operational examples, never imported customer or facility records.
const organisations = [
  ["Mekong Precision Works", "Precision manufacturing"],
  ["Lotus Circuit Systems", "Electronics"],
  ["Southbank Packaging", "Packaging"],
  ["Eastline Textile Works", "Textiles"],
  ["Canalway Materials", "Industrial materials"],
  ["Riverbend Footwear", "Footwear"],
  ["Cedar Household Products", "Consumer products"],
  ["Delta Printworks", "Printing"],
] as const;

type RecordSeed = {
  organisation: number;
  waste: string;
  quantity: number;
  received: string;
  treated: string | null;
  published: string;
  monitoring: boolean;
  revision?: string;
};

const seeds: Array<RecordSeed> = [
  {
    organisation: 0,
    waste: "Industrial solvent residue",
    quantity: 2.4,
    received: "2026-09-16",
    treated: "2026-09-18",
    published: "2026-09-19",
    monitoring: true,
  },
  {
    organisation: 0,
    waste: "Contaminated absorbents",
    quantity: 1.8,
    received: "2026-09-20",
    treated: null,
    published: "2026-09-21",
    monitoring: false,
  },
  {
    organisation: 1,
    waste: "Production cleaning residue",
    quantity: 3.1,
    received: "2026-09-17",
    treated: "2026-09-19",
    published: "2026-09-20",
    monitoring: false,
  },
  {
    organisation: 2,
    waste: "Contaminated packaging",
    quantity: 0.9,
    received: "2026-09-15",
    treated: "2026-09-18",
    published: "2026-09-19",
    monitoring: true,
    revision: "2026-09-21",
  },
  {
    organisation: 3,
    waste: "Non-recyclable textile offcuts",
    quantity: 6.25,
    received: "2026-09-03",
    treated: "2026-09-05",
    published: "2026-09-06",
    monitoring: true,
  },
  {
    organisation: 4,
    waste: "Paint and coating residue",
    quantity: 1.45,
    received: "2026-09-05",
    treated: "2026-09-08",
    published: "2026-09-09",
    monitoring: true,
  },
  {
    organisation: 5,
    waste: "Non-recyclable footwear offcuts",
    quantity: 8.6,
    received: "2026-09-07",
    treated: "2026-09-10",
    published: "2026-09-11",
    monitoring: true,
  },
  {
    organisation: 6,
    waste: "Off-specification packaged products",
    quantity: 4.35,
    received: "2026-09-09",
    treated: "2026-09-11",
    published: "2026-09-12",
    monitoring: false,
  },
  {
    organisation: 7,
    waste: "Printing ink residue",
    quantity: 1.2,
    received: "2026-09-10",
    treated: "2026-09-12",
    published: "2026-09-13",
    monitoring: true,
  },
  {
    organisation: 0,
    waste: "Oily cleaning materials",
    quantity: 2.75,
    received: "2026-09-11",
    treated: "2026-09-13",
    published: "2026-09-14",
    monitoring: true,
  },
  {
    organisation: 1,
    waste: "Contaminated wipes and absorbents",
    quantity: 0.85,
    received: "2026-09-12",
    treated: "2026-09-14",
    published: "2026-09-15",
    monitoring: true,
    revision: "2026-09-17",
  },
  {
    organisation: 2,
    waste: "Non-recyclable multilayer film",
    quantity: 5.4,
    received: "2026-09-12",
    treated: "2026-09-15",
    published: "2026-09-16",
    monitoring: true,
  },
  {
    organisation: 3,
    waste: "Contaminated fabric and wiping cloths",
    quantity: 3.6,
    received: "2026-09-14",
    treated: "2026-09-16",
    published: "2026-09-17",
    monitoring: false,
  },
  {
    organisation: 4,
    waste: "Spent process filter media",
    quantity: 2.15,
    received: "2026-09-15",
    treated: "2026-09-17",
    published: "2026-09-18",
    monitoring: true,
  },
  {
    organisation: 5,
    waste: "Mixed polymer offcuts",
    quantity: 7.8,
    received: "2026-09-16",
    treated: "2026-09-19",
    published: "2026-09-20",
    monitoring: true,
  },
  {
    organisation: 6,
    waste: "Rejected cosmetic products",
    quantity: 1.65,
    received: "2026-09-17",
    treated: "2026-09-20",
    published: "2026-09-21",
    monitoring: true,
  },
  {
    organisation: 7,
    waste: "Solvent-contaminated packaging",
    quantity: 0.7,
    received: "2026-09-18",
    treated: "2026-09-21",
    published: "2026-09-22",
    monitoring: false,
  },
  {
    organisation: 0,
    waste: "Industrial solvent residue",
    quantity: 3.25,
    received: "2026-09-19",
    treated: "2026-09-21",
    published: "2026-09-22",
    monitoring: true,
  },
  {
    organisation: 1,
    waste: "Production cleaning residue",
    quantity: 2.2,
    received: "2026-09-20",
    treated: null,
    published: "2026-09-21",
    monitoring: false,
  },
  {
    organisation: 2,
    waste: "Contaminated packaging",
    quantity: 1.1,
    received: "2026-09-21",
    treated: null,
    published: "2026-09-22",
    monitoring: false,
  },
  {
    organisation: 3,
    waste: "Non-recyclable textile offcuts",
    quantity: 5.8,
    received: "2026-09-01",
    treated: "2026-09-04",
    published: "2026-09-05",
    monitoring: true,
    revision: "2026-09-08",
  },
  {
    organisation: 4,
    waste: "Contaminated absorbents",
    quantity: 1.35,
    received: "2026-09-21",
    treated: null,
    published: "2026-09-22",
    monitoring: false,
  },
  {
    organisation: 5,
    waste: "Non-recyclable footwear offcuts",
    quantity: 9.1,
    received: "2026-09-02",
    treated: "2026-09-05",
    published: "2026-09-06",
    monitoring: true,
  },
  {
    organisation: 6,
    waste: "Off-specification packaged products",
    quantity: 2.9,
    received: "2026-09-22",
    treated: null,
    published: "2026-09-22",
    monitoring: false,
  },
];

export const records: Array<TreatmentRecord> = seeds.map((seed, index) => {
  const [generator, sector] = organisations[seed.organisation];
  const sequence = String(142 + index).padStart(4, "0");
  const publications = [
    {
      date: seed.published,
      title: "Version 1 published",
      description: seed.monitoring
        ? "Receipt, treatment narrative and monitoring-scope summary linked to the record."
        : "Receipt and methodology published; outstanding evidence remains explicitly identified.",
    },
  ];
  if (seed.revision)
    publications.push({
      date: seed.revision,
      title: "Version 2 published",
      description:
        "Monitoring scope clarified. Original quantity and treatment date retained; the first publication remains in the history.",
    });
  return {
    id: `OK-2026-${sequence}`,
    generator,
    sector,
    facility: `Receiving facility S-${String(seed.organisation + 1).padStart(2, "0")}`,
    wasteType: seed.waste,
    wasteId: `WR-2609-${sequence}`,
    quantity: seed.quantity,
    unit: "tonnes",
    receiptDate: seed.received,
    treatmentDate: seed.treated,
    status: seed.treated ? "Completed" : "Processing",
    evidenceStatus: seed.monitoring ? "Complete" : "Partial",
    publishedAt: `${seed.revision ?? seed.published}T09:30:00+07:00`,
    version: seed.revision ? 2 : 1,
    methodology:
      "Receipt weight is reconciled with the handover record. Waste identity and suitability are reviewed before preparation and controlled feeding. Treatment milestones and the available monitoring scope are linked before the evidence set is published. See the GIZ guidance for general pre- and co-processing context.",
    limitations:
      "This is a constructed operational record with a fictional organisation and facility. No actual shipment, laboratory result or plant measurement is represented. Document availability does not establish emissions performance, legal compliance or independent certification.",
    monitoring: seed.monitoring
      ? `The illustrative summary covers the treatment window on ${seed.treated}, receipt reconciliation, suitability review and operational checkpoints. It contains no measured emissions values. ${seed.revision ? "Revision 2 clarifies the coverage without changing the treatment milestone." : "Coverage is limited to this record; it is not a continuous emissions report."}`
      : null,
    milestones: [
      {
        date: seed.received,
        title: "Waste received",
        description: `${seed.quantity} tonnes entered in the receiving log and reconciled with the handover quantity.`,
      },
      {
        date: seed.received,
        title: "Suitability review",
        description: "Waste identity, packaging condition and the proposed treatment route recorded for review.",
      },
      {
        date: seed.treated ?? seed.published,
        title: seed.treated ? "Treatment completed" : "Processing",
        description: seed.treated
          ? "Completion milestone recorded; consult the evidence tab for available monitoring coverage."
          : "Preparation is in progress. No treatment completion date has been published.",
      },
    ],
    publications,
  };
});

export const featuredRecord = records[0];
