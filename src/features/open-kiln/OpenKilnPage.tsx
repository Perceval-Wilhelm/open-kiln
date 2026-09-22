import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Building2,
  CalendarDays,
  Check,
  FileClock,
  FileText,
  FlaskConical,
  MessageSquareText,
  ShieldCheck,
} from "lucide-react";
import {
  CategoryButton,
  ExperienceProvider,
  HeroActions,
  RequestButton,
  ResourceButton,
} from "@/features/open-kiln/Experience";
import { LibrarySection, PathwaysSection, RecordSearchSection } from "@/features/open-kiln/ExperienceSections";
import { KilnIllustration } from "@/features/open-kiln/KilnIllustration";
import { navigation } from "@/features/open-kiln/navigation";
import { SectionHeading } from "@/features/open-kiln/Primitives";
import { SiteHeader } from "@/features/open-kiln/SiteHeader";

// Server composition keeps campaign copy and the illustration out of the client module graph.
export function OpenKilnPage() {
  return (
    <ExperienceProvider>
      <div className="ok-site" id="top">
        <a className="ok-skip-link" href="#main">
          Skip to content
        </a>
        <div className="ok-announcement">
          <div className="ok-container">
            <span>A CSR campaign concept for INSEE Ecocycle</span>
            <span>
              <i aria-hidden="true" /> Interactive demo · Sample data
            </span>
          </div>
        </div>
        <SiteHeader />
        <main id="main" tabIndex={-1}>
          <section className="ok-hero">
            <div className="ok-container ok-hero-grid">
              <div className="ok-hero-copy">
                <div className="ok-eyebrow">
                  <span className="ok-eyebrow-line" />
                  TRANSPARENCY YOU CAN EXPLORE
                </div>
                <h1>
                  Verify,
                  <br />
                  <span>not just trust.</span>
                </h1>
                <p>
                  What happens to your waste shouldn’t be a question mark. Explore the evidence behind every step of its
                  treatment journey.
                </p>
                <HeroActions />
                <div className="ok-hero-caption">
                  <ShieldCheck size={17} />
                  <span>Ecocycle publishes the record. You check the evidence.</span>
                </div>
              </div>
              <KilnIllustration />
            </div>
            <div className="ok-container ok-trust-strip">
              {["Customer-checkable records", "Methodology transparency", "Audit-ready evidence"].map((text, i) => (
                <div key={text}>
                  <span className="ok-trust-number">0{i + 1}</span>
                  <span>{text}</span>
                  <Check size={17} />
                </div>
              ))}
            </div>
          </section>
          <RecordSearchSection />
          <section className="ok-section ok-categories">
            <div className="ok-container">
              <div className="ok-heading-row">
                <SectionHeading number="02" eyebrow="WHAT CAN YOU VERIFY?" title="More than a completion date." />
                <p className="ok-heading-aside">
                  Look closer at the records, methods and history that make evidence useful.
                </p>
              </div>
              <div className="ok-category-grid">
                {[
                  {
                    title: "Hazardous Waste Manifest",
                    text: "Waste identity, quantity, receipt and completion status.",
                    category: "Manifest" as const,
                    icon: FileText,
                  },
                  {
                    title: "Treatment Methodology",
                    text: "The treatment approach, monitoring scope and limitations.",
                    category: "Methodology & Monitoring" as const,
                    icon: FlaskConical,
                  },
                  {
                    title: "PCB & OPTOCE Evidence",
                    text: "Technical context and clearly attributed supporting references.",
                    category: "PCB & OPTOCE" as const,
                    icon: ShieldCheck,
                  },
                  {
                    title: "Verification History",
                    text: "Timestamped milestones and a visible publication trail.",
                    category: "History" as const,
                    icon: FileClock,
                  },
                ].map(({ title, text, category: nextCategory, icon: Icon }) => (
                  <CategoryButton key={title} category={nextCategory}>
                    <div>
                      <Icon size={27} strokeWidth={1.5} />
                      <ArrowUpRight size={19} />
                    </div>
                    <h3>{title}</h3>
                    <p>{text}</p>
                    <span>
                      Explore evidence <ArrowRight size={15} />
                    </span>
                  </CategoryButton>
                ))}
              </div>
            </div>
          </section>
          <PathwaysSection />
          <LibrarySection />
          <section className="ok-section ok-engagement" id="connect">
            <div className="ok-container">
              <SectionHeading
                number="05"
                eyebrow="FROM EVIDENCE TO CONVERSATION"
                title="See the process. Join the conversation."
              >
                Take your questions beyond the screen. Explore the proposed ways to engage.
              </SectionHeading>
              <div className="ok-engagement-grid">
                {[
                  {
                    icon: CalendarDays,
                    label: "ON THE GROUND",
                    title: "A closer look, in person.",
                    text: "A guided verification plant visit for EHS teams and industrial park representatives.",
                    action: "Book a verification visit",
                    kind: "visit" as const,
                    agenda:
                      "Sample agenda: follow the treatment journey, discuss monitoring scope and ask about supporting records.",
                  },
                  {
                    icon: MessageSquareText,
                    label: "EHS EXECUTIVE ROUNDTABLE",
                    title: "Bring your questions.",
                    text: "A focused discussion about treatment records, methodology and evidence gaps.",
                    action: "Explore the EHS roundtable",
                    kind: "roundtable" as const,
                    agenda:
                      "Sample agenda: review treatment evidence → discuss monitoring limitations → agree follow-up evidence actions.",
                  },
                  {
                    icon: Building2,
                    label: "GOVERNANCE ROUNDTABLE",
                    title: "Build a shared perspective.",
                    text: "Connect park performance with governance priorities and collaborative action.",
                    action: "Explore governance roundtable",
                    kind: "roundtable" as const,
                    agenda:
                      "Sample agenda: park performance review → governance risk dialogue → collaborative action planning.",
                  },
                ].map(({ icon: Icon, label, title, text, action, kind, agenda }) => (
                  <article className="ok-engagement-card" key={title}>
                    <Icon size={27} strokeWidth={1.5} />
                    <span className="ok-small-label">{label}</span>
                    <h3>{title}</h3>
                    <p>{text}</p>
                    <details>
                      <summary>View sample agenda</summary>
                      <p>{agenda}</p>
                    </details>
                    <RequestButton request={{ kind, title: action, context: text }}>
                      {action}
                      <ArrowUpRight size={17} />
                    </RequestButton>
                  </article>
                ))}
              </div>
            </div>
          </section>
          <section id="transparency" className="ok-transparency" tabIndex={-1}>
            <div className="ok-container">
              <div className="ok-transparency-icon">
                <ShieldCheck size={38} strokeWidth={1.2} />
              </div>
              <div>
                <span className="ok-eyebrow">OUR TRANSPARENCY COMMITMENT</span>
                <h2>
                  Trust starts with
                  <br />
                  something you can check.
                </h2>
                <p>
                  Open Kiln is designed to make treatment evidence timestamped, methodology-linked and traceable to its
                  record. Customers inspect the evidence themselves; Ecocycle publishes the record.
                </p>
                <p className="ok-transparency-demo">
                  This concept uses fictional records. External references are labelled separately and do not verify a
                  treatment outcome.
                </p>
              </div>
              <div className="ok-roadmap">
                <div>
                  <span>YEAR 01</span>
                  <h3>Make evidence checkable.</h3>
                  <p>Record exploration, methodology and transparent evidence trails.</p>
                </div>
                <ArrowDown size={20} />
                <div>
                  <span>YEAR 02 · PROPOSED</span>
                  <h3>Connect the reporting.</h3>
                  <p>Downloadable reporting integration, beyond this demonstration.</p>
                </div>
              </div>
            </div>
          </section>
        </main>
        <footer className="ok-footer">
          <div className="ok-container">
            <div>
              <a href="#top" className="ok-wordmark">
                open<span>kiln</span>
                <i>.</i>
              </a>
              <p>
                A CSR campaign concept for INSEE Ecocycle.
                <br />
                Explore the evidence. Ask better questions.
              </p>
            </div>
            <div>
              <span className="ok-small-label">EXPLORE</span>
              {navigation.map((item) => (
                <a key={item.id} href={`#${item.id}`}>
                  {item.label}
                </a>
              ))}
            </div>
            <div>
              <span className="ok-small-label">ABOUT THIS DEMO</span>
              <p>
                Fictional data. Simulated requests.
                <br />
                No customer data or live services.
              </p>
              <ResourceButton id="epa">
                EPA reference <ArrowUpRight size={15} />
              </ResourceButton>
              <ResourceButton id="giz">
                GIZ reference <ArrowUpRight size={15} />
              </ResourceButton>
            </div>
          </div>
          <div className="ok-container ok-footer-bottom">
            <span>Open Kiln · Assessment demo</span>
            <a href="#top">Back to top ↑</a>
          </div>
        </footer>
      </div>
    </ExperienceProvider>
  );
}
