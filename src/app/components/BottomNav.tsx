import { useNavigate, useLocation } from 'react-router';
import { Home, Grid3x3, MessageCircle, User } from 'lucide-react';

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: '/matches', icon: Home, label: 'R' },
    { path: '/map', icon: Grid3x3, label: 'Map' },
    { path: '/messages', icon: MessageCircle, label: 'Messages' },
    { path: '/profile', icon: User, label: 'Profile' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t-[0.5px] border-black h-[92px] flex items-center justify-around px-8">
      {/* R (Home) */}
      <button
        onClick={() => navigate('/matches')}
        className={`flex flex-col items-center justify-center ${
          location.pathname === '/matches' ? 'opacity-100' : 'opacity-60'
        }`}
      >
        <p className="font-['ABC_Diatype_Edu:Thin',sans-serif] text-[64px] text-black leading-none">
          R
        </p>
      </button>

      {/* Map/Grid */}
      <button
        onClick={() => navigate('/map')}
        className={`flex flex-col items-center justify-center ${
          location.pathname === '/map' ? 'opacity-100' : 'opacity-60'
        }`}
      >
        <div className="border border-black h-[58px] w-[44px] grid grid-cols-3 grid-rows-3 gap-[2px] p-1">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="border border-black" />
          ))}
        </div>
      </button>

      {/* Messages */}
      <button
        onClick={() => navigate('/messages')}
        className={`flex flex-col items-center justify-center ${
          location.pathname === '/messages' ? 'opacity-100' : 'opacity-60'
        }`}
      >
        <svg className="h-[48px] w-[62px]" fill="none" viewBox="0 0 62 48.4686">
          <path
            d="M 22.3473 28.8533 L 22.3471 28.8531 L 1.85285 9.29466 C 1.79774 9.24113 1.74262 9.18748 1.68749 9.13372 C 1.11857 8.56485 0.499996 7.94629 0.499996 7.18605 L 0.499996 7.186 L 0.499996 6.99999 C 0.499996 3.55099 3.29197 0.758986 6.74096 0.758986 L 55.259 0.758986 C 58.708 0.758986 61.5 3.55099 61.5 6.99999 L 61.5 41.2286 C 61.5 44.6776 58.708 47.4696 55.259 47.4696 L 6.74096 47.4696 C 3.29197 47.4696 0.499996 44.6776 0.499996 41.2286 L 0.499996 12.186 C 0.499996 11.4258 1.11857 10.8072 1.68749 10.2384 C 1.74262 10.1846 1.79774 10.131 1.85285 10.0774 L 22.3471 28.8531 L 22.3473 28.8533 C 22.6928 29.1767 23.0384 29.5 23.3839 29.8234 C 26.6636 32.8463 30.9983 32.8463 34.2779 29.8234 C 34.6235 29.5 34.969 29.1767 35.3146 28.8533 L 35.3148 28.8531 L 55.8091 9.29466 C 55.8642 9.24113 55.9193 9.18748 55.9744 9.13372 C 56.5433 8.56485 57.1619 7.94629 57.1619 7.18605 L 57.1619 7.186 L 57.1619 6.99999 C 57.1619 5.96902 56.8944 5.18605 56.3594 4.65103 C 55.8244 4.11601 55.0414 3.84851 54.0105 3.84851 L 7.98972 3.84851 C 6.95874 3.84851 6.17578 4.11601 5.64076 4.65103 C 5.10573 5.18605 4.83824 5.96902 4.83824 6.99999 C 4.83824 7.18605 4.83824 7.18605 4.83824 7.18605 C 4.83824 7.94629 5.45681 8.56485 6.02573 9.13372 C 6.08086 9.18748 6.13598 9.24113 6.19109 9.29466 L 22.3473 28.8533 Z"
            fill="white"
            stroke="black"
          />
          <circle cx="31" cy="35" r="9.5" fill="white" stroke="black" />
        </svg>
      </button>

      {/* Profile */}
      <button
        onClick={() => navigate('/profile')}
        className={`flex flex-col items-center justify-center ${
          location.pathname === '/profile' ? 'opacity-100' : 'opacity-60'
        }`}
      >
        <svg className="h-[54px] w-[52px]" fill="none" viewBox="0 0 60 62">
          <circle cx="30" cy="14" r="13.5" stroke="black" fill="none" />
          <rect height="20" rx="5.5" stroke="black" fill="none" width="51" x="4.5" y="33.5" />
        </svg>
      </button>
    </div>
  );
}
