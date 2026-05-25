"use client";

export function QuoteHero() {
  return (
    <section
      className="bg-brand-primary px-4 pb-10 pt-20 sm:px-6 sm:pb-8 sm:pt-20 lg:pb-10 lg:pt-24"
      aria-labelledby="quote-hero-title"
    >
      <div className="mx-auto max-w-7xl">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-white sm:text-base">
          100% digital
        </p>
        <h1
          id="quote-hero-title"
          className="mt-3 text-2xl font-bold leading-tight text-white sm:text-3xl lg:text-4xl"
        >
          Achetez votre assurance voyage en quelques clics
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/85 sm:text-base">
          Renseignez vos informations et recevez une proposition adaptée à votre voyage.
        </p>
      </div>
    </section>
  );
}
