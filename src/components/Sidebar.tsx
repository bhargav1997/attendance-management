import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Users, Calendar, FileText, User } from 'lucide-react';

const Sidebar: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="bg-gray-800 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out">
      <NavLink to="/dashboard" className="text-white flex items-center space-x-2 px-4">
        <Calendar className="h-8 w-8" />
        <span className="text-2xl font-extrabold">AttendanceApp</span>
      </NavLink>
      <nav>
        {user?.role === 'admin' && (
          <NavLink to="/admin" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">
            <Users className="inline-block mr-2" size={20} />
            Manage SubAdmins
          </NavLink>
        )}
        <NavLink to="/events" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">
          <Calendar className="inline-block mr-2" size={20} />
          Events
        </NavLink>
        <NavLink to="/report" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">
          <FileText className="inline-block mr-2" size={20} />
          Reports
        </NavLink>
        <NavLink to="/profile" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">
          <User className="inline-block mr-2" size={20} />
          Profile
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;