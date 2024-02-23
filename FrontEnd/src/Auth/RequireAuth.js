import { useContext } from "react";
import { User } from "../Context/UserProvider";
import { Navigate, Outlet } from "react-router-dom";
import Login from "../Login";

export default function RequiredAuth() {
  const usercontect = useContext(User);
  return usercontect.auth ? <Outlet /> : <Navigate to="/login" />;
}
