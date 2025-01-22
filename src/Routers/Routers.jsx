import { createBrowserRouter } from "react-router-dom";
import BasicLayout from "../Layouts/BasicLayout";
import Login from "../Auth/Login";
import Register from "../Auth/Register";
import Home from "../Pages/Home/Home";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <BasicLayout />,
    children: [
        {
            path:'/',
            element:<Home/>
        },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path:'/register',
        element:<Register/>
      },
    ],
  },
]);
