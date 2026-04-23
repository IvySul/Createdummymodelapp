import { useEffect, useMemo, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { Loader2 } from 'lucide-react';
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
  { label: '0.5 mi', value: 805 },
  { label: '1 mi', value: 1609 },
  { label: '2 mi', value: 3219 },
  { label: '3 mi', value: 4828 },
  { label: '5 mi', value: 8047 },
  { label: '8 mi', value: 12875 },
  { label: '10 mi', value: 16093 },
  { label: '15 mi', value: 24140 },
  { label: '20 mi', value: 32187 },
];
const OVERPASS_BASE_URLS = [
  'https://overpass-api.de/api/interpreter',
  'https://overpass.kumi.systems/api/interpreter',
  'https://overpass.openstreetmap.fr/api/interpreter',
];
const FETCH_TIMEOUT_MS = 12000;
const LOCAL_FALLBACK_RENTALS: RentalPlace[] = [
  { id: 'local-1', name: 'The Social Grand Forest', type: 'Local fallback', position: [35.9592, -83.9292] },
  { id: 'local-2', name: 'The Standard Knoxville', type: 'Local fallback', position: [35.9624, -83.9235] },
  { id: 'local-3', name: 'The Heights of Knoxville', type: 'Local fallback', position: [35.9518, -83.9388] },
  { id: 'local-4', name: 'University Park', type: 'Local fallback', position: [35.9485, -83.9219] },
  { id: 'local-5', name: 'Society 865', type: 'Local fallback', position: [35.9672, -83.9174] },
  { id: 'local-6', name: 'South Banks Flats', type: 'Local fallback', position: [35.9449, -83.9135] },
  { id: 'local-7', name: 'Marble Alley Lofts', type: 'Local fallback', position: [35.9675, -83.9192] },
  { id: 'local-8', name: 'Rand Property Rentals', type: 'Local fallback', position: [35.9558, -83.9349] },
];

function toCacheKey(center: [number, number], radiusMeters: number): string {
  return `${center[0].toFixed(4)},${center[1].toFixed(4)}:${radiusMeters}`;
}

async function fetchWithTimeout(url: string, init?: RequestInit, timeoutMs = FETCH_TIMEOUT_MS): Promise<Response> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(timeout);
  }
}

function distanceMeters(a: [number, number], b: [number, number]): number {
  const R = 6371000;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(b[0] - a[0]);
  const dLon = toRad(b[1] - a[1]);
  const lat1 = toRad(a[0]);
  const lat2 = toRad(b[0]);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.min(1, Math.sqrt(h)));
}

async function fetchOverpassJson(center: [number, number], radiusMeters: number): Promise<any> {
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

  const dataParam = encodeURIComponent(overpassQuery.replace(/\s+/g, ' ').trim());
  let lastError: unknown = null;

  for (const baseUrl of OVERPASS_BASE_URLS) {
    try {
      // Browser CORS often blocks Overpass; proxy avoids that on static hosts (GitHub Pages).
      const overpassUrl = `${baseUrl}?data=${dataParam}`;
      const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(overpassUrl)}`;
      const response = await fetchWithTimeout(proxyUrl);
      if (!response.ok) throw new Error('proxy fetch failed');
      const payload = await response.json();
      if (typeof payload.contents !== 'string' || !payload.contents.trim()) throw new Error('invalid proxy response');
      return JSON.parse(payload.contents);
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError ?? new Error('overpass unavailable');
}

async function fetchOverpassDirect(center: [number, number], radiusMeters: number): Promise<any> {
  const [lat, lon] = center;
  const directQuery = `
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

  let lastError: unknown = null;
  for (const baseUrl of OVERPASS_BASE_URLS) {
    try {
      const response = await fetchWithTimeout(baseUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=UTF-8' },
        body: directQuery,
      });
      if (!response.ok) throw new Error('direct overpass failed');
      return await response.json();
    } catch (error) {
      lastError = error;
    }
  }
  throw lastError ?? new Error('direct overpass unavailable');
}

async function fetchPhotonFallback(center: [number, number], radiusMeters: number): Promise<RentalPlace[]> {
  const [lat, lon] = center;
  const photonLimit = radiusMeters >= 16093 ? 220 : radiusMeters >= 8047 ? 160 : 100;
  const queries = ['apartment', 'housing', 'rental'];
  const seen = new Set<string>();
  const next: RentalPlace[] = [];

  for (const query of queries) {
    const url = `https://photon.komoot.io/api/?q=${encodeURIComponent(query)}&lat=${lat}&lon=${lon}&limit=${photonLimit}&lang=en`;
    const response = await fetchWithTimeout(url);
    if (!response.ok) continue;
    const data = await response.json();
    const features = data.features ?? [];
    for (let i = 0; i < features.length; i++) {
      const f = features[i];
      const coords = f.geometry?.coordinates;
      if (!Array.isArray(coords) || coords.length < 2) continue;
      const position: [number, number] = [coords[1], coords[0]];
      if (distanceMeters(center, position) > radiusMeters) continue;
      const props = f.properties ?? {};
      const name = props.name || props.street || (props.city ? `Near ${props.city}` : 'Place');
      const dedupeKey = `${position[0].toFixed(5)}:${position[1].toFixed(5)}:${String(name).toLowerCase()}`;
      if (seen.has(dedupeKey)) continue;
      seen.add(dedupeKey);
      next.push({
        id: `photon-${query}-${i}-${props.osm_id ?? coords[0]}-${coords[1]}`,
        name,
        type: props.type === 'house' ? 'Housing' : 'Nearby place',
        position,
      });
    }
  }
  if (!next.length) throw new Error('photon empty');
  return next;
}

