import { useNavigate, useLocation } from 'react-router';
import bottomNavArtboard from '../../assets/bottom-nav-artboard.png';

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[5000] flex justify-center pointer-events-auto">
      <div className="w-full max-w-md px-4 pb-3">
        <div className="relative w-full">
          <img
            src={bottomNavArtboard}
            alt=""
            aria-hidden="true"
            className="w-full h-auto block select-none pointer-events-none"
          />

          <div className="absolute inset-0 grid grid-cols-4">
            <button
              type="button"
              onClick={() => navigate('/matches')}
              className={`min-h-0 min-w-0 ${
                location.pathname === '/matches' ? 'opacity-100' : 'opacity-60'
              }`}
              aria-label="Matches"
            />

            <button
              type="button"
              onClick={() => navigate('/map')}
              className={`min-h-0 min-w-0 ${location.pathname === '/map' ? 'opacity-100' : 'opacity-70'}`}
              aria-label="Map"
            />

            <button
              type="button"
              onClick={() => navigate('/messages')}
              className={`min-h-0 min-w-0 ${
                location.pathname === '/messages' || location.pathname.startsWith('/messages/chat')
                  ? 'opacity-100'
                  : 'opacity-70'
              }`}
              aria-label="Messages"
            />

            <button
              type="button"
              onClick={() => navigate('/profile')}
              className={`min-h-0 min-w-0 ${location.pathname === '/profile' ? 'opacity-100' : 'opacity-70'}`}
              aria-label="Profile"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
