"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import { useAuth } from "@/contexts/AuthContext";

interface CarFormData {
  brand: string;
  model: string;
  year: number;
  price: number;
  location: string;
  image: string;
  owner: string;
  rating: number;
  reviews: number;
  horsepower: number;
  topSpeed: number;
  acceleration: number;
  category: string;
  color: string;
  images: string[];
  ownerDetails: {
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
  route: {
    name: string;
    distance: string;
    duration: string;
    difficulty: string;
    description: string;
    highlights: string[];
    mapImage: string;
  };
  specifications: {
    engine: string;
    transmission: string;
    drivetrain: string;
    weight: string;
    fuelType: string;
    consumption: string;
    co2: string;
  };
  features: string[];
  included: string[];
}

const Section = ({ title, isExpanded, onToggle, children }: {
  title: string;
  isExpanded: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) => (
  <div className="bg-black/40 backdrop-blur-xl rounded-2xl border border-gray-800/50 overflow-hidden">
    <button
      type="button"
      onClick={onToggle}
      className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-800/30 transition-colors"
    >
      <h2 className="text-xl font-bold text-white">{title}</h2>
      <span className={`text-gray-400 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
        ▼
      </span>
    </button>
    {isExpanded && (
      <div className="px-6 pb-6">
        {children}
      </div>
    )}
  </div>
);

export default function NewCarPage() {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    basic: true,
    performance: true,
    images: false,
    owner: false,
    route: false,
    specs: false,
    features: false
  });

  const [formData, setFormData] = useState<CarFormData>({
    brand: "",
    model: "",
    year: new Date().getFullYear(),
    price: 0,
    location: "",
    image: "",
    owner: "",
    rating: 5.0,
    reviews: 0,
    horsepower: 0,
    topSpeed: 0,
    acceleration: 0,
    category: "",
    color: "",
    images: [""],
    ownerDetails: {
      name: "",
      avatar: "",
      age: 0,
      experience: "",
      rating: 5.0,
      reviews: 0,
      bio: "",
      location: "",
      languages: [""],
      verified: false
    },
    route: {
      name: "",
      distance: "",
      duration: "",
      difficulty: "",
      description: "",
      highlights: [""],
      mapImage: ""
    },
    specifications: {
      engine: "",
      transmission: "",
      drivetrain: "",
      weight: "",
      fuelType: "",
      consumption: "",
      co2: ""
    },
    features: [""],
    included: [""]
  });

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
      return;
    }

    if (user) {
      setFormData(prev => ({
        ...prev,
        owner: `${user.firstName} ${user.lastName}`,
        location: user.city,
        ownerDetails: {
          ...prev.ownerDetails,
          name: `${user.firstName} ${user.lastName}`,
          location: user.city
        }
      }));
    }
  }, [user, isLoading, router]);

  const toggleSection = useCallback((section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      setError(null);

      // Vérifier que l'utilisateur est connecté
      if (!user) {
        setError('Vous devez être connecté pour ajouter un véhicule');
        return;
      }

      // Nettoyer les données
      const cleanedData = {
        ...formData,
        ownerId: user.id,
        images: formData.images.filter(img => img.trim() !== ""),
        ownerDetails: {
          ...formData.ownerDetails,
          languages: formData.ownerDetails.languages.filter(lang => lang.trim() !== "")
        },
        route: {
          ...formData.route,
          highlights: formData.route.highlights.filter(highlight => highlight.trim() !== "")
        },
        features: formData.features.filter(feature => feature.trim() !== ""),
        included: formData.included.filter(item => item.trim() !== "")
      };

      const response = await fetch('/api/cars', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cleanedData),
      });

      if (!response.ok) {
        throw new Error('Failed to create car');
      }

      setSuccess(true);
      setTimeout(() => {
        router.push('/my-cars');
      }, 2000);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleArrayChange = useCallback((
    section: keyof CarFormData,
    index: number,
    value: string,
    field?: string
  ) => {
    setFormData(prev => {
      const newData = { ...prev };
      
      if (section === 'images' || section === 'features' || section === 'included') {
        const array = [...(newData[section] as string[])];
        array[index] = value;
        if (index === array.length - 1 && value.trim() !== "") {
          array.push("");
        }
        (newData[section] as string[]) = array;
      } else if (section === 'ownerDetails' && field === 'languages') {
        const languages = [...newData.ownerDetails.languages];
        languages[index] = value;
        if (index === languages.length - 1 && value.trim() !== "") {
          languages.push("");
        }
        newData.ownerDetails.languages = languages;
      } else if (section === 'route' && field === 'highlights') {
        const highlights = [...newData.route.highlights];
        highlights[index] = value;
        if (index === highlights.length - 1 && value.trim() !== "") {
          highlights.push("");
        }
        newData.route.highlights = highlights;
      }
      
      return newData;
    });
  }, []);

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

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">✅</div>
          <h1 className="text-4xl font-bold text-green-400 mb-4">Voiture ajoutée avec succès !</h1>
          <p className="text-gray-400">Redirection vers mes véhicules...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <Header />
      
      <div className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <Link href="/cars" className="text-blue-400 hover:text-blue-300 mb-4 inline-block">
              ← Retour au catalogue
            </Link>
            <h1 className="text-4xl font-bold text-white mb-2">
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Ajouter une nouvelle voiture
              </span>
            </h1>
            <p className="text-gray-400">Remplissez au minimum les informations de base et performances</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-600/20 border border-red-500/50 rounded-xl text-red-400">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Informations de base */}
            <Section
              title="Informations de base *"
              isExpanded={expandedSections.basic}
              onToggle={() => toggleSection('basic')}
            >
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Marque *</label>
                  <input
                    type="text"
                    required
                    value={formData.brand}
                    onChange={(e) => setFormData(prev => ({ ...prev, brand: e.target.value }))}
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Ferrari, Lamborghini..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Modèle *</label>
                  <input
                    type="text"
                    required
                    value={formData.model}
                    onChange={(e) => setFormData(prev => ({ ...prev, model: e.target.value }))}
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="488 GTB, Huracán..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Année *</label>
                  <input
                    type="number"
                    required
                    min="1900"
                    max="2030"
                    value={formData.year}
                    onChange={(e) => setFormData(prev => ({ ...prev, year: parseInt(e.target.value) }))}
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Prix (€/jour) *</label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={formData.price}
                    onChange={(e) => setFormData(prev => ({ ...prev, price: parseInt(e.target.value) }))}
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Localisation *</label>
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Paris, Lyon..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Catégorie *</label>
                  <select
                    required
                    value={formData.category}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Sélectionner...</option>
                    <option value="Supercar">Supercar</option>
                    <option value="Hypercar">Hypercar</option>
                    <option value="Sport">Sport</option>
                    <option value="Grand Tourer">Grand Tourer</option>
                    <option value="Électrique">Électrique</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Couleur *</label>
                  <input
                    type="text"
                    required
                    value={formData.color}
                    onChange={(e) => setFormData(prev => ({ ...prev, color: e.target.value }))}
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Rouge Rosso Corsa..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Propriétaire *</label>
                  <input
                    type="text"
                    required
                    value={formData.owner}
                    onChange={(e) => setFormData(prev => ({ ...prev, owner: e.target.value }))}
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Michel R."
                  />
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">Image principale (URL) *</label>
                <input
                  type="url"
                  required
                  value={formData.image}
                  onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://images.unsplash.com/..."
                />
              </div>
            </Section>

            {/* Performances */}
            <Section
              title="Performances *"
              isExpanded={expandedSections.performance}
              onToggle={() => toggleSection('performance')}
            >
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Puissance (ch) *</label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={formData.horsepower}
                    onChange={(e) => setFormData(prev => ({ ...prev, horsepower: parseInt(e.target.value) }))}
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Vitesse max (km/h) *</label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={formData.topSpeed}
                    onChange={(e) => setFormData(prev => ({ ...prev, topSpeed: parseInt(e.target.value) }))}
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">0-100 km/h (s) *</label>
                  <input
                    type="number"
                    required
                    min="0"
                    step="0.1"
                    value={formData.acceleration}
                    onChange={(e) => setFormData(prev => ({ ...prev, acceleration: parseFloat(e.target.value) }))}
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Note *</label>
                  <input
                    type="number"
                    required
                    min="0"
                    max="5"
                    step="0.1"
                    value={formData.rating}
                    onChange={(e) => setFormData(prev => ({ ...prev, rating: parseFloat(e.target.value) }))}
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Nombre d&apos;avis *</label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={formData.reviews}
                    onChange={(e) => setFormData(prev => ({ ...prev, reviews: parseInt(e.target.value) }))}
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </Section>

            {/* Images supplémentaires */}
            <Section
              title="Images supplémentaires (optionnel)"
              isExpanded={expandedSections.images}
              onToggle={() => toggleSection('images')}
            >
              <div className="space-y-4">
                {formData.images.map((image, index) => (
                  <div key={index}>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Image {index + 1} (URL)
                    </label>
                    <input
                      type="url"
                      value={image}
                      onChange={(e) => handleArrayChange('images', index, e.target.value)}
                      className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="https://images.unsplash.com/..."
                    />
                  </div>
                ))}
              </div>
            </Section>

            {/* Submit Button */}
            <div className="flex justify-end space-x-4 pt-6">
              <Link
                href="/cars"
                className="px-6 py-3 text-gray-300 hover:text-white border border-gray-600 rounded-xl transition-colors"
              >
                Annuler
              </Link>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-medium transition-all duration-300 disabled:opacity-50"
              >
                {loading ? 'Ajout en cours...' : 'Ajouter la voiture'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}