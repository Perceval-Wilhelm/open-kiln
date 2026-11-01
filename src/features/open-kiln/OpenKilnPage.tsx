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
import Image from "next/image";
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
import { PublishedEvidence } from "@/features/open-kiln/PublishedEvidence";
import { officialContact } from "@/features/open-kiln/references";
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
              <i aria-hidden="true" /> Evidence, made accessible
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
                  <span>
                    not just <span className="ok-hero-highlight">trust.</span>
                  </span>
                </h1>
                <p>
                  What happens to your waste shouldn’t be a question mark. Explore the evidence behind every step of its
                  treatment journey.
                </p>
                <HeroActions />
                <div className="ok-hero-caption">
                  <ShieldCheck size={17} />
                  <span>From the treatment milestone to the supporting document.</span>
                </div>
              </div>
              <KilnIllustration />
            </div>
            <div className="ok-container ok-trust-strip">
              {["Customer-checkable records", "Methodology transparency", "Evidence for informed reviews"].map(
                (text, i) => (
                  <div key={text}>
                    <span className="ok-trust-number">0{i + 1}</span>
                    <span>{text}</span>
                    <Check size={17} />
                  </div>
                ),
              )}
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
          <PublishedEvidence />
          <PathwaysSection />
          <LibrarySection />
          <section className="ok-section ok-engagement" id="connect">
            <div className="ok-container">
              <SectionHeading
                number="05"
                eyebrow="FROM EVIDENCE TO CONVERSATION"
                title="See the process. Join the conversation."
              >
                Take your questions beyond the screen. Prepare for a site visit or a focused conversation.
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
                      "Proposed agenda: follow the treatment journey, discuss monitoring scope and ask about supporting records.",
                  },
                  {
                    icon: MessageSquareText,
                    label: "EHS EXECUTIVE ROUNDTABLE",
                    title: "Bring your questions.",
                    text: "A focused discussion about treatment records, methodology and evidence gaps.",
                    action: "Explore the EHS roundtable",
                    kind: "roundtable" as const,
                    agenda:
                      "Proposed agenda: review treatment evidence → discuss monitoring limitations → agree follow-up evidence actions.",
                  },
                  {
                    icon: Building2,
                    label: "GOVERNANCE ROUNDTABLE",
                    title: "Build a shared perspective.",
                    text: "Connect park performance with governance priorities and collaborative action.",
                    action: "Explore governance roundtable",
                    kind: "roundtable" as const,
                    agenda:
                      "Proposed agenda: park performance review → governance risk dialogue → collaborative action planning.",
                  },
                ].map(({ icon: Icon, label, title, text, action, kind, agenda }) => (
                  <article className="ok-engagement-card" key={title}>
                    <Icon size={27} strokeWidth={1.5} />
                    <span className="ok-small-label">{label}</span>
                    <h3>{title}</h3>
                    <p>{text}</p>
                    <details>
                      <summary>View proposed agenda</summary>
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
                  Open Kiln connects treatment milestones with their sources, publication dates and revisions. A
                  complete evidence set means its documents are available; it is not a certificate of regulatory
                  compliance.
                </p>
                <p className="ok-transparency-scope">
                  Public research is attributed to its original publisher. Operational records and park figures are
                  illustrative; they do not describe actual customers or shipments.
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
                  <p>Integrated reporting, document exports and connected evidence workflows.</p>
                </div>
              </div>
            </div>
          </section>
          <section className="ok-section ok-recognition" id="recognition" tabIndex={-1}>
            <div className="ok-container">
              <SectionHeading number="06" eyebrow="BEHIND OPEN KILN" title="Winner of the final pitch.">
                Open Kiln was created by the Coc Coc agency team for RMIT University’s Organisational Communication
                course, as a Work Integrated Learning project for INSEE Vietnam. The campaign won first place at the
                final pitch.
              </SectionHeading>
              <figure>
                <div className="ok-recognition-photo">
                  <Image
                    src="/images/final-pitch-team.jpg"
                    alt="Six people pose in front of an RMIT University screen while one holds the Open Kiln certificate of recognition."
                    width={3720}
                    height={2480}
                    sizes="(max-width: 800px) 100vw, 680px"
                  />
                  <AwardSeal />
                </div>
                <figcaption>The Coc Coc team celebrates first place at RMIT University, 23 September 2026.</figcaption>
              </figure>
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
              <span className="ok-small-label">SOURCES & CONTACT</span>
              <p>
                Independent campaign concept.
                <br />
                Not an official customer portal.
              </p>
              <a className="ok-text-action" href={officialContact} target="_blank" rel="noopener noreferrer">
                Official INSEE contact <ArrowUpRight size={15} />
                <span className="ok-sr-only"> (opens in a new tab)</span>
              </a>
              <ResourceButton id="privacy">
                Privacy & data handling <ArrowUpRight size={15} />
              </ResourceButton>
              <ResourceButton id="epa">
                EPA reference <ArrowUpRight size={15} />
              </ResourceButton>
              <ResourceButton id="giz">
                GIZ reference <ArrowUpRight size={15} />
              </ResourceButton>
            </div>
          </div>
          <div className="ok-container ok-footer-bottom">
            <span>Open Kiln · Evidence opens the conversation</span>
            <a href="#top">Back to top ↑</a>
          </div>
        </footer>
      </div>
    </ExperienceProvider>
  );
}

// Decorative only: the section heading and copy already state the award.
function AwardSeal() {
  return (
    <svg className="ok-award-seal" viewBox="0 0 120 120" aria-hidden="true" focusable="false">
      <defs>
        <path id="ok-seal-path" d="M60 18a42 42 0 1 1 0 84a42 42 0 1 1 0-84" />
        <linearGradient id="ok-seal-gold" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#f4dc8f" />
          <stop offset=".55" stopColor="#d9b049" />
          <stop offset="1" stopColor="#b98a2a" />
        </linearGradient>
      </defs>
      <circle cx="60" cy="60" r="58" fill="url(#ok-seal-gold)" />
      <circle cx="60" cy="60" r="52" fill="none" stroke="#152d24" strokeOpacity=".3" strokeDasharray="1 3" />
      <g className="ok-award-seal-ring">
        <text fontSize="8.6" letterSpacing="1.2">
          <textPath href="#ok-seal-path" textLength="258" lengthAdjust="spacing">
            WINNER · FINAL PITCH · RMIT 2026 ·
          </textPath>
        </text>
      </g>
      <circle cx="60" cy="60" r="30" fill="#152d24" />
      <text className="ok-award-seal-rank" x="60" y="62" textAnchor="middle" fontSize="22">
        1st
      </text>
      <text className="ok-award-seal-rank" x="60" y="76" textAnchor="middle" fontSize="7.5" letterSpacing="1.5">
        PLACE
      </text>
    </svg>
  );
}
