'use client'

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import {
  AFRI_INSURANCE_LOGO_HREF,
  AFRILIFE_LOGO_HREF,
  QUOTE_PRODUCT_CODE_AUTO,
  QUOTE_PRODUCT_CODE_HEALTH,
  QUOTE_PRODUCT_CODE_HOME,
  QUOTE_PRODUCT_CODE_PREVOYANCE,
  QUOTE_PRODUCT_CODE_TRAVEL,
  QUOTE_WIZARD_STEP_CODE_TRIP,
  URL_PARAM_PRODUCT,
  URL_PARAM_STEP,
} from "@/lib/constants/constant";

type NavItem = {
  label: string;
  href?: string;
  children?: NavItem[];
};

const LandingHeader = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openMobileMenus, setOpenMobileMenus] = useState<Record<string, boolean>>({});

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleMobileSubmenu = (key: string) => {
    setOpenMobileMenus((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const navItems: NavItem[] = [
    { href: "/", label: "Accueil" },
    {
      label: "A propos",
      children: [
        { href: "/about", label: "A propos" },
        { href: "/reseau", label: "Reseau" },
      ],
    },
    {
      label: "Nos produits",
      children: [
        {
          href: "/afrilife",
          label: "AFRILIFE",
          children: [
            { href: "/afrilife/afrilife-etude-enfants", label: "AFRILIFE etude enfants" },
            { href: "/afrilife/afrilife-indemite-fin-carriere", label: "AFRILIFE indemite fin carriere" },
            { href: "/afrilife/afrilife-retraite-complementaire-collective", label: "AFRILIFE retraite complementaire collective" },
            { href: "/afrilife/afrilife-retraite-individuelle-plus", label: "AFRILIFE retraite individuelle plus" },
            { href: "/afrilife/afrilife-retraite", label: "AFRILIFE retraite" },
            { href: "/afrilife/afrilife-libre-retraite", label: "AFRILIFE libre retraite" },
            { href: "/afrilife/afrilife-prevoyance-deces-individuel", label: "AFRILIFE prevoyance deces individuel" },
            { href: "/afrilife/afrilife-prevoyance-deces-groupe", label: "Assurance Prevoyance Deces Groupe" },
            { href: "/afriinsurance-home/assurance-prevoyance-collective", label: "Assurance prevoyance collective" },
          ],
        },
        {
          href: "/afriinsurance-home",
          label: "AFRI INSURANCE",
          children: [
            { href: "/afriinsurance-home/afri-assistance-voyage", label: "Afri assistance voyage" },
            { href: "/afri-automobile", label: "Afri automobile" },
            { href: "/afriinsurance-home/afri-caution", label: "AFRI CAUTION" },
            { href: "/afriinsurance-home/afri-individuelle-accidents", label: "Afri individuelle accidents" },
            { href: "/afriinsurance-home/afri-multitrisque-habitation", label: "Afri multitrisque habitation" },
            { href: "/afriinsurance-home/afri-responsabilite-civile-chef-dentreprise", label: "Afri responsabilite civile chef d'entreprise" },
            { href: "/afriinsurance-home/afri-responsabilite-civile-chef-de-famille", label: "Afri responsabilite civile chef de famille" },
            { href: "/afri-transport-des-marchandises", label: "Afri transport des marchandises" },
            { href: "/afriinsurance-home/afri-sante", label: "AFRI SANTE" },
          ],
        },
      ],
    },
    { href: "/news", label: "Actualité" },
    { href: "/contact", label: "Contact" },
  ];

  const quoteItems: NavItem[] = [
    {
      href: `/?${URL_PARAM_PRODUCT}=${QUOTE_PRODUCT_CODE_TRAVEL}&${URL_PARAM_STEP}=${QUOTE_WIZARD_STEP_CODE_TRIP}`,
      label: "Assurance Voyage",
    },
    {
      href: `/?${URL_PARAM_PRODUCT}=${QUOTE_PRODUCT_CODE_AUTO}`,
      label: "Assurance Automobile",
    },
    {
      href: `/?${URL_PARAM_PRODUCT}=${QUOTE_PRODUCT_CODE_HOME}`,
      label: "Multirisque habitation",
    },
    {
      href: `/?${URL_PARAM_PRODUCT}=${QUOTE_PRODUCT_CODE_PREVOYANCE}`,
      label: "Prevoyance individuelle",
    },
    {
      href: `/?${URL_PARAM_PRODUCT}=${QUOTE_PRODUCT_CODE_HEALTH}`,
      label: "Assurance santé",
    },
  ];

  const actionItems = [
    { href: "/claims", label: "Déclarer sinistre", borderClass: "border-red-500/80" },
    // { href: "/signin", label: "Espace client", borderClass: "border-brand-primary/90" },
  ];

  return (
    <header className="fixed top-0 left-0 z-50 w-full border-b border-white/15 bg-brand-secondary text-white backdrop-blur-[2px]">
      <nav className="mx-auto flex w-full max-w-[1500px] items-center justify-between px-2 py-2 md:px-4 xl:px-6">
        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={AFRI_INSURANCE_LOGO_HREF}
            className="transition-opacity hover:opacity-90"
          >
            <Image
              src="/images/logo/Logo-white-Afri-Insurance@3x.png"
              alt="Afri Insurance"
              height={72}
              width={168}
              className="h-12 w-auto md:h-14"
            />
          </a>
          <a
            href={AFRILIFE_LOGO_HREF}
            className="transition-opacity hover:opacity-90"
          >
            <Image
              src="/images/logo/Logo-White-AfriLife@3x.png"
              alt="Afri Life"
              height={70}
              width={130}
              className="h-13 w-auto md:h-[62px]"
            />
          </a>
        </div>

        <div className="hidden items-center gap-2 text-sm font-normal lg:flex xl:gap-3">
          {navItems.map((item) => (
            <div key={item.label} className="group relative">
              {item.href ? (
                <Link
                  href={item.href}
                  className={`whitespace-nowrap px-2 py-1 transition ${
                    pathname === item.href
                      ? "bg-brand-primary/70 px-3 py-3 text-white"
                      : "text-white/90 hover:text-orange-500"
                  }`}
                >
                  {item.label}
                </Link>
              ) : (
                <button
                  type="button"
                  className="inline-flex items-center gap-1 whitespace-nowrap px-2 py-1 text-white/90 transition hover:text-orange-500"
                >
                  {item.label}
                  <span className="text-xs">▼</span>
                </button>
              )}

              {item.children ? (
                <div className="invisible absolute left-0 top-full z-50 mt-3 min-w-[240px] border border-white/10 bg-black p-2 opacity-0 shadow-2xl transition-all duration-150 group-hover:visible group-hover:opacity-100">
                  {item.children.map((child) => (
                    <div key={child.label} className="group/submenu relative">
                      <Link
                        href={child.href ?? "#"}
                        className="flex items-center justify-between px-3 py-2 text-sm text-white/90 transition hover:bg-brand-primary/15 hover:text-orange-500"
                      >
                        <span>{child.label}</span>
                        {child.children ? <span className="text-[10px]">▶</span> : null}
                      </Link>
                      {child.children ? (
                        <div className="invisible absolute left-full top-0 ml-2 max-h-[360px] min-w-[320px] overflow-auto border border-white/10 bg-black p-2 opacity-0 shadow-2xl transition-all duration-150 group-hover/submenu:visible group-hover/submenu:opacity-100">
                          {child.children.map((grandChild) => (
                            <Link
                              key={grandChild.label}
                              href={grandChild.href ?? "#"}
                              className="block px-3 py-2 text-sm text-white/90 transition hover:bg-brand-primary/15 hover:text-orange-500"
                            >
                              {grandChild.label}
                            </Link>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
          <div className="ml-2 flex items-center gap-2">
            <div className="group relative">
              <button
                type="button"
                className="inline-flex items-center gap-1 whitespace-nowrap rounded-full border border-red-500/80 px-3 py-1 text-sm font-normal text-white/95 transition hover:border-orange-500 hover:text-orange-500"
              >
                Obtenir devis
                <span className="text-[10px]">▼</span>
              </button>
              <div className="invisible absolute right-0 top-full z-50 mt-3 min-w-[240px] border border-white/10 bg-black p-2 opacity-0 shadow-2xl transition-all duration-150 group-hover:visible group-hover:opacity-100">
                {quoteItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href ?? "#"}
                    className="block px-3 py-2 text-sm text-white/90 transition hover:bg-brand-primary/15 hover:text-orange-500"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
            {actionItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`whitespace-nowrap rounded-full border px-3 py-1 text-sm font-normal text-white/95 transition hover:border-orange-500 hover:text-orange-500 ${item.borderClass}`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <button
          onClick={toggleMenu}
          className="p-2 text-white transition-all hover:bg-brand-primary/20 hover:text-orange-500 focus:outline-none lg:hidden"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          )}
        </button>
      </nav>

      <div className={`overflow-hidden border-t border-white/10 bg-black/95 transition-all duration-300 ease-in-out lg:hidden ${
        isMenuOpen ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0"
      }`}>
        <div className="flex max-h-[80vh] flex-col gap-1 overflow-auto px-4 py-4">
          {navItems.map((item) => {
            const isOpen = openMobileMenus[item.label];
            return (
              <div key={item.label} className="border border-white/10 bg-black">
                <div className="flex items-center justify-between">
                  {item.href ? (
                    <Link
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="block w-full px-4 py-3 text-sm font-normal text-white/95 hover:text-orange-500"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <button
                      type="button"
                      onClick={() => toggleMobileSubmenu(item.label)}
                      className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-normal text-white/95"
                    >
                      <span>{item.label}</span>
                      <span className="text-sm">{isOpen ? "▲" : "▼"}</span>
                    </button>
                  )}
                </div>

                {item.children && isOpen ? (
                  <div className="space-y-1 border-t border-white/10 px-2 py-2">
                    {item.children.map((child) => {
                      const childKey = `${item.label}-${child.label}`;
                      const isChildOpen = openMobileMenus[childKey];
                      return (
                        <div key={child.label} className="bg-white/5">
                          {child.children ? (
                            <>
                              <button
                                type="button"
                                onClick={() => toggleMobileSubmenu(childKey)}
                                className="flex w-full items-center justify-between px-3 py-2 text-left text-sm font-normal text-white/90"
                              >
                                <span>{child.label}</span>
                                <span className="text-sm">{isChildOpen ? "▲" : "▼"}</span>
                              </button>
                              {isChildOpen ? (
                                <div className="space-y-1 border-t border-white/10 px-2 py-2">
                                  {child.children.map((grandChild) => (
                                    <Link
                                      key={grandChild.label}
                                      href={grandChild.href ?? "#"}
                                      onClick={() => setIsMenuOpen(false)}
                                      className="block px-2 py-1.5 text-sm text-white/80 hover:bg-brand-primary/15 hover:text-orange-500"
                                    >
                                      {grandChild.label}
                                    </Link>
                                  ))}
                                </div>
                              ) : null}
                            </>
                          ) : (
                            <Link
                              href={child.href ?? "#"}
                              onClick={() => setIsMenuOpen(false)}
                              className="block px-3 py-2 text-sm font-normal text-white/90 hover:bg-brand-primary/15 hover:text-orange-500"
                            >
                              {child.label}
                            </Link>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ) : null}
              </div>
            );
          })}
          <div className="mt-2 space-y-2">
            <div className="rounded-full border border-red-500/80">
              <button
                type="button"
                onClick={() => toggleMobileSubmenu("quote")}
                className="flex w-full items-center justify-between rounded-full px-4 py-2 text-sm font-normal text-white/95 transition hover:border-orange-500 hover:text-orange-500"
              >
                <span>Obtenir devis</span>
                <span className="text-sm">{openMobileMenus.quote ? "▲" : "▼"}</span>
              </button>
              {openMobileMenus.quote ? (
                <div className="space-y-1 border-t border-white/10 px-2 py-2">
                  {quoteItems.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href ?? "#"}
                      onClick={() => setIsMenuOpen(false)}
                      className="block rounded px-3 py-2 text-sm text-white/90 hover:bg-brand-primary/15 hover:text-orange-500"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>
            {actionItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={`block rounded-full border px-4 py-2 text-center text-sm font-normal text-white transition hover:border-orange-500 hover:text-orange-500 ${item.borderClass}`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default LandingHeader;












