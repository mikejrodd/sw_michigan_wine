'use client';
import React from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/system';
import FennvilleGrowingConditions from '@/components/avas/FennvilleGrowingConditions';
import LmsMustTryBottles from '@/components/avas/LmsMustTryBottles';
import FennvilleWineries from '@/components/avas/FennvilleWineries';
import FennvilleInterestingVarieties from '@/components/avas/FennvilleInterestingVarieties';
import useIsMobile from '@/hooks/useIsMobile';

const PageContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#ffffff',
    boxSizing: 'border-box',
    marginBottom: '40px',
});

const HeroBox = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'isMobile',
})(({ isMobile }) => ({
    width: '100%',
    maxWidth: isMobile ? '100%' : '1100px',
    height: isMobile ? '150px' : '250px',
    backgroundImage: "url('/assets/bridge.jpg')",
    backgroundSize: 'cover',
    backgroundPosition: 'center 70%',
    backgroundRepeat: 'no-repeat',
    marginBottom: isMobile ? '10px' : '16px',
    borderRadius: isMobile ? '0px' : '20px',
    overflow: 'hidden',
}));

const ContentContainer = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'isMobile',
})(({ isMobile }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: isMobile ? '100%' : '95%',
    maxWidth: '1100px',
    padding: isMobile ? '0px' : '16px',
    marginTop: '1rem',
    backgroundColor: '#ffffff',
    boxSizing: 'border-box',
}));

const SectionContainer = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'isMobile',
})(({ isMobile }) => ({
    backgroundColor: '#ffffff',
    width: '100%',
    maxWidth: '1100px',
    margin: isMobile ? '20px auto' : '40px auto',
    padding: isMobile ? '8px' : '16px',
}));

const SectionTitle = styled(Typography, {
    shouldForwardProp: (prop) => prop !== 'isMobile',
})(({ isMobile }) => ({
    color: '#7b1fa2',
    textAlign: 'center',
    marginBottom: isMobile ? '30px' : '50px',
    fontFamily: "'Playfair Display', serif",
    fontWeight: 'bold',
    fontSize: isMobile ? '1rem' : '2rem',
    paddingLeft: isMobile ? '1rem' : '0',
    paddingRight: isMobile ? '1rem' : '0',
}));

const FennvilleAVAContent = () => {
    const isMobile = useIsMobile();

    return (
        <PageContainer>
            <HeroBox isMobile={isMobile} />
            <ContentContainer isMobile={isMobile}>
                <SectionContainer isMobile={isMobile}>
                    <SectionTitle variant="h1" isMobile={isMobile}>
                        Fennville AVA: Overview & Growing Conditions
                    </SectionTitle>
                    <FennvilleGrowingConditions />
                </SectionContainer>
                <SectionContainer isMobile={isMobile}>
                    <SectionTitle variant="h1" isMobile={isMobile}>
                        Wineries
                    </SectionTitle>
                    <FennvilleWineries />
                </SectionContainer>
                <SectionContainer isMobile={isMobile}>
                    <SectionTitle variant="h1" isMobile={isMobile}>
                        Interesting Varieties
                    </SectionTitle>
                    <FennvilleInterestingVarieties />
                </SectionContainer>
                <SectionContainer isMobile={isMobile}>
                    <SectionTitle variant="h1" isMobile={isMobile}>
                        Must Try Bottles
                    </SectionTitle>
                    <LmsMustTryBottles />
                </SectionContainer>
            </ContentContainer>
        </PageContainer>
    );
};

export default FennvilleAVAContent;
