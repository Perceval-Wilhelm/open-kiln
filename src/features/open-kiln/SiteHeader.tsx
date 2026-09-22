"use client";

import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useExperience } from "@/features/open-kiln/Experience";
import { navigation } from "@/features/open-kiln/navigation";

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const { focusSearch } = useExperience();
  useEffect(() => {
    if (!menuOpen) return;
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape" && !event.defaultPrevented) {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    }
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);
  return (
    <header className="ok-header">
      <div className="ok-container">
        <a href="#top" className="ok-wordmark" aria-label="Open Kiln home">
          <span className="ok-logo-mark" aria-hidden="true">
            <span />
          </span>
          open<span>kiln</span>
          <i>.</i>
        </a>
        <nav id="main-navigation" aria-label="Main navigation" className={menuOpen ? "ok-nav is-open" : "ok-nav"}>
          {navigation.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={() => {
                setMenuOpen(false);
                requestAnimationFrame(() => document.getElementById(item.id)?.focus({ preventScroll: true }));
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <a
          className="ok-header-cta"
          href="#verify"
          onClick={(e) => {
            e.preventDefault();
            focusSearch();
          }}
        >
          Explore the evidence <ArrowUpRight size={17} />
        </a>
        <button
          ref={menuButtonRef}
          className="ok-menu-toggle"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          aria-controls="main-navigation"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  );
}
