import type { Testimonial, FaqItem } from '@/types'

export const landingFeatures = [
  {
    id: 'f1',
    title: 'Mood Tracking',
    description: 'Log daily emotions with beautiful, intuitive mood cards designed for students.',
    icon: 'Heart',
  },
  {
    id: 'f2',
    title: 'Stress Insights',
    description: 'Identify what triggers your stress — exams, sleep, family pressure, and more.',
    icon: 'Brain',
  },
  {
    id: 'f3',
    title: 'Reflection Journal',
    description: 'Process your thoughts with a private journal linked to your mood patterns.',
    icon: 'BookOpen',
  },
  {
    id: 'f4',
    title: 'Wellness Toolkit',
    description: 'Breathing exercises, focus techniques, and study break ideas at your fingertips.',
    icon: 'Sparkles',
  },
]

export const landingBenefits = [
  'Built specifically for NEET, JEE, UPSC, and competitive exam students',
  'Track patterns between mood, stress, and study performance',
  'Private and secure — your data stays on your device',
  'Science-backed wellness techniques in student-friendly language',
  'Beautiful, calming design that reduces cognitive load',
]

export const wellnessStats = [
  { value: 73, suffix: '%', label: 'Students report exam anxiety' },
  { value: 42, suffix: '%', label: 'Improve focus with mood tracking' },
  { value: 58, suffix: '%', label: 'Feel less overwhelmed with journaling' },
  { value: 89, suffix: '%', label: 'Would recommend to a friend' },
]

export const howItWorksSteps = [
  {
    step: 1,
    title: 'Check in daily',
    description: 'Log your mood in seconds with emoji-based emotion cards.',
  },
  {
    step: 2,
    title: 'Track triggers',
    description: 'Identify what causes stress during your preparation journey.',
  },
  {
    step: 3,
    title: 'Reflect & grow',
    description: 'Use your journal and wellness toolkit to build healthier habits.',
  },
]

export const mockTestimonials: Testimonial[] = [
  {
    id: 't1',
    name: 'Ananya K.',
    exam: 'NEET Aspirant',
    quote:
      'MindFlow helped me realize my stress peaked before mock tests. Now I plan lighter days before exams.',
    rating: 5,
  },
  {
    id: 't2',
    name: 'Rahul M.',
    exam: 'JEE Advanced',
    quote:
      'The breathing exercises became part of my daily routine. My focus during long study sessions improved a lot.',
    rating: 5,
  },
  {
    id: 't3',
    name: 'Sneha P.',
    exam: 'UPSC CSE',
    quote:
      'Journaling helped me process the emotional rollercoaster of preparation. It feels like having a supportive friend.',
    rating: 4,
  },
]

export const mockFaqs: FaqItem[] = [
  {
    id: 'faq1',
    question: 'Is my data private?',
    answer:
      'Yes. MindFlow stores all data locally on your device. We do not collect, store, or share your personal wellness data.',
  },
  {
    id: 'faq2',
    question: 'Do I need to check in every day?',
    answer:
      'Daily check-ins give the best insights, but there is no penalty for missing a day. Even occasional tracking helps you understand patterns.',
  },
  {
    id: 'faq3',
    question: 'Is this a replacement for therapy?',
    answer:
      'No. MindFlow is a self-care tool for students. If you are struggling with severe anxiety or depression, please reach out to a mental health professional.',
  },
  {
    id: 'faq4',
    question: 'Which exams is this designed for?',
    answer:
      'MindFlow is built for students preparing for NEET, JEE, UPSC, GATE, CAT, CUET, Board Exams, and other competitive examinations.',
  },
]
