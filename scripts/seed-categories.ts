import { getPayload } from "payload";
import config from "../payload.config";

const DEFAULTS = [
  { labelEn: "3D LED Signboard", labelZh: "3D LED 发光字招牌", subEn: "Front-lit / back-lit channel letters", subZh: "正发光 / 背发光立体字", slug: "led", order: 1 },
  { labelEn: "3D Signboard", labelZh: "3D 立体招牌", subEn: "Built-up 3D lettering", subZh: "立体堆叠字", slug: "3d", order: 2 },
  { labelEn: "3D Stainless Steel Signboard", labelZh: "3D 不锈钢招牌", subEn: "Brushed / mirror stainless letters", subZh: "拉丝 / 镜面不锈钢字", slug: "steel", order: 3 },
  { labelEn: "Normal Signboard", labelZh: "普通招牌", subEn: "Lightbox / flat panel / inkjet", subZh: "灯箱 / 平面板 / 喷画", slug: "normal", order: 4 },
  { labelEn: "Neon Sign", labelZh: "霓虹灯招牌", subEn: "LED neon flex", subZh: "LED 柔性霓虹", slug: "neon", order: 5 },
  { labelEn: "Indoor Signboard", labelZh: "室内招牌", subEn: "Reception / acrylic / directory", subZh: "前台 / 亚克力 / 指示牌", slug: "indoor", order: 6 },
];

const payload = await getPayload({ config });

for (const c of DEFAULTS) {
  const existing = await payload.find({
    collection: "categories",
    where: { slug: { equals: c.slug } },
    limit: 1,
  });
  if (existing.docs.length) {
    console.log(`skip (exists): ${c.slug}`);
    continue;
  }
  await payload.create({ collection: "categories", data: c });
  console.log(`created: ${c.slug} — ${c.labelEn}`);
}

console.log("done");
process.exit(0);
