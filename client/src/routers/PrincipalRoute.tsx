import { Routes, Route } from 'react-router-dom';
import AppRouter from './AppRouter';
import AuthRouter from './AuthRouter';
import PrivateRoutes from './PrivateRoutes';
import PublicRoutes from './PublicRoutes';

const isLogged = false;

const PrincipalRoute = () => {
  return (
    <Routes>
      <Route
        path='/auth/*'
        element={
          <PublicRoutes isLogged={isLogged} >
            <AuthRouter />
          </PublicRoutes>
        }
      />

      <Route 
        path='/*'
        element={
          <PrivateRoutes isLogged={isLogged}>
            <AppRouter />
          </PrivateRoutes>
        }
      />
    </Routes>
  )
}

export default PrincipalRoute
