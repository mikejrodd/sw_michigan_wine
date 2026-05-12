import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    typography: {
        fontFamily: "'Montserrat', sans-serif",
        h1: {
            fontFamily: "'Playfair Display', serif",
            fontSize: '2.7rem',
            color: '#333',
            fontWeight: 500,
            '@media (max-width:600px)': {
                fontSize: '1.5rem',
            },
        },
        h2: {
            fontFamily: "'Libre Baskerville', serif",
            fontSize: '2rem',
            color: '#444',
            '@media (max-width:600px)': {
                fontSize: '1.7rem',
            },
        },
        h3: {
            fontFamily: "'Libre Baskerville', serif",
            fontSize: '1.75rem',
            color: '#555',
            '@media (max-width:600px)': {
                fontSize: '1.3rem',
            },
        },
        h4: {
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
            fontSize: '2rem',
            color: '#7b1fa2',
            '@media (max-width:600px)': {
                fontSize: '1.5rem',
            },
        },
        h6: {
            fontFamily: "'Libre Baskerville', serif",
            fontSize: '1.2rem',
            color: '#333',
            '@media (max-width:600px)': {
                fontSize: '1rem',
            },
        },
        body1: {
            fontFamily: "'Montserrat', sans-serif",
            fontSize: '1.1rem',
            color: '#333',
            '@media (max-width:600px)': {
                fontSize: '.9rem',
            },
        },
        bodychat: {
            fontFamily: "'Montserrat', sans-serif",
            fontSize: '1.1rem',
            color: '#575656',
            '@media (max-width:600px)': {
                fontSize: 16,
            },
        },
        body4: {
            fontFamily: "'Montserrat', sans-serif",
            fontSize: '1.1rem',
            color: '#575656',
            '@media (max-width:600px)': {
                fontSize: '1rem',
            },
        },
        body2: {
            fontFamily: "'Montserrat', sans-serif",
            fontSize: '1rem',
            color: '#333',
            '@media (max-width:600px)': {
                fontSize: '0.9rem',
            },
        },
        body3: {
            fontFamily: "'Montserrat', sans-serif",
            fontSize: '0.8rem',
            color: '#575656',
            lineHeight: 0,
            '@media (max-width:600px)': {
                fontSize: '0.7rem',
            },
        },
    },
    components: {
        MuiLink: {
            styleOverrides: {
                root: {
                    color: '#7b1fa2',
                    textDecoration: 'none',
                    '&:hover': {
                        textDecoration: 'none',
                        color: '#6a1b9a',
                    },
                },
            },
        },
        MuiTypography: {
            styleOverrides: {
                root: {
                    '& a': {
                        color: '#7b1fa2',
                        textDecoration: 'none',
                        '&:hover': {
                            textDecoration: 'none',
                            color: '#6a1b9a',
                        },
                    },
                },
            },
        },
    },
});

export default theme;
