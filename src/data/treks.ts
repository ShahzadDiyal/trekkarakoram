import { Expedition } from '../types';

export const treks: Expedition[] = [
  {
    id: '1',
    slug: 'k2-base-camp-gondogoro-la',
    title: 'K2 Base Camp & Gondogoro La',
    location: 'Baltoro Glacier, Pakistan',
    duration: '21 Days',
    price: 4800,
    difficulty: 'Extreme',
    image: 'https://images.unsplash.com/photo-1549114227-3006bbd92361?auto=format&fit=crop&q=80&w=1470',
    description: 'A journey through the heart of the Karakoram, visiting the base camps of four 8,000m peaks.',
    altitude: '5,650m (Gondogoro La)',
    season: 'Summer',
    highlights: [
      'Concordia - The Throne Room of Mountain Gods',
      'Base Camps of K2, Broad Peak, and the Gasherbrums',
      'Crossing the high-altitude Gondogoro La pass',
      'Dramatic views of Masherbrum and Laila Peak'
    ],
    itinerary: [
      { day: 1, title: 'Arrival in Islamabad', description: 'Reception at the airport and transfer to hotel.' },
      { day: 2, title: 'Fly to Skardu', description: 'Scenic flight over the Himalayas and Karakorams.' },
      { day: 3, title: 'Skardu Sightseeing', description: 'Acclimatization and trek preparation.' },
      { day: 4, title: 'Drive to Jhola', description: 'Jeep drive to the start of the trek.' },
      { day: 5, title: 'Trek to Paiju', description: 'First views of the Baltoro Glacier.' }
    ],
    stats: [
      { label: 'Max Altitude', value: '5,650m' },
      { label: 'Total Distance', value: '180km' },
      { label: 'Group Size', value: '6-12' },
      { label: 'Avg Pacing', value: '6h/day' }
    ],
    included: [
      'All internal transportation',
      'Licensed professional guides',
      'Full camping services and meals',
      'Government permits and LOI',
      'High altitude safety equipment'
    ],
    faqs: [
      { question: 'What is the best time to trek?', answer: 'The summer months from mid-June to August are ideal for this high-altitude journey.' },
      { question: 'Do I need prior experience?', answer: 'Yes, prior high-altitude trekking experience is highly recommended for this expedition.' }
    ],
    reviews: [
      { id: 'r1', author: 'David M.', rating: 5, content: 'The most intense and beautiful experience of my life.', date: 'Aug 2025' }
    ]
  },
  {
    id: '2',
    slug: 'nanga-parbat-base-camp',
    title: 'Nanga Parbat Base Camp',
    location: 'Fairy Meadows, Pakistan',
    duration: '10 Days',
    price: 2200,
    difficulty: 'Moderate',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1470',
    description: 'Trek to the base of the "Killer Mountain," through the enchanting Fairy Meadows.',
    altitude: '3,900m',
    season: 'Summer',
    highlights: [
      'Overnight stay at Fairy Meadows',
      'Close-up views of the 8,126m Nanga Parbat',
      'Exploring the Raikot Glacier',
      'Traditional Hunza villages'
    ],
    itinerary: [
      { day: 1, title: 'Islamabad to Chilas', description: 'Long drive via the Karakoram Highway.' },
      { day: 2, title: 'Raikot Bridge to Fairy Meadows', description: 'Jeep ride and short hike to the meadow.' },
      { day: 3, title: 'Base Camp Hike', description: 'Day trek to the base of Nanga Parbat.' }
    ],
    stats: [
      { label: 'Max Altitude', value: '4,000m' },
      { label: 'Total Distance', value: '45km' },
      { label: 'Group Size', value: '4-15' },
      { label: 'Avg Pacing', value: '4h/day' }
    ],
    included: [
      'Jeep transfers',
      'Porter services',
      'Eco-friendly lodging',
      'Guided hikes'
    ],
    faqs: [
      { question: 'Is it safe for beginners?', answer: 'This trek is suitable for fit beginners with some hiking experience.' }
    ],
    reviews: [
      { id: 'r2', author: 'Sarah L.', rating: 4.8, content: 'Waking up to Nanga Parbat was a dream.', date: 'July 2025' }
    ]
  }
];
