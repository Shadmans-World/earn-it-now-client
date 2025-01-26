import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from './useAxiosSecure';

const useWithDrawals = () => {
    const axiosSecure = useAxiosSecure()
    const {data: withdrawals = [], refetch} = useQuery({
        queryKey:['withdrawals'],
        queryFn: async() => {
            const res = await axiosSecure.get('/worker/withdrawals')
            return res.data;
        }
    })
    return [withdrawals,refetch]
};

export default useWithDrawals;