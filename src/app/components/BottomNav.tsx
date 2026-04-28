import { useNavigate, useLocation } from 'react-router';

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="matches-exact-font fixed bottom-0 left-0 right-0 z-[5000] flex justify-center pointer-events-auto">
      <div className="w-full max-w-md bg-[#dcdcdc] border-t border-black/45 h-[64px] flex items-center justify-around px-5">
        <button
          onClick={() => navigate('/matches')}
          className={`h-full flex items-center justify-center ${
            location.pathname === '/matches' ? 'opacity-100' : 'opacity-60'
          }`}
        >
          <span className="text-[64px] leading-none font-light text-black -mt-2">R</span>
        </button>

        <button
          onClick={() => navigate('/map')}
          className={`h-full flex items-center justify-center ${
            location.pathname === '/map' ? 'opacity-100' : 'opacity-70'
          }`}
        >
          <div className="border border-black h-[48px] w-[44px] grid grid-cols-3 grid-rows-3 gap-[2px] p-[4px]">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="border border-black" />
            ))}
          </div>
        </button>

        <button
          onClick={() => navigate('/messages')}
          className={`h-full flex items-center justify-center ${
            location.pathname === '/messages' || location.pathname.startsWith('/messages/chat')
              ? 'opacity-100'
              : 'opacity-70'
          }`}
        >
          <svg className="w-[48px] h-[34px]" viewBox="0 0 48 34" fill="none">
            <ellipse cx="23" cy="15" rx="17" ry="12" stroke="black" strokeWidth="1.2" />
            <path d="M31 24L28 31L36 24" stroke="black" strokeWidth="1.2" />
          </svg>
        </button>

        <button
          onClick={() => navigate('/profile')}
          className={`h-full flex items-center justify-center ${
            location.pathname === '/profile' ? 'opacity-100' : 'opacity-70'
          }`}
        >
          <svg className="w-[36px] h-[36px]" fill="none" viewBox="0 0 36 36">
            <circle cx="18" cy="10.5" r="7.5" stroke="black" strokeWidth="1.3" />
            <rect x="3.5" y="22.5" width="29" height="11" rx="4" stroke="black" strokeWidth="1.2" />
          </svg>
        </button>
      </div>
    </div>
  );
}
