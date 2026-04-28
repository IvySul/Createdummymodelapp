import { useNavigate, useLocation } from 'react-router';

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[5000] flex justify-center pointer-events-auto">
      <div className="w-full max-w-md bg-white border-t border-black/40 h-[64px] flex items-center justify-around px-5">
        <button
          onClick={() => navigate('/matches')}
          className={`h-full flex items-center justify-center ${
            location.pathname === '/matches' ? 'opacity-100' : 'opacity-60'
          }`}
        >
          <svg className="w-[42px] h-[34px]" viewBox="0 0 42 34" fill="none">
            <path d="M2 18L21 2L40 18" stroke="black" strokeWidth="1.3" />
            <path d="M9 18V31" stroke="black" strokeWidth="1.3" />
            <path d="M33 18V31" stroke="black" strokeWidth="1.3" />
            <path d="M15 31L21 22L27 31" stroke="black" strokeWidth="1.2" />
          </svg>
        </button>

        <button
          onClick={() => navigate('/messages')}
          className={`h-full flex items-center justify-center ${
            location.pathname === '/messages' || location.pathname.startsWith('/messages/chat')
              ? 'opacity-100'
              : 'opacity-70'
          }`}
        >
          <svg className="w-[48px] h-[32px]" viewBox="0 0 48 32" fill="none">
            <path d="M7 4H28C35 4 41 10 41 17C41 24 35 30 28 30H20L14 27L15 30H7C3.7 30 1 27.3 1 24V10C1 6.7 3.7 4 7 4Z" stroke="black" strokeWidth="1.3" />
          </svg>
        </button>

        <button
          onClick={() => navigate('/map')}
          className={`h-full flex items-center justify-center ${
            location.pathname === '/map' ? 'opacity-100' : 'opacity-70'
          }`}
        >
          <svg className="w-[28px] h-[36px]" viewBox="0 0 28 36" fill="none">
            <path d="M14 34C14 34 25 22 25 14C25 7.9 20.1 3 14 3C7.9 3 3 7.9 3 14C3 22 14 34 14 34Z" stroke="black" strokeWidth="1.3" />
            <circle cx="14" cy="14" r="4.2" stroke="black" strokeWidth="1.2" />
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
            <path d="M4 34C4.6 27.2 9.9 23 18 23C26.1 23 31.4 27.2 32 34" stroke="black" strokeWidth="1.3" />
          </svg>
        </button>
      </div>
    </div>
  );
}
