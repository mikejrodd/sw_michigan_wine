import React, { useState } from 'react';
import { Grid, Dialog, DialogContent } from '@mui/material';
import VarietyCard from '../../components/VarietyCard';
import LargeVarietyCard from '../../components/LargeVarietyCard'; // Import the LargeVarietyCard component
import grapeVarieties from '../../data/lms_varieties.json';
import { styled } from '@mui/system';

const interestingVarieties = grapeVarieties.filter(variety => 
    ['Chambourcin', 'Traminette', 'Riesling'].includes(variety.variety) // Adjust as necessary
);

const StyledDialog = styled(Dialog)({
    '& .MuiPaper-root': {
        borderRadius: '16px',  // Adjust the value to increase the border radius
        maxWidth: '600px',     // Match the card's width
        width: '100%',         // Ensure the dialog takes full width within the max-width constraint
    },
});

const LmsInterestingVarieties = () => {
    const [selectedVariety, setSelectedVariety] = useState(null);

    const handleCardClick = (variety) => {
        setSelectedVariety(variety);
    };

    const handleClosePopup = () => {
        setSelectedVariety(null);
    };

    return (
        <>
            <Grid container spacing={0} >
                {interestingVarieties.map((variety, index) => (
                    <Grid item xs={6} sm={6} md={4} key={index}>
                        <VarietyCard 
                            name={variety.variety} 
                            image={variety.image} 
                            description={`Species: ${variety.species}\nColor: ${variety.color}`}
                            typicalStyle={variety.typical_style}
                            species={variety.species}
                            color={variety.color}
                            onClick={() => handleCardClick(variety)}
                            overrideImageHeight={true} // Pass a prop to override image height
                        />
                    </Grid>
                ))}
            </Grid>
            {selectedVariety && (
                <StyledDialog 
                    open={Boolean(selectedVariety)} 
                    onClose={handleClosePopup}
                    maxWidth="md"
                    fullWidth
                >
                    <DialogContent>
                        <LargeVarietyCard variety={selectedVariety} />
                    </DialogContent>
                </StyledDialog>
            )}
        </>
    );
};

export default LmsInterestingVarieties;
