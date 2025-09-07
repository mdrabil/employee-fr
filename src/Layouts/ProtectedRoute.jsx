import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const user = useSelector((state) => state?.auth?.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else if (!allowedRoles.includes(user?.role)) {
      navigate(`/employee-dashboard/${user?.employeeId}`);
    }
  }, [user, allowedRoles, navigate]);

  // Jab tak decide nahi hua, kuch bhi mat dikhayo (null ya loader)
  if (!user) return null;

  return children;
};

export default ProtectedRoute;
