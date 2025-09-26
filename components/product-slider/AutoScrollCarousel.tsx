"use client"

import { useCallback, useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import useEmblaCarousel from "embla-carousel-react"
import AutoPlay from "embla-carousel-autoplay"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, ChevronRight, ChevronLeft, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

interface ProductType {
  id: string
  title: string
  displayImage: string
}

export function ModernAutoScrollCarousel({ products }: { products: ProductType[] }) {
  const createCircularList = (items: ProductType[], multiplier: number = 3) => {
    const circularList = []
    for (let i = 0; i < multiplier; i++) {
      circularList.push(...items.map((item, index) => ({
        ...item,
        id: `${item.id}-${i}-${index}`,
        originalId: item.id
      })))
    }
    return circularList
  }

  const circularProducts = createCircularList(products)

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { 
      loop: true,
      align: "start",
      skipSnaps: false,
      dragFree: true,
      containScroll: false,
      slidesToScroll: 1,
    },
    [AutoPlay({ 
      delay: 2000, 
      stopOnInteraction: false,
      stopOnMouseEnter: true,
      playOnInit: true
    })]
  )

  const [isHovered, setIsHovered] = useState(false)

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    
    const autoplay = emblaApi.plugins().autoPlay as any
    if (autoplay && typeof autoplay.play === 'function') {
      autoplay.play()
    }

    const onSelect = () => {
      const selectedIndex = emblaApi.selectedScrollSnap()
      
      if (selectedIndex >= products.length * 2) {
        emblaApi.scrollTo(products.length, false)
      } else if (selectedIndex < products.length) {
        emblaApi.scrollTo(selectedIndex + products.length, false)
      }
    }
    emblaApi.on("select", onSelect)
    
    emblaApi.scrollTo(products.length, false)

    return () => {
      emblaApi.off("select", onSelect)
    }
  }, [emblaApi, products.length])

  return (
    <div className="relative group">
      <button
        onClick={scrollPrev}
        className={cn(
          "absolute left-4 top-1/2 -translate-y-1/2 z-20",
          "w-14 h-14 rounded-full shadow-xl border border-white/30",
          "flex items-center justify-center text-slate-600 hover:text-white",
          "transform hover:scale-110 transition-all duration-300 ease-out",
          "opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0",
          "hover:bg-gradient-to-r hover:from-indigo-600 hover:to-purple-600",
          "hover:shadow-2xl ring-1 ring-slate-200/50 hover:ring-white/50",
        )}
        aria-label="Previous products"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={scrollNext}
        className={cn(
          "absolute right-4 top-1/2 -translate-y-1/2 z-20",
          "w-14 h-14 rounded-full bg-white/95 backdrop-blur-md shadow-xl border border-white/30",
          "flex items-center justify-center text-slate-600 hover:text-white",
          "transform hover:scale-110 transition-all duration-300 ease-out",
          "opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0",
          "hover:bg-gradient-to-r hover:from-indigo-600 hover:to-purple-600",
          "hover:shadow-2xl ring-1 ring-slate-200/50 hover:ring-white/50",
        )}
        aria-label="Next products"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      <div className="overflow-hidden" ref={emblaRef}>
        <div 
          className="flex gap-6 py-8 px-4"
          style={{ 
            transform: 'translate3d(0, 0, 0)',
            willChange: 'transform'
          }}
        >
          {circularProducts.map((product, index) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              originalId={product.originalId}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function ProductCard({ product, originalId }: { product: ProductType & { originalId?: string }; originalId?: string }) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [isCardHovered, setIsCardHovered] = useState(false)

  return (
    <div 
      className="flex-shrink-0 w-64 group/card h-full"
      onMouseEnter={() => setIsCardHovered(true)}
      onMouseLeave={() => setIsCardHovered(false)}
    >
      <Card
        className={cn(
          "overflow-hidden border-0 bg-white/80 backdrop-blur-lg relative h-full flex flex-col",
          "shadow-lg hover:shadow-2xl transition-all duration-500 ease-out",
          "transform hover:scale-[1.03] hover:-translate-y-3",
          "ring-1 ring-slate-200/60 hover:ring-indigo-300/60",
          "before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/20 before:to-transparent before:pointer-events-none",
        )}
      >
        <CardContent className="p-0 relative flex flex-col h-full">
          <div className="relative w-full h-48 bg-gradient-to-br from-slate-50 to-slate-100 overflow-hidden flex-shrink-0">
            <div
              className={cn(
                "absolute inset-0 bg-gradient-to-br from-slate-100 via-slate-50 to-slate-100 transition-opacity duration-700",
                imageLoaded ? "opacity-0" : "opacity-100",
              )}
            />

            <Image
              src={product.displayImage || "/placeholder.svg?height=320&width=320&query=premium design"}
              alt={product.title}
              width={320}
              height={320}
              className={cn(
                "object-contain w-full h-full transition-all duration-700 ease-out p-6",
                "group-hover/card:scale-110 group-hover/card:rotate-1",
                imageLoaded ? "opacity-100" : "opacity-0",
              )}
              onLoad={() => setImageLoaded(true)}
            />

            <div
              className={cn(
                "absolute inset-0 transition-all duration-500",
                isCardHovered 
                  ? "bg-gradient-to-t from-black/30 via-black/5 to-transparent opacity-100" 
                  : "opacity-0",
              )}
            />
          </div>

          <div className="p-4 space-y-3 bg-gradient-to-b from-white/90 to-white/70 backdrop-blur-sm flex-1 flex flex-col">
            

            <h3 className="font text-base leading-tight text-slate-900 group-hover/card:text-indigo-900 transition-colors duration-300 flex-shrink-0 min-h-[2.5rem]">
              {product.title}
            </h3>

            
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
