"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Heart, 
  Camera, 
  Music, 
  Utensils, 
  Flower, 
  Sparkles,
  ArrowRight,
  Star
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const services = [
  {
    id: 1,
    title: "Wedding Planning",
    description: "Complete wedding planning services from engagement to reception",
    icon: Heart,
    image: "https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=800",
    features: ["Venue Selection", "Decoration", "Catering", "Photography"],
    color: "from-pink-500 to-rose-500"
  },
  {
    id: 2,
    title: "Birthday & Baby Shower",
    description: "Memorable celebrations for your special milestones",
    icon: Sparkles,
    image: "https://images.pexels.com/photos/1729854/pexels-photo-1729854.jpeg?auto=compress&cs=tinysrgb&w=800",
    features: ["Theme Planning", "Decoration", "Entertainment", "Catering"],
    color: "from-purple-500 to-indigo-500"
  },
  {
    id: 3,
    title: "Rangoli & Floral",
    description: "Traditional and modern decorative arrangements",
    icon: Flower,
    image: "https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=800",
    features: ["Rangoli Designs", "Floral Arrangements", "Traditional Decor", "Modern Styling"],
    color: "from-orange-500 to-yellow-500"
  },
  {
    id: 4,
    title: "Professional Photography",
    description: "Capture every precious moment with our expert photographers",
    icon: Camera,
    image: "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=800",
    features: ["Wedding Photography", "Event Coverage", "Portrait Sessions", "Video Services"],
    color: "from-blue-500 to-cyan-500"
  },
  {
    id: 5,
    title: "DJ & Sound Systems",
    description: "Professional audio equipment and entertainment services",
    icon: Music,
    image: "https://images.pexels.com/photos/2306281/pexels-photo-2306281.jpeg?auto=compress&cs=tinysrgb&w=800",
    features: ["DJ Services", "Sound Systems", "Lighting", "Live Music"],
    color: "from-green-500 to-emerald-500"
  },
  {
    id: 6,
    title: "Catering Services",
    description: "Delicious cuisine and professional catering for all events",
    icon: Utensils,
    image: "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=800",
    features: ["Multi-Cuisine", "Live Counters", "Traditional Food", "Modern Presentation"],
    color: "from-red-500 to-pink-500"
  }
];

export function ServicesShowcase() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-purple-50/30 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-600 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Badge className="bg-purple-100 text-purple-700 border-purple-200 mb-4 px-4 py-2">
            <Star className="h-4 w-4 mr-2" />
            Our Services
          </Badge>
          
          <h2 className="text-4xl md:text-6xl font-black mb-6">
            <span className="text-gray-900">Complete Event</span>
            <br />
            <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 bg-clip-text text-transparent">
              Management Solutions
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            From intimate gatherings to grand celebrations, we bring your vision to life with 
            meticulous planning and flawless execution.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="group"
            >
              <Card className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-white/80 backdrop-blur-sm h-full">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  
                  <div className={`absolute top-4 left-4 w-12 h-12 rounded-full bg-gradient-to-r ${service.color} flex items-center justify-center shadow-lg`}>
                    <service.icon className="h-6 w-6 text-white" />
                  </div>
                </div>

                <CardContent className="p-6 space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-900 text-sm">Includes:</h4>
                    <div className="flex flex-wrap gap-2">
                      {service.features.map((feature) => (
                        <Badge
                          key={feature}
                          variant="outline"
                          className="text-xs border-purple-200 text-purple-700 hover:bg-purple-50"
                        >
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Button
                    asChild
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group/btn"
                  >
                    <Link href="/contact" className="flex items-center justify-center">
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 to-transparent"></div>
            
            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Create Something Amazing?
              </h3>
              <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
                Let&apos;s discuss your event and bring your vision to life with our expert team.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 text-lg font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Link href="/contact">Get Free Consultation</Link>
                </Button>
                
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-white/30 text-black hover:bg-white/10 px-8 py-4 text-lg font-semibold rounded-2xl backdrop-blur-sm"
                >
                  <Link href="/products">View Our Work</Link>
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}