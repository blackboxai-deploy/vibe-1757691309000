'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { categories } from '@/lib/data';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { state, toggleCart } = useCart();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/cursos?q=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-blue-600 text-white py-2">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">
            🎓 <strong>Oferta Especial:</strong> Todos os cursos com até 40% de desconto por tempo limitado!
          </p>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">E</span>
            </div>
            <span className="font-bold text-xl text-gray-900">EduTech</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link 
              href="/cursos" 
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Todos os Cursos
            </Link>
            
            {/* Categories Dropdown */}
            <div className="relative group">
              <button className="text-gray-700 hover:text-blue-600 font-medium transition-colors flex items-center">
                Categorias
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              <div className="absolute top-full left-0 w-64 bg-white shadow-lg rounded-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 mt-2">
                <div className="p-4 grid grid-cols-1 gap-2">
                  {categories.map((category) => (
                    <Link
                      key={category.id}
                      href={`/cursos?categoria=${category.slug}`}
                      className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <span className="text-gray-700">{category.name}</span>
                      <Badge variant="secondary" className="text-xs">
                        {category.courseCount}
                      </Badge>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link 
              href="/sobre" 
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Sobre
            </Link>
            
            <Link 
              href="/contato" 
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Contato
            </Link>
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="flex w-full">
              <Input
                type="search"
                placeholder="Buscar cursos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="rounded-r-none focus:ring-blue-500 focus:border-blue-500"
              />
              <Button 
                type="submit"
                className="rounded-l-none bg-blue-600 hover:bg-blue-700 px-4"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </Button>
            </form>
          </div>

          {/* Cart and Auth Buttons */}
          <div className="flex items-center space-x-4">
            {/* Cart Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={toggleCart}
              className="relative"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.8 9M7 13l1.8-9m0 0h12.6M19 13v6a2 2 0 01-2 2H7a2 2 0 01-2-2v-6" />
              </svg>
              {state.totalItems > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-2 -right-2 min-w-[20px] h-5 p-0 flex items-center justify-center text-xs"
                >
                  {state.totalItems}
                </Badge>
              )}
            </Button>

            {/* Auth Buttons */}
            <Button variant="outline" size="sm" className="hidden sm:flex">
              Entrar
            </Button>
            
            <Button size="sm" className="hidden sm:flex bg-blue-600 hover:bg-blue-700">
              Cadastrar
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} 
                />
              </svg>
            </Button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-4">
          <form onSubmit={handleSearch} className="flex">
            <Input
              type="search"
              placeholder="Buscar cursos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="rounded-r-none"
            />
            <Button 
              type="submit"
              className="rounded-l-none bg-blue-600 hover:bg-blue-700 px-4"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </Button>
          </form>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t">
          <div className="container mx-auto px-4 py-4">
            <nav className="space-y-4">
              <Link 
                href="/cursos" 
                className="block text-gray-700 hover:text-blue-600 font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Todos os Cursos
              </Link>
              
              <div className="space-y-2">
                <span className="block text-gray-900 font-medium py-2">Categorias</span>
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    href={`/cursos?categoria=${category.slug}`}
                    className="block pl-4 text-gray-600 hover:text-blue-600 py-1"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
              
              <Link 
                href="/sobre" 
                className="block text-gray-700 hover:text-blue-600 font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Sobre
              </Link>
              
              <Link 
                href="/contato" 
                className="block text-gray-700 hover:text-blue-600 font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Contato
              </Link>

              <div className="flex space-x-4 pt-4 border-t">
                <Button variant="outline" className="flex-1">
                  Entrar
                </Button>
                <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                  Cadastrar
                </Button>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}