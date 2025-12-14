import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import RemoveExtensionAttributes from "./remove-extension-attrs";
import Footer from "./component/footer/fotter";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Site",
  description: "Description",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} relative overflow-x-hidden  min-h-screen pb-[620px] bg-white">`}>

        <RemoveExtensionAttributes />

        {/* MAIN CONTENT ABOVE FOOTER */}
        <main className="relative z-10 min-h-[200vh]">
          {children}
        </main>

        {/* FIXED FOOTER BEHIND EVERYTHING */}
        <Footer />

      </body>
    </html>
  );
}
