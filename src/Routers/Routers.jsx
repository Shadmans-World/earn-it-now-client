import { createBrowserRouter } from "react-router-dom";
import BasicLayout from "../Layouts/BasicLayout";
import Login from "../Auth/Login";
import Register from "../Auth/Register";
import Home from "../Pages/Home/Home";
import ErrorPage from "../Components/Error Page/ErrorPage";
import DashBoardLayout from "../Layouts/DashBoardLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    errorElement:<ErrorPage/>,
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
  {
    path:'/dashboard',
    errorElement:<ErrorPage/>,
    element:<DashBoardLayout/>,
    children:[
      
    ]
  }
]);
