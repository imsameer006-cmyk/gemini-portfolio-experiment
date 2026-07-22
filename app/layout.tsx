import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import Script from "next/script";
import { GoogleAnalytics } from "@next/third-parties/google";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import AnalyticsTracker from "@/components/analytics/AnalyticsTracker";
import MotionProvider from "@/components/providers/MotionProvider";
import { isAnalyticsEnabled } from "@/lib/analytics/enabled";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.withsameer.design"),
  title: "Sameer Gautam — Product Designer",
  description:
    "Product designer who builds clarity out of complexity. Systems thinker, interaction designer, and UX researcher.",
  openGraph: {
    title: "Sameer Gautam — Product Designer",
    description:
      "Product designer who builds clarity out of complexity.",
    url: "https://www.withsameer.design",
    siteName: "Sameer Gautam Portfolio",
    images: [
      {
        url: "/og-image-v2.png",
        width: 1200,
        height: 630,
        alt: "Sameer Gautam portfolio share image with a black asterisk mark",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sameer Gautam — Product Designer",
    description:
      "Product designer who builds clarity out of complexity.",
    images: [
      {
        url: "/og-image-v2.png",
        alt: "Sameer Gautam portfolio share image with a black asterisk mark",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const analyticsEnabled = isAnalyticsEnabled();
  const analyticsFlagValue = process.env.NEXT_PUBLIC_ANALYTICS_ENABLED ?? "undefined";
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const clarityProjectId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID;

  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable}`}
    >
      <body className="bg-[#F9F8F5] text-[#18171A] antialiased min-h-screen flex flex-col">
        <MotionProvider>
          {analyticsEnabled && <AnalyticsTracker />}
          <Nav />
          <main className="flex-1">{children}</main>
          <Footer />
        </MotionProvider>
        <div
          data-debug-analytics-flag={analyticsFlagValue}
          data-debug-ga-id={gaId ?? "undefined"}
          data-debug-clarity-id={clarityProjectId ?? "undefined"}
          className="fixed bottom-2 right-2 z-[9999] rounded bg-black px-2 py-1 font-[family-name:var(--font-geist-mono)] text-[10px] text-white"
        >
          analytics:{analyticsFlagValue}
        </div>
        {analyticsEnabled && gaId && <GoogleAnalytics gaId={gaId} />}
        {analyticsEnabled && clarityProjectId && (
          <Script id="microsoft-clarity" strategy="afterInteractive">
            {`
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "${clarityProjectId}");
            `}
          </Script>
        )}
      </body>
    </html>
  );
}
