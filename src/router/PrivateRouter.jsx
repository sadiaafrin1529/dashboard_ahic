import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../Redux/Features/Auth/UserSlice";

export default function PrivateRouter({ children }) {
    const location = useLocation();
    const user = useSelector(selectUser); // Get the logged-in user from Redux store

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
}
