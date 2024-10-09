import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Navigate, Link } from 'react-router-dom';
import { UserPlus, Trash2, Calendar, Edit2 } from 'lucide-react';
import { useForm } from 'react-hook-form';

interface Person {
  id: string;
  name: string;
  email: string;
  department: string;
}

const SubAdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const [people, setPeople] = useState<Person[]>([
    { id: '1', name: 'Alice Johnson', email: 'alice@example.com', department: 'HR' },
    { id: '2', name: 'Bob Williams', email: 'bob@example.com', department: 'IT' },
  ]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const { register, handleSubmit, reset, setValue } = useForm<Person>();

  if (!user || user.role !== 'subadmin') {
    return <Navigate to="/" />;
  }

  const onSubmit = (data: Person) => {
    if (editingId) {
      setPeople(people.map(person => person.id === editingId ? { ...data, id: editingId } : person));
      setEditingId(null);
    } else {
      const id = (people.length + 1).toString();
      setPeople([...people, { ...data, id }]);
    }
    reset();
  };

  const handleEdit = (person: Person) => {
    setEditingId(person.id);
    setValue('name', person.name);
    setValue('email', person.email);
    setValue('department', person.department);
  };

  const handleRemove = (id: string) => {
    setPeople(people.filter(person => person.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Sub-Admin Dashboard</h1>
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">{editingId ? 'Edit Person' : 'Add New Person'}</h2>
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
            <label htmlFor="department" className="block text-sm font-medium text-gray-700">Department</label>
            <input
              type="text"
              id="department"
              {...register('department', { required: true })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors flex items-center justify-center">
            {editingId ? <><Edit2 size={18} className="mr-2" /> Update Person</> : <><UserPlus size={18} className="mr-2" /> Add Person</>}
          </button>
        </form>
      </div>
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">People</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {people.map((person) => (
                <tr key={person.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{person.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{person.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{person.department}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button onClick={() => handleEdit(person)} className="text-indigo-600 hover:text-indigo-900 mr-4">
                      <Edit2 size={18} />
                    </button>
                    <button onClick={() => handleRemove(person.id)} className="text-red-600 hover:text-red-900">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Event Management</h2>
        <Link to="/events" className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors flex items-center justify-center">
          <Calendar size={18} className="mr-2" />
          Manage Events
        </Link>
      </div>
    </div>
  );
};

export default SubAdminDashboard;