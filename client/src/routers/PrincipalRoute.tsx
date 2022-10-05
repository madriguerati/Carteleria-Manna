import { Routes, Route } from 'react-router-dom';
import AppRouter from './AppRouter';
import AuthRouter from './AuthRouter';
import PrivateRoutes from './PrivateRoutes';
import PublicRoutes from './PublicRoutes';
import useUser from './../store/user';

type Props = {
  isLogged: any;
};

const PrincipalRoute = () => {
  const { tokken } = useUser((state) => state);
  const loggedUserJSON : any = localStorage.getItem('auth');
  const token = JSON.parse(loggedUserJSON);
  console.log(loggedUserJSON, 'auth');

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
