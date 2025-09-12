// Tipos TypeScript para o site de cursos

export interface Course {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  instructor: string;
  instructorBio: string;
  price: number;
  originalPrice?: number;
  duration: string;
  level: 'Iniciante' | 'Intermediário' | 'Avançado';
  category: string;
  tags: string[];
  image: string;
  videoPreview?: string;
  rating: number;
  reviewsCount: number;
  studentsCount: number;
  lastUpdated: string;
  slug: string;
  curriculum: CurriculumModule[];
  features: string[];
  requirements: string[];
  whatYoullLearn: string[];
}

export interface CurriculumModule {
  id: string;
  title: string;
  lessons: Lesson[];
  duration: string;
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  type: 'video' | 'text' | 'quiz' | 'exercise';
  preview?: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  courseCount: number;
}

export interface CartItem {
  courseId: string;
  course: Course;
  quantity: number;
  addedAt: Date;
}

export interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  isOpen: boolean;
}

export interface Review {
  id: string;
  courseId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
}

export interface Instructor {
  id: string;
  name: string;
  bio: string;
  avatar: string;
  specialties: string[];
  coursesCount: number;
  studentsCount: number;
  rating: number;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company?: string;
  avatar: string;
  content: string;
  rating: number;
  courseTitle?: string;
}

export interface FilterOptions {
  categories: string[];
  levels: Course['level'][];
  priceRange: {
    min: number;
    max: number;
  };
  rating: number;
  duration: string[];
}

export interface SearchFilters {
  query: string;
  category: string;
  level: Course['level'] | '';
  priceMin: number;
  priceMax: number;
  rating: number;
  sortBy: 'popular' | 'newest' | 'price-low' | 'price-high' | 'rating';
}

export interface NewsletterSubscription {
  email: string;
  interests: string[];
  subscribedAt: Date;
}

export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
  phone?: string;
}

export interface CheckoutForm {
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  country: string;
  paymentMethod: 'credit_card' | 'pix' | 'boleto';
  cardNumber?: string;
  cardExpiry?: string;
  cardCvv?: string;
  cardName?: string;
  acceptTerms: boolean;
  newsletter: boolean;
}

export interface OrderSummary {
  items: CartItem[];
  subtotal: number;
  discount: number;
  total: number;
  couponCode?: string;
}