'use client';

import React, { useState } from 'react';
import { Grid, Dialog, DialogContent } from '@mui/material';
import VarietyCard from '@/components/VarietyCard';
import LargeVarietyCard from '@/components/LargeVarietyCard';
import grapeVarieties from '@/data/lms_varieties.json';

const interestingVarieties = grapeVarieties.filter(variety =>
    ['Lemberger', 'Grüner Veltliner', 'Muscat Ottonel'].includes(variety.variety)
);

const dialogPaperProps = {
    sx: {
        borderRadius: '16px',
        maxWidth: '600px',
        width: '100%',
        '@media (max-width:600px)': { maxWidth: '90%' },
    },
};

const FennvilleInterestingVarieties = () => {
    const [selectedVariety, setSelectedVariety] = useState(null);

    const handleCardClick = (variety) => {
        setSelectedVariety(variety);
    };

    const handleClosePopup = () => {
        setSelectedVariety(null);
    };

    return (
        <>
            <Grid container spacing={0} sx={{ width: { xs: '100%', sm: '100%' }, mx: 'auto' }}>
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
                            overrideImageHeight={true}
                        />
                    </Grid>
                ))}
            </Grid>
            {selectedVariety && (
                <Dialog
                    open={Boolean(selectedVariety)}
                    onClose={handleClosePopup}
                    maxWidth="md"
                    fullWidth
                    PaperProps={dialogPaperProps}
                >
                    <DialogContent>
                        <LargeVarietyCard variety={selectedVariety} />
                    </DialogContent>
                </Dialog>
            )}
        </>
    );
};

export default FennvilleInterestingVarieties;
