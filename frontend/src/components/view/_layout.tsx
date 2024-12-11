import React, { ReactNode } from 'react';
import Navbar from './_navbar'; // Assuming Navbar.tsx is in the same directory

interface LayoutProps {
  children: ReactNode; // Type for children elements
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="layout">
      <Navbar />
      <main className="layout-main">{children}</main>
    </div>
  );
};

export default Layout;