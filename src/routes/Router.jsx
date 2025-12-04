import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

/* Layouts */
import Layout from "../layout/Layout";
import DashboardLayout from "../layout/DashboardLayout";
import AccountLayout from "../layout/AccountLayout";

/* Public Pages */
import Home from "../pages/Home";
import Menu from "../pages/Menu";
import Order from "../pages/Order";
import Reservations from "../pages/Reservations";
import Contact from "../pages/Contact";
import About from "../pages/About";
import Error from "../pages/Error";

/* Auth Pages */
import Signup from "../pages/auth/Signup";
import Signin from "../pages/auth/Signin";
import VerifyEmail from "../pages/auth/VerifyEmail";
import ForgetPassword from "../pages/auth/ForgetPassword";
import ResetPassword from "../pages/auth/ResetPassword";

/* Dashboard Pages */
import DashboardHome from "../pages/dashboard/DashboardHome";
import Orders from "../pages/dashboard/Orders";
import ManageMenu from "../pages/dashboard/ManageMenu";
import AddMenuItem from "../pages/dashboard/AddMenuItem";
import Bookings from "../pages/dashboard/Bookings";
import Settings from "../pages/dashboard/Settings";

import AccountProfile from "../pages/account/AccountProfile";
import AccountOrders from "../pages/account/AccountOrders";
import AccountReservations from "../pages/account/AccountReservations";

/* Admin */
import Users from "../pages/admin/Users";

/* Protection */
// import ProtectedRoute from "../components/ProtectedRoute";

const Router = () => {
  const routes = createBrowserRouter([
    // ================================
    // PUBLIC WEBSITE ROUTES
    // ================================
    {
      path: "/",
      element: <Layout />,
      errorElement: <Error />,
      children: [
        { index: true, element: <Home /> },
        { path: "menu", element: <Menu /> },
        { path: "order", element: <Order /> },
        { path: "reservations", element: <Reservations /> },
        { path: "contact", element: <Contact /> },
        { path: "about", element: <About /> },
      ],
    },

    // ================================
    // DASHBOARD (CAFE OWNER)
    // ================================
    {
      path: "/dashboard",
      element: (
        // <ProtectedRoute role="Admin">
        <DashboardLayout />
        // </ProtectedRoute>
      ),
      children: [
        { index: true, element: <DashboardHome /> },
        { path: "users", element: <Users /> },
        { path: "orders", element: <Orders /> },
        { path: "menu", element: <ManageMenu /> },
        { path: "menu/add", element: <AddMenuItem /> },
        { path: "bookings", element: <Bookings /> },
        { path: "settings", element: <Settings /> },
      ],
    },

    // ================================
    // AUTH ROUTES
    // ================================
    { path: "/auth/signup", element: <Signup /> },
    { path: "/auth/signin", element: <Signin /> },
    { path: "/auth/verify-email", element: <VerifyEmail /> },
    { path: "/auth/forgot-password", element: <ForgetPassword /> },
    { path: "/auth/reset-password/:token", element: <ResetPassword /> },

    // USER ACCOUNT AREA
    {
      path: "/account",
      element: (
        // <ProtectedRoute>
        <AccountLayout />
        // </ProtectedRoute>
      ),
      children: [
        { index: true, element: <AccountProfile /> },
        { path: "orders", element: <AccountOrders /> },
        { path: "reservations", element: <AccountReservations /> },
      ],
    },
  ]);

  return <RouterProvider router={routes} />;
};

export default Router;
