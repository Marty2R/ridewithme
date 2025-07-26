"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import { useAuth } from "@/contexts/AuthContext";
import { ICar } from "@/models/Car";

export default function MyCarsPage() {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const [userCars, setUserCars] = useState<ICar[]>([]);
  const [loadingCars, setLoadingCars] = useState(true);

  const fetchUserCars = useCallback(async () => {
    if (!user) return;
    
    try {
      setLoadingCars(true);
      console.log('Fetching cars for user ID:', user.id);
      const response = await fetch(`/api/cars/user/${user.id}`);
      console.log('Response status:', response.status);
      
      if (response.ok) {
        const cars = await response.json();
        console.log('Received cars:', cars);
        setUserCars(cars);
      } else {
        console.error('API response not ok:', response.status, response.statusText);
        const errorData = await response.text();
        console.error('Error data:', errorData);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des véhicules:', error);
    } finally {
      setLoadingCars(false);
    }
  }, [user]);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
      return;
    }

    if (user) {
      fetchUserCars();
    }
  }, [user, isLoading, router, fetchUserCars]);

  const handleDeleteCar = async (carId: number) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce véhicule ?')) {
      return;
    }

    try {
      const response = await fetch(`/api/cars/${carId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setUserCars(prev => prev.filter(car => car.id !== carId));
      } else {
        alert('Erreur lors de la suppression du véhicule');
      }
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      alert('Erreur lors de la suppression du véhicule');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-white text-lg">Chargement...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <Header />
      
      <div className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <Link href="/profile" className="text-blue-400 hover:text-blue-300 mb-4 inline-block">
              ← Retour au profil
            </Link>
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">
                  <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                    Mes véhicules
                  </span>
                </h1>
                <p className="text-gray-400">Gérez vos véhicules proposés</p>
              </div>
              <Link
                href="/admin/cars/new"
                className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-medium transition-all duration-300"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span>Ajouter un véhicule</span>
              </Link>
            </div>
          </div>

          {/* Cars Content */}
          <div className="bg-black/40 backdrop-blur-xl rounded-3xl p-8 border border-gray-800/50">
            {loadingCars ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                <p className="text-gray-400">Chargement de vos véhicules...</p>
              </div>
            ) : userCars.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🚗</div>
                <h3 className="text-2xl font-bold text-white mb-4">Aucun véhicule</h3>
                <p className="text-gray-400 mb-6">
                  Vous n&apos;avez pas encore ajouté de véhicule. Commencez par proposer votre première voiture !
                </p>
                <Link
                  href="/admin/cars/new"
                  className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-medium transition-all duration-300"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  <span>Ajouter mon premier véhicule</span>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userCars.map((car) => (
                  <div key={car.id} className="bg-gray-900/50 rounded-xl border border-gray-700/50 overflow-hidden hover:border-gray-600/50 transition-all duration-300">
                    <div className="relative aspect-[16/10]">
                      <img
                        src={car.image}
                        alt={`${car.brand} ${car.model}`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-3 left-3 px-3 py-1 bg-blue-600/90 backdrop-blur-sm text-white text-sm rounded-full">
                        {car.category}
                      </div>
                      <div className="absolute top-3 right-3 px-3 py-1 bg-black/70 backdrop-blur-sm text-white text-sm rounded-full">
                        {car.year}
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-white mb-2">
                        {car.brand} {car.model}
                      </h3>
                      <p className="text-gray-400 text-sm mb-4">{car.location}</p>
                      
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-2xl font-bold text-blue-400">{car.price}€</span>
                        <span className="text-gray-400 text-sm">/jour</span>
                      </div>
                      
                      <div className="flex items-center space-x-2 mb-4">
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <svg key={i} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <span className="text-gray-400 text-sm">({car.reviews} avis)</span>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Link
                          href={`/cars/${car.id}`}
                          className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-center text-sm font-medium transition-colors"
                        >
                          Voir
                        </Link>
                        <Link
                          href={`/admin/cars/edit/${car.id}`}
                          className="flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg text-center text-sm font-medium transition-colors"
                        >
                          Modifier
                        </Link>
                        <button
                          onClick={() => handleDeleteCar(car.id)}
                          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors"
                        >
                          Supprimer
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="mt-8 grid md:grid-cols-2 gap-6">
            <div className="bg-black/40 backdrop-blur-xl rounded-3xl p-6 border border-gray-800/50">
              <h3 className="text-xl font-bold text-white mb-4">Actions rapides</h3>
              <div className="space-y-3">
                <Link
                  href="/admin/cars/new"
                  className="flex items-center space-x-3 text-gray-300 hover:text-white hover:bg-white/5 p-3 rounded-xl transition-all duration-300"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  <span>Ajouter un véhicule</span>
                </Link>
                <Link
                  href="/profile"
                  className="flex items-center space-x-3 text-gray-300 hover:text-white hover:bg-white/5 p-3 rounded-xl transition-all duration-300"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span>Mon profil</span>
                </Link>
              </div>
            </div>

            <div className="bg-black/40 backdrop-blur-xl rounded-3xl p-6 border border-gray-800/50">
              <h3 className="text-xl font-bold text-white mb-4">Statistiques</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-2">{userCars.length}</div>
                  <div className="text-sm text-gray-400">Véhicules</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">0</div>
                  <div className="text-sm text-gray-400">Réservations</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}