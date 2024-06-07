import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './assets/index.css'
import './assets/mailbox.css'
import './assets/contacts.css'

// Import the layouts
import RootLayout from './layouts/root-layout';
import HomeLayout from './layouts/home-layout.jsx';

// Import the routes
import HomePage from './routes/home.jsx';
import SignInPage from './routes/sign-in.jsx';
import MailPage from './routes/mail.jsx';
import ContactsPage from './routes/contacts.jsx';

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/mailbox", element: <MailPage /> },
      { path: "/contacts", element: <ContactsPage /> },
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
