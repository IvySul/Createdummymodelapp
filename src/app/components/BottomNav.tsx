import { useNavigate, useLocation } from 'react-router';
import matchesNavArtboard from '../../assets/matches-artboard-nav.png';

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[5000] flex justify-center pointer-events-auto">
      <div className="w-full max-w-md relative">
        <img src={matchesNavArtboard} alt="" aria-hidden="true" className="w-full h-auto block select-none pointer-events-none" />
        <button
          onClick={() => navigate('/matches')}
          className="absolute left-[4%] bottom-[6%] h-[78%] w-[20%]"
          aria-label="Matches"
        />
        <button
          onClick={() => navigate('/map')}
          className="absolute left-[28%] bottom-[6%] h-[78%] w-[20%]"
          aria-label="Map"
        />
        <button
          onClick={() => navigate('/messages')}
          className="absolute left-[52%] bottom-[6%] h-[78%] w-[20%]"
          aria-label="Messages"
        />
        <button
          onClick={() => navigate('/profile')}
          className="absolute left-[76%] bottom-[6%] h-[78%] w-[20%]"
          aria-label="Profile"
        />
        <div
          className={`absolute bottom-[6%] h-[2px] bg-black/60 transition-all duration-150 ${
            location.pathname === '/matches'
              ? 'left-[7%] w-[14%]'
              : location.pathname === '/map'
              ? 'left-[31%] w-[14%]'
              : location.pathname === '/messages' || location.pathname.startsWith('/messages/chat')
              ? 'left-[55%] w-[14%]'
              : 'left-[79%] w-[14%]'
          }`}
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
