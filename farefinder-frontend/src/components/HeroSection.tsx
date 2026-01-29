import airplaneHero from '@/assets/airplane-hero.jpg';
import {Plane} from "lucide-react";

const HeroSection = () => (
  <div
    className="relative h-[60vh] min-h-[400px] bg-cover bg-center bg-no-repeat"
    style={{ backgroundImage: `url(${airplaneHero})` }}
  >
    <div className="absolute inset-0 bg-gradient-hero opacity-80"></div>

    <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 max-w-4xl mx-auto">
      <div className="animate-float mb-8">
        <Plane className="w-12 h-12 sm:w-16 sm:h-16 text-white drop-shadow-2xl" />
      </div>

      <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 drop-shadow-2xl tracking-tight">
        Fare Finder
      </h1>

      <p className="text-lg sm:text-xl lg:text-2xl text-white/95 mb-3 drop-shadow-lg font-light max-w-2xl">
        Search flights from Skopje to destinations worldwide
      </p>

      <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
      <span className="text-xs sm:text-sm text-white/80">
        Wizz Air Edition
      </span>
      </div>
    </div>
  </div>
);

export default HeroSection;