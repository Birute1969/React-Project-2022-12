import React, {Suspense} from 'react';
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { PageLayout} from './Components/PageLayout/PageLayout';

import './App.css';

const HomePage = React.lazy(() => import('./Pages/HomePage/HomePage'));
const AddPage = React.lazy(() => import('./Pages/AddPage/AddPage'));
const RegisterPage = React.lazy(() => import('./Pages/RegisterPage/RegisterPage'));
const LoginPage = React.lazy(() => import('./Pages/LoginPage/LoginPage'));

function App() {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const handleRegister = (email, password) => {
      setEmail({email});
      setPassword({password});
  }

  const handleLogin = (email, password) => {
    setEmail({email: email});
    setPassword({password: password});
  }

  const handleLogout = () => {
    setEmail(null);
    setPassword(null)
  }
    
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<PageLayout email={email} password={password}
        onLogout={handleLogout}/>}>
              <Route index element={
                <Suspense fallback={<div>Loading...</div>}>
                    <HomePage />
                </Suspense>
              } />

              <Route path="/pages" element={
                <Suspense fallback={<div>Loading...</div>}>
                    <AddPage />
                </Suspense>
              } />

        </Route>
        
        <Route path="/register" element={
          <Suspense fallback={<div>Loading...</div>}>
              <RegisterPage onRegister={handleRegister} />
          </Suspense>
          } />

        <Route path="/login" element={
          <Suspense fallback={<div>Loading...</div>}>
              <LoginPage onLogin={handleLogin} />
          </Suspense>
          } />
      </Routes>
    </div>
  );
}

export default App;