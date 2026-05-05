import { useLocation, useNavigate } from 'react-router';
import BottomNavArtboard from './BottomNavArtboard';

function activeRoute(pathname: string): 'matches' | 'messages' | 'map' | 'profile' | null {
  const path = pathname.replace(/\/+$/, '') || '/';
  if (path === '/matches') return 'matches';
  if (path === '/messages' || path.startsWith('/messages/chat')) return 'messages';
  if (path === '/map') return 'map';
  if (path === '/profile') return 'profile';
  return null;
}

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;
  const active = activeRoute(pathname);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[5000] flex justify-center pointer-events-auto">
      <div className="w-full max-w-md px-4 pb-3">
        <div className="relative w-full">
          <BottomNavArtboard active={active} />

          <div className="absolute inset-0 grid grid-cols-4">
            <button
              type="button"
              onClick={() => navigate('/matches')}
              className="min-h-0 min-w-0"
              aria-label="Matches"
            />

            <button
              type="button"
              onClick={() => navigate('/messages')}
              className="min-h-0 min-w-0"
              aria-label="Messages"
            />

            <button
              type="button"
              onClick={() => navigate('/map')}
              className="min-h-0 min-w-0"
              aria-label="Map"
            />

            <button
              type="button"
              onClick={() => navigate('/profile')}
              className="min-h-0 min-w-0"
              aria-label="Profile"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
