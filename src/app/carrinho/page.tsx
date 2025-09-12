'use client';

import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import Link from 'next/link';

export default function CartPage() {
  const { state, removeFromCart, clearCart } = useCart();
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [couponApplied, setCouponApplied] = useState('');

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  const handleApplyCoupon = () => {
    // Simular validação de cupom
    const validCoupons = {
      'DESCONTO10': 0.10,
      'PRIMEIRACOMPRA': 0.15,
      'ESTUDANTE20': 0.20,
      'BLACK50': 0.50
    };

    if (validCoupons[couponCode as keyof typeof validCoupons]) {
      const discountPercent = validCoupons[couponCode as keyof typeof validCoupons];
      setDiscount(state.totalPrice * discountPercent);
      setCouponApplied(couponCode);
      setCouponCode('');
    } else {
      alert('Cupom inválido!');
    }
  };

  const handleRemoveCoupon = () => {
    setDiscount(0);
    setCouponApplied('');
  };

  const subtotal = state.totalPrice;
  const total = subtotal - discount;

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen">
        <Header />
        
        <main className="container mx-auto px-4 py-16">
          <div className="text-center max-w-md mx-auto">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.8 9M7 13l1.8-9m0 0h12.6M19 13v6a2 2 0 01-2 2H7a2 2 0 01-2-2v-6" />
              </svg>
            </div>
            
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Seu carrinho está vazio
            </h1>
            
            <p className="text-gray-600 mb-8">
              Explore nossos cursos e encontre o conhecimento que você precisa para avançar na sua carreira.
            </p>
            
            <Button asChild className="bg-blue-600 hover:bg-blue-700">
              <Link href="/cursos">
                Explorar Cursos
              </Link>
            </Button>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-600 mb-6">
          <Link href="/" className="hover:text-blue-600">Início</Link> 
          <span className="mx-2">›</span> 
          <span>Carrinho</span>
        </nav>

        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Carrinho de Compras
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Items do Carrinho */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>Seus Cursos ({state.totalItems} {state.totalItems === 1 ? 'item' : 'itens'})</span>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={clearCart}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    Limpar Carrinho
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y">
                  {state.items.map((item) => (
                    <div key={item.courseId} className="p-6 flex items-start space-x-4">
                      {/* Imagem do Curso */}
                      <div className="flex-shrink-0">
                        <img
                          src={item.course.image}
                          alt={item.course.title}
                          className="w-24 h-16 object-cover rounded-lg"
                        />
                      </div>

                      {/* Informações do Curso */}
                      <div className="flex-grow">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <Link 
                              href={`/cursos/${item.course.slug}`}
                              className="text-lg font-semibold text-gray-900 hover:text-blue-600 line-clamp-2"
                            >
                              {item.course.title}
                            </Link>
                            <p className="text-gray-600 text-sm mt-1">
                              Por {item.course.instructor}
                            </p>
                          </div>
                          
                          <button
                            onClick={() => removeFromCart(item.courseId)}
                            className="text-gray-400 hover:text-red-600 p-1"
                            title="Remover do carrinho"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                              <Badge variant="outline">{item.course.level}</Badge>
                              <Badge variant="secondary">{item.course.category}</Badge>
                            </div>
                            <span className="text-sm text-gray-600">
                              {item.course.duration}
                            </span>
                          </div>

                          <div className="text-right">
                            <div className="text-lg font-bold text-blue-600">
                              {formatPrice(item.course.price)}
                            </div>
                            {item.course.originalPrice && item.course.originalPrice > item.course.price && (
                              <div className="text-sm text-gray-500 line-through">
                                {formatPrice(item.course.originalPrice)}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Resumo do Pedido */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Resumo do Pedido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Cupom de Desconto */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cupom de Desconto
                  </label>
                  {couponApplied ? (
                    <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div>
                        <span className="text-sm font-medium text-green-800">
                          {couponApplied} aplicado
                        </span>
                        <p className="text-xs text-green-600">
                          Desconto de {formatPrice(discount)}
                        </p>
                      </div>
                      <button 
                        onClick={handleRemoveCoupon}
                        className="text-green-600 hover:text-green-800"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ) : (
                    <div className="flex space-x-2">
                      <Input
                        type="text"
                        placeholder="Digite o cupom"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                      />
                      <Button 
                        variant="outline" 
                        onClick={handleApplyCoupon}
                        disabled={!couponCode.trim()}
                      >
                        Aplicar
                      </Button>
                    </div>
                  )}
                  
                  <div className="mt-2 text-xs text-gray-500">
                    <p>Cupons disponíveis:</p>
                    <p><strong>DESCONTO10</strong> - 10% off</p>
                    <p><strong>PRIMEIRACOMPRA</strong> - 15% off</p>
                    <p><strong>ESTUDANTE20</strong> - 20% off</p>
                  </div>
                </div>

                {/* Valores */}
                <div className="space-y-2 pt-4 border-t">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal ({state.totalItems} {state.totalItems === 1 ? 'curso' : 'cursos'})</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Desconto</span>
                      <span>-{formatPrice(discount)}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between text-xl font-bold text-gray-900 pt-2 border-t">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>

                {/* Botão de Checkout */}
                <Button 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-6"
                  asChild
                >
                  <Link href="/checkout">
                    Finalizar Compra
                  </Link>
                </Button>

                {/* Garantia */}
                <div className="text-center text-sm text-gray-600 pt-4 border-t">
                  <div className="flex items-center justify-center mb-2">
                    <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.995-3.005A8.001 8.001 0 0113 21a8.001 8.001 0 01-6.995-3.995M13 3v2.004A8.001 8.001 0 0113 21a8.001 8.001 0 01-6.995-3.995" />
                    </svg>
                    <span className="font-medium text-green-600">30 dias de garantia</span>
                  </div>
                  <p>
                    Não gostou do curso? Devolvemos seu dinheiro em até 30 dias.
                  </p>
                </div>

                {/* Política de Segurança */}
                <div className="text-xs text-gray-500 text-center">
                  <p>
                    🔒 Pagamento 100% seguro com criptografia SSL
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Continue Comprando */}
        <div className="mt-12 text-center">
          <Button variant="outline" asChild>
            <Link href="/cursos">
              ← Continue Explorando Cursos
            </Link>
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
}