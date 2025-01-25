import { createBrowserRouter } from "react-router-dom";
import BasicLayout from "../Layouts/BasicLayout";
import Login from "../Auth/Login";
import Register from "../Auth/Register";
import Home from "../Pages/Home/Home";
import ErrorPage from "../Components/Error Page/ErrorPage";
import DashBoardLayout from "../Layouts/DashBoardLayout";
import PurchaseCoin from "../Pages/Dashboard/Purchase Coin/PurchaseCoin";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../Pages/Dashboard/Purchase Coin/CheckOutForm";
import AddTask from "../Pages/Dashboard/Buyer/AddTask";
import MyTask from "../Pages/Dashboard/Buyer/MyTask";
import PurchaseHistory from "../Pages/Dashboard/Purchase Coin/PurchaseHistory";

const stripePromise = loadStripe(`${import.meta.env.VITE_PAYMENT_GATEWAY_PK}`);

export const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    element: <BasicLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },

  // Dashboard
  {
    path: "/dashboard",
    errorElement: <ErrorPage />,
    element: <DashBoardLayout />,
    children: [
      {
        path: "/dashboard/purchaseCoin",
        element: (
          <Elements stripe={stripePromise}>
            <PurchaseCoin />
          </Elements>
        ),
      },
      {
        path: "/dashboard/checkout",
        element: (
          <Elements stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        ),
      },
      {
        path:"/dashboard/buyer-addTask",
        element: <AddTask/>
      },
      {
        path:'/dashboard/buyer-task',
        element:<MyTask/>
      },
      {
        path:'/dashboard/purchaseHistory',
        element:<PurchaseHistory/>
      }
    ],
  },
]);
