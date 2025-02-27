import { useState } from "react";
import { Outdent, Menu } from "lucide-react";
import { Link, Outlet } from "react-router-dom";

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-800">
 
      <div
        className={`fixed md:relative z-50 bg-gray-700 p-6 w-64 min-h-screen transform ${
          isOpen ? "translate-x-0" : "-translate-x-64"
        } md:translate-x-0 transition-transform duration-300 ease-in-out shadow-lg`}
      >
     
        <button
          onClick={() => setIsOpen(false)}
          className="md:hidden absolute top-6 right-6 text-gray-300 hover:text-white"
        >
          <Outdent size={24} />
        </button>

        <h2 className="text-2xl font-semibold text-center mb-8 text-white">
          Dashboard
        </h2>

        <div className="flex flex-col space-y-4">
          <Link
            to="/dashboard/add-category"
            className="btn bg-green-600 hover:bg-green-700 text-white w-full text-left"
          >
            Add Category
          </Link>
          <Link
            to="/dashboard/add-book"
            className="btn bg-green-600 hover:bg-green-700 text-white w-full text-left"
          >
            Add Book
          </Link>
          <Link
            to="/dashboard/order-management"
            className="btn bg-green-600 hover:bg-green-700 text-white w-full text-left"
          >
            Order Management
          </Link>
        </div>
      </div>

      <div className="flex-1 p-6 min-h-screen">
        <button
          onClick={() => setIsOpen(true)}
          className="md:hidden p-2 bg-gray-700 rounded-md mb-6 hover:bg-gray-600"
        >
          <Menu size={24} className="text-white" />
        </button>

        <h1 className="text-3xl font-semibold mb-4 text-white">
          Welcome to the Dashboard
        </h1>
        <p className="text-lg text-gray-300 mb-8">
          Select an option from the sidebar to manage books and categories.
        </p>

        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
