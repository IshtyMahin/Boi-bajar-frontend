/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import {
  logout,
  useCurrentToken,
  useCurrentUser,
} from "../redux/features/auth/authSlice";

const NavLinks = () => {
  const token = useAppSelector(useCurrentToken);
  const user:any = useAppSelector(useCurrentUser);
  console.log("user ->", user);

  return (
    <>
      <li>
        <Link to="/products">Products</Link>
      </li>
      {user?.role === "admin" && (
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
      )}
      <li>
        <Link to="/about">About</Link>
      </li>
      {token && user?.role !== "admin" && (
        <li>
          <Link to="/orders">Orders</Link>
        </li>
      )}
    </>
  );
};

const AuthButtons = () => {
  const token = useSelector(useCurrentToken);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  if (token) {
    return (
      <button onClick={handleLogout} className={`btn btn-outline}`}>
        Logout
      </button>
    );
  }

  return (
    <>
      <Link
        to="/register"
        className={` btn border-0 bg-green-600 mb-2 sm:mb-0 hover:bg-green-700 text-white "
        }`}
      >
        Sign Up
      </Link>
      <Link to="/login" className={`btn btn-outline }`}>
        Login
      </Link>
    </>
  );
};

const ProfileAvatar = () => {
  const token = useSelector(useCurrentToken);

  if (!token) return null;

  return (
    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
      <div className="w-10 rounded-full">
        <Link to="/profile">
          <img
            alt="Profile"
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
          />
        </Link>
      </div>
    </div>
  );
};

const Navbar = () => {
  return (
    <div className="px-10 navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <NavLinks />
            <li>
              <ProfileAvatar />
            </li>
            <li>
              <AuthButtons />
            </li>
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost text-xl">
          Boi Bajar(বই বাজার)
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <NavLinks />
        </ul>
      </div>

      <div className="navbar-end hidden lg:flex">
        <div className="flex items-center space-x-4">
          <ProfileAvatar />
          <AuthButtons />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
