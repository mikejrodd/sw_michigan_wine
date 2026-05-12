import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Box, Typography, useMediaQuery } from '@mui/material';
import { styled } from '@mui/system';
import sunsetImage from '../../assets/sunset.jpg';
import LmsHistory from './LmsHistory';
import LmsGrowingConditions from './LmsGrowingConditions';
import LmsMustTryBottles from './LmsMustTryBottles';
import LmsWineries from './LmsWineries';
import LmsInterestingVarieties from './LmsInterestingVarieties';
import { useDrawer } from '../../context/DrawerContext';
import { isMobileDevice } from '../../utils/detectDevice';

const PageContainer = styled(Box)(({ drawerOpen, isMobile }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    maxWidth: isMobile ? '100vw' : `calc(100vw - ${drawerOpen ? 340 : 340}px)`,
    height: 'auto',
    paddingTop: '1rem',
    marginLeft: isMobile ? '0' : drawerOpen ? '310px' : '145px',
    backgroundColor: '#ffffff',
    boxSizing: 'border-box',
    marginTop: '20px',
    marginBottom: '40px',
}));

const BackgroundContainer = styled(Box)(({ isMobile }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: isMobile ? '100%' : '100%',
    maxWidth: '1100px',
    padding: isMobile ? '0px' : '0px',
    backgroundColor: '#ffffff',
    boxSizing: 'border-box',
}));

const HeroBox = styled(Box)(({ isMobile }) => ({
    width: '100vw',
    maxWidth: isMobile ? '100vw' : '1100px',
    height: isMobile ? '150px' : '250px',
    backgroundImage: `url(${sunsetImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center 70%',
    backgroundRepeat: 'no-repeat',
    marginBottom: isMobile ? '10px' : '16px',
    borderRadius: isMobile ? '0px' : '20px',
    position: 'relative',
    zIndex: 1,
    overflow: 'hidden',
    marginTop: isMobile ? '-70px' : '-120px',
}));

const SectionContainer = styled(Box)(({ isMobile }) => ({
    backgroundColor: '#ffffff',
    width: '100%',
    maxWidth: '1100px',
    margin: isMobile ? '20px auto' : 'auto',
    padding: isMobile ? '0px' : '16px',
}));

const TitleTypography = styled(Typography)(({ isMobile }) => ({
    color: '#7b1fa2',
    textAlign: 'center',
    marginBottom: isMobile ? '30px' : '40px',
    fontFamily: "'Playfair Display', serif",
    fontWeight: 'bold',
    fontSize: isMobile ? '1rem' : '2rem',
}));

const RightAlignedTitleTypography = styled(TitleTypography)(({ isMobile }) => ({
    textAlign: isMobile ? 'center' : 'right',
    marginRight: isMobile ? '0' : '11.5%',
}));

const LmsAVADetails = () => {
    const { drawerOpen } = useDrawer();
    const isMobile = useMediaQuery('(max-width:768px)') || isMobileDevice();

    return (
        <PageContainer drawerOpen={drawerOpen} isMobile={isMobile}>
            <Helmet>
                <title>Lake Michigan Shore AVA | History, Wineries & Grape Varieties</title>
                <link rel="canonical" href="https://www.lakemichiganshore.wine/avas/lake-michigan-shore" />
                <meta name="description" content="Explore Michigan's Lake Michigan Shore AVA. Learn about its history, growing conditions, 20+ wineries, and the grape varieties that thrive in Southwest Michigan." />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Lake Michigan Shore AVA | History, Wineries & Grape Varieties" />
                <meta property="og:description" content="Explore the Lake Michigan Shore AVA — history, growing conditions, wineries, and must-try wines." />
                <meta property="og:url" content="https://www.lakemichiganshore.wine/avas/lake-michigan-shore" />
                <meta property="og:image" content="https://www.lakemichiganshore.wine/assets/lms_wide.png" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Lake Michigan Shore AVA | Southwest Michigan Wine Region" />
                <meta name="twitter:description" content="History, growing conditions, wineries, and grape varieties of the Lake Michigan Shore AVA." />
                <meta name="twitter:image" content="https://www.lakemichiganshore.wine/assets/lms_wide.png" />
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "BreadcrumbList",
                        "itemListElement": [
                            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.lakemichiganshore.wine/" },
                            { "@type": "ListItem", "position": 2, "name": "AVAs", "item": "https://www.lakemichiganshore.wine/avas" },
                            { "@type": "ListItem", "position": 3, "name": "Lake Michigan Shore", "item": "https://www.lakemichiganshore.wine/avas/lake-michigan-shore" }
                        ]
                    })}
                </script>
            </Helmet>
            <HeroBox isMobile={isMobile} />
            <BackgroundContainer sx={{ marginTop: '1rem', width: isMobile ? '100%' : '95%', padding: 0 }}>
                <SectionContainer isMobile={isMobile}>
                    <TitleTypography variant="h1" isMobile={isMobile}>
                        Lake Michigan Shore AVA: History & Overview
                    </TitleTypography>
                    <LmsHistory />
                </SectionContainer>
                <SectionContainer isMobile={isMobile}>
                    <TitleTypography variant="h1" isMobile={isMobile}>
                        Growing Conditions
                    </TitleTypography>
                    <LmsGrowingConditions />
                </SectionContainer>
                <SectionContainer isMobile={isMobile}>
                    <TitleTypography variant="h1" isMobile={isMobile}>
                        Wineries
                    </TitleTypography>
                    <LmsWineries />
                </SectionContainer>
                <SectionContainer isMobile={isMobile}>
                    <TitleTypography variant="h1" isMobile={isMobile} sx={{ marginTop: '20px' }}>
                        Interesting Varieties
                    </TitleTypography>
                    <LmsInterestingVarieties />
                </SectionContainer>
                <SectionContainer isMobile={isMobile}>
                    <TitleTypography variant="h1" isMobile={isMobile}>
                        Must Try Bottles
                    </TitleTypography>
                    <LmsMustTryBottles />
                </SectionContainer>
            </BackgroundContainer>
        </PageContainer>
    );
};

export default LmsAVADetails;
