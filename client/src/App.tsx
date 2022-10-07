import { useEffect, useState } from 'react';
import PrincipalRoute from './routers/PrincipalRoute';
import useUser from './store/user';
import useLocalStorage from './hooks/useLocalStorage';

function App() { 
  const { verificated } = useUser((state) => state);
  const [ token ] = useLocalStorage();

  useEffect(() => {
    token && verificated(token);
  }, [token]);

  return (
    <PrincipalRoute />
  )
}

export default App
