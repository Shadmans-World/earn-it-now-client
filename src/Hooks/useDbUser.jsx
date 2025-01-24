import { useQuery } from '@tanstack/react-query';

import useAxiosPublic from './useAxiosPublic';

const useDbUser = () => {
    const axiosPublic = useAxiosPublic()
    const {data: dbUsers = [], refetch} = useQuery({
        queryKey:['dbUsers'],
        queryFn: async()=>{
            const res = await axiosPublic.get('/users')
            return res.data
        }
    })
    return [dbUsers,refetch]
};

export default useDbUser;