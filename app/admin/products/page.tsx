"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Plus, Edit, Trash2, Upload, Expand, ArrowLeftIcon, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { HierarchicalSectionSelector } from "@/components/admin/hierarchical-section-selector";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface ProductSection {
  id: string;
  name: string;
  slug: string;
}

interface Product {
  id: string;
  title: string;
  description: string;
  displayImage: string;
  sections: ProductSection[];
}

const ProductSkeleton = () => (
  <Card className="flex flex-col h-full">
    <CardContent className="p-4 flex flex-col flex-grow">
      <div className="relative aspect-square mb-4 group overflow-hidden rounded-lg bg-gray-100">
        <Skeleton className="w-full h-full" />
      </div>
      <div className="flex-grow">
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-2/3 mb-2" />
        <div className="mb-2">
          <Skeleton className="h-3 w-16 mb-1" />
          <div className="flex flex-wrap gap-1">
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-5 w-16" />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between mb-4">
        <Skeleton className="h-5 w-1/4" />
      </div>
      <div className="flex space-x-2 mt-auto">
        <Skeleton className="h-9 w-1/2" />
        <Skeleton className="h-9 w-1/4" />
      </div>
    </CardContent>
  </Card>
);

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    sectionIds: [] as string[],
    displayImage: "",
  });
  const [uploading, setUploading] = useState(false);
  const [expandedImage, setExpandedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [useUrl, setUseUrl] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      await fetchProducts();
      setLoading(false);
    };
    fetchData();
  }, []);

  const fetchProducts = async () => {
    try {
      console.log("Fetching products...");
      const response = await fetch("/api/products");
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log("Fetched products:", data);
      
      // Ensure data is an array
      if (Array.isArray(data)) {
        setProducts(data);
      } else if (data && typeof data === 'object' && Array.isArray(data.products)) {
        // In case API returns { products: [...] }
        setProducts(data.products);
      } else {
        console.warn("Unexpected data format:", data);
        setProducts([]);
      }
      
      setError(null);
    } catch (error: any) {
      console.error("Error fetching products:", error);
      setError(`Failed to load products: ${error.message}`);
      toast.error("Failed to load products.");
    }
  };

  const handleFileUpload = async (file: File) => {
    if (!file) {
      toast.error("No file selected");
      return;
    }

    setUploading(true);
    const uploadFormData = new FormData();
    uploadFormData.append("file", file);
    uploadFormData.append("upload_preset", "kwf4nlm7");

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: uploadFormData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to upload image to Cloudinary");
      }

      const data = await response.json();
      setFormData((prev) => ({ ...prev, displayImage: data.secure_url }));
      toast.success("Display image uploaded successfully");
    } catch (error: any) {
      console.error("Upload error:", error);
      toast.error("Failed to upload display image");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form data
    if (formData.sectionIds.length === 0) {
      toast.error("Please select at least one section");
      return;
    }
    if (!formData.title.trim()) {
      toast.error("Please enter a product title");
      return;
    }
    if (!formData.description.trim()) {
      toast.error("Please enter a product description");
      return;
    }
    if (!formData.displayImage) {
      toast.error("Please upload or provide a display image URL");
      return;
    }

    try {
      const payload = {
        title: formData.title,
        description: formData.description,
        sectionIds: formData.sectionIds,
        displayImage: formData.displayImage,
      };

      const url = editingProduct
        ? `/api/products/${editingProduct.id}`
        : "/api/products";
      const method = editingProduct ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        toast.success(editingProduct ? "Product updated" : "Product created");
        setIsModalOpen(false);
        resetForm();
        await fetchProducts();
      } else {
        const errorData = await response.json();
        console.error("API Error:", errorData);
        toast.error(
          "Failed to save product: " + (errorData.message || "Unknown error")
        );
      }
    } catch (error: any) {
      console.error("Submit error:", error);
      toast.error("Something went wrong");
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      title: product.title,
      description: product.description,
      sectionIds: product.sections?.map((section) => section.id) || [],
      displayImage: product.displayImage,
    });
    setUseUrl(product.displayImage.startsWith('http') || product.displayImage.startsWith('/'));
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      const response = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast.success("Product deleted");
        await fetchProducts();
      } else {
        toast.error("Failed to delete product");
      }
    } catch (error: any) {
      toast.error("Something went wrong");
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      sectionIds: [],
      displayImage: "",
    });
    setEditingProduct(null);
    setUseUrl(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div className="flex gap-3">
            <Button variant="outline" asChild className="flex">
              <Link href="/admin">
                <ArrowLeftIcon />
                Panel
              </Link>
            </Button>
            <h1 className="text-3xl font-bold">Product Management</h1>
          </div>
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm}>
                <Plus className="h-4 w-4 mr-2" />
                Add Product
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingProduct ? "Edit Product" : "Add New Product"}
                </DialogTitle>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    required
                  />
                </div>

                <div>
                  <Label>Sections</Label>
                  <HierarchicalSectionSelector
                    selectedSectionIds={formData.sectionIds}
                    onSelectionChange={(sectionIds) =>
                      setFormData({ ...formData, sectionIds })
                    }
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label>Display Image</Label>
                    <div className="flex items-center space-x-2">
                      <Label htmlFor="image-toggle">Use URL</Label>
                      <Switch
                        id="image-toggle"
                        checked={useUrl}
                        onCheckedChange={(checked) => {
                          setUseUrl(checked);
                          setFormData({ ...formData, displayImage: "" });
                        }}
                      />
                    </div>
                  </div>

                  {useUrl ? (
                    <Input
                      type="url"
                      placeholder="Enter image URL"
                      value={formData.displayImage}
                      onChange={(e) =>
                        setFormData({ ...formData, displayImage: e.target.value })
                      }
                      required
                    />
                  ) : (
                    <>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleFileUpload(file);
                        }}
                        className="mb-2"
                        disabled={uploading}
                      />
                      {uploading && <p className="text-sm text-gray-500">Uploading...</p>}
                    </>
                  )}
                  {formData.displayImage && (
                    <div className="relative w-32 h-32 mt-2">
                      <Image
                        src={formData.displayImage}
                        alt="Display preview"
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                  )}
                </div>

                <Button type="submit" disabled={uploading} className="w-full">
                  {uploading
                    ? "Uploading..."
                    : editingProduct
                    ? "Update Product"
                    : "Create Product"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Error Alert */}
        {error && (
          <Alert className="mb-6 border-red-200 bg-red-50">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-700">
              {error}
            </AlertDescription>
          </Alert>
        )}


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            Array.from({ length: 6 }).map((_, index) => (
              <ProductSkeleton key={index} />
            ))
          ) : error ? (
            <div className="text-center py-12 col-span-full">
              <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <p className="text-red-600 mb-4">Failed to load products</p>
              <Button onClick={fetchProducts} variant="outline">
                Try Again
              </Button>
            </div>
          ) : products.length > 0 ? (
            products.map((product) => (
              <Card key={product.id} className="flex flex-col h-full">
                <CardContent className="p-4 flex flex-col flex-grow">
                  <div className="relative aspect-square mb-4 group overflow-hidden rounded-lg bg-gray-100">
                    <Image
                      src={product.displayImage}
                      alt={product.title}
                      fill
                      className="object-contain p-2"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      onError={(e) => {
                        console.error("Image failed to load:", product.displayImage);
                        // You could set a fallback image here
                      }}
                    />
                    <button
                      onClick={() => setExpandedImage(product.displayImage)}
                      className="absolute bottom-2 right-2 p-2 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    >
                      <Expand className="h-4 w-4 text-white" />
                    </button>
                  </div>

                  <div className="flex-grow">
                    <h3 className="font-semibold mb-2 line-clamp-2">
                      {product.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="mb-2">
                      <p className="text-xs text-gray-500 mb-1">Sections:</p>
                      <div className="flex flex-wrap gap-1">
                        {product.sections && product.sections.length > 0 ? (
                          product.sections.slice(0, 3).map((section) => (
                            <Badge
                              key={section.id}
                              variant="outline"
                              className="text-xs"
                            >
                              {section.name}
                            </Badge>
                          ))
                        ) : (
                          <Badge variant="outline" className="text-xs">
                            No sections
                          </Badge>
                        )}
                        {product.sections && product.sections.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{product.sections.length - 3}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-2 mt-auto">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(product)}
                      className="flex-1"
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(product.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center py-12 col-span-full">
              <p className="text-gray-500 mb-4">
                No products found. Please add a new product.
              </p>
              <Button onClick={() => setIsModalOpen(true)} variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Product
              </Button>
            </div>
          )}
        </div>

        <Dialog
          open={!!expandedImage}
          onOpenChange={(open) => !open && setExpandedImage(null)}
        >
          <DialogContent className="max-w-[90vw] max-h-[90vh] p-0 bg-transparent border-none container">
            {expandedImage && (
              <div className="relative w-full h-full">
                <Image
                  src={expandedImage}
                  alt="Expanded product view"
                  width={100}
                  height={100}
                  className="object-contain w-full h-full"
                />
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}