
import React, { createContext, useState, useEffect, useContext, ReactNode, useCallback } from 'react';
import { CartContextType, CartItem } from '../types';

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const storedCart = localStorage.getItem('aria_cart');
      return storedCart ? JSON.parse(storedCart) : [];
    } catch (error) {
      console.error('Failed to parse cart from localStorage:', error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('aria_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const generateItemHash = (item: Omit<CartItem, 'unitPrice' | 'totalPrice'>): string => {
    return `${item.productId}-${item.selectedDimension.id}-${item.selectedPaperType.id}-${item.selectedFinishType.id}-${item.selectedPrintSide}`;
  };

  const addToCart = useCallback((item: CartItem) => {
    setCartItems((prevItems) => {
      const itemHash = generateItemHash(item);
      const existingItemIndex = prevItems.findIndex(
        (i) => generateItemHash(i) === itemHash
      );

      if (existingItemIndex > -1) {
        const updatedItems = [...prevItems];
        const existingItem = updatedItems[existingItemIndex];
        updatedItems[existingItemIndex] = {
          ...existingItem,
          quantity: existingItem.quantity + item.quantity,
          totalPrice: existingItem.unitPrice * (existingItem.quantity + item.quantity),
        };
        return updatedItems;
      } else {
        return [...prevItems, item];
      }
    });
  }, []);

  const removeFromCart = useCallback((productId: string, optionsHash: string) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => {
        const itemHash = generateItemHash(item);
        return !(item.productId === productId && itemHash === optionsHash);
      })
    );
  }, []);

  const updateCartItemQuantity = useCallback(
    (productId: string, optionsHash: string, quantity: number) => {
      setCartItems((prevItems) =>
        prevItems.map((item) => {
          const itemHash = generateItemHash(item);
          if (item.productId === productId && itemHash === optionsHash) {
            return {
              ...item,
              quantity: quantity,
              totalPrice: item.unitPrice * quantity,
            };
          }
          return item;
        })
      );
    },
    []
  );

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const getCartTotal = useCallback(() => {
    return cartItems.reduce((total, item) => total + item.totalPrice, 0);
  }, [cartItems]);

  const contextValue: CartContextType = {
    cartItems,
    addToCart,
    removeFromCart,
    updateCartItemQuantity,
    clearCart,
    getCartTotal,
  };

  return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>;
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
