import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { LenisProvider } from "@/components/LenisProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title:
    "Leading Solar Energy Solutions in Coimbatore | Nigaran Solar Tamil Nadu",
  description:
    "Nigaran Solar offers top-quality solar panel solutions in Coimbatore and Tamil Nadu. We specialize in On-Grid, Off-Grid, and Hybrid Solar Systems for residential and commercial installations. Get your free solar consultation today!",
  keywords:
    "solar energy, solar panels, solar power systems, on-grid solar, off-grid solar, hybrid solar systems, residential solar, commercial solar, solar solutions Tamil Nadu, solar companies in TamilNadu",
  icons: {
    icon: "/favicon.png", // path to your PNG logo
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans`}>
        <Providers>
          <LenisProvider />

          <Header />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
