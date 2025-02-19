import { useQuery } from "@tanstack/react-query";
import useDbUser from "./useDbUser";
import useAxiosSecure from "./useAxiosSecure";

const useWorkerPending = () => {
    const [, currentUser] = useDbUser();
    const axiosSecure = useAxiosSecure();

    const { data: workerPending = [], isLoading, refetch } = useQuery({
        queryKey: [currentUser?.email, "workerPending"],
        queryFn: async () => {
            if (!currentUser?.email) return [];
            const res = await axiosSecure.get(`/worker/submission?email=${currentUser.email}`);
            return res.data;
        },
        enabled: !!currentUser?.email, // Only fetch when email exists
    });

    return [workerPending, isLoading, refetch];
};

export default useWorkerPending;
