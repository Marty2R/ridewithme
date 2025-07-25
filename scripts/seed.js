const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

const CarSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  brand: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: Number, required: true },
  price: { type: Number, required: true },
  location: { type: String, required: true },
  image: { type: String, required: true },
  owner: { type: String, required: true },
  rating: { type: Number, required: true, min: 0, max: 5 },
  reviews: { type: Number, required: true, min: 0 },
  horsepower: { type: Number, required: true },
  topSpeed: { type: Number, required: true },
  acceleration: { type: Number, required: true },
  category: { type: String, required: true },
  color: { type: String, required: true },
  images: [{ type: String }],
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
}, { timestamps: true });

const Car = mongoose.model('Car', CarSchema);

const cars = [
  {
    id: 1,
    brand: "Ferrari",
    model: "488 GTB",
    year: 2020,
    price: 250,
    location: "Paris",
    image: "https://images.unsplash.com/photo-1544829099-b9a0c5303bea?w=800&h=500&fit=crop&crop=center",
    owner: "Michel R.",
    rating: 4.9,
    reviews: 24,
    horsepower: 670,
    topSpeed: 330,
    acceleration: 3.0,
    category: "Supercar",
    color: "Rouge Rosso Corsa",
    images: [
      "https://images.unsplash.com/photo-1544829099-b9a0c5303bea?w=1200&h=800&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=1200&h=800&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1200&h=800&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1563720223185-11003d516935?w=1200&h=800&fit=crop&crop=center"
    ],
    ownerDetails: {
      name: "Michel Rousseau",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
      age: 42,
      experience: "8 ans",
      rating: 4.9,
      reviews: 156,
      bio: "Passionné d'automobiles italiennes depuis plus de 15 ans. Je possède cette Ferrari depuis 3 ans et j'adore partager ma passion avec d'autres enthousiastes. Ancien pilote amateur, je connais parfaitement les routes de montagne.",
      location: "Paris 16ème",
      languages: ["Français", "Anglais", "Italien"],
      verified: true
    },
    route: {
      name: "Route des Grandes Alpes",
      distance: "280 km",
      duration: "4h30",
      difficulty: "Intermédiaire",
      description: "Un parcours mythique à travers les cols alpins avec des paysages à couper le souffle. Nous traverserons le Col du Galibier, le Col de l'Iseran et finirons au Col de la Bonette.",
      highlights: [
        "Col du Galibier (2645m)",
        "Col de l'Iseran (2764m)", 
        "Col de la Bonette (2802m)",
        "Villages alpins authentiques",
        "Points photos panoramiques"
      ],
      mapImage: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&crop=center"
    },
    specifications: {
      engine: "V8 3.9L Turbo",
      transmission: "7 rapports automatique",
      drivetrain: "Propulsion",
      weight: "1475 kg",
      fuelType: "Essence SP98",
      consumption: "11.4L/100km",
      co2: "260 g/km"
    },
    features: [
      "Sièges sport en cuir Frau",
      "Système audio premium",
      "Climatisation automatique",
      "Écran tactile 8.4\"",
      "Caméra de recul",
      "Jantes 20\" forgées",
      "Étriers Brembo",
      "Suspension adaptative"
    ],
    included: [
      "Casque intégral fourni",
      "Gants de conduite",
      "Briefing sécurité complet",
      "Photos/vidéos de la sortie",
      "Assurance tous risques",
      "Carburant inclus",
      "Déjeuner dans un restaurant étoilé"
    ]
  },
  {
    id: 2,
    brand: "Lamborghini",
    model: "Huracán EVO",
    year: 2021,
    price: 300,
    location: "Lyon",
    image: "https://images.unsplash.com/photo-1563720223185-11003d516935?w=800&h=500&fit=crop&crop=center",
    owner: "Sophie M.",
    rating: 4.8,
    reviews: 18,
    horsepower: 640,
    topSpeed: 325,
    acceleration: 2.9,
    category: "Supercar",
    color: "Orange Arancio",
    images: [
      "https://images.unsplash.com/photo-1563720223185-11003d516935?w=1200&h=800&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1544829099-b9a0c5303bea?w=1200&h=800&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1520031441872-265b8e4156a2?w=1200&h=800&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=1200&h=800&fit=crop&crop=center"
    ],
    ownerDetails: {
      name: "Sophie Martin",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b0e1?w=200&h=200&fit=crop&crop=face",
      age: 35,
      experience: "6 ans",
      rating: 4.8,
      reviews: 89,
      bio: "Pilote professionnelle reconvertie dans le partage d'expériences automobiles. Spécialisée dans les supercars italiennes, j'organise des sorties sur circuits et en montagne pour faire découvrir ces bolides d'exception.",
      location: "Lyon 6ème",
      languages: ["Français", "Anglais"],
      verified: true
    },
    route: {
      name: "Circuit des Dombes",
      distance: "220 km",
      duration: "3h45",
      difficulty: "Facile",
      description: "Un parcours à travers la région des étangs de la Dombes, avec des lignes droites permettant d'apprécier les performances de la Lamborghini et des paysages uniques.",
      highlights: [
        "Étangs de la Dombes",
        "Villages médiévaux",
        "Routes sinueuses en forêt",
        "Point de vue panoramique",
        "Dégustation locale"
      ],
      mapImage: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&crop=center"
    },
    specifications: {
      engine: "V10 5.2L Atmosph.",
      transmission: "7 rapports automatique",
      drivetrain: "Intégrale",
      weight: "1422 kg",
      fuelType: "Essence SP98",
      consumption: "13.9L/100km",
      co2: "325 g/km"
    },
    features: [
      "Sièges Alcantara sport",
      "Système multimédia ANIMA",
      "Climatisation bi-zone",
      "Caméra 360°",
      "Jantes 20\" Pirelli",
      "Système d'échappement sport",
      "Suspension magnétique",
      "Éclairage LED Matrix"
    ],
    included: [
      "Casque Arai fourni",
      "Gants Sparco",
      "Briefing technique",
      "Session photo professionnelle",
      "Assurance premium",
      "Carburant SP98 inclus",
      "Pause déjeuner gastronomique"
    ]
  },
  {
    id: 3,
    brand: "Porsche",
    model: "911 Turbo S",
    year: 2022,
    price: 200,
    location: "Marseille",
    image: "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=800&h=500&fit=crop&crop=center",
    owner: "Antoine L.",
    rating: 5.0,
    reviews: 31,
    horsepower: 650,
    topSpeed: 330,
    acceleration: 2.7,
    category: "Sport",
    color: "Gris GT Silver"
  },
  {
    id: 4,
    brand: "McLaren",
    model: "720S",
    year: 2019,
    price: 280,
    location: "Nice",
    image: "https://images.unsplash.com/photo-1520031441872-265b8e4156a2?w=800&h=500&fit=crop&crop=center",
    owner: "Julie D.",
    rating: 4.7,
    reviews: 15,
    horsepower: 720,
    topSpeed: 341,
    acceleration: 2.8,
    category: "Supercar",
    color: "Bleu Burton"
  },
  {
    id: 5,
    brand: "Aston Martin",
    model: "DB11",
    year: 2021,
    price: 220,
    location: "Bordeaux",
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=500&fit=crop&crop=center",
    owner: "Pierre K.",
    rating: 4.9,
    reviews: 22,
    horsepower: 630,
    topSpeed: 322,
    acceleration: 3.9,
    category: "Grand Tourer",
    color: "Noir Jet Black"
  },
  {
    id: 6,
    brand: "BMW",
    model: "M8 Competition",
    year: 2022,
    price: 180,
    location: "Toulouse",
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=500&fit=crop&crop=center",
    owner: "Clara B.",
    rating: 4.6,
    reviews: 19,
    horsepower: 625,
    topSpeed: 305,
    acceleration: 3.2,
    category: "Grand Tourer",
    color: "Blanc Alpine"
  },
  {
    id: 7,
    brand: "Bugatti",
    model: "Chiron",
    year: 2023,
    price: 500,
    location: "Monaco",
    image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&h=500&fit=crop&crop=center",
    owner: "Alexandre D.",
    rating: 5.0,
    reviews: 8,
    horsepower: 1500,
    topSpeed: 420,
    acceleration: 2.4,
    category: "Hypercar",
    color: "Bleu Bugatti"
  },
  {
    id: 8,
    brand: "Koenigsegg",
    model: "Regera",
    year: 2022,
    price: 450,
    location: "Cannes",
    image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&h=500&fit=crop&crop=center",
    owner: "Victoria S.",
    rating: 4.9,
    reviews: 5,
    horsepower: 1360,
    topSpeed: 400,
    acceleration: 2.8,
    category: "Hypercar",
    color: "Carbon Noir"
  },
  {
    id: 9,
    brand: "Tesla",
    model: "Roadster",
    year: 2023,
    price: 180,
    location: "Paris",
    image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&h=500&fit=crop&crop=center",
    owner: "Thomas E.",
    rating: 4.7,
    reviews: 12,
    horsepower: 1020,
    topSpeed: 400,
    acceleration: 1.9,
    category: "Électrique",
    color: "Rouge Cherry"
  }
];

async function seedDatabase() {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined in environment variables');
    }

    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Car.deleteMany({});
    console.log('Cleared existing cars');

    // Insert new data
    await Car.insertMany(cars);
    console.log('Successfully seeded database with cars');

    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();