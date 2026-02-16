import HeroSection from '../components/home/HeroSection';
import FeaturesSection from '../components/home/FeaturesSection';
import HowItWorksSection from '../components/home/HowItWorksSection';
import CTASection from '../components/home/CTASection';
import Footer from '../components/home/Footer';

const HomePage = () => {
    return (
        <div className="min-h-screen bg-gray-950 text-white font-sans selection:bg-indigo-500/30">
            <HeroSection />
            <FeaturesSection />
            <HowItWorksSection />
            <CTASection />
            <Footer />
        </div>
    );
};

export default HomePage;
