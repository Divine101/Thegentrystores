import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/home/HeroSection';
import FeaturedCollection from '@/components/home/FeaturedCollection';
import NewArrivals from '@/components/home/NewArrivals';
import SignaturePieces from '@/components/home/SignaturePieces';
import BrandStory from '@/components/home/BrandStory';
import InstagramGallery from '@/components/home/InstagramGallery';
import WhatsAppButton from '@/components/WhatsAppButton';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <FeaturedCollection />
        <NewArrivals />
        <SignaturePieces />
        <BrandStory />
        <InstagramGallery />
      </main>
      <Footer />
      <WhatsAppButton variant="icon" />
    </div>
  );
};

export default Index;
