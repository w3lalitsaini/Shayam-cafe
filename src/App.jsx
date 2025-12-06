import React from "react";
import Router from "./routes/Router";
import { CartProvider } from "./context/CartContext";

const App = () => {
  return (
    <>
      <CartProvider>
        <Router />
      </CartProvider>
    </>
  );
};

export default App;
