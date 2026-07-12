import React, { createContext, useContext, useState } from 'react';

// 1. Create the "radio station" — an empty channel that components can tune into.
const CartContext = createContext();

// 2. This component wraps your whole app (see index.js) and broadcasts cart data
//    to every component nested inside it.
export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const toggleCart = () => setIsCartOpen((prev) => !prev);

  // Add a product to the cart. If it's already in there, increase its quantity
  // instead of adding a duplicate row.
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existing = prevItems.find((item) => item.id === product.id);

      if (existing) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  // Remove a product entirely, regardless of its quantity.
  const removeFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

  // Change the quantity of an item already in the cart (e.g. from +/- buttons).
  // If quantity drops to 0 or below, remove it instead of showing "0".
  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  // Empty the whole cart (used after an order is placed).
  const clearCart = () => setCartItems([]);

  // Derived values — calculated fresh from cartItems every render,
  // rather than stored separately (which could get out of sync).
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );

  // 3. Everything inside `value` is what other components receive when they call useCart().
  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
    isCartOpen,
    openCart,
    closeCart,
    toggleCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// 4. A small helper hook so components can write `useCart()` instead of the
//    longer `useContext(CartContext)` every time.
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used inside a <CartProvider>');
  }
  return context;
}