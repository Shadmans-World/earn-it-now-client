import { Navigate, useLocation } from 'react-router-dom';
import useProvider from '../Hooks/useProvider';
import useDbUser from '../Hooks/useDbUser';

const AdminRoutes = ({ children }) => {
  const { user, loading } = useProvider();
  const location = useLocation();
  const [, currentUser] = useDbUser();

  if (loading) {
    // Show a loading spinner or message while authentication is being checked
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner text-neutral"></span>
        <p className="ml-2">Checking authentication...</p>
      </div>
    );
  }

  // Redirect to login if not logged in
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Redirect to a "Not Authorized" page or home if the user is not an admin
  if (currentUser?.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  // If logged in and an admin, render the children
  return children;
};

export default AdminRoutes;
