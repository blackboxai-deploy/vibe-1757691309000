'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { Course } from '@/types';

interface AddToCartButtonProps {
  course: Course;
  variant?: 'default' | 'outline' | 'secondary';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
}

export default function AddToCartButton({ 
  course, 
  variant = 'default',
  size = 'default',
  className = '' 
}: AddToCartButtonProps) {
  const { addToCart, isInCart, toggleCart } = useCart();
  const [isLoading, setIsLoading] = useState(false);

  const handleAddToCart = async () => {
    if (isInCart(course.id)) {
      // Se já está no carrinho, abre o carrinho
      toggleCart();
      return;
    }

    setIsLoading(true);
    
    // Simular um pequeno delay para feedback visual
    setTimeout(() => {
      addToCart(course);
      setIsLoading(false);
    }, 300);
  };

  const inCart = isInCart(course.id);

  return (
    <Button
      onClick={handleAddToCart}
      disabled={isLoading}
      variant={inCart ? 'outline' : variant}
      size={size}
      className={`w-full ${inCart ? 'border-green-600 text-green-600 hover:bg-green-50' : 'bg-blue-600 hover:bg-blue-700'} ${className}`}
    >
      {isLoading ? (
        <>
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Adicionando...
        </>
      ) : inCart ? (
        <>
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Adicionado - Ver Carrinho
        </>
      ) : (
        <>
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.8 9M7 13l1.8-9m0 0h12.6M19 13v6a2 2 0 01-2 2H7a2 2 0 01-2-2v-6" />
          </svg>
          Adicionar ao Carrinho
        </>
      )}
    </Button>
  );
}