export default function Map() {
  const [userPosition, setUserPosition] = useState<[number, number]>(DEFAULT_CENTER);
  const [radius, setRadius] = useState(2500);
  const [customMiles, setCustomMiles] = useState('');
  const [search, setSearch] = useState('');
  const [rentals, setRentals] = useState<RentalPlace[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [error, setError] = useState('');
  const [isUsingFallback, setIsUsingFallback] = useState(false);

  const filteredRentals = useMemo(() => {
    if (!search.trim()) return rentals;
    const query = search.toLowerCase();
    return rentals.filter((rental) => rental.name.toLowerCase().includes(query) || rental.type.toLowerCase().includes(query));
  }, [rentals, search]);

  const applyCustomMiles = () => {
    const miles = Number(customMiles);
    if (Number.isNaN(miles) || miles <= 0) {
      setCustomMiles('');
      return;
    }
    const clampedMiles = Math.min(50, Math.max(0.25, miles));
    setCustomMiles(String(clampedMiles));
    setRadius(Math.round(clampedMiles * 1609.34));
  };

  const fetchNearbyRentals = async (center: [number, number], radiusMeters: number) => {
    setIsLoading(true);
    setError('');
    setIsUsingFallback(false);

    const mapElements = (data: any): RentalPlace[] => {
      const seen = new Set<string>();
      return (data.elements ?? [])
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
        .filter((item: RentalPlace | null): item is RentalPlace => {
          if (!item) return false;
          const key = `${item.position[0].toFixed(5)}:${item.position[1].toFixed(5)}:${item.name.toLowerCase()}`;
          if (seen.has(key)) return false;
          seen.add(key);
          return true;
        });
    };

    try {
      let data: any;
      try {
        data = await fetchOverpassJson(center, radiusMeters);
      } catch {
        try {
          data = await fetchOverpassDirect(center, radiusMeters);
        } catch {
          data = null;
        }
      }

      let nextRentals = data ? mapElements(data) : [];

      if (!nextRentals.length) {
        nextRentals = await fetchPhotonFallback(center, radiusMeters);
      }

      setRentals(nextRentals);
      localStorage.setItem(
        'mapRentalsCache',
        JSON.stringify({
          key: toCacheKey(center, radiusMeters),
          rentals: nextRentals,
          savedAt: Date.now(),
        })
      );
      if (!nextRentals.length) {
        setError('No rentals found in this range. Try a larger distance.');
      }
    } catch (err) {
      try {
        const fallback = await fetchPhotonFallback(center, radiusMeters);
        setRentals(fallback);
        setIsUsingFallback(false);
        if (!fallback.length) setError('No places found nearby. Try increasing distance.');
      } catch {
        const cacheRaw = localStorage.getItem('mapRentalsCache');
        if (cacheRaw) {
          try {
            const cache = JSON.parse(cacheRaw);
            if (cache?.key === toCacheKey(center, radiusMeters) && Array.isArray(cache.rentals)) {
              setRentals(cache.rentals);
              setError('Live data is unavailable right now. Showing last loaded results.');
              setIsUsingFallback(false);
              return;
            }
          } catch {
            // Ignore invalid cache and keep the network error.
          }
        }
        const localFallback = LOCAL_FALLBACK_RENTALS.filter(
          (rental) => distanceMeters(center, rental.position) <= radiusMeters
        );
        if (localFallback.length) {
          setRentals(localFallback);
          setIsUsingFallback(true);
          setError('Live APIs are unavailable right now. Showing nearby fallback rentals.');
        } else {
          setRentals([]);
          setError('Unable to load nearby places. Check your connection and try again.');
        }
      }
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
        <div className="flex items-center justify-end mb-2">
          {isLocating ? (
            <div className="bg-[#d9d9d9] rounded-[10px] px-2 h-[28px] flex items-center gap-1 text-[11px] font-['ABC_Diatype_Edu:Regular',sans-serif]">
              <Loader2 className="size-3 animate-spin" />
              Locating...
            </div>
          ) : null}
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
        <div className="flex items-center gap-2 mb-1">
          <input
            type="number"
            min="0.25"
            max="50"
            step="0.25"
            value={customMiles}
            onChange={(e) => setCustomMiles(e.target.value)}
            onBlur={applyCustomMiles}
            onKeyDown={(e) => {
              if (e.key === 'Enter') e.currentTarget.blur();
            }}
            placeholder="Custom miles (0.25 - 50)"
            className="bg-[#f4f4f4] h-[30px] rounded-[10px] px-2 text-[12px] font-['ABC_Diatype_Edu:Regular',sans-serif] outline-none w-full no-number-spinner"
          />
        </div>

        <p className="font-['ABC_Diatype_Edu:Thin',sans-serif] text-[11px] text-black">
          {isLoading ? 'Loading nearby rentals...' : `${filteredRentals.length} places found`}
        </p>
        {error ? (
          <p className="font-['ABC_Diatype_Edu:Thin',sans-serif] text-[11px] text-red-700 mt-1">{error}</p>
        ) : null}
        {isUsingFallback ? (
          <p className="font-['ABC_Diatype_Edu:Thin',sans-serif] text-[11px] text-black/70 mt-1">
            Fallback data is shown until live APIs recover.
          </p>
        ) : null}
        {!isLoading ? (
          <button
            type="button"
            onClick={() => fetchNearbyRentals(userPosition, radius)}
            className="mt-2 w-full h-[28px] rounded-[9px] bg-[#f4f4f4] text-[11px] font-['ABC_Diatype_Edu:Regular',sans-serif] hover:bg-[#e9e9e9]"
          >
            Retry loading places
          </button>
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
