import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header/Header';
import Footer from './Footer/Footer';
//import './Layout.module.css';


type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div dir="rtl" className="min-h-screen flex">
       <Header />
      <Sidebar />
      <main className="w-full">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;