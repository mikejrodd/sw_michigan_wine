import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box, CardActionArea, Tooltip } from '@mui/material';
import { styled } from '@mui/system';
import RedGrapeLogo from '../assets/variety_logo/red_grape.svg';
import WhiteGrapeLogo from '../assets/variety_logo/white_grape.svg';
import HybridLogo from '../assets/variety_logo/hybrid.svg';

const StyledCard = styled(Card)({
    maxWidth: 350,
    margin: '1rem',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    height: 320,
    position: 'relative',
    borderRadius: '16px',
    // Medium screen: between 769px and 1100px
    '@media (min-width:769px) and (max-width:1100px)': {
      transform: 'scale(0.8)',
      marginLeft: '-10px',
      marginRight: '-10px',
      marginBottom: '-15px',
      marginTop: '-20px',
    },
    // Small screen: up to 768px
    '@media (max-width:768px)': {
      transform: 'scale(0.7)',
      marginLeft: '-30px',
      marginRight: '-30px',
      marginBottom: '-35px',
      marginTop: '-40px',
    },
  });
  

const CardContentContainer = styled(CardContent)({
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    paddingBottom: '56px', // Ensure enough space for icons
    flexGrow: 1, // Ensure the container takes up available space
});

const TitleContainer = styled(Box)({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '0.5rem',
});

const Title = styled(Typography)(({ longTitle }) => ({
    color: '#333',
    fontFamily: "'Playfair Display', serif",
    fontWeight: 700,
    '@media (max-width:1000px)': {
      fontSize: longTitle ? '1.3rem' : '1.4rem',
    },
  }));
  
  

const OtherNames = styled(Typography)({
    color: 'textSecondary',
    fontSize: '1rem',
    marginBottom: '.2rem',
    height: '65px',
});

const FlavorIconsContainer = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    marginTop: 'auto',
    padding: '4px 4px',  // Add some padding to avoid overlapping
});

const FlavorIcon = styled('img')({
    maxWidth: '30px',
    maxHeight: '35px',
    width: 'auto',
    height: 'auto',
    objectFit: 'contain',
});

const LogoContainer = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end', // Align logos to the right
});

const StyledCardMedia = styled(CardMedia)({
    opacity: 0.8, // 20% translucent by default
    transition: 'opacity 0.3s ease-in-out', // Smooth transition effect
    '&:hover': {
        opacity: 1,
        color: '#D4B9DB',
    },
});

const StyledCardActionArea = styled(CardActionArea)({
    '&:hover': {
        backgroundColor: 'transparent', // Removes the grey hover effect
    },
});



