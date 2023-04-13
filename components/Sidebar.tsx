import React from 'react';
import Link from 'next/link';
import sidebarStyles from './Sidebar.module.css';

interface SidebarProps {
  open: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ open }) => {
  return (
    <aside className={`${sidebarStyles.sidebar} ${open ? sidebarStyles.open : ''}`}>
      <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>
      <nav className="space-y-4">
        <Link href="/">
          <div className="flex items-center space-x-2 cursor-pointer">
            <svg className="w-6 h-6" viewBox="0 0 24 24">
              <path fill="currentColor" d="M3,13H21V11H3V13Z" />
              <path fill="currentColor" d="M3,18H21V16H3V18Z" />
              <path fill="currentColor" d="M3,6V8H21V6H3Z" />
            </svg>
            <span>Home</span>
          </div>
        </Link>
        <Link href="/profile">
          <div className="flex items-center space-x-2 cursor-pointer">
            <svg className="w-6 h-6" viewBox="0 0 24 24">
              <path fill="currentColor" d="M12,12A5,5 0 0,1 17,17A5,5 0 0,1 12,22A5,5 0 0,1 7,17A5,5 0 0,1 12,12M12,14A3,3 0 0,0 9,17A3,3 0 0,0 12,20A3,3 0 0,0 15,17A3,3 0 0,0 12,14Z" />
              <path fill="currentColor" d="M18,8H20V10H18V8M18,2H20V4H18V2M18,14H20V16H18V14M4,8H6V10H4V8M4,14H6V16H4V14M12,2A2,2 0 0,1 14,4A2,2 0 0,1 12,6A2,2 0 0,1 10,4A2,2 0 0,1 12,2M4,2H6V4H4V2Z" />
            </svg>
            <span>Profile</span>
          </div>
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
