import React, { useCallback, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import lakeMichiganShoreData from '../../assets/lake_michigan_shore_ava.json';
import fennvilleData from '../../assets/fennville_ava.json';
import './styles.css';

const AVAs = () => {
    const navigate = useNavigate();

    const handleLogoHover = (layer, marker) => {
        if (layer) {
            layer.setStyle({
                weight: 8, // Increase border thickness
                fillOpacity: 0.5, // Fill in with color
                fillColor: '#f1e1f5', // Adjust fill color if needed
            });
        }
        if (marker) {
            const img = marker._icon.querySelector('img');
            img.style.transform = 'scale(1.1)'; // Scale the logo to 110%
        }
    };

    const handleLogoOut = (layer, marker) => {
        if (layer) {
            layer.setStyle({
                color: '#d9c3de',
                weight: 4, // Reset border thickness
                fillOpacity: 0, // Remove fill color
            });
        }
        if (marker) {
            const img = marker._icon.querySelector('img');
            img.style.transform = 'scale(1)'; // Reset scale
        }
    };

    const handleLogoClick = useCallback((avaName) => {
        if (avaName === 'Lake Michigan Shore') {
            navigate('/avas/lake-michigan-shore');
        } else if (avaName === 'Fennville') {
            navigate('/avas/fennville');
        }
    }, [navigate]);

    useEffect(() => {
        // Disable all map interactions
        const map = L.map('map', {
            center: [42.19, -85.55],
            zoom: 9.0,
            zoomControl: false, // Disable zoom control
            dragging: false, // Disable dragging
            scrollWheelZoom: false, // Disable scroll wheel zoom
            doubleClickZoom: false, // Disable double click zoom
            boxZoom: false, // Disable box zoom
            keyboard: false, // Disable keyboard controls
            tap: false, // Disable touch controls for mobile
        });

        L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://carto.com/attributions">CARTO</a>',
        }).addTo(map);

        const fennvilleLayer = L.geoJSON(fennvilleData, {
            style: {
                color: '#d9c3de',
                weight: 4, // Initial border thickness
                fillOpacity: 0, // Initial fill opacity
            },
        }).addTo(map);

        const lakeMichiganShoreLayer = L.geoJSON(lakeMichiganShoreData, {
            style: {
                color: '#d9c3de',
                weight: 4, // Initial border thickness
                fillOpacity: 0, // Initial fill opacity
            },
        }).addTo(map);

        // Create DivIcon for Fennville
        const fennvilleIcon = L.divIcon({
            html: '<img src="/assets/fennville_wide.png" alt="Fennville AVA" style="width: 350px; height: 350px; object-fit: contain; opacity: 0.8; cursor: pointer; transition: transform 0.3s ease;" />', // Logo size and appearance with transition
            className: 'transparent-icon',
            iconSize: [350, 350], // Adjust logo size here
            iconAnchor: [-110, 180], // Adjust logo position here
        });

        const fennvillePosition = [42.6, -85.45]; // Adjust position relative to AVA
        const fennvilleMarker = L.marker(fennvillePosition, { icon: fennvilleIcon }).addTo(map);

        fennvilleMarker.on('mouseover', () => handleLogoHover(fennvilleLayer, fennvilleMarker));
        fennvilleMarker.on('mouseout', () => handleLogoOut(fennvilleLayer, fennvilleMarker));
        fennvilleMarker.on('click', () => handleLogoClick('Fennville'));

        // Create DivIcon for Lake Michigan Shore
        const lakeMichiganShoreIcon = L.divIcon({
            html: '<img src="/assets/lms_wide.png" alt="Lake Michigan Shore AVA" style="width: 700px; height: 400px; object-fit: contain; opacity: 0.8; cursor: pointer; transition: transform 0.3s ease;" />', // Logo size and appearance with transition
            className: 'transparent-icon',
            iconSize: [350, 350], // Adjust logo size here
            iconAnchor: [70, 110], // Adjust logo position here
        });

        const lakeMichiganShorePosition = [42.0, -85.45]; // Adjust position relative to AVA
        const lakeMichiganShoreMarker = L.marker(lakeMichiganShorePosition, { icon: lakeMichiganShoreIcon }).addTo(map);

        lakeMichiganShoreMarker.on('mouseover', () => handleLogoHover(lakeMichiganShoreLayer, lakeMichiganShoreMarker));
        lakeMichiganShoreMarker.on('mouseout', () => handleLogoOut(lakeMichiganShoreLayer, lakeMichiganShoreMarker));
        lakeMichiganShoreMarker.on('click', () => handleLogoClick('Lake Michigan Shore'));

        return () => {
            map.remove();
        };
    }, [handleLogoClick]);

    return (
        <>
            <Helmet>
                <title>Southwest Michigan AVAs | Lake Michigan Shore & Fennville Wine Regions</title>
                <link rel="canonical" href="https://www.lakemichiganshore.wine/avas" />
                <meta name="description" content="Explore Southwest Michigan's two American Viticultural Areas: Lake Michigan Shore AVA and Fennville AVA. Discover the wine regions, growing conditions, and wineries." />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Southwest Michigan AVAs | Lake Michigan Shore & Fennville" />
                <meta property="og:description" content="Explore Southwest Michigan's two American Viticultural Areas and their wineries." />
                <meta property="og:url" content="https://www.lakemichiganshore.wine/avas" />
                <meta property="og:image" content="https://www.lakemichiganshore.wine/assets/lms_wide.png" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Southwest Michigan AVAs | Lake Michigan Shore & Fennville" />
                <meta name="twitter:description" content="Explore Southwest Michigan's two American Viticultural Areas and their wineries." />
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "BreadcrumbList",
                        "itemListElement": [
                            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.lakemichiganshore.wine/" },
                            { "@type": "ListItem", "position": 2, "name": "AVAs", "item": "https://www.lakemichiganshore.wine/avas" }
                        ]
                    })}
                </script>
            </Helmet>
            <div className="map-wrapper" id="map" style={{ }}></div>
        </>
    );
};

export default AVAs;
