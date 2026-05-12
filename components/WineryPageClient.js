'use client';

import React, { useEffect, useState } from 'react';
import { Typography, Divider, Box, Card, CardContent, Avatar, Table, TableBody, TableCell, TableRow, Button } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import { styled } from '@mui/system';
import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api';
import useIsMobile from '@/hooks/useIsMobile';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';


const TitleTypography = styled(Typography)({
    color: '#7b1fa2',
    textAlign: 'center',
    marginBottom: '3px',
    fontFamily: "'Playfair Display', serif",
    fontWeight: 'bold',
});

const PageContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    height: 'auto',
    margin: '0',
    paddingTop: '2rem',
    backgroundColor: '#ffffff',
    boxSizing: 'border-box',
    marginTop: '20px',
    marginBottom: '40px',
    '@media (max-width: 768px)': {
        paddingTop: '1rem',
    },
});

const NameAddressContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    marginBottom: '3rem',
    marginTop: '1rem',
    '@media (max-width: 768px)': {
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: '0rem',
        marginTop: '0rem',
    },
});

const LogoContainer = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    marginRight: '0rem',
    marginLeft: '1.5rem',
    flexShrink: 0,
    '@media (max-width: 768px)': {
        marginBottom: '0rem',
        marginRight: '0',
        marginLeft: '0',
    },
});

const HoursMapContainer = styled(Box)({
    display: 'flex',
    justifyContent: 'center',
    width: '80%',
    marginBottom: '2rem',
    marginRight: '16px',
    gap: '10px',
    '@media (max-width: 768px)': {
        flexDirection: 'column',
        alignItems: 'center',
        gap: '20px',
        marginRight: '0',
        width: '98vw',
    },
});

const HoursContainer = styled(Box)({
    flex: '0 0 30%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'left',
    marginLeft: '0px',
    marginRight: '20px',
    '@media (max-width: 768px)': {
        marginRight: '0',
        width: '90%',
    },
});

const StyledTableRow = styled(TableRow)({
    '& > *': {
        padding: '2px 5px',
    },
    marginBottom: '0px',
});

const StyledTableCell = styled(TableCell)({
    padding: '15px 8px',
});

const ReviewsContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'row',
    overflowX: 'auto',
    overflowY: 'hidden',
    padding: '16px',
    width: '80%',
    marginTop: '3rem',
    marginBottom: '3rem',
    '&::-webkit-scrollbar': {
        display: 'none',
    },
    msOverflowStyle: 'none',
    scrollbarWidth: 'none',
    '@media (max-width: 768px)': {
        width: '100%',
    },
});

const ScrollableReviewCard = styled(Card)({
    minWidth: '300px',
    marginRight: '16px',
    borderRadius: '16px',
    '&::-webkit-scrollbar': {
        display: 'none',
    },
    msOverflowStyle: 'none',
    scrollbarWidth: 'none',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    maxHeight: '400px',
    overflowY: 'auto',
});

const IframeContainer = styled(Box)({
    width: '80%',
    height: '100%',
    marginBottom: '1rem',
    marginTop: '4rem',
    borderRadius: '25px',
    overflow: 'hidden',
    marginLeft: '20px',
    border: '12px solid rgba(217, 195, 222, 0.2)',
    '@media (max-width: 768px)': {
        width: '100%',
        marginLeft: '0',
    },
});

const MapContainerStyled = styled(Box)({
    flex: '0 0 62%',
    height: '415px',
    borderRadius: '8px',
    overflow: 'hidden',
    marginBottom: '1rem',
    marginRight: '0px',
    '@media (max-width: 768px)': {
        width: '100%',
        height: '300px',
        flex: '1',
        display: 'flex',
        justifyContent: 'center',
    },
});

const WineryTitle = styled(Box)({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    marginBottom: '0rem',
    marginTop: '16px',
    marginLeft: '0px',
    marginRight: '60px',
    '@media (max-width: 768px)': {
        flexDirection: 'column',
        alignItems: 'center',
        width: '98vw',
        marginLeft: '0',
        marginRight: '0',
    },
});

