import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Signin from "./pages/Signin";
import React from "react";
import PrivateRoute from "./PrivateRoute";
import Layout from "./layout";
import CreateAccount from "./pages/admin/CreateAccount";
import CreateOrders from "./pages/pharmacist/CreateOrders";
import CreateProducts from "./pages/productManager/CreateProducts";
import { CreateBatches } from "./pages/batchManager/CreateBatches";
import ShowAllOrders from "./pages/admin/ShowAllOrders";
import ShowBatches from "./pages/batchManager/ShowBatches";
import ShowOrder from "./pages/pharmacist/ShowOrder";
import ShowProducts from "./pages/productManager/ShowProducts";
import OrderDetail from "./pages/admin/OrderDetail";
import BatchDetail from "./pages/batchManager/BatchDetail";
import ProductDetail from "./pages/productManager/ProductDetail";
import GrpcData from "./pages/test";
import ProductView from "./pages/view/ProductView";

const routes = createBrowserRouter([
    
    { path: "/", element: <HomePage /> },
    { path: "/signin", element: <Signin /> },
    { path: "/viewproduct", element: <ProductView /> },
    {
      element: <PrivateRoute />,
      children: [
        // `/homepage` route and its children are now protected by PrivateRoute
        {
          path: "/homepage",
          element: <Layout/>,
          children: [
            { index: true, element: <CreateAccount/> }, // Default child of /homepage
            { path: "CreateOrders", element: <CreateOrders /> }, // Relative path; becomes /homepage/printing
            { path: "CreateProducts", element: <CreateProducts /> }, // Becomes /homepage/printers
            { path: "CreateBatches", element: <CreateBatches /> }, // Becomes /homepage/orders

            { path: "ShowAllOrders", element: <ShowAllOrders /> }, // Becomes /homepage/users
            { path: "ShowBatches", element: <ShowBatches /> },
            { path: "ShowOrder", element: <ShowOrder /> },
            { path: "ShowProducts", element: <ShowProducts /> },

            { path: "OrderDetail", element: <OrderDetail /> },
            { path: "BatchDetail", element: <BatchDetail /> },
            { path: "ProductDetail", element: <ProductDetail /> },

            {path:"test",element:<GrpcData/>}




          ],
        },
          
      ],
    },
  ]);
  
  export default routes;