import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
} from "react";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    try {
      const stored = localStorage.getItem("bh_cart");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("bh_cart", JSON.stringify(items));
    } catch {
      /* ignore */
    }
  }, [items]);

  // item shape: { id, title, price, image, qty }
  const addItem = (menuItem) => {
    setItems((prev) => {
      const existing = prev.find(
        (i) => i.id === menuItem._id || i.id === menuItem.id
      );
      const id = menuItem._id || menuItem.id;

      if (existing) {
        return prev.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i));
      }

      return [
        ...prev,
        {
          id,
          title: menuItem.title,
          price: menuItem.price,
          image:
            menuItem.imageUrl ||
            menuItem.image ||
            "/images/menu/placeholder.jpg",
          qty: 1,
        },
      ];
    });
  };

  const updateQty = (id, newQty) => {
    setItems((prev) => {
      if (newQty <= 0) return prev.filter((i) => i.id !== id);
      return prev.map((i) => (i.id === id ? { ...i, qty: newQty } : i));
    });
  };

  const removeItem = (id) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const clearCart = () => setItems([]);

  const totals = useMemo(() => {
    const subtotal = items.reduce(
      (sum, item) => sum + item.price * item.qty,
      0
    );
    const tax = Math.round(subtotal * 0.05); // 5% demo tax
    const total = subtotal + tax;
    return { subtotal, tax, total };
  }, [items]);

  return (
    <CartContext.Provider
      value={{ items, addItem, updateQty, removeItem, clearCart, totals }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};
