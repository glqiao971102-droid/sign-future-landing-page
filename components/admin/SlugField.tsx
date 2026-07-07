"use client";

import React, { useEffect } from "react";
import type { TextFieldClientProps } from "payload";
import { useField, useFormFields } from "@payloadcms/ui";

// Turn "Titans Esoorts 3D LED Signboard" into "Titans-Esoorts-3D-LED-Signboard".
// Case is preserved on purpose; only spaces / punctuation become hyphens.
export const formatSlug = (val: string): string =>
  (val || "")
    .trim()
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

// Read-only slug field that live-follows the Title as you type it in the admin.
export const SlugField: React.FC<TextFieldClientProps> = ({ field, path }) => {
  const fieldPath = path || field?.name || "slug";
  const { value, setValue } = useField<string>({ path: fieldPath });
  const title = useFormFields(
    ([fields]) => (fields?.title?.value as string | undefined) ?? "",
  );

  useEffect(() => {
    const next = formatSlug(title);
    if (next !== (value ?? "")) setValue(next);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title]);

  const label =
    typeof field?.label === "string" && field.label ? field.label : "Slug";

  return (
    <div className="field-type text">
      <label className="field-label">{label}</label>
      <div
        style={{
          padding: "10px 12px",
          borderRadius: "var(--style-radius-s, 4px)",
          border: "1px solid var(--theme-elevation-150)",
          background: "var(--theme-elevation-50)",
          color: "var(--theme-elevation-800)",
          fontFamily: "var(--font-mono, monospace)",
          minHeight: 40,
          display: "flex",
          alignItems: "center",
        }}
      >
        {value || <span style={{ opacity: 0.5 }}>— (type a Title above)</span>}
      </div>
      <p className="field-description">Auto-generated from the Title.</p>
    </div>
  );
};
