import { Routes, Route } from 'react-router-dom';
import AppRouter from './AppRouter';
import AuthRouter from './AuthRouter';
import PrivateRoutes from './PrivateRoutes';
import PublicRoutes from './PublicRoutes';
import useLocalStorage from './../hooks/useLocalStorage';


const PrincipalRoute = () => {
  const [ token ] = useLocalStorage();

  return (
    <Routes>
      <Route
        path='/auth/*'
        element={
          <PublicRoutes isLogged={token} >
            <AuthRouter />
          </PublicRoutes>
        }
      />

      {<Route 
        path='/*'
        element={
          <PrivateRoutes isLogged={token}>
            <AppRouter />
          </PrivateRoutes>
        }
      />}
    </Routes>
  )
}

export default PrincipalRoute
