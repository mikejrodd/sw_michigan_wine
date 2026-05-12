import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Box, Typography, useMediaQuery } from '@mui/material';
import { styled } from '@mui/system';
import bridgeImage from '../../assets/bridge.jpg';
import FennvilleGrowingConditions from './FennvilleGrowingConditions';
import LmsMustTryBottles from './LmsMustTryBottles';
import LmsWineries from './FennvilleWineries';
import FennvilleInterestingVarieties from './FennvilleInterestingVarieties';
import { useDrawer } from '../../context/DrawerContext';
import { isMobileDevice } from '../../utils/detectDevice';

const PageContainer = styled(Box)(({ drawerOpen, isMobile }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    maxWidth: isMobile ? '100vw' : `calc(100vw - ${drawerOpen ? 340 : 340}px)`,
    height: 'auto',
    margin: '0',
    paddingTop: '1rem',
    marginLeft: isMobile ? '0' : drawerOpen ? '320px' : '160px',
    backgroundColor: '#ffffff',
    boxSizing: 'border-box',
    marginTop: '20px',
    marginBottom: '40px',
}));

const BackgroundContainer = styled(Box)(({ isMobile }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: isMobile ? '100%' : '95%',
    maxWidth: '1100px',
    padding: isMobile ? '0px' : '16px',
    backgroundColor: '#ffffff',
    boxSizing: 'border-box',
}));

const HeroBox = styled(Box)(({ isMobile }) => ({
    width: '100vw',
    maxWidth: isMobile ? '100vw' : '1100px',
    height: isMobile ? '150px' : '250px',
    backgroundImage: `url(${bridgeImage})`,
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
    margin: isMobile ? '20px auto' : '40px auto',
    padding: isMobile ? '8px' : '16px',
}));

const TitleTypography = styled(Typography)(({ isMobile }) => ({
    color: '#7b1fa2',
    textAlign: 'center',
    marginBottom: isMobile ? '30px' : '70px',
    fontFamily: "'Playfair Display', serif",
    fontWeight: 'bold',
    fontSize: isMobile ? '1rem' : '2rem',
    paddingLeft: isMobile ? '1rem' : '0rem',
    paddingRight: isMobile ? '1rem' : '0rem',
}));

const FennvilleAVADetails = () => {
    const [isSticky, setIsSticky] = useState(true);
    const { drawerOpen } = useDrawer();
    const isMobile = useMediaQuery('(max-width:768px)') || isMobileDevice();

    return (
        <PageContainer drawerOpen={drawerOpen} isMobile={isMobile}>
            <Helmet>
                <title>Fennville AVA – Wineries, Grapes & Must-Try Wines in Southwest Michigan</title>
                <link rel="canonical" href="https://www.lakemichiganshore.wine/avas/fennville" />
                <meta name="description" content="Explore Michigan's Fennville AVA. Learn about its growing conditions, discover local wineries, and find must-try bottles from this unique corner of the Lake Michigan Shore." />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Fennville AVA – Wineries, Grapes & Must-Try Wines" />
                <meta property="og:description" content="Explore the Fennville AVA — growing conditions, wineries, and must-try wines in Southwest Michigan." />
                <meta property="og:url" content="https://www.lakemichiganshore.wine/avas/fennville" />
                <meta property="og:image" content="https://www.lakemichiganshore.wine/assets/fennville_wide.png" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Fennville AVA | Southwest Michigan Wine Region" />
                <meta name="twitter:description" content="Discover wineries, grapes, and must-try wines in Michigan's Fennville AVA." />
                <meta name="twitter:image" content="https://www.lakemichiganshore.wine/assets/fennville_wide.png" />
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "BreadcrumbList",
                        "itemListElement": [
                            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.lakemichiganshore.wine/" },
                            { "@type": "ListItem", "position": 2, "name": "AVAs", "item": "https://www.lakemichiganshore.wine/avas" },
                            { "@type": "ListItem", "position": 3, "name": "Fennville", "item": "https://www.lakemichiganshore.wine/avas/fennville" }
                        ]
                    })}
                </script>
            </Helmet>
            <HeroBox isMobile={isMobile} />
            <BackgroundContainer isMobile={isMobile} sx={{ marginTop: '1rem' }}>
                <SectionContainer isMobile={isMobile}>
                    <TitleTypography variant="h1" isMobile={isMobile}>
                        Fennville AVA: Overview & Growing Conditions
                    </TitleTypography>
                    <FennvilleGrowingConditions />
                </SectionContainer>
                <SectionContainer isMobile={isMobile}>
                    <TitleTypography variant="h1" isMobile={isMobile}>
                        Wineries
                    </TitleTypography>
                    <LmsWineries />
                </SectionContainer>
                <SectionContainer isMobile={isMobile}>
                    <TitleTypography variant="h1" isMobile={isMobile}>
                        Interesting Varieties
                    </TitleTypography>
                    <FennvilleInterestingVarieties />
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

export default FennvilleAVADetails;

