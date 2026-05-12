'use client';

import React, { useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import lakeMichiganShoreData from '@/data/geojson/lake_michigan_shore_ava.json';
import fennvilleData from '@/data/geojson/fennville_ava.json';
import './styles.css';

const AVAsMap = () => {
    const router = useRouter();

    const handleLogoHover = (layer, marker) => {
        if (layer) {
            layer.setStyle({
                weight: 8,
                fillOpacity: 0.5,
                fillColor: '#f1e1f5',
            });
        }
        if (marker) {
            const img = marker._icon.querySelector('img');
            img.style.transform = 'scale(1.1)';
        }
    };

    const handleLogoOut = (layer, marker) => {
        if (layer) {
            layer.setStyle({
                color: '#d9c3de',
                weight: 4,
                fillOpacity: 0,
            });
        }
        if (marker) {
            const img = marker._icon.querySelector('img');
            img.style.transform = 'scale(1)';
        }
    };

    const handleLogoClick = useCallback((avaName) => {
        if (avaName === 'Lake Michigan Shore') {
            router.push('/avas/lake-michigan-shore');
        } else if (avaName === 'Fennville') {
            router.push('/avas/fennville');
        }
    }, [router]);

    useEffect(() => {
        // Disable all map interactions
        const map = L.map('map', {
            center: [42.19, -85.55],
            zoom: 9.0,
            zoomControl: false,
            dragging: false,
            scrollWheelZoom: false,
            doubleClickZoom: false,
            boxZoom: false,
            keyboard: false,
            tap: false,
        });

        L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://carto.com/attributions">CARTO</a>',
        }).addTo(map);

        const fennvilleLayer = L.geoJSON(fennvilleData, {
            style: {
                color: '#d9c3de',
                weight: 4,
                fillOpacity: 0,
            },
        }).addTo(map);

        const lakeMichiganShoreLayer = L.geoJSON(lakeMichiganShoreData, {
            style: {
                color: '#d9c3de',
                weight: 4,
                fillOpacity: 0,
            },
        }).addTo(map);

        // Create DivIcon for Fennville
        const fennvilleIcon = L.divIcon({
            html: '<img src="/assets/fennville_wide.png" alt="Fennville AVA" style="width: 350px; height: 350px; object-fit: contain; opacity: 0.8; cursor: pointer; transition: transform 0.3s ease;" />',
            className: 'transparent-icon',
            iconSize: [350, 350],
            iconAnchor: [-110, 180],
        });

        const fennvillePosition = [42.6, -85.45];
        const fennvilleMarker = L.marker(fennvillePosition, { icon: fennvilleIcon }).addTo(map);

        fennvilleMarker.on('mouseover', () => handleLogoHover(fennvilleLayer, fennvilleMarker));
        fennvilleMarker.on('mouseout', () => handleLogoOut(fennvilleLayer, fennvilleMarker));
        fennvilleMarker.on('click', () => handleLogoClick('Fennville'));

        // Create DivIcon for Lake Michigan Shore
        const lakeMichiganShoreIcon = L.divIcon({
            html: '<img src="/assets/lms_wide.png" alt="Lake Michigan Shore AVA" style="width: 700px; height: 400px; object-fit: contain; opacity: 0.8; cursor: pointer; transition: transform 0.3s ease;" />',
            className: 'transparent-icon',
            iconSize: [350, 350],
            iconAnchor: [70, 110],
        });

        const lakeMichiganShorePosition = [42.0, -85.45];
        const lakeMichiganShoreMarker = L.marker(lakeMichiganShorePosition, { icon: lakeMichiganShoreIcon }).addTo(map);

        lakeMichiganShoreMarker.on('mouseover', () => handleLogoHover(lakeMichiganShoreLayer, lakeMichiganShoreMarker));
        lakeMichiganShoreMarker.on('mouseout', () => handleLogoOut(lakeMichiganShoreLayer, lakeMichiganShoreMarker));
        lakeMichiganShoreMarker.on('click', () => handleLogoClick('Lake Michigan Shore'));

        return () => {
            map.remove();
        };
    }, [handleLogoClick]);

    return (
        <div className="map-wrapper" id="map" style={{ }}></div>
    );
};

export default AVAsMap;
