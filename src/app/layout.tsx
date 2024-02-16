// Next
import { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import { fontSans } from "./font";

interface RootLayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: "Shadcn/UI Theme Builder",
  description: "Painel de movimentações segurados",
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
        {children}
      </body>
    </html>
  );
}
