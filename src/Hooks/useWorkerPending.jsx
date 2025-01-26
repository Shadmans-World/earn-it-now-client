import React from 'react';
import useDbUser from './useDbUser';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

const useWorkerPending = () => {
    const [,currentUser] = useDbUser()
    const axiosSecure = useAxiosSecure()
    const {data: workerPending = [],refetch} = useQuery({
        queryKey:[currentUser?.email, 'workerPending'],
        queryFn:async()=>{
            const res = await axiosSecure.get(`/worker/submission?email=${currentUser.email}`)
            return res.data;
        }
    })
    return [workerPending, refetch]
};

export default useWorkerPending;