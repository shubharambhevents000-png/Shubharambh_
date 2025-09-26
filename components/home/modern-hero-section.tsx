"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Star } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const heroSlides = [
  {
    id: 1,
    title: "Shubharambh Events & Management",
    subtitle: "We Build Your Dream Around You",
    description: "Sangli's Premium Event Designers",
    image: "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080",
    services: ["Wedding Planning", "Birthday & Baby Shower Events", "Rangoli & Floral Decorations"]
  },
  {
    id: 2,
    title: "Luxury Wedding Experiences",
    subtitle: "Creating Magical Moments",
    description: "Transform your special day into an unforgettable celebration",
    image: "https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080",
    services: ["Engagement Planning", "Destination Weddings", "Reception Planning"]
  },
  {
    id: 3,
    title: "Professional Event Management",
    subtitle: "Excellence in Every Detail",
    description: "From concept to execution, we handle everything",
    image: "https://images.pexels.com/photos/2306281/pexels-photo-2306281.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080",
    services: ["Catering Services", "DJ & Sound Systems", "Professional Photography"]
  }
];

export function ModernHeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
        setIsTransitioning(false);
      }, 500); // Half the transition duration
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const currentHero = heroSlides[currentSlide];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Images with Smooth Transition */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentHero.id}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              transition: { duration: 1.2, ease: "easeOut" }
            }}
            exit={{ opacity: 0 }}
            className="absolute inset-0"
          >
            <Image
              src={currentHero.image}
              alt={currentHero.title}
              fill
              className="object-cover"
              priority
              quality={90}
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="space-y-8 text-white">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="bg-white/20 backdrop-blur-md text-white border-white/30 mb-6 px-4 py-2 font-medium tracking-wide">
                <Star className="h-4 w-4 mr-2" />
                {currentHero.description}
              </Badge>
            </motion.div>

            <motion.h1
              className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <span className="block text-white mb-2 font-playfair">
                {currentHero.title.split(' ').slice(0, 2).join(' ')}
              </span>
              <span className="block bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent font-playfair italic">
                {currentHero.title.split(' ').slice(2).join(' ')}
              </span>
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl lg:text-3xl font-light text-white/90 max-w-2xl mx-auto leading-relaxed tracking-wide font-playfair"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              {currentHero.subtitle}
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <Button
                asChild
                size="lg"
                className="group bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white border-0 px-8 py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-yellow-500/20 transition-all duration-300"
              >
                <Link href="/contact" className="flex items-center">
                  <span>Contact Us</span>
                  <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="bg-transparent backdrop-blur-md border-white/30 text-white hover:bg-white/10 px-8 py-6 text-lg font-semibold rounded-xl"
              >
                <Link href="/about">
                  Learn More
                </Link>
              </Button>
            </motion.div>

            {/* Services List */}
            <motion.div
              className="pt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              <div className="flex flex-wrap justify-center gap-3">
                {currentHero.services.map((service, index) => (
                  <motion.div
                    key={service}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                    className="flex items-center space-x-2 bg-white/10 backdrop-blur-md rounded-lg px-4 py-2 border border-white/20"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-yellow-400"></div>
                    <span className="text-white text-sm font-medium tracking-wide">{service}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setIsTransitioning(true);
              setTimeout(() => {
                setCurrentSlide(index);
                setIsTransitioning(false);
              }, 500);
            }}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'bg-white scale-125'
                : 'bg-white/50 hover:bg-white/75'
            }`}
          />
        ))}
      </div>

      {/* Stats Section */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-100 py-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.5 }}
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: "1000+", label: "Events Completed" },
              { value: "50k+", label: "Happy Clients" },
              { value: "15+", label: "Years Experience" },
              { value: "24/7", label: "Support Available" }
            ].map((stat, index) => (
              <motion.div 
                key={index}
                className="space-y-1"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
              >
                <div className="text-2xl md:text-3xl font-bold text-gray-900 font-playfair">{stat.value}</div>
                <div className="text-gray-600 text-sm font-medium tracking-wide uppercase">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Add Playfair Display font via style tag since we can't modify global CSS here */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap');
      `}</style>
    </section>
  );
}