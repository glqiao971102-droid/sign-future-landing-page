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
import { HeroSlides } from "./collections/HeroSlides";
import { ShowcaseItems } from "./collections/ShowcaseItems";
import { Reviews } from "./collections/Reviews";
import { SiteSettings } from "./globals/SiteSettings";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Categories, GalleryItems, HeroSlides, ShowcaseItems, Reviews],
  globals: [SiteSettings],
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
          // Serve images straight from S3 (browser → S3) instead of proxying
          // every request through this app's /api/media/file route. The proxy
          // added an extra hop (browser → server → S3 → server → browser, ~1s
          // cold) and sent no cache headers, so images reloaded on every visit.
          disablePayloadAccessControl: true,
          generateFileURL: ({
            filename,
            prefix,
          }: {
            filename: string;
            prefix?: string;
          }) => {
            const bucket = process.env.S3_BUCKET || "";
            const region = process.env.S3_REGION || "";
            const key = [prefix, filename].filter(Boolean).join("/");
            const encodedKey = key.split("/").map(encodeURIComponent).join("/");
            return `https://${bucket}.s3.${region}.amazonaws.com/${encodedKey}`;
          },
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
