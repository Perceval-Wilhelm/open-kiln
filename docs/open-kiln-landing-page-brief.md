**Open Kiln: landing page investigation and delivery brief**

Prepared 22 September 2026. This is a requirements and implementation brief; no application features were changed or deployed during this investigation.

**Recommendation**

Build a responsive Open Kiln campaign landing page with a small, working evidence-exploration experience. The page should introduce the promise “verify, not just trust,” let visitors explore treatment evidence, and lead two audiences into appropriate next steps. Keep the broader operational platform as a separately defined scope.

Confirmed scope: an interactive assessment/demo using clearly labelled sample records, as selected by the user during this review. It can be delivered entirely in the frontend; live customer records, authentication, real bookings, and subscription integrations are not required. English is the proposed default based on the supplied public-facing copy. No assessment rubric was supplied, so grading-specific requirements remain unknown.

**What was reviewed**

- The complete [HTML proposal](</Users/thinhbui/Public/test/Assessment 3_ CSR Campaign Proposal/Assessment3CSRCampaignProposal.html>), including both audience tables and all 18 embedded images.
- The separate [journey diagram](/Users/thinhbui/Public/test/818635565_2107978850604151_4954059156033704149_n.png).
- The existing application entry point, home page, routes, styles, package configuration, and source inventory.
- Official publisher sources for the EPA fact sheet and GIZ/LafargeHolcim guidance pictured in the proposal, to check what those references actually support.

The proposal contains draft page copy, Vietnamese authoring notes, reference screenshots, proposed features, and future commitments. Notes such as “insert image/mockup” and “make these text buttons” are design inputs. They are not instructions to publish, contact anyone, or create live services. The actual task for this review is to explain what should be built and what is missing.

**1. Product purpose and audience**

The proposal describes Open Kiln as a place where customers independently inspect environmental evidence published by INSEE Ecocycle across the hazardous-waste treatment journey. Its three stated benefits are customer-checkable records, methodology transparency, and audit-ready evidence.

The distinction between publisher and reviewer matters: Ecocycle publishes evidence; the customer checks it. Neither the proposal nor the screenshots establish an independent third-party certification service. A successful search should open records and their supporting evidence, rather than automatically declare a company or treatment compliant.

| Audience | Main task | Evidence and services specified in the proposal | Intended onward journey |
| --- | --- | --- | --- |
| EHS & Plant Managers | Check their own treatment records for audits, compliance work, and ESG reporting | Manifest; methodology and limitations; monitoring summary; evidence timeline; PCB/OPTOCE reference material | Verification Hub → guided plant visit → executive roundtable |
| Industrial Park Developers & Management Boards | Understand park-level performance and governance risks | Aggregated ESG dashboard; environmental risks; compliance summary; quarterly governance report; policy updates | Governance Portal → policy updates → governance roundtable |

The park pathway explicitly relies on consent-based aggregation and anonymised data. A role selector on a landing page is navigation; it cannot confer permission to view tenant records.

**2. Proposed page structure**

Keep one coherent page, with Search & Verify and Evidence Library available directly from the navigation. Use the flow diagram to explain the visitor journey, while also allowing direct access to evidence and transparency information.

