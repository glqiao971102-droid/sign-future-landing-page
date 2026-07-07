import type { Metadata } from "next";
import ContactContent from "@/components/ContactContent";
import { loadSocialLinks } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us — SIGN FUTURE ADVERTISING",
  description:
    "Contact SIGN FUTURE ADVERTISING — 3D LED signboard specialist in Malaysia. Free measurement & quotation. Call, WhatsApp, email or send us a message.",
};

export default async function Page() {
  const social = await loadSocialLinks();
  return <ContactContent social={social} />;
}
