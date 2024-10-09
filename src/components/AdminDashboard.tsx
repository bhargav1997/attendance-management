import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { UserPlus, Trash2, Edit2 } from 'lucide-react';
import { useForm } from 'react-hook-form';

interface SubAdmin {
  id: string;
  name: string;
  email: string;
  role: string;
}

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const [subAdmins, setSubAdmins] = useState<SubAdmin[]>([
    { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Event Manager' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'Attendance Tracker' },
  ]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const { register, handleSubmit, reset, setValue } = useForm<SubAdmin>();

  if (!user || user.role !== 'admin') {
    return <Navigate to="/" />;
  }

  const onSubmit = (data: SubAdmin) => {
    if (editingId) {
      setSubAdmins(subAdmins.map(admin => admin.id === editingId ? { ...data, id: editingId } : admin));
      setEditingId(null);
    } else {
      const id = (subAdmins.length + 1).toString();
      setSubAdmins([...subAdmins, { ...data, id }]);
    }
    reset();
  };

  const handleEdit = (admin: SubAdmin) => {
    setEditingId(admin.id);
    setValue('name', admin.name);
    setValue('email', admin.email);
    setValue('role', admin.role);
  };

  const handleRemove = (id: string) => {
    setSubAdmins(subAdmins.filter(admin => admin.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">{editingId ? 'Edit Sub-Admin' : 'Add New Sub-Admin'}</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              {...register('name', { required: true })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              {...register('email', { required: true })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
            <input
              type="text"
              id="role"
              {...register('role', { required: true })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors flex items-center justify-center">
            {editingId ? <><Edit2 size={18} className="mr-2" /> Update Sub-Admin</> : <><UserPlus size={18} className="mr-2" /> Add Sub-Admin</>}
          </button>
        </form>
      </div>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Sub-Admins</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {subAdmins.map((admin) => (
                <tr key={admin.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{admin.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{admin.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{admin.role}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button onClick={() => handleEdit(admin)} className="text-indigo-600 hover:text-indigo-900 mr-4">
                      <Edit2 size={18} />
                    </button>
                    <button onClick={() => handleRemove(admin.id)} className="text-red-600 hover:text-red-900">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;