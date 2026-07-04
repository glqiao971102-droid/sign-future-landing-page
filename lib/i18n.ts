export type Lang = "en" | "zh";

export const WHATSAPP_NUMBER = "60123456789";
export const WHATSAPP_TEXT =
  "Hi%2C%20I%27d%20like%20to%20ask%20about%203D%20signboards";

type Dict = Record<string, string>;

export const translations: Record<Lang, Dict> = {
  en: {
    // page titles
    "title.home": "SIGN FUTURE ADVERTISING — 3D LED Signboards, Malaysia",
    "title.work": "Our Work — SIGN FUTURE ADVERTISING",
    "title.contact": "Contact Us — SIGN FUTURE ADVERTISING",

    // nav
    "nav.home": "Home",
    "nav.about": "About Us",
    "nav.products": "Products",
    "nav.process": "Process",
    "nav.work": "Project Gallery",
    "nav.faq": "FAQ",
    "nav.services": "Services",
    "nav.contact": "Contact Us",
    "nav.quote": "Get Quote",

    // about
    "about.title": "Brighten Your Future with SIGN FUTURE",
    "about.p1":
      "SIGN FUTURE ADVERTISING is a Malaysian 3D LED signboard specialist. From our own factory we design, fabricate and install illuminated signage for shopfronts, factories, restaurants, retail outlets and shopping malls across the country.",
    "about.p2":
      "Our mission is simple — <strong>Brighten Your Future</strong>. With an experienced team and full in-house production, we turn your logo into a premium glowing sign that makes your brand impossible to miss, day and night.",
    "about.b1": "Own factory — better quality &amp; pricing, no middleman",
    "about.b2": "Free measurement, design mockup &amp; quotation",
    "about.b3": "Licensed installation &amp; delivery nationwide",
    "about.s1l": "Years of experience",
    "about.s2l": "Signboards delivered",
    "about.s3l": "In-house fabrication",
    "about.s4l": "States covered",

    // what we do
    "do.title": 'What We Do — <span class="gold">3D LED Signage</span>',
    "do.intro":
      "We design, fabricate and install 3D LED illuminated signboards. Watch a plain shopfront come to life as the sign goes up and lights the night.",
    "vid.ph":
      "Add your AI showcase video here → videos/showcase.mp4 (empty shop → sign installed &amp; lit up)",

    // why
    "why.title": 'Why Choose <span class="gold">Illuminated Signage</span>?',
    "why.intro":
      "As a leading signage manufacturer in Malaysia, we deliver high-quality illuminated signs that elevate your brand visibility — day and night.",
    "f1.t": "Factory Direct",
    "f1.d":
      "We are a direct manufacturer with our own factory in Malaysia. No middleman, no extra cost — just the best price for you.",
    "f2.t": "Premium Finish",
    "f2.d":
      "We use high-quality materials, 3D built-up letters, acrylic and LED lighting to deliver a premium, long-lasting finish.",
    "f3.t": "Fast Quote",
    "f3.d":
      "Send us your logo, size &amp; location and we'll provide a competitive quotation in the shortest time.",
    "f4.t": "Nationwide Delivery",
    "f4.d":
      "We deliver and install all across Malaysia — safe packaging, on-time delivery and professional installation.",

    // products
    "prod.title": "Product Types",
    "p1.t": "3D Frontlit Letters",
    "p1.d":
      "Front-lit, crisp and bright — ideal for shopfronts and indoor brand walls.",
    "p2.t": "3D Backlit Letters",
    "p2.d":
      "Light glows from behind for a premium look — offices, lobbies and high-end brands.",
    "p3.t": "Neon LED Sign",
    "p3.d":
      "Soft neon effect — perfect for restaurants, cafés, nail salons, bars and photo walls.",
    "p4.t": "Logo Wall Sign",
    "p4.d": "For reception areas, showrooms, offices and brand feature walls.",

    // audience
    "aud.title": "Who Is It For?",
    aud1: "Restaurant / Cafe",
    aud2: "Retail Store",
    aud3: "Beauty &amp; Nail",
    aud4: "Office",
    aud5: "Mall Outlet",
    aud6: "Showroom",
    aud7: "Brand Event (Backdrop)",
    aud8: "New Opening (Wall Sticker)",

    // process
    "proc.title": "How It Works",
    "proc.sub": "Just 5 simple steps to your own custom signboard.",
    s1: "Send Details",
    "s1.d":
      "Send us your logo, shopfront photos, sizes and requirements via WhatsApp / Email.",
    s2: "Design &amp; Quote",
    "s2.d":
      "We provide a professional design mockup and a detailed quote so you clearly see the result and cost.",
    s3: "Confirm Payment",
    "s3.d":
      "Once you approve the design, pay via bank transfer / ATM / online banking and we'll schedule production.",
    s4: "Production",
    "s4.d":
      "Our factory produces the signboard with strict quality control, ensuring every detail is perfect.",
    s5: "Installation",
    "s5.d":
      "Our professional team installs on-site and tests it — making sure your sign lights up perfectly!",

    // work / services (home)
    "work.title": "Our Products",
    "work.more": "View All Products",
    "svc.title": "Our Services",
    "svc.sub": "From measurement to installation — we handle everything for you.",
    "svc1.t": "Free Measurement",
    "svc1.d": "We provide a free measurement to our customer.",
    "svc2.t": "Signboard Design",
    "svc2.d": "After the measurement, we start designing the signboard.",
    "svc3.t": "Signboard Fabrication",
    "svc3.d":
      "Once the design is completed, we fabricate the signboard in our factory.",
    "svc4.t": "Signboard Installation",
    "svc4.d": "After fabrication is completed, we install the signboard.",

    // faq
    "faq.title": "Frequently Asked Questions",
    "q1.q": "What do I need to provide?",
    "q1.a": "Just your logo, the size you want, and a photo of the install location.",
    "q2.q": "Can you help with design?",
    "q2.a": "Yes — we can adapt the look to match your brand style.",
    "q3.q": "How long does it take?",
    "q3.a":
      "It depends on size and craft; we'll give you a timeline after confirmation.",
    "q4.q": "Can it be used outdoors?",
    "q4.a":
      "Yes — we'll recommend suitable materials and methods based on the site.",

    // cta
    "cta.title":
      'Curious how much your logo<br />costs as a <span class="gold">light-up sign</span>?',
    "cta.sub":
      "Send us your logo and we'll prepare initial advice and a quote.",
    "cta.btn": "WhatsApp for a Quote",

    // footer
    "foot.desc":
      "Premium 3D LED illuminated signage — factory direct, design to fabrication, delivery across West Malaysia. Make your brand impossible to miss.",
    "foot.contact": "Contact Us",
    "foot.wa": "WhatsApp / Call",
    "foot.hours": "Hours: Mon–Sat · 9:00 – 18:00",
    "foot.area": "West Malaysia delivery · Nationwide orders",
    "foot.rights": "All rights reserved.",

    // work page
    "pg.eyebrow": "SIGN FUTURE ADVERTISING · PORTFOLIO",
    "pg.title": "Project Gallery",
    "pg.sub":
      "Selected signboard projects across Malaysia, organised by type. New projects are added here.",
    "cat.heading": "Category",
    "cat.searchph": "Search categories…",
    "cat.led": "3D LED Signboard",
    "cat.led.s": "Front-lit / back-lit channel letters",
    "cat.3d": "3D Signboard",
    "cat.3d.s": "Built-up 3D lettering",
    "cat.steel": "3D Stainless Steel Signboard",
    "cat.steel.s": "Brushed / mirror stainless letters",
    "cat.normal": "Normal Signboard",
    "cat.normal.s": "Lightbox / flat panel / inkjet",
    "cat.neon": "Neon Sign",
    "cat.neon.s": "LED neon flex",
    "cat.indoor": "Indoor Signboard",
    "cat.indoor.s": "Reception / acrylic / directory",
    "cat.empty": "New projects coming soon.",
    back: "← Back to home",

    // contact page
    "ct.eyebrow": "SIGN FUTURE ADVERTISING · MALAYSIA",
    "ct.title": 'Contact <span class="gold">Us</span>',
    "ct.sub":
      "Free measurement & quotation. Reach us any way you like — we usually reply within a few hours.",
    "ct.reach": "Reach Us",
    "ct.call": "Call / WhatsApp",
    "ct.email": "Email",
    "ct.addr": "Address",
    "ct.hours": "Business Hours",
    "ct.addrval": "No. 00, Jalan Contoh 1, 47100 Puchong, Selangor, Malaysia",
    "ct.hoursval": "Monday – Saturday · 9:00am – 6:00pm",
    "ct.wabtn": "WhatsApp Us",
    "ct.callbtn": "Call Now",
    "ct.formtitle": "Send Us a Message",
    "ct.formnote":
      "Fill this in and it opens WhatsApp with your details ready to send.",
    "ct.ph.name": "Your name *",
    "ct.ph.phone": "Your phone *",
    "ct.ph.email": "Email (optional)",
    "ct.ph.msg": "Tell us what you need (size, location, logo…)",
    "ct.opt.0": "Select a service…",
    "ct.opt.1": "3D LED Signboard",
    "ct.opt.2": "3D Signboard",
    "ct.opt.3": "Neon Sign",
    "ct.opt.4": "Lightbox / Normal Signboard",
    "ct.opt.5": "Indoor / Office Signage",
    "ct.opt.6": "Other",
    "ct.send": "Send via WhatsApp",
    "ct.maptitle": "Find Us",
  },
  zh: {
    // page titles
    "title.home": "SIGN FUTURE ADVERTISING — 3D 发光字招牌定制 · 马来西亚",
    "title.work": "我们的作品 — SIGN FUTURE ADVERTISING",
    "title.contact": "联系我们 — SIGN FUTURE ADVERTISING",

    // nav
    "nav.home": "首页",
    "nav.about": "关于我们",
    "nav.products": "产品",
    "nav.process": "流程",
    "nav.work": "作品集",
    "nav.faq": "常见问题",
    "nav.services": "服务",
    "nav.contact": "联系我们",
    "nav.quote": "获取报价",

    // about
    "about.title": "用 SIGN FUTURE 点亮你的品牌未来",
    "about.p1":
      "SIGN FUTURE ADVERTISING 是马来西亚的 3D LED 发光字招牌专家。我们拥有自己的工厂，为全马的店面、工厂、餐厅、零售店和商场设计、制作并安装发光招牌。",
    "about.p2":
      "我们的理念很简单 —— <strong>点亮你的未来（Brighten Your Future）</strong>。凭借经验丰富的团队和全程自厂生产，我们把你的 Logo 变成高质感发光招牌，让品牌无论白天黑夜都一眼被看见。",
    "about.b1": "自有工厂 —— 品质更稳、价格更实在，无中间商",
    "about.b2": "免费测量、设计效果图与报价",
    "about.b3": "持证安装，全马配送",
    "about.s1l": "年行业经验",
    "about.s2l": "块招牌交付",
    "about.s3l": "自厂制作",
    "about.s4l": "州覆盖",

    // what we do
    "do.title": '我们有做什么 — <span class="gold">3D 发光字招牌</span>',
    "do.intro":
      "我们专做 3D 发光字招牌的设计、制作与安装。看一间空店面，如何随着招牌装上、点亮而焕然一新。",
    "vid.ph": "把你的 AI 展示视频放到这里 → videos/showcase.mp4（空店 → 招牌装上并点亮）",

    // why
    "why.title": '为什么选择<span class="gold">发光字招牌</span>？',
    "why.intro":
      "作为马来西亚领先的招牌制造商，我们提供高质感发光招牌，让你的品牌无论白天黑夜都更醒目。",
    "f1.t": "工厂直供",
    "f1.d":
      "我们在马来西亚拥有自己的工厂，直接生产制作。没有中间商、没有额外费用 —— 只给你最实在的价格。",
    "f2.t": "高质感工艺",
    "f2.d":
      "采用优质材料、立体堆叠字、亚克力和 LED 灯光，呈现高级且耐用的质感。",
    "f3.t": "快速报价",
    "f3.d": "发送 Logo、尺寸和安装位置，我们会在最短时间内给你有竞争力的报价。",
    "f4.t": "全马配送安装",
    "f4.d": "全马配送与安装 —— 安全包装、准时送达、专业上门安装。",

    // products
    "prod.title": "产品类型",
    "p1.t": "3D Frontlit 发光字",
    "p1.d": "正面发光，亮度清晰，适合店面门头和室内品牌墙。",
    "p2.t": "3D Backlit 背发光字",
    "p2.d": "灯光从背后打出，效果高级，适合办公室、接待处和高端品牌。",
    "p3.t": "Neon LED 招牌",
    "p3.d": "柔和霓虹灯效果，适合餐厅、Cafe、美甲店、酒吧和打卡墙。",
    "p4.t": "Logo Wall Sign",
    "p4.d": "适合公司前台、展示厅、办公室和品牌形象墙。",

    // audience
    "aud.title": "适合谁？",
    aud1: "餐厅 / Cafe",
    aud2: "零售店",
    aud3: "美容美甲店",
    aud4: "办公室",
    aud5: "商场店面",
    aud6: "展厅",
    aud7: "品牌活动 (Backdrop)",
    aud8: "新店开张 (Wall Sticker)",

    // process
    "proc.title": "制作流程",
    "proc.sub": "简单 5 个步骤，为您打造专属招牌。",
    s1: "发送资料",
    "s1.d": "通过 WhatsApp / Email 发送 Logo、店面照片、尺寸和您的需求给我们。",
    s2: "设计报价",
    "s2.d": "我们提供专业设计效果图和详细报价，让您更清楚了解成品效果与费用。",
    s3: "确认付款",
    "s3.d":
      "您确认设计方案后，通过银行转账 / ATM / Online Banking 完成付款，我们将安排制作。",
    s4: "生产制作",
    "s4.d": "工厂开始生产制作招牌，严格把控品质，确保每个细节完美呈现。",
    s5: "安装完成",
    "s5.d": "专业团队上门安装，完成后进行测试，确保招牌完美亮灯！",

    // work / services (home)
    "work.title": "我们的产品",
    "work.more": "查看全部产品",
    "svc.title": "我们的服务",
    "svc.sub": "从测量到安装，全程由我们负责。",
    "svc1.t": "免费测量",
    "svc1.d": "我们为客户提供免费上门测量。",
    "svc2.t": "招牌设计",
    "svc2.d": "测量后，我们开始为您设计招牌。",
    "svc3.t": "招牌制作",
    "svc3.d": "设计确认后，我们在自有工厂制作招牌。",
    "svc4.t": "招牌安装",
    "svc4.d": "制作完成后，我们上门安装招牌。",

    // faq
    "faq.title": "客户常问",
    "q1.q": "需要提供什么资料？",
    "q1.a": "Logo、想做的尺寸、安装位置照片即可。",
    "q2.q": "可以帮我设计吗？",
    "q2.a": "可以，我们可以根据你的品牌风格调整效果。",
    "q3.q": "多久可以完成？",
    "q3.a": "一般根据尺寸和工艺而定，确认后会给你预计时间。",
    "q4.q": "可以户外使用吗？",
    "q4.a": "可以，但我们会根据现场环境建议合适材料和做法。",

    // cta
    "cta.title": '想知道你的 Logo<br />做成发光字<span class="gold">多少钱</span>？',
    "cta.sub": "发送你的 Logo 给我们，我们帮你做初步建议和报价。",
    "cta.btn": "WhatsApp 获取报价",

    // footer
    "foot.desc":
      "高质感 3D 发光字招牌定制 — 工厂直供，设计到制作，可西马配送。让你的品牌一眼被看见。",
    "foot.contact": "联系我们",
    "foot.wa": "WhatsApp / 电话",
    "foot.hours": "营业时间：周一至周六 · 9:00 – 18:00",
    "foot.area": "西马配送 · 全马接单",
    "foot.rights": "版权所有。",

    // work page
    "pg.eyebrow": "SIGN FUTURE ADVERTISING · 作品集",
    "pg.title": "作品集",
    "pg.sub": "马来西亚各地的招牌项目，按类型分类。以后的新作品都会放进来。",
    "cat.heading": "产品分类",
    "cat.searchph": "搜索分类…",
    "cat.led": "3D LED 发光字招牌",
    "cat.led.s": "正发光 / 背发光立体字",
    "cat.3d": "3D 立体招牌",
    "cat.3d.s": "立体堆叠字",
    "cat.steel": "3D 不锈钢招牌",
    "cat.steel.s": "拉丝 / 镜面不锈钢字",
    "cat.normal": "普通招牌",
    "cat.normal.s": "灯箱 / 平面板 / 喷画",
    "cat.neon": "霓虹灯招牌",
    "cat.neon.s": "LED 柔性霓虹",
    "cat.indoor": "室内招牌",
    "cat.indoor.s": "前台 / 亚克力 / 指示牌",
    "cat.empty": "新作品即将上线。",
    back: "← 返回首页",

    // contact page
    "ct.eyebrow": "SIGN FUTURE ADVERTISING · 马来西亚",
    "ct.title": '联系<span class="gold">我们</span>',
    "ct.sub": "免费测量与报价。任意方式联系我们 —— 通常几小时内回复。",
    "ct.reach": "联系方式",
    "ct.call": "电话 / WhatsApp",
    "ct.email": "邮箱",
    "ct.addr": "地址",
    "ct.hours": "营业时间",
    "ct.addrval": "No. 00, Jalan Contoh 1, 47100 Puchong, Selangor, 马来西亚",
    "ct.hoursval": "周一至周六 · 9:00 – 18:00",
    "ct.wabtn": "WhatsApp 联系",
    "ct.callbtn": "拨打电话",
    "ct.formtitle": "给我们留言",
    "ct.formnote": "填好后会自动打开 WhatsApp，带上你的资料一键发送。",
    "ct.ph.name": "你的名字 *",
    "ct.ph.phone": "你的电话 *",
    "ct.ph.email": "邮箱（选填）",
    "ct.ph.msg": "告诉我们你的需求（尺寸、位置、Logo…）",
    "ct.opt.0": "选择服务…",
    "ct.opt.1": "3D LED 发光字招牌",
    "ct.opt.2": "3D 立体招牌",
    "ct.opt.3": "霓虹灯招牌",
    "ct.opt.4": "灯箱 / 普通招牌",
    "ct.opt.5": "室内 / 办公室招牌",
    "ct.opt.6": "其他",
    "ct.send": "WhatsApp 发送",
    "ct.maptitle": "到访我们",
  },
};
