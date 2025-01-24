// import { useQuery } from "@tanstack/react-query";
// import useAxiosSecure from "./useAxiosSecure";
// import useProvider from "./useProvider";



// const useAdmin = () => {
//     const { user} = useProvider(); // Access user and loading from AuthProvider
//     const axiosSecure = useAxiosSecure();

//     const { data: isAdmin , isPending:isAdminLoading} = useQuery({
//         queryKey: [user?.email, 'isAdmin'],
        
//         queryFn: async () => {
//             const res = await axiosSecure.get(`/users/admin/${user.email}`);
//             console.log(res.data)
//             return res.data?.admin;
//         },
//     });

//     return [isAdmin,isAdminLoading]; 
// };

// export default useAdmin;
