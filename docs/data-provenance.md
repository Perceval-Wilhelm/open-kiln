# Data provenance

Source review: **23 September 2026**. Open Kiln is an independently developed campaign concept, not an official INSEE customer portal.

## Public information used

| Resource                                                                                                                                         | Original publisher / period                        | Use and scope                                                                                                                                                                                            |
| ------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Vietnam OPTOCE pilot findings](https://www.sintef.no/en/latest-news/2022/plastic-waste-is-a-resource-that-doesnt-have-to-end-up-in-the-oceans/) | SINTEF, 10 June 2022, describing December 2021     | Published pilot figures: 225 tonnes of plastic waste co-processed, approximately 165 tonnes of coal saved. Historical pilot results, not current facility metrics.                                       |
| [OPTOCE programme](https://www.sintef.no/en/projects/2019/optoce/)                                                                               | SINTEF, project page accessed 23 September 2026    | Programme purpose and initial participating countries. No claim that a programme finding verifies an individual record.                                                                                  |
| [Co-processing service](https://www.siamcitycement.com/vietnam/en/insee-ecocycle/services-solutions/waste-management)                            | INSEE Ecocycle Vietnam, accessed 23 September 2026 | Operator-described process and waste streams. The schematic is conceptual, not a drawing of its facility.                                                                                                |
| [Ecocycle newsletter, Issue 7](https://www.siamcitycement.com/ckeditor/upload/files/id113/EN_INSEE_Ecocycle_Newsletter_Q32.pdf)                  | INSEE Ecocycle Vietnam, Q3 2025                    | Original company publication for operational and engagement context. The date field uses the quarter end; the displayed label preserves the publication period and does not invent an exact release day. |
| [Pre- and co-processing guidance](https://www.giz.de/sites/default/files/media/pkb-document/2025-07/giz-2020-en-guidelines-pre-coprocessing.pdf) | GIZ / LafargeHolcim, January 2020                  | General technical guidance. The current GIZ-hosted file replaces the slow legacy download path. Local and facility-specific applicability requires its own assessment.                                   |
| [PCB e-Manifest fact sheet](https://www.epa.gov/system/files/documents/2024-09/e-manifest_pcb_waste_handlers_factsheet.pdf)                      | US EPA, document marked August 2026                | US background reference. Not a Vietnamese authorisation or evidence of an illustrative PCB shipment.                                                                                                     |
| [Official contact](https://www.siamcitycement.com/vietnam/en/insee-ecocycle/contact)                                                             | INSEE Ecocycle Vietnam, accessed 23 September 2026 | Direct external link for actual enquiries. No form contents or search terms are attached to the URL.                                                                                                     |

Original publications are linked, not republished. Publisher claims, historical research and editorial guidance are identified separately. Do not convert pilot totals into site-wide annual performance or add them to the illustrative dashboards.

## Constructed operational data

`treatment-records.ts` contains **24 records across eight fictional organisations**, with IDs `OK-2026-0142` through `OK-2026-0165`. Industry labels and waste-stream descriptions reflect publicly described contexts. Names, internal waste IDs, receiving facilities, quantities, dates and publication histories are invented; they are not anonymised real customer data. No numerical emissions results or facility permits are fabricated.

- 19 completed treatment records; five processing records with no completion date.
- 15 records with complete illustrative evidence; nine with partial evidence (including processing records).
- Three records have a second publication revision.
- Quantities, date order, version history and evidence availability are checked in the application tests.
- The record header and scope explain provenance; the register carries one concise provenance note. The interface avoids repeated “demo” branding and artificial DEMO identifiers.

## Governance dataset

The park dashboard is a separate constructed dataset, not an aggregation of the 24 register records. All metrics describe participating tenants. Its Q1/Q2 coverage, quantities and denominators remain those approved in the original plan.

| Period  | Participating tenants | Treated waste | Complete evidence | Primary evidence issues                              |
| ------- | --------------------- | ------------- | ----------------- | ---------------------------------------------------- |
| Q1 2026 | 10/18                 | 100 tonnes    | 78/90             | 6 monitoring + 4 reconciliation + 2 publication = 12 |
| Q2 2026 | 12/18                 | 120 tonnes    | 86/100            | 7 monitoring + 3 reconciliation + 4 publication = 14 |

Each incomplete record has exactly one primary issue; category totals reconcile without double counting. The gap rate rises from 13.3% to 14.0%, or 0.7 percentage points after rounding. Review dates and owners describe a historical example of follow-up planning, not live overdue tasks or real staff assignments. Evidence readiness is not a legal compliance verdict.

## Requests and privacy

Forms create an in-memory request summary. They do not send email, book visits, register subscribers, call an application API or write form values to browser storage. Closing the dialog discards the values. The summary explicitly says that no request has been sent and offers a separately labelled official-contact link.

Vercel production builds include Web Analytics page views and Speed Insights performance reporting on the free Hobby tier. Local and preview builds do not mount either SDK. The shared before-send filter removes query strings, URL fragments and URL credentials, and rejects custom events. Form contents and record searches remain local and are not passed to either SDK. Ordinary hosting and monitoring requests remain subject to Vercel request-metadata processing; the site does not claim that Vercel receives no network data. External websites apply their own policies.
