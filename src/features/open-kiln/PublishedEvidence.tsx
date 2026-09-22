import { ArrowUpRight, BookOpen, FlaskConical } from "lucide-react";
import { ResourceButton } from "@/features/open-kiln/Experience";

export function PublishedEvidence() {
  return (
    <section className="ok-published-evidence" aria-labelledby="published-evidence-title">
      <div className="ok-container">
        <div className="ok-published-heading">
          <span className="ok-eyebrow">BEYOND THE RECORD</span>
          <h2 id="published-evidence-title">Real research. Read in context.</h2>
          <p>Original publications, with their dates, authors and boundaries intact.</p>
        </div>
        <div className="ok-published-grid">
          <article className="ok-research-feature">
            <span className="ok-small-label">SINTEF · VIETNAM PILOT · DECEMBER 2021</span>
            <div className="ok-research-figures">
              <p>
                <strong>
                  225<span>t</span>
                </strong>
                <span>plastic waste co-processed</span>
              </p>
              <p>
                <strong>
                  ~165<span>t</span>
                </strong>
                <span>coal saved in the trial</span>
              </p>
            </div>
            <p>
              Historical results reported by SINTEF in June 2022. Research findings describe this pilot; they do not
              verify an individual shipment.
            </p>
            <ResourceButton id="vietnam-pilot">
              Read the published findings <ArrowUpRight size={18} />
            </ResourceButton>
          </article>
          <article>
            <BookOpen size={25} strokeWidth={1.5} />
            <span className="ok-small-label">GIZ / LAFARGEHOLCIM · 2020</span>
            <h3>The technical foundation.</h3>
            <p>Pre-processing, co-processing and the questions to ask about operating conditions.</p>
            <ResourceButton id="giz">
              Explore the guidance <ArrowUpRight size={17} />
            </ResourceButton>
          </article>
          <article>
            <FlaskConical size={25} strokeWidth={1.5} />
            <span className="ok-small-label">INSEE ECOCYCLE VIETNAM</span>
            <h3>The operator’s perspective.</h3>
            <p>Read INSEE’s own explanation of waste streams and its co-processing approach.</p>
            <ResourceButton id="insee-process">
              Read the process overview <ArrowUpRight size={17} />
            </ResourceButton>
          </article>
        </div>
      </div>
    </section>
  );
}
