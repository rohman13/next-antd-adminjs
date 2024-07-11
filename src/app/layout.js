'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { Spin } from 'antd';
import LoginPage from './login/page';
import { auth } from './utils/firebase';
import MainLayout from './components/MainLayout/MainLayout';

// Import globals.css
import './globals.css';
import './page.module.css';
import Login from './components/authentification/Login';

export default function RootLayout({ children }) {
  const [session, setSession] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setSession(user);
      } else {
        setSession(null);
      }
      setIsLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // console.log("session", session);
  }, [session]);

  return (
    <html lang="en">
      <body>
        {isLoading ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f0f2f5' }}>
            <Spin size="large" />
          </div>
        ) : !session ? (
          <Login isLoading={isLoading} />
        ) : (
          <MainLayout session={session}>
            {children}
          </MainLayout>
        )}
      </body>
    </html>
  );
}