const WineryImage = styled('img')({
    width: '80px',
    height: 'auto',
    borderRadius: '4px',
});

const TitleText = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
    width: '100%',
    marginLeft: '30px',
    justifyContent: 'space-between',
    '@media (max-width: 768px)': {
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        marginLeft: '0px',
    },
});

const DescriptionContainer = styled(Box)({
    width: '80%',
    marginBottom: '2rem',
    padding: '2rem',
    borderRadius: '8px',
    backgroundColor: '#ffffff',
    '@media (max-width: 768px)': {
        width: '100%',
        padding: '1rem',
    },
});

const VisitWebsiteButton = styled(Button)({
    backgroundColor: '#f1e1f5',
    color: '#000000',
    '&:hover': {
        backgroundColor: '#7b1fa2',
        color: '#e0e0e0',
    },
    marginLeft: '1rem',
    borderRadius: '25px',
    textTransform: 'none',
    fontSize: '1.1rem',
    padding: '0.6rem 2.5rem',
    marginRight: '-16px',
    fontWeight: 'normal',
    '@media (max-width: 768px)': {
        marginTop: '0rem',
        marginLeft: '0',
        marginRight: '0',
        textTransform: 'none',
        fontSize: '.9rem',
        padding: '0.8rem',
    },
});

const PhoneContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    marginTop: '1rem',
    marginBottom: '1rem',
    width: '100%',
    gap: '16px',
    '@media (max-width: 768px)': {
        flexDirection: 'column',
        alignItems: 'center',
        width: '98vw',
        marginLeft: '0',
        marginRight: '0',
    },
});

