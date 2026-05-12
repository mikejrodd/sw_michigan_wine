'use client';
import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { useRouter } from 'next/navigation';

// Styles for non-popout cards
const nonPopoutStyles = {
    maxWidth: 345,
    margin: '0rem',
    marginBottom: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    height: '100%',
    cursor: 'pointer',
    transition: 'box-shadow 0.3s ease-in-out',
    borderRadius: '16px',  // Added border radius for normal cards
    // '&:hover': {
    //     boxShadow: '0 4px 8px 0 rgba(173, 216, 230, 0.4)',  // Light pastel blue shadow on hover
    // },
};

// Styles for popout cards
const popoutStyles = {
    width: 200,
    margin: '0rem',
    boxShadow: 'none',
    height: '50%',
    cursor: 'pointer',
};

const StyledCard = styled(Card, {
    shouldForwardProp: (prop) => prop !== 'small',
})(({ small }) => (small ? popoutStyles : nonPopoutStyles));

const CardContentContainer = styled(CardContent, {
    shouldForwardProp: (prop) => prop !== 'small',
})(({ small }) => ({
    display: 'flex-start',
    flexDirection: 'column',
    padding: small ? '8px' : '24px',
    '&:last-child': {
        paddingBottom: small ? '4px' : '8px',
    },
}));

const Title = styled(Typography, {
    shouldForwardProp: (prop) => prop !== 'small',
})(({ small }) => ({
    color: '#333',
    fontSize: small ? '1rem' : '1.4rem',
    fontWeight: 500,
    marginBottom: small ? '0px' : '1rem',
    lineHeight: 1.2,
    cursor: 'pointer', // Make the title look clickable
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    height: small ? 'auto' : 'auto',
    textAlign: 'center',
}));

const WineryCard = ({ name, location, description, image, small, fontSize = '1rem' }) => {
    const router = useRouter();

    const formatNameForUrl = (name) => {
        if (name.toLowerCase() === "crane's winery") {
            return 'crane\'s-winery';
        } else if (name.toLowerCase() === "st. julian winery") {
            return 'st.-julian-winery';
        } else {
            return name
                .toLowerCase()
                .replace(/ /g, '-')
                .replace(/[^a-z0-9-]/g, '-')
                .replace(/--+/g, '-')
                .trim();
        }
    };

    const handleCardClick = () => {
        if (!small) {
            window.scrollTo(0, 0);
            router.push(`/wineries/${formatNameForUrl(name)}`);
        }
    };

    const handleTitleClick = (e) => {
        e.stopPropagation();
        window.scrollTo(0, 0);
        router.push(`/wineries/${formatNameForUrl(name)}`);
    };

    return (
        <StyledCard small={small} onClick={handleCardClick}>
            <CardMedia
                component="img"
                height="120"
                image={image}
                alt={name}
                onClick={small ? handleTitleClick : null}
                style={{ objectFit: 'contain', padding: '8px', marginTop: small ? '0px' : '25px', borderRadius: '16px' }} // Ensure padding around the logo
            />
            <CardContentContainer small={small}>
                <Title variant="h1" small={small} onClick={small ? handleTitleClick : null} sx={{ fontSize: fontSize }}>
                    {name}
                </Title>
                {/* <Address variant="body2" small={small}>
                    {location}
                </Address> */}
                {/* <Description variant="body2" small={small}>
                    {description}
                </Description> */}
            </CardContentContainer>
        </StyledCard>
    );
};

export default WineryCard;
