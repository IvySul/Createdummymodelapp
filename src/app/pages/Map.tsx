import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Menu } from 'lucide-react';
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

// Sample apartments near University of Tennessee, Knoxville
const apartments = [
  {
    id: 1,
    name: 'The Standard',
    address: '1900 Melrose Ave',
    price: 850,
    position: [35.9539, -83.9288] as [number, number],
  },
  {
    id: 2,
    name: 'GrandMarc',
    address: '2009 Grand Ave',
    price: 920,
    position: [35.9560, -83.9310] as [number, number],
  },
  {
    id: 3,
    name: 'The Knox',
    address: '1307 Clinch Ave',
    price: 780,
    position: [35.9626, -83.9200] as [number, number],
  },
  {
    id: 4,
    name: 'The Nine',
    address: '1916 Melrose Pl',
    price: 890,
    position: [35.9545, -83.9295] as [number, number],
  },
  {
    id: 5,
    name: 'Campus Vue',
    address: '1522 Highland Ave',
    price: 810,
    position: [35.9580, -83.9250] as [number, number],
  },
  {
    id: 6,
    name: 'The Fort',
    address: '1115 17th St',
    price: 950,
    position: [35.9640, -83.9320] as [number, number],
  },
];

export default function Map() {
  return (
    <div className="bg-white relative h-screen w-full">
      {/* Header with Menu */}
      <div className="absolute top-8 left-6 z-[1000] bg-white rounded-lg shadow-md p-2">
        <button className="p-2">
          <Menu className="size-9" />
        </button>
      </div>

      {/* Search Bar */}
      <div className="absolute top-8 left-20 right-6 z-[1000]">
        <div className="bg-[#f4f4f4] h-[37px] rounded-[15px] px-4 flex items-center max-w-[184px]">
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent font-['ABC_Diatype_Edu:Thin',sans-serif] text-[14px] text-black outline-none w-full"
          />
        </div>
      </div>

      {/* Map */}
      <MapContainer
        center={[35.9544, -83.9295]}
        zoom={14}
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {apartments.map((apartment) => (
          <Marker key={apartment.id} position={apartment.position} icon={icon}>
            <Popup>
              <div className="p-2">
                <h3 className="font-['ABC_Diatype_Edu:Regular',sans-serif] text-[16px] font-semibold mb-1">
                  {apartment.name}
                </h3>
                <p className="font-['ABC_Diatype_Edu:Thin',sans-serif] text-[12px] mb-1">
                  {apartment.address}
                </p>
                <p className="font-['ABC_Diatype_Edu:Regular',sans-serif] text-[14px] text-green-600">
                  ${apartment.price}/month
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
