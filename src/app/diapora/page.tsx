"use client";

import DiasporaFooter from '@/components/diaspora/DiasporaFooter';
import DiasporaFormSection from '@/components/diaspora/DiasporaFormSection';
import DiasporaHero from '@/components/diaspora/DiasporaHero';
import LandingHeader from '@/components/website/header/LandingHeader';

export default function DiasporaPage() {
  return (
    <div>
      <LandingHeader/>
      <DiasporaHero />
      <DiasporaFormSection/>
      <DiasporaFooter/>
    </div>
  );
}