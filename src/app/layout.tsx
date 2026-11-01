import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import type { ReactNode } from "react";
import { SiteMonitoring } from "@/components/site-monitoring";
import "@/styles/global.css";
import "@/features/open-kiln/open-kiln.css";
import "@/features/open-kiln/experience.css";
import "@/features/open-kiln/motion.css";

const urbanist = localFont({
  src: "../../node_modules/@fontsource-variable/urbanist/files/urbanist-latin-wght-normal.woff2",
  variable: "--font-urbanist",
  weight: "100 900",
  display: "swap",
});

export const metadata: Metadata = {
  // Social cards need absolute image URLs; previews also point at the production image.
  metadataBase: new URL("https://open-kiln.vercel.app"),
  title: "Open Kiln — Verify, not just trust",
  description:
    "Explore the evidence behind waste treatment: a searchable record register, published research and transparent verification pathways.",
  icons: { icon: "/open-kiln.svg" },
  openGraph: {
    title: "Open Kiln — Verify, not just trust",
    description:
      "Explore the evidence behind the treatment journey. Open Kiln is a CSR campaign concept for informed environmental decisions.",
    type: "website",
    locale: "en_GB",
  },
  twitter: { card: "summary_large_image" },
};
export const viewport: Viewport = { themeColor: "#0e1e16" };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={urbanist.variable}>
      <body>
        {children}
        <SiteMonitoring enabled={process.env.VERCEL_ENV === "production" && process.env.NODE_ENV === "production"} />
      </body>
    </html>
  );
}
