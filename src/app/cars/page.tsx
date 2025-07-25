"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import { ICar } from "@/models/Car";


export default function Cars() {
  const [filters, setFilters] = useState({
    location: "",
    brand: "",
    priceMax: 500,
    sortBy: "rating"
  });

  const [cars, setCars] = useState<ICar[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCars = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        location: filters.location,
        brand: filters.brand,
        priceMax: filters.priceMax.toString(),
        sortBy: filters.sortBy
      });
      
      const response = await fetch(`/api/cars?${params}`);
      if (!response.ok) {
        throw new Error('Failed to fetch cars');
      }
      
      const data = await response.json();
      setCars(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchCars();
  }, [fetchCars]);

  const handleFilterChange = (key: string, value: string | number) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <Header />
      {/* Hero Section */}
      <section className="py-24 pt-40 bg-gradient-to-r from-blue-600/20 via-indigo-600/10 to-blue-800/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-indigo-500/5"></div>
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-float-delayed"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-6xl md:text-7xl font-black text-white mb-6">
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
                Catalogue
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Découvrez notre sélection de voitures de sport exceptionnelles disponibles pour vos balades.
            </p>
          </div>
        </div>
      </section>

      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filters */}
          <div className="mb-12 p-8 bg-black/60 backdrop-blur-xl rounded-3xl border border-gray-800/50 shadow-2xl">
            <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
              <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">Filtres</span>
              <div className="ml-4 w-12 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500"></div>
            </h2>
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-3 flex items-center">
                  <span className="text-blue-400 mr-2">📍</span>
                  Ville
                </label>
                <input
                  type="text"
                  placeholder="Paris, Lyon..."
                  value={filters.location}
                  onChange={(e) => handleFilterChange("location", e.target.value)}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-400 transition-all duration-300 backdrop-blur-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-3 flex items-center">
                  <span className="text-blue-400 mr-2">🏁</span>
                  Marque
                </label>
                <input
                  type="text"
                  placeholder="Ferrari, Porsche..."
                  value={filters.brand}
                  onChange={(e) => handleFilterChange("brand", e.target.value)}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-400 transition-all duration-300 backdrop-blur-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-3 flex items-center">
                  <span className="text-blue-400 mr-2">💰</span>
                  Prix max: <span className="text-blue-400 ml-1">{filters.priceMax}€/jour</span>
                </label>
                <input
                  type="range"
                  min="100"
                  max="500"
                  value={filters.priceMax}
                  onChange={(e) => handleFilterChange("priceMax", parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer slider focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>100€</span>
                  <span>500€</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-3 flex items-center">
                  <span className="text-blue-400 mr-2">📊</span>
                  Trier par
                </label>
                <select
                  value={filters.sortBy}
                  onChange={(e) => handleFilterChange("sortBy", e.target.value)}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-400 transition-all duration-300 backdrop-blur-sm"
                >
                  <option value="rating">⭐ Note</option>
                  <option value="price">💰 Prix</option>
                  <option value="horsepower">⚡ Puissance</option>
                </select>
              </div>
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-16">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <p className="text-white text-lg">Chargement des voitures...</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">⚠️</div>
              <h3 className="text-2xl font-bold text-red-400 mb-4">Erreur</h3>
              <p className="text-gray-400">{error}</p>
            </div>
          )}

          {/* Cars Grid */}
          {!loading && !error && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {cars.map((car) => (
              <div key={car.id} className="group bg-black/40 backdrop-blur-xl rounded-3xl border border-gray-800/50 overflow-hidden hover:border-blue-500/50 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/10">
                {/* Car Image */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={car.image}
                    alt={`${car.brand} ${car.model}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 px-3 py-1 bg-blue-600/90 backdrop-blur-sm text-white text-xs font-bold rounded-full border border-blue-400/50">
                    {car.category}
                  </div>
                  
                  {/* Year Badge */}
                  <div className="absolute top-4 right-4 px-3 py-1 bg-black/70 backdrop-blur-sm text-white text-sm font-bold rounded-full border border-gray-600/50">
                    {car.year}
                  </div>
                  
                  {/* Rating Overlay */}
                  <div className="absolute bottom-4 right-4 flex items-center space-x-1 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-full">
                    <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-white text-sm font-bold">{car.rating}</span>
                    <span className="text-gray-300 text-xs">({car.reviews})</span>
                  </div>
                </div>
                
                <div className="p-6">
                  {/* Car Title */}
                  <div className="mb-6">
                    <h3 className="text-2xl font-black text-white mb-1 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-cyan-400 group-hover:bg-clip-text transition-all duration-300">
                      {car.brand}
                    </h3>
                    <p className="text-lg text-gray-300 font-medium">{car.model}</p>
                    <p className="text-sm text-blue-400 font-medium">{car.color}</p>
                  </div>

                  {/* Performance Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center p-3 bg-gray-900/50 rounded-xl border border-gray-800/50 group-hover:border-blue-500/30 transition-all duration-300">
                      <div className="text-xs text-gray-400 mb-1">⚡ Puissance</div>
                      <div className="text-white font-bold text-sm">{car.horsepower}<span className="text-xs text-gray-400">ch</span></div>
                    </div>
                    <div className="text-center p-3 bg-gray-900/50 rounded-xl border border-gray-800/50 group-hover:border-blue-500/30 transition-all duration-300">
                      <div className="text-xs text-gray-400 mb-1">🚀 0-100</div>
                      <div className="text-white font-bold text-sm">{car.acceleration}<span className="text-xs text-gray-400">s</span></div>
                    </div>
                    <div className="text-center p-3 bg-gray-900/50 rounded-xl border border-gray-800/50 group-hover:border-blue-500/30 transition-all duration-300">
                      <div className="text-xs text-gray-400 mb-1">🏁 Vmax</div>
                      <div className="text-white font-bold text-sm">{car.topSpeed}<span className="text-xs text-gray-400">km/h</span></div>
                    </div>
                  </div>

                  {/* Owner & Location */}
                  <div className="flex items-center justify-between mb-6 p-3 bg-gray-900/30 rounded-xl">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        {car.owner.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="text-sm text-gray-400">Propriétaire</div>
                        <div className="text-white font-medium text-sm">{car.owner}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-400">📍 Localisation</div>
                      <div className="text-white font-medium text-sm">{car.location}</div>
                    </div>
                  </div>

                  {/* Price & CTA */}
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-3xl font-black bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">{car.price}€</span>
                      <span className="text-gray-400 text-lg font-medium">/jour</span>
                    </div>
                    <Link href={`/cars/${car.id}`} className="group/btn relative px-6 py-3 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 bg-size-200 bg-pos-0 hover:bg-pos-100 text-white rounded-xl font-bold transition-all duration-500 shadow-lg hover:shadow-blue-500/25 hover:scale-105 border border-blue-500/20 overflow-hidden inline-flex items-center">
                      <span className="relative z-10 flex items-center space-x-2">
                        <span>Réserver</span>
                        <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 blur-sm"></div>
                    </Link>
                  </div>
                </div>
                
                {/* Hover Effect Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-500 pointer-events-none"></div>
              </div>
              ))}
            </div>
          )}

          {!loading && !error && cars.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🚗</div>
              <h3 className="text-2xl font-bold text-white mb-4">Aucune voiture trouvée</h3>
              <p className="text-gray-400">Essayez de modifier vos critères de recherche.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}