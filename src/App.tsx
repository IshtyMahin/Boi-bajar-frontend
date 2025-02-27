import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="bg-gray-400 min-h-screen">
      <ToastContainer />
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
