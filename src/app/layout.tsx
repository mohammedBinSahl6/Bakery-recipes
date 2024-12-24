import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar/Navbar";
import Provider from "@/components/provider/Provider";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bakery Recipes",
  description: "Discover and share delicious bakery recipes",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-gradient-to-br from-pink-100 to-purple-100 min-h-screen`}
      >
        <Provider>
          <Toaster />
          <div className="flex flex-col min-h-screen">
            <header className="bg-white/80 backdrop-blur-sm sticky top-0 z-50">
              <div className="container flex items-center m-auto justify-between py-4">
                <Navbar />
              </div>
            </header>
            <main className="flex-1 container mx-auto py-6">{children}</main>
            <footer className="border-t py-4 text-center text-sm text-muted-foreground bg-white/80 backdrop-blur-sm">
              © 2023 Bakery Recipes. All rights reserved.
            </footer>
          </div>
        </Provider>
      </body>
    </html>
  );
}
