"use client";

import { ThemeToggleButton } from "@/components/common/ThemeToggleButton";
import NotificationDropdown from "@/components/website/header/NotificationDropdown";
import UserDropdown from "@/components/website/header/UserDropdown";
import { useSidebar } from "@/context/SidebarContext";
import Image from "next/image";
import Link from "next/link";
// 1. Importation de l'icône téléphone depuis lucide-react
import { Phone } from "lucide-react"; 
// 2. Importation de l'icône WhatsApp nettoyée depuis votre dossier d'icônes
import { WhatsappIcon } from "@/icons"; 

import {
  AFRI_INSURANCE_LOGO_HREF,
  AFRILIFE_LOGO_HREF,
} from "@/lib/constants/constant";
import React, { useEffect, useRef } from "react";

const AppHeader: React.FC = () => {
  const { isMobileOpen, toggleSidebar, toggleMobileSidebar } = useSidebar();

  const handleToggle = () => {
    if (window.innerWidth >= 1024) {
      toggleSidebar();
    } else {
      toggleMobileSidebar();
    }
  };

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 flex w-screen bg-white border-gray-200 z-40 dark:border-gray-800 dark:bg-gray-900 lg:border-b">
      <div className="w-full px-3 sm:px-5 lg:px-6">
        <div className="grid grid-cols-3 items-center border-b border-gray-200 dark:border-gray-800 lg:border-b-0 py-2.5 lg:py-3">
          
          {/* Section Gauche : Bouton Toggle & Raccourcis de contact rapides opacifiés */}
          <div className="flex items-center justify-start gap-4">
            <button
              className="flex items-center justify-center w-10 h-10 text-gray-500 border-gray-200 rounded-lg dark:border-gray-800 dark:text-gray-400 lg:h-11 lg:w-11 lg:border"
              onClick={handleToggle}
              aria-label="Toggle Sidebar"
            >
              {isMobileOpen ? (
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M6.21967 7.28131C5.92678 6.98841 5.92678 6.51354 6.21967 6.22065C6.51256 5.92775 6.98744 5.92775 7.28033 6.22065L11.999 10.9393L16.7176 6.22078C17.0105 5.92789 17.4854 5.92788 17.7782 6.22078C18.0711 6.51367 18.0711 6.98855 17.7782 7.28144L13.0597 12L17.7782 16.7186C18.0711 17.0115 18.0711 17.4863 17.7782 17.7792C17.4854 18.0721 17.0105 18.0721 16.7176 17.7792L11.999 13.0607L7.28033 17.7794C6.98744 18.0722 6.51256 18.0722 6.21967 17.7794C5.92678 17.4865 5.92678 17.0116 6.21967 16.7187L10.9384 12L6.21967 7.28131Z"
                    fill="currentColor"
                  />
                </svg>
              ) : (
                <svg
                  width="16"
                  height="12"
                  viewBox="0 0 16 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0.583252 1C0.583252 0.585788 0.919038 0.25 1.33325 0.25H14.6666C15.0808 0.25 15.4166 0.585786 15.4166 1C15.4166 1.41421 15.0808 1.75 14.6666 1.75L1.33325 1.75C0.919038 1.75 0.583252 1.41422 0.583252 1ZM0.583252 11C0.583252 10.5858 0.919038 10.25 1.33325 10.25L14.6666 10.25C15.0808 10.25 15.4166 10.5858 15.4166 11C15.4166 11.4142 15.0808 11.75 14.6666 11.75L1.33325 11.75C0.919038 11.75 0.583252 11.4142 0.583252 11ZM1.33325 5.25C0.919038 5.25 0.583252 5.58579 0.583252 6C0.583252 6.41421 0.919038 6.75 1.33325 6.75L7.99992 6.75C8.41413 6.75 8.74992 6.41421 8.74992 6C8.74992 5.58579 8.41413 5.25 7.99992 5.25L1.33325 5.25Z"
                    fill="currentColor"
                  />
                </svg>
              )}
            </button>

            {/* Raccourcis de contact cachés sur mobile pour garder de l'espace */}
            <div className="hidden sm:flex items-center gap-3 text-gray-500 dark:text-gray-400">
              <a href="tel:+237681071414" className="hover:text-brand-primary transition-colors" aria-label="Appeler le support">
                <Phone className="h-5 w-5" />
              </a>
              <a href="https://wa.me/237681071414" target="_blank" rel="noopener noreferrer" className="hover:text-[#25D366] transition-colors" aria-label="Contacter sur WhatsApp">
                <WhatsappIcon className="h-5 w-5 text-[#25D366]" />
              </a>
            </div>
          </div>

          {/* Section Centre : Logos légèrement agrandis */}
          <div className="flex items-center justify-center">
            <div className="flex items-center gap-3.5">
              <a href={AFRI_INSURANCE_LOGO_HREF} className="transition-opacity hover:opacity-90">
                <Image
                  src="/images/logo/logo-afri-insurance.png"
                  alt="Logo Afri Insurance"
                  width={125} // Ajustement pour conserver le ratio du rendu h-11 / h-12
                  height={44}
                  className="h-11 lg:h-12 w-auto object-contain"
                  priority
                />
              </a>
              <a href={AFRILIFE_LOGO_HREF} className="transition-opacity hover:opacity-90">
                <Image
                  src="/images/logo/logo-afri-life.png"
                  alt="Logo Afri Life"
                  width={44}
                  height={44}
                  className="h-11 lg:h-12 w-auto object-contain"
                  priority
                />
              </a>
            </div>
          </div>

          {/* Section Droite : Actions utilisateur */}
          <div className="flex items-center justify-end gap-2">
            <NotificationDropdown />
            <ThemeToggleButton />
            <UserDropdown />
          </div>

        </div>
      </div>
    </header>
  );
};

export default AppHeader;