"use client"
import { useState } from "react"
import { X, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const products = [
    "Fancy Leather",
    "Grey Leather",
    "Pure Leather",
    "Coaliq",
    "Florenza",
    "Highway",
    "Janah",
    "Jeans",
    "Lavender oud",
    "Maverick",
    "Royal black oud",
  ]

  const filteredProducts = products.filter((product) => product.toLowerCase().includes(searchQuery.toLowerCase()))

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-20">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Search Products</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search for products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
              autoFocus
            />
          </div>

          {searchQuery && (
            <div className="mt-4 max-h-60 overflow-y-auto">
              {filteredProducts.length > 0 ? (
                <div className="space-y-2">
                  {filteredProducts.map((product, index) => (
                    <div key={index} className="p-2 hover:bg-gray-100 rounded cursor-pointer">
                      {product}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">No products found</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
