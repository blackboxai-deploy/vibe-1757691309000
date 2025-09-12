import { Course, Category, Instructor, Testimonial, Review } from '@/types';

// Dados mock dos cursos
export const courses: Course[] = [
  {
    id: '1',
    title: 'Desenvolvimento Web Completo com React e Next.js',
    description: 'Aprenda a criar aplicações web modernas do zero até o deploy',
    longDescription: 'Um curso completo que ensina desde os fundamentos do HTML, CSS e JavaScript até tecnologias modernas como React, Next.js, TypeScript e muito mais. Ideal para quem quer se tornar um desenvolvedor web fullstack.',
    instructor: 'João Silva',
    instructorBio: 'Desenvolvedor Senior com 8 anos de experiência, trabalhou em empresas como Google e Microsoft.',
    price: 297,
    originalPrice: 497,
    duration: '40 horas',
    level: 'Intermediário',
    category: 'Desenvolvimento Web',
    tags: ['React', 'Next.js', 'JavaScript', 'TypeScript', 'HTML', 'CSS'],
    image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/3a80145e-3750-48c9-9d0c-09218fbcf321.png',
    rating: 4.8,
    reviewsCount: 1284,
    studentsCount: 15420,
    lastUpdated: '2024-01-15',
    slug: 'desenvolvimento-web-completo-react-nextjs',
    curriculum: [
      {
        id: 'm1',
        title: 'Fundamentos do Desenvolvimento Web',
        duration: '8 horas',
        lessons: [
          { id: 'l1', title: 'Introdução ao HTML5', duration: '45 min', type: 'video', preview: true },
          { id: 'l2', title: 'CSS3 e Flexbox', duration: '60 min', type: 'video' },
          { id: 'l3', title: 'JavaScript ES6+', duration: '90 min', type: 'video' },
          { id: 'l4', title: 'Exercício Prático', duration: '30 min', type: 'exercise' }
        ]
      },
      {
        id: 'm2',
        title: 'React Fundamentals',
        duration: '12 horas',
        lessons: [
          { id: 'l5', title: 'Introdução ao React', duration: '60 min', type: 'video' },
          { id: 'l6', title: 'Components e Props', duration: '75 min', type: 'video' },
          { id: 'l7', title: 'State e Hooks', duration: '90 min', type: 'video' },
          { id: 'l8', title: 'Projeto Prático', duration: '120 min', type: 'exercise' }
        ]
      }
    ],
    features: [
      'Acesso vitalício ao curso',
      'Certificado de conclusão',
      'Suporte direto com o instrutor',
      'Projetos práticos reais',
      'Atualizações gratuitas'
    ],
    requirements: [
      'Conhecimento básico de informática',
      'Vontade de aprender',
      'Computador com internet'
    ],
    whatYoullLearn: [
      'Criar aplicações web modernas',
      'Dominar React e Next.js',
      'Trabalhar com TypeScript',
      'Deploy de aplicações',
      'Boas práticas de desenvolvimento'
    ]
  },
  {
    id: '2',
    title: 'Python para Data Science e Machine Learning',
    description: 'Domine Python e entre no mundo da ciência de dados',
    longDescription: 'Curso completo de Python aplicado à Data Science e Machine Learning. Aprenda desde os fundamentos da linguagem até algoritmos avançados de ML.',
    instructor: 'Maria Santos',
    instructorBio: 'Data Scientist com PhD em Estatística, especialista em Machine Learning.',
    price: 347,
    originalPrice: 547,
    duration: '50 horas',
    level: 'Intermediário',
    category: 'Data Science',
    tags: ['Python', 'Machine Learning', 'Data Science', 'Pandas', 'Numpy'],
    image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/0e22d419-5c54-4ad9-9fda-7f734c306ed1.png',
    rating: 4.9,
    reviewsCount: 892,
    studentsCount: 8340,
    lastUpdated: '2024-01-20',
    slug: 'python-data-science-machine-learning',
    curriculum: [
      {
        id: 'm3',
        title: 'Python Fundamentals',
        duration: '15 horas',
        lessons: [
          { id: 'l9', title: 'Introdução ao Python', duration: '60 min', type: 'video', preview: true },
          { id: 'l10', title: 'Estruturas de Dados', duration: '90 min', type: 'video' }
        ]
      }
    ],
    features: [
      'Projetos com datasets reais',
      'Certificado reconhecido',
      'Mentoria em grupo',
      'Acesso a comunidade exclusiva'
    ],
    requirements: [
      'Conhecimento básico de matemática',
      'Nenhuma experiência prévia necessária'
    ],
    whatYoullLearn: [
      'Programação em Python',
      'Análise de dados com Pandas',
      'Visualização de dados',
      'Algoritmos de Machine Learning',
      'Deploy de modelos ML'
    ]
  },
  {
    id: '3',
    title: 'Design UX/UI Completo: Do Zero ao Profissional',
    description: 'Torne-se um designer UX/UI completo e crie experiências incríveis',
    longDescription: 'Aprenda todos os aspectos do Design UX/UI, desde pesquisa de usuário até prototipagem e testes. Domine ferramentas como Figma, Adobe XD e metodologias ágeis.',
    instructor: 'Carlos Design',
    instructorBio: 'UX Designer Senior com 10 anos de experiência, trabalhou em startups e grandes corporações.',
    price: 397,
    originalPrice: 597,
    duration: '35 horas',
    level: 'Iniciante',
    category: 'Design',
    tags: ['UX', 'UI', 'Figma', 'Design Thinking', 'Prototipagem'],
    image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/8b727bb3-2b0c-4a73-adb2-15f6f959c23d.png',
    rating: 4.7,
    reviewsCount: 654,
    studentsCount: 5890,
    lastUpdated: '2024-01-10',
    slug: 'design-ux-ui-completo-zero-profissional',
    curriculum: [
      {
        id: 'm4',
        title: 'Fundamentos do UX Design',
        duration: '10 horas',
        lessons: [
          { id: 'l11', title: 'O que é UX Design?', duration: '45 min', type: 'video', preview: true },
          { id: 'l12', title: 'Pesquisa de Usuário', duration: '75 min', type: 'video' }
        ]
      }
    ],
    features: [
      'Portfolio profissional',
      'Templates exclusivos',
      'Feedback personalizado',
      'Networking com outros designers'
    ],
    requirements: [
      'Criatividade e interesse em design',
      'Computador com internet'
    ],
    whatYoullLearn: [
      'Metodologias de UX Research',
      'Criação de wireframes e protótipos',
      'Design de interfaces modernas',
      'Testes de usabilidade',
      'Como conseguir clientes'
    ]
  },
  {
    id: '4',
    title: 'Marketing Digital: Estratégias que Convertem',
    description: 'Aprenda as estratégias de marketing digital que realmente funcionam',
    longDescription: 'Curso prático de marketing digital com foco em resultados. Aprenda Google Ads, Facebook Ads, SEO, email marketing e muito mais.',
    instructor: 'Ana Marketing',
    instructorBio: 'Especialista em Marketing Digital com mais de 50 campanhas de sucesso.',
    price: 247,
    originalPrice: 447,
    duration: '25 horas',
    level: 'Iniciante',
    category: 'Marketing',
    tags: ['Marketing Digital', 'Google Ads', 'Facebook Ads', 'SEO', 'Email Marketing'],
    image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/8971afee-fb81-491e-a974-51b373f39e62.png',
    rating: 4.6,
    reviewsCount: 423,
    studentsCount: 3210,
    lastUpdated: '2024-01-25',
    slug: 'marketing-digital-estrategias-convertem',
    curriculum: [
      {
        id: 'm5',
        title: 'Fundamentos do Marketing Digital',
        duration: '8 horas',
        lessons: [
          { id: 'l13', title: 'Introdução ao Marketing Digital', duration: '50 min', type: 'video', preview: true },
          { id: 'l14', title: 'Funil de Vendas', duration: '65 min', type: 'video' }
        ]
      }
    ],
    features: [
      'Cases reais de sucesso',
      'Planilhas e templates',
      'Certificação Google Partner',
      'Grupo exclusivo no Telegram'
    ],
    requirements: [
      'Conhecimento básico de internet',
      'Interesse em vendas e marketing'
    ],
    whatYoullLearn: [
      'Criar campanhas de Google Ads',
      'Otimizar campanhas do Facebook',
      'Estratégias de SEO',
      'Automação de email marketing',
      'Análise de métricas e ROI'
    ]
  },
  {
    id: '5',
    title: 'Fotografia Profissional: Técnicas e Negócios',
    description: 'Transforme sua paixão por fotografia em uma carreira lucrativa',
    longDescription: 'Aprenda técnicas profissionais de fotografia e como monetizar seu talento. Desde configurações de câmera até como conseguir clientes.',
    instructor: 'Pedro Foto',
    instructorBio: 'Fotógrafo profissional há 15 anos, especialista em casamentos e eventos corporativos.',
    price: 197,
    originalPrice: 397,
    duration: '20 horas',
    level: 'Iniciante',
    category: 'Fotografia',
    tags: ['Fotografia', 'Lightroom', 'Photoshop', 'Negócios', 'Portfólio'],
    image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/89e1d66d-b96d-4d56-9048-265a976237e8.png',
    rating: 4.5,
    reviewsCount: 234,
    studentsCount: 1890,
    lastUpdated: '2024-01-05',
    slug: 'fotografia-profissional-tecnicas-negocios',
    curriculum: [
      {
        id: 'm6',
        title: 'Fundamentos da Fotografia',
        duration: '6 horas',
        lessons: [
          { id: 'l15', title: 'Composição e Enquadramento', duration: '40 min', type: 'video', preview: true },
          { id: 'l16', title: 'ISO, Abertura e Velocidade', duration: '55 min', type: 'video' }
        ]
      }
    ],
    features: [
      'Ensaio prático incluso',
      'Presets para Lightroom',
      'Como precificar serviços',
      'Contratos profissionais'
    ],
    requirements: [
      'Câmera DSLR ou mirrorless',
      'Computador para edição'
    ],
    whatYoullLearn: [
      'Configurações manuais da câmera',
      'Composição e iluminação',
      'Edição no Lightroom e Photoshop',
      'Como conseguir clientes',
      'Gestão de negócio fotográfico'
    ]
  },
  {
    id: '6',
    title: 'Excel Avançado para Análise de Dados',
    description: 'Domine o Excel e torne-se um especialista em análise de dados',
    longDescription: 'Curso completo de Excel focado em análise de dados, dashboards, macros e VBA. Ideal para profissionais que trabalham com dados.',
    instructor: 'Laura Excel',
    instructorBio: 'Analista de dados sênior e consultora em Excel, com certificação Microsoft.',
    price: 147,
    originalPrice: 297,
    duration: '15 horas',
    level: 'Avançado',
    category: 'Produtividade',
    tags: ['Excel', 'VBA', 'Macros', 'Dashboards', 'Análise de Dados'],
    image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/88936dc3-6645-4d08-aa82-241550415de3.png',
    rating: 4.8,
    reviewsCount: 567,
    studentsCount: 4320,
    lastUpdated: '2024-01-12',
    slug: 'excel-avancado-analise-dados',
    curriculum: [
      {
        id: 'm7',
        title: 'Fórmulas e Funções Avançadas',
        duration: '5 horas',
        lessons: [
          { id: 'l17', title: 'Funções de Busca Avançadas', duration: '35 min', type: 'video', preview: true },
          { id: 'l18', title: 'Tabelas Dinâmicas', duration: '50 min', type: 'video' }
        ]
      }
    ],
    features: [
      'Planilhas profissionais',
      'Templates de dashboards',
      'Macros prontas para usar',
      'Suporte técnico especializado'
    ],
    requirements: [
      'Conhecimento básico de Excel',
      'Microsoft Excel 2016 ou superior'
    ],
    whatYoullLearn: [
      'Fórmulas e funções complexas',
      'Criação de dashboards interativos',
      'Automação com VBA e Macros',
      'Análise estatística no Excel',
      'Visualização de dados profissional'
    ]
  }
];

