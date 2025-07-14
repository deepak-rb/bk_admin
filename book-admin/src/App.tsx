
import './App.css';
import Login from './components/Login/Login';
import Console from './components/Dashboard/Console';
import { Route, Routes } from 'react-router-dom'; 
import NotFound from './components/Error/NotFound'; 
import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

function App() {


  const helloRef = useRef<HTMLDivElement | null>(null);
  const location = useLocation();

  useEffect(() => {
    if (helloRef.current) {
      helloRef.current.classList.remove('hello');
      void helloRef.current.offsetHeight;
      helloRef.current.classList.add('hello');
      helloRef.current.classList.add('route-changed');
      const timeoutId = setTimeout(() => {
        helloRef.current?.classList.remove('route-changed');
      }, 500);
      return () => clearTimeout(timeoutId);
    }
  }, [location.pathname]);


  return (
    <div ref={helloRef} className='min-vh-100 background hello hide-scrollbar' 
    style={{ overflowY: 'scroll', height: '100vh'}}

  >
      <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/console" element={<Console />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
 
    </div>
  );
}

export default App;
