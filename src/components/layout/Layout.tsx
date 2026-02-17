import React from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen">
      <Sidebar />
      <main className="lg:ml-64 min-h-screen pb-24 lg:pb-8">
        <div className="max-w-5xl mx-auto px-4 md:px-8 pt-8">
          <Header />
          {children}
        </div>
      </main>
    </div>
  );
};
