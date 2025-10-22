"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Skeleton } from "@/components/ui/skeleton"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"
import { AnimatedTabs } from "@/components/ui/animated-tabs"

interface Product {
  id: string
  displayImage: string
  title: string
  sections: {
    id: string
    name: string
    slug: string
  }[]
}

interface Section {
  id: string
  name: string
  slug: string
}

const ProductsPage = () => {
  const [allProducts, setAllProducts] = useState<Product[]>([])
  const [sections, setSections] = useState<Section[]>([])
  const [selectedSection, setSelectedSection] = useState<string>("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)

        // Fetch sections
        const sectionsRes = await fetch("/api/sections?type=flat&activeOnly=true")
        if (!sectionsRes.ok) throw new Error("Failed to fetch sections")
        const sectionsData = await sectionsRes.json()

        // Filter only top-level sections (level 0)
        const topLevelSections = sectionsData.filter((section: any) => section.level === 0)
        setSections(topLevelSections)

        // Fetch all products (no section filter)
        const productsRes = await fetch("/api/products?limit=1000")
        if (!productsRes.ok) throw new Error("Failed to fetch products")
        const productsData = await productsRes.json()
        setAllProducts(productsData.products)

        // Set default selected section to the first one
        if (topLevelSections.length > 0) {
          setSelectedSection(topLevelSections[0].id)
        }
      } catch (err) {
        console.error(err)
        setError("Failed to fetch data. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const getFilteredProducts = (sectionId: string) => {
    return allProducts.filter((product) => product.sections?.some((section) => section.id === sectionId))
  }

  const renderProducts = (products: Product[], columns = 3) => {
    if (products.length === 0) {
      return <div className="py-12 text-center text-muted-foreground">No products found in this category.</div>
    }

    const gridColsClass =
      columns === 2
        ? "sm:grid-cols-2 lg:grid-cols-2"
        : columns === 4
          ? "sm:grid-cols-3 lg:grid-cols-4"
          : "sm:grid-cols-3 lg:grid-cols-3"

    return (
      <div className={cn("grid grid-cols-2 gap-4", gridColsClass)}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    )
  }

  const handleTabChange = (sectionName: string) => {
    const section = sections.find((s) => s.name === sectionName)
    if (section) {
      setSelectedSection(section.id)
    }
  }

  const renderSkeleton = () => (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <Card key={i} className="overflow-hidden">
          <Skeleton className="aspect-[4/3] w-full" />
        </Card>
      ))}
    </div>
  )

  function ProductCard({ product }: { product: Product }) {
    return (
      <Link href={`/products/${product.id}`} className="group focus:outline-none">
        <Card className="overflow-hidden transition-shadow group-hover:shadow-sm">
          <div className="relative">
            <Image
              src={product.displayImage || "/placeholder.svg"}
              alt={product.title}
              width={600}
              height={450}
              className="aspect-[4/3] w-full h-auto object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-black/40 p-2 opacity-0 transition-opacity group-hover:opacity-100">
              <p className="truncate text-sm text-white">{product.title}</p>
            </div>
          </div>
        </Card>
        <span className="sr-only">{`View ${product.title}`}</span>
      </Link>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="text-center mb-8 px-4">
        <h1 className="text-balance text-3xl lg:text-5xl font-bold text-foreground mb-3">Our Collection</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Discover our curated selection of premium graphic design templates
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {error ? (
          <div className="text-center text-destructive py-8">{error}</div>
        ) : loading ? (
          renderSkeleton()
        ) : (
          <>
            <div className="flex justify-center mb-8">
              <AnimatedTabs
                tabs={sections.map((section) => ({ label: section.name }))}
                activeTab={sections.find((s) => s.id === selectedSection)?.name || ""}
                onTabChange={handleTabChange}
              />
            </div>

            {renderProducts(getFilteredProducts(selectedSection))}
          </>
        )}
      </div>
    </div>
  )
}

export default ProductsPage
