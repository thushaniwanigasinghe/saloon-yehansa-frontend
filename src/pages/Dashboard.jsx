import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, Trash2, } from 'lucide-react';

const Dashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('userInfo'));

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    if (user.role === 'admin') {
      navigate('/admin');
      return;
    }

    const fetchAppointments = async () => {
      try {
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        const { data } = await axios.get('http://localhost:5000/api/appointments/myappointments', config);
        setAppointments(data);
      } catch (error) {
        console.error('Error fetching appointments', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [navigate, user]);

  const cancelAppointment = async (id) => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      try {
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        await axios.put(`http://localhost:5000/api/appointments/${id}`, { status: 'cancelled' }, config);
        
        // Update local state
        setAppointments(appointments.map(app => app._id === id ? { ...app, status: 'cancelled' } : app));
      } catch (error) {
        console.error('Error cancelling appointment', error);
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20';
      case 'approved': return 'text-green-500 bg-green-500/10 border-green-500/20';
      case 'cancelled': return 'text-red-500 bg-red-500/10 border-red-500/20';
      case 'completed': return 'text-blue-500 bg-blue-500/10 border-blue-500/20';
      default: return 'text-gray-500 bg-gray-500/10 border-gray-500/20';
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 bg-stone-50 dark:bg-neutral-950 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <h1 className="text-3xl font-light text-stone-900 dark:text-white tracking-widest uppercase">My <span className="font-serif italic text-yellow-500 lowercase">Dashboard</span></h1>
          <p className="text-stone-600 dark:text-gray-400 mt-2">Welcome back, {user?.name}</p>
        </div>

        <div className="bg-white dark:bg-white/5 shadow-sm dark:shadow-none border border-stone-200 dark:border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl">
          <h2 className="text-xl font-medium text-stone-900 dark:text-white mb-6 border-b border-stone-200 dark:border-white/10 pb-4">Upcoming Appointments</h2>
          
          {loading ? (
             <div className="flex justify-center py-12"><div className="w-10 h-10 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin"></div></div>
          ) : appointments.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-stone-600 dark:text-gray-400 mb-4">You have no appointments yet.</p>
              <button onClick={() => navigate('/services')} className="bg-yellow-500 text-black px-6 py-2 rounded-full font-bold uppercase tracking-widest hover:bg-black hover:text-white dark:hover:bg-yellow-500 dark:hover:text-black transition-colors">
                Book Now
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {appointments.map((app) => (
                <div key={app._id} className="bg-white dark:bg-neutral-900 border border-stone-200 dark:border-white/10 rounded-2xl p-6 hover:bg-stone-50 dark:hover:bg-white/5 transition-all duration-300">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-medium text-stone-900 dark:text-white">{app.serviceId?.name || 'Service Removed'}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${getStatusColor(app.status)}`}>
                      {app.status}
                    </span>
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-stone-600 dark:text-gray-400 text-sm">
                      <Calendar size={16} className="mr-2 text-yellow-500" />
                      {new Date(app.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </div>
                    <div className="flex items-center text-stone-600 dark:text-gray-400 text-sm">
                      <Clock size={16} className="mr-2 text-yellow-500" />
                      {app.time}
                    </div>
                  </div>
                  
                  {app.status === 'pending' || app.status === 'approved' ? (
                    <button 
                      onClick={() => cancelAppointment(app._id)}
                      className="w-full flex items-center justify-center gap-2 py-2 rounded-xl border border-red-500/50 text-red-500 hover:bg-red-500 hover:text-stone-900 dark:hover:text-white transition-colors text-sm font-medium uppercase tracking-widest"
                    >
                      <Trash2 size={16} /> Cancel
                    </button>
                  ) : (
                    <div className="w-full py-2 rounded-xl border border-stone-200 dark:border-white/5 text-gray-500 text-center text-sm font-medium uppercase tracking-widest">
                      {app.status}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
