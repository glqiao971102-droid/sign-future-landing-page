import type { Metadata } from "next";
import AboutContent from "@/components/AboutContent";

export const metadata: Metadata = {
  title: "About Us — SIGN FUTURE ADVERTISING",
  description:
    "About SIGN FUTURE ADVERTISING — premium 3D LED illuminated signboards in Malaysia. Factory-direct, design to fabrication, nationwide delivery.",
};

export default function Page() {
  return <AboutContent />;
}
