import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from './useAxiosPublic';
import useProvider from './useProvider';
import useAxiosSecure from './useAxiosSecure';


const useDbUser = () => {
  const axiosSecure = useAxiosSecure()
  const { user } = useProvider(); // Get the currently logged-in user

  const { data: dbUsers = [], refetch } = useQuery({
    queryKey: ['dbUsers'],
    queryFn: async () => {
      const res = await axiosSecure.get('/users');
      return res.data;
    },
  });

  // Filter the specific dbUser based on the logged-in user's email
  const currentUser = dbUsers.find((dbUser) => dbUser.email === user?.email);

  return [currentUser || {}, refetch]; // Return the logged-in user's data
};

export default useDbUser;