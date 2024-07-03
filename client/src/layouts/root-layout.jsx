import { Outlet, useNavigate, Navigate, useLocation, useNavigationType } from 'react-router-dom';
import { ClerkProvider, SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';
import Loader from '../components/loader/loader.jsx';
import { useState, useEffect } from 'react';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

export default function RootLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const navigationType = useNavigationType();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500); 

    return () => clearTimeout(timer);
  }, [location]);

  return (
    <ClerkProvider
      routerPush={(to) => navigate(to)}
      routerReplace={(to) => navigate(to, { replace: true })}
      publishableKey={PUBLISHABLE_KEY}
    >
      <header>
        <div>
          <SignedIn>
            <Navigate to="/home" replace />
          </SignedIn>
          <SignedOut>
            <Navigate to="/sign-in" replace/>
          </SignedOut>
        </div>
      </header>
      <main>
        {loading ? <Loader /> : <Outlet />}
      </main>
    </ClerkProvider>
  );
}