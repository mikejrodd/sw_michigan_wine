import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, GeoJSON, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import lakeMichiganShoreData from '../assets/lake_michigan_shore_ava.json';
import fennvilleData from '../assets/fennville_ava.json';
import wineryData from '../data/wineryData.json';
import { FormGroup, FormControlLabel, Switch, Box } from '@mui/material';
import WineryCard from '../components/WineryCard';
import iconWineUrl from '../assets/icon_wine.svg';
import './styles.css';
import { useDrawer } from '../context/DrawerContext';
import { Helmet } from 'react-helmet';

const createCustomIcon = (color) => {
    return new L.Icon({
        iconUrl: iconWineUrl,
        iconSize: [52, 52],
        iconAnchor: [21, 25],
        popupAnchor: [7, -22],
        className: `custom-icon-${color}`
    });
};

const CustomZoomControl = ({ zoomLevel }) => {
    const map = useMap();

    useEffect(() => {
        if (map) {
            map.setZoom(zoomLevel);
        }
    }, [zoomLevel, map]);

    return null;
};

const position = [42.22, -86.05];

const MapPage = () => {
    const { drawerOpen } = useDrawer();
    const [showLakeMichiganShore, setShowLakeMichiganShore] = useState(true);
    const [showFennville, setShowFennville] = useState(true);
    const [activeMarker, setActiveMarker] = useState(null);
    const [zoomLevel, setZoomLevel] = useState(9.6);

    return (
        <div className="map-wrapper">
            {/* SEO Metadata */}
            <Helmet>
                <title>Winery Map - Lake Michigan Shore & Fennville AVAs</title>
                <meta
                    name="description"
                    content="The Southwest Michigan winery map – explore Fennville & Lake Michigan Shore AVAs, and plan your wine‐country adventure using our interactive map."
                />
                <link rel="canonical" href="https://www.lakemichiganshore.wine/map" />
            </Helmet>

            <MapContainer
                center={position}
                zoom={zoomLevel}
                scrollWheelZoom={true}
                className="map-container"
            >
                <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
                    attribution='Map AVA data &copy; <a href="https://www.fincuva.com">fincuva</a>, Imagery © <a href="https://carto.com/attributions">CARTO</a>'
                />
                {showLakeMichiganShore && (
                    <GeoJSON
                        data={lakeMichiganShoreData}
                        style={{
                            color: '#d9c3de',
                            weight: 4,
                            fillOpacity: 0
                        }}
                    />
                )}
                {showFennville && (
                    <GeoJSON
                        data={fennvilleData}
                        style={{
                            color: '#d9c3de',
                            weight: 4,
                            fillOpacity: 0
                        }}
                    />
                )}
                {wineryData.map((marker, index) => (
                    <Marker
                        key={index}
                        position={marker.position}
                        icon={createCustomIcon(activeMarker === index ? 'hovered' : 'default')}
                        eventHandlers={{
                            click: () => setActiveMarker(index),
                            mouseover: () => setActiveMarker(index),
                            mouseout: () => setActiveMarker(null),
                        }}
                    >
                        <Popup>
                            <WineryCard
                                name={marker.name}
                                location={marker.address}
                                description={marker.description}
                                image={marker.image}
                                small
                            />
                        </Popup>
                    </Marker>
                ))}
                <CustomZoomControl zoomLevel={zoomLevel} />
                <Box
                    sx={{
                        position: 'absolute',
                        top: 16,
                        right: 16,
                        zIndex: 1000,
                        backgroundColor: 'rgba(255, 255, 255, 0.7)',
                        padding: 1,
                        borderRadius: 4
                    }}
                >
                    <FormGroup>
                        <FormControlLabel
                            control={<Switch
                                checked={showLakeMichiganShore}
                                onChange={(e) => setShowLakeMichiganShore(e.target.checked)}
                                sx={{
                                    '& .MuiSwitch-switchBase.Mui-checked': { color: '#d9c3de' },
                                    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: '#f1e1f5' }
                                }}
                            />}
                            label="Lake Michigan Shore AVA"
                        />
                        <FormControlLabel
                            control={<Switch
                                checked={showFennville}
                                onChange={(e) => setShowFennville(e.target.checked)}
                                sx={{
                                    '& .MuiSwitch-switchBase.Mui-checked': { color: '#d9c3de' },
                                    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: '#f1e1f5' }
                                }}
                            />}
                            label="Fennville AVA"
                        />
                    </FormGroup>
                </Box>
            </MapContainer>
        </div>
    );
};

export default MapPage;
