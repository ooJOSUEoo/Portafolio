/* eslint-disable react/no-children-prop */
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import "@/assets/icons/css/all.min.css";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import Layout from "@/components/layout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Josue Muñoz Avila",
  description: "Josue Muñoz Avila Web Site",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={' ' + inter.className}>
        <Layout children={
          <>
          <Header />
          {children}
          <Footer />
          </>
        }/>
      </body>
    </html>
  );
}
