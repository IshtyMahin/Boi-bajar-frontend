/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useResetPasswordMutation } from "../redux/features/auth/authApi";
import { useAppSelector } from "../redux/hooks";
import { useCurrentUser } from "../redux/features/auth/authSlice";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false); 
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [resetPassword] = useResetPasswordMutation();

  const emailFromParams = searchParams.get("email");
  const tokenFromParams = searchParams.get("token");

  const user: { email?: string; token?: string } = useAppSelector(useCurrentUser) || {};
  const emailFromState = user?.email;
  const tokenFromState = user?.token;

  const email = emailFromParams || emailFromState;
  const token = tokenFromParams || tokenFromState;

  useEffect(() => {
    if (!email || !token) {
      navigate("/");
      toast.warn("Invalid reset password link. Please try again.");
    }
  }, [email, token, navigate]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    setLoading(true);

    try {
      const resetData = { email, token, password };
      const response = await resetPassword(resetData).unwrap();
      toast.success(response.message || "Password reset successfully!", {
        autoClose: 2000,
      });
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      if (error instanceof Error) {
        toast.error((error as any).data?.message || "Failed to reset password.");
      } else {
        toast.error("Failed to reset password.");
      }
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="card w-96 bg-base-100 shadow-xl p-6">
        <h2 className="text-2xl font-bold text-center mb-4">Reset Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">New Password</span>
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter new password"
              className="input input-bordered w-full"
              required
            />
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Confirm Password</span>
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              className="input input-bordered w-full"
              required
            />
          </div>
          <button
            type="submit"
            className="btn w-full mt-5 border-0 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition duration-300 flex items-center justify-center"
            disabled={loading} 
          >
            {loading ? (
              <>
                <span className="loading loading-spinner"></span>{" "}
                <span className="ml-2">Resetting Password...</span>{" "}
              </>
            ) : (
              "Reset Password"
            )}
          </button>
        </form>
        <div className="text-center mt-3">
          <p className="text-sm">
            Remember your password?{" "}
            <a href="/login" className="text-green-600 hover:underline">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
