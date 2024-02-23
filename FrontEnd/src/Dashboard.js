import { Outlet } from "react-router-dom";
import Sidebar from "./Components/Sidebar";
import TopBar from "./Components/TopBar";
import User from "./User";
import { toast, ToastContainer } from "react-toastify";
export default function Dashboard() {
  return (
    <div>
      <ToastContainer />
      <TopBar />

      <div className="content-flex">
        <Sidebar />
        <Outlet />
      </div>
    </div>
  );
}