// Categorias dos cursos
export const categories: Category[] = [
  {
    id: '1',
    name: 'Desenvolvimento Web',
    slug: 'desenvolvimento-web',
    description: 'Aprenda a criar sites e aplicações web modernas',
    courseCount: 12
  },
  {
    id: '2',
    name: 'Data Science',
    slug: 'data-science',
    description: 'Ciência de dados e machine learning',
    courseCount: 8
  },
  {
    id: '3',
    name: 'Design',
    slug: 'design',
    description: 'UX/UI Design e design gráfico',
    courseCount: 6
  },
  {
    id: '4',
    name: 'Marketing',
    slug: 'marketing',
    description: 'Marketing digital e estratégias de vendas',
    courseCount: 9
  },
  {
    id: '5',
    name: 'Fotografia',
    slug: 'fotografia',
    description: 'Técnicas de fotografia e edição',
    courseCount: 4
  },
  {
    id: '6',
    name: 'Produtividade',
    slug: 'produtividade',
    description: 'Ferramentas para aumentar sua produtividade',
    courseCount: 7
  }
];

// Instrutores
export const instructors: Instructor[] = [
  {
    id: '1',
    name: 'João Silva',
    bio: 'Desenvolvedor Senior com 8 anos de experiência em tecnologias web modernas.',
    avatar: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/20062996-675e-4144-9377-ebe5cb936eb9.png',
    specialties: ['React', 'Next.js', 'TypeScript', 'Node.js'],
    coursesCount: 5,
    studentsCount: 25000,
    rating: 4.8
  },
  {
    id: '2',
    name: 'Maria Santos',
    bio: 'Data Scientist com PhD em Estatística e especialização em Machine Learning.',
    avatar: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/138abf85-7cb6-44f7-91b0-fbd9e791f1cf.png',
    specialties: ['Python', 'Machine Learning', 'Statistics', 'Data Visualization'],
    coursesCount: 3,
    studentsCount: 15000,
    rating: 4.9
  }
];

