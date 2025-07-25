"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";

// Données étendues pour les voitures avec plus de détails
const carsDetailData = {
  1: {
    id: 1,
    brand: "Ferrari",
    model: "488 GTB",
    year: 2020,
    price: 250,
    location: "Paris",
    category: "Supercar",
    color: "Rouge Rosso Corsa",
    rating: 4.9,
    reviews: 24,
    horsepower: 670,
    topSpeed: 330,
    acceleration: 3.0,
    images: [
      "https://images.unsplash.com/photo-1544829099-b9a0c5303bea?w=1200&h=800&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=1200&h=800&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1200&h=800&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1563720223185-11003d516935?w=1200&h=800&fit=crop&crop=center"
    ],
    owner: {
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
  }
};

interface CarDetailPageProps {
  params: { id: string };
}

export default function CarDetailPage({ params }: CarDetailPageProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("overview");
  
  const carId = parseInt(params.id);
  const car = carsDetailData[carId as keyof typeof carsDetailData];

  if (!car) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Voiture non trouvée</h1>
          <Link href="/cars" className="text-blue-400 hover:text-blue-300">
            Retour au catalogue
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <Header />
      
      {/* Hero Section avec galerie */}
      <section className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Galerie photos */}
            <div>
              <div className="relative mb-6">
                <img
                  src={car.images[selectedImageIndex]}
                  alt={`${car.brand} ${car.model}`}
                  className="w-full h-96 object-cover rounded-3xl shadow-2xl"
                />
                <div className="absolute top-6 left-6 px-4 py-2 bg-blue-600/90 backdrop-blur-sm text-white font-bold rounded-xl border border-blue-400/50">
                  {car.category}
                </div>
                <div className="absolute top-6 right-6 px-4 py-2 bg-black/70 backdrop-blur-sm text-white font-bold rounded-xl">
                  {car.year}
                </div>
              </div>
              
              {/* Miniatures */}
              <div className="grid grid-cols-4 gap-3">
                {car.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`relative h-20 rounded-xl overflow-hidden transition-all duration-300 ${
                      selectedImageIndex === index 
                        ? 'ring-3 ring-blue-500 scale-105' 
                        : 'hover:scale-105 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`Vue ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Informations principales */}
            <div>
              <div className="mb-8">
                <h1 className="text-5xl font-black text-white mb-2">
                  <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                    {car.brand}
                  </span>
                </h1>
                <h2 className="text-3xl text-gray-300 font-light mb-4">{car.model}</h2>
                <p className="text-xl text-blue-400 font-medium mb-6">{car.color}</p>
                
                {/* Rating */}
                <div className="flex items-center space-x-4 mb-8">
                  <div className="flex items-center space-x-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-white font-bold text-lg">{car.rating}</span>
                    <span className="text-gray-400">({car.reviews} avis)</span>
                  </div>
                </div>

                {/* Stats performances */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="text-center p-4 bg-gray-900/50 rounded-2xl border border-gray-800/50">
                    <div className="text-2xl font-black text-white mb-1">{car.horsepower}</div>
                    <div className="text-sm text-gray-400">Chevaux</div>
                  </div>
                  <div className="text-center p-4 bg-gray-900/50 rounded-2xl border border-gray-800/50">
                    <div className="text-2xl font-black text-white mb-1">{car.acceleration}s</div>
                    <div className="text-sm text-gray-400">0-100km/h</div>
                  </div>
                  <div className="text-center p-4 bg-gray-900/50 rounded-2xl border border-gray-800/50">
                    <div className="text-2xl font-black text-white mb-1">{car.topSpeed}</div>
                    <div className="text-sm text-gray-400">km/h max</div>
                  </div>
                </div>

                {/* Prix et CTA */}
                <div className="bg-black/40 backdrop-blur-xl rounded-3xl p-8 border border-gray-800/50">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <span className="text-5xl font-black bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                        {car.price}€
                      </span>
                      <span className="text-xl text-gray-400 ml-2">/jour</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-400">📍</div>
                      <div className="text-white font-medium">{car.location}</div>
                    </div>
                  </div>
                  
                  <button className="w-full py-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-2xl font-bold text-xl transition-all duration-300 shadow-lg hover:shadow-blue-500/25 hover:scale-105">
                    Réserver maintenant
                  </button>
                  
                  <div className="flex items-center justify-center mt-4 space-x-6 text-sm text-gray-400">
                    <span className="flex items-center space-x-1">
                      <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Annulation gratuite</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Assurance incluse</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="py-8 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 border-b border-gray-800">
            {[
              { id: 'overview', label: 'Vue d\'ensemble', icon: '📋' },
              { id: 'driver', label: 'Conducteur', icon: '👨‍✈️' },
              { id: 'route', label: 'Parcours', icon: '🗺️' },
              { id: 'specs', label: 'Spécifications', icon: '⚙️' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 pb-4 px-2 transition-colors duration-300 ${
                  activeTab === tab.id
                    ? 'text-blue-400 border-b-2 border-blue-400'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <span>{tab.icon}</span>
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Contenu des tabs */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Vue d'ensemble */}
          {activeTab === 'overview' && (
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <h3 className="text-3xl font-bold text-white mb-6">Équipements inclus</h3>
                <div className="grid gap-4">
                  {car.included.map((item, index) => (
                    <div key={index} className="flex items-center space-x-3 p-4 bg-gray-900/30 rounded-xl border border-gray-800/50">
                      <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-white">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-3xl font-bold text-white mb-6">Équipements voiture</h3>
                <div className="grid grid-cols-2 gap-4">
                  {car.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2 text-gray-300">
                      <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Conducteur */}
          {activeTab === 'driver' && (
            <div className="max-w-4xl mx-auto">
              <div className="bg-black/40 backdrop-blur-xl rounded-3xl p-8 border border-gray-800/50">
                <div className="flex items-start space-x-6 mb-8">
                  <div className="relative">
                    <img
                      src={car.owner.avatar}
                      alt={car.owner.name}
                      className="w-24 h-24 rounded-2xl object-cover border-3 border-blue-500"
                    />
                    {car.owner.verified && (
                      <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center border-2 border-white">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-2">
                      <h3 className="text-2xl font-bold text-white">{car.owner.name}</h3>
                      <span className="px-3 py-1 bg-blue-600/20 text-blue-400 rounded-full text-sm border border-blue-500/30">
                        Conducteur vérifié
                      </span>
                    </div>
                    
                    <p className="text-gray-400 mb-4">{car.owner.age} ans • {car.owner.location}</p>
                    
                    <div className="flex items-center space-x-6 mb-4">
                      <div>
                        <div className="text-xl font-bold text-white">{car.owner.rating}</div>
                        <div className="text-sm text-gray-400">Note moyenne</div>
                      </div>
                      <div>
                        <div className="text-xl font-bold text-white">{car.owner.reviews}</div>
                        <div className="text-sm text-gray-400">Avis reçus</div>
                      </div>
                      <div>
                        <div className="text-xl font-bold text-white">{car.owner.experience}</div>
                        <div className="text-sm text-gray-400">Expérience</div>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2 mb-4">
                      {car.owner.languages.map((lang, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-800 text-gray-300 rounded text-sm">
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-300 leading-relaxed">{car.owner.bio}</p>
              </div>
            </div>
          )}

          {/* Parcours */}
          {activeTab === 'route' && (
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <h3 className="text-3xl font-bold text-white mb-6">{car.route.name}</h3>
                
                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="text-center p-4 bg-gray-900/50 rounded-2xl border border-gray-800/50">
                    <div className="text-xl font-bold text-white mb-1">{car.route.distance}</div>
                    <div className="text-sm text-gray-400">Distance</div>
                  </div>
                  <div className="text-center p-4 bg-gray-900/50 rounded-2xl border border-gray-800/50">
                    <div className="text-xl font-bold text-white mb-1">{car.route.duration}</div>
                    <div className="text-sm text-gray-400">Durée</div>
                  </div>
                  <div className="text-center p-4 bg-gray-900/50 rounded-2xl border border-gray-800/50">
                    <div className="text-xl font-bold text-white mb-1">{car.route.difficulty}</div>
                    <div className="text-sm text-gray-400">Niveau</div>
                  </div>
                </div>
                
                <p className="text-gray-300 mb-8 leading-relaxed">{car.route.description}</p>
                
                <h4 className="text-xl font-bold text-white mb-4">Points forts du parcours</h4>
                <div className="space-y-3">
                  {car.route.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                      <span className="text-gray-300">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <img
                  src={car.route.mapImage}
                  alt="Carte du parcours"
                  className="w-full h-96 object-cover rounded-2xl shadow-xl"
                />
                <div className="mt-6 p-4 bg-blue-600/10 border border-blue-500/30 rounded-xl">
                  <p className="text-blue-300 text-sm">
                    <strong>Note :</strong> L'itinéraire peut être adapté selon les conditions météorologiques et votre niveau d'expérience. Le conducteur se réserve le droit de modifier le parcours pour des raisons de sécurité.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Spécifications */}
          {activeTab === 'specs' && (
            <div className="max-w-4xl mx-auto">
              <h3 className="text-3xl font-bold text-white mb-8">Spécifications techniques</h3>
              <div className="grid md:grid-cols-2 gap-8">
                {Object.entries(car.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center p-4 bg-gray-900/30 rounded-xl border border-gray-800/50">
                    <span className="text-gray-400 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                    </span>
                    <span className="text-white font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}