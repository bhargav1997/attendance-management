import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { Calendar, Users, FileText, Download } from 'lucide-react';
import { format } from 'date-fns';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface AttendanceRecord {
  eventId: string;
  eventName: string;
  date: string;
  attendees: string[];
}

const AttendanceReport: React.FC = () => {
  const { user } = useAuth();
  const [attendanceRecords] = useState<AttendanceRecord[]>([
    { eventId: '1', eventName: 'Team Meeting', date: '2024-03-15', attendees: ['Alice', 'Bob', 'Charlie'] },
    { eventId: '2', eventName: 'Project Kickoff', date: '2024-03-20', attendees: ['David', 'Eve', 'Frank'] },
    { eventId: '3', eventName: 'Training Session', date: '2024-03-25', attendees: ['Alice', 'Charlie', 'David', 'Eve'] },
    { eventId: '4', eventName: 'Department Sync', date: '2024-03-30', attendees: ['Bob', 'Frank', 'George'] },
  ]);

  if (!user) {
    return <Navigate to="/" />;
  }

  const chartData = attendanceRecords.map(record => ({
    name: record.eventName,
    attendees: record.attendees.length
  }));

  const generateCSV = () => {
    const headers = ['Event Name', 'Date', 'Attendees'];
    const rows = attendanceRecords.map(record => [
      record.eventName,
      record.date,
      record.attendees.join(', ')
    ]);
    const csvContent = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', 'attendance_report.csv');
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Attendance Report</h1>
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Attendance Overview</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="attendees" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Event Attendance Details</h2>
          <button
            onClick={generateCSV}
            className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors flex items-center"
          >
            <Download size={18} className="mr-2" />
            Export CSV
          </button>
        </div>
        {attendanceRecords.map((record) => (
          <div key={record.eventId} className="mb-6 p-4 border rounded-lg">
            <h3 className="text-lg font-semibold mb-2">{record.eventName}</h3>
            <p className="text-gray-600 flex items-center mb-2">
              <Calendar size={16} className="mr-2" />
              {format(new Date(record.date), 'MMMM d, yyyy')}
            </p>
            <p className="flex items-center mb-2">
              <Users size={16} className="mr-2" />
              {record.attendees.length} Attendees
            </p>
            <ul className="list-disc list-inside pl-4">
              {record.attendees.map((attendee, index) => (
                <li key={index}>{attendee}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AttendanceReport;