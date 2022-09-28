import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import RoutesApp from './components/RoutesApp/index';

function App() {
  const [count, setCount] = useState(0)

  return (
    <RoutesApp />
  )
}

export default App
