import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Formulario from './formulario';
import Robots from './robots';
import Header from './header';
import Footer from './footer';

function App({ setLocale }) {
  return (
    <Router>
      <Header setLocale={setLocale} />
      <Routes>
        <Route path="/" element={<Formulario />} />
        <Route path="/robots" element={<Robots />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
