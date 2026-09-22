"use client";
import { ArrowUpRight, Check, FileText, ScanLine } from "lucide-react";
import type { ReactNode } from "react";
import { FeaturedRecordButton } from "@/features/open-kiln/Experience";
import { featuredRecord } from "@/features/open-kiln/data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const stages = [
  {
    id: "receive",
    label: "Receive",
    title: "Identity before treatment.",
    text: "Match the waste stream, receiving quantity and handover record before reviewing the treatment route.",
    evidence: "Handover record · Receipt reconciliation",
  },
  {
    id: "treat",
    label: "Co-process",
    title: "A process you can follow.",
    text: "Connect suitability review and treatment milestones with the scope of the available monitoring.",
    evidence: "Methodology · Monitoring scope",
  },
  {
    id: "document",
    label: "Document",
    title: "An evidence trail that stays visible.",
    text: "Read publication dates and revisions. See what is available, and what still needs a closer look.",
    evidence: "Publication history · Evidence register",
  },
];

export function ProcessExplorer({ children }: { children: ReactNode }) {
  return (
    <div className="ok-process-explorer">
      <div className="ok-process-masthead">
        <span>
          <ScanLine size={17} /> INSIDE THE PROCESS
        </span>
        <span>01—03</span>
      </div>
      <Tabs defaultValue="treat" className="ok-process-tabs">
        <TabsList aria-label="Explore the co-processing stages" className="ok-process-tablist">
          {stages.map((stage, index) => (
            <TabsTrigger value={stage.id} key={stage.id}>
              <span>0{index + 1}</span>
              {stage.label}
            </TabsTrigger>
          ))}
        </TabsList>
        <div className="ok-process-canvas">
          {children}
          <span className="ok-process-caption">CO-PROCESSING / PROCESS SCHEMATIC</span>
        </div>
        {stages.map((stage) => (
          <TabsContent value={stage.id} key={stage.id} className="ok-process-description">
            <h2>{stage.title}</h2>
            <p>{stage.text}</p>
            <span>
              <Check size={14} />
              {stage.evidence}
            </span>
          </TabsContent>
        ))}
      </Tabs>
      <FeaturedRecordButton>
        <span className="ok-document-icon">
          <FileText size={21} />
        </span>
        <span>
          <small className="ok-mono">{featuredRecord.id}</small>
          <strong>Follow the evidence</strong>
        </span>
        <ArrowUpRight size={20} />
      </FeaturedRecordButton>
    </div>
  );
}