// Depoimentos
export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Rafael Oliveira',
    role: 'Desenvolvedor Frontend',
    company: 'TechCorp',
    avatar: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/46b27e9f-408a-4181-8401-1bbaff740a85.png',
    content: 'Excelente curso! Consegui uma promoção logo após completar o curso de React. O conteúdo é muito prático e atualizado.',
    rating: 5,
    courseTitle: 'Desenvolvimento Web Completo'
  },
  {
    id: '2',
    name: 'Amanda Silva',
    role: 'UX Designer',
    company: 'Design Studio',
    avatar: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/a6531a41-467e-4cd0-b181-8de27358caf8.png',
    content: 'O curso de UX/UI mudou minha carreira completamente. Aprendi metodologias que uso no meu trabalho todos os dias.',
    rating: 5,
    courseTitle: 'Design UX/UI Completo'
  },
  {
    id: '3',
    name: 'Carlos Mendes',
    role: 'Analista de Marketing',
    company: 'Marketing Pro',
    avatar: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/42c02bcd-7045-4db4-9da1-9cc6f277d703.png',
    content: 'Curso fantástico! As estratégias ensinadas me ajudaram a aumentar o ROI das campanhas em 300%.',
    rating: 5,
    courseTitle: 'Marketing Digital'
  }
];

