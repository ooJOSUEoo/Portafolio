'use client'
import React from "react";
import AcessRoute from "../../components/AcessRoute";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AcessRoute loged={false}>
        {children}
    </AcessRoute>
  );
}