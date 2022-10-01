import { useEffect } from 'react';
import PrincipalRoute from './routers/PrincipalRoute';
import useUser from './store/user';

function App() { 
  const { verificated } = useUser((state) => state);
  
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
