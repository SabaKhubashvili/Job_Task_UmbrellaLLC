import { Routes, Route } from "react-router-dom";
import { Favorites, Home, SingleProductPage } from "../pages";

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin" element={<Home isAdmin />} />
      <Route path="/favorites" element={<Favorites  />} />

      <Route path="/product/:id" element={<SingleProductPage/>} />
    </Routes>
  );
};
