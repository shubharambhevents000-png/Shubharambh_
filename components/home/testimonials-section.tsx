"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Quote } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";

const testimonials = [
  {
    id: 1,
    name: "Priya & Rahul Sharma",
    event: "Wedding Celebration",
    rating: 5,
    text: "Shubharambh made our dream wedding come true! Every detail was perfect, from the beautiful decorations to the seamless coordination. Highly recommended!",
    image: "https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=400",
    location: "Sangli"
  },
  {
    id: 2,
    name: "Anjali Patil",
    event: "Birthday Party",
    rating: 5,
    text: "Amazing team! They organized my daughter's birthday party beautifully. The theme decoration and arrangements were beyond our expectations.",
    image: "https://images.pexels.com/photos/1729854/pexels-photo-1729854.jpeg?auto=compress&cs=tinysrgb&w=400",
    location: "Kolhapur"
  },
  {
    id: 3,
    name: "Vikram Industries",
    event: "Corporate Event",
    rating: 5,
    text: "Professional service for our annual company event. Everything was well-organized and executed flawlessly. Great attention to detail!",
    image: "https://images.pexels.com/photos/2306281/pexels-photo-2306281.jpeg?auto=compress&cs=tinysrgb&w=400",
    location: "Mumbai"
  }
];

export function TestimonialsSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-purple-50 via-white to-pink-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl animate-float"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl animate-float" style={{ animationDelay: '4s' }}></div>
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
          <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200 mb-4 px-4 py-2">
            <Star className="h-4 w-4 mr-2" />
            Client Testimonials
          </Badge>
          
          <h2 className="text-4xl md:text-6xl font-black mb-6">
            <span className="text-gray-900">What Our Clients</span>
            <br />
            <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 bg-clip-text text-transparent">
              Say About Us
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Don&apos;t just take our word for it. Here&apos;s what our satisfied clients have to say about their experience with us.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-white/80 backdrop-blur-sm h-full">
                <CardContent className="p-6 space-y-4">
                  {/* Quote Icon */}
                  <div className="absolute top-4 right-4 opacity-10">
                    <Quote className="h-12 w-12 text-purple-600" />
                  </div>

                  {/* Rating */}
                  <div className="flex items-center space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  {/* Testimonial Text */}
                  <p className="text-gray-700 leading-relaxed italic relative z-10">
                    {testimonial.text}
                  </p>

                  {/* Client Info */}
                  <div className="flex items-center space-x-4 pt-4 border-t border-gray-100">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600">{testimonial.event}</p>
                      <p className="text-xs text-purple-600 font-medium">{testimonial.location}</p>
                    </div>
                  </div>

                  {/* Gradient Border */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-orange-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="text-lg text-gray-600 mb-6">
            Ready to create your own success story?
          </p>
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-2xl px-8 py-4 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 btn-hover-lift"
          >
            <Link href="/contact">Start Planning Your Event</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}