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
  const loading = useAppStore((s) => s.ui.loading)
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
      {
        loading && <div className="z-50 w-full h-full bg-[rgba(0,0,0,0.5)] fixed top-0 left-1/2
        -translate-x-1/2 flex justify-center items-center">
          <i className="fa-duotone fa-spinner fa-pulse fa-3x fa-fw"></i>
        </div>
      }
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