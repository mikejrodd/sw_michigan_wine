'use client';
import React from 'react';
import { Box, Grid, Card, Typography, CardMedia, Tooltip } from '@mui/material';
import { useRouter } from 'next/navigation';
import styled from '@emotion/styled';
import useIsMobile from '@/hooks/useIsMobile';

const TitleTypography = styled(Typography, {
    shouldForwardProp: (prop) => prop !== 'isMobile',
})(({ isMobile }) => ({
    color: '#7b1fa2',
    textAlign: 'center',
    marginBottom: isMobile ? '60px' : '70px',
    fontFamily: "'Playfair Display', serif",
    fontSize: isMobile ? '1.5rem' : '3rem',  // Adjust font size dynamically
    fontWeight: 'bold',
    paddingLeft: isMobile ? '7rem' : '0',
    paddingRight: isMobile ? '7rem' : '0',
    letterSpacing: '-0.05em',
}));

const PageContainer = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'isMobile',
})(({ isMobile }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    paddingTop: isMobile ? '1rem' : '2rem',
    backgroundColor: '#ffffff',
    boxSizing: 'border-box',
    marginTop: isMobile ? '50px' : '20px',
    marginBottom: isMobile ? '0px' : '40px',
}));

const StyledCard = styled(Card, {
    shouldForwardProp: (prop) => prop !== 'isMobile',
})(({ isMobile }) => ({
    width: isMobile ? '140px' : '240px',  // Smaller cards on mobile
    height: isMobile ? '140px' : '240px',
    borderRadius: '50%',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
    margin: isMobile ? '-20px -14px' : '-27px -7px',
    cursor: 'pointer',
    position: 'relative',
    overflow: 'hidden',
    border: '8px solid #D4B9DB',  // Reduce border for mobile
    zIndex: 1,
    '&:hover': isMobile ? {} : {  // Disable hover effects on touchscreens
        transform: 'scale(1.2)',
        border: 'none',
        boxShadow: 'none',
        zIndex: 1000,
    },
}));

const StyledCardMediaContainer = styled(Box)({
    width: '100%',
    height: '100%',
    overflow: 'hidden',
});

const StyledCardMedia = styled(CardMedia)({
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'center',
});

const Overlay = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'isMobile',
})(({ isMobile }) => ({
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(217, 195, 222, 0.95)',
    opacity: 0,
    transition: 'opacity 0.3s ease-in-out',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: isMobile ? '1rem' : '1.5rem',
    '&:hover': isMobile ? {} : { opacity: 1 },  // Disable hover on mobile
}));

const OverlayText = styled(Typography, {
    shouldForwardProp: (prop) => prop !== 'isMobile',
})(({ isMobile }) => ({
    color: '#ffffff',
    fontFamily: "'Playfair Display', serif",
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: isMobile ? '0.9rem' : '1.2rem',
}));

const HomeCards = () => {
    const router = useRouter();
    const isMobile = useIsMobile();

    const handleCardClick = (path) => {
        router.push(path);
    };

    return (
        <PageContainer isMobile={isMobile}>
            <TitleTypography variant="h1" component="h2" gutterBottom isMobile={isMobile}>
                Discover Southwest Michigan Wine
            </TitleTypography>
            <Grid container spacing={isMobile ? 1 : 0} justifyContent="center" width="100%">
                <Grid container item xs={12} justifyContent="center" spacing={isMobile ? 2 : 0}>
                    <Grid item>
                        <StyledCard onClick={() => handleCardClick('/grape-varieties')} isMobile={isMobile}>
                            <StyledCardMediaContainer>
                                <StyledCardMedia
                                    component="img"
                                    image="/assets/variety_images/riesling.jpg"
                                    alt="Grape Varieties"
                                />
                            </StyledCardMediaContainer>
                            <Overlay className="overlay" isMobile={isMobile}>
                                <OverlayText isMobile={isMobile}>Grape Varieties</OverlayText>
                            </Overlay>
                        </StyledCard>
                    </Grid>
                    <Grid item>
                        <StyledCard onClick={() => window.open('https://map.lakemichiganshore.wine/', '_blank')} isMobile={isMobile}>
                            <StyledCardMediaContainer>
                                <StyledCardMedia component="img" image="/assets/map.png" alt="Map Preview" />
                            </StyledCardMediaContainer>
                            <Overlay className="overlay" isMobile={isMobile}>
                                <OverlayText isMobile={isMobile}>Map</OverlayText>
                            </Overlay>
                        </StyledCard>
                    </Grid>
                    <Grid item>
                        <StyledCard onClick={() => handleCardClick('/avas/lake-michigan-shore')} isMobile={isMobile}>
                            <StyledCardMediaContainer>
                                <StyledCardMedia component="img" image="/assets/content/dog.jpg" alt="AVAs" />
                            </StyledCardMediaContainer>
                            <Overlay className="overlay" isMobile={isMobile}>
                                <OverlayText isMobile={isMobile}>AVAs</OverlayText>
                            </Overlay>
                        </StyledCard>
                    </Grid>
                </Grid>

                <Grid container item xs={12} justifyContent="center" spacing={isMobile ? 2 : 0}>
                    <Grid item>
                        <Tooltip title="Coming Soon..." arrow>
                            <StyledCard isMobile={isMobile}>
                                <StyledCardMediaContainer>
                                    <StyledCardMedia component="img" image="/assets/content/gracia.png" alt="Must Try Wines" />
                                </StyledCardMediaContainer>
                                <Overlay className="overlay" isMobile={isMobile}>
                                    <OverlayText isMobile={isMobile}>Must Try Wines</OverlayText>
                                </Overlay>
                            </StyledCard>
                        </Tooltip>
                    </Grid>
                    <Grid item>
                        <StyledCard onClick={() => handleCardClick('/wineries/crane\'s-winery')} isMobile={isMobile}>
                            <StyledCardMediaContainer>
                                <StyledCardMedia component="img" image="/assets/content/featured.png" alt="Featured Winery" />
                            </StyledCardMediaContainer>
                            <Overlay className="overlay" isMobile={isMobile}>
                                <OverlayText isMobile={isMobile}>Featured Winery</OverlayText>
                            </Overlay>
                        </StyledCard>
                    </Grid>
                </Grid>

                <Grid container item xs={12} justifyContent="center" spacing={isMobile ? 2 : 0}>
                    <Grid item>
                        <StyledCard onClick={() => window.open('https://www.michigan.org/wineries', '_blank')} isMobile={isMobile}>
                            <StyledCardMediaContainer>
                                <StyledCardMedia component="img" image="/assets/pier2.jpg" alt="More Michigan" />
                            </StyledCardMediaContainer>
                            <Overlay className="overlay" isMobile={isMobile}>
                                <OverlayText isMobile={isMobile}>More Michigan</OverlayText>
                            </Overlay>
                        </StyledCard>
                    </Grid>
                </Grid>
            </Grid>
        </PageContainer>
    );
};

export default HomeCards;
