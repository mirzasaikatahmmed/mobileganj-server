import HeroBanner from "./_components/HeroBanner";
import FeaturedCategories from "./_components/FeaturedCategories";
import NewArrivalsSection from "./_components/NewArrivalsSection";
import TrendingSection from "./_components/TrendingSection";
import BestDealsSection from "./_components/BestDealsSection";
import BrandNewPhoneSection from "./_components/BrandNewPhoneSection";
import UsedPhoneSection from "./_components/UsedPhoneSection";
import SellPhoneCTASection from "./_components/SellPhoneCTASection";
import EMIBannerSection from "./_components/EMIBannerSection";
import PreOrderSection from "./_components/PreOrderSection";
import BrandsSection from "./_components/BrandsSection";
import TestimonialsSection from "./_components/TestimonialsSection";
import FeaturesSection from "./_components/FeaturesSection";

const HomePage = () => {
  return (
    <div>
      <div className="container mx-auto px-4 py-6">
        {/* Hero Slider */}
        <HeroBanner />

        {/* Categories */}
        <FeaturedCategories />

        {/* New Arrivals (separate section) */}
        <NewArrivalsSection />

        {/* Brand New Phones (6 cols compact grid) */}
        <BrandNewPhoneSection />

        {/* EMI Banner */}
        <EMIBannerSection />

        {/* Used Phones (green themed section) */}
        <UsedPhoneSection />

        {/* Sell Your Phone CTA */}
        <SellPhoneCTASection />

        {/* Trending Products */}
        <TrendingSection />

        {/* Best Deals */}
        <BestDealsSection />

        {/* Shop by Brand */}
        <BrandsSection />
      </div>

      {/* Pre-order (full width gradient) */}
      <PreOrderSection />

      {/* Customer Testimonials */}
      <div className="container mx-auto px-4">
        <TestimonialsSection />
      </div>

      {/* Trust Features Strip */}
      <FeaturesSection />
    </div>
  );
};

export default HomePage;
