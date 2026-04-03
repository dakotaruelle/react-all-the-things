import Map, { Marker } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import { usePokemon } from '@shared/hooks/use-pokemon-hook';

const MARKERS = [
  { id: 1, pokemonId: Math.floor(Math.random() * 151) + 1, label: 'Falls Park', longitude: -96.7357, latitude: 43.5606 },
  { id: 2, pokemonId: Math.floor(Math.random() * 151) + 1, label: 'Downtown Sioux Falls', longitude: -96.7293, latitude: 43.5490 },
  { id: 3, pokemonId: Math.floor(Math.random() * 151) + 1, label: 'Great Plains Zoo', longitude: -96.7189, latitude: 43.5397 },
  { id: 4, pokemonId: Math.floor(Math.random() * 151) + 1, label: 'Terrace Park', longitude: -96.7420, latitude: 43.5650 },
  { id: 5, pokemonId: Math.floor(Math.random() * 151) + 1, label: 'SculptureWalk', longitude: -96.7310, latitude: 43.5475 },
  { id: 6, pokemonId: Math.floor(Math.random() * 151) + 1, label: 'Yankton Trail Park', longitude: -96.7580, latitude: 43.5720 },
  { id: 7, pokemonId: Math.floor(Math.random() * 151) + 1, label: 'Elmwood Golf Course', longitude: -96.7650, latitude: 43.5540 },
  { id: 8, pokemonId: Math.floor(Math.random() * 151) + 1, label: 'Sertoma Park', longitude: -96.7480, latitude: 43.5350 },
  { id: 9, pokemonId: Math.floor(Math.random() * 151) + 1, label: 'Tuthill Park', longitude: -96.7820, latitude: 43.5270 },
  { id: 10, pokemonId: Math.floor(Math.random() * 151) + 1, label: 'Empire Mall', longitude: -96.7710, latitude: 43.5440 },
  { id: 11, pokemonId: Math.floor(Math.random() * 151) + 1, label: 'Sherman Park', longitude: -96.7550, latitude: 43.5480 },
  { id: 12, pokemonId: Math.floor(Math.random() * 151) + 1, label: 'Spellerberg Park', longitude: -96.7400, latitude: 43.5310 },
  { id: 13, pokemonId: Math.floor(Math.random() * 151) + 1, label: 'McKennan Park', longitude: -96.7340, latitude: 43.5380 },
  { id: 14, pokemonId: Math.floor(Math.random() * 151) + 1, label: 'Omnitech', longitude: -96.7901, latitude: 43.4950 },
];

function PokemonMarker({ pokemonId, label, longitude, latitude }: { pokemonId: number; label: string; longitude: number; latitude: number }) {
  const pokemon = usePokemon(pokemonId);

  return (
    <Marker longitude={longitude} latitude={latitude} anchor="bottom">
      <div title={label} style={{ cursor: 'pointer', textAlign: 'center' }}>
        {pokemon ? (
          <img src={pokemon.imageUrl} alt={pokemon.name} style={{ width: 96, height: 96 }} />
        ) : (
          <span style={{ fontSize: 48 }}>📍</span>
        )}
      </div>
    </Marker>
  );
}

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
      {MARKERS.map(({ id, pokemonId, label, longitude, latitude }) => (
        <PokemonMarker key={id} pokemonId={pokemonId} label={label} longitude={longitude} latitude={latitude} />
      ))}
    </Map>
  );
}