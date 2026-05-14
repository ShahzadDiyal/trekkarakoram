export interface Expedition {
  id: string;
  slug: string;
  title: string;
  location: string;
  duration: string;
  price: number;
  difficulty: 'Easy' | 'Moderate' | 'Hard' | 'Extreme';
  image: string;
  description: string;
  altitude: string;
  season: 'Spring' | 'Summer' | 'Autumn' | 'Winter';
  highlights: string[];
  itinerary: { day: number; title: string; description: string }[];
  stats: { label: string; value: string }[];
  included: string[];
  faqs: { question: string; answer: string }[];
  reviews: { id: string; author: string; rating: number; content: string; date: string }[];
}

export interface Destination {
  id: string;
  name: string;
  region: string;
  image: string;
  description: string;
  difficulty: 'Easy' | 'Moderate' | 'Hard' | 'Extreme';
  season: string;
  tags: string[];
}

export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}
