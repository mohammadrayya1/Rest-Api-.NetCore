import Signup from "./Signup";
import Login from "./Login";
import Header from "./Components/Header";
import Home from "./Home";
import Dashoard from "./Dashboard";
import User from "./User";
import Profile from "./Profile";
import { Route, Routes, useLocation } from "react-router-dom";
import RequiredAuth from "./Auth/RequireAuth";
export default function App() {
  const location = useLocation();

  // تحقق مما إذا كان المسار الحالي هو '/dashboard'
  const showHeader = !location.pathname.startsWith("/dashboard");
  return (
    <div>
      {showHeader && <Header />}

      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        <Route element={<RequiredAuth />}>
          <Route path="/dashboard" element={<Dashoard />}>
            <Route path="users" element={<User />} />
            <Route path="users/:id" element={<Profile />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}
