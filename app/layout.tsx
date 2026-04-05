import type { Metadata } from "next";
import { Inter, Geist } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Zorvyn | Finance Dashboard",
  description: "Industry-level frontend assessment",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={cn("font-sans", geist.variable)}>
      <body className={`${inter.className} flex h-screen overflow-hidden bg-background`}>
        <Providers>
          <Sidebar />
          <div className="flex flex-col flex-1 overflow-hidden w-full relative">
            <Header />
            <main className="flex-1 overflow-y-auto p-6 bg-muted/30">
              <div className="max-w-7xl mx-auto space-y-6">
                {children}
              </div>
            </main>
          </div>
        </Providers>
        <Toaster position="top-right" richColors /> 
      </body>
    </html>
  );
}