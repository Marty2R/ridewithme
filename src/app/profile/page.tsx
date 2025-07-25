"use client";

import { useState } from "react";
import Header from "@/components/Header";

const userBookings = [
  {
    id: 1,
    car: "Ferrari 488 GTB",
    owner: "Michel R.",
    date: "15 Mars 2024",
    status: "confirmé",
    price: 250,
    duration: "1 jour"
  },
  {
    id: 2,
    car: "Porsche 911 Turbo S",
    owner: "Antoine L.",
    date: "22 Mars 2024",
    status: "en attente",
    price: 200,
    duration: "1 jour"
  },
  {
    id: 3,
    car: "Lamborghini Huracán EVO",
    owner: "Sophie M.",
    date: "8 Mars 2024",
    status: "terminé",
    price: 300,
    duration: "1 jour"
  }
];

export default function Profile() {
  const [activeTab, setActiveTab] = useState("profile");
  const [profileData, setProfileData] = useState({
    firstName: "Jean",
    lastName: "Dupont",
    email: "jean.dupont@email.com",
    phone: "+33 6 12 34 56 78",
    city: "Paris",
    bio: "Passionné d'automobiles depuis toujours, j'adore découvrir de nouveaux modèles et partager ma passion avec d'autres enthousiastes."
  });

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Profile updated:", profileData);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmé":
        return "bg-green-500";
      case "en attente":
        return "bg-yellow-500";
      case "terminé":
        return "bg-gray-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Header />
      {/* Hero Section */}
      <section className="py-16 pt-32 bg-gradient-to-r from-red-600/20 to-orange-600/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-6">
            <div className="w-24 h-24 bg-gradient-to-r from-red-600 to-orange-600 rounded-full flex items-center justify-center">
              <span className="text-3xl font-bold text-white">JD</span>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">
                {profileData.firstName} {profileData.lastName}
              </h1>
              <p className="text-gray-300">Membre depuis Janvier 2024</p>
              <div className="flex items-center mt-2">
                <svg className="w-5 h-5 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-white">4.8</span>
                <span className="text-gray-400 ml-1">(12 avis)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tabs */}
          <div className="mb-8">
            <div className="border-b border-slate-700">
              <nav className="-mb-px flex space-x-8">
                <button
                  onClick={() => setActiveTab("profile")}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === "profile"
                      ? "border-red-500 text-red-500"
                      : "border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300"
                  }`}
                >
                  Mon Profil
                </button>
                <button
                  onClick={() => setActiveTab("bookings")}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === "bookings"
                      ? "border-red-500 text-red-500"
                      : "border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300"
                  }`}
                >
                  Mes Réservations
                </button>
                <button
                  onClick={() => setActiveTab("reviews")}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === "reviews"
                      ? "border-red-500 text-red-500"
                      : "border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300"
                  }`}
                >
                  Mes Avis
                </button>
                <button
                  onClick={() => setActiveTab("settings")}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === "settings"
                      ? "border-red-500 text-red-500"
                      : "border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300"
                  }`}
                >
                  Paramètres
                </button>
              </nav>
            </div>
          </div>

          {/* Profile Tab */}
          {activeTab === "profile" && (
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="bg-slate-800/50 rounded-2xl border border-slate-700 p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Informations personnelles</h2>
                <form onSubmit={handleProfileUpdate} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Prénom</label>
                      <input
                        type="text"
                        value={profileData.firstName}
                        onChange={(e) => setProfileData({...profileData, firstName: e.target.value})}
                        className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Nom</label>
                      <input
                        type="text"
                        value={profileData.lastName}
                        onChange={(e) => setProfileData({...profileData, lastName: e.target.value})}
                        className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Téléphone</label>
                    <input
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Ville</label>
                    <input
                      type="text"
                      value={profileData.city}
                      onChange={(e) => setProfileData({...profileData, city: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Bio</label>
                    <textarea
                      rows={4}
                      value={profileData.bio}
                      onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300"
                  >
                    Mettre à jour le profil
                  </button>
                </form>
              </div>

              <div className="space-y-6">
                {/* Stats */}
                <div className="bg-slate-800/50 rounded-2xl border border-slate-700 p-8">
                  <h2 className="text-2xl font-bold text-white mb-6">Mes statistiques</h2>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-white mb-2">8</div>
                      <div className="text-gray-400">Balades réalisées</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-white mb-2">4.8</div>
                      <div className="text-gray-400">Note moyenne</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-white mb-2">12</div>
                      <div className="text-gray-400">Avis reçus</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-white mb-2">2</div>
                      <div className="text-gray-400">Voitures favorites</div>
                    </div>
                  </div>
                </div>

                {/* Badges */}
                <div className="bg-slate-800/50 rounded-2xl border border-slate-700 p-8">
                  <h2 className="text-2xl font-bold text-white mb-6">Mes badges</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3 p-3 bg-slate-700/50 rounded-lg">
                      <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center">
                        <span className="text-sm">🏆</span>
                      </div>
                      <div>
                        <div className="text-white font-medium">Pilote confirmé</div>
                        <div className="text-gray-400 text-sm">5+ balades</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-slate-700/50 rounded-lg">
                      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-sm">⭐</span>
                      </div>
                      <div>
                        <div className="text-white font-medium">Bien noté</div>
                        <div className="text-gray-400 text-sm">4.5+ étoiles</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Bookings Tab */}
          {activeTab === "bookings" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white">Mes Réservations</h2>
              {userBookings.map((booking) => (
                <div key={booking.id} className="bg-slate-800/50 rounded-2xl border border-slate-700 p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-slate-700 to-slate-600 rounded-lg flex items-center justify-center">
                        <span className="text-white font-medium">🚗</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">{booking.car}</h3>
                        <p className="text-gray-400">Avec {booking.owner}</p>
                        <p className="text-gray-400">{booking.date} • {booking.duration}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`inline-block px-3 py-1 rounded-full text-white text-sm ${getStatusColor(booking.status)}`}>
                        {booking.status}
                      </div>
                      <div className="text-2xl font-bold text-white mt-2">{booking.price}€</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Reviews Tab */}
          {activeTab === "reviews" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white">Mes Avis</h2>
              <div className="bg-slate-800/50 rounded-2xl border border-slate-700 p-8 text-center">
                <div className="text-6xl mb-4">📝</div>
                <h3 className="text-xl font-bold text-white mb-2">Aucun avis pour le moment</h3>
                <p className="text-gray-400">Vos avis apparaîtront ici après vos premières balades.</p>
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === "settings" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white">Paramètres</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-slate-800/50 rounded-2xl border border-slate-700 p-8">
                  <h3 className="text-xl font-bold text-white mb-6">Notifications</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Nouvelles réservations</span>
                      <input type="checkbox" defaultChecked className="toggle" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Messages</span>
                      <input type="checkbox" defaultChecked className="toggle" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Promotions</span>
                      <input type="checkbox" className="toggle" />
                    </div>
                  </div>
                </div>

                <div className="bg-slate-800/50 rounded-2xl border border-slate-700 p-8">
                  <h3 className="text-xl font-bold text-white mb-6">Sécurité</h3>
                  <div className="space-y-4">
                    <button className="w-full text-left px-4 py-3 bg-slate-700 hover:bg-slate-600 rounded-lg text-white transition-colors">
                      Changer le mot de passe
                    </button>
                    <button className="w-full text-left px-4 py-3 bg-slate-700 hover:bg-slate-600 rounded-lg text-white transition-colors">
                      Authentification à deux facteurs
                    </button>
                    <button className="w-full text-left px-4 py-3 bg-red-600 hover:bg-red-700 rounded-lg text-white transition-colors">
                      Supprimer le compte
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}