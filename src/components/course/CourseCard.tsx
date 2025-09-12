'use client';

import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Course } from '@/types';
import { useCart } from '@/contexts/CartContext';

interface CourseCardProps {
  course: Course;
  showAddToCart?: boolean;
  compact?: boolean;
}

export default function CourseCard({ 
  course, 
  showAddToCart = true, 
  compact = false 
}: CourseCardProps) {
  const { addToCart, isInCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(course);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
        </svg>
      );
    }

    if (hasHalfStar) {
      stars.push(
        <svg key="half" className="w-4 h-4 text-yellow-400" viewBox="0 0 20 20">
          <defs>
            <linearGradient id="half">
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="transparent" />
            </linearGradient>
          </defs>
          <path fill="url(#half)" d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
        </svg>
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <svg key={`empty-${i}`} className="w-4 h-4 text-gray-300 fill-current" viewBox="0 0 20 20">
          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
        </svg>
      );
    }

    return stars;
  };

  const getLevelColor = (level: Course['level']) => {
    switch (level) {
      case 'Iniciante':
        return 'bg-green-100 text-green-800';
      case 'Intermediário':
        return 'bg-yellow-100 text-yellow-800';
      case 'Avançado':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-0 shadow-sm hover:shadow-xl hover:-translate-y-1 bg-white">
      <div className="relative overflow-hidden rounded-t-lg">
        <Link href={`/cursos/${course.slug}`}>
          <div className="aspect-video relative">
            <img
              src={course.image}
              alt={course.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </Link>

        {/* Price Badge */}
        <div className="absolute top-3 right-3">
          <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
            {formatPrice(course.price)}
          </div>
          {course.originalPrice && course.originalPrice > course.price && (
            <div className="bg-white text-gray-600 px-2 py-1 rounded-full text-xs font-medium mt-1 line-through">
              {formatPrice(course.originalPrice)}
            </div>
          )}
        </div>

        {/* Level Badge */}
        <div className="absolute top-3 left-3">
          <Badge className={`${getLevelColor(course.level)} font-medium`}>
            {course.level}
          </Badge>
        </div>
      </div>

      <CardHeader className={compact ? 'p-4 pb-2' : 'p-6 pb-2'}>
        <div className="flex items-start justify-between gap-2 mb-2">
          <Badge variant="outline" className="text-xs">
            {course.category}
          </Badge>
          <span className="text-xs text-gray-500">
            {course.duration}
          </span>
        </div>

        <Link href={`/cursos/${course.slug}`}>
          <h3 className="font-bold text-lg leading-tight line-clamp-2 group-hover:text-blue-600 transition-colors">
            {course.title}
          </h3>
        </Link>

        {!compact && (
          <p className="text-gray-600 text-sm line-clamp-2 mt-2">
            {course.description}
          </p>
        )}
      </CardHeader>

      <CardContent className={compact ? 'px-4 py-2' : 'px-6 py-2'}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-1">
            {renderStars(course.rating)}
            <span className="text-sm text-gray-600 ml-1">
              {course.rating} ({course.reviewsCount})
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>Por {course.instructor}</span>
          <span>{course.studentsCount.toLocaleString()} alunos</span>
        </div>

        {!compact && (
          <div className="flex flex-wrap gap-1 mt-3">
            {course.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
            {course.tags.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{course.tags.length - 3}
              </Badge>
            )}
          </div>
        )}
      </CardContent>

      {showAddToCart && (
        <CardFooter className={compact ? 'p-4 pt-2' : 'p-6 pt-2'}>
          <div className="flex gap-2 w-full">
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              asChild
            >
              <Link href={`/cursos/${course.slug}`}>
                Ver Detalhes
              </Link>
            </Button>
            
            <Button
              size="sm"
              className="flex-1 bg-blue-600 hover:bg-blue-700"
              onClick={handleAddToCart}
              disabled={isInCart(course.id)}
            >
              {isInCart(course.id) ? 'No Carrinho' : 'Adicionar'}
            </Button>
          </div>
        </CardFooter>
      )}
    </Card>
  );
}