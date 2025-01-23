import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosPublic from './useAxiosPublic';

const useWorker = () => {
    const axiosPublic = useAxiosPublic()
    const {data: workers =[],refetch} = useQuery({
        queryKey:['workers'],
        queryFn: async()=>{
            const res =await axiosPublic.get('/workers')
            return res.data
        }
    })
    return [workers,refetch]
};

export default useWorker;