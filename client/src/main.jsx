import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './assets/index.css'

// Import the layouts
import RootLayout from './layouts/root-layout';
import HomeLayout from './layouts/home-layout.jsx';

// Import the routes
import HomePage from './routes/home.jsx';
import SignInPage from './routes/sign-in.jsx';

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/sign-in/*", element: <SignInPage /> },
      {
        element: <HomeLayout />,
        path: "home",
        children: [
          { path: "", element: <HomePage /> },
        ]
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
