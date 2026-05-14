import { Hero } from '../components/home/Hero';
import { FeaturedDestinations } from '../components/home/FeaturedDestinations';
import { TrekPackages } from '../components/home/TrekPackages';
import { WhyChooseUs } from '../components/home/WhyChooseUs';
import { AdventureStats } from '../components/home/AdventureStats';
import { Testimonials } from '../components/home/Testimonials';
import { Gallery } from '../components/home/Gallery';
import { SafetyInfo } from '../components/home/SafetyInfo';
import { CTABanner } from '../components/home/CTABanner';

export const Home = () => {
  return (
    <>
      <Hero />
      <FeaturedDestinations />
      <TrekPackages />
      <WhyChooseUs />
      <AdventureStats />
      <Testimonials />
      <Gallery />
      <SafetyInfo />
      <CTABanner />
    </>
  );
};
