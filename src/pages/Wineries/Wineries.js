import React, { useEffect, useState } from 'react';
import { Helmet } from "react-helmet-async";
import { useParams } from 'react-router-dom';
import { Typography, Divider, Box, Card, CardContent, Avatar, Table, TableBody, TableCell, TableRow, Button } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone'; // Import the PhoneIcon from MUI
import { styled } from '@mui/system';
import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api';
import wineryData from '../../data/wineryData.json';
import { useDrawer } from '../../context/DrawerContext';
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

const PageContainer = styled(Box)(({ drawerOpen }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    maxWidth: `calc(100vw - ${drawerOpen ? 340 : 340}px)`, // Dynamically calculate width
    height: 'auto',
    margin: '0',
    paddingTop: '2rem',
    marginLeft: drawerOpen ? '340px' : '170px', // Adjust padding to account for the drawer
    backgroundColor: '#ffffff',
    boxSizing: 'border-box',
    marginTop: '20px',
    marginBottom: '40px',
    '@media (max-width: 768px)': {
        marginLeft: '0', // Reset margin for mobile
        paddingLeft: '0rem',
        paddingRight: '0rem',
        maxWidth: '98vw',
        paddingTop: '1rem',
    },
}));

const NameAddressContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    marginBottom: '3rem',
    marginTop: '1rem',
    '@media (max-width: 768px)': {
        flexDirection: 'column', // Stack vertically on mobile
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
        marginBottom: '0rem', // Add space on mobile
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
        flexDirection: 'column', // Stack vertically on mobile
        alignItems: 'center',
        gap: '20px', // Increase gap between elements on mobile
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
        width: '90%', // Full width on mobile
    },
});

const StyledTableRow = styled(TableRow)({
    '& > *': {
        padding: '2px 5px',  // Adjust the padding as needed
    },
    marginBottom: '0px',  // Adjust the margin as needed
});

const StyledTableCell = styled(TableCell)({
    padding: '15px 8px',  // Adjust the padding as needed
});

const ReviewsContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'row',
    overflowX: 'auto',
    overflowY: 'hidden',
    padding: '16px',
    width: '80%',
    marginTop: '3rem',
    marginBottom: '3rem',  // Increased space between sections
    '&::-webkit-scrollbar': {
        display: 'none',
    },
    '-ms-overflow-style': 'none',  // IE and Edge
    'scrollbar-width': 'none',     // Firefox
    '@media (max-width: 768px)': {
        width: '100%', // Full width on mobile
    },
});

const ScrollableReviewCard = styled(Card)({
    minWidth: '300px',
    marginRight: '16px',
    borderRadius: '16px',
    '&::-webkit-scrollbar': {
        display: 'none',
    },
    '-ms-overflow-style': 'none',  // IE and Edge
    'scrollbar-width': 'none',     // Firefox
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    maxHeight: '400px', // You can adjust or remove this
    overflowY: 'auto',
});

const IframeContainer = styled(Box)({
    width: '80%',  // Full width
    height: '100%',  // Auto height to fit content
    marginBottom: '1rem',
    marginTop: '4rem',
    borderRadius: '25px',
    overflow: 'hidden',
    marginLeft: '20px',
    border: '12px solid rgba(217, 195, 222, 0.2)',  // Added translucent border color
    '@media (max-width: 768px)': {
        width: '100%', // Full width on mobile
        marginLeft: '0', // Remove left margin on mobile
    },
});

const MapContainer = styled(Box)({
    flex: '0 0 62%',
    height: '415px',
    borderRadius: '8px',
    overflow: 'hidden',
    marginBottom: '1rem',
    marginRight: '0px',  // Added margin on the right of the map
    '@media (max-width: 768px)': {
        width: '100%', // Keep it full width
        height: '300px', 
        flex: '1',
        display: 'flex', // Ensure content alignment
        justifyContent: 'center', // Centers the map
    },
});

const WineryTitle = styled(Box)({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',  // Make title take full width
    marginBottom: '0rem',
    marginTop: '16px',
    marginLeft: '0px',
    marginRight: '60px',
    '@media (max-width: 768px)': {
        flexDirection: 'column', // Stack title vertically on mobile
        alignItems: 'center',
        width: '98vw',
        marginLeft: '0',
        marginRight: '0',
    },
});

const WineryImage = styled('img')({
    width: '80px',
    height: 'auto',  // Maintain aspect ratio of the image
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
        flexDirection: 'column', // Stack text and button vertically on mobile
        alignItems: 'center',
        width: '100%',
        marginLeft: '0px',
    },
});

const DescriptionContainer = styled(Box)({
    width: '80%',
    marginBottom: '2rem', // Space before reviews
    padding: '2rem',
    borderRadius: '8px',
    backgroundColor: '#ffffff', // White background for the description
    '@media (max-width: 768px)': {
        width: '100%', // Full width on mobile
        padding: '1rem', // Adjust padding on mobile
    },
});

const VisitWebsiteButton = styled(Button)({
    backgroundColor: '#f1e1f5',
    color: '#000000', // Very light grey text
    '&:hover': {
        backgroundColor: '#7b1fa2',
        color: '#e0e0e0', // Dark text on hover
    },
    marginLeft: '1rem',
    borderRadius: '25px', // Adjust this value for desired border radius
    textTransform: 'none', // Remove all-caps styling
    fontSize: '1.1rem', // Adjust this value for desired font size
    padding: '0.6rem 2.5rem', 
    marginRight: '-16px',
    fontWeight: 'normal',
    '@media (max-width: 768px)': {
        marginTop: '0rem', // Add top margin on mobile
        marginLeft: '0', 
        marginRight: '0',
        textTransform: 'none', // Remove all-caps styling
        fontSize: '.9rem', // Adjust this value for desired font size
        padding: '0.8rem', 
    },
});

const PhoneContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'column', // Stack button above phone number
    alignItems: 'flex-end',  // Align to the right
    marginTop: '1rem',
    marginBottom: '1rem',
    width: '100%',
    gap: '16px',
    '@media (max-width: 768px)': {
        flexDirection: 'column', // Stack title vertically on mobile
        alignItems: 'center',
        width: '98vw',
        marginLeft: '0',
        marginRight: '0',
    },
});

const Wineries = () => {
    const { id } = useParams();
    const { drawerOpen } = useDrawer();
    const winery = wineryData.find(w => w.name.toLowerCase().replace(/ /g, '-') === id);
    const [openingHours, setOpeningHours] = useState(null);
    const [placeDetails, setPlaceDetails] = useState(null);
    const [iframeLoaded, setIframeLoaded] = useState(true);
    const [googleApiKey, setGoogleApiKey] = useState('');
    const [description, setDescription] = useState("");

    // Fetch the Google API key from the serverless function
    useEffect(() => {
        fetch('/api/googleApiKey')
            .then(response => response.json())
            .then(data => setGoogleApiKey(data.key))
            .catch(error => console.error('Error fetching Google API key:', error));
    }, []);

    useEffect(() => {
        if (winery?.description) {
            // Check if description is a path to an MD file
            if (winery.description.endsWith('.md')) {
                fetch(winery.description)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(`Markdown file not found: ${winery.description}`);
                        }
                        return response.text();
                    })
                    .then(text => setDescription(text))
                    .catch(error => {
                        console.error("Error loading Markdown:", error);
                        setDescription(winery.description); // Fallback to JSON description
                    });
            } else {
                setDescription(winery.description); // Use JSON description if no MD file
            }
        }
    }, [winery]);
    
    
    
    

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
            console.error('Winery not found for ID:', id);
        }
    }, [id, winery, googleApiKey]); // Added googleApiKey as a dependency

    const handleIframeError = () => {
        setIframeLoaded(false);
    };

    // Determine mobile friendly iframe height
    const isMobile = window.innerWidth <= 768;
    const iframeHeight = isMobile ? "600px" : "900px";

    if (!winery) {
        return (
            <PageContainer>
                <Typography variant="h6" color="error">Winery not found</Typography>
            </PageContainer>
        );
    }

    return (
        <>
            <Helmet>
                <title>{`${winery.name} | Lake Michigan Shore Wineries`}</title>
                <link rel="canonical" href={`https://www.lakemichiganshore.wine/wineries/${id}`} />
                <meta name="description" content={`Visit ${winery.name} in ${winery.address}. Explore wines, hours, and plan your trip to this ${winery.ava} AVA winery in Southwest Michigan.`} />
                <meta property="og:type" content="website" />
                <meta property="og:title" content={`${winery.name} | Lake Michigan Shore Wineries`} />
                <meta property="og:description" content={`Visit ${winery.name} in ${winery.ava} AVA, Southwest Michigan. Explore wines, tasting room hours, and plan your visit.`} />
                <meta property="og:url" content={`https://www.lakemichiganshore.wine/wineries/${id}`} />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={`${winery.name} | Lake Michigan Shore Wineries`} />
                <meta name="twitter:description" content={`Visit ${winery.name} in ${winery.ava} AVA, Southwest Michigan.`} />
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Winery",
                        "name": winery.name,
                        "url": winery.website,
                        "telephone": winery.phone || undefined,
                        "address": {
                            "@type": "PostalAddress",
                            "streetAddress": winery.address,
                            "addressRegion": "MI",
                            "addressCountry": "US"
                        },
                        "geo": {
                            "@type": "GeoCoordinates",
                            "latitude": winery.position[0],
                            "longitude": winery.position[1]
                        },
                        "image": winery.image ? `https://www.lakemichiganshore.wine${winery.image}` : undefined,
                        "sameAs": winery.website
                    })}
                </script>
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "BreadcrumbList",
                        "itemListElement": [
                            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.lakemichiganshore.wine/" },
                            { "@type": "ListItem", "position": 2, "name": "Wineries", "item": "https://www.lakemichiganshore.wine/" },
                            { "@type": "ListItem", "position": 3, "name": winery.name, "item": `https://www.lakemichiganshore.wine/wineries/${id}` }
                        ]
                    })}
                </script>
            </Helmet>
    
            <PageContainer drawerOpen={drawerOpen}>
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
                    <MapContainer>
                        {googleApiKey && (
                            <LoadScript googleMapsApiKey={googleApiKey}>
                                <GoogleMap
                                    mapContainerStyle={{
                                        width: '90%',
                                        height: '100%',
                                        borderRadius: '8px',
                                        margin: '0',  // Centers the map within the container
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
                    </MapContainer>
    
                    <HoursContainer>
                        {openingHours ? (
                            <>
                                <TitleTypography variant="h3" gutterBottom>Opening Hours</TitleTypography>
                                <Table>
                                    <TableBody>
                                        {openingHours.map((description, index) => {
                                            const [day, hours] = description.split(': ');
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
                                width="100%"
                                height={iframeHeight}  // Mobile-friendly height applied here
                                style={{ border: 'none', borderRadius: '16px' }}
                                onError={handleIframeError}
                            />
                        </IframeContainer>
                    </>
                )}
            </PageContainer>
        </>
    );
    
};

export default Wineries;
