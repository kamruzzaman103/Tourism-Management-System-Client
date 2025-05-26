import AdminProfile from './AdminProfile';
import AdminStats from './AdminStats';

const AdminDashboardProfilePage = () => {
  return (
    <div>
      <AdminProfile />
      <hr className="my-6" />
      <AdminStats />
    </div>
  );
};

export default AdminDashboardProfilePage;
