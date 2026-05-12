'use client';

import React, { useState } from 'react';
import { AppBar, Toolbar, Button, Box, IconButton, Drawer, List, ListItem, ListItemText, ListItemIcon, Divider, Collapse, CssBaseline } from '@mui/material';
import { ExpandLess, ExpandMore, Menu as MenuIcon } from '@mui/icons-material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { styled } from '@mui/system';
import wineryData from '@/data/wineryData.json';
import { useDrawer } from '@/providers/DrawerProvider';
import useIsMobile from '@/hooks/useIsMobile';

const drawerWidth = 340;
const scrollableHeight = 300;

const CustomExpandMoreIcon = styled('svg', {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ open }) => ({
    width: '24px',
    height: '12px',
    fill: 'none',
    stroke: '#D4B9DB',
    strokeWidth: '3',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
    transition: 'transform 0.3s',
    marginTop: '14px',
    marginLeft: '10px',
}));

const MichiganIcon = styled('img')({
    height: '24px',
    width: '24px',
});

const HeadMichiganIcon = styled('img')({
    height: '45px',
    width: '55px',
    marginRight: '0px',
    marginTop: '10px',
    marginLeft: '4px',
    '@media (max-width: 768px)': {
        height: '35px',
        width: '20px',
        marginTop: '6px',
        marginLeft: '20px',
    },
});

const DrawerHeader = styled('div')({
    display: 'flex',
    alignItems: 'center',
    padding: '0 1rem',
    justifyContent: 'flex-end',
    minHeight: '92px',
    '@media (max-width: 768px)': {
        justifyContent: 'space-between',
    },
});

const MainContent = styled('main', {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ open }) => ({
    flexGrow: 1,
    padding: '0rem',
    marginLeft: open ? `${drawerWidth}px` : '0px',
    transition: 'margin-left 0.3s ease-out, width 0.3s ease-out',
    marginTop: '80px',
    backgroundColor: '#ffffff',
    width: `calc(100vw - ${open ? drawerWidth : 0}px)`,
}));

const CustomDivider = styled(Divider)({
    margin: '8px 16px',
});

const CustomListItemContainer = styled(Box)({
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    marginBottom: '4px',
});

const CustomListItemIcon = styled(ListItemIcon)({
    marginRight: '8px',
    minWidth: '32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
});

const CustomListItem = styled(Button, {
    shouldForwardProp: (prop) => prop !== 'highlighted',
})(({ highlighted }) => ({
    width: '87%',
    justifyContent: 'flex-start',
    borderRadius: '20px',
    backgroundColor: highlighted ? 'rgba(241, 225, 245, 0.5)' : 'transparent',
    '&:hover': {
        backgroundColor: highlighted ? 'rgba(241, 225, 245, 0.5)' : 'rgba(241, 225, 245, 0.2)',
    },
    textAlign: 'left',
    paddingLeft: '16px',
    paddingRight: '16px',
    paddingTop: '0px',
    paddingBottom: '0px',
    color: 'black',
    textTransform: 'none',
}));

const ListItemHeader = styled(ListItem)({
    paddingLeft: '45px',
    paddingRight: '20px',
    alignItems: 'center',
    marginBottom: '0px',
    backgroundColor: 'transparent',
    display: 'flex',
    justifyContent: 'space-between',
    color: '#7b1fa2',
    fontWeight: '700',
});

const ScrollableList = styled(List)({
    maxHeight: `${scrollableHeight}px`,
    overflowY: 'scroll',
    scrollbarWidth: 'thin',
    scrollbarColor: '#D4B9DB transparent',
    '&::-webkit-scrollbar': {
        width: '8px',
    },
    '&::-webkit-scrollbar-track': {
        backgroundColor: 'transparent',
    },
    '&::-webkit-scrollbar-thumb': {
        backgroundColor: '#D4B9DB',
        borderRadius: '4px',
    },
});

const StyledDrawer = styled(Drawer)({
    '& .MuiDrawer-paper': {
        width: drawerWidth,
        boxSizing: 'border-box',
        overflowY: 'scroll',
        scrollbarWidth: 'none',
        '&::-webkit-scrollbar': {
            display: 'none',
        },
        '@media (max-width: 768px)': {
            width: '100vw',
        },
    },
});

