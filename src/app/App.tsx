import { useEffect, useState } from 'react';
import { RouterProvider } from 'react-router';
import { router } from './routes';
import { UserProvider } from './context/UserContext';
import { StartupSplashOverlay } from './components/StartupSplashOverlay';

const SPLASH_DURATION_MS = 2100;

function App() {
  const [showStartupSplash, setShowStartupSplash] = useState(true);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setShowStartupSplash(false);
    }, SPLASH_DURATION_MS);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, []);

  return (
    <UserProvider>
      <RouterProvider router={router} />
      <StartupSplashOverlay visible={showStartupSplash} />
    </UserProvider>
  );
}

export default App;