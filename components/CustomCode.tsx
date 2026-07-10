"use client";

import { useEffect } from "react";

// Injects raw admin-pasted code (e.g. Google Ads tags) into <head> or the end
// of <body>. Re-creates <script> elements so they actually execute (innerHTML
// scripts don't run on their own).
export default function CustomCode({
  code,
  target,
}: {
  code?: string;
  target: "head" | "body";
}) {
  useEffect(() => {
    if (!code) return;
    const dest = target === "head" ? document.head : document.body;

    const tmp = document.createElement("div");
    tmp.innerHTML = code;

    const added: Node[] = [];
    Array.from(tmp.childNodes).forEach((node) => {
      let toAdd: Node = node;
      if (node.nodeName === "SCRIPT") {
        const old = node as HTMLScriptElement;
        const s = document.createElement("script");
        Array.from(old.attributes).forEach((a) =>
          s.setAttribute(a.name, a.value),
        );
        s.text = old.text;
        toAdd = s;
      }
      dest.appendChild(toAdd);
      added.push(toAdd);
    });

    return () => {
      added.forEach((n) => {
        try {
          n.parentNode?.removeChild(n);
        } catch {
          /* ignore */
        }
      });
    };
  }, [code, target]);

  return null;
}
