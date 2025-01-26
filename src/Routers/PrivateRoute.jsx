

import { Navigate, useLocation } from 'react-router-dom';
import useProvider from '../Hooks/useProvider';




const PrivateRoute = ({ children }) => {
  const { user, loading } =  useProvider()
  const location = useLocation();

  if (loading) {
    // You can provide a more descriptive message during loading
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner text-neutral"></span>
        <p className="ml-2">Checking authentication...</p>
      </div>
    );
  }

  // If the user is not logged in, redirect to the login page
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If logged in, return the children (component inside PrivateRoute)
  return children;
};

export default PrivateRoute;
