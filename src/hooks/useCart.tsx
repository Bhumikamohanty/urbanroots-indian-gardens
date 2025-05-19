
import { useState, useEffect } from 'react';
import { ShopItem, shopItems } from '@/data/shopItems';
import { toast } from 'sonner';

export interface CartItem extends ShopItem {
  quantity: number;
}

export const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('urbanroots_cart');
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
    }
  }, []);

  // Save cart to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem('urbanroots_cart', JSON.stringify(cart));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }, [cart]);

  // Add item to cart
  const addToCart = (itemId: string, quantity: number = 1) => {
    const item = shopItems.find(item => item.id === itemId);
    
    if (!item) {
      toast.error('Product not found');
      return;
    }
    
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === itemId);
      
      if (existingItem) {
        return prevCart.map(cartItem => 
          cartItem.id === itemId 
            ? { ...cartItem, quantity: cartItem.quantity + quantity } 
            : cartItem
        );
      } else {
        return [...prevCart, { ...item, quantity }];
      }
    });
    
    toast.success(`${item.name} added to cart`);
  };

  // Update item quantity in cart
  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      return removeFromCart(itemId);
    }
    
    setCart(prevCart => 
      prevCart.map(cartItem => 
        cartItem.id === itemId ? { ...cartItem, quantity } : cartItem
      )
    );
  };

  // Remove item from cart
  const removeFromCart = (itemId: string) => {
    const itemToRemove = cart.find(item => item.id === itemId);
    
    if (itemToRemove) {
      setCart(prevCart => prevCart.filter(cartItem => cartItem.id !== itemId));
      toast.success(`${itemToRemove.name} removed from cart`);
    }
  };

  // Clear entire cart
  const clearCart = () => {
    setCart([]);
    toast.success('Cart cleared');
  };

  // Calculate total price of items in cart
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // Calculate total number of items in cart
  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);

  return {
    cart,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    calculateTotal,
    cartItemCount
  };
};
