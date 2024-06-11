import React from 'react';
import DogList from './components/DogList.js';
import CreateDogForm from './components/CreateDogForm.js';
import Home from './components/Home.js';
import MyDogs from './components/MyDogs.js';
import Login from './components/Login.js';
import { Link, Routes, Route, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { getUser } from './lib/auth';
import { useNavigate } from 'react-router';

const App = () => {
  const location = useLocation();
  const [user, setUser] = useState(getUser);
  const navigate = useNavigate();

  const handleLogin = (user) => {
    setUser(user);
    navigate('/');
  };

  const handleLogout = () => {
    // Clear user state and token
    console.log('Logging out');
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('username');
  };

  return (
    <div>
      <header>
        <h1>Dog community app</h1>
      </header>
      <div className="navbar">
        <Link to='/' className={`nav-item nav-link ${location.pathname === '/' ? 'active' : ''}`}>Home</Link>
        <Link to='/create' className={`nav-item nav-link ${location.pathname === '/create' ? 'active' : ''}`}>Create Dog</Link>
        <Link to='/doglist' className={`nav-item nav-link ${location.pathname === '/doglist' ? 'active' : ''}`}>Dogs List</Link>
        <Link to='/mydogs' className={`nav-item nav-link ${location.pathname === '/mydogs' ? 'active' : ''}`}>My Dogs</Link>
        <Link to='/login' className={`nav-item nav-link ${location.pathname === '/login' ? 'active' : ''}`}>Login</Link>
        {user && (
          <button onClick={handleLogout} className="button">Logout</button>
        )}
      </div>

      <Routes>
        <Route path='/' element={<Home />} />
        {
          user ? (
            <Route path='/create' element={<CreateDogForm user={user} />} />
          )
          : (
            <Route path='/create' element={<Login onLogin={handleLogin} />} />
          )
        }
        <Route path='/doglist' element={<DogList />} />
        {user ? (
          <Route path='/mydogs' element={<MyDogs userId={user} />} />
        ) : (
          <Route path='/mydogs' element={<Login onLogin={handleLogin} />} />
        )}
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
      </Routes>

      <footer>
        <p>&copy; 2024 Dog App by Emil Peitersen</p>
      </footer>
    </div>
  );
};

export default App;