'use client';
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

export default function Layout({
  children,
  header,
  footer,
  linksDontShowHeader,
  linksDontShowFooter,
}: LayoutProps) {
  const [checking, setChecking] = useState(true);
  const location = usePathname();
  const { theme } = useAppStore((s) => s.ui);
  const [showHeader, setShowHeader] = useState(true);
  const [showFooter, setShowFooter] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setChecking(false);
    }, 1000);
  }, []);

  useEffect(() => {
    theme && document.body.classList.add(theme);
  }, [theme]);

  useEffect(() => {
    const shouldShowHeader = !checkIfPathMatches(location, linksDontShowHeader);
    setShowHeader(shouldShowHeader);
  }, [linksDontShowHeader, location]);

  useEffect(() => {
    const shouldShowFooter = !checkIfPathMatches(location, linksDontShowFooter);
    setShowFooter(shouldShowFooter);
  }, [linksDontShowFooter, location]);

  const checkIfPathMatches = (currentPath: string, restrictedPaths?: string[]) => {
    if (!restrictedPaths) return false;
    return restrictedPaths.some((path) => {
      if (path.endsWith('/*')) {
        const basePath = path.slice(0, -2);
        return currentPath.startsWith(basePath);
      } else {
        return currentPath === path;
      }
    });
  };

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

  return (
    <>
      {showHeader && header}
      {children}
      {showFooter && footer}
    </>
  );
}
