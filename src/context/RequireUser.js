import { Navigate, useLocation } from "react-router-dom"
import { useAuth } from "./AuthContext"

const RequireUser = ({ children }) => {

    const { currentUser } = useAuth()
    const location = useLocation()

    if (currentUser) {
        return <Navigate to="/dashboard" state={{ path: location.pathname }} />
    }
    return children;
}

export default RequireUser