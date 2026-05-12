import React from 'react';
import { Typography, Box, Link, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/system';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import fennvilleContent from './fennville_content.json';

Chart.register(...registerables);

const StyledAccordion = styled(Accordion)({
    width: '100%',
    borderRadius: '16px',
    backgroundColor: 'transparent',
    overflow: 'hidden',
    marginTop: '15px',
    boxShadow: 'none',
    '& .MuiAccordionSummary-root': {
        borderRadius: '16px',
        backgroundColor: '#fff', 
        height: '100px',
        display: 'flex',
        justifyContent: 'flex-start', // Align content to the left
        padding: '0 0', 
        marginBottom: '30px',
        '&.Mui-expanded': {
            borderRadius: '16px',
        },
    },
    '& .MuiAccordionDetails-root': {
        padding: 0,
        backgroundColor: '#ffffff',
        borderRadius: '16px',
    },
    '& .MuiTypography-root': {
        textAlign: 'left', // Align text to the left
    },
    '@media (max-width:600px)': {
        '& .MuiAccordionSummary-root': {
            height: '70px',
            marginBottom: '20px',
            padding: '0 10px',
        },
    },
});

const AccordionContentWrapper = styled(Box)({
    padding: '0px',
    backgroundColor: '#ffffff',
    overflowY: 'auto',
    overflowX: 'hidden',
    maxHeight: '1800px',
    marginTop: '0px',
});

const determineBestBars = () => {
    const categories = [
        'Depth to Bedrock', 'CCAP LULC', 'Soil Drainage', 'Frequency of Cold Days',
        'Frost Free Days', 'GDD for Red Vinifera', 'GDD for White Vinifera', 'Soil pH',
        'Precipitation for Growth', 'Precipitation-Rot', 'Depth of Rooting Zone',
        'Spring Temperatures', 'Aspect', 'Slope'
    ];
    const datasets = [
        [10, 6.92, 6.29, 10, 7.59, 10, 8, 7.16, 6.64, 3.68, 9.78, 6, 2.72, 4.97], // Allegan
        [10, 7.22, 5.41, 10, 8.82, 10, 8, 7.62, 3.64, 5.27, 9.58, 6, 1.67, 4.85], // Berrien
        [10, 6.93, 6.22, 10, 7.43, 10, 8, 6.09, 4.98, 5.36, 9.72, 6, 2.35, 5.04]  // Van Buren
    ];

    // Define whether a higher or lower value is better for each category
    const higherIsBetter = [
        true, false, true, true, true, true, true, false, true, false, true, true, false, true
    ];

    // Determine the best bar index for each category
    const bestBars = categories.map((_, i) => {
        const values = datasets.map(dataset => dataset[i]);
        const bestValue = higherIsBetter[i] ? Math.max(...values) : Math.min(...values);

        // Check for ties and prioritize Allegan if there's a tie
        const bestIndexes = values.reduce((acc, value, idx) => {
            if (value === bestValue) acc.push(idx);
            return acc;
        }, []);

        return bestIndexes.length > 1 ? 0 : bestIndexes[0]; // Prioritize Allegan in case of a tie
    });

    return bestBars;
};

const bestBars = determineBestBars();

const data = {
    labels: [
        'Depth to Bedrock', 'CCAP LULC', 'Soil Drainage', 'Frequency of Cold Days',
        'Frost Free Days', 'GDD for Red Vinifera', 'GDD for White Vinifera', 'Soil pH',
        'Precipitation for Growth', 'Precipitation-Rot', 'Depth of Rooting Zone',
        'Spring Temperatures', 'Aspect', 'Slope'
    ],
    datasets: [
        {
            label: 'Allegan',
            data: [10, 6.92, 6.29, 10, 7.59, 10, 8, 7.16, 6.64, 3.68, 9.78, 6, 2.72, 4.97],
            backgroundColor: bestBars.map((best, i) => best === 0 ? 'rgba(212, 185, 219, 1)' : 'rgba(212, 185, 219, 0.1)'),
            borderRadius: 6, 
        },
        {
            label: 'Berrien',
            data: [10, 7.22, 5.41, 10, 8.82, 10, 8, 7.62, 3.64, 5.27, 9.58, 6, 1.67, 4.85],
            backgroundColor: bestBars.map((best, i) => best === 1 ? 'rgba(137, 192, 245,1)' : 'rgba(137, 192, 245,0.1)'),
            borderRadius: 6, 
        },
        {
            label: 'Van Buren',
            data: [10, 6.93, 6.22, 10, 7.43, 10, 8, 6.09, 4.98, 5.36, 9.72, 6, 2.35, 5.04],
            backgroundColor: bestBars.map((best, i) => best === 2 ? 'rgba(255, 229, 153,1)' : 'rgba(255, 229, 153,0.1)'),
            borderRadius: 6, 
        },
    ],
};

const options = {
    responsive: true,
    maintainAspectRatio: window.innerWidth <= 600 ? false : false,
    height: '100%',
    plugins: {
        legend: {
            position: 'top',
            labels: {
                font: {
                    size: 12, // Increase legend text size
                },
            },
        },
        title: {
            display: true,
            text: 'Comparison of Growing Conditions for Allegan, Berrien, and Van Buren Counties',
            font: {
                size: 18, // Increase title text size
            },
        },
        tooltip: {
            enabled: true,
            bodyFont: {
                size: 14, // Increase tooltip text size
            },
        },
        datalabels: {
            display: false,  // Ensure that data labels are not displayed on the bars
        },
    },
    scales: {
        x: {
            ticks: {
                maxRotation: window.innerWidth <= 600 ? 60 : 60,  // Rotate labels by 45 degrees
                minRotation: 45,  // Keep the rotation consistent
                font: {
                    size: window.innerWidth <= 600 ? 10 : 14,
                },
            },
            grid: {
                display: false,  // Remove the horizontal grid lines
            },
        },
        y: {
            beginAtZero: true,
            grace: '10%',  // 10% padding at the top
            grid: {
                display: false,  // Remove the horizontal grid lines
            },
            ticks: {
                font: {
                    size: 14, // Increase y-axis labels text size
                },
            },
        },
    },
};

const FennvilleGrowingConditions = () => {
    const paragraphs = fennvilleContent.growing_conditions.split('\n\n');

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <Box sx={{ 
                width: '95%', 
                lineHeight: 1, 
                maxWidth: '1800px',
                '@media (max-width:600px)': {
                    width: '95%',
                    maxWidth: '100%',
                },
            }}>
                {paragraphs.slice(0, -1).map((paragraph, index) => (
                    <Typography key={index} paragraph variant="body1" lineHeight={1.5}>
                        {paragraph}
                    </Typography>
                ))}

                <Box sx={{ 
                    mt: 4, 
                    display: 'flex', 
                    justifyContent: 'center center', 
                    alignItems: 'center', 
                    marginTop: '60px', 
                    marginLeft: '0px', 
                    maxWidth: '100%',
                    minHeight: '500px',
                    '@media (max-width:600px)': {
                        marginLeft: '0',
                        width: '100%',
                        marginTop: '30px',
                        height: '600px',
                    },
                }}>
                    <Bar data={data} options={options} sx={{minHeight: '80%'}} />
                </Box>

                <Box sx={{ 
                    textAlign: 'center', 
                    mt: 1, 
                    color: 'grey', 
                    marginBottom: '70px', 
                    marginTop: '40px',
                    '@media (max-width:600px)': {
                        marginBottom: '40px',
                        marginTop: '20px',
                    },
                }}>
                    <Link
                        href="https://www.mdpi.com/2073-4433/11/4/339"
                        target="_blank"
                        rel="noopener"
                        variant="body3"
                        sx={{ color: 'grey', textDecoration: 'none' }}
                    >
                        Graph produced by fincuva with data from 'Modeling Land Suitability for Vitis vinifera in Michigan Using Advanced Geospatial Data and Methods' by Wanyama D, Bunting EL, Goodwin R, Weil N, Sabbatini P, Andresen JA, © 2020 by the authors. Licensed under CC. https://www.mdpi.com/2073-4433/11/4/339
                    </Link>
                </Box>

                <Typography paragraph variant="body1" lineHeight={1.5}>
                    {paragraphs[paragraphs.length - 1]}
                </Typography>

                <StyledAccordion defaultExpanded={window.innerWidth > 600}>

                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography variant="h6" align="center">
                            Graph Explanation
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <AccordionContentWrapper>
                            <Typography variant="body1">
                                <strong>Depth to Bedrock:</strong> A deeper bedrock provides a stable foundation for vine roots, allowing for deep rooting and access to essential nutrients and water during dry periods, which is beneficial for vine health and fruit quality.
                                <br /><br />
                                <strong>CCAP LULC:</strong> The land use and land cover (LULC) characteristics affect the microclimate. Natural vegetation can moderate temperature extremes, and lower LULC values in Fennville indicate less human disturbance, leading to a more natural vineyard environment.
                                <br /><br />
                                <strong>Soil Drainage:</strong> Well-drained soils prevent waterlogging, crucial for grapevines as it helps avoid root diseases and promotes healthy root development. The higher soil drainage value in Allegan makes it ideal for grape cultivation, ensuring vines are not stressed by excess water.
                                <br /><br />
                                <strong>Frequency of Cold Days:</strong> This variable indicates the likelihood of extreme cold events. Fennville’s proximity to Lake Michigan helps mitigate these extremes, providing a more stable growing environment with fewer damaging cold days.
                                <br /><br />
                                <strong>Frost Free Days:</strong> A longer frost-free season allows for a more extended growing period, enabling grapes to ripen fully, which is essential for producing high-quality wines. Allegan’s balance of frost-free days supports both early and late-ripening varieties.
                                <br /><br />
                                <strong>GDD for Red Vinifera & White Vinifera:</strong> Growing Degree Days (GDD) measure the accumulation of heat necessary for grape development. Higher GDDs suggest a better environment for ripening grapes, which is crucial for both red and white varieties. Allegan and neighboring counties have ideal GDDs for both types, supporting a wide variety of grapes.
                                <br /><br />
                                <strong>Soil pH:</strong> Soil pH influences nutrient availability and vine health. Fennville’s slightly acidic soils (reflected in Allegan's values) are ideal for viticulture, promoting strong vine growth and fruit quality by making essential nutrients available to the vines.
                                <br /><br />
                                <strong>Precipitation for Growth:</strong> Adequate precipitation during the growing season is vital for vine health, but excessive rain can lead to diseases. Allegan’s balanced precipitation levels support healthy grape development without excessive water stress.
                                <br /><br />
                                <strong>Precipitation-Rot:</strong> Precipitation close to harvest can cause rot, impacting fruit quality. Fennville’s moderate late-season rainfall reduces the risk of rot, ensuring higher quality grapes, as reflected in Allegan’s lower precipitation-rot values.
                                <br /><br />
                                <strong>Depth of Rooting Zone:</strong> A deeper rooting zone allows vines to access more water and nutrients, supporting consistent growth even in drier conditions. Allegan’s deep rooting zone is beneficial for maintaining vine health and productivity.
                                <br /><br />
                                <strong>Spring Temperatures:</strong> Warmer spring temperatures promote early bud break but increase the risk of frost damage. Fennville’s moderated spring temperatures help reduce this risk, allowing for a balance between early growth and frost protection.
                                <br /><br />
                                <strong>Aspect:</strong> The slope and orientation of the land influence sun exposure, which is critical for grape ripening. Allegan's moderate aspect values indicate that vineyards in Fennville benefit from optimal sun exposure throughout the growing season.
                                <br /><br />
                                <strong>Slope:</strong> Slope affects drainage and sun exposure. The gentle slopes of Fennville provide ideal conditions for viticulture, ensuring good drainage and optimal sun exposure, which is crucial for producing high-quality wine grapes.
                            </Typography>
                        </AccordionContentWrapper>
                    </AccordionDetails>
                </StyledAccordion>
            </Box>
        </Box>
    );
};

export default FennvilleGrowingConditions;
