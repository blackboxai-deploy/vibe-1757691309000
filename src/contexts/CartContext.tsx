'use client';

import { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import { CartState, CartItem, Course } from '@/types';

// Ações do carrinho
type CartAction =
  | { type: 'ADD_ITEM'; payload: Course }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { courseId: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'TOGGLE_CART' }
  | { type: 'LOAD_CART'; payload: CartState };

// Estado inicial do carrinho
const initialState: CartState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
  isOpen: false,
};

// Reducer do carrinho
const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => item.courseId === action.payload.id);
      
      if (existingItem) {
        // Se o item já existe, apenas incrementa a quantidade
        const updatedItems = state.items.map(item =>
          item.courseId === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        
        return {
          ...state,
          items: updatedItems,
          totalItems: state.totalItems + 1,
          totalPrice: state.totalPrice + action.payload.price,
        };
      } else {
        // Se o item não existe, adiciona ao carrinho
        const newItem: CartItem = {
          courseId: action.payload.id,
          course: action.payload,
          quantity: 1,
          addedAt: new Date(),
        };
        
        return {
          ...state,
          items: [...state.items, newItem],
          totalItems: state.totalItems + 1,
          totalPrice: state.totalPrice + action.payload.price,
        };
      }
    }
    
    case 'REMOVE_ITEM': {
      const itemToRemove = state.items.find(item => item.courseId === action.payload);
      if (!itemToRemove) return state;
      
      const updatedItems = state.items.filter(item => item.courseId !== action.payload);
      
      return {
        ...state,
        items: updatedItems,
        totalItems: state.totalItems - itemToRemove.quantity,
        totalPrice: state.totalPrice - (itemToRemove.course.price * itemToRemove.quantity),
      };
    }
    
    case 'UPDATE_QUANTITY': {
      const { courseId, quantity } = action.payload;
      
      if (quantity <= 0) {
        // Se quantidade for 0 ou negativa, remove o item
        return cartReducer(state, { type: 'REMOVE_ITEM', payload: courseId });
      }
      
      const itemToUpdate = state.items.find(item => item.courseId === courseId);
      if (!itemToUpdate) return state;
      
      const quantityDifference = quantity - itemToUpdate.quantity;
      const priceDifference = itemToUpdate.course.price * quantityDifference;
      
      const updatedItems = state.items.map(item =>
        item.courseId === courseId
          ? { ...item, quantity }
          : item
      );
      
      return {
        ...state,
        items: updatedItems,
        totalItems: state.totalItems + quantityDifference,
        totalPrice: state.totalPrice + priceDifference,
      };
    }
    
    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
        totalItems: 0,
        totalPrice: 0,
      };
    
    case 'TOGGLE_CART':
      return {
        ...state,
        isOpen: !state.isOpen,
      };
    
    case 'LOAD_CART':
      return action.payload;
    
    default:
      return state;
  }
};

// Context
const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
  addToCart: (course: Course) => void;
  removeFromCart: (courseId: string) => void;
  updateQuantity: (courseId: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  getItemCount: () => number;
  getItemPrice: (courseId: string) => number;
  isInCart: (courseId: string) => boolean;
} | null>(null);

// Hook para usar o contexto
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart deve ser usado dentro de um CartProvider');
  }
  return context;
};

// Provider do carrinho
interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Carregar carrinho do localStorage na inicialização
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('edutech-cart');
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        dispatch({ type: 'LOAD_CART', payload: parsedCart });
      }
    } catch (error) {
      console.error('Erro ao carregar carrinho do localStorage:', error);
    }
  }, []);

  // Salvar carrinho no localStorage sempre que o estado mudar
  useEffect(() => {
    try {
      localStorage.setItem('edutech-cart', JSON.stringify(state));
    } catch (error) {
      console.error('Erro ao salvar carrinho no localStorage:', error);
    }
  }, [state]);

  // Funções auxiliares
  const addToCart = (course: Course) => {
    dispatch({ type: 'ADD_ITEM', payload: course });
  };

  const removeFromCart = (courseId: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: courseId });
  };

  const updateQuantity = (courseId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { courseId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const toggleCart = () => {
    dispatch({ type: 'TOGGLE_CART' });
  };

  const getItemCount = (): number => {
    return state.totalItems;
  };

  const getItemPrice = (courseId: string): number => {
    const item = state.items.find(item => item.courseId === courseId);
    return item ? item.course.price * item.quantity : 0;
  };

  const isInCart = (courseId: string): boolean => {
    return state.items.some(item => item.courseId === courseId);
  };

  const contextValue = {
    state,
    dispatch,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    toggleCart,
    getItemCount,
    getItemPrice,
    isInCart,
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};