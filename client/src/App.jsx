import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import NotFound from "./pages/NotFound";
import Header from "./components/Header";
import MainFooter from "./components/Footer";
import SingUP from "./pages/SingUp";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SingUP />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      <MainFooter />
    </BrowserRouter>
  );
}
