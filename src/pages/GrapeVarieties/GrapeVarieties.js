import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Container, Grid, Typography, Dialog, DialogContent, Card, Link, Box, useMediaQuery } from '@mui/material';
import VarietyCard from '../../components/VarietyCard';
import LargeVarietyCard from '../../components/LargeVarietyCard';
import grapeVarieties from '../../data/lms_varieties.json';
import { styled } from '@mui/system';
import GrapeCharts from './GrapeCharts';
import { useDrawer } from '../../context/DrawerContext';
import { isMobileDevice } from '../../utils/detectDevice';

const PageContainer = styled(Box)(({ drawerOpen, isMobile }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  maxWidth: isMobile ? '100vw' : `calc(100vw - ${drawerOpen ? 340 : 340}px)`,
  height: 'auto',
  margin: '0',
  paddingTop: '1rem',
  marginLeft: isMobile ? '0' : drawerOpen ? '320px' : '170px',
  backgroundColor: '#ffffff',
  boxSizing: 'border-box',
  marginTop: '20px',
  marginBottom: '40px',
}));

const BackgroundContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '2rem',
  paddingLeft: '0rem',
  backgroundColor: '#ffffff',
  boxSizing: 'border-box',
  width: '100%', // changed from fixed "1100px"
  maxWidth: '1100px', // cap desktop width to 1100px
  '@media (max-width: 768px)': {
    maxWidth: '95vw',
    padding: '0rem',
  },
}));

const ChartsContainer = styled('div')(({ isMobile }) => ({
  display: 'flex',
  justifyContent: 'space-around',
  width: '100%', // use full width so it can shrink on desktop
  maxWidth: isMobile ? '100%' : '1200px', // cap desktop width at 1200px
  flexDirection: isMobile ? 'column' : 'row',
  alignItems: 'center',
  marginBottom: isMobile ? '0' : '2rem',
  minWidth: isMobile ? '100%': '900px',
}));

