import { useEffect, useState } from 'react';
import PrincipalRoute from './routers/PrincipalRoute';
import useUser from './store/user';

function App() { 
  const { verificated, tokken } = useUser((state) => state);

  
  useEffect(() => {
    const loggedUserJSON = localStorage.getItem('auth');
    if (loggedUserJSON) {
      const token = JSON.parse(loggedUserJSON);
      verificated(token);
    }
  }, [tokken]);


  return (
    <PrincipalRoute />
  )
}

export default App
