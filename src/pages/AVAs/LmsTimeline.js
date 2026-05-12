import React from 'react';
import { styled } from '@mui/system';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useMediaQuery } from '@mui/material';
import { isMobileDevice } from '../../utils/detectDevice';

const defaultDotSize = '15px';
const defaultDotColor = '#D4B9DB'; 

const CustomDot = styled(TimelineDot)(({ url, size, color }) => ({
    backgroundImage: url ? `url(${url})` : 'none',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: size || defaultDotSize,
    height: size || defaultDotSize,
    backgroundColor: url ? 'rgba(0, 0, 0, 0)' : color || defaultDotColor,
    border: url ? 'none' : '10px', 
    borderColor: '#ffffff',
    boxShadow: 'none',
}));

const CustomConnector = styled(TimelineConnector)(({ color }) => ({
    backgroundColor: color || 'rgba(0, 0, 0, 0.5)',
    height: '20px', 
}));

const StyledPaper = styled(Paper)(({ isMobile }) => ({
    padding: isMobile ? '12px' : '16px',
    borderRadius: '16px',
    width: isMobile ? '280px' : '330px', 
    boxShadow: '0px 2px 2px rgba(0, 0, 0, 0)',
    fontFamily: "'Montserrat', sans-serif",
}));

export default function CustomizedTimeline() {
    const isMobile = useMediaQuery('(max-width:768px)') || isMobileDevice();

    return (
        <Timeline align={isMobile ? 'left' : 'alternate'} sx={{ width: isMobile ? '100%' : 'auto', padding: isMobile ? '0' : 'inherit' }}>
            {[
                { year: '1868', title: 'Vineyards in Lawton', description: 'A.B. Jones plants vineyards in Lawton, attracting Welch’s to the region during Prohibition and marking a pivotal milestone for the industry.' },
                { year: 'Late 1800s', title: 'Third in Production', description: 'Michigan ranks third in wine production behind California and New York.' },
                { year: '1918', title: 'Alcohol Ban', description: 'Michigan enacts a ban on alcohol, ceasing the legal wine industry.' },
                { year: '1920', title: 'Prohibition', description: 'National Prohibition bans alcohol across the United States.' },
                { year: '1933', title: 'Repeal of Prohibition', description: 'Michigan is the first state to ratify the repeal, allowing wineries to reopen.' },
                { year: '1934', title: 'St. Julian Winery', description: 'Meconi Wine Co moves to Paw Paw, becoming St. Julian Winery, now Michigan’s oldest continuously operating winery.' },
                { year: '1938', title: 'Michigan Wine Institute', description: 'Michigan Wine Institute is established to support the wine industry.' },
                { year: '1940s', title: 'Wine Industry Moves West', description: 'A strong wine industry emerges in Southwest Michigan, with most wineries relocating near Lake Michigan vineyards. Consumers begin to shift towards dry wines.' },
                { year: '1950', title: 'Licensing Fee Eliminated', description: 'Michigan eliminates a $5,000 licensing fee, boosting wine production by enabling sales in grocery stores.' },
                { year: '1962', title: 'First Dry Wine', description: 'Bronte Champagne and Wine Co. produces Michigan’s first dry wine with Baco Noir, a French-American hybrid grape, in Hartford.' },
                { year: '1981', title: 'Fennville AVA & Bob Hope', description: 'Fennville becomes an American Viticultural Area. Bob Hope orders 80 cases of Tabor Hill’s Vidal Blanc demi-sec for his 80th birthday.' },
                { year: '1983', title: 'Lake Michigan Shore AVA', description: 'Lake Michigan Shore becomes an American Viticultural Area.' },
                { year: '1985', title: 'Michigan Wine Council', description: 'The Michigan Grape and Wine Industry Council is established, later becoming the Michigan Craft Beverage Council.' },
                { year: '1990s', title: 'Wineries Expansion', description: 'Thirteen new wineries open across Michigan.' },
                { year: '2000s', title: 'New Varieties and Styles', description: 'Numerous new wineries open, exploring diverse varieties, styles, and viticulture practices.' },
            ].map((event, index) => (
                <TimelineItem key={index}>
                    {!isMobile && (
                        <TimelineOppositeContent variant="body1" color="textSecondary" sx={{ margin: 'auto 0' }}>
                            {event.year}
                        </TimelineOppositeContent>
                    )}
                    <TimelineSeparator>
                        <CustomConnector />
                        <CustomDot />
                        <CustomConnector />
                    </TimelineSeparator>
                    <TimelineContent>
                        <StyledPaper isMobile={isMobile}>
                            <Typography variant="h6" component="h1">
                                {event.title}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                {event.description}
                            </Typography>
                        </StyledPaper>
                    </TimelineContent>
                </TimelineItem>
            ))}
        </Timeline>
    );
}
