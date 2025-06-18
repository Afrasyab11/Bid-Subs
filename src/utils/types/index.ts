export interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

export interface PricingPlan {
  id: string;
  title: string;
  price: string;
  period: string;
  features: string[];
  isPopular?: boolean;
}

export interface Testimonial {
  id: number;
  name: string;
  rating: number;
  text: string;
  profile: string;
}
