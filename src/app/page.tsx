import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Header />
      {/* Hero Section */}
      <header className="relative overflow-hidden pt-20 min-h-screen flex items-center">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-red-600/10 via-orange-600/5 to-red-600/10 animate-pulse"></div>
          <div className="absolute top-20 left-10 w-72 h-72 bg-red-500/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-float-delayed"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="text-center">
            {/* Animated Title */}
            <div className="mb-8">
              <h1 className="text-6xl md:text-8xl font-black text-white mb-4 relative">
                <span className="bg-gradient-to-r from-red-400 via-orange-500 to-yellow-500 bg-clip-text text-transparent animate-gradient-x bg-size-200">
                  RideWithMe
                </span>
                <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-orange-600 rounded-lg blur opacity-25 animate-pulse"></div>
              </h1>
              <div className="flex justify-center">
                <div className="h-1 w-32 bg-gradient-to-r from-red-500 to-orange-500 rounded-full animate-pulse"></div>
              </div>
            </div>
            
            <p className="text-xl md:text-3xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed font-light">
              Connectez-vous avec des propriétaires de voitures de sport pour des 
              <span className="text-white font-medium bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">balades d'exception</span>
            </p>
            
            {/* Modern CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link href="/register" className="group relative px-10 py-4 bg-gradient-to-r from-red-600 via-orange-600 to-red-600 bg-size-200 bg-pos-0 hover:bg-pos-100 text-white rounded-2xl font-bold text-xl transition-all duration-500 shadow-2xl hover:shadow-red-500/25 hover:scale-110 border border-red-500/20 overflow-hidden">
                <span className="relative z-10 flex items-center space-x-2">
                  <span>Commencer l'aventure</span>
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
              </Link>
              
              <Link href="/cars" className="group px-10 py-4 border-2 border-gray-500 text-gray-300 hover:border-white hover:text-white hover:bg-white/5 rounded-2xl font-bold text-xl transition-all duration-500 backdrop-blur-sm hover:scale-105">
                <span className="flex items-center space-x-2">
                  <span>Découvrir plus</span>
                  <svg className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </span>
              </Link>
            </div>
            
            {/* Floating Stats */}
            <div className="mt-20 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1 animate-count">500+</div>
                <div className="text-gray-400 text-sm">Voitures</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1 animate-count">1.2K+</div>
                <div className="text-gray-400 text-sm">Membres</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1 animate-count">4.9★</div>
                <div className="text-gray-400 text-sm">Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-32 relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-slate-800/30 backdrop-blur-sm">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(239, 68, 68, 0.1) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(249, 115, 22, 0.1) 0%, transparent 50%)'
          }}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
              Comment ça 
              <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">marche</span> ?
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Une plateforme simple et sécurisée pour connecter passionnés d'automobiles et aventuriers
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                step: '01',
                title: 'Découvrez',
                description: 'Explorez une sélection curated de voitures de sport exceptionnelles près de chez vous',
                icon: '🔍',
                color: 'from-blue-500 to-cyan-500'
              },
              {
                step: '02', 
                title: 'Connectez',
                description: 'Rencontrez des propriétaires passionnés et créez des liens authentiques dans notre communauté',
                icon: '🤝',
                color: 'from-purple-500 to-pink-500'
              },
              {
                step: '03',
                title: 'Roulez',
                description: 'Vivez des sensations uniques au volant de voitures d\'exception en toute sécurité',
                icon: '🏎️',
                color: 'from-red-500 to-orange-500'
              }
            ].map((feature, index) => (
              <div key={index} className="group relative">
                {/* Card */}
                <div className="relative p-10 bg-slate-900/60 backdrop-blur-xl rounded-3xl border border-slate-700/50 hover:border-slate-600/50 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl overflow-hidden">
                  {/* Step Number */}
                  <div className="absolute top-6 right-6 text-6xl font-black text-slate-800/30 group-hover:text-slate-700/50 transition-colors duration-300">
                    {feature.step}
                  </div>
                  
                  {/* Icon */}
                  <div className="relative mb-8">
                    <div className={`w-20 h-20 mx-auto bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110`}>
                      <span className="text-3xl filter drop-shadow-lg">{feature.icon}</span>
                    </div>
                    {/* Glow Effect */}
                    <div className={`absolute inset-0 w-20 h-20 mx-auto bg-gradient-to-r ${feature.color} rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`}></div>
                  </div>
                  
                  <h3 className="text-3xl font-bold text-white mb-6 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 group-hover:bg-clip-text transition-all duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 text-lg leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                    {feature.description}
                  </p>
                  
                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-500"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-32 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900"></div>
          <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-red-500/20 to-transparent"></div>
          <div className="absolute top-0 left-2/4 w-px h-full bg-gradient-to-b from-transparent via-orange-500/20 to-transparent"></div>
          <div className="absolute top-0 left-3/4 w-px h-full bg-gradient-to-b from-transparent via-red-500/20 to-transparent"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Ils nous font confiance</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-orange-500 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid md:grid-cols-4 gap-12">
            {[
              { number: '500+', label: 'Voitures disponibles', icon: '🚗', color: 'from-blue-500 to-cyan-500' },
              { number: '1,200+', label: 'Membres actifs', icon: '👥', color: 'from-green-500 to-emerald-500' },
              { number: '50+', label: 'Villes couvertes', icon: '🌍', color: 'from-purple-500 to-pink-500' },
              { number: '4.9/5', label: 'Satisfaction moyenne', icon: '⭐', color: 'from-yellow-500 to-orange-500' }
            ].map((stat, index) => (
              <div key={index} className="group text-center">
                <div className="relative p-8 bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 hover:border-slate-600/50 transition-all duration-500 hover:transform hover:scale-105">
                  {/* Icon */}
                  <div className={`w-16 h-16 mx-auto mb-6 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110`}>
                    <span className="text-2xl">{stat.icon}</span>
                  </div>
                  
                  {/* Number */}
                  <div className="text-5xl font-black text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 group-hover:bg-clip-text transition-all duration-300">
                    {stat.number}
                  </div>
                  
                  {/* Label */}
                  <div className="text-gray-400 text-lg font-medium group-hover:text-gray-300 transition-colors duration-300">
                    {stat.label}
                  </div>
                  
                  {/* Glow Effect */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} rounded-2xl blur-xl opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
        {/* Dynamic Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-red-600 via-orange-600 to-red-600 animate-gradient-x bg-size-200"></div>
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-48 h-48 bg-yellow-300 rounded-full blur-3xl animate-float"></div>
            <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-white rounded-full blur-2xl animate-float-delayed"></div>
          </div>
        </div>
        
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-12">
            <h2 className="text-5xl md:text-7xl font-black text-white mb-8 leading-tight">
              Prêt pour 
              <span className="block bg-gradient-to-r from-yellow-300 to-white bg-clip-text text-transparent animate-pulse">
                l'aventure ?
              </span>
            </h2>
            <p className="text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
              Rejoignez notre communauté de passionnés et découvrez le plaisir de conduire des voitures d'exception
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
            <Link href="/register" className="group relative px-12 py-5 bg-white text-red-600 rounded-2xl font-bold text-xl hover:bg-gray-50 transition-all duration-500 shadow-2xl hover:shadow-white/25 hover:scale-110 border-4 border-white/20 overflow-hidden">
              <span className="relative z-10 flex items-center space-x-3">
                <span>Devenir membre</span>
                <svg className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-white to-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
            </Link>
            
            <Link href="/contact" className="group px-12 py-5 border-4 border-white/80 text-white hover:bg-white hover:text-red-600 rounded-2xl font-bold text-xl transition-all duration-500 backdrop-blur-sm hover:scale-110 hover:border-white">
              <span className="flex items-center space-x-3">
                <span>Proposer ma voiture</span>
                <svg className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </span>
            </Link>
          </div>
          
          {/* Trust Indicators */}
          <div className="mt-16 pt-12 border-t border-white/20">
            <p className="text-white/80 text-lg mb-6 font-medium">Rejoignez des milliers de passionnés</p>
            <div className="flex justify-center items-center space-x-8 opacity-80">
              <div className="flex items-center space-x-2">
                <svg className="w-6 h-6 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-white font-medium">Vérifié et sécurisé</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-white font-medium">Assurance incluse</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-white font-medium">Support 24/7</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative bg-slate-900 py-20 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 20% 80%, rgba(239, 68, 68, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(249, 115, 22, 0.3) 0%, transparent 50%)'
          }}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="mb-8">
              <h3 className="text-4xl font-black text-white mb-4">
                <span className="bg-gradient-to-r from-red-400 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
                  RideWithMe
                </span>
              </h3>
              <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-orange-500 mx-auto rounded-full mb-6"></div>
              <p className="text-xl text-gray-300 font-light">
                La passion de l'automobile, partagée avec ❤️
              </p>
            </div>
            
            {/* Social & Links */}
            <div className="grid md:grid-cols-3 gap-12 mb-12">
              {/* Navigation */}
              <div>
                <h4 className="text-white font-bold text-lg mb-6">Navigation</h4>
                <div className="space-y-3">
                  {[
                    { href: '/about', label: 'À propos', icon: '📜' },
                    { href: '/contact', label: 'Contact', icon: '📞' },
                    { href: '/cars', label: 'Catalogue', icon: '🚗' }
                  ].map((link) => (
                    <Link key={link.href} href={link.href} className="flex items-center justify-center space-x-2 text-gray-400 hover:text-white transition-all duration-300 hover:scale-105">
                      <span>{link.icon}</span>
                      <span>{link.label}</span>
                    </Link>
                  ))}
                </div>
              </div>
              
              {/* Légal */}
              <div>
                <h4 className="text-white font-bold text-lg mb-6">Légal</h4>
                <div className="space-y-3">
                  {[
                    { href: '/terms', label: 'Conditions', icon: '📄' },
                    { href: '/privacy', label: 'Confidentialité', icon: '🔒' },
                    { href: '/cookies', label: 'Cookies', icon: '🍪' }
                  ].map((link) => (
                    <Link key={link.href} href={link.href} className="flex items-center justify-center space-x-2 text-gray-400 hover:text-white transition-all duration-300 hover:scale-105">
                      <span>{link.icon}</span>
                      <span>{link.label}</span>
                    </Link>
                  ))}
                </div>
              </div>
              
              {/* Social */}
              <div>
                <h4 className="text-white font-bold text-lg mb-6">Suivez-nous</h4>
                <div className="flex justify-center space-x-6">
                  {[
                    { name: 'Instagram', icon: '📷', color: 'hover:text-pink-400' },
                    { name: 'Twitter', icon: '🐦', color: 'hover:text-blue-400' },
                    { name: 'Facebook', icon: '🟦', color: 'hover:text-blue-600' }
                  ].map((social) => (
                    <button key={social.name} className={`w-12 h-12 bg-slate-800 rounded-xl text-gray-400 ${social.color} transition-all duration-300 hover:scale-110 hover:bg-slate-700 flex items-center justify-center text-xl`}>
                      {social.icon}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Copyright */}
            <div className="pt-8 border-t border-slate-800">
              <p className="text-gray-500 text-lg">
                © 2024 RideWithMe. Tous droits réservés. Fait avec ❤️ en France 🇫🇷
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
