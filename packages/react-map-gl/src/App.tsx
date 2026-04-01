import Map, { Marker } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';

const MARKERS = [
  { id: 1, label: 'Falls Park', longitude: -96.7357, latitude: 43.5606 },
  { id: 2, label: 'Downtown Sioux Falls', longitude: -96.7293, latitude: 43.5490 },
  { id: 3, label: 'Great Plains Zoo', longitude: -96.7189, latitude: 43.5397 },
];

export function App() {
  return (
    <Map
      initialViewState={{
        longitude: -96.7293,
        latitude: 43.5490,
        zoom: 12
      }}
      style={{ width: '100vw', height: '98vh', overflow: 'hidden' }}
      mapStyle="https://api.maptiler.com/maps/streets/style.json?key=MoPKdN1EyT0Q4UA8Vq3L"
    >
      {MARKERS.map(({ id, label, longitude, latitude }) => (
        <Marker key={id} longitude={longitude} latitude={latitude} anchor="bottom">
          <div title={label} style={{ fontSize: 24, cursor: 'pointer' }}>📍</div>
        </Marker>
      ))}
    </Map>
  );
}