const ChartBox = styled(Card)(({ isMobile }) => ({
  width: isMobile ? '90vw' : '100%', // use full width on desktop
  maxWidth: isMobile ? undefined : '1200px', // cap desktop width at 1200px
  padding: '0rem',
  marginTop: '30px',
  backgroundColor: '#ffffff',
  borderRadius: '16px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

const ChartContainer = styled('div')(({ isMobile }) => ({
  width: '100%',
  height: isMobile ? '250px' : '550px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: isMobile ? '0' : '20px',
}));

const GrapeVarieties = () => {
  const [selectedVariety, setSelectedVariety] = useState(null);
  const { drawerOpen } = useDrawer();
  // Use media query to force mobile if window width is below 768px, or fallback to device detection.
  const isMobile = useMediaQuery('(max-width:768px)') || isMobileDevice();

  const handleCardClick = (variety) => {
    setSelectedVariety(variety);
  };

  const handleClosePopup = () => {
    setSelectedVariety(null);
  };

  return (
    <>
    <Helmet>
      <title>Southwest Michigan Grape Varieties | Lake Michigan Shore Wineries</title>
      <link rel="canonical" href="https://www.lakemichiganshore.wine/grape-varieties" />
      <meta name="description" content="Explore vinifera and hybrid grape varieties grown in Southwest Michigan's Lake Michigan Shore AVA. Riesling, Pinot Noir, Cabernet Franc, Chambourcin, and more." />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="Southwest Michigan Grape Varieties | Lake Michigan Shore Wineries" />
      <meta property="og:description" content="Discover the vinifera and hybrid grape varieties thriving in Southwest Michigan wine country." />
      <meta property="og:url" content="https://www.lakemichiganshore.wine/grape-varieties" />
      <meta property="og:image" content="https://www.lakemichiganshore.wine/assets/variety_images/riesling.jpg" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Southwest Michigan Grape Varieties" />
      <meta name="twitter:description" content="Explore vinifera and hybrid grapes grown in the Lake Michigan Shore AVA." />
      <meta name="twitter:image" content="https://www.lakemichiganshore.wine/assets/variety_images/riesling.jpg" />
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.lakemichiganshore.wine/" },
            { "@type": "ListItem", "position": 2, "name": "Grape Varieties", "item": "https://www.lakemichiganshore.wine/grape-varieties" }
          ]
        })}
      </script>
    </Helmet>
    <PageContainer drawerOpen={drawerOpen} isMobile={isMobile}>
      <BackgroundContainer>
        <Typography
          variant="h4"
          component="h2"
          sx={{ textAlign: 'center', marginBottom: '3rem', paddingLeft: '3rem', paddingRight: '3rem' }}
        >
          Southwest Michigan Grape Varieties
        </Typography>
        <Typography
          variant="body1"
          component="p"
          paragraph
          sx={{
            fontSize: isMobile ? '10px' : '20px',
          }}
        >
          Both vinifera and hybrid varieties are currently making world-class wines in Southwest Michigan. All statistics
          below are showing total Michigan acreage by variety as of 2020. In that year, Southwest Michigan accounted for
          79% of total planted vineyard acres in the state.
        </Typography>

        <ChartsContainer isMobile={isMobile}>
          <ChartBox isMobile={isMobile}>
            <Typography variant="h4" component="div" gutterBottom>
              Vinifera Grapes by Acreage
            </Typography>
            <ChartContainer isMobile={isMobile}>
              <GrapeCharts category="VINIFERA" />
            </ChartContainer>
            <Link
              href="https://www.nass.usda.gov/Statistics_by_State/Michigan/Publications/Michigan_Rotational_Surveys/mi_fruit20/Grapes%20hops.pdf"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                textAlign: 'center',
                display: 'block',
                marginBottom: isMobile ? '20px' : '0',
                marginTop: isMobile ? '0' : '2rem',
                fontSize: isMobile ? '.8rem' : '1.1rem',
                color: 'lightgrey',
                textDecoration: 'none',
              }}
            >
              2020 Michigan Rotational Surveys
            </Link>
          </ChartBox>
        </ChartsContainer>

        <Grid container spacing={0} sx={{ justifyContent: isMobile ? 'center' : 'flex-start' }}>
          {grapeVarieties
            .filter((variety) => 
            variety.species.toLowerCase().includes('vinifera') &&
            !variety.species.toLowerCase().includes('hybrid'))          
            .map((variety, index) => (
              <Grid
                item
                xs={6}
                sm={6}
                md={6}
                lg={4}
                key={index}
                sx={{
                  padding: '0px', // No padding at all
                }}
              >
                <Box
                  sx={{
                    transform: isMobile ? 'scale(1)' : 'none',
                    transformOrigin: 'top center', // Ensures proper scaling
                    width: '100%',
                  }}
                >
                  <VarietyCard
                    name={variety.variety}
                    image={variety.image}
                    otherNames={variety.other_names}
                    typicalStyle={variety.typical_style}
                    species={variety.species}
                    color={variety.color}
                    onClick={() => handleCardClick(variety)}
                  />
                </Box>
              </Grid>
            ))}
        </Grid>

        <ChartsContainer isMobile={isMobile}>
          <ChartBox isMobile={isMobile}>
            <Typography variant="h4" component="div" gutterBottom>
              Hybrid Grapes by Acreage
            </Typography>
            <ChartContainer isMobile={isMobile}>
              <GrapeCharts category="HYBRIDS" />
            </ChartContainer>
            <Link
              href="https://www.nass.usda.gov/Statistics_by_State/Michigan/Publications/Michigan_Rotational_Surveys/mi_fruit20/Grapes%20hops.pdf"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                textAlign: 'center',
                display: 'block',
                marginTop: '2rem',
                fontSize: '1.1rem',
                color: 'lightgrey',
                textDecoration: 'none',
              }}
            >
              2020 Michigan Rotational Surveys
            </Link>
          </ChartBox>
        </ChartsContainer>

        <Grid container spacing={0} sx={{ justifyContent: isMobile ? 'center' : 'flex-start' }}>
          {grapeVarieties
            .filter((variety) => variety.species.toLowerCase().includes('hybrid'))
            .map((variety, index) => (
              <Grid
                item
                xs={6}
                sm={6}
                md={6}
                lg={4}
                key={index}
                sx={{
                  padding: '0px', // No padding at all
                }}
              >
                <Box
                  sx={{
                    transform: isMobile ? 'scale(1)' : 'none',
                    transformOrigin: 'top center', // Ensures proper scaling
                    width: '100%',
                  }}
                >
                  <VarietyCard
                    name={variety.variety}
                    image={variety.image}
                    otherNames={variety.other_names}
                    typicalStyle={variety.typical_style}
                    species={variety.species}
                    color={variety.color}
                    onClick={() => handleCardClick(variety)}
                  />
                </Box>
              </Grid>
            ))}
        </Grid>

        {selectedVariety && (
          <Dialog
            open={Boolean(selectedVariety)}
            onClose={handleClosePopup}
            maxWidth="md"
            fullWidth
            sx={{ '& .MuiPaper-root': { borderRadius: '16px', maxWidth: '600px', width: '100%' } }}
          >
            <DialogContent>
              <LargeVarietyCard variety={selectedVariety} />
            </DialogContent>
          </Dialog>
        )}
      </BackgroundContainer>
    </PageContainer>
    </>
  );
};

export default GrapeVarieties;
