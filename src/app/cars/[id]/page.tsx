"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import { ICar } from "@/models/Car";


interface CarDetailPageProps {
  params: { id: string };
}

export default function CarDetailPage({ params }: CarDetailPageProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("overview");
  const [car, setCar] = useState<ICar | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const carId = parseInt(params.id);

  // Créer un tableau combiné : image principale + images supplémentaires (sans doublons)
  const getDisplayImages = (car: ICar | null) => {
    if (!car) return [];
    
    const images = [];
    
    // Ajouter l'image principale
    if (car.image) {
      images.push(car.image);
    }
    
    // Ajouter les images supplémentaires (éviter les doublons)
    if (car.images && car.images.length > 0) {
      car.images.forEach(img => {
        if (img && img.trim() !== '' && img !== car.image) {
          images.push(img);
        }
      });
    }
    
    return images;
  };

  const displayImages = getDisplayImages(car);
  const hasMultipleImages = displayImages.length > 1;


  useEffect(() => {
    const fetchCar = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/cars/${carId}`);
        
        if (!response.ok) {
          if (response.status === 404) {
            setError('Voiture non trouvée');
          } else {
            setError('Erreur lors du chargement');
          }
          return;
        }
        
        const data = await response.json();
        setCar(data);
        setError(null);
      } catch (err) {
        setError('Erreur de connexion');
      } finally {
        setLoading(false);
      }
    };

    fetchCar();
  }, [carId]);

  // Navigation au clavier pour les images
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!hasMultipleImages) return;
      
      if (e.key === 'ArrowLeft') {
        setSelectedImageIndex((prev) => 
          prev === 0 ? displayImages.length - 1 : prev - 1
        );
      } else if (e.key === 'ArrowRight') {
        setSelectedImageIndex((prev) => 
          prev === displayImages.length - 1 ? 0 : prev + 1
        );
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [hasMultipleImages, displayImages.length]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-white text-lg">Chargement...</p>
        </div>
      </div>
    );
  }

  if (error || !car) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h1 className="text-4xl font-bold text-red-400 mb-4">{error || 'Voiture non trouvée'}</h1>
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
                  src={displayImages[selectedImageIndex] || car.image}
                  alt={`${car.brand} ${car.model}`}
                  className="w-full h-96 object-cover rounded-3xl shadow-2xl"
                />
                <div className="absolute top-6 left-6 px-4 py-2 bg-blue-600/90 backdrop-blur-sm text-white font-bold rounded-xl border border-blue-400/50">
                  {car.category}
                </div>
                <div className="absolute top-6 right-6 px-4 py-2 bg-black/70 backdrop-blur-sm text-white font-bold rounded-xl">
                  {car.year}
                </div>
                
                {/* Boutons de navigation - uniquement si plusieurs images */}
                {hasMultipleImages && (
                  <>
                    {/* Bouton précédent */}
                    <button
                      onClick={() => setSelectedImageIndex((prev) => 
                        prev === 0 ? displayImages.length - 1 : prev - 1
                      )}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/70 hover:bg-black/90 backdrop-blur-sm text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                    >
                      <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    
                    {/* Bouton suivant */}
                    <button
                      onClick={() => setSelectedImageIndex((prev) => 
                        prev === displayImages.length - 1 ? 0 : prev + 1
                      )}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/70 hover:bg-black/90 backdrop-blur-sm text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                    >
                      <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                    
                    {/* Indicateur de position */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 bg-black/70 backdrop-blur-sm text-white text-sm rounded-full">
                      {selectedImageIndex + 1} / {displayImages.length}
                    </div>
                  </>
                )}
              </div>
              
              {/* Miniatures */}
              {hasMultipleImages && (
                <div className="grid grid-cols-4 gap-3">
                  {displayImages.map((image, index) => (
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
              )}
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
                  {car.included?.map((item, index) => (
                    <div key={index} className="flex items-center space-x-3 p-4 bg-gray-900/30 rounded-xl border border-gray-800/50">
                      <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-white">{item}</span>
                    </div>
                  )) || (
                    <p className="text-gray-400">Aucun équipement spécifié</p>
                  )}
                </div>
              </div>
              
              <div>
                <h3 className="text-3xl font-bold text-white mb-6">Équipements voiture</h3>
                <div className="grid grid-cols-2 gap-4">
                  {car.features?.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2 text-gray-300">
                      <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                      <span>{feature}</span>
                    </div>
                  )) || (
                    <p className="text-gray-400">Aucun équipement spécifié</p>
                  )}
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
                      src={car.ownerDetails?.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face'}
                      alt={car.ownerDetails?.name || car.owner}
                      className="w-24 h-24 rounded-2xl object-cover border-3 border-blue-500"
                    />
                    {car.ownerDetails?.verified && (
                      <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center border-2 border-white">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-2">
                      <h3 className="text-2xl font-bold text-white">{car.ownerDetails?.name || car.owner}</h3>
                      {car.ownerDetails?.verified && (
                        <span className="px-3 py-1 bg-blue-600/20 text-blue-400 rounded-full text-sm border border-blue-500/30">
                          Conducteur vérifié
                        </span>
                      )}
                    </div>
                    
                    <p className="text-gray-400 mb-4">{car.ownerDetails?.age} ans • {car.ownerDetails?.location || car.location}</p>
                    
                    <div className="flex items-center space-x-6 mb-4">
                      <div>
                        <div className="text-xl font-bold text-white">{car.ownerDetails?.rating || car.rating}</div>
                        <div className="text-sm text-gray-400">Note moyenne</div>
                      </div>
                      <div>
                        <div className="text-xl font-bold text-white">{car.ownerDetails?.reviews || car.reviews}</div>
                        <div className="text-sm text-gray-400">Avis reçus</div>
                      </div>
                      <div>
                        <div className="text-xl font-bold text-white">{car.ownerDetails?.experience || 'N/A'}</div>
                        <div className="text-sm text-gray-400">Expérience</div>
                      </div>
                    </div>
                    
                    {car.ownerDetails?.languages && (
                      <div className="flex space-x-2 mb-4">
                        {car.ownerDetails.languages.map((lang, index) => (
                          <span key={index} className="px-2 py-1 bg-gray-800 text-gray-300 rounded text-sm">
                            {lang}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                
                <p className="text-gray-300 leading-relaxed">{car.ownerDetails?.bio || 'Aucune biographie disponible.'}</p>
              </div>
            </div>
          )}

          {/* Parcours */}
          {activeTab === 'route' && (
            car.route ? (
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
                      <strong>Note :</strong> L&apos;itinéraire peut être adapté selon les conditions météorologiques et votre niveau d&apos;expérience. Le conducteur se réserve le droit de modifier le parcours pour des raisons de sécurité.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg">Aucun parcours spécifié pour cette voiture.</p>
              </div>
            )
          )}

          {/* Spécifications */}
          {activeTab === 'specs' && (
            <div className="max-w-4xl mx-auto">
              <h3 className="text-3xl font-bold text-white mb-8">Spécifications techniques</h3>
              {car.specifications ? (
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
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-400 text-lg">Aucune spécification technique disponible.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}