// Flavor icons mapping
const flavorIcons = {
    apple: '/assets/flavors/apple.png',
    apricot: '/assets/flavors/apricot.png',
    peach: '/assets/flavors/peach.jpg',
    'stone fruit': '/assets/flavors/peach.jpg',
    honey: '/assets/flavors/honey.png',
    spices: '/assets/flavors/spices.png',
    spice: '/assets/flavors/spices.png',
    rose: '/assets/flavors/rose.png',
    lychee: '/assets/flavors/lychee.png',
    pear: '/assets/flavors/pear.png',
    raspberry: '/assets/flavors/raspberry.png',
    plum: '/assets/flavors/plum.png',
    'black cherry': '/assets/flavors/blackcherry.png',
    floral: '/assets/flavors/floral.png',
    'bell pepper': '/assets/flavors/bellpepper.png',
    chocolate: '/assets/flavors/chocolate.png',
    'green apple': '/assets/flavors/apple.png',
    berry: '/assets/flavors/raspberry.png',
    pineapple: '/assets/flavors/pineapple.png', // For tropical fruit
    almond: '/assets/flavors/nuts.png', // Also for Nuts, Marzipan
    banana: '/assets/flavors/banana.png',
    blackberry: '/assets/flavors/blackberry.png',
    marzipan: '/assets/flavors/nuts.png',
    nuts: '/assets/flavors/nuts.png',
    blackcurrant: '/assets/flavors/blackcurrant.png',
    blueberry: '/assets/flavors/blueberry.png',
    buttery: '/assets/flavors/buttery.png',
    cedar: '/assets/flavors/cedar.png',
    cherry: '/assets/flavors/cherry.png',
    'red fruit': '/assets/flavors/cherry.png',
    citrus: '/assets/flavors/citrus.png',
    currant: '/assets/flavors/currant.png',
    earthy: '/assets/flavors/earthy.png',
    grapefruit: '/assets/flavors/grapefruit.png',
    grapey: '/assets/flavors/grapey.png',
    herbal: '/assets/flavors/herbal.png', // Also for Herbaceous, Herbal Tea
    'herbal tea': '/assets/flavors/herbal.png',
    herbaceous: '/assets/flavors/herbal.png',
    melon: '/assets/flavors/melon.png',
    mint: '/assets/flavors/mint.png',
    mineral: '/assets/flavors/mineral.png',
    oak: '/assets/flavors/oak.png',
    petrol: '/assets/flavors/petrol.png',
    smoky: '/assets/flavors/smoky.png',
    tobacco: '/assets/flavors/tobacco.png',
    vanilla: '/assets/flavors/vanilla.png',
    violet: '/assets/flavors/violet.png',
    'white pepper': '/assets/flavors/whitepepper.png',
    pepper: '/assets/flavors/pepper.png',
    'black pepper': '/assets/flavors/pepper.png',
    // Add more mappings as necessary
};

const VarietyCard = ({ name, image, otherNames, typicalStyle, species, color, onClick, overrideImageHeight }) => {
    const isHybrid = species && species.toLowerCase().includes('hybrid');
    const grapeLogo = color.toLowerCase() === 'black' ? RedGrapeLogo : WhiteGrapeLogo;

    // Determine flavor icons to display
    const flavorIconsToDisplay = typicalStyle?.flavors
        .map(flavor => {
            const lowerCaseFlavor = flavor.toLowerCase();
            const matchingIcon = Object.keys(flavorIcons).find(key => lowerCaseFlavor.includes(key));
            return matchingIcon ? { icon: flavorIcons[matchingIcon], name: matchingIcon } : null;
        })
        .filter(Boolean)
        .slice(0, 5); // Display up to 5 icons

        return (
            <StyledCard>
                <StyledCardActionArea onClick={onClick}> {/* Use the styled component here */}
                    <StyledCardMedia
                        component="img"
                        height={overrideImageHeight ? "200" : "140"}
                        image={image}
                        alt={name}
                        style={{ objectFit: 'cover' }}
                    />
                    <CardContentContainer>
                        <TitleContainer>
                            <Title variant="h3" longTitle={name.length > 12}>{name}</Title>
                            <LogoContainer>
                                {isHybrid && (
                                    <Tooltip title="Hybrid Variety" arrow>
                                        <img src={HybridLogo} alt="Hybrid" style={{ width: '25px', height: '25px', marginLeft: '4px' }} />
                                    </Tooltip>
                                )}
                                <Tooltip title={color === 'Black' ? 'Red Grape' : 'White Grape'} arrow>
                                    <img src={grapeLogo} alt={color === 'Black' ? 'Red Grape' : 'White Grape'} style={{ width: '25px', height: '25px', marginLeft: '4px' }} />
                                </Tooltip>
                            </LogoContainer>
                        </TitleContainer>
                        {otherNames && (
                            <OtherNames variant="body1">
                                Other Names: {otherNames.join(', ')}
                            </OtherNames>
                        )}
                        <FlavorIconsContainer>
                            {flavorIconsToDisplay.map((flavor, index) => (
                                <Tooltip title={flavor.name} arrow key={index}>
                                    <FlavorIcon src={flavor.icon} alt={`Flavor ${index}`} />
                                </Tooltip>
                            ))}
                        </FlavorIconsContainer>
                    </CardContentContainer>
                </StyledCardActionArea>
            </StyledCard>
        );
        

};

export default VarietyCard;
