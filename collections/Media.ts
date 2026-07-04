import type { CollectionConfig } from "payload";

// Uploads collection. Files are stored in S3 (see s3Storage plugin in payload.config.ts).
export const Media: CollectionConfig = {
  slug: "media",
  access: { read: () => true },
  upload: true,
  fields: [
    { name: "alt", type: "text" },
  ],
};
