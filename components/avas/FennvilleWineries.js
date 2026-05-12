'use client';

import React from 'react';
import { Grid } from '@mui/material';
import WineryCard from '@/components/WineryCard';
import wineryData from '@/data/wineryData.json';

const FennvilleWineries = () => {
    // Filter wineries by AVA "Fennville"
    const filteredWineries = wineryData.filter(winery => winery.ava === 'Fennville');

    return (
        <Grid container spacing={1} sx={{ width: { xs: '100%', sm: '100%' }, mx: 'auto' }}>
            {filteredWineries.map((winery, index) => (
                <Grid item xs={6} sm={6} md={3} key={index}>
                    <WineryCard
                        name={winery.name}
                        image={winery.image}
                        small={false}
                        fontSize={{ xs: '0.8rem', sm: '0.875rem', md: '1rem' }}
                    />
                </Grid>
            ))}
        </Grid>
    );
};

export default FennvilleWineries;
