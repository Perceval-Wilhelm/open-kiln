"use client";

import { Component, lazy, Suspense, type ReactNode, type RefObject } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Action } from "@/features/open-kiln/Primitives";
import type { ModalView } from "@/features/open-kiln/types";

const EvidenceContent = lazy(() =>
  import("@/features/open-kiln/Dialogs").then((module) => ({ default: module.EvidenceContent })),
);

class DialogErrorBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

export function EvidenceOverlay({
  view,
  onClose,
  returnFocus,
  onNavigate,
  onTransparency,
}: {
  view: ModalView;
  onClose: () => void;
  returnFocus: RefObject<HTMLElement | null>;
  onNavigate: (view: ModalView) => void;
  onTransparency: () => void;
}) {
  const contentKey = view.kind === "record" ? view.record.id : view.kind === "resource" ? view.resource.id : view.kind;
  return (
    <Dialog
      open
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent
        className="ok-dialog"
        onCloseAutoFocus={(event) => {
          event.preventDefault();
          if (returnFocus.current?.isConnected) returnFocus.current.focus();
        }}
      >
        <div className="ok-dialog-body" key={contentKey}>
          <DialogErrorBoundary
            fallback={
              <>
                <DialogHeader>
                  <DialogTitle className="ok-dialog-title">This content couldn’t load.</DialogTitle>
                  <DialogDescription>
                    Check your connection, then reload the page to try again. No request was sent.
                  </DialogDescription>
                </DialogHeader>
                <div className="ok-dialog-actions">
                  {/* React caches rejected lazy imports; a page reload starts a fresh download. */}
                  <Action onClick={() => window.location.reload()}>Reload page</Action>
                  <Action secondary onClick={onClose}>
                    Close
                  </Action>
                </div>
              </>
            }
          >
            <Suspense
              fallback={
                <DialogHeader>
                  <DialogTitle className="ok-dialog-title">Opening evidence…</DialogTitle>
                  <DialogDescription>Your evidence is loading. You can close it at any time.</DialogDescription>
                </DialogHeader>
              }
            >
              <EvidenceContent view={view} onClose={onClose} onNavigate={onNavigate} onTransparency={onTransparency} />
            </Suspense>
          </DialogErrorBoundary>
        </div>
      </DialogContent>
    </Dialog>
  );
}