| Order | Section | Required content | Recommended behaviour |
| --- | --- | --- | --- |
| 1 | Header and hero | Open Kiln name; “verify, not just trust” campaign message; proposal subtitle; three benefit statements | Primary CTA: Search & Verify. Secondary CTA: Explore the evidence. Use approved INSEE branding when supplied. |
| 2 | Search & Verify | Search by manifest ID, generator name, or treatment date; “Verify record” action | Provide an explicit search-type control and a suitable input. For the demo, offer a sample record shortcut. Display results and an evidence detail view. |
| 3 | Evidence categories | Hazardous Waste Manifest; Treatment Methodology; PCB & OPTOCE Evidence; Verification History | Select a category to filter or open matching evidence. Keep the initial four categories from the source; include monitoring and treatment milestones within the relevant detail views. |
| 4 | “Who is verifying?” | Two audience cards with distinct value statements | Select the EHS or park-board pathway and reveal its content. Keep both audiences easy to discover and switch between. |
| 5 | EHS pathway | Verification Hub preview; evidence modules; treatment journey; supporting resources; guided visit; executive roundtable | Explain the four stages: waste handover → treatment process → Evidence Hub → customer verification. Provide a working preview and clear next-step CTAs. |
| 6 | Park-board pathway | Governance Portal preview; aggregated indicators; risk and compliance content; governance reports; consent explanation; policy resources; roundtable | Explain tenant records → consent aggregation → governance portal → board oversight. A demo preview must use sample park data. |
| 7 | Evidence Library | Technical references, methodology notes, dashboard access, supporting-evidence requests | Show searchable/filterable resources with publisher, date/version, scope, access status, and actual destinations. Distinguish documents from links to services. |
| 8 | Visits and executive engagement | Visit request CTA; executive and governance roundtables; follow-up resources | Allow both audiences to request a plant visit, as specified in the visit banner. Present the correct roundtable for each audience. |
| 9 | Transparency and footer | Publication, timestamps, methodology links, traceability; Year 1/Year 2 boundary; contact and relevant policies | Keep the transparency statement on the main page. Link to it from the header or footer and near record details. Explain any demo limitations next to the relevant interaction. |

The source repeats the audience descriptions and evidence modules in several places. Consolidating them into one selector and two clear pathway sections preserves the requirements while avoiding a repetitive page. Keep online verification, the physical visit, and executive discussion as distinct stages.

The reference screenshots suggest restrained green accents, white surfaces, thin borders, rounded cards, and simple icons. These are useful visual cues, not an approved INSEE design system. The pale-blue flowchart describes structure; it does not establish the page's brand palette. Rebuild text, cards, forms, and timelines as responsive components. Do not use screenshots of text as the finished interface.

**3. Functional scope for the first delivery**

The following interaction detail is recommended to turn the source into a usable demo. Result layouts, field schemas, and error behaviour are not specified in the documents.

| Interaction | Completion requirement for an assessment/demo | Additional requirement for a live service |
| --- | --- | --- |
| Record search | Query a fixed sample dataset; distinguish exact manifest lookup, generator matches, and date matches; handle empty input and no results | Authorised record API, defined search rules, organisation-scoped access, and reliable loading/error responses |
| Record detail | Show identity, quantity with units, treatment milestones, publication time, methodology, monitoring coverage, and linked sample evidence | Authoritative records, publication/version history, permission checks, and ownership of data quality |
| Evidence categories | Actually filter or open relevant material | Maintained taxonomy and publication workflow |
| Audience selector | Switch the explanatory content and appropriate preview | Separate authenticated permissions; changing the selector must not expand access |
| Evidence Library | Open an actual reference or a clearly labelled sample detail; indicate unavailable resources accurately | Maintained links/files, public-versus-restricted access, revision control, and content owner |
| Governance preview | Show a small coherent sample of aggregated park performance, risk trends, and reporting content | Defined metrics, reporting periods, consenting-tenant coverage, aggregation/privacy rules, and a data source |
| Visit/roundtable requests | Open and validate a form; clearly say that a demo submission is not sent | A real receiving service, submission acknowledgement, duplicate handling, and an operational follow-up owner |
| Updates and supporting-evidence requests | Working preview or clearly identified external destination | Subscription/request service, stated consent behaviour, and actual delivery/follow-up process |

Recommended record-detail fields: manifest ID, generator, waste ID/type, quantity and unit, receipt date, treatment date/status, treatment location if available, publication timestamp, evidence version, methodology reference and limitations, monitoring period/scope, and a milestone timeline. These are a proposed content contract, not fields found in an existing API.

Keep treatment status separate from evidence availability and customer review. “Treatment completed,” “evidence published,” and “reviewed by a customer” describe different facts. A lookup or green check icon must not silently collapse them into one “verified” status.

Each library entry should declare its type: treatment-specific evidence, INSEE-issued technical material, third-party background reference, policy update, or service link. General guidance may support understanding without proving the completion of a particular treatment record.

