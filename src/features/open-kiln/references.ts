import type { EvidenceResource } from "@/features/open-kiln/types";

export const officialContact = "https://www.siamcitycement.com/vietnam/en/insee-ecocycle/contact";
export const publicResources: Array<EvidenceResource> = [
  {
    id: "vietnam-pilot",
    title: "Vietnam: the OPTOCE pilot findings",
    category: "PCB & OPTOCE",
    summary: "A published SINTEF account of the December 2021 co-processing trial in Vietnam.",
    publisher: "SINTEF",
    date: "2022-06-10",
    version: "10 June 2022 · research article",
    kind: "External reference",
    url: "https://www.sintef.no/en/latest-news/2022/plastic-waste-is-a-resource-that-doesnt-have-to-end-up-in-the-oceans/",
    sections: [
      {
        title: "The reported results",
        body: "SINTEF reports that the December 2021 pilot co-processed 225 tonnes of plastic waste and saved approximately 165 tonnes of coal. The four-day study compared a coal baseline with different alternative-fuel mixtures.",
      },
      {
        title: "How the findings were observed",
        body: "The article describes independent emissions sampling and analysis by an accredited laboratory. Consult the original publication for the study design and the authors’ interpretation.",
      },
      {
        title: "Keep the boundary visible",
        body: "These are historical research results, not current plant metrics or customer manifest data. They are not included in the operational register or park dashboard.",
      },
    ],
  },
  {
    id: "insee-process",
    title: "INSEE Vietnam: co-processing explained",
    category: "Methodology & Monitoring",
    summary: "The operator’s description of its waste-management approach and material streams.",
    publisher: "INSEE Ecocycle Vietnam",
    date: "2026-09-23",
    version: "Official service page · accessed 23 Sep 2026",
    kind: "External reference",
    url: "https://www.siamcitycement.com/vietnam/en/insee-ecocycle/services-solutions/waste-management",
    sections: [
      {
        title: "The operator’s process description",
        body: "INSEE describes co-processing as recovering thermal energy while incorporating suitable minerals into the clinker matrix. Its published waste streams include solvents, sludge, footwear, textiles and plastics.",
      },
      {
        title: "Using the reference",
        body: "The page describes the operator’s service. Suitability, acceptance conditions and treatment evidence must still be assessed for each individual waste stream. The process illustration on Open Kiln is a schematic, not an engineering drawing of the Hon Chong facility.",
      },
    ],
  },
  {
    id: "insee-newsletter",
    title: "Ecocycle insights · Q3 2025",
    category: "Governance",
    summary: "An original INSEE Ecocycle newsletter covering operations, engagement and waste-management updates.",
    publisher: "INSEE Ecocycle Vietnam",
    date: "2025-09-30",
    version: "Q3 2025 · Issue 7",
    kind: "External reference",
    url: "https://www.siamcitycement.com/ckeditor/upload/files/id113/EN_INSEE_Ecocycle_Newsletter_Q32.pdf",
    sections: [
      {
        title: "Read the original publication",
        body: "This is an operator-published newsletter, retained with its original reporting period. It offers real-world context for the engagement and technical discussions proposed by Open Kiln.",
      },
      {
        title: "Publication scope",
        body: "Company reporting is distinct from independently verified shipment evidence. This newsletter does not verify any illustrative record in the register or replace a current legal or permit review.",
      },
    ],
  },
  {
    id: "privacy",
    title: "Privacy & data handling",
    category: "Governance",
    summary: "How this campaign concept handles the information you enter and the references you open.",
    publisher: "Open Kiln editorial",
    date: "2026-09-23",
    version: "1.1",
    kind: "Practice guide",
    sections: [
      {
        title: "Information you enter",
        body: "Searches and request drafts are processed in this page. Form details are not transmitted by the application or written to browser storage. Closing a request clears its contents. Use the example details if you are exploring the form.",
      },
      {
        title: "Website delivery",
        body: "The site is served by Vercel. Normal website requests may be processed in hosting access and security logs; hosting logs are separate from the website usage statistics described below. Form draft contents are not included in those requests.",
      },
      {
        title: "Website usage and performance",
        body: "On the production website, Vercel Web Analytics counts visits and Speed Insights measures page performance. The integration does not send form contents, record searches or custom interaction events. Query strings and URL fragments are removed from page URLs before reporting. This monitoring is disabled in local and preview builds. Vercel processes the associated request metadata under its own privacy policy.",
      },
      {
        title: "External websites",
        body: "Publisher and official-contact links open external websites, where the respective operator’s privacy policies apply. Opening those links does not attach your request draft or search terms.",
      },
      {
        title: "Campaign and data provenance",
        body: "Open Kiln is an independently developed CSR campaign concept for INSEE Ecocycle, not its official customer portal. Public references retain their original publisher. Operational records and park metrics are illustrative and do not describe real customers or shipments.",
      },
    ],
  },
];
