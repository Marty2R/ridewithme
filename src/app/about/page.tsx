import Header from "@/components/Header";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Header />
      {/* Hero Section */}
      <section className="py-24 pt-40 bg-gradient-to-r from-red-600/20 to-orange-600/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              À propos de{" "}
              <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                RideWithMe
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Notre mission est de créer des liens authentiques entre passionnés d'automobiles 
              et de rendre accessible l'expérience de conduite de voitures d'exception.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">Notre Histoire</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-orange-500 mx-auto mb-8"></div>
          </div>
          
          <div className="prose prose-lg text-gray-300 max-w-none">
            <p className="text-center text-xl mb-8">
              RideWithMe est né d'une passion commune pour l'automobile et d'un constat simple : 
              trop de voitures exceptionnelles restent dans des garages, tandis que des passionnés 
              rêvent de les découvrir.
            </p>
            
            <div className="grid md:grid-cols-2 gap-12 mt-16">
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">La Vision</h3>
                <p>
                  Nous croyons que la passion automobile doit être partagée. Chaque voiture a une histoire, 
                  chaque propriétaire a des connaissances uniques, et chaque balade peut créer des souvenirs inoubliables.
                </p>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">La Mission</h3>
                <p>
                  Créer une communauté sûre et bienveillante où propriétaires et passionnés peuvent se rencontrer, 
                  partager leur amour de l'automobile, et vivre ensemble des expériences extraordinaires.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">Nos Valeurs</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-orange-500 mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-slate-900/50 rounded-2xl border border-slate-700">
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-red-600 to-orange-600 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Sécurité</h3>
              <p className="text-gray-400">
                La sécurité de nos membres et des véhicules est notre priorité absolue. 
                Vérifications, assurances et protocoles stricts.
              </p>
            </div>

            <div className="text-center p-8 bg-slate-900/50 rounded-2xl border border-slate-700">
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-red-600 to-orange-600 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Passion</h3>
              <p className="text-gray-400">
                Nous célébrons la passion automobile sous toutes ses formes. 
                Chaque membre apporte sa perspective unique à notre communauté.
              </p>
            </div>

            <div className="text-center p-8 bg-slate-900/50 rounded-2xl border border-slate-700">
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-red-600 to-orange-600 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Communauté</h3>
              <p className="text-gray-400">
                Nous construisons une communauté bienveillante où respect, 
                entraide et partage sont les maîtres mots.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">L'Équipe</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-orange-500 mx-auto mb-8"></div>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Une équipe de passionnés dédiée à créer la meilleure expérience possible pour notre communauté.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-r from-red-600 to-orange-600 rounded-full flex items-center justify-center">
                <span className="text-3xl font-bold text-white">JD</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Jean Dupont</h3>
              <p className="text-red-500 mb-4">CEO & Fondateur</p>
              <p className="text-gray-400">
                Passionné d'automobiles depuis l'enfance, Jean a créé RideWithMe pour partager sa passion avec le monde entier.
              </p>
            </div>

            <div className="text-center">
              <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-r from-red-600 to-orange-600 rounded-full flex items-center justify-center">
                <span className="text-3xl font-bold text-white">SM</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Sophie Martin</h3>
              <p className="text-red-500 mb-4">CTO</p>
              <p className="text-gray-400">
                Experte en technologie et sécurité, Sophie s'assure que notre plateforme reste à la pointe de l'innovation.
              </p>
            </div>

            <div className="text-center">
              <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-r from-red-600 to-orange-600 rounded-full flex items-center justify-center">
                <span className="text-3xl font-bold text-white">AL</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Antoine Leblanc</h3>
              <p className="text-red-500 mb-4">Head of Community</p>
              <p className="text-gray-400">
                Antoine veille à ce que notre communauté reste accueillante et bienveillante pour tous les membres.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-red-600 to-orange-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Rejoignez l'aventure
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Faites partie de cette communauté unique de passionnés d'automobiles
          </p>
          <button className="bg-white text-red-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
            Devenir membre
          </button>
        </div>
      </section>
    </div>
  );
}