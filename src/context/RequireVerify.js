import { Navigate, useLocation } from "react-router-dom"
import { useAuth } from "./AuthContext"

const RequireVerify = ({ children }) => {

    const { emailSignUp } = useAuth()
    const location = useLocation()

    if (emailSignUp == undefined) {
        return <Navigate to="/signup" state={{ path: location.pathname }} />
    }
    return children;
}

export default RequireVerify