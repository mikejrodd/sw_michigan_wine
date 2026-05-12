import React from 'react';
import { Typography, Box, Grid, Link, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/system';
import lmsContent from './lms_content.json';

const StyledAccordion = styled(Accordion)({
    width: '100%',
    borderRadius: '16px', // Apply border radius to the entire accordion
    backgroundColor: 'transparent', // Ensure background remains transparent
    overflow: 'hidden',
    marginTop: '30px',
    boxShadow: 'none',
    '& .MuiAccordionSummary-root': {
        borderRadius: '16px', // Rounded corners for the summary
        backgroundColor: '#fff',
        height: '100px',
        '&.Mui-expanded': {
            borderRadius: '16px', // Maintain border radius when expanded
        },
    },
    '& .MuiAccordionDetails-root': {
        padding: 0,
        backgroundColor: '#ffffff', // Set the content window background to white
        borderRadius: '16px',
    },
});

const AccordionContentWrapper = styled(Box)({
    padding: '0px',
    backgroundColor: '#ffffff', // Set the content window background to white
    overflowY: 'auto', // Enable scrolling for long content
    overflowX: 'hidden', // Disable horizontal scrolling
    maxHeight: { xs: '300px', md: '650px' }, // Adjust max height for better mobile experience
    marginTop: '0px',
});

const LmsGrowingConditions = () => {
    const paragraphs = lmsContent.growing_conditions.split('\n\n');

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <Box sx={{ width: '96%', lineHeight: 1 }}>
                {paragraphs.map((paragraph, index) => (
                    <Typography key={index} paragraph variant="body1" lineHeight={1.5}>
                        {paragraph}
                    </Typography>
                ))}
                <Box sx={{ mt: { xs: 2, md: 4 }, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Grid container spacing={2} sx={{ width: '100%', height: 'auto' }}>
                        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Box component="img" src="/assets/content/conditions.png" alt="Conditions" 
                                 sx={{ 
                                     width: { xs: '100%', md: '102%' }, 
                                     height: 'auto', 
                                     maxWidth: '1100px', 
                                     maxHeight: '700px' 
                                 }} 
                            />
                        </Grid>
                    </Grid>
                </Box>
                <Box sx={{ textAlign: 'center', mt: 2, color: 'grey', marginBottom: '30px' }}>
                    <Link
                        href="https://www.mdpi.com/2073-4433/11/4/339"
                        target="_blank"
                        rel="noopener"
                        variant="body3"
                        sx={{ color: 'grey', textDecoration: 'none', fontSize: { xs: '12px', md: '14px' } }}
                    >
                        Graph reproduced from 'Modeling Land Suitability for Vitis vinifera in Michigan Using Advanced Geospatial Data and Methods' by Wanyama D, Bunting EL, Goodwin R, Weil N, Sabbatini P, Andresen JA, © 2020 by the authors. Licensed under CC. https://www.mdpi.com/2073-4433/11/4/339
                    </Link>
                </Box>
                <StyledAccordion defaultExpanded={window.innerWidth > 600}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        sx={{
                            justifyContent: 'center',
                            padding: { xs: '8px 16px', md: '16px 32px' }, // Adjust padding for touch targets on mobile
                        }}
                    >
                        <Typography variant="h6" align="center" sx={{ fontSize: { xs: '16px', md: '24px' } }}>
                            Graph Explanation
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <AccordionContentWrapper>
                            <Typography variant="body1">
                                The right graph displays spatial patterns of six climate-based variables essential for viticulture. These variables significantly influence grapevine growth and fruit quality. The mean accumulated growing degree days from April to October measure the heat accumulation necessary for vine development and fruit ripening. Higher GDD values generally indicate more favorable conditions for producing ripe, flavorful grapes. Conversely, the mean frequency of cold days less than or equal to -20 °C each year highlights areas prone to extreme cold, which can damage vines and impact bud survival, crucial for next season's growth. The mean number of frost-free days between the last spring frost and the first fall frost represents the length of the growing season. A longer frost-free period allows for a more extended growth phase, enabling grapes to mature fully and develop complex flavors.
                                <br /><br />
                                Mean spring temperature plays a vital role as it affects bud break and early vine growth. Warmer spring temperatures can lead to earlier bud break, extending the growing season, but they also increase the risk of frost damage if temperatures drop unexpectedly. Mean accumulated precipitation during the key grape growth period ensures that vines receive adequate water to support healthy growth and fruit development. However, too much precipitation can lead to excessive vegetative growth at the expense of fruit quality. Finally, the mean amount of precipitation during the critical period before harvest is crucial as grapes are particularly vulnerable to rot during this time. Excessive rain can lead to berry splitting and increased susceptibility to fungal diseases, which can severely impact the harvest's quality and yield. Understanding and managing these climate variables is fundamental to successful viticulture, influencing decisions on site selection, grape variety, and vineyard management practices.
                            </Typography>
                        </AccordionContentWrapper>
                    </AccordionDetails>
                </StyledAccordion>
            </Box>
        </Box>
    );
};

export default LmsGrowingConditions;
