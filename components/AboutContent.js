'use client';

import React from 'react';
import { Box, Typography, Divider } from '@mui/material';
import { styled } from '@mui/system';

const PageContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#ffffff',
    boxSizing: 'border-box',
    padding: '2rem 1rem',
    marginBottom: '40px',
});

const ContentBox = styled(Box)({
    maxWidth: '700px',
    width: '100%',
});

const SectionTitle = styled(Typography)({
    color: '#7b1fa2',
    fontFamily: "'Playfair Display', serif",
    fontWeight: 'bold',
    marginBottom: '1rem',
    marginTop: '2rem',
});

export default function AboutContent() {
    return (
        <PageContainer>
            <ContentBox>
                <Typography
                    variant="h1"
                    sx={{
                        fontFamily: "'Playfair Display', serif",
                        fontWeight: 'bold',
                        color: '#7b1fa2',
                        fontSize: { xs: '1.5rem', md: '2.5rem' },
                        textAlign: 'center',
                        marginBottom: '2rem',
                    }}
                >
                    About This Site
                </Typography>

                <Typography variant="body1" paragraph>
                    This is an independent project created to bring attention to the incredible wineries
                    of Southwest Michigan. The Lake Michigan Shore and Fennville AVAs are home to
                    some of the most exciting wine being made in the Midwest, and this site exists to
                    help people discover them.
                </Typography>

                <Typography variant="body1" paragraph>
                    This project is not affiliated with, endorsed by, or officially connected to any
                    winery, wine trail, industry organization, or government body. All content is
                    independently researched and maintained.
                </Typography>

                <Divider sx={{ my: 3 }} />

                <SectionTitle variant="h2">
                    Self-Funded, Not Monetized
                </SectionTitle>
                <Typography variant="body1" paragraph>
                    This site is fully self-funded. There are no ads, no sponsored content, no affiliate
                    links, and no revenue of any kind. No winery has paid for placement or preferential
                    treatment. The goal is simply to share what makes this wine region special.
                </Typography>

                <Divider sx={{ my: 3 }} />

                <SectionTitle variant="h2">
                    Your Privacy
                </SectionTitle>
                <Typography variant="body1" paragraph>
                    This site does not collect, store, or process any user data. There are no analytics
                    trackers, no cookies, no sign-up forms, and no personal information gathered in
                    any way. Your visit here is completely private.
                </Typography>
            </ContentBox>
        </PageContainer>
    );
}
