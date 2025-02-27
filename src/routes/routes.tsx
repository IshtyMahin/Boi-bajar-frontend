import { createBrowserRouter } from "react-router-dom";

// import Register from "../pages/Register";
import App from "../App";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import AddBook from "../pages/AddBook";
import AddCategory from "../pages/AddCategory";
import Dashboard from "../pages/Dashboard";
import ProductDetail from "../pages/ProductDetail";
import MainPage from "../pages/MainPage";
import AboutSection from "../components/AboutSection";
import ForgotPassword from "../components/ForgetPassword";
import ProtectedRoute from "../components/ProtectedRoute";
import Profile from "../pages/Profile";
import ResetPassword from "../components/ResetPassword";
import { Products } from "../pages/Products";
import OrderDetails from "../pages/OrderDetails";
import OrderVerification from "../pages/VerifyOrder";
import OrderManagement from "../components/OrderManagement";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <MainPage />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/products/:bookId",
        element: <ProductDetail />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <SignUp />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "/reset-password",
        element: <ResetPassword />,
      },
      {
        path: "/about",
        element: <AboutSection />,
      },
      {
        path: "/dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
        children: [
          {
            path: "add-category",
            element: <AddCategory />,
          },
          {
            path: "add-book",
            element: <AddBook />,
          },
          {
            path: "order-management",
            element: <OrderManagement />,
          },
        ],
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/orders",
        element: <OrderDetails />,
      },
      {
        path: "/order/verify",
        element: <OrderVerification />,
      },
    ],
  },
]);

export default routes;