// Reviews dos cursos
export const reviews: Review[] = [
  {
    id: '1',
    courseId: '1',
    userName: 'Pedro Costa',
    userAvatar: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/8dfac75c-dac0-48fe-80da-971549b8619a.png',
    rating: 5,
    comment: 'Curso excepcional! O instrutor explica de forma muito clara e os projetos práticos são muito úteis.',
    date: '2024-01-20',
    helpful: 15
  },
  {
    id: '2',
    courseId: '1',
    userName: 'Ana Beatriz',
    userAvatar: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/e8093dbf-5b28-4afc-a17f-f96dd54a465e.png',
    rating: 4,
    comment: 'Muito bom conteúdo, mas poderia ter mais exercícios práticos. No geral, recomendo!',
    date: '2024-01-18',
    helpful: 8
  },
  {
    id: '3',
    courseId: '2',
    userName: 'Ricardo Lima',
    userAvatar: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/c810a22f-4002-43c8-9a48-a446a91868d2.png',
    rating: 5,
    comment: 'Melhor curso de Python que já fiz! A professora Maria é incrível.',
    date: '2024-01-22',
    helpful: 23
  }
];

// Função para buscar curso por slug
export const getCourseBySlug = (slug: string): Course | undefined => {
  return courses.find(course => course.slug === slug);
};

// Função para filtrar cursos
export const filterCourses = (
  query: string = '',
  category: string = '',
  level: string = '',
  priceMin: number = 0,
  priceMax: number = 1000
): Course[] => {
  return courses.filter(course => {
    const matchesQuery = query === '' || 
      course.title.toLowerCase().includes(query.toLowerCase()) ||
      course.description.toLowerCase().includes(query.toLowerCase()) ||
      course.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()));
    
    const matchesCategory = category === '' || course.category === category;
    const matchesLevel = level === '' || course.level === level;
    const matchesPrice = course.price >= priceMin && course.price <= priceMax;
    
    return matchesQuery && matchesCategory && matchesLevel && matchesPrice;
  });
};

// Função para obter cursos em destaque
export const getFeaturedCourses = (): Course[] => {
  return courses.filter(course => course.rating >= 4.7).slice(0, 4);
};

// Função para obter cursos populares
export const getPopularCourses = (): Course[] => {
  return courses.sort((a, b) => b.studentsCount - a.studentsCount).slice(0, 6);
};