**4. Scope boundaries and unresolved source issues**

| Finding | Evidence | Recommended resolution |
| --- | --- | --- |
| Landing page and full platform are mixed together | Search, portals, dashboards, reporting, and requests appear alongside campaign sections | Complete a landing page plus bounded previews first. Scope live data, authentication, and operational workflows separately if required. |
| Year 2 includes downloadable reporting integration | Transparency statement, image2 | Do not add working report-generation/export promises to Year 1. Ordinary links to existing reference PDFs are a different capability and can still be available. Confirm whether quarterly governance reports are editorial documents or generated exports. |
| Two governance screenshots are positioned under the EHS executive-roundtable heading | image13 describes park performance review, governance risk dialogue, and collaborative action planning; image18 lists park ESG access | Put this material in the board pathway. The EHS roundtable agenda remains unspecified; obtain copy or mark any proposed agenda as draft. |
| Plant visits are relevant to both audiences | image12 explicitly includes EHS teams and industrial park representatives, while the flow diagram puts visits only on the EHS branch | Offer the visit CTA to both audiences while keeping the board governance journey intact. |
| Audience and feature names vary | “Industrial Park Boards,” “Developers & Management Boards,” “Evidence Hub,” and “Verification Hub” appear | Use the full audience name initially and a short consistent label afterwards. Treat the Verification Hub as the user experience and the Evidence Library as the shared resource collection. |
| “Verification History” and “Evidence timeline” may overlap | image17 versus EHS table/image9 | Preserve treatment milestones and evidence-publication/version history as distinguishable concepts until final terminology is agreed. |
| References are presented beside proposed INSEE evidence | image15 includes an EPA fact sheet, GIZ/LafargeHolcim guidance, and third-party dashboards | Add clear publisher/type labels and original source links. Replace illustrative app screenshots with original Open Kiln previews. |
| “Live” indicators and broad assurance language lack underlying data | Library screenshot and benefit statements | Use sample-data labels in a demo. For a real page, publish only claims supported by the available data and operating process. |
| No assessment rubric is present | The attachment is a page-content proposal and images | Do not claim rubric compliance. Obtain the rubric if marks depend on campaign theory, accessibility, citations, hosting, or additional assessment deliverables. |

**5. Source validity checks**

The pictured PCB Fact Sheet is an EPA e-Manifest document about the United States system and TSCA/RCRA context. It does not establish INSEE Vietnam's licence or prove any individual waste-treatment outcome. The attachment shows an October 2024 version; when opened during this review, the publisher URL served a document marked August 2026. This is a concrete reason to keep source dates and versions visible. See the [EPA fact sheet](https://www.epa.gov/system/files/documents/2024-09/e-manifest_pcb_waste_handlers_factsheet.pdf).

