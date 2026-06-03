import { createContext, useContext, useState, useCallback } from 'react';

// ─── Створення контексту ────────────────────────────────────────────────────
const ShopContext = createContext(null);

// ─── Провайдер ──────────────────────────────────────────────────────────────
export function ShopProvider({ children }) {
  // Масив { ...product, qty } — кошик
  const [cart, setCart] = useState([]);

  // Set з id товарів — обране
  const [favorites, setFavorites] = useState(new Set());

  /**
   * Додати товар до кошика.
   * Якщо товар вже є — збільшує qty, інакше додає з qty=1.
   */
  const addToCart = useCallback((product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  }, []);

  /**
   * Додати / прибрати товар з обраного (toggle).
   */
  const toggleFavorite = useCallback((id) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  /** Чи є товар в обраному */
  const isFavorite = useCallback((id) => favorites.has(id), [favorites]);

  /** Загальна кількість одиниць у кошику */
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <ShopContext.Provider
      value={{ cart, favorites, addToCart, toggleFavorite, isFavorite, cartCount }}
    >
      {children}
    </ShopContext.Provider>
  );
}

// ─── Хук для зручного доступу ───────────────────────────────────────────────
export function useShop() {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error('useShop must be used inside <ShopProvider>');
  return ctx;
}
