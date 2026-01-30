import AdminDashboard from "@/components/AdminDashboard";
import { Helmet } from 'react-helmet-async';

const AdminDashboardPage = () => {
  return (
    <>
      <Helmet>
        <title>Admin Dashboard - CAP 360 Management Portal</title>
        <meta name="description" content="Secure admin dashboard for CAP 360 team to manage services, view analytics, and handle client information." />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href="https://cap360.com/admin" />
      </Helmet>
      <AdminDashboard />
    </>
  );
};

export default AdminDashboardPage;
