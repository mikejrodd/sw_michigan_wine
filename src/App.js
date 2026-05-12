// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { DrawerProvider } from './context/DrawerContext'; // import DrawerProvider
import Layout from './components/Navigation/Layout';
import theme from './theme';
import HomePage from './pages/Home/HomePage';
import GrapeVarieties from './pages/GrapeVarieties/GrapeVarieties';
import AVAs from './pages/AVAs/AVAs';
import Wineries from './pages/Wineries/Wineries';
import FennvilleAVADetails from './pages/AVAs/FennvilleAVADetails';
import LakeMichiganShoreAVADetails from './pages/AVAs/LmsAVADetails';
// import ChatBot from './components/ChatBot';
import { isMobileDevice } from './utils/detectDevice'; // Import the device detection utility
import { Box, Typography } from '@mui/material';

const ExternalRedirect = ({ url }) => {
    React.useEffect(() => {
        window.location.href = url;
    }, [url]);

    return (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
            <Typography variant="h6">Loading some amazing Michigan wine...</Typography>
        </Box>
    );
};

function App() {
    // Force isMobile to be true if the screen width is less than 768px
    const isMobile = (typeof window !== 'undefined' && window.innerWidth < 768)
        ? true
        : isMobileDevice();

    return (
        <ThemeProvider theme={theme}>
            <Router>
                <DrawerProvider> {/* Provide the Drawer context */}
                    <Layout>
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/grape-varieties" element={<GrapeVarieties />} />
                            <Route path="/avas" element={<AVAs />} />
                            <Route path="/avas/fennville" element={<FennvilleAVADetails />} />
                            <Route path="/avas/lake-michigan-shore" element={<LakeMichiganShoreAVADetails />} />
                            <Route path="/wineries/:id" element={<Wineries />} />
                            <Route
                                path="/map"
                                element={<ExternalRedirect url="https://map.lakemichiganshore.wine/" />}
                            />
                        </Routes>
                    </Layout>
                </DrawerProvider>
            </Router>
        </ThemeProvider>
    );
}

export default App;

