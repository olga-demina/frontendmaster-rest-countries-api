import React from "react";
import ReactDOM from "react-dom/client";
import Layout from "./containers/Layout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Country from "./pages/Country";
import Home from "./pages/Home";
import "./index.css";

export default function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="country/:countryName" element={<Country />} />
          </Route>
        </Routes>
      </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
