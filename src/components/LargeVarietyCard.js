import React from 'react';
import { Card, CardContent, CardMedia, Typography, Slider, Box, Tooltip  } from '@mui/material';
import { styled } from '@mui/system';

const getSliderValue = (level, options) => {
    const index = options.indexOf(level.toLowerCase());
    return index >= 0 ? (index / (options.length - 1)) * 100 : 0;
};

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

const FlavorIconsContainer = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
});

const FlavorIcon = styled('img')({
    maxWidth: '30px',
    maxHeight: '35px',
    width: 'auto',
    height: 'auto',
    objectFit: 'contain',
});

const createMarks = (value, options) => {
    return options.map((label, index) => {
        const sliderValue = (index / (options.length - 1)) * 100;
        return {
            value: sliderValue,
            label: sliderValue === value ? label : '', // Only show the label that matches the current value
        };
    });
};

const LargeVarietyCard = ({ variety }) => {
    const styleOptions = {
        acidity: ['low', 'medium(-)', 'medium', 'medium(+)', 'high'],
        tannin: ['low', 'medium(-)', 'medium', 'medium(+)', 'high'],
        alcohol: ['low', 'medium', 'high'],
        body: ['light', 'medium(-)', 'medium', 'medium(+)', 'full'],
    };

    const sliderStyle = {
        color: '#D4B9DB',
        padding: '15px 0',
        '& .MuiSlider-thumb': {
            width: 25,
            height: 25,
            color: '#D4B9DB',
            border: '2px solid currentColor',
        },
        '& .MuiSlider-track': {
            height: 10,
            color: '#D4B9DB',
        },
        '& .MuiSlider-rail': {
            height: 10,
            color: '#D4B9DB',
        },
        '& .MuiSlider-markLabel': {
            textAlign: 'center',
            transform: 'translateX(-50%)',
            whiteSpace: 'nowrap',
        },
    };

    const labelValueStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start', // Ensures the text stays aligned properly
        marginBottom: '16px',
    };

    const sliderLabelStyle = {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        marginBottom: '16px',
    };

    const categoryLabelStyle = {
        minWidth: '120px', // Fixed minimum width for the category label
        color: 'text.secondary', // Grey color for category labels
    };

    const valueStyle = {
        color: 'black', // Black color for the values
        textAlign: 'right',
        flexGrow: 1,
    };

    const sliderContainerStyle = {
        flexGrow: 1, // Allow the slider to grow and take the remaining space
    };

    const TitleTypography = styled(Typography)({
        color: '#7b1fa2',
        textAlign: 'center',
        marginBottom: '40px',
        marginTop: '20px',
        fontFamily: "'Playfair Display', serif",
        fontWeight: 'bold',
        fontSize: '2.5rem',
    });

    // Determine flavor icons to display
    const flavorIconsToDisplay = variety.typical_style.flavors
        .map(flavor => {
            const lowerCaseFlavor = flavor.toLowerCase();
            const matchingIcon = Object.keys(flavorIcons).find(key => lowerCaseFlavor.includes(key));
            return matchingIcon ? { icon: flavorIcons[matchingIcon], name: flavor } : null;
        })
        .filter(Boolean)
        .slice(0, 5); // Display up to 5 icons

    return (
        <Card style={{ maxWidth: '600px', boxShadow: 'none', borderRadius: '16px' }}>
            <CardMedia
                component="img"
                height="200"
                image={variety.image}
                alt={variety.variety}
            />
            <CardContent>
                <TitleTypography variant="h2" component="div" marginBottom={2}>
                    {variety.variety}
                </TitleTypography>

                <Box sx={labelValueStyle}>
                    <Typography variant="body1" sx={categoryLabelStyle}>
                        Other Names:
                    </Typography>
                    <Typography variant="body1" sx={valueStyle}>
                        {variety.other_names.join(', ')}
                    </Typography>
                </Box>

                <Box sx={labelValueStyle}>
                    <Typography variant="body1" sx={categoryLabelStyle}>
                        Species:
                    </Typography>
                    <Typography variant="body1" sx={valueStyle}>
                        {variety.species}
                    </Typography>
                </Box>

                <Box sx={labelValueStyle}>
                    <Typography variant="body1" sx={categoryLabelStyle}>
                        Color:
                    </Typography>
                    <Typography variant="body1" sx={valueStyle}>
                        {variety.color}
                    </Typography>
                </Box>

                <Box sx={labelValueStyle}>
                    <Typography variant="body1" sx={categoryLabelStyle}>
                        Budding Time:
                    </Typography>
                    <Typography variant="body1" sx={valueStyle}>
                        {variety.budding_time}
                    </Typography>
                </Box>

                <Box sx={labelValueStyle}>
                    <Typography variant="body1" sx={categoryLabelStyle}>
                        Ripening Time:
                    </Typography>
                    <Typography variant="body1" sx={valueStyle}>
                        {variety.ripening_time}
                    </Typography>
                </Box>

                {/* Display "Common Flavors" label and Flavor Icons */}
                <Box sx={labelValueStyle}>
                    <Typography variant="body1" sx={categoryLabelStyle} marginBottom={4}>
                        Common Flavors:
                    </Typography>
                    <FlavorIconsContainer>
                        {flavorIconsToDisplay.map((flavor, index) => (
                            <Tooltip title={flavor.name} arrow key={index}>
                                <FlavorIcon src={flavor.icon} alt={`Flavor ${index}`} />
                            </Tooltip>
                        ))}
                    </FlavorIconsContainer>
                </Box>

                {/* The Slider Section */}
                {variety.typical_style.acidity && (
                    <Box sx={sliderLabelStyle}>
                        <Typography sx={categoryLabelStyle} variant="body1">
                            Acidity:
                        </Typography>
                        <Box sx={sliderContainerStyle}>
                            <Slider
                                sx={sliderStyle}
                                value={getSliderValue(variety.typical_style.acidity, styleOptions.acidity)}
                                aria-label="Acidity Level"
                                valueLabelDisplay="auto"
                                marks={createMarks(getSliderValue(variety.typical_style.acidity, styleOptions.acidity), styleOptions.acidity)}
                                disabled
                            />
                        </Box>
                    </Box>
                )}
                {variety.typical_style.tannin && (
                    <Box sx={sliderLabelStyle}>
                        <Typography sx={categoryLabelStyle} variant="body1">
                            Tannin:
                        </Typography>
                        <Box sx={sliderContainerStyle}>
                            <Slider
                                sx={sliderStyle}
                                value={getSliderValue(variety.typical_style.tannin, styleOptions.tannin)}
                                aria-label="Tannin Level"
                                valueLabelDisplay="auto"
                                marks={createMarks(getSliderValue(variety.typical_style.tannin, styleOptions.tannin), styleOptions.tannin)}
                                disabled
                            />
                        </Box>
                    </Box>
                )}
                {variety.typical_style.alcohol && (
                    <Box sx={sliderLabelStyle}>
                        <Typography sx={categoryLabelStyle} variant="body1">
                            Alcohol:
                        </Typography>
                        <Box sx={sliderContainerStyle}>
                            <Slider
                                sx={sliderStyle}
                                value={getSliderValue(variety.typical_style.alcohol, styleOptions.alcohol)}
                                aria-label="Alcohol Level"
                                valueLabelDisplay="auto"
                                marks={createMarks(getSliderValue(variety.typical_style.alcohol, styleOptions.alcohol), styleOptions.alcohol)}
                                disabled
                            />
                        </Box>
                    </Box>
                )}
                {variety.typical_style.body && (
                    <Box sx={sliderLabelStyle}>
                        <Typography sx={categoryLabelStyle} variant="body1">
                            Body:
                        </Typography>
                        <Box sx={sliderContainerStyle}>
                            <Slider
                                sx={sliderStyle}
                                value={getSliderValue(variety.typical_style.body, styleOptions.body)}
                                aria-label="Body Level"
                                valueLabelDisplay="auto"
                                marks={createMarks(getSliderValue(variety.typical_style.body, styleOptions.body), styleOptions.body)}
                                disabled
                            />
                        </Box>
                    </Box>
                )}
            </CardContent>
        </Card>
    );
};

export default LargeVarietyCard;