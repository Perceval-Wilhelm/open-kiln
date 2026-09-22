"use client";

import { ArrowRight, ArrowUpRight } from "lucide-react";
import { createContext, use, useRef, useState, type ReactNode } from "react";
import { EvidenceOverlay } from "@/features/open-kiln/EvidenceOverlay";
import { resources } from "@/features/open-kiln/data";
import { Action } from "@/features/open-kiln/Primitives";
import type { DemoRequest, EvidenceCategory, ModalView } from "@/features/open-kiln/types";

function useExperienceState() {
  const [sampleSignal, setSampleSignal] = useState(0);
  const [category, setCategory] = useState<EvidenceCategory | "All">("All");
  const [libraryVisit, setLibraryVisit] = useState(0);
  const [view, setView] = useState<ModalView | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  function openModal(next: ModalView) {
    returnFocusRef.current = document.activeElement as HTMLElement | null;
    setView(next);
  }
  function openResource(id: string) {
    const resource = resources.find((item) => item.id === id);
    if (resource) openModal({ kind: "resource", resource });
  }
  function focusSearch(sample = false) {
    if (sample) setSampleSignal((current) => current + 1);
    document.getElementById("verify")?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
    });
    inputRef.current?.focus({ preventScroll: true });
  }
  function selectCategory(nextCategory: EvidenceCategory) {
    setCategory(nextCategory);
    setLibraryVisit((current) => current + 1);
    requestAnimationFrame(() => {
      document.getElementById("library")?.scrollIntoView({ behavior: "instant" });
      document.getElementById("library-query")?.focus({ preventScroll: true });
    });
  }
  return {
    sampleSignal,
    category,
    setCategory,
    libraryVisit,
    view,
    setView,
    inputRef,
    returnFocusRef,
    openModal,
    openResource,
    focusSearch,
    selectCategory,
  };
}

const ExperienceContext = createContext<ReturnType<typeof useExperienceState> | null>(null);

export function ExperienceProvider({ children }: { children: ReactNode }) {
  const experience = useExperienceState();
  return (
    <ExperienceContext value={experience}>
      {children}
      {experience.view && (
        <EvidenceOverlay
          view={experience.view}
          onClose={() => experience.setView(null)}
          returnFocus={experience.returnFocusRef}
        />
      )}
    </ExperienceContext>
  );
}

export function useExperience() {
  const context = use(ExperienceContext);
  if (!context) throw new Error("Open Kiln interactions require ExperienceProvider.");
  return context;
}

export function HeroActions() {
  const { focusSearch } = useExperience();
  return (
    <div className="ok-hero-actions">
      <Action onClick={() => focusSearch()}>
        Search & Verify <ArrowUpRight size={19} />
      </Action>
      <button className="ok-hero-secondary" onClick={() => focusSearch(true)}>
        Explore a sample <ArrowRight size={17} />
      </button>
    </div>
  );
}

export function SampleRecordButton({ children }: { children: ReactNode }) {
  const { focusSearch } = useExperience();
  return (
    <button
      className="ok-floating-record"
      onClick={() => focusSearch(true)}
      aria-label="Explore sample treatment record OK-DEMO-001"
    >
      {children}
    </button>
  );
}

export function CategoryButton({ category, children }: { category: EvidenceCategory; children: ReactNode }) {
  const { selectCategory } = useExperience();
  return (
    <button className="ok-category-card" onClick={() => selectCategory(category)}>
      {children}
    </button>
  );
}

export function RequestButton({ request, children }: { request: DemoRequest; children: ReactNode }) {
  const { openModal } = useExperience();
  return (
    <button className="ok-text-action" onClick={() => openModal({ kind: "request", request })}>
      {children}
    </button>
  );
}

export function ResourceButton({ id, children }: { id: string; children: ReactNode }) {
  const { openResource } = useExperience();
  return (
    <button className="ok-text-action" onClick={() => openResource(id)}>
      {children}
    </button>
  );
}
