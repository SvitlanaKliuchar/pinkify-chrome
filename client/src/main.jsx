import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './assets/styles/index.css'
import './assets/styles/mailbox.css'
import './assets/styles/contacts.css'
import './assets/styles/mini-games.css'
import './assets/styles/send-drawing.css'




// Import the layouts
import RootLayout from './layouts/root-layout';
import HomeLayout from './layouts/home-layout.jsx';

// Import the routes
import HomePage from './routes/home.jsx';
import Playlist from './routes/playlist.jsx'
import SignInPage from './routes/sign-in.jsx';
import MailPage from './routes/mail.jsx';
import ContactsPage from './routes/contacts.jsx';
import DoodleJump from './routes/doodle-jump.jsx';
import WordSearch from './routes/word-search.jsx';
import Sudoku from './routes/sudoku.jsx';
import TwoZeroFourEight from './routes/game2048.jsx';
import SendDrawingPage from './routes/send-drawing.jsx';
import MiniGamesGreetPage from './routes/mini-games-greet.jsx';
import MiniGamesPage from './routes/mini-games.jsx';



const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/build-playlist", element: <Playlist /> },
      { path: "/mailbox", element: <MailPage /> },
      { path: "/contacts", element: <ContactsPage /> },
      { path: "/mini-games-greet", element: <MiniGamesGreetPage /> },
      { path: "/mini-games", element: <MiniGamesPage /> },
      { path: "/doodle-jump", element: <DoodleJump /> },
      { path: "/word-search", element: <WordSearch /> },
      { path: "/sudoku", element: <Sudoku /> },
      { path: "/2048", element: <TwoZeroFourEight /> },
      { path: "/send-drawing", element: <SendDrawingPage /> },
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