The pictured methodology document is general GIZ/LafargeHolcim guidance. Its introductory notice describes general orientation and the need to account for national/local conditions. It should be labelled as an external reference, with any INSEE-specific methodology or monitoring note provided separately. See the [GIZ/LafargeHolcim guidance](https://www.giz.de/en/downloads/giz-2020_en_guidelines-pre-coprocessing.pdf).

These checks establish the nature of the references. They are not a validation of current INSEE permits, treatment performance, or Vietnam-specific compliance. The documents supplied do not contain the underlying record dataset, current permits, an OPTOCE fact sheet, monitoring reports, or functioning service URLs.

**6. Asset and content inventory**

All image numbers below refer to files in the attached proposal's images directory. They were visually inspected, including images that contain the only copy of a requirement.

| Asset | Content and intended use | Delivery treatment |
| --- | --- | --- |
| [image1.jpg](</Users/thinhbui/Public/test/Assessment 3_ CSR Campaign Proposal/images/image1.jpg>) | KEY ESG portal and activity-feed reference | Inspiration only; create an Open Kiln preview |
| [image2.png](</Users/thinhbui/Public/test/Assessment 3_ CSR Campaign Proposal/images/image2.png>) | Transparency commitment and Year 1/Year 2 boundary | Preserve meaning as accessible text |
| [image3.png](</Users/thinhbui/Public/test/Assessment 3_ CSR Campaign Proposal/images/image3.png>) | Tenant records → consent aggregation → portal → oversight | Rebuild as the governance data journey |
| [image4.png](</Users/thinhbui/Public/test/Assessment 3_ CSR Campaign Proposal/images/image4.png>) | Governance-dashboard references | Create a consistent sample portal preview |
| [image5.png](</Users/thinhbui/Public/test/Assessment 3_ CSR Campaign Proposal/images/image5.png>) | ESG Toolkit; Compliance Toolkit; Policy Update Briefs; Follow-up Meetings | Give each a real destination or honest demo behaviour |
| [image6.png](</Users/thinhbui/Public/test/Assessment 3_ CSR Campaign Proposal/images/image6.png>) | Park dashboard, risk trends, reports, consent-based access | Preserve in the board pathway |
| [image7.png](</Users/thinhbui/Public/test/Assessment 3_ CSR Campaign Proposal/images/image7.png>) | Verification/dashboard reference collage | Replace with an original, readable record preview |
| [image8.png](</Users/thinhbui/Public/test/Assessment 3_ CSR Campaign Proposal/images/image8.png>) | Two audience descriptions | Build the audience selector |
| [image9.png](</Users/thinhbui/Public/test/Assessment 3_ CSR Campaign Proposal/images/image9.png>) | Handover → treatment → evidence → customer verification | Rebuild as the EHS process timeline |
| [image10.png](</Users/thinhbui/Public/test/Assessment 3_ CSR Campaign Proposal/images/image10.png>) | Manifest, methodology/limitations, monitoring, library | Preserve the four EHS evidence groups |
| [image11.png](</Users/thinhbui/Public/test/Assessment 3_ CSR Campaign Proposal/images/image11.png>) | ESG Dashboard; PCB Fact Sheet; OPTOCE Fact Sheet; ESG Data Request Portal; Monthly Email Updates | Resolve link, request, and subscription behaviour |
| [image12.png](</Users/thinhbui/Public/test/Assessment 3_ CSR Campaign Proposal/images/image12.png>) | Visit CTA available to both audiences | Build a shared request entry point |
| [image13.png](</Users/thinhbui/Public/test/Assessment 3_ CSR Campaign Proposal/images/image13.png>) | Park review, risk dialogue, collaborative action planning | Move into governance-roundtable content |
| [image14.png](</Users/thinhbui/Public/test/Assessment 3_ CSR Campaign Proposal/images/image14.png>) | Park Review → Risk Dialogue → Action Planning → Annual Governance Review | Preserve the fourth, annual-review step |
| [image15.png](</Users/thinhbui/Public/test/Assessment 3_ CSR Campaign Proposal/images/image15.png>) | Library example: PCB fact sheet, methodology, ESG dashboard, data request portal | Separate document cards from service cards; remove browser artefacts |
| [image16.png](</Users/thinhbui/Public/test/Assessment 3_ CSR Campaign Proposal/images/image16.png>) | Manifest ID / Generator name / Treatment date search | Build a real form with defined query semantics |
| [image17.png](</Users/thinhbui/Public/test/Assessment 3_ CSR Campaign Proposal/images/image17.png>) | Four primary evidence categories | Build interactive category cards |
| [image18.png](</Users/thinhbui/Public/test/Assessment 3_ CSR Campaign Proposal/images/image18.png>) | Park dashboard, risk analysis, governance brief, policy pack | Consolidate into board-pathway content |

Before final design, resolve the approved INSEE/Open Kiln logo, colours and font, final hero and transparency copy, representative plant/visit imagery, audience-specific roundtable copy, and whether the output is English-only or bilingual. The public-facing draft is predominantly English; Vietnamese text functions as authoring guidance.

Before making real-service claims, obtain actual evidence documents and versions, permitted sample/customer data, access rules, KPI definitions, CTA destinations, request recipients, subscription handling, contact details, and the live deployment destination. Demo fixtures can unblock interface work, but they cannot supply these operational facts.

**7. Existing code and implementation approach**

The repository currently contains a generic [home page](/Users/thinhbui/Public/test/src/views/_private/HomePage.tsx:3), a [template document title](/Users/thinhbui/Public/test/index.html:17), base UI components, and routing scaffolding. Source searches found no Open Kiln, INSEE, Ecocycle, manifest, evidence, or governance feature implementation in the application source.

The [package manifest](/Users/thinhbui/Public/test/package.json:27) declares React 19, TypeScript, Vite, Tailwind CSS 4, TanStack Router/Query, and Radix-based UI dependencies. These existing building blocks are sufficient for the proposed interface; selecting another framework is unnecessary for this scope.

The `_private` layout name currently does not enforce authentication: [its implementation](/Users/thinhbui/Public/test/src/routes/_private.tsx:7) only renders an outlet. Put the campaign on an explicitly public route and avoid treating the current naming as access protection. Real verification and governance access would require actual application/backend permissions.

Neither installed dependencies nor a Yarn lockfile were present during inspection. Establish a reproducible dependency baseline before implementation and validation. The repository notes describe Plug'n'Play, but the actual `.yarnrc.yml` uses `nodeLinker: node-modules`; follow the actual configuration when preparing the environment.

Recommended component boundaries: campaign header/hero, record search, evidence category selector, audience selector, EHS pathway, governance pathway, process timeline, evidence library, request dialog, and transparency statement. Keep draft copy and sample evidence in typed data files. Use a small record/evidence service interface if live integration is expected later; a larger platform architecture is unnecessary for a static assessment.

**8. Work sequence and acceptance criteria**

| Step | Work | Concrete completion evidence |
| --- | --- | --- |
| 1 | Finalise language, rubric if available, and source inconsistencies within the confirmed demo scope | Final section inventory; explicit sample-data and simulated-action labels |
| 2 | Prepare copy, document catalogue, sample evidence, and asset replacements | Every card/CTA has content and a destination; sources and sample labels are recorded |
| 3 | Create desktop and mobile layouts | Clear hierarchy; readable previews; complete EHS and board journeys; transparency visible on the main page |
| 4 | Implement the page and bounded interactions | Search returns meaningful sample results; audience/category switching works; details open; request forms behave truthfully |
| 5 | Validate functionality, layout, and claims | Checks below pass; remaining operational dependencies are clearly recorded |
| 6 | Deliver the agreed preview or deployment | Working URL/build, handoff notes, and a list of sample versus live features |

Acceptance criteria for the recommended demo:

- The initial view explains what Open Kiln offers and gives a direct route to Search & Verify.
- Search supports the three advertised query types. Blank, unmatched, and multi-match queries behave sensibly. A sample record shortcut removes the need to guess an ID.
- A record result reveals usable evidence details, including timestamps, methodology limitations, and treatment milestones. Opening a record does not certify compliance.
- All four category cards work, and both audience pathways are complete and navigable using keyboard and pointer.
- Board examples contain only clearly labelled aggregate sample data. No UI role switch suggests access to other organisations' records.
- All five EHS support links and all four board support links have defined outcomes. Visits and both roundtable paths are reachable.
- The Evidence Library identifies publishers, document types, and dates/versions; actual reference links open correctly.
- Form validation is understandable. Demo actions never claim to have booked, emailed, subscribed, or submitted a real request.
- Year 1 functionality and Year 2 reporting integration remain distinguishable.
- The page works at representative phone, tablet, and desktop widths without horizontal overflow. Text remains usable with zoom, focus is visible, form labels are explicit, and dialogs return focus appropriately.
- Replace template title/favicon and add appropriate page description/share metadata. Optimise images and avoid loading a heavy live-style dashboard merely for decoration.
- Run the repository's type check, lint, and production build after implementation. Add focused behavioural tests for search, filtering, and any nontrivial request logic; manually exercise both complete visitor journeys. Record the actual commands and results.

No application build, tests, or browser runtime checks were performed during this document investigation. The repository observations above are source-level findings. Grading completeness and production readiness remain dependent on the missing rubric and operational requirements respectively.
