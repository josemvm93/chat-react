import React from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginFake from './common/login-fake/login-fake';
import Principal from './common/principal/principal';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginFake />} />
        <Route path=":userId/*" element={<Principal/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
