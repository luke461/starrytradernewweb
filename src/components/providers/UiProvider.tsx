"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { ContactModal } from "@/components/ui/ContactModal";
import { DemoModal } from "@/components/ui/DemoModal";

type UiState = {
  openContact: () => void;
  closeContact: () => void;
  openDemo: (chapter?: number) => void;
  closeDemo: () => void;
};

const UiCtx = createContext<UiState | null>(null);

export function UiProvider({ children }: { children: ReactNode }) {
  const [contactOpen, setContactOpen] = useState(false);
  const [demoState, setDemoState] = useState<{ open: boolean; chapter: number }>({ open: false, chapter: 0 });

  const openContact = useCallback(() => setContactOpen(true), []);
  const closeContact = useCallback(() => setContactOpen(false), []);
  const openDemo = useCallback((chapter = 0) => setDemoState({ open: true, chapter }), []);
  const closeDemo = useCallback(() => setDemoState((s) => ({ ...s, open: false })), []);

  const value = useMemo(() => ({ openContact, closeContact, openDemo, closeDemo }), [openContact, closeContact, openDemo, closeDemo]);

  return (
    <UiCtx.Provider value={value}>
      {children}
      <ContactModal open={contactOpen} onClose={closeContact} />
      <DemoModal open={demoState.open} chapter={demoState.chapter} onClose={closeDemo} />
    </UiCtx.Provider>
  );
}

export function useUi() {
  const ctx = useContext(UiCtx);
  if (!ctx) throw new Error("useUi must be used inside <UiProvider>");
  return ctx;
}
