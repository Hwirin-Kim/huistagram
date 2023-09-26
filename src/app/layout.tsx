import "./globals.css";
import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import Navbar from "../components/layout/Navbar";
import AuthContext from "@/context/AuthContext";
import SWRConfigContext from "@/context/SWRConfigContext";

const openSans = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Huistagram",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={openSans.className}>
      <body className=" w-full max-w-screen-xl overflow-auto mx-auto">
        <AuthContext>
          <header className="sticky top-0 bg-white z-10 border-b">
            <Navbar />
          </header>

          <main className="">
            <SWRConfigContext>{children}</SWRConfigContext>
          </main>
        </AuthContext>
      </body>
    </html>
  );
}
