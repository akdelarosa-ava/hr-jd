import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import QueryClientProvider from "@/components/queryclient-provider";
import { Toaster } from "@/components/ui/toaster";
import JDMsalProvider from "@/msal/jd-msal-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AQA Job Description Generator",
  description: "AI Generated Job Description",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <JDMsalProvider>
          <QueryClientProvider>{children}</QueryClientProvider>
          <Toaster />
        </JDMsalProvider>
      </body>
    </html>
  );
}
