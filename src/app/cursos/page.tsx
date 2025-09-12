'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CourseCard from '@/components/course/CourseCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { filterCourses, categories } from '@/lib/data';
import { Course } from '@/types';

function CoursesPageContent() {
  const searchParams = useSearchParams();
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Filtros
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [sortBy, setSortBy] = useState('popular');

  useEffect(() => {
    // Simular carregamento de dados
    const loadCourses = () => {
      setLoading(true);
      setTimeout(() => {
        const allCourses = filterCourses();
        setCourses(allCourses);
        setLoading(false);
      }, 500);
    };

    loadCourses();

    // Aplicar filtros da URL
    const query = searchParams?.get('q') || '';
    const categoria = searchParams?.get('categoria') || '';
    const nivel = searchParams?.get('nivel') || '';

    setSearchQuery(query);
    if (categoria) {
      const category = categories.find(cat => cat.slug === categoria);
      setSelectedCategory(category?.name || '');
    }
    setSelectedLevel(nivel);
  }, [searchParams]);

  useEffect(() => {
    // Aplicar filtros
    const filtered = filterCourses(
      searchQuery,
      selectedCategory,
      selectedLevel,
      priceRange[0],
      priceRange[1]
    );

    // Aplicar ordenação
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'popular':
        default:
          return b.studentsCount - a.studentsCount;
      }
    });

    setFilteredCourses(sorted);
  }, [courses, searchQuery, selectedCategory, selectedLevel, priceRange, sortBy]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setSelectedLevel('');
    setPriceRange([0, 1000]);
    setSortBy('popular');
  };

  const activeFiltersCount = [
    searchQuery,
    selectedCategory,
    selectedLevel,
    priceRange[0] > 0 || priceRange[1] < 1000 ? 'price' : ''
  ].filter(Boolean).length;

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-600 mb-6">
          <span>Início</span> <span className="mx-2">›</span> <span>Cursos</span>
        </nav>

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {searchQuery ? `Resultados para "${searchQuery}"` : 'Todos os Cursos'}
          </h1>
          <p className="text-gray-600">
            {loading ? 'Carregando...' : `${filteredCourses.length} cursos encontrados`}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar com Filtros */}
          <aside className="lg:w-80 flex-shrink-0">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold">Filtros</h3>
                  {activeFiltersCount > 0 && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={clearFilters}
                    >
                      Limpar ({activeFiltersCount})
                    </Button>
                  )}
                </div>

                <div className="space-y-6">
                  {/* Busca */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Buscar
                    </label>
                    <Input
                      type="search"
                      placeholder="Nome do curso, instrutor..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>

                  {/* Categoria */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Categoria
                    </label>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger>
                        <SelectValue placeholder="Todas as categorias" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Todas as categorias</SelectItem>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.name}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Nível */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nível
                    </label>
                    <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                      <SelectTrigger>
                        <SelectValue placeholder="Todos os níveis" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Todos os níveis</SelectItem>
                        <SelectItem value="Iniciante">Iniciante</SelectItem>
                        <SelectItem value="Intermediário">Intermediário</SelectItem>
                        <SelectItem value="Avançado">Avançado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Faixa de Preço */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Preço: R$ {priceRange[0]} - R$ {priceRange[1]}
                    </label>
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      max={1000}
                      min={0}
                      step={50}
                      className="mt-2"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </aside>

          {/* Conteúdo Principal */}
          <div className="flex-1">
            {/* Barra de Ordenação */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div className="flex flex-wrap gap-2">
                {searchQuery && (
                  <Badge variant="secondary" className="px-3 py-1">
                    Busca: {searchQuery}
                    <button 
                      onClick={() => setSearchQuery('')}
                      className="ml-2 text-gray-500 hover:text-gray-700"
                    >
                      ×
                    </button>
                  </Badge>
                )}
                {selectedCategory && (
                  <Badge variant="secondary" className="px-3 py-1">
                    {selectedCategory}
                    <button 
                      onClick={() => setSelectedCategory('')}
                      className="ml-2 text-gray-500 hover:text-gray-700"
                    >
                      ×
                    </button>
                  </Badge>
                )}
                {selectedLevel && (
                  <Badge variant="secondary" className="px-3 py-1">
                    {selectedLevel}
                    <button 
                      onClick={() => setSelectedLevel('')}
                      className="ml-2 text-gray-500 hover:text-gray-700"
                    >
                      ×
                    </button>
                  </Badge>
                )}
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Ordenar por:</span>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popular">Mais Popular</SelectItem>
                    <SelectItem value="newest">Mais Recente</SelectItem>
                    <SelectItem value="rating">Melhor Avaliado</SelectItem>
                    <SelectItem value="price-low">Menor Preço</SelectItem>
                    <SelectItem value="price-high">Maior Preço</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Grid de Cursos */}
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="bg-gray-200 animate-pulse rounded-lg h-96"></div>
                ))}
              </div>
            ) : filteredCourses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredCourses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.664-2.647l-.69.69a7.952 7.952 0 01-2.149-6.691A7.952 7.952 0 016.051 3.05a7.952 7.952 0 016.691 2.149l-.69.69A7.962 7.962 0 0115 12a7.962 7.962 0 01-2.647 5.664l-.69-.69z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Nenhum curso encontrado
                </h3>
                <p className="text-gray-600 mb-6">
                  Tente ajustar os filtros ou fazer uma nova busca
                </p>
                <Button onClick={clearFilters} className="bg-blue-600 hover:bg-blue-700">
                  Limpar filtros
                </Button>
              </div>
            )}

            {/* Load More / Pagination */}
            {filteredCourses.length > 12 && (
              <div className="text-center mt-12">
                <Button variant="outline" size="lg">
                  Carregar mais cursos
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function CoursesPage() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <CoursesPageContent />
    </Suspense>
  );
}