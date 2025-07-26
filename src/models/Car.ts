import mongoose from 'mongoose';

export interface ICar {
  _id?: string;
  id: number;
  brand: string;
  model: string;
  year: number;
  price: number;
  location: string;
  image: string;
  owner: string;
  ownerId?: string;
  rating: number;
  reviews: number;
  horsepower: number;
  topSpeed: number;
  acceleration: number;
  category: string;
  color: string;
  // Données détaillées pour la page de détail
  images?: string[];
  ownerDetails?: {
    name: string;
    avatar: string;
    age: number;
    experience: string;
    rating: number;
    reviews: number;
    bio: string;
    location: string;
    languages: string[];
    verified: boolean;
  };
  route?: {
    name: string;
    distance: string;
    duration: string;
    difficulty: string;
    description: string;
    highlights: string[];
    mapImage: string;
  };
  specifications?: {
    engine: string;
    transmission: string;
    drivetrain: string;
    weight: string;
    fuelType: string;
    consumption: string;
    co2: string;
  };
  features?: string[];
  included?: string[];
}

const CarSchema = new mongoose.Schema<ICar>({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  brand: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  owner: {
    type: String,
    required: true
  },
  ownerId: {
    type: String,
    required: false
  },
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 5
  },
  reviews: {
    type: Number,
    required: true,
    min: 0
  },
  horsepower: {
    type: Number,
    required: true
  },
  topSpeed: {
    type: Number,
    required: true
  },
  acceleration: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  images: [{
    type: String
  }],
  ownerDetails: {
    name: String,
    avatar: String,
    age: Number,
    experience: String,
    rating: Number,
    reviews: Number,
    bio: String,
    location: String,
    languages: [String],
    verified: Boolean
  },
  route: {
    name: String,
    distance: String,
    duration: String,
    difficulty: String,
    description: String,
    highlights: [String],
    mapImage: String
  },
  specifications: {
    engine: String,
    transmission: String,
    drivetrain: String,
    weight: String,
    fuelType: String,
    consumption: String,
    co2: String
  },
  features: [String],
  included: [String]
}, {
  timestamps: true
});

export default mongoose.models.Car || mongoose.model<ICar>('Car', CarSchema);