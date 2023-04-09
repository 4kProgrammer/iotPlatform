import React from 'react';
import Sidebar from './Sidebar';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div dir="rtl" className="min-h-screen flex">
      <Sidebar />
      <main className="w-full">{children}</main>
    </div>
  );
};

export default Layout;