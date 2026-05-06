import { useEffect } from 'react';
import { useLocation } from 'react-router';

/**
 * Scrolls the window to the top on real route navigations only.
 * Uses `location.key` so opening controls (e.g. Radix Select) never bumps scroll.
 */
export function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [location.key]);

  return null;
}
