import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const navigate=useNavigate()
    const { user, isLoginSuccess } = useSelector(state => state.auth);

    if (!user && !isLoginSuccess) {
        return navigate("/login");
    }

    return children;
};

export default ProtectedRoute;
