'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useMediaQuery } from '@mui/material';

const DrawerContext = createContext(null);

export const useDrawer = () => useContext(DrawerContext);

export default function DrawerProvider({ children }) {
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  const isMobile = useMediaQuery('(max-width:600px)');

  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    if (!isMobile) {
      setDrawerOpen(isHomePage);
    }
  }, [isHomePage, isMobile]);

  const toggleDrawer = () => {
    setDrawerOpen((prev) => !prev);
  };

  return (
    <DrawerContext.Provider value={{ drawerOpen, toggleDrawer }}>
      {children}
    </DrawerContext.Provider>
  );
}
