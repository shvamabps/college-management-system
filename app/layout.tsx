import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Fira_Code } from "next/font/google";

import Navbar from "@/components/navbar";
import { Toaster } from "@/components/ui/toaster";
import { ConvexClientProvider } from "./ConvexClientProvider";
import "./globals.css";

const firaCode = Fira_Code({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--fira-code",
});

export const metadata: Metadata = {
  title: "College Management System",
  description: "This is a collection of services for managing a college.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!}
    >
      <html lang="en">
        <body
          className={`${firaCode.className} antialiased`}
          suppressHydrationWarning
          suppressContentEditableWarning
        >
          <ConvexClientProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange
            >
              <Navbar />
              {children}
              <Toaster />
            </ThemeProvider>
          </ConvexClientProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
