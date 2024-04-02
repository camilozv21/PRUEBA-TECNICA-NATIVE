import React, {createContext, useState, FC, ReactNode} from 'react';
import {Product} from '../common/interfaces/product';

interface CartContextValue {
  cart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
}

interface CartProviderProps {
  children: ReactNode;
}

export const CartContext = createContext<CartContextValue>({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
});

export const CartProvider: FC<CartProviderProps> = ({children}) => {
  const [cart, setCart] = useState<Product[]>([]);

  const addToCart = (product: Product) => {
    setCart(currentCart => [...currentCart, product]);
  };

  const removeFromCart = (productId: number) => {
    setCart(currentCart =>
      currentCart.filter(product => product.id !== productId),
    );
  };

  return (
    <CartContext.Provider value={{cart, addToCart, removeFromCart}}>
      {children}
    </CartContext.Provider>
  );
};
