import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CourseCard from '@/components/course/CourseCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { getCourseBySlug, courses, reviews } from '@/lib/data';
import AddToCartButton from '@/components/course/AddToCartButton';

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  
  if (!course) {
    return {
      title: 'Curso não encontrado'
    };
  }

  return {
    title: `${course.title} | EduTech`,
    description: course.description,
    keywords: course.tags,
    openGraph: {
      title: course.title,
      description: course.description,
      images: [course.image],
    },
  };
}

export default async function CoursePage({ params }: Props) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);

  if (!course) {
    notFound();
  }

  const courseReviews = reviews.filter(review => review.courseId === course.id);
  const relatedCourses = courses
    .filter(c => c.category === course.category && c.id !== course.id)
    .slice(0, 3);

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
            <linearGradient id="half-star">
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="#D1D5DB" />
            </linearGradient>
          </defs>
          <path fill="url(#half-star)" d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
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

  const getLevelColor = (level: string) => {
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
    <div className="min-h-screen">
      <Header />
      
      <main>
        {/* Breadcrumb */}
        <div className="bg-gray-50 py-4">
          <div className="container mx-auto px-4">
            <nav className="text-sm text-gray-600">
              <span>Início</span> <span className="mx-2">›</span> 
              <span>Cursos</span> <span className="mx-2">›</span> 
              <span>{course.category}</span> <span className="mx-2">›</span> 
              <span className="text-gray-900">{course.title}</span>
            </nav>
          </div>
        </div>

        {/* Course Header */}
        <section className="py-8 bg-gray-50 border-b">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Course Info */}
              <div className="lg:col-span-2">
                <div className="flex items-center gap-2 mb-4">
                  <Badge variant="outline">{course.category}</Badge>
                  <Badge className={getLevelColor(course.level)}>{course.level}</Badge>
                </div>

                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  {course.title}
                </h1>

                <p className="text-xl text-gray-600 mb-6">
                  {course.description}
                </p>

                <div className="flex items-center gap-6 mb-6">
                  <div className="flex items-center">
                    {renderStars(course.rating)}
                    <span className="ml-2 text-sm text-gray-600">
                      {course.rating} ({course.reviewsCount} avaliações)
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">
                    {course.studentsCount.toLocaleString()} alunos
                  </div>
                  <div className="text-sm text-gray-600">
                    {course.duration}
                  </div>
                </div>

                <div className="flex items-center gap-4 mb-6">
                  <img
                    src={`https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/b8a16956-5708-431f-b04a-b8bbf48b522c.png' ').map(n => n[0]).join('')}`}
                    alt={course.instructor}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <div className="font-medium text-gray-900">{course.instructor}</div>
                    <div className="text-sm text-gray-600">Instrutor</div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {course.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Course Video/Image & Purchase */}
              <div className="lg:col-span-1">
                <Card className="sticky top-24">
                  <div className="aspect-video relative rounded-t-lg overflow-hidden">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <Button className="bg-white/20 backdrop-blur-sm hover:bg-white/30 border border-white/40 text-white">
                        <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                        </svg>
                        Preview do Curso
                      </Button>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <div className="mb-6">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-3xl font-bold text-blue-600">
                          {formatPrice(course.price)}
                        </span>
                        {course.originalPrice && course.originalPrice > course.price && (
                          <span className="text-lg text-gray-500 line-through">
                            {formatPrice(course.originalPrice)}
                          </span>
                        )}
                      </div>
                      {course.originalPrice && course.originalPrice > course.price && (
                        <div className="text-sm text-green-600 font-medium">
                          Economize {formatPrice(course.originalPrice - course.price)} 
                          ({Math.round((1 - course.price / course.originalPrice) * 100)}% OFF)
                        </div>
                      )}
                    </div>

                    <AddToCartButton course={course} />

                    <div className="mt-6 space-y-3 text-sm text-gray-600">
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Acesso vitalício
                      </div>
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Certificado de conclusão
                      </div>
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Suporte direto
                      </div>
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        30 dias de garantia
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Course Content */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="overview">Visão Geral</TabsTrigger>
                    <TabsTrigger value="curriculum">Currículo</TabsTrigger>
                    <TabsTrigger value="instructor">Instrutor</TabsTrigger>
                    <TabsTrigger value="reviews">Avaliações</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="mt-6">
                    <div className="space-y-8">
                      <div>
                        <h3 className="text-2xl font-bold mb-4">Sobre este curso</h3>
                        <p className="text-gray-600 leading-relaxed">
                          {course.longDescription}
                        </p>
                      </div>

                      <div>
                        <h3 className="text-2xl font-bold mb-4">O que você vai aprender</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {course.whatYoullLearn.map((item, index) => (
                            <div key={index} className="flex items-start">
                              <svg className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              <span className="text-gray-700">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-2xl font-bold mb-4">Recursos inclusos</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {course.features.map((feature, index) => (
                            <div key={index} className="flex items-start">
                              <svg className="w-5 h-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              <span className="text-gray-700">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-2xl font-bold mb-4">Requisitos</h3>
                        <ul className="space-y-2">
                          {course.requirements.map((requirement, index) => (
                            <li key={index} className="flex items-start">
                              <svg className="w-5 h-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              <span className="text-gray-700">{requirement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="curriculum" className="mt-6">
                    <div>
                      <h3 className="text-2xl font-bold mb-6">Conteúdo do curso</h3>
                      <Accordion type="single" collapsible className="w-full">
                        {course.curriculum.map((module, index) => (
                          <AccordionItem key={module.id} value={`module-${index}`}>
                            <AccordionTrigger className="text-left">
                              <div>
                                <div className="font-semibold">{module.title}</div>
                                <div className="text-sm text-gray-500">
                                  {module.lessons.length} aulas • {module.duration}
                                </div>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent>
                              <div className="space-y-3 pl-4">
                                {module.lessons.map((lesson) => (
                                  <div key={lesson.id} className="flex items-center justify-between py-2">
                                    <div className="flex items-center">
                                      <svg className="w-4 h-4 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        {lesson.type === 'video' ? (
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                        ) : lesson.type === 'quiz' ? (
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        ) : (
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.664-2.647l-.69.69a1.022 1.022 0 01-1.447-1.447l.69-.69z" />
                                        )}
                                      </svg>
                                      <span className={`${lesson.preview ? 'text-blue-600' : 'text-gray-700'}`}>
                                        {lesson.title}
                                      </span>
                                      {lesson.preview && (
                                        <Badge variant="outline" className="ml-2 text-xs">
                                          Grátis
                                        </Badge>
                                      )}
                                    </div>
                                    <span className="text-sm text-gray-500">{lesson.duration}</span>
                                  </div>
                                ))}
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </div>
                  </TabsContent>

                  <TabsContent value="instructor" className="mt-6">
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4 mb-4">
                          <img
                            src={`https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/6a30b77b-fc3a-40b7-9485-40290c843fde.png' ').map(n => n[0]).join('')}`}
                            alt={course.instructor}
                            className="w-20 h-20 rounded-full"
                          />
                          <div>
                            <h3 className="text-xl font-bold">{course.instructor}</h3>
                            <p className="text-gray-600 mt-2">{course.instructorBio}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="reviews" className="mt-6">
                    <div>
                      <h3 className="text-2xl font-bold mb-6">
                        Avaliações ({course.reviewsCount})
                      </h3>
                      
                      <div className="space-y-6">
                        {courseReviews.map((review) => (
                          <Card key={review.id}>
                            <CardContent className="p-6">
                              <div className="flex items-start space-x-4">
                                <img
                                  src={review.userAvatar || `https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/9a04c0d9-dc69-4142-b473-4981848dbb0d.png' ').map(n => n[0]).join('')}`}
                                  alt={review.userName}
                                  className="w-12 h-12 rounded-full"
                                />
                                <div className="flex-1">
                                  <div className="flex items-center justify-between mb-2">
                                    <div>
                                      <h4 className="font-semibold">{review.userName}</h4>
                                      <div className="flex items-center mt-1">
                                        {renderStars(review.rating)}
                                        <span className="ml-2 text-sm text-gray-600">{review.date}</span>
                                      </div>
                                    </div>
                                  </div>
                                  <p className="text-gray-700 mb-3">{review.comment}</p>
                                  <div className="flex items-center text-sm text-gray-600">
                                    <button className="flex items-center hover:text-blue-600">
                                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                                      </svg>
                                      Útil ({review.helpful})
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                {relatedCourses.length > 0 && (
                  <div>
                    <h3 className="text-xl font-bold mb-6">Cursos relacionados</h3>
                    <div className="space-y-4">
                      {relatedCourses.map((relatedCourse) => (
                        <CourseCard 
                          key={relatedCourse.id} 
                          course={relatedCourse} 
                          compact={true}
                          showAddToCart={false}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}