import { UseAuth } from 'hooks/useAuth';
import { Navigate } from 'react-router-dom';

export const PrivateRoute = ({ component: Component, redirectTo = '/' }) => {
  const { isLoggedIn, isRefreshing } = UseAuth();
  const shouldRedirect = !isLoggedIn && !isRefreshing;

  // console.log(isLoggedIn);
  // console.log(isRefreshing);

  return shouldRedirect ? <Navigate to={redirectTo} /> : Component;
};