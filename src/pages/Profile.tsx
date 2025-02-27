import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import {
  useCurrentToken,
  useCurrentUser,
} from "../redux/features/auth/authSlice";
import { useGetUserByEmailQuery } from "../redux/features/auth/authApi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profile = () => {
  const navigate = useNavigate();

  const token = useAppSelector(useCurrentToken);
  const userData = useAppSelector(useCurrentUser) as { email?: string } | null;
  const email = userData?.email;

  useEffect(() => {
    if (!token || !userData) {
      navigate("/");
      toast.warn("Please log in to access your profile.");
    }
  }, [token, userData, navigate]);

 
  const { data, isLoading, isError } = useGetUserByEmailQuery(
    email || "",
    {
      skip: !email, 
    }
  );

  const user = data?.data;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 py-8 flex items-center justify-center">
        <div className="max-w-3xl w-full bg-gray-800 shadow-lg rounded-lg overflow-hidden p-6">
          <div className="flex justify-center items-center h-40">
            <p className="text-lg text-gray-400">Loading user data...</p>
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    toast.error("Failed to fetch user data. Please try again later.");
    return (
      <div className="min-h-screen bg-gray-900 py-8 flex items-center justify-center">
        <div className="max-w-3xl w-full bg-gray-800 shadow-lg rounded-lg overflow-hidden p-6">
          <div className="flex justify-center items-center h-40">
            <p className="text-lg text-red-500">
              Error: {"Failed to load user data."}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-white mb-8">
          Profile
        </h1>
        <div className="max-w-3xl mx-auto bg-gray-800 shadow-lg rounded-lg overflow-hidden">
          <div className="px-8 py-10">
            <div className="space-y-8">
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-white border-b border-gray-700 pb-4">
                  Personal Information
                </h2>
                <div className="space-y-4">
                  <div className="bg-gray-700 p-4 rounded-lg">
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                      Name
                    </label>
                    <p className="mt-1 text-lg text-white">
                      {user?.name || "Not available"}
                    </p>
                  </div>
                  <div className="bg-gray-700 p-4 rounded-lg">
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                      Email
                    </label>
                    <p className="mt-1 text-lg text-white">
                      {user?.email || "Not available"}
                    </p>
                  </div>
                  <div className="bg-gray-700 p-4 rounded-lg">
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                      Role
                    </label>
                    <p className="mt-1 text-lg text-white">
                      {user?.role || "Not available"}
                    </p>
                  </div>
                  <div className="bg-gray-700 p-4 rounded-lg">
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                      Address
                    </label>
                    <p className="mt-1 text-lg text-white">
                      {user?.address || "No address provided"}
                    </p>
                  </div>
                  <div className="bg-gray-700 p-4 rounded-lg">
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                      Phone
                    </label>
                    <p className="mt-1 text-lg text-white">
                      {user?.phone || "No phone number provided"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-white border-b border-gray-700 pb-4">
                  Actions
                </h2>
                <div className="space-y-4">
                  <button
                    onClick={() => navigate("/reset-password")}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Reset Password
                  </button>
                  <button
                    onClick={() => navigate("/orders")}
                    className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                  >
                    View Order History
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
