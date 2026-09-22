import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import type { ReactNode } from "react";
import "@/styles/global.css";
import "@/features/open-kiln/open-kiln.css";

const urbanist = localFont({
  src: "../../node_modules/@fontsource-variable/urbanist/files/urbanist-latin-wght-normal.woff2",
  variable: "--font-urbanist",
  weight: "100 900",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Open Kiln — Verify, not just trust",
  description:
    "Explore a CSR campaign concept with sample treatment records, transparent methodology and two evidence verification journeys.",
  icons: { icon: "/open-kiln.svg" },
  openGraph: {
    title: "Open Kiln — Verify, not just trust",
    description:
      "Explore the evidence behind the treatment journey. An interactive CSR campaign demo with clearly labelled sample data.",
    type: "website",
    locale: "en_GB",
  },
};
export const viewport: Viewport = { themeColor: "#176341" };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={urbanist.variable}>
      <body>{children}</body>
    </html>
  );
}
