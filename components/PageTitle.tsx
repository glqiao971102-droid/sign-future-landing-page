"use client";

import { useEffect } from "react";
import { useLang } from "./LanguageProvider";

/** Keeps document.title in sync with the active language (mirrors _title). */
export default function PageTitle({ id }: { id: string }) {
  const { t } = useLang();
  useEffect(() => {
    document.title = t(id);
  }, [t, id]);
  return null;
}
