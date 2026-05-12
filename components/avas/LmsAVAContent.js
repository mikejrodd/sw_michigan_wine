'use client';
import React from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/system';
import LmsHistory from '@/components/avas/LmsHistory';
import LmsGrowingConditions from '@/components/avas/LmsGrowingConditions';
import LmsMustTryBottles from '@/components/avas/LmsMustTryBottles';
import LmsWineries from '@/components/avas/LmsWineries';
import LmsInterestingVarieties from '@/components/avas/LmsInterestingVarieties';
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
    backgroundImage: "url('/assets/sunset.jpg')",
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

const LmsAVAContent = () => {
    const isMobile = useIsMobile();

    return (
        <PageContainer>
            <HeroBox isMobile={isMobile} />
            <ContentContainer isMobile={isMobile}>
                <SectionContainer isMobile={isMobile}>
                    <SectionTitle variant="h1" isMobile={isMobile}>
                        Lake Michigan Shore AVA: History & Overview
                    </SectionTitle>
                    <LmsHistory />
                </SectionContainer>
                <SectionContainer isMobile={isMobile}>
                    <SectionTitle variant="h1" isMobile={isMobile}>
                        Growing Conditions
                    </SectionTitle>
                    <LmsGrowingConditions />
                </SectionContainer>
                <SectionContainer isMobile={isMobile}>
                    <SectionTitle variant="h1" isMobile={isMobile}>
                        Wineries
                    </SectionTitle>
                    <LmsWineries />
                </SectionContainer>
                <SectionContainer isMobile={isMobile}>
                    <SectionTitle variant="h1" isMobile={isMobile}>
                        Interesting Varieties
                    </SectionTitle>
                    <LmsInterestingVarieties />
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

export default LmsAVAContent;
