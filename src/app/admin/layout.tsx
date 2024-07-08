/* eslint-disable react/no-children-prop */
'use client'
import React, { ReactNode } from "react";
import AcessRoute from "../../components/AcessRoute";
import Layout from "@/components/Layout";
import HeaderAdmin from "@/components/admin/Header";
import BtnTheme from "@/components/BtnTheme";
import SelectTranslate from "@/components/SelectTranslate";

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <AcessRoute loged={true}>
        <Layout 
        children={children} 
        header={<><HeaderAdmin />
        <div className="flex justify-end items-center">
          <SelectTranslate/>
          <BtnTheme/>
        </div></>} 
        linksDontShowHeader={[]}
        />
    </AcessRoute>
  );
}