import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
    // Get user state from the Redux auth slice
    const { user } = useSelector((state) => state.auth);

    // Check if user is not logged in OR if a specific role is required and the user doesn't have it
    if (!user || (role && user.role !== role)) {
        // Redirect to login page and replace the current entry in the history stack
        return <Navigate to="/login" replace />;
    }

    // If the user meets the criteria, render the protected content
    return children;
};

export default ProtectedRoute;