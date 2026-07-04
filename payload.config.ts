import path from "path";
import { fileURLToPath } from "url";

import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { s3Storage } from "@payloadcms/storage-s3";
import { buildConfig } from "payload";
import sharp from "sharp";

import { Users } from "./collections/Users";
import { Media } from "./collections/Media";
import { Categories } from "./collections/Categories";
import { GalleryItems } from "./collections/GalleryItems";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
  },
  collections: [Users, Media, Categories, GalleryItems],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || "",
      // AWS RDS requires SSL; the RDS cert isn't in the local trust store.
      ssl: process.env.DATABASE_URI?.includes("amazonaws.com")
        ? { rejectUnauthorized: false }
        : undefined,
    },
  }),
  sharp,
  plugins: [
    // Store Media uploads in the existing simmieco S3 bucket, namespaced so
    // they never collide with Simmieco's own files.
    s3Storage({
      collections: {
        [Media.slug]: {
          prefix: "sign-future",
        },
      },
      bucket: process.env.S3_BUCKET || "",
      config: {
        credentials: {
          accessKeyId: process.env.S3_KEY || "",
          secretAccessKey: process.env.S3_SECRET || "",
        },
        region: process.env.S3_REGION || "",
      },
    }),
  ],
});
