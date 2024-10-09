import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { Calendar, Plus, Edit2, Trash2, UserPlus, Check, X } from 'lucide-react';
import { useForm } from 'react-hook-form';

interface Person {
  id: string;
  name: string;
  email: string;
  department: string;
}

interface Event {
  id: string;
  name: string;
  date: string;
  location: string;
  description: string;
  attendees: string[];
}

const EventManagement: React.FC = () => {
  const { user } = useAuth();
  const [events, setEvents] = useState<Event[]>([
    { id: '1', name: 'Team Meeting', date: '2024-03-15', location: 'Conference Room A', description: 'Monthly team sync-up', attendees: ['1', '2'] },
    { id: '2', name: 'Project Kickoff', date: '2024-03-20', location: 'Auditorium', description: 'New project launch meeting', attendees: ['2'] },
  ]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const { register, handleSubmit, reset, setValue } = useForm<Event>();
  const [people] = useState<Person[]>([
    { id: '1', name: 'Alice Johnson', email: 'alice@example.com', department: 'HR' },
    { id: '2', name: 'Bob Williams', email: 'bob@example.com', department: 'IT' },
    { id: '3', name: 'Charlie Brown', email: 'charlie@example.com', department: 'Marketing' },
    { id: '4', name: 'David Smith', email: 'david@example.com', department: 'Finance' },
  ]);

  if (!user) {
    return <Navigate to="/" />;
  }

  const onSubmit = (data: Event) => {
    if (editingId) {
      setEvents(events.map(event => event.id === editingId ? { ...data, id: editingId, attendees: event.attendees } : event));
      setEditingId(null);
    } else {
      const id = (events.length + 1).toString();
      setEvents([...events, { ...data, id, attendees: [] }]);
    }
    reset();
  };

  const handleEdit = (event: Event) => {
    setEditingId(event.id);
    setValue('name', event.name);
    setValue('date', event.date);
    setValue('location', event.location);
    setValue('description', event.description);
  };

  const handleRemove = (id: string) => {
    setEvents(events.filter(event => event.id !== id));
  };

  const toggleAttendee = (eventId: string, personId: string) => {
    setEvents(events.map(event => {
      if (event.id === eventId) {
        const attendees = event.attendees.includes(personId)
          ? event.attendees.filter(id => id !== personId)
          : [...event.attendees, personId];
        return { ...event, attendees };
      }
      return event;
    }));
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Event Management</h1>
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">{editingId ? 'Edit Event' : 'Add New Event'}</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Event Name</label>
            <input
              type="text"
              id="name"
              {...register('name', { required: true })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
            <input
              type="date"
              id="date"
              {...register('date', { required: true })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
            <input
              type="text"
              id="location"
              {...register('location', { required: true })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              id="description"
              {...register('description')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              rows={3}
            ></textarea>
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors flex items-center justify-center">
            {editingId ? <><Edit2 size={18} className="mr-2"/> Update Event</> : <><Plus size={18} className="mr-2" /> Add Event</>}
          </button>
        </form>
      </div>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Events</h2>
        {events.map((event) => (
          <div key={event.id} className="mb-6 p-4 border rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold">{event.name}</h3>
              <div>
                <button onClick={() => handleEdit(event)} className="text-indigo-600 hover:text-indigo-900 mr-2">
                  <Edit2 size={18} />
                </button>
                <button onClick={() => handleRemove(event.id)} className="text-red-600 hover:text-red-900">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
            <p className="text-gray-600 flex items-center mb-2">
              <Calendar size={16} className="mr-2" />
              {event.date}
            </p>
            <p className="text-gray-600 mb-2"><strong>Location:</strong> {event.location}</p>
            <p className="text-gray-600 mb-4">{event.description}</p>
            <h4 className="font-medium mb-2">Attendees:</h4>
            <div className="grid grid-cols-2 gap-2">
              {people.map(person => (
                <div key={person.id} className="flex items-center justify-between bg-gray-100 p-2 rounded">
                  <span>{person.name}</span>
                  <button
                    onClick={() => toggleAttendee(event.id, person.id)}
                    className={`p-1 rounded ${
                      event.attendees.includes(person.id)
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-300 text-gray-700'
                    }`}
                  >
                    {event.attendees.includes(person.id) ? (
                      <Check size={16} />
                    ) : (
                      <UserPlus size={16} />
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventManagement;