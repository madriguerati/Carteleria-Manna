import { useEffect } from 'react';
import RoutesApp from './components/RoutesApp/index';
import PrincipalRoute from './routers/PrincipalRoute';
import useStore from './store/user';

function App() {
  const { verificated, tokken } = useStore((state) => state);
  
  useEffect(() => {
    const loggedUserJSON = localStorage.getItem('auth');
    if (loggedUserJSON) {
      const token = JSON.parse(loggedUserJSON);
      verificated(token)
    }
  }, []);

  return (
    <PrincipalRoute />
  )
}

export default App
