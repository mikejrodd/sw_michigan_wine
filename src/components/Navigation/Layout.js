import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Button, Box, IconButton, Drawer, List, ListItem, ListItemText, ListItemIcon, Divider, Collapse, CssBaseline } from '@mui/material';
import { ExpandLess, ExpandMore, Menu as MenuIcon } from '@mui/icons-material'; 
import { Link, useLocation } from 'react-router-dom';
import { styled } from '@mui/system';
import { ReactComponent as MichiganIcon } from '../../assets/michigan.svg';
import wineryData from '../../data/wineryData.json';
import { useDrawer } from '../../context/DrawerContext'; // Ensure the path is correct based on your project structure
import { isMobileDevice } from '../../utils/detectDevice'; // Import the detectDevice utility
import '../../App.css';

// Constants
const drawerWidth = 340; // Fixed width for large screens
const scrollableHeight = 300; // Fixed height for the scrollable area in the drawer

// Styled components
const CustomExpandMoreIcon = styled('svg')(({ open }) => ({
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

const StyledMichiganIcon = styled(MichiganIcon)({
    height: '24px',
    width: '24px',
    fill: 'currentColor',
    color: 'black',
});

const HeadMichiganIcon = styled(MichiganIcon)(({ isMobile }) => ({
    height: isMobile ? '20px' : '55px',
    width: isMobile ? '20px' : '55px',
    fill: 'currentColor',
    marginRight: isMobile ? '20px' : '50px',
    marginTop: isMobile ? '10px' : '15px',
}));


const DrawerHeader = styled('div')(({ isMobile }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: '0 1rem',
    justifyContent: isMobile ? 'space-between' : 'flex-end',
    minHeight: '92px',
}));

const MainContent = styled('main')(({ open, isMobile }) => ({
    flexGrow: 1,
    padding: isMobile ? '0.5rem' : '0rem',
    marginLeft: isMobile ? '0px' : '0px',
    transition: 'margin 0.3s ease-out',
    marginTop: isMobile ? '60px' : '80px',
    backgroundColor: '#ffffff',
    width: isMobile ? '100%' : `calc(100vw - ${open ? drawerWidth : 0}px)`,
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

const CustomListItem = styled(Button)(({ highlighted }) => ({
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
    scrollbarWidth: 'thin', // For Firefox
    scrollbarColor: '#D4B9DB transparent', // For Firefox

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


const StyledDrawer = styled(Drawer)(({ open, isMobile }) => ({
    '& .MuiDrawer-paper': {
        width: isMobile ? '100vw' : drawerWidth, // Full width on mobile when open
        boxSizing: 'border-box',
        overflowY: 'scroll',
        scrollbarWidth: 'none',
        '&::-webkit-scrollbar': {
            display: 'none',
        },
    },
}));

const Layout = ({ children }) => {
    const { drawerOpen, toggleDrawer } = useDrawer();
    const isMobile = isMobileDevice(); // Use the device detection utility
    const [openAVAs, setOpenAVAs] = useState(true);
    const [openWineries, setOpenWineries] = useState(true);
    const [openGrapeVarieties, setOpenGrapeVarieties] = useState(true);
    const [showFincuva, setShowFincuva] = useState(true);
    const [transitionClass, setTransitionClass] = useState('');
    const location = useLocation();
    const activePage = location.pathname;

    useEffect(() => {
        const timer = setTimeout(() => {
            setTransitionClass('erase');
            setTimeout(() => {
                setShowFincuva(false);
                setTransitionClass('reveal');
            }, 1000);
        }, 4000);
        return () => clearTimeout(timer);
    }, []);

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
            toggleDrawer(); // Close the drawer if in mobile mode
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
                    minHeight: isMobile ? '60px' : '80px',
                }}
            >
                <Toolbar style={{ justifyContent: 'space-between' }}>
                    <Box display="flex" alignItems="center">
                        {/* <img src="/assets/logo.png" alt="Logo" style={{ height: '45px', marginTop: '14px' }} /> */}
                        <IconButton
                            onClick={handleDrawerToggle}
                            sx={{
                                padding: 0,
                                marginRight: isMobile ? '7px' : '20px',
                                marginTop: isMobile ? '11px' : '20px', 
                            }}
                        >
                            <MenuIcon sx={{ fontSize: isMobile ? '28px' : '34px', color: '#D4B9DB' }} />
                        </IconButton>
                        <img 
                            src="/assets/swm.png" 
                            alt="SWM Logo" 
                            onClick={handleDrawerToggle} // Add this line to toggle the drawer
                            style={{ 
                                height: isMobile ? '25px' : '38px', 
                                maxWidth: isMobile ? '220px' : '375px',
                                marginLeft: isMobile ? '0px' : '4px', 
                                marginTop: isMobile ? '11px' : '18px', 
                                marginBottom: '0px',
                                cursor: 'pointer' // Add pointer cursor for better UX
                            }} 
                        />

                    </Box>
                    <IconButton
                        component={Link}
                        to="/"
                        className="btn"
                    >
                        <HeadMichiganIcon 
                            style={{ 
                                height: isMobile ? '35px' : '45px', 
                                marginLeft: isMobile ? '20px' : '4px', 
                                marginTop: isMobile ? '6px' : '10px',
                                marginRight: isMobile ? '0px' : '0px',
                            }}
                        />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <StyledDrawer
                variant="persistent"
                anchor="left"
                open={drawerOpen}
                isMobile={isMobile} // Pass the mobile flag for responsive drawer width
            >
                <DrawerHeader isMobile={isMobile}>
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
                            to="/"
                            highlighted={activePage === '/'}
                            onClick={handleItemClick}
                        >
                            <CustomListItemIcon>
                                <StyledMichiganIcon />
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
                                    to="/avas/lake-michigan-shore"
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
                                    to="/avas/fennville"
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
                                        to={`/wineries/${winery.name.toLowerCase().replace(/ /g, '-')}`}
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
                                    to="/grape-varieties"
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
            <MainContent open={drawerOpen} isMobile={isMobile}>
                {React.cloneElement(children, { drawerOpen })}
            </MainContent>
        </Box>
    );
};

export default Layout;
