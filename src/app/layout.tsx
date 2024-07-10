/* eslint-disable react/no-children-prop */
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import "@/assets/icons/css/all.min.css";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import Layout from "@/components/Layout";
import Provider from "@/components/Provider";
import BtnTheme from "@/components/BtnTheme";
import SelectTranslate from "@/components/SelectTranslate";
import { Toaster } from "react-hot-toast";


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
      <body className={' ' + inter.className}><Provider>
        <Toaster/>
        <Layout 
        children={children} 
        header={<>
        <Header />
        <div className="flex justify-end items-center">
          <SelectTranslate/>
          <BtnTheme/>
        </div></>} 
        footer={<Footer />}
        linksDontShowHeader={['/auth/login','/admin','/admin/*']}
        linksDontShowFooter={['/auth/login','/admin','/admin/*']}
        />
      </Provider></body>
    </html>
  );
}
