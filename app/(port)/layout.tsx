import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import SideNav from "@/components/layout/side-nav";
import { Toaster } from "@/components/ui/toaster";
import MotionLayout from "./motion-layout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Carlos Requena",
  description: "Web Development Services by Carlos Requena",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="flex min-h-screen">
            <SideNav />
            <MotionLayout>{children}</MotionLayout>
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
