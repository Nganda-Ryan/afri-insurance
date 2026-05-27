import Image from "next/image";
import Link from "next/link";

import {
  AFRI_INSURANCE_LOGO_HREF,
  AFRILIFE_LOGO_HREF,
} from "@/lib/constants/constant";

const MAP_EMBED_URL =
  "https://maps.google.com/maps?q=Cameroun%2C%20Littoral%2C%20Douala%2C%20AKWA%2C%20Boulevard%20de%20la%20Libert%C3%A9%2C%20h%C3%B4tel%20La%20Falaise&t=m&z=15&output=embed&iwloc=near";

type CompanyInfoProps = {
  title: string;
  href: string;
  children: React.ReactNode;
};

function CompanyInfo({ title, href, children }: CompanyInfoProps) {
  return (
    <div className="space-y-2">
      <h2 className="text-base font-bold text-brand-primary">
        <Link href={href} className="hover:underline">
          {title}
        </Link>
      </h2>
      <div className="text-sm leading-relaxed text-gray-700">{children}</div>
    </div>
  );
}

function InfoLine({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <p>
      <strong className="font-semibold text-gray-900">{label}</strong> : {value}
    </p>
  );
}

const LandingFooter = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto">
      <div className="bg-white text-gray-800">
        <div className="mx-auto w-full max-w-[1500px] px-4 py-10 md:px-6 lg:py-15">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {/* Colonne logos */}
            <div className="flex flex-col items-start gap-6">
              <a
                href={AFRI_INSURANCE_LOGO_HREF}
                className="block transition-opacity hover:opacity-90"
              >
                <Image
                  src="/images/logo/logo-afri-insurance.png"
                  alt="Afri Insurance"
                  width={280}
                  height={156}
                  className="h-auto w-full max-w-[120px] md:max-w-[160px]"
                />
              </a>
              <a
                href={AFRILIFE_LOGO_HREF}
                className="block transition-opacity hover:opacity-90"
              >
                <Image
                  src="/images/logo/logo-afri-life.png"
                  alt="Afrilife Insurance"
                  width={220}
                  height={250}
                  className="h-auto w-full max-w-[70px] md:max-w-[90px]"
                />
              </a>
            </div>

            {/* Colonne Entreprise — masquée sur mobile comme sur WordPress */}
            <div className="hidden flex-col gap-6 md:flex">
              <h6 className="text-base font-bold text-gray-900">Entreprise</h6>
              <CompanyInfo title="AFRI INSURANCE" href="/afriinsurance-home">
                <InfoLine label="Raison sociale" value="S.A" />
                <InfoLine label="Numéro RCCM" value="CM-DLA-01-2025-M-05989" />
                <InfoLine label="Capital social" value="FCFA 5 000 000 000" />
                <InfoLine
                  label="Numéro d'agrément CIMA"
                  value="0000627/MINFI DU 11/08/2025"
                />
              </CompanyInfo>
              <CompanyInfo title="AFRILIFE INSURANCE" href="/afrilife">
                <InfoLine label="Raison sociale" value="S.A" />
                <InfoLine label="Numéro RCCM" value="CM-DLA-01-2025-B14-00002" />
                <InfoLine label="Capital social" value="FCFA 3 000 000 000" />
                <InfoLine
                  label="Numéro d'agrément CIMA"
                  value="0000620/MINFI DU 11/08/2025"
                />
              </CompanyInfo>
            </div>

            {/* Colonne Contact */}
            <div className="flex flex-col gap-4">
              <h6 className="text-base font-bold text-gray-900">Contact</h6>
              <div className="space-y-3 text-sm leading-relaxed text-gray-700">
                <InfoLine
                  label="Siège Social"
                  value="AKWA, Boulevard de la Liberté, A côté de l'hôtel La Falaise"
                />
                <InfoLine
                  label="Téléphones"
                  value={
                    <>
                      <a href="tel:+237681071414" className="hover:text-brand-primary">
                        +237 681071414
                      </a>
                      {" / "}
                      <a href="tel:+237689141414" className="hover:text-brand-primary">
                        689141414
                      </a>
                    </>
                  }
                />
                <InfoLine
                  label="Mail"
                  value={
                    <>
                      <a
                        href="mailto:infos@afri-insurance.com"
                        className="hover:text-brand-primary"
                      >
                        infos@afri-insurance.com
                      </a>
                      {" / "}
                      <a
                        href="mailto:infos.life@afrilife-insurance.com"
                        className="hover:text-brand-primary break-all"
                      >
                        infos.life@afrilife-insurance.com
                      </a>
                    </>
                  }
                />
                <InfoLine
                  label="Sinistre"
                  value={
                    <a
                      href="mailto:reclamations@afri-insurance.com"
                      className="hover:text-brand-primary"
                    >
                      reclamations@afri-insurance.com
                    </a>
                  }
                />
              </div>

              {/* Infos entreprise visibles uniquement sur mobile */}
              <div className="flex flex-col gap-6 border-t border-gray-200 pt-6 md:hidden">
                <h6 className="text-base font-bold text-gray-900">Entreprise</h6>
                <CompanyInfo title="AFRI INSURANCE" href="/afriinsurance-home">
                  <InfoLine label="Raison sociale" value="S.A" />
                  <InfoLine label="Numéro RCCM" value="CM-DLA-01-2025-M-05989" />
                  <InfoLine label="Capital social" value="FCFA 5 000 000 000" />
                  <InfoLine
                    label="Numéro d'agrément CIMA"
                    value="0000627/MINFI DU 11/08/2025"
                  />
                </CompanyInfo>
                <CompanyInfo title="AFRILIFE INSURANCE" href="/afrilife">
                  <InfoLine label="Raison sociale" value="S.A" />
                  <InfoLine label="Numéro RCCM" value="CM-DLA-01-2025-B14-00002" />
                  <InfoLine label="Capital social" value="FCFA 3 000 000 000" />
                  <InfoLine
                    label="Numéro d'agrément CIMA"
                    value="0000620/MINFI DU 11/08/2025"
                  />
                </CompanyInfo>
              </div>
            </div>

            {/* Colonne carte */}
            <div className="min-h-[180px] w-full overflow-hidden rounded-lg border border-gray-200 shadow-sm md:min-h-[260px] lg:min-h-[280px]">
              <iframe
                title="Cameroun, Littoral, Douala, AKWA, Boulevard de la Liberté, hôtel La Falaise"
                src={MAP_EMBED_URL}
                loading="lazy"
                className="h-full min-h-[180px] w-full border-0 md:min-h-[260px] lg:min-h-[280px]"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Barre copyright — sans sélecteur de langue */}
      <div className="bg-brand-secondary px-4 py-4 text-white">
        <p className="mx-auto max-w-[1500px] text-center text-xs leading-relaxed sm:text-sm">
          Copyright © {year} AFRILIFE - AFRI INSURANCE | Tous droits réservés – site
          web conçu et designé par ARON CLOUD.
        </p>
      </div>
    </footer>
  );
};

export default LandingFooter;
