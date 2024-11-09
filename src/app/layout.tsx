import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/styles/globals.css";
import WishlistProvider from "@/lib/wishlist-provider";
import Header from "@/components/ui/header";
import Container from "@/components/ui/container";
import Footer from "@/components/ui/footer";

const geistSans = localFont({
  src: "../styles/fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../styles/fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "The Loot Vault",
  description: "For gamers on a budget!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} flex min-h-screen flex-col antialiased`}
      >
        <Header />
        <Container>
          <WishlistProvider>
            {children}
            <SpeedInsights />
          </WishlistProvider>
        </Container>
        <Footer />
      </body>
    </html>
  );
}
