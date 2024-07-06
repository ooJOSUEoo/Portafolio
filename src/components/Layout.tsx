'use client'
import React, { useEffect, useState, ReactNode } from 'react';
import LoadingGif from '@/assets/img/loading.gif';
import Image from 'next/image';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setChecking(false);
    }, 1000);
  }, []);

  if (checking) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <Image
          src={LoadingGif.src}
          className=''
          alt='loading'
        />
      </div>
    );
  }

  return <>{children}</>;
}
