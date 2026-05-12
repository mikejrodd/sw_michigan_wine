'use client';

import React, { createContext, useContext, useState } from 'react';

const DrawerContext = createContext(null);

export const useDrawer = () => useContext(DrawerContext);

export default function DrawerProvider({ children }) {
  const [drawerOpen, setDrawerOpen] = useState(true);

  const toggleDrawer = () => {
    setDrawerOpen((prev) => !prev);
  };

  return (
    <DrawerContext.Provider value={{ drawerOpen, toggleDrawer }}>
      {children}
    </DrawerContext.Provider>
  );
}
