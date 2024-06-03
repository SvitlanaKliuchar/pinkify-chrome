import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

// Import the layouts
import RootLayout from './layouts/root-layout';
import MainLayout from './layouts/main-layout';

// Import the components
import IndexPage from './routes';
import ContactPage from './routes/contacts';
import SignInPage from './routes/sign-in';
import SignUpPage from './routes/sign-up';
import MainPage from './routes/main';

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: "/", element: <IndexPage /> },
      { path: "/contact", element: <ContactPage /> },
      { path: "/sign-in/*", element: <SignInPage /> },
      { path: "/sign-up/*", element: <SignUpPage /> },
      {
        element: <MainLayout />,
        path: "main",
        children: [
          { path: "/main", element: <MainPage /> },
          // { path: "/dashboard/invoices", element: <InvoicesPage /> }
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
