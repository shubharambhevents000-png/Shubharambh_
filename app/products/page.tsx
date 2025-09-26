"use client"

import { useState, useEffect } from "react"
import InfiniteScroll from "react-infinite-scroll-component"
import Image from "next/image"
import { Skeleton } from "@/components/ui/skeleton"

interface Product {
  id: string
  displayImage: string
  title: string
}

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchProducts = async (currentPage: number, append = false) => {
    try {
      setError(null)
      const res = await fetch(`/api/products?page=${currentPage}&limit=12`)
      if (!res.ok) throw new Error("Failed to fetch")
      const data = await res.json()

      if (append) {
        setProducts((prev) => [...prev, ...data.products])
      } else {
        setProducts(data.products)
      }

      setHasMore(currentPage < data.totalPages)
      setPage(currentPage)
    } catch (err) {
      console.error(err)
      setError("Failed to fetch products. Please try again later.")
    }
  }

  useEffect(() => {
    fetchProducts(1)
  }, [])

  const renderSkeleton = () => (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {[...Array(6)].map((_, i) => (
        <Skeleton key={i} className="h-48 w-full rounded-lg" />
      ))}
    </div>
  )

  const renderProducts = (products: Product[], columns = 3) => {
    const colGroups = Array.from({ length: columns }, () => [] as Product[])
    products.forEach((product, i) => {
      colGroups[i % columns].push(product)
    })

    return (
      <div className={`grid grid-cols-2 md:grid-cols-${columns} gap-4`}>
        {colGroups.map((col, colIndex) => (
          <div key={colIndex} className="grid gap-4">
            {col.map((product) => (
              <Image
                key={product.id}
                src={product.displayImage}
                alt={product.title}
                width={300}
                height={200}
                className="h-auto max-w-full rounded-lg"
              />
            ))}
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="text-center mb-12">
        <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
          Our Collection
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover our curated selection of premium graphic design templates
        </p>
        <div className="w-32 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-6 rounded-full"/>
      </div>
      <div className="flex justify-center w-full">
        <InfiniteScroll
          next={() => fetchProducts(page + 1, true)}
          hasMore={hasMore}
          loader={renderSkeleton()}
          dataLength={products.length}
          className="p-4 lg:px-32 max-w-7xl"
        >
          {renderProducts(products)}
        </InfiniteScroll>
      </div>
      {error && <p className="text-red-500 text-center mt-4">{error}</p>}
    </div>
  )
}

export default ProductsPage
