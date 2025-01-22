import { createBrowserRouter } from "react-router-dom";
import BasicLayout from "../Layouts/BasicLayout";


export const router = createBrowserRouter([
    {
        path:'/',
        element:<BasicLayout/>
    }
])