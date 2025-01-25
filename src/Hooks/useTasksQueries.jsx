import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useDbUser from './useDbUser';
import useAxiosSecure from './useAxiosSecure';

const useTasksQueries = () => {
    const [,currentUser] = useDbUser()
    const axiosSecure = useAxiosSecure()
    const {data: tasks=[],refetch} = useQuery({
        queryKey:[currentUser, 'tasks'],
        queryFn:async()=>{
            const res = await axiosSecure.get(`/tasks?email=${currentUser.email}`)
            return res.data
        }

    })
    return [tasks,refetch]
};

export default useTasksQueries;