import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, CloudUpload, Bell, Settings, MessageSquareWarning } from 'lucide-react';
import { useSignals } from '@preact/signals-react/runtime';
import { userExists } from '@/signals/user.js';
import axios from 'axios';

export const ProdNav = () => {
  useSignals();
  const location = useLocation();

  const navItems = [
    { label: 'Dashboard', href: '/', icon: LayoutDashboard },
    { label: 'Upload Video', href: '/upload_video', icon: CloudUpload },
    { label: 'Notification', href: '/notification', icon: Bell },
    { label: 'Settings', href: '/setting', icon: Settings },
    { label: 'Report', href: '/report', icon: MessageSquareWarning }
  ];

  const logout = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_HOST}/api/auth/logout`,
        null,
        { withCredentials: true } // Enable sending cookies
      );
      if (response) {
        userExists.value = false;
      }
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex md:flex-col items-center justify-between bg-background border-t md:border-r border-gray-200 px-2 md:px-4 md:py-6 md:w-2/12 w-screen md:h-screen fixed bottom-0 md:static">
      <div className="flex justify-between w-full md:flex-col md:items-start md:gap-6">
        {navItems.map((item, index) => (
          <Link
            key={index}
            to={item.href}
            className={`flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors ${
              location.pathname === item.href ? 'text-gray-800 font-medium' : 'font-normal'
            } md:flex-row md:items-center justify-center`}>
            {<item.icon />}
            {/* <item.icon className="h-6 w-6 md:mb-1" /> */}
            <span className="hidden md:text-sm md:inline">{item.label}</span>
          </Link>
        ))}
      </div>
      <div className="md:mt-auto" onClick={logout}>
        <Button variant="outline" className="w-full md:w-auto">
          Logout
        </Button>
      </div>
    </div>
  );
};
