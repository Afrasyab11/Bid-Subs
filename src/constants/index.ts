import type { FAQItem, PricingPlan, Testimonial } from "../utils/types";

export const faqData: FAQItem[] = [
  {
    id: 1,
    question: "What is BidSubs?",
    answer:
      "BidSubs is an AI-powered estimating platform built for subcontractors. Upload your plans, and our system automatically generates accurate takeoffs, cost estimates, and professional proposals—in minutes, not hours.",
  },
  {
    id: 2,
    question: "How does the AI work?",
    answer:
      "Our AI analyzes your construction plans using advanced computer vision and machine learning algorithms to automatically identify materials, quantities, and labor requirements, then generates accurate estimates based on current market data.",
  },
  {
    id: 3,
    question: "How much does it cost?",
    answer:
      "We offer flexible pricing plans to suit different business sizes, from solo contractors to large subcontracting firms. Contact us for detailed pricing information tailored to your specific needs.",
  },
  {
    id: 4,
    question: "Can I customize my proposals?",
    answer:
      "Yes! You can fully customize your proposals with your company branding, terms, conditions, and formatting preferences. Our platform allows you to create professional-looking proposals that match your business style.",
  },
  {
    id: 5,
    question: "How long does it take to generate an estimate?",
    answer:
      "Most estimates are generated within 2-5 minutes after uploading your plans. Complex projects may take slightly longer, but you'll typically have your complete takeoff and estimate ready in under 10 minutes.",
  },
];

export const plans: PricingPlan[] = [
  {
    id: "50k",
    title: "$50K Trading Challenge",
    price: "$127",
    period: "/ month",
    features: [
      "Profit Target: $3,000",
      "Max Position: 3 Contracts",
      "Daily Loss Limit: $0",
      "Trailing Max Drawdown: $2,000",
      "Drawdown Mode: End of Day (EOD)",
      "One-Time Activation Fee Applies",
    ],
  },
  {
    id: "100k",
    title: "$100K Trading Challenge",
    price: "$267",
    period: "/ month",
    features: [
      "Profit Target: $6,000",
      "Max Position: 6 Contracts",
      "Daily Loss Limit: $0",
      "Trailing Max Drawdown: $3,000",
      "Drawdown Mode: End of Day (EOD)",
      "One-Time Activation Fee Applies",
    ],
    isPopular: true,
  },
  {
    id: "150k",
    title: "$150K Trading Challenge",
    price: "$377",
    period: "/ month",
    features: [
      "Profit Target: $9,000",
      "Max Position: 9 Contracts",
      "Daily Loss Limit: $0",
      "Trailing Max Drawdown: $4,500",
      "Drawdown Mode: End of Day (EOD)",
      "One-Time Activation Fee Applies",
    ],
  },
];

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Samantha K.",
    rating: 5,
    text: "We used to spend 8-10 hours on a single bid. Now it's done in under an hour—with better accuracy.",
  },
  {
    id: 2,
    name: "Samantha K.",
    rating: 5,
    text: "With BidSubs, we're not just faster—we're sharper, more competitive, and more profitable.",
  },
  {
    id: 3,
    name: "Samantha K.",
    rating: 5,
    text: "The AI does what used to take hours. It even pulls current pricing and formats our proposals.",
  },
  {
    id: 4,
    name: "Sam L.",
    rating: 5,
    text: "It's made my bidding process so much more efficient—not just good, but great.",
  },
  {
    id: 5,
    name: "Michael R.",
    rating: 5,
    text: "The accuracy is incredible. We're winning more bids and spending less time on estimates.",
  },
];
