/* eslint-disable react/no-children-prop */
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import "@/assets/icons/css/all.min.css";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import Layout from "@/components/Layout";
import Provider from "@/components/Provider";


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
      <body className={'dark ' + inter.className}><Provider>
        <Layout 
        children={children} 
        header={<Header />} 
        footer={<Footer />}
        linksDontShowHeader={['/auth/login','/admin']}
        linksDontShowFooter={['/auth/login','/admin']}
        />
      </Provider></body>
    </html>
  );
}
