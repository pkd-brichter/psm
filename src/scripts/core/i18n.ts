/**
 * Schlanke Laufzeit-Zweisprachigkeit (Deutsch <-> Polnisch).
 *
 * Deutsch ist die Quellsprache (im Code/Templates). Für Polnisch werden die
 * sichtbaren Texte zur Laufzeit über ein Wörterbuch (DE_PL) ersetzt – inkl.
 * dynamisch nachgerenderter Inhalte (MutationObserver). So ist die GANZE App
 * zweisprachig, ohne jeden String einzeln umzubauen. Fehlt eine Übersetzung,
 * bleibt der deutsche Text stehen (kein Absturz) – einfach in i18n-dict.ts
 * ergänzen.
 */
import { DE_PL } from "./i18n-dict";

export type Lang = "de" | "pl";

const LANG_KEY = "psm-lang";
const TRANSLATE_ATTRS = ["placeholder", "title", "aria-label", "alt"];
const SKIP_TAGS = new Set(["SCRIPT", "STYLE", "NOSCRIPT", "CODE", "PRE"]);

let current: Lang = "de";
let observer: MutationObserver | null = null;

// Originaltexte je Knoten merken, um sauber auf Deutsch zurückzuschalten.
const origText = new WeakMap<Text, string>();
const origAttr = new WeakMap<Element, Record<string, string>>();

function detect(): Lang {
  try {
    const stored = localStorage.getItem(LANG_KEY);
    if (stored === "de" || stored === "pl") return stored;
  } catch {
    /* ignore */
  }
  const nav = (navigator.language || "").toLowerCase();
  return nav.startsWith("pl") ? "pl" : "de";
}

export function getLang(): Lang {
  return current;
}

/** Übersetzt einen deutschen String (für dynamisch im Code erzeugte Texte). */
export function t(de: string): string {
  if (current === "de") return de;
  return DE_PL[de.trim()] ?? de;
}

function translateText(node: Text): void {
  const parent = node.parentNode as Element | null;
  if (parent && SKIP_TAGS.has(parent.tagName)) return;
  const raw = node.nodeValue ?? "";
  const key = raw.trim();
  if (!key || key.length > 400) return;
  if (current === "pl") {
    const pl = DE_PL[key];
    if (pl && pl !== key) {
      origText.set(node, raw); // letzten deutschen Stand merken
      node.nodeValue = raw.replace(key, pl);
    }
  } else if (origText.has(node)) {
    node.nodeValue = origText.get(node)!;
    origText.delete(node);
  }
}

function translateAttrs(el: Element): void {
  for (const attr of TRANSLATE_ATTRS) {
    if (!el.hasAttribute(attr)) continue;
    const raw = el.getAttribute(attr) || "";
    const key = raw.trim();
    if (!key) continue;
    if (current === "pl") {
      const pl = DE_PL[key];
      if (pl && pl !== key) {
        const store = origAttr.get(el) || {};
        if (!(attr in store)) {
          store[attr] = raw;
          origAttr.set(el, store);
        }
        el.setAttribute(attr, pl);
      }
    } else {
      const store = origAttr.get(el);
      if (store && attr in store) {
        el.setAttribute(attr, store[attr]);
        delete store[attr];
      }
    }
  }
}

function translateElementTree(root: Element): void {
  translateAttrs(root);
  root.querySelectorAll("*").forEach((el) => translateAttrs(el));
}

export function applyTranslations(root: Node = document.body): void {
  if (!root) return;
  // Textknoten
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const texts: Text[] = [];
  let n: Node | null;
  while ((n = walker.nextNode())) texts.push(n as Text);
  texts.forEach(translateText);
  // Attribute
  if (root.nodeType === Node.ELEMENT_NODE) {
    translateElementTree(root as Element);
  } else {
    (root as Document | DocumentFragment)
      .querySelectorAll?.("*")
      .forEach((el) => translateAttrs(el));
  }
}

function updateSwitcherUI(): void {
  document
    .querySelectorAll<HTMLElement>("[data-lang]")
    .forEach((btn) =>
      btn.classList.toggle("is-active", btn.dataset.lang === current),
    );
}

export function setLang(lang: Lang): void {
  if (lang !== "de" && lang !== "pl") return;
  current = lang;
  try {
    localStorage.setItem(LANG_KEY, lang);
  } catch {
    /* ignore */
  }
  document.documentElement.lang = lang;
  applyTranslations(document.body);
  updateSwitcherUI();
  window.dispatchEvent(new CustomEvent("i18n:changed", { detail: { lang } }));
}

let wired = false;

export function initI18n(): void {
  if (wired) return;
  wired = true;
  current = detect();
  document.documentElement.lang = current;

  // Klicks auf Sprachschalter (überall im DOM, auch dynamisch).
  document.addEventListener("click", (event) => {
    const btn = (event.target as HTMLElement | null)?.closest<HTMLElement>(
      "[data-lang]",
    );
    if (btn?.dataset.lang) {
      setLang(btn.dataset.lang as Lang);
    }
  });

  // Dynamisch nachgerenderte Inhalte mitübersetzen.
  observer = new MutationObserver((muts) => {
    let sawSwitcher = false;
    for (const m of muts) {
      if (current === "pl") {
        if (m.type === "characterData" && m.target.nodeType === Node.TEXT_NODE) {
          translateText(m.target as Text);
        }
      }
      m.addedNodes.forEach((node) => {
        if (node.nodeType === Node.TEXT_NODE) {
          if (current === "pl") translateText(node as Text);
        } else if (node.nodeType === Node.ELEMENT_NODE) {
          const el = node as Element;
          if (current === "pl") applyTranslations(el);
          if (el.matches?.("[data-lang]") || el.querySelector?.("[data-lang]")) {
            sawSwitcher = true;
          }
        }
      });
    }
    // Frisch gerenderte Sprachschalter korrekt markieren (auch auf Deutsch).
    if (sawSwitcher) updateSwitcherUI();
  });
  const startObserver = () => {
    if (document.body) {
      observer!.observe(document.body, {
        childList: true,
        subtree: true,
        characterData: true,
      });
      if (current === "pl") applyTranslations(document.body);
      updateSwitcherUI();
    }
  };
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", startObserver, { once: true });
  } else {
    startObserver();
  }
}
