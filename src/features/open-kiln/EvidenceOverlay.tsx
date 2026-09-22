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
}: {
  view: ModalView;
  onClose: () => void;
  returnFocus: RefObject<HTMLElement | null>;
}) {
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
        <DialogErrorBoundary
          fallback={
            <>
              <DialogHeader>
                <DialogTitle className="ok-dialog-title">This preview couldn’t load.</DialogTitle>
                <DialogDescription>
                  Check your connection, then reload the page to try again. No request was sent.
                </DialogDescription>
              </DialogHeader>
              <div className="ok-dialog-actions">
                {/* React caches rejected lazy imports; a page reload starts a fresh download. */}
                <Action onClick={() => window.location.reload()}>Reload page</Action>
                <Action secondary onClick={onClose}>
                  Close preview
                </Action>
              </div>
            </>
          }
        >
          <Suspense
            fallback={
              <DialogHeader>
                <DialogTitle className="ok-dialog-title">Opening evidence preview…</DialogTitle>
                <DialogDescription>Your preview is loading. You can close it at any time.</DialogDescription>
              </DialogHeader>
            }
          >
            <EvidenceContent view={view} onClose={onClose} />
          </Suspense>
        </DialogErrorBoundary>
      </DialogContent>
    </Dialog>
  );
}
