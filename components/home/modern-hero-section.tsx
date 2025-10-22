"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Star, Calendar, Users, Award, Clock } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const heroSlides = [
  {
    id: 1,
    title: "Shubharambh Events & Management",
    subtitle: "We Build Your Dream Around You",
    description: "Sangli's Premium Event Designers",
    image: "https://m.media-amazon.com/images/I/71IC2lqIgdL._AC_UF1000,1000_QL80_.jpg",
    services: ["Wedding Planning", "Birthday & Baby Shower Events", "Rangoli & Floral Decorations"]
  },
  {
    id: 2,
    title: "Luxury Wedding Experiences",
    subtitle: "Creating Magical Moments",
    description: "Transform your special day into an unforgettable celebration",
    image: "https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg",
    services: ["Engagement Planning", "Destination Weddings", "Reception Planning"]
  },
  {
    id: 3,
    title: "Professional Event Management",
    subtitle: "Excellence in Every Detail",
    description: "From concept to execution, we handle everything",
    image: "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg",
    services: ["Catering Services", "DJ & Sound Systems", "Professional Photography"]
  }
];

const stats = [
  { value: "1000+", label: "Events Completed", icon: Calendar },
  { value: "50k+", label: "Happy Clients", icon: Users },
  { value: "15+", label: "Years Experience", icon: Award },
  { value: "24/7", label: "Support Available", icon: Clock }
];

export function ModernHeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const currentHero = heroSlides[currentSlide];

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Background Images with Enhanced Overlay */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentHero.id}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              transition: { duration: 1.5, ease: "easeOut" }
            }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="absolute inset-0"
          >
            <Image
              src={currentHero.image}
              alt={currentHero.title}
              fill
              className="object-cover"
              priority
              quality={100}
              // placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/30"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mt-16 lg:mt-0">
        <div className="max-w-4xl mx-auto text-center">
          <div className="space-y-6 lg:space-y-8 text-white">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-md text-white border-yellow-500/30 mb-4 lg:mb-6 px-4 py-2 font-medium tracking-wide text-sm lg:text-base">
                <Star className="h-3 w-3 lg:h-4 lg:w-4 mr-2" />
                {currentHero.description}
              </Badge>
            </motion.div>

            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight px-4">
                <span className="block text-white mb-2 font-playfair">
                  {currentHero.title.split(' ').slice(0, 2).join(' ')}
                </span>
                <span className="block bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent font-playfair italic bg-300% animate-gradient">
                  {currentHero.title.split(' ').slice(2).join(' ')}
                </span>
              </h1>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              className="text-lg sm:text-xl md:text-2xl font-light text-white/90 max-w-2xl mx-auto leading-relaxed tracking-wide font-playfair px-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              {currentHero.subtitle}
            </motion.p>

            {/* Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <Button
                asChild
                size="lg"
                className="group bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black border-0 px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg font-semibold rounded-xl shadow-2xl hover:shadow-yellow-500/30 transition-all duration-300 transform hover:-translate-y-1 min-w-[140px]"
              >
                <Link href="/contact" className="flex items-center justify-center">
                  <span>Contact Us</span>
                  <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="bg-transparent backdrop-blur-md border-white/40 text-white hover:bg-white/10 hover:border-white/60 px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg font-semibold rounded-xl transition-all duration-300 transform hover:-translate-y-1 min-w-[140px]"
              >
                <Link href="/about">
                  Learn More
                </Link>
              </Button>
            </motion.div>

            {/* Services List */}
            <motion.div
              className="pt-6 lg:pt-8 px-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              <div className="flex flex-wrap justify-center gap-2 sm:gap-3 max-w-2xl mx-auto">
                {currentHero.services.map((service, index) => (
                  <motion.div
                    key={service}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                    className="flex items-center space-x-2 bg-white/10 backdrop-blur-md rounded-lg px-3 sm:px-4 py-2 border border-white/20 hover:border-white/40 transition-colors duration-300"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse"></div>
                    <span className="text-white text-xs sm:text-sm font-medium tracking-wide whitespace-nowrap">
                      {service}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-28 sm:bottom-32 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-500 ${
              index === currentSlide
                ? 'bg-yellow-400 scale-125 shadow-lg shadow-yellow-400/50'
                : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Stats Section */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/95 via-black/80 to-transparent backdrop-blur-md border-t border-white/10 py-6 sm:py-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.5 }}
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 text-center max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <motion.div 
                key={index}
                className="space-y-1 sm:space-y-2 group cursor-pointer"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex justify-center">
                  <stat.icon className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-400 group-hover:text-yellow-300 transition-colors duration-300" />
                </div>
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white font-playfair group-hover:text-yellow-400 transition-colors duration-300">
                  {stat.value}
                </div>
                <div className="text-gray-300 text-xs sm:text-sm font-medium tracking-wide uppercase group-hover:text-white transition-colors duration-300">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 hidden lg:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <motion.div
            className="w-1 h-3 bg-yellow-400 rounded-full mt-2"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>

      {/* Add custom styles for gradient animation */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap');
        
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .animate-gradient {
          background-size: 300% 300%;
          animation: gradient 6s ease infinite;
        }
        
        .bg-300% {
          background-size: 300% 300%;
        }
      `}</style>
    </section>
  );
}