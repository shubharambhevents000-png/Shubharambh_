"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Youtube, Play, ExternalLink } from "lucide-react";
import Link from "next/link";

const youtubeShorts = [
  { id: 1, videoId: "ANPPct-ZtF0", title: "Event Highlight 1" },
  { id: 2, videoId: "v83-12O4hSM", title: "Event Highlight 2" },
  { id: 3, videoId: "UNtoQwsf2Jw", title: "Event Highlight 3" },
  { id: 4, videoId: "FGWOcU_ghzk", title: "Event Highlight 4" },
];

function YoutubeShortCard({
  videoId,
  index,
}: {
  videoId: string;
  index: number;
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  const handlePlay = () => {
    setIsPlaying(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group"
    >
      <Card className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-white/80 backdrop-blur-sm">
        <div className="relative aspect-[9/16] overflow-hidden bg-gray-900">
          {isPlaying ? (
            // --- This iframe is loaded only when isPlaying is true ---
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1`} // Added autoplay=1
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
              style={{ border: "none" }}
            ></iframe>
          ) : (
            // --- This is the initial view with a clean thumbnail ---
            <div
              onClick={handlePlay}
              className="w-full h-full cursor-pointer bg-cover bg-center"
              style={{ backgroundImage: `url(${thumbnailUrl})` }}
            >
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-white/30 backdrop-blur-sm rounded-full p-4">
                  <Play
                    className="h-8 w-8 text-white drop-shadow-lg"
                    fill="white"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
}

// --- Main Section Component (Now Simplified) ---
export function YoutubeSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-red-50 via-white to-pink-50/30 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-600 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Badge className="bg-red-100 text-red-700 border-red-200 mb-4 px-4 py-2">
            <Youtube className="h-4 w-4 mr-2" />
            Watch Our Work
          </Badge>

          <h2 className="text-4xl md:text-6xl font-black mb-6">
            <span className="text-gray-900">See Our Events</span>
            <br />
            <span className="bg-gradient-to-r from-red-600 via-pink-500 to-orange-500 bg-clip-text text-transparent">
              Come to Life
            </span>
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Get a glimpse of the magical moments we create. Watch our latest
            event highlights and celebrations.
          </p>
        </motion.div>

        {/* --- Using the new component in the grid --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {youtubeShorts.map((short, index) => (
            <YoutubeShortCard
              key={short.id}
              videoId={short.videoId}
              index={index}
            />
          ))}
        </div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-r from-red-600 via-pink-500 to-orange-500 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 to-transparent"></div>

            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm mb-6">
                <Youtube className="h-10 w-10 text-white" />
              </div>

              <h3 className="text-3xl md:text-4xl font-bold mb-4">
                Want to See More?
              </h3>
              <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
                Subscribe to our YouTube channel for more event highlights,
                behind-the-scenes content, and celebration inspiration.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-red-600 hover:bg-gray-100 px-8 py-4 text-lg font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group/btn"
                >
                  <Link
                    href="https://www.youtube.com/@ShubharambhEventManagement"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center"
                  >
                    <Youtube className="mr-2 h-5 w-5" />
                    Visit Our Channel
                    <ExternalLink className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-white/30 text-white bg-white/10 px-8 py-4 text-lg font-semibold rounded-2xl backdrop-blur-sm"
                >
                  <Link href="/contact">Book Your Event</Link>
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
