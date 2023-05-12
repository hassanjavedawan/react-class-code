/** @format */
import './App.css'
import React, { Component } from "react";
import Home from "./pages/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./pages/About";
import Header from "./components/layout/Header";
import Contact from './components/element/Contact';
import PageNotFound from './components/element/PageNotFound';

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Header />
        <Routes>
          <Route index path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/*' element={<PageNotFound />} />
        </Routes>

      </BrowserRouter>
    );
  }
}
