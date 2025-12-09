import airplaneHero from '@/assets/airplane-hero.jpg';
import {Plane} from "lucide-react";

const HeroSection = () => (
  <div
    className="relative h-[60vh] bg-cover bg-center bg-no-repeat"
    style={{ backgroundImage: `url(${airplaneHero})` }}
  >
    <div className="absolute inset-0 bg-gradient-hero opacity-80"></div>
    <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
      <div className="animate-float mb-6">
        <Plane className="w-16 h-16 text-white" />
      </div>
      <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
        Wizz Air Fare Finder
      </h1>
      <p className="text-xl text-white/90 mb-8 drop-shadow-md">
        Search flights from Skopje to destinations worldwide
      </p>
    </div>
  </div>
);

export default HeroSection;