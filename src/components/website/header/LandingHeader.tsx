'use client'

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const LandingHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navLinks = [
    { href: "/", label: "Accueil" },
    { href: "/about", label: "À propos" },
    { href: "/formations", label: "Formations" },
    { href: "/admissions", label: "Admissions" },
    { href: "/actualites", label: "Actualités" },
    { href: "/faq", label: "FAQ" },
    { href: "/recrutement", label: "Recrutement" },
    { href: "/contacts", label: "Contacts" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 transition-all duration-300 bg-[#3b2c6a]/90 backdrop-blur-sm shadow-md">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center text-white">
        {/* Logo */}
        <div className="text-xl font-bold heading-font flex items-center">
          <Image
            src='/images/logo/logoEPFPS.png'
            alt="Logo EPFPS" 
            height={40}
            width={40}
            className="h-10 w-auto mr-2 rounded-full" 
          />
          <span className="hidden md:block">EPFPS</span>
        </div>

        {/* Liens Desktop */}
        <div className="hidden lg:flex items-center space-x-6 text-gray-200 font-medium">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-[#ff9900] transition-colors duration-300">
              {link.label}
            </Link>
          ))}
          <Link
            href="/signin"
            className="bg-[#ff9900] hover:bg-[#e68a00] text-white font-bold py-2 px-4 rounded-full transition-all duration-300 text-sm"
          >
            Espace Utilisateur
          </Link>
        </div>

        <button 
          onClick={toggleMenu}
          className="lg:hidden p-2 rounded-md hover:bg-white/20 focus:outline-none text-white transition-all"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          )}
        </button>
      </nav>

      <div className={`lg:hidden transition-all duration-300 ease-in-out overflow-hidden bg-[#3b2c6a] ${
        isMenuOpen ? "max-h-[500px] border-t border-white/10 opacity-100" : "max-h-0 opacity-0"
      }`}>
        <div className="flex flex-col space-y-4 px-6 py-6 text-gray-200">
          {navLinks.map((link) => (
            <Link 
              key={link.href} 
              href={link.href} 
              onClick={() => setIsMenuOpen(false)}
              className="hover:text-[#ff9900] font-medium"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/signin"
            onClick={() => setIsMenuOpen(false)}
            className="bg-[#ff9900] text-white text-center font-bold py-3 rounded-xl shadow-lg"
          >
            Espace Utilisateur
          </Link>
        </div>
      </div>
    </header>
  );
};

export default LandingHeader;












