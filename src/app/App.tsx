import { RouterProvider } from 'react-router';
import { router } from './routes';
import { UserProvider } from './context/UserContext';

function App() {
  return (
    <UserProvider>
      <div className="phone-mockup-shell">
        <div className="phone-mockup-frame" aria-hidden="true" />
        <div className="phone-mockup-screen">
          <RouterProvider router={router} />
        </div>
      </div>
    </UserProvider>
  );
}

export default App;