import React, { createContext, useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useMediaQuery } from "@mui/material";

const DrawerContext = createContext(null);

export const useDrawer = () => useContext(DrawerContext);

export const DrawerProvider = ({ children }) => {
    const location = useLocation();
    const isHomePage = location.pathname === "/"; // Adjust based on your route setup
    const isMobile = useMediaQuery("(max-width:600px)");

    // Ensure drawer does NOT default to open on mobile
    const [drawerOpen, setDrawerOpen] = useState(!isMobile && isHomePage);

    useEffect(() => {
        if (!isMobile) {
            setDrawerOpen(isHomePage); // Only auto-open on larger screens
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
};
