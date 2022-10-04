import { Routes, Route } from 'react-router-dom';
import AppRouter from './AppRouter';
import AuthRouter from './AuthRouter';
import PrivateRoutes from './PrivateRoutes';
import PublicRoutes from './PublicRoutes';
import useUser from './../store/user';

const PrincipalRoute = () => {
  const { tokken } = useUser((state) => state);
  return (
    <Routes>
      <Route
        path='/auth/*'
        element={
          <PublicRoutes isLogged={tokken} >
            <AuthRouter />
          </PublicRoutes>
        }
      />

      {tokken && <Route 
        path='/*'
        element={
          <PrivateRoutes isLogged={tokken}>
            <AppRouter />
          </PrivateRoutes>
        }
      />}
    </Routes>
  )
}

export default PrincipalRoute
