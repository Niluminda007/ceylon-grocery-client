import type { Metadata } from "next";
import { Toaster } from "sonner";
import { Poppins } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import NextTopLoader from "nextjs-toploader";

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
      <body className={poppins.className}>
        <SessionProvider>
          <NextTopLoader />
          <Toaster />
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
