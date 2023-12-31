import "./globals.css";
import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import Navbar from "../components/layout/Navbar";
import AuthContext from "@/context/AuthContext";
import SWRConfigContext from "@/context/SWRConfigContext";

const openSans = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Huistagram",
    template: "Huistagram | %s",
  },
  description: "인스타그램 클론코딩",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={openSans.className}>
      <body className=" w-full  overflow-auto bg-neutral-50">
        <AuthContext>
          <header className="sticky top-0 bg-white z-[9999] border-b">
            <div className="max-w-screen-xl mx-auto">
              <Navbar />
            </div>
          </header>

          <main className="w-full flex justify-center max-w-screen-xl mx-auto">
            <SWRConfigContext>{children}</SWRConfigContext>
          </main>
        </AuthContext>
        <div id="portal" />
      </body>
    </html>
  );
}
