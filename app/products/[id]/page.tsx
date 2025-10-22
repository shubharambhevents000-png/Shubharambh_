import { notFound } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"
import Image from "next/image"
import { getProductById } from "@/lib/actions"

interface ProductDetailProps {
  params: {
    id: string
  }
}

// Server-side function to fetch product data
async function getProduct(id: string): Promise<any> {
  try {
    return await getProductById(id)
  } catch (error) {
    console.error("Error fetching product:", error)
    return null
  }
}

export default async function ProductDetail({ params }: ProductDetailProps) {
  const product = await getProduct(params.id)

  if (!product) {
    notFound()
  }

  return (
    <div className="min-h-screen">
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center gap-8 max-w-2xl mx-auto">
          {/* Product Image - Centered */}
          <div className="w-full">
            <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100 border">
              <Image
                src={product.displayImage || "/placeholder.svg"}
                alt={product.title}
                fill
                className="object-contain p-4"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />

              {product.isFeatured && (
                <Badge className="absolute top-4 left-4 bg-yellow-500">
                  <Star className="h-3 w-3 mr-1" />
                  Featured
                </Badge>
              )}
            </div>
          </div>

          {/* Product Details - Centered */}
          <div className="space-y-6 w-full text-center">
            <div>
              <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
              <p className="text-gray-600 text-lg leading-relaxed">{product.description}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
