import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
} from "payload";
import { revalidatePath } from "next/cache";

// Clear the cached /work route whenever a category or gallery item changes, so
// admin edits show up immediately instead of waiting for the time-based
// (revalidate = 300s) refresh.
const revalidateWork = () => {
  try {
    revalidatePath("/work");
  } catch (err) {
    // revalidatePath only works inside the Next.js request runtime. When Payload
    // runs outside it (CLI, seed scripts) just skip — the 5-min fallback covers it.
    console.error("[revalidate] /work revalidation skipped:", err);
  }
};

export const revalidateWorkAfterChange: CollectionAfterChangeHook = () => {
  revalidateWork();
};

export const revalidateWorkAfterDelete: CollectionAfterDeleteHook = () => {
  revalidateWork();
};
