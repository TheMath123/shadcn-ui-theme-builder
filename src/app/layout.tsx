import { Metadata } from "next";
import { cn } from "@/lib/utils";
import { fontSans } from "./font";
import { Provider } from "jotai";

import "./globals.css";

interface RootLayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: "Shadcn/UI Theme Builder",
  description: "...",
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
