import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LogOut, Bell, Settings } from 'lucide-react';

const Header: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <h2 className="text-2xl font-bold text-gray-800">Welcome, {user?.name}</h2>
          <div className="flex items-center">
            <button className="p-2 rounded-full text-gray-400 hover:text-gray-500">
              <Bell size={20} />
            </button>
            <Link to="/profile" className="p-2 rounded-full text-gray-400 hover:text-gray-500 ml-2">
              <Settings size={20} />
            </Link>
            <button onClick={logout} className="ml-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors flex items-center">
              <LogOut size={18} className="mr-2" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;