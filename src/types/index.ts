export interface Expedition {
  id: string;
  title: string;
  location: string;
  duration: string;
  price: number;
  difficulty: 'Easy' | 'Moderate' | 'Hard' | 'Extreme';
  image: string;
  description: string;
}

export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}
