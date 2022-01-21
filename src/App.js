import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import { Route, Routes } from 'react-router';
import {useEffect, useState} from 'react';
import Dashboard from './components/Dashboard';

function App() {
  const [ isLoggedIn, setIsLoggedIn ] = useState(false);
  const loginUser = () => setIsLoggedIn(!isLoggedIn)

  useEffect(() => {
    if(localStorage.getItem('user_info_id')) {
      setIsLoggedIn(true)
    }
  }, [])
  return (
    <div className='App'>
      <h1>App</h1>
      <Routes>
        <Route path='*' element={ isLoggedIn ?
        <Dashboard /> : <Login logFunction={loginUser}/> } />
        <Route path='register' element={ <Register /> } />
      </Routes>
    </div>
  );
}

export default App;
