"use client";

import { useExperience } from "@/features/open-kiln/Experience";
import { EvidenceLibrary } from "@/features/open-kiln/Library";
import { Pathways } from "@/features/open-kiln/Pathways";
import { RecordSearch } from "@/features/open-kiln/Records";

export function RecordSearchSection() {
  const { inputRef, browseSignal, openModal } = useExperience();
  return (
    <RecordSearch
      inputRef={inputRef}
      browseSignal={browseSignal}
      onRecord={(record) => openModal({ kind: "record", record })}
    />
  );
}

export function PathwaysSection() {
  const { openModal, openResource } = useExperience();
  return (
    <Pathways
      onRecord={(record) => openModal({ kind: "record", record })}
      onResource={openResource}
      onRequest={(request) => openModal({ kind: "request", request })}
      onOverview={() => openModal({ kind: "overview" })}
    />
  );
}

export function LibrarySection() {
  const { libraryVisit, category, setCategory, openModal } = useExperience();
  return (
    <EvidenceLibrary
      key={libraryVisit}
      category={category}
      onCategory={setCategory}
      onResource={(resource) => openModal({ kind: "resource", resource })}
      onOverview={() => openModal({ kind: "overview" })}
      onRequest={(request) => openModal({ kind: "request", request })}
    />
  );
}
