"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type AuthSlide = {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
};

const slides: AuthSlide[] = [
  {
    title: "Protection voyage simple et rapide",
    description:
      "Obtenez votre couverture en quelques minutes, avec un parcours 100% en ligne.",
    image: "/images/grid-image/img1.jpg",
    imageAlt: "Voyageurs a l'aeroport",
  },
  {
    title: "Un accompagnement humain",
    description:
      "Nos equipes vous accompagnent avant, pendant et apres votre depart.",
    image: "/images/grid-image/img2.jpg",
    imageAlt: "Assistance et accompagnement",
  },
  {
    title: "Votre espace client centralise",
    description:
      "Suivez vos contrats, vos informations personnelles et vos demandes en un seul endroit.",
    image: "/images/grid-image/img3.jpg",
    imageAlt: "Consultation de contrat en ligne",
  },
  {
    title: "Une couverture adaptee a vos besoins",
    description:
      "Choisissez la formule qui correspond a votre sejour et voyagez avec serenite.",
    image: "/images/grid-image/img4.jpg",
    imageAlt: "Famille en voyage",
  },
];

export default function AuthFeatureCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  const activeSlide = slides[currentIndex];

  return (
    <div className="h-full w-full p-4 lg:p-6">
      <div className="relative h-full w-full overflow-hidden rounded-2xl">
        {slides.map((slide, index) => (
          <div
            key={slide.image}
            className={`absolute inset-0 transition-opacity duration-700 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
            aria-hidden={index !== currentIndex}
          >
            <Image
              src={slide.image}
              alt={slide.imageAlt}
              fill
              className="object-cover"
              priority={index === 0}
            />
          </div>
        ))}

        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-black/10" />

        <div className="absolute inset-x-0 bottom-0 p-8 text-white">
          <h2 className="text-2xl font-semibold mb-3">{activeSlide.title}</h2>
          <p className="text-sm leading-6 text-white/90 max-w-md">{activeSlide.description}</p>

          <div className="mt-6 flex items-center justify-center gap-2">
            {slides.map((slide, index) => (
              <button
                key={slide.title}
                type="button"
                onClick={() => setCurrentIndex(index)}
                className={`h-2.5 rounded-full transition-all ${
                  index === currentIndex ? "w-8 bg-white" : "w-2.5 bg-white/50"
                }`}
                aria-label={`Afficher le slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
