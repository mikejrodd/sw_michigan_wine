// import React, { useState } from 'react';
// import { AppBar, Toolbar, Button, Box, IconButton, Drawer, List, ListItem, ListItemText, ListItemIcon, Divider, Typography, CssBaseline } from '@mui/material';
// import { Link } from 'react-router-dom';
// import { styled } from '@mui/system';
// import { ReactComponent as MichiganIcon } from '../../assets/michigan.svg';
// import '../../App.css'; // Ensure this is the correct path to your CSS file

// const drawerWidth = 240;

// const CustomExpandMoreIcon = styled('svg')(({ open }) => ({
//     width: '24px',
//     height: '12px',
//     fill: 'none',
//     stroke: '#D4B9DB',
//     strokeWidth: '1.75',
//     strokeLinecap: 'round',
//     strokeLinejoin: 'round',
//     transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
//     transition: 'transform 0.3s',
// }));

// const StyledMichiganIcon = styled(MichiganIcon)({
//     height: '50px',
//     width: '50px',
//     paddingRight: '0px',
//     fill: 'currentColor', // Allows color to be set via CSS or inline style
// });

// const DrawerHeader = styled('div')({
//     display: 'flex',
//     alignItems: 'center',
//     padding: '0 1rem',
//     justifyContent: 'flex-end',
// });

// const MainContent = styled('main')(({ open }) => ({
//     flexGrow: 1,
//     padding: '1rem',
//     marginLeft: open ? drawerWidth : 0,
//     transition: 'margin 0.3s ease-out',
// }));

// const Navigation = () => {
//     const [drawerOpen, setDrawerOpen] = useState(false);

//     const handleDrawerToggle = () => {
//         setDrawerOpen(!drawerOpen);
//     };

//     return (
//         <Box sx={{ display: 'flex' }}>
//             <CssBaseline />
//             <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: 'white', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', minHeight: '70px' }}>
//                 <Toolbar style={{ justifyContent: 'space-between' }}>
//                     <Box display="flex" alignItems="center">
//                         <Button
//                             onClick={handleDrawerToggle}
//                             className="btn"
//                             style={{
//                                 display: 'flex',
//                                 alignItems: 'center',
//                                 color: 'black',
//                                 textTransform: 'none',
//                                 padding: '0 10px',
//                                 backgroundColor: 'transparent',
//                                 boxShadow: 'none',
//                             }}
//                         >
//                             <CustomExpandMoreIcon viewBox="0 0 24 12" open={drawerOpen}>
//                                 <path d="M2 2L12 10L22 2" />
//                             </CustomExpandMoreIcon>
//                         </Button>
//                         <img src="/assets/logo.png" alt="Logo" style={{ height: '40px', margin: '0 8px' }} />
//                         <img src="/assets/fincuva.png" alt="Fincuva Logo" style={{ height: '40px', margin: '0 8px' }} />
//                     </Box>
//                     <IconButton
//                         component={Link}
//                         to="/"
//                         className="btn"
//                         style={{
//                             color: 'black',
//                             padding: 0,
//                             backgroundColor: 'transparent',
//                             boxShadow: 'none',
//                         }}
//                     >
//                         <StyledMichiganIcon style={{ color: 'black' }} />
//                     </IconButton>
//                 </Toolbar>
//             </AppBar>
//             <Drawer
//                 sx={{
//                     width: drawerWidth,
//                     flexShrink: 0,
//                     '& .MuiDrawer-paper': {
//                         width: drawerWidth,
//                         boxSizing: 'border-box',
//                     },
//                 }}
//                 variant="persistent"
//                 anchor="left"
//                 open={drawerOpen}
//             >
//                 <DrawerHeader>
//                     <IconButton onClick={handleDrawerToggle}>
//                         <CustomExpandMoreIcon open={!drawerOpen}>
//                             <path d="M2 2L12 10L22 2" />
//                         </CustomExpandMoreIcon>
//                     </IconButton>
//                 </DrawerHeader>
//                 <Divider />
//                 <List>
//                     <ListItem>
//                         <ListItemText primary="AVAs" />
//                     </ListItem>
//                     <List component="div" disablePadding>
//                         <ListItem button component={Link} to="/avas">
//                             <ListItemIcon>📍</ListItemIcon>
//                             <ListItemText primary="AVAs" />
//                         </ListItem>
//                     </List>
//                     <Divider />
//                     <ListItem>
//                         <ListItemText primary="Wineries" />
//                     </ListItem>
//                     <List component="div" disablePadding>
//                         <ListItem button component={Link} to="/wineries">
//                             <ListItemIcon>🍷</ListItemIcon>
//                             <ListItemText primary="Wineries" />
//                         </ListItem>
//                     </List>
//                     <Divider />
//                     <ListItem>
//                         <ListItemText primary="Grape Varieties" />
//                     </ListItem>
//                     <List component="div" disablePadding>
//                         <ListItem button component={Link} to="/grape-varieties">
//                             <ListItemIcon>🍇</ListItemIcon>
//                             <ListItemText primary="Grape Varieties" />
//                         </ListItem>
//                     </List>
//                 </List>
//             </Drawer>
//             <MainContent open={drawerOpen}>
//                 <DrawerHeader />
//                 {/* Your main content goes here */}
//             </MainContent>
//         </Box>
//     );
// };

// export default Navigation;
