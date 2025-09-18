import "@/styles/globals.css";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";
import Script from "next/script";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Peter Kaskonas",
  description:
    "Peter Kaskonas' personal website. Software engineer, AWS Certified Solutions Architect Professional, and AWS Certified DevOps Engineer Professional.",
  metadataBase: new URL("https://peterkaskonas.com"),
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <head />
      <body
        className={cn(
          "mx-auto min-h-screen font-sans antialiased",
          fontSans.variable,
        )}
      >
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-T89P9DYYS3"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-T89P9DYYS3');
          `}
        </Script>

        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
