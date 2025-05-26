import { useEffect, useState } from 'react';
import axios from 'axios';

const AdminStats = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/admin/stats').then(res => setStats(res.data));
  }, []);

  if (!stats) return <div className="text-center mt-10">Loading stats...</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      <StatCard label="Total Payment" value={`$${(stats.totalPayment ?? 0).toFixed(2)}`} color="bg-green-500" />
      <StatCard label="Total Tour Guides" value={stats.totalTourGuides} color="bg-blue-500" />
      <StatCard label="Total Clients" value={stats.totalClients} color="bg-purple-500" />
      <StatCard label="Total Packages" value={stats.totalPackages} color="bg-orange-500" />
      <StatCard label="Total Stories" value={stats.totalStories} color="bg-pink-500" />
    </div>
  );
};

const StatCard = ({ label, value, color }) => (
  <div className={`rounded-lg p-6 shadow text-white ${color}`}>
    <h4 className="text-lg">{label}</h4>
    <p className="text-2xl font-bold mt-2">{value}</p>
  </div>
);

export default AdminStats;
