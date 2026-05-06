import { useEffect } from 'react';
import { useLocation } from 'react-router';

/**
 * Scrolls the window to the top whenever the primary location changes
 * (new screen). Matches hash-router navigation without preserving scroll.
 */
export function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [location.pathname, location.search]);

  return null;
}
