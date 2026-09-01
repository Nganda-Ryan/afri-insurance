'use client';

export default function DiasporaHero() {
  return (
    <section className="relative overflow-hidden bg-[#4A2166] py-16 md:py-20 text-white">
      {/* Background Gradients */}
      <div 
        className=" absolute inset-0 z-0 opacity-80"
        style={{
          backgroundImage: `
            radial-gradient(circle at 88% 12%, rgba(231,79,28,0.28), transparent 46%),
            radial-gradient(circle at 6% 92%, rgba(112,48,160,0.55), transparent 46%)
          `
        }}
      />

      <div className="relative z-10 max-w-[1080px] mx-auto px-7">
        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-10 lg:gap-14 items-end">
          <div>
            <span className="font-semibold text-xs uppercase text-[#E74F1C]">
              Service Diaspora
            </span>
            <h1 className="md:text-5xl font-semibold mt-3.5 tracking-[-0.01em]">
              Où que vous soyez, parlons de <span className="text-[#F5C7B0]">vos besoins</span>.
            </h1>
            <p className="mt-5 text-md text-[#d9c7e8] font-medium max-w-[46ch]">
              Décrivez votre situation en quelques minutes. 
              Un conseiller AFRI INSURANCE / AFRILIFE INSURANCE 
              étudie votre demande et revient vers vous avec une offre personnalisée, sans engagement.
            </p>

            <a
              href="#"
              className="inline-flex items-center gap-2.5 mt-7 bg-[#E74F1C] hover:bg-[#d44315] transition-colors text-white font-bold text-sm px-5 py-3.5 rounded-full shadow-[0_14px_30px_-12px_rgba(231,79,28,0.65)]"
            >
              Remplir le formulaire
              <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="#ffffff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>

            {/* under part */}
            <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-0 border-t border-white/16 pt-6">
              <div className="md:pr-5">
                <div className="text-3xl font-semibold text-white">7</div>
                <div className="mt-1 text-xs text-[#d9c7e8] ">
                  produits Vie &amp; Non-Vie pensés pour la diaspora
                </div>
              </div>

              <div className="md:px-5 md:border-l border-white/16">
                <div className=" text-3xl font-semibold text-white">100%</div>
                <div className="mt-1 text-xs text-[#d9c7e8] ">
                  à distance — souscription et paiement depuis votre compte Diaspora
                </div>
              </div>

              <div className="md:pl-5 md:border-l border-white/16">
                <div className="text-3xl font-semibold text-white">48h</div>
                <div className="mt-1 text-xs text-[#d9c7e8] ">
                  délai moyen de retour d&apos;un conseiller après votre demande
                </div>
              </div>
            </div>
          </div>

          {/* Map SVG */}
          <div className="relative max-w-[280px] lg:max-w-none mx-auto w-full">
            <svg viewBox="0 0 320 260" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto block" aria-hidden="true">
              <path d="M30 210 C 90 150, 110 90, 170 60 C 220 36, 260 44, 290 30" stroke="#F5C7B0" strokeWidth="2" strokeDasharray="1 10" strokeLinecap="round" />
              <circle cx="30" cy="210" r="7" fill="#4A2166" stroke="#F5C7B0" strokeWidth="2" />
              <circle cx="290" cy="30" r="7" fill="#E74F1C" />
              <g transform="translate(150,50) rotate(-28)">
                <path d="M0 0 L16 4 L0 8 L4 4 Z" fill="#ffffff" />
              </g>
              <text x="18" y="234" fill="#e9d9f2" fontFamily="sans-serif" fontSize="11" fontWeight="600">Votre famille, au pays</text>
              <text x="196" y="20" fill="#e9d9f2" fontFamily="sans-serif" fontSize="11" fontWeight="600">Vous, à l&apos;étranger</text>
            </svg>
            <p className="mt-3.5 text-xs text-[#c9b3dc] text-center lg:text-left">
              La distance ne change rien à la protection : un même parcours vous relie à ceux que vous protégez.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}