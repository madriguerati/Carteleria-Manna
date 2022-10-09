import { Routes, Route } from 'react-router-dom';
import AppRouter from './AppRouter';
import AuthRouter from './AuthRouter';
import PrivateRoutes from './PrivateRoutes';
import PublicRoutes from './PublicRoutes';
import useLocalStorage from './../hooks/useLocalStorage';


const PrincipalRoute = () => {
  const [ accessToken ] = useLocalStorage();

  return (
    <Routes>
      <Route
        path='/auth/*'
        element={
          <PublicRoutes isLogged={accessToken} >
            <AuthRouter />
          </PublicRoutes>
        }
      />

      {<Route 
        path='/*'
        element={
          <PrivateRoutes isLogged={accessToken}>
            <AppRouter />
          </PrivateRoutes>
        }
      />}
    </Routes>
  )
}

export default PrincipalRoute
