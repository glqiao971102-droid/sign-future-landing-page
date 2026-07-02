"use client";

import { type ElementType } from "react";
import { useLang } from "./LanguageProvider";

type TransProps = {
  id: string;
  as?: ElementType;
  className?: string;
};

/**
 * Renders a translated string as HTML (mirrors the original site, which set
 * innerHTML from the i18n dictionary — some values contain <strong>, <br>,
 * <span class="gold"> markup).
 */
export default function Trans({ id, as, className }: TransProps) {
  const { t } = useLang();
  const Tag = (as ?? "span") as ElementType;
  return (
    <Tag className={className} dangerouslySetInnerHTML={{ __html: t(id) }} />
  );
}
