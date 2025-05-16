import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export const useAuth = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const requireAuth = (callback?: () => void) => {
    if (!auth.loading && !auth.isAuthenticated) {
      navigate('/login', { replace: true });
    } else if (callback && auth.isAuthenticated) {
      callback();
    }
  };

  const requireAdmin = (callback?: () => void) => {
    if (!auth.loading && (!auth.isAuthenticated || !auth.isAdmin)) {
      navigate('/', { replace: true });
    } else if (callback && auth.isAuthenticated && auth.isAdmin) {
      callback();
    }
  };

  return {
    ...auth,
    requireAuth,
    requireAdmin,
  };
};

export default useAuth;