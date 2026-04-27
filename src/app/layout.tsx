import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { StarField } from "@/components/decoration/StarField";
import { UiProvider } from "@/components/providers/UiProvider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jet",
  subsets: ["latin"],
  weight: ["500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://starrytrader.com"),
  title: {
    default: "StarryTrader. Investing, explained.",
    template: "%s. StarryTrader.",
  },
  description:
    "An education platform for the generation finance forgot. Built on peer-reviewed research. Designed for the way Gen Z actually learns.",
  openGraph: {
    title: "StarryTrader. Investing, explained.",
    description:
      "An education platform for the generation finance forgot. Built on peer-reviewed research.",
    siteName: "StarryTrader",
    locale: "en_US",
    type: "website",
    images: [{ url: "/brand/starrytrader-logo-light.png", width: 800, height: 800, alt: "StarryTrader" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "StarryTrader. Investing, explained.",
    description: "An education platform for the generation finance forgot.",
  },
  icons: { icon: "/brand/starrytrader-logo-light.png" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable}`}>
      <body className="relative min-h-screen overflow-x-hidden bg-starry-deep text-ink-primary">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "StarryTrader",
              url: "https://starrytrader.com",
              logo: "https://starrytrader.com/brand/starrytrader-logo-light.png",
              slogan: "Investing, explained.",
              description: "An education platform for the generation finance forgot.",
              foundingLocation: ["Singapore", "Chicago"],
              email: "team@starrytrader.com",
              sameAs: [
                "https://www.instagram.com/starrytrader",
                "https://discord.gg/yFkF47JDqN",
              ],
            }),
          }}
        />
        <StarField />
        <UiProvider>
          <Nav />
          <main className="relative z-10">{children}</main>
          <Footer />
        </UiProvider>
      </body>
    </html>
  );
}
