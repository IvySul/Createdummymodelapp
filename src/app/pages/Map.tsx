import { useEffect, useMemo, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { Loader2, LocateFixed, Menu } from 'lucide-react';
import BottomNav from '../components/BottomNav';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icon
const icon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

type RentalPlace = {
  id: string;
  name: string;
  type: string;
  position: [number, number];
};

const DEFAULT_CENTER: [number, number] = [35.9544, -83.9295];
const DISTANCE_OPTIONS = [
  { label: '0.5 km', value: 500 },
  { label: '1 km', value: 1000 },
  { label: '2.5 km', value: 2500 },
  { label: '5 km', value: 5000 },
  { label: '10 km', value: 10000 },
];

export default function Map() {
  const [userPosition, setUserPosition] = useState<[number, number]>(DEFAULT_CENTER);
  const [radius, setRadius] = useState(2500);
  const [search, setSearch] = useState('');
  const [rentals, setRentals] = useState<RentalPlace[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [error, setError] = useState('');

  const filteredRentals = useMemo(() => {
    if (!search.trim()) return rentals;
    const query = search.toLowerCase();
    return rentals.filter((rental) => rental.name.toLowerCase().includes(query) || rental.type.toLowerCase().includes(query));
  }, [rentals, search]);

  const fetchNearbyRentals = async (center: [number, number], radiusMeters: number) => {
    setIsLoading(true);
    setError('');

    try {
      const [lat, lon] = center;
      const overpassQuery = `
        [out:json][timeout:25];
        (
          node(around:${radiusMeters},${lat},${lon})["building"="apartments"];
          way(around:${radiusMeters},${lat},${lon})["building"="apartments"];
          node(around:${radiusMeters},${lat},${lon})["tourism"="apartment"];
          way(around:${radiusMeters},${lat},${lon})["tourism"="apartment"];
          node(around:${radiusMeters},${lat},${lon})["amenity"="real_estate_agent"];
          way(around:${radiusMeters},${lat},${lon})["amenity"="real_estate_agent"];
        );
        out center tags;
      `;

      const response = await fetch('https://overpass-api.de/api/interpreter', {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=UTF-8',
        },
        body: overpassQuery,
      });

      if (!response.ok) throw new Error('Could not load nearby rentals.');

      const data = await response.json();
      const nextRentals: RentalPlace[] = (data.elements ?? [])
        .map((element: any) => {
          const latValue = element.lat ?? element.center?.lat;
          const lonValue = element.lon ?? element.center?.lon;

          if (typeof latValue !== 'number' || typeof lonValue !== 'number') return null;

          const tags = element.tags ?? {};
          const type =
            tags.amenity === 'real_estate_agent'
              ? 'Real estate'
              : tags.tourism === 'apartment'
                ? 'Apartment'
                : 'Apartments';

          return {
            id: `${element.type}-${element.id}`,
            name: tags.name || 'Unnamed listing',
            type,
            position: [latValue, lonValue] as [number, number],
          };
        })
        .filter(Boolean);

      setRentals(nextRentals);
      if (!nextRentals.length) setError('No rentals found in this range. Try a larger distance.');
    } catch (err) {
      setError('Unable to fetch rentals right now. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUseMyLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported on this device.');
      return;
    }

    setIsLocating(true);
    setError('');

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const nextCenter: [number, number] = [position.coords.latitude, position.coords.longitude];
        setUserPosition(nextCenter);
        setIsLocating(false);
      },
      () => {
        setError('Location permission denied. Showing default area.');
        setIsLocating(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  useEffect(() => {
    handleUseMyLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchNearbyRentals(userPosition, radius);
  }, [userPosition, radius]);

  return (
    <div className="bg-white relative h-screen w-full max-w-md mx-auto">
      {/* Top-left Controls */}
      <div className="absolute top-6 left-6 z-[1000] w-[230px] bg-white/95 rounded-[15px] px-3 py-3 shadow-md">
        <div className="flex items-center justify-between mb-2">
          <button className="p-1">
            <Menu className="size-6" />
          </button>
          <button
            onClick={handleUseMyLocation}
            className="bg-[#d9d9d9] rounded-[10px] px-2 h-[28px] flex items-center gap-1 text-[11px] font-['ABC_Diatype_Edu:Regular',sans-serif]"
          >
            {isLocating ? <Loader2 className="size-3 animate-spin" /> : <LocateFixed className="size-3" />}
            Locate
          </button>
        </div>

        <div className="bg-[#f4f4f4] h-[34px] rounded-[12px] px-3 flex items-center mb-2">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search rentals"
            className="bg-transparent font-['ABC_Diatype_Edu:Thin',sans-serif] text-[13px] text-black outline-none w-full"
          />
        </div>

        <div className="flex items-center gap-2 mb-1">
          <p className="font-['ABC_Diatype_Edu:Regular',sans-serif] text-[12px] text-black shrink-0">Distance</p>
          <select
            value={radius}
            onChange={(e) => setRadius(Number(e.target.value))}
            className="bg-[#f4f4f4] h-[30px] rounded-[10px] px-2 text-[12px] font-['ABC_Diatype_Edu:Regular',sans-serif] outline-none w-full"
          >
            {DISTANCE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <p className="font-['ABC_Diatype_Edu:Thin',sans-serif] text-[11px] text-black">
          {isLoading ? 'Loading nearby rentals...' : `${filteredRentals.length} places found`}
        </p>
        {error ? (
          <p className="font-['ABC_Diatype_Edu:Thin',sans-serif] text-[11px] text-red-700 mt-1">{error}</p>
        ) : null}
      </div>

      {/* Map */}
      <MapContainer
        key={`${userPosition[0]}-${userPosition[1]}`}
        center={userPosition}
        zoom={14}
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={userPosition} icon={icon}>
          <Popup>
            <div className="p-1">
              <p className="font-['ABC_Diatype_Edu:Regular',sans-serif] text-[14px]">Your location</p>
            </div>
          </Popup>
        </Marker>

        {filteredRentals.map((apartment) => (
          <Marker key={apartment.id} position={apartment.position} icon={icon}>
            <Popup>
              <div className="p-2">
                <h3 className="font-['ABC_Diatype_Edu:Regular',sans-serif] text-[16px] font-semibold mb-1">
                  {apartment.name}
                </h3>
                <p className="font-['ABC_Diatype_Edu:Thin',sans-serif] text-[12px] mb-1">
                  {apartment.type}
                </p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      <BottomNav />
    </div>
  );
}
