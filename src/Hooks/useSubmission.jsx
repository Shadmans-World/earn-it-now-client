import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useDbUser from './useDbUser';
import useAxiosSecure from './useAxiosSecure';

const useSubmission = () => {
    const [,currentUser] = useDbUser()
    const axiosSecure = useAxiosSecure()
    const {data: submission = [], refetch} = useQuery({
        queryKey:[currentUser.email , 'submission'],
        queryFn:async()=>{
            const res= await axiosSecure.get(`/buyer/submissions?email=${currentUser.email}`)
            return res.data
        }
    })
    return [submission, refetch]
};

export default useSubmission;