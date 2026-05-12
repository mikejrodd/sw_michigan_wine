import React, { useState, useEffect } from 'react';
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails, useMediaQuery } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/system';
import CustomizedTimeline from './LmsTimeline';
import lmsContent from './lms_content.json';
import { isMobileDevice } from '../../utils/detectDevice';

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

const StyledAccordion = styled(Accordion)(({ isMobile }) => ({
    maxWidth: isMobile ? '100%' : '900px',
    width: '100%',
    margin: '0 auto',
    marginTop: isMobile ? '20px' : '35px',
    borderRadius: '16px',
    backgroundColor: 'transparent',
    overflow: 'hidden',
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
}));

const AccordionContentWrapper = styled(ScrollbarStyles)(({ isMobile }) => ({
    padding: '16px',
    backgroundColor: '#f5f2eb',
    overflowY: 'auto',
    overflowX: 'hidden',
    maxHeight: isMobile ? '300px' : '400px',
    marginTop: '8px',
}));

const LmsHistory = () => {
    const [content, setContent] = useState('');
    const isSmallScreen = useMediaQuery('(max-width:1360px)') || isMobileDevice(); // Adjusted threshold

    useEffect(() => {
        fetch('/register.html')
            .then(response => response.text())
            .then(data => setContent(data))
            .catch(error => console.error('Error fetching the content:', error));
    }, []);

    const paragraphs = lmsContent.history.split('\n\n');

    return (
        <Box sx={{ 
            marginTop: '1rem', 
            width: '100%', 
            display: 'flex', 
            flexDirection: isSmallScreen ? 'column' : 'row', 
            alignItems: 'flex-start', 
            justifyContent: 'center',
            maxWidth: '100%',
            marginLeft: 'auto',
            marginRight: 'auto',
        }}>
            {!isSmallScreen && (
                <Box sx={{ 
                    flexShrink: 0,
                    maxWidth: '45%', 
                    marginRight: '0px', 
                    marginLeft: '0', 
                    marginTop: '0px',
                    display: 'flex',
                    justifyContent: 'center',
                }}>
                    <CustomizedTimeline />
                </Box>
            )}
            <Box sx={{ 
                flex: 1, 
                maxWidth: isSmallScreen ? '100%' : '55%', 
                marginTop: '16px',
                width: '100%',
            }}>
                {paragraphs.map((paragraph, index) => (
                    <Typography key={index} variant="body1" paragraph>
                        {paragraph}
                    </Typography>
                ))}
                <StyledAccordion isMobile={isSmallScreen}>
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
                    <AccordionDetails>
                        <AccordionContentWrapper isMobile={isSmallScreen}>
                            <Typography id="accordion-description" variant="body1">
                                {content ? (
                                    <div dangerouslySetInnerHTML={{ __html: content }} />
                                ) : (
                                    'Loading content...'
                                )}
                            </Typography>
                        </AccordionContentWrapper>
                    </AccordionDetails>
                </StyledAccordion>
            </Box>
        </Box>
    );
};

export default LmsHistory;
