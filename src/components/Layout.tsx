'use client'
import React, { useEffect, useState, ReactNode } from 'react';
import LoadingGif from '@/assets/img/loading.gif';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useAppStore } from '@/context/appContext';

interface LayoutProps {
  children: ReactNode;

  header?: ReactNode;
  footer?: ReactNode;
  linksDontShowHeader?: string[];
  linksDontShowFooter?: string[];
}

export default function Layout({ children, header, footer, linksDontShowHeader, linksDontShowFooter }: LayoutProps) {
  const [checking, setChecking] = useState(true);
  const location = usePathname();
  const [showHeader, setShowHeader] = useState<Boolean>()
  const [showFooter, setShowFooter] = useState<Boolean>()

  const {theme} = useAppStore((s) => s.ui)

  useEffect(() => {
    setTimeout(() => {
      setChecking(false);
    }, 1000);
  }, []);

  useEffect(() => {
    theme && document.body.classList.add(theme)
  }, [theme]);

  useEffect(() => {
    if (linksDontShowHeader?.includes(location)) {
      setShowHeader(false)
    } else {
      setShowHeader(true)
    }
    if (linksDontShowFooter?.includes(location)) {
      setShowFooter(false)
    } else {
      setShowFooter(true)
    }
  }, [linksDontShowFooter, linksDontShowHeader, location]);

  if (checking) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <Image
          src={LoadingGif.src}
          width={100}
          height={100}
          className='w-auto h-auto'
          alt='Loading'
        />
      </div>
    );
  }

  return <>
    {
      showHeader &&
      header
    }
    {children}
    {
      showFooter &&
      footer
    }
  </>;
}
