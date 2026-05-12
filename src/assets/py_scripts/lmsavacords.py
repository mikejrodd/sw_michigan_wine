import geopandas as gpd
import json

# Load the GeoJSON file
gdf = gpd.read_file('https://gm-pm.s3.amazonaws.com/gj/ava/ava_56.geojson')

# Extract coordinates
coordinates = []
for feature in gdf.geometry:
    if feature.geom_type == 'Polygon':
        exterior_coords = list(feature.exterior.coords)
        coordinates.append(exterior_coords)
    elif feature.geom_type == 'MultiPolygon':
        for polygon in feature:
            exterior_coords = list(polygon.exterior.coords)
            coordinates.append(exterior_coords)

# Create a GeoJSON-like structure
geojson_structure = {
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "properties": {},
            "geometry": {
                "type": "Polygon",
                "coordinates": coordinates
            }
        }
    ]
}

# Save to a JSON file
with open('lake_michigan_shore_ava.json', 'w') as f:
    json.dump(geojson_structure, f, indent=4)