const Layout = ({ children }) => {
    const { drawerOpen, toggleDrawer } = useDrawer();
    const isMobile = useIsMobile();
    const [openAVAs, setOpenAVAs] = useState(true);
    const [openWineries, setOpenWineries] = useState(true);
    const [openGrapeVarieties, setOpenGrapeVarieties] = useState(true);
    const activePage = usePathname();

    const handleDrawerToggle = () => {
        toggleDrawer();
    };

    const handleToggleAVAs = () => {
        setOpenAVAs(!openAVAs);
    };

    const handleToggleWineries = () => {
        setOpenWineries(!openWineries);
    };

    const handleToggleGrapeVarieties = () => {
        setOpenGrapeVarieties(!openGrapeVarieties);
    };

    const handleItemClick = () => {
        if (isMobile) {
            toggleDrawer();
        }
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                    backgroundColor: 'white',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                    minHeight: { xs: '60px', md: '80px' },
                }}
            >
                <Toolbar style={{ justifyContent: 'space-between' }}>
                    <Box display="flex" alignItems="center">
                        <IconButton
                            onClick={handleDrawerToggle}
                            sx={{
                                padding: 0,
                                marginRight: { xs: '7px', md: '20px' },
                                marginTop: { xs: '11px', md: '20px' },
                            }}
                        >
                            <MenuIcon sx={{ fontSize: { xs: '28px', md: '34px' }, color: '#D4B9DB' }} />
                        </IconButton>
                        <Box
                            component="img"
                            src="/assets/swm.png"
                            alt="SWM Logo"
                            onClick={handleDrawerToggle}
                            sx={{
                                height: { xs: '25px', md: '38px' },
                                maxWidth: { xs: '220px', md: '375px' },
                                marginLeft: { xs: '0px', md: '4px' },
                                marginTop: { xs: '11px', md: '18px' },
                                marginBottom: '0px',
                                cursor: 'pointer',
                            }}
                        />
                    </Box>
                    <IconButton
                        component={Link}
                        href="/"
                        className="btn"
                    >
                        <HeadMichiganIcon
                            src="/assets/michigan.svg"
                            alt="Michigan"
                        />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <StyledDrawer
                variant="persistent"
                anchor="left"
                open={drawerOpen}
            >
                <DrawerHeader>
                    <IconButton onClick={handleDrawerToggle}>
                        <CustomExpandMoreIcon viewBox="0 0 24 12" open={!drawerOpen}>
                            <path d="M2 2L12 10L22 2" />
                        </CustomExpandMoreIcon>
                    </IconButton>
                </DrawerHeader>
                <List>
                    <CustomListItemContainer>
                        <CustomListItem
                            component={Link}
                            href="/"
                            highlighted={activePage === '/'}
                            onClick={handleItemClick}
                        >
                            <CustomListItemIcon>
                                <MichiganIcon src="/assets/michigan.svg" alt="Home" />
                            </CustomListItemIcon>
                            <ListItemText primary="Home" />
                        </CustomListItem>
                    </CustomListItemContainer>
                    <CustomListItemContainer>
                        <CustomListItem
                            component="a"
                            href="https://map.lakemichiganshore.wine/"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={handleItemClick}
                        >
                            <CustomListItemIcon>🗺️</CustomListItemIcon>
                            <ListItemText primary="Map" />
                        </CustomListItem>
                    </CustomListItemContainer>
                    <CustomDivider />
                    <ListItemHeader button onClick={handleToggleAVAs}>
                        <ListItemText primary="AVAs" />
                        {openAVAs ? <ExpandLess /> : <ExpandMore />}
                    </ListItemHeader>
                    <Collapse in={openAVAs} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <CustomListItemContainer>
                                <CustomListItem
                                    component={Link}
                                    href="/avas/lake-michigan-shore"
                                    highlighted={activePage === '/avas/lake-michigan-shore'}
                                    onClick={handleItemClick}
                                >
                                    <CustomListItemIcon>
                                        <img src="/assets/lms_logo.png" alt="Lake Michigan Shore" style={{ height: '24px', width: '24px', objectFit: 'contain' }} />
                                    </CustomListItemIcon>
                                    <ListItemText primary="Lake Michigan Shore" />
                                </CustomListItem>
                            </CustomListItemContainer>
                            <CustomListItemContainer>
                                <CustomListItem
                                    component={Link}
                                    href="/avas/fennville"
                                    highlighted={activePage === '/avas/fennville'}
                                    onClick={handleItemClick}
                                >
                                    <CustomListItemIcon>
                                        <img src="/assets/fennvillecity.png" alt="Fennville" style={{ height: '24px', width: '24px', objectFit: 'contain' }} />
                                    </CustomListItemIcon>
                                    <ListItemText primary="Fennville" />
                                </CustomListItem>
                            </CustomListItemContainer>
                        </List>
                    </Collapse>
                    <CustomDivider />
                    <ListItemHeader button onClick={handleToggleWineries}>
                        <ListItemText primary="Wineries" />
                        {openWineries ? <ExpandLess /> : <ExpandMore />}
                    </ListItemHeader>
                    <Collapse in={openWineries} timeout="auto" unmountOnExit>
                        <ScrollableList component="div" disablePadding>
                            {wineryData.map(winery => (
                                <CustomListItemContainer key={winery.name.toLowerCase().replace(/ /g, '-')}>
                                    <CustomListItem
                                        component={Link}
                                        href={`/wineries/${winery.name.toLowerCase().replace(/ /g, '-')}`}
                                        highlighted={activePage === `/wineries/${winery.name.toLowerCase().replace(/ /g, '-')}`}
                                        onClick={handleItemClick}
                                    >
                                        <CustomListItemIcon>
                                            <img src={winery.image} alt={winery.name} style={{ height: '24px', width: '24px', objectFit: 'contain', objectPosition: 'center' }} />
                                        </CustomListItemIcon>
                                        <ListItemText primary={winery.name} />
                                    </CustomListItem>
                                </CustomListItemContainer>
                            ))}
                        </ScrollableList>
                    </Collapse>
                    <CustomDivider />
                    <ListItemHeader button onClick={handleToggleGrapeVarieties}>
                        <ListItemText primary="Learn" />
                        {openGrapeVarieties ? <ExpandLess /> : <ExpandMore />}
                    </ListItemHeader>
                    <Collapse in={openGrapeVarieties} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <CustomListItemContainer>
                                <CustomListItem
                                    component={Link}
                                    href="/grape-varieties"
                                    highlighted={activePage === '/grape-varieties'}
                                    onClick={handleItemClick}
                                >
                                    <CustomListItemIcon>🍇</CustomListItemIcon>
                                    <ListItemText primary="Varieties" />
                                </CustomListItem>
                            </CustomListItemContainer>
                        </List>
                    </Collapse>
                    <CustomDivider />
                    <CustomListItemContainer>
                        <CustomListItem
                            component="a"
                            href="https://www.fincuva.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={handleItemClick}
                        >
                            <CustomListItemIcon>
                                <img src="/assets/winery_logos/logo.png" alt="Fincuva" style={{ height: '24px', width: '24px', objectFit: 'contain', objectPosition: 'center' }} />
                            </CustomListItemIcon>
                            <ListItemText primary="About fincuva" />
                        </CustomListItem>
                    </CustomListItemContainer>
                    <CustomListItemContainer>
                        <CustomListItem
                            component="a"
                            href="https://miwinetrail.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={handleItemClick}
                        >
                            <CustomListItemIcon>
                                <img src="/assets/trail.png" alt="Wine Trail" style={{ height: '24px', width: '24px', objectFit: 'contain', objectPosition: 'center' }} />
                            </CustomListItemIcon>
                            <ListItemText primary="Wine Trail" />
                        </CustomListItem>
                    </CustomListItemContainer>
                    <CustomListItemContainer>
                        <CustomListItem
                            component="a"
                            href="https://michigan.guides.winefolly.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={handleItemClick}
                        >
                            <CustomListItemIcon>
                                <img src="/assets/folly.png" alt="Wine Folly" style={{ height: '24px', width: '24px', objectFit: 'contain', objectPosition: 'center' }} />
                            </CustomListItemIcon>
                            <ListItemText primary="Wine Folly" />
                        </CustomListItem>
                    </CustomListItemContainer>
                </List>
            </StyledDrawer>
            <MainContent open={drawerOpen}>
                {children}
            </MainContent>
        </Box>
    );
};

export default Layout;
