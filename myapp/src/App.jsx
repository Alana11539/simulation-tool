import { useState } from 'react'
import Home from "./pages/Home";
import Study from "./pages/Study";
import './App.css'
import Simulator from './pages/Simulator.jsx'
import './styles/ui.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"; 
function App() {
  
  return (
    <>
   <BrowserRouter>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/study/:id" element={<Study />} />
    <Route path="/simulate/:id" element={<Simulator />} />
  </Routes>
</BrowserRouter>

    </>
  )
}

export default App
