import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "./store/store";

import ProductList from "./app/features/products/pages/ProductList";
import ProductDetail from "./app/features/products/pages/ProductDetail";
import Navbar from "./app/features/products/components/Navbar";
import CartPage from "./app/features/products/pages/CartPage";
import Login from "./app/features/Auth/pages/Login";
import Register from "./app/features/Auth/pages/Register";

function App() {
  const mode = useSelector((state: RootState) => state.theme.mode);

  useEffect(() => {
    const root = document.documentElement;

    if (mode === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [mode]);

  return (
    <div className="min-h-screen bg-gray-50 text-black dark:bg-gray-950 dark:text-white">
      <Navbar />
      <Routes>
        <Route path="/cart" element={<CartPage />} />
        <Route path="/" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;