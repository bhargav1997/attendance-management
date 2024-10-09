import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { Users, Calendar, FileText, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', attendees: 400 },
  { name: 'Feb', attendees: 300 },
  { name: 'Mar', attendees: 500 },
  { name: 'Apr', attendees: 280 },
  { name: 'May', attendees: 390 },
  { name: 'Jun', attendees: 430 },
];

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/" />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center">
          <Users className="h-10 w-10 text-blue-500 mr-4" />
          <div>
            <p className="text-sm text-gray-500 uppercase">Total Users</p>
            <p className="text-2xl font-semibold">1,234</p>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center">
          <Calendar className="h-10 w-10 text-green-500 mr-4" />
          <div>
            <p className="text-sm text-gray-500 uppercase">Events This Month</p>
            <p className="text-2xl font-semibold">12</p>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center">
          <FileText className="h-10 w-10 text-yellow-500 mr-4" />
          <div>
            <p className="text-sm text-gray-500 uppercase">Reports Generated</p>
            <p className="text-2xl font-semibold">45</p>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center">
          <TrendingUp className="h-10 w-10 text-purple-500 mr-4" />
          <div>
            <p className="text-sm text-gray-500 uppercase">Attendance Rate</p>
            <p className="text-2xl font-semibold">87%</p>
          </div>
        </div>
      </div>
      <div className="col-span-full bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Monthly Attendance Overview</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="attendees" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;