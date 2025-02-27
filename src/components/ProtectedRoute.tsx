import { ReactNode } from "react";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import {
  useCurrentToken,
  useCurrentUser,
} from "../redux/features/auth/authSlice";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { logout } from "../redux/features/auth/authSlice"; 

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const token = useAppSelector(useCurrentToken);
  const user = (useAppSelector(useCurrentUser) as {
    email: string;
    role: string;
  } | null) || { email: "", role: "" };
  const dispatch = useAppDispatch(); 

  console.log("User ->", user);
  console.log("Token ->", token);

  let isTokenValid = false;
  if (token) {
    try {
      const decodedToken: { exp: number } = jwtDecode(token);
      const currentTime = Date.now() / 1000; 
      if (decodedToken.exp > currentTime) {
        isTokenValid = true;
      } else {
        console.log("Token expired");
        dispatch(logout()); 
      }
    } catch (error) {
      console.error("Invalid token:", error);
      dispatch(logout()); 
    }
  } else {
    dispatch(logout());
  }

  if (!isTokenValid || user.role !== "admin") {
    return <Navigate to="/" replace={true} />;
  }

  return children;
};

export default ProtectedRoute;
