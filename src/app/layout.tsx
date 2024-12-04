import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { geistSans, geistMono } from "@/styles/fonts/local-font";
import "@/styles/globals.css";
import ThemeProvider from "@/components/providers/theme-provider";
import WishlistProvider from "@/components/providers/wishlist-provider";
import Header from "@/components/ui/header";
import Container from "@/components/ui/container";
import Footer from "@/components/ui/footer";

export const metadata: Metadata = {
  title: "Next Level Loot",
  description: "Taking your gaming budget to the Next Level!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ThemeProvider>
        <body
          className={`${geistSans.variable} ${geistMono.variable} flex min-h-screen flex-col antialiased`}
        >
          <Header />
          <Container>
            <WishlistProvider>
              {children}
              <SpeedInsights />
              <Analytics />
            </WishlistProvider>
          </Container>
          <Footer />
        </body>
      </ThemeProvider>
    </html>
  );
}
