import type { CollectionConfig } from "payload";

// Uploads collection. Files are stored in S3 (see s3Storage plugin in payload.config.ts).
export const Media: CollectionConfig = {
  slug: "media",
  access: { read: () => true },
  upload: true,
  hooks: {
    // Print files are often CMYK, which browsers render with dull/wrong colors.
    // Convert any CMYK upload to sRGB (web colors) before it's stored.
    beforeOperation: [
      async ({ req, operation }) => {
        const file = req.file;
        if ((operation === "create" || operation === "update") && file?.data) {
          try {
            const sharp = (await import("sharp")).default;
            const meta = await sharp(file.data).metadata();
            if (meta.space === "cmyk") {
              const isPng = file.mimetype === "image/png";
              const pipeline = sharp(file.data).toColorspace("srgb");
              const converted = await (isPng
                ? pipeline.png()
                : pipeline.jpeg({ quality: 90, mozjpeg: true })
              ).toBuffer();
              file.data = converted;
              file.size = converted.length;
            }
          } catch (err) {
            console.error("[media] CMYK→sRGB conversion skipped:", err);
          }
        }
      },
    ],
  },
  fields: [{ name: "alt", type: "text" }],
};
