import React from 'react';
import { Grid } from '@mui/material';
import WineryCard from '../../components/WineryCard';
import wineryData from '../../data/wineryData.json'; // Import winery data JSON file

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
                        small={false} // Ensure the card is a normal card
                        fontSize={{ xs: '0.8rem', sm: '0.875rem', md: '1rem' }} // Adjust text size based on screen width
                    />
                </Grid>
            
            ))}
        </Grid>
    );
};

export default FennvilleWineries;
