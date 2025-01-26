import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "./useAxiosSecure";

const usePayments = (email = null) => {
    const axiosSecure = useAxiosSecure();
    const { data: payments = [], refetch } = useQuery({
        queryKey: ["payments", email], // Include email in queryKey for caching
        queryFn: async () => {
            const endpoint = email ? `/payments?email=${email}` : "/payments"; // Conditionally add email
            const res = await axiosSecure.get(endpoint);
            return res.data;
        },
    });

    return [payments, refetch];
};

export default usePayments;
