'use client';

import React, { useState, useEffect } from 'react';
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/system';
import CustomizedTimeline from '@/components/avas/LmsTimeline';
import lmsContent from '@/data/lms_content.json';

// Custom scrollbar styles
const ScrollbarStyles = styled('div')({
    '&::-webkit-scrollbar': {
        width: '8px',
    },
    '&::-webkit-scrollbar-track': {
        backgroundColor: '#f5f2eb',
        borderRadius: '16px',
    },
    '&::-webkit-scrollbar-thumb': {
        backgroundColor: '#b8a990',
        borderRadius: '16px',
    },
});

const StyledAccordion = styled(Accordion)({
    maxWidth: '900px',
    width: '100%',
    margin: '0 auto',
    marginTop: '35px',
    borderRadius: '16px',
    backgroundColor: 'transparent',
    overflow: 'hidden',
    '@media (max-width: 768px)': {
        maxWidth: '100%',
        marginTop: '20px',
    },
    '& .MuiAccordionSummary-root': {
        borderRadius: '16px',
        backgroundColor: '#fff',
        '&.Mui-expanded': {
            borderBottomLeftRadius: '16px',
            borderBottomRightRadius: '16px',
        },
    },
    '& .MuiAccordionDetails-root': {
        padding: 0,
        backgroundColor: '#f5f2eb',
        borderRadius: '16px',
    },
});

const AccordionContentWrapper = styled(ScrollbarStyles)({
    padding: '16px',
    backgroundColor: '#f5f2eb',
    overflowY: 'auto',
    overflowX: 'hidden',
    maxHeight: '400px',
    marginTop: '8px',
    '@media (max-width: 768px)': {
        maxHeight: '300px',
    },
});

const LmsHistory = () => {
    const [content, setContent] = useState('');
    const [accordionOpen, setAccordionOpen] = useState(false);

    useEffect(() => {
        if (accordionOpen && !content) {
            fetch('/register.html')
                .then(response => response.text())
                .then(data => setContent(data))
                .catch(error => console.error('Error fetching the content:', error));
        }
    }, [accordionOpen, content]);

    const paragraphs = lmsContent.history.split('\n\n');

    return (
        <Box sx={{
            marginTop: '1rem',
            width: '100%',
            display: 'flex',
            flexDirection: { xs: 'column', lg: 'row' },
            alignItems: 'flex-start',
            justifyContent: 'center',
            maxWidth: '100%',
            marginLeft: 'auto',
            marginRight: 'auto',
        }}>
            <Box sx={{
                flexShrink: 0,
                maxWidth: '45%',
                display: { xs: 'none', lg: 'flex' },
                justifyContent: 'center',
            }}>
                <CustomizedTimeline />
            </Box>
            <Box sx={{
                flex: 1,
                maxWidth: { xs: '100%', lg: '55%' },
                marginTop: '16px',
                width: '100%',
            }}>
                {paragraphs.map((paragraph, index) => (
                    <Typography key={index} variant="body1" paragraph>
                        {paragraph}
                    </Typography>
                ))}
                <StyledAccordion onChange={(e, expanded) => setAccordionOpen(expanded)}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            backgroundColor: '#fff',
                            borderRadius: '16px',
                            padding: { xs: '8px 16px', md: '16px 32px' },
                        }}
                    >
                        <Typography variant="h6" align="center" sx={{ fontSize: { xs: '16px', md: '20px' } }}>
                            Read the official Federal Register creating the AVA on October 13, 1983
                        </Typography>
                    </AccordionSummary>
                    {accordionOpen && (
                        <AccordionDetails>
                            <AccordionContentWrapper>
                                <Typography id="accordion-description" variant="body1" component="div">
                                    {content ? (
                                        <div dangerouslySetInnerHTML={{ __html: content }} />
                                    ) : (
                                        'Loading content...'
                                    )}
                                </Typography>
                            </AccordionContentWrapper>
                        </AccordionDetails>
                    )}
                </StyledAccordion>
            </Box>
        </Box>
    );
};

export default LmsHistory;
