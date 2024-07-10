/* eslint-disable react/no-children-prop */
'use client'
import React, { ReactNode, useEffect, useState } from "react";
import AcessRoute from "../../components/AcessRoute";
import Layout from "@/components/Layout";
import HeaderAdmin from "@/components/admin/Header";
import BtnTheme from "@/components/BtnTheme";
import SelectTranslate from "@/components/SelectTranslate";
import { signOut, useSession } from "next-auth/react";
import { useAppStore } from "@/context/appContext";


export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {

  const {data: session, status}:any = useSession()
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout>();
  const verifyToken = useAppStore((s) => s.verifyToken)
  const logout = useAppStore((s) => s.logout)


  useEffect(() => {
    if(status === 'authenticated'){
      const newIntervalId = setInterval( async() => {
        const resp = await verifyToken(session?.user?.accessToken);
        if(resp == false) {
          await logout();
          await signOut({callbackUrl: "/"}) 
        }
      },3000)
      setIntervalId(newIntervalId);
    }
    setTimeout(() => {
    }, 3000);
    return () => {
      clearInterval(intervalId); // Limpiar el intervalo al desmontar
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);
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