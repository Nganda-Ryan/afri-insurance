"use client";

export default function DiasporaFooter() {
  return (
    <footer className="bg-[#4A2166] text-white py-10 mt-0">
      <div className="max-w-[1080px] mx-auto px-7 flex flex-wrap gap-7 justify-between items-center">
        
        <div className="flex flex-wrap gap-x-8 gap-y-6">
          <div className="text-sm text-[#b79cc8] ">
            <b className="block text-white uppercase mb-[3px] font-semibold">
              Téléphone
            </b>
            681 071 414 (Non-Vie) · 689 141 414 (Vie)
          </div>

          <div className="text-sm text-[#b79cc8] ">
            <b className="block text-white uppercase mb-[3px] font-semibold">
              Email
            </b>
            <a 
              href="mailto:infos@afri-insurance.com" 
            >
              infos@afri-insurance.com
            </a>
          </div>

          <div className="text-sm text-[#b79cc8] ">
            <b className="block text-white uppercase mb-[3px] font-semibold">
              Site web
            </b>
            <a 
              href="https://www.afri-insurance.com" 
              target="_blank" 
            >
              www.afri-insurance.com
            </a>
          </div>

          <div className="text-sm text-[#b79cc8] ">
            <b className="block text-white uppercase mb-[3px] font-semibold">
              WhatsApp
            </b>
            Contactez Albi : 681 071 414
          </div>
        </div>

        <div className="text-[#b79cc8] text-sm w-full pt-2">
          AFRI INSURANCE · AFRILIFE INSURANCE · Service Diaspora
        </div>

      </div>
    </footer>
  );
}