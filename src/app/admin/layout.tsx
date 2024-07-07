/* eslint-disable react/no-children-prop */
'use client'
import React, { ReactNode } from "react";
import AcessRoute from "../../components/AcessRoute";
import Layout from "@/components/Layout";
import HeaderAdmin from "@/components/admin/Header";

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <AcessRoute loged={true}>
        <Layout 
        children={children} 
        header={<HeaderAdmin />} 
        linksDontShowHeader={[]}
        />
    </AcessRoute>
  );
}