const WineryPageClient = ({ winery, description }) => {

    const [openingHours, setOpeningHours] = useState(null);
    const [placeDetails, setPlaceDetails] = useState(null);
    const [iframeLoaded, setIframeLoaded] = useState(true);
    const [googleApiKey, setGoogleApiKey] = useState('');
    const isMobile = useIsMobile();
    const iframeHeight = isMobile ? "600px" : "900px";

    // Fetch the Google API key from the serverless function
    useEffect(() => {
        fetch('/api/googleApiKey')
            .then(response => response.json())
            .then(data => setGoogleApiKey(data.key))
            .catch(error => console.error('Error fetching Google API key:', error));
    }, []);

    // Fetch place details once the winery and Google API key are available
    useEffect(() => {
        setOpeningHours(null);

        if (winery && googleApiKey) {
            console.log('Winery found:', winery);
            if (winery.place_id) {
                console.log('Fetching place details for Place ID:', winery.place_id);
                fetch(`https://places.googleapis.com/v1/places/${winery.place_id}?fields=id,displayName,current_opening_hours,reviews,international_phone_number&key=${googleApiKey}`)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(`HTTP error! status: ${response.status}`);
                        }
                        return response.json();
                    })
                    .then(data => {
                        console.log('Place details API response:', data);
                        setPlaceDetails(data);
                        if (data.currentOpeningHours && data.currentOpeningHours.weekdayDescriptions) {
                            setOpeningHours(data.currentOpeningHours.weekdayDescriptions);
                        } else {
                            console.error('No current opening hours found in API response:', data);
                        }
                    })
                    .catch(error => console.error('Error fetching place details:', error));
            } else {
                console.error('Place ID is missing for winery:', winery.name);
            }
        } else if (!winery) {
            console.error('Winery not found');
        }
    }, [winery, googleApiKey]);

    const handleIframeError = () => {
        setIframeLoaded(false);
    };

    if (!winery) {
        return (
            <PageContainer>
                <Typography variant="h6" color="error">Winery not found</Typography>
            </PageContainer>
        );
    }

    return (
        <PageContainer>
            <NameAddressContainer>
                <LogoContainer>
                    <WineryImage src={winery.image} alt={winery.name} />
                </LogoContainer>
                <WineryTitle>
                    <TitleText>
                        <Typography variant="h1" gutterBottom>{winery.name}</Typography>
                    </TitleText>

                    {/* Display phone number if available */}
                    <PhoneContainer>
                        {winery.website && (
                            <VisitWebsiteButton
                                href={winery.website}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Visit Website
                            </VisitWebsiteButton>
                        )}
                        {placeDetails?.internationalPhoneNumber && (
                            <Box display="flex" alignItems="center">
                                <PhoneIcon color="disabled" />
                                <Typography variant="body1" color="textSecondary" align="right">
                                    {placeDetails.internationalPhoneNumber}
                                </Typography>
                            </Box>
                        )}
                    </PhoneContainer>
                </WineryTitle>
            </NameAddressContainer>

            <HoursMapContainer>
                <MapContainerStyled>
                    {googleApiKey && (
                        <LoadScript googleMapsApiKey={googleApiKey}>
                            <GoogleMap
                                mapContainerStyle={{
                                    width: '90%',
                                    height: '100%',
                                    borderRadius: '8px',
                                    margin: '0',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                                center={{ lat: winery.position[0], lng: winery.position[1] }}
                                zoom={14}
                            >
                                <Marker position={{ lat: winery.position[0], lng: winery.position[1] }} />
                            </GoogleMap>
                        </LoadScript>
                    )}
                </MapContainerStyled>

                <HoursContainer>
                    {openingHours ? (
                        <>
                            <TitleTypography variant="h3" gutterBottom>Opening Hours</TitleTypography>
                            <Table>
                                <TableBody>
                                    {openingHours.map((desc, index) => {
                                        const [day, hours] = desc.split(': ');
                                        return (
                                            <StyledTableRow key={index}>
                                                <StyledTableCell align="left">{day}</StyledTableCell>
                                                <StyledTableCell align="right">{hours}</StyledTableCell>
                                            </StyledTableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </>
                    ) : (
                        <Typography variant="h6" color="#808080">Oops! Looks like {winery.name} does not list opening hours on Google. Try reaching out via their website or phone number above. </Typography>
                    )}
                </HoursContainer>
            </HoursMapContainer>

            <TitleTypography variant="h2" gutterBottom>Description</TitleTypography>
            {description && (
                <DescriptionContainer>
                    <ReactMarkdown
                        className="markdown-content"
                        remarkPlugins={[remarkGfm, remarkBreaks]}
                        components={{
                            p: ({ children }) => <Typography variant="body1" align="left" paragraph>{children}</Typography>,
                            a: ({ href, children }) => (
                                <a href={href} target="_blank" rel="noopener noreferrer">
                                    {children}
                                </a>
                            ),
                        }}
                    >
                        {description}
                    </ReactMarkdown>
                </DescriptionContainer>
            )}
            <Divider />
            <TitleTypography variant="h2" gutterBottom>Reviews</TitleTypography>
            <ReviewsContainer>
                {placeDetails?.reviews?.map((review, index) => (
                    <ScrollableReviewCard key={index}>
                        <CardContent>
                            <Box display="flex" alignItems="center" marginBottom="8px">
                                {review.authorAttribution?.photoUri && (
                                    <Avatar src={review.authorAttribution.photoUri} alt={review.authorAttribution.displayName || 'Anonymous'} />
                                )}
                                <Box marginLeft="8px">
                                    <Typography variant="subtitle1">{review.authorAttribution?.displayName || 'Anonymous'}</Typography>
                                    <Typography variant="caption">{review.relativePublishTimeDescription}</Typography>
                                </Box>
                            </Box>
                            <Typography variant="body2" gutterBottom>{review.text?.text || 'No review text available'}</Typography>
                            <Typography variant="body2" color="textSecondary">Rating: {review.rating || 'No rating available'}</Typography>
                        </CardContent>
                    </ScrollableReviewCard>
                ))}
            </ReviewsContainer>

            {iframeLoaded && winery.wines_url && (
                <>
                    <TitleTypography variant="h2" gutterBottom>Website Preview</TitleTypography>
                    <IframeContainer>
                        <iframe
                            src={winery.wines_url}
                            title={`${winery.name} website preview`}
                            width="100%"
                            height={iframeHeight}
                            style={{ border: 'none', borderRadius: '16px' }}
                            onError={handleIframeError}
                        />
                    </IframeContainer>
                </>
            )}
        </PageContainer>
    );
};

export default WineryPageClient;
