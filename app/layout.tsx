import type { Metadata } from "next";
import { Toaster } from "sonner";
import { Poppins } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import NextTopLoader from "nextjs-toploader";
import Script from "next/script";
import { GoogleTagManager } from "@next/third-parties/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Ceylon Grocery - Authentic Sri Lankan Grocery Shop",
  description:
    "Shop for fresh and authentic Sri Lankan groceries, spices, and ingredients. Fast delivery and excellent service in Latvia.",
  keywords:
    "Sri Lankan grocery, spices, authentic ingredients, Sri Lankan food, Ceylon Grocery, online grocery shop, Latvia",
  openGraph: {
    title: "Ceylon Grocery - Authentic Sri Lankan Grocery Shop",
    description:
      "Find fresh Sri Lankan groceries, spices, and authentic food items with fast delivery in Latvia.",
    url: "https://www.ceylongrocery.lv",

    siteName: "Ceylon Grocery",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Ceylon Grocery - Authentic Sri Lankan Groceries",
      },
    ],
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
  },

  metadataBase: new URL("https://www.ceylongrocery.lv"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          id="Cookiebot"
          src="https://consent.cookiebot.com/uc.js"
          data-cbid="80be6f1f-fc1e-4f01-891a-28dfb183c26d"
          data-blockingmode="auto"
          strategy="beforeInteractive"
        />
        <GoogleTagManager gtmId="GTM-K5GBRSLB" />
      </head>
      <body className={poppins.className}>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-K5GBRSLB"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        <SessionProvider>
          <NextTopLoader />
          <Toaster />
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
