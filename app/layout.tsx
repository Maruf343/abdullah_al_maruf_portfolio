import type { Metadata } from "next";
import "./globals.css";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import FloatingWhatsApp from "../components/FloatingWhatsApp";
import ToasterProvider from "../components/ui/ToasterProvider";

export const metadata: Metadata = {
  title: "Abdullah Al Maruf",
  description: "A polished portfolio built with Next.js, Tailwind CSS, and modern UI patterns.",
  openGraph: {
    title: "Abdullah Al Maruf",
    description: "A polished portfolio built with Next.js, Tailwind CSS, and modern UI patterns.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Abdullah Al Maruf",
    description: "A polished portfolio built with Next.js, Tailwind CSS, and modern UI patterns.",
  },
  icons: {
    icon: "/images/favicon.png",
    apple: "/images/favicon-circle.svg",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen overflow-x-hidden bg-slate-50 text-slate-950 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100">
        <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-4 py-4 md:px-8">
          <Navbar />
          <main className="flex-1 pt-20 md:pt-24">{children}</main>
          <Footer />
        </div>
        <FloatingWhatsApp />
        <ToasterProvider />
      </body>
    </html>
  );
}
