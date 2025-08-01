"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, ShoppingCart, Truck, Shield, Headphones, RotateCcw } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { useCart } from "@/components/cart-context"
import { loadData } from "@/lib/google-drive"

export default function HomePage() {
  const { addToCart } = useCart()
  const [websiteSettings, setWebsiteSettings] = useState({
    siteName: "THE CENTURY SCENTS",
    heroImage: "/hero-perfumes.png",
    heroTitle: "DISCOVER THE ESSENCE OF LUXURY",
    heroSubtitle: "Experience our exclusive collection of premium chemical solutions and fragrances",
    colors: {
      background: "#ffffff",
      heroText: "#ffffff",
    },
  })

  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Henyle Acetate Premium",
      price: 2800,
      originalPrice: 3500,
      image: "/placeholder.svg?height=300&width=200&text=Henyle+Acetate",
      description: "High-grade henyle acetate for premium fragrance formulations",
      rating: 4.8,
      reviews: 124,
      badge: "PREMIUM",
      quantity: 15,
    },
    {
      id: 2,
      name: "Benzyl Benzoate Pure",
      price: 2200,
      originalPrice: 2750,
      image: "/placeholder.svg?height=300&width=200&text=Benzyl+Benzoate",
      description: "Pure benzyl benzoate compound for chemical synthesis",
      rating: 4.7,
      reviews: 89,
      badge: "PURE",
      quantity: 8,
    },
    {
      id: 3,
      name: "Aldehyde C-12 MNA",
      price: 3200,
      originalPrice: 4000,
      image: "/placeholder.svg?height=300&width=200&text=Aldehyde+C12",
      description: "Aldehyde C-12 MNA for sophisticated fragrance notes",
      rating: 4.9,
      reviews: 156,
      badge: "TOP GRADE",
      quantity: 12,
    },
    {
      id: 4,
      name: "Essential Oil Base",
      price: 1800,
      originalPrice: 2250,
      image: "/placeholder.svg?height=300&width=200&text=Essential+Oil",
      description: "Premium essential oil base for natural fragrances",
      rating: 4.6,
      reviews: 67,
      badge: "NATURAL",
      quantity: 20,
    },
    {
      id: 5,
      name: "Aromatic Compound Mix",
      price: 2500,
      originalPrice: 3125,
      image: "/placeholder.svg?height=300&width=200&text=Aromatic+Mix",
      description: "Complex aromatic compound mixture for advanced formulations",
      rating: 4.5,
      reviews: 78,
      badge: "COMPLEX",
      quantity: 10,
    },
    {
      id: 6,
      name: "Synthetic Musk Base",
      price: 3500,
      originalPrice: 4375,
      image: "/placeholder.svg?height=300&width=200&text=Synthetic+Musk",
      description: "High-quality synthetic musk for long-lasting fragrances",
      rating: 4.9,
      reviews: 203,
      badge: "EXCLUSIVE",
      quantity: 6,
    },
  ])

  useEffect(() => {
    // Load data from Google Drive or localStorage
    const loadDataFromStorage = async () => {
      try {
        // Load website settings
        const savedSettings = await loadData("websiteSettings")
        if (savedSettings) {
          setWebsiteSettings((prev) => ({ ...prev, ...savedSettings }))
        }

        // Load products from admin panel
        const savedProducts = await loadData("adminProducts")
        if (savedProducts && savedProducts.length > 0) {
          setProducts(savedProducts)
        }
      } catch (error) {
        console.error("Failed to load data:", error)
        // Fallback to localStorage
        const localSettings = localStorage.getItem("websiteSettings")
        if (localSettings) {
          const settings = JSON.parse(localSettings)
          setWebsiteSettings((prev) => ({ ...prev, ...settings }))
        }

        const localProducts = localStorage.getItem("adminProducts")
        if (localProducts) {
          const adminProducts = JSON.parse(localProducts)
          setProducts(adminProducts)
        }
      }
    }

    loadDataFromStorage()

    // Listen for changes
    const handleStorageChange = () => {
      loadDataFromStorage()
    }

    window.addEventListener("storage", handleStorageChange)
    window.addEventListener("websiteSettingsUpdated", handleStorageChange)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
      window.removeEventListener("websiteSettingsUpdated", handleStorageChange)
    }
  }, [])

  const handleAddToCart = (product) => {
    if (product.quantity > 0) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
      })
    }
  }

  return (
    <div style={{ backgroundColor: websiteSettings.colors.background }}>
      <Header />

      {/* Hero Section */}
      <section
        className="relative h-[600px] flex items-center justify-center text-center bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${websiteSettings.heroImage})`,
          color: websiteSettings.colors.heroText,
        }}
      >
        <div className="container mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-wider">{websiteSettings.heroTitle}</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">{websiteSettings.heroSubtitle}</p>
          <Link href="/shop">
            <Button size="lg" className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 text-lg">
              SHOP NOW
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">Free Shipping</h3>
              <p className="text-gray-600">On orders over Rs 2000</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">Authentic Products</h3>
              <p className="text-gray-600">100% genuine chemical solutions</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Headphones className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">24/7 Support</h3>
              <p className="text-gray-600">Technical support available</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <RotateCcw className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">Quality Guarantee</h3>
              <p className="text-gray-600">Premium chemical standards</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">FEATURED CHEMICAL SOLUTIONS</h2>
            <p className="text-gray-600 text-lg">Discover our most popular chemical compounds and solutions</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.slice(0, 6).map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow group"
              >
                <div className="relative">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {product.badge && (
                    <Badge className="absolute top-3 left-3 bg-amber-600 text-white">{product.badge}</Badge>
                  )}
                  {product.originalPrice && (
                    <Badge className="absolute top-3 right-3 bg-red-500 text-white">
                      {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                    </Badge>
                  )}
                  {product.quantity === 0 && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <Badge variant="destructive" className="text-lg px-4 py-2">
                        OUT OF STOCK
                      </Badge>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-xl mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-3">{product.description}</p>

                  <div className="flex items-center mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 ml-2">
                      {product.rating} ({product.reviews} reviews)
                    </span>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-amber-600">Rs {product.price.toLocaleString()}</span>
                      {product.originalPrice && (
                        <span className="text-lg text-gray-500 line-through">
                          Rs {product.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>

                  <Button
                    onClick={() => handleAddToCart(product)}
                    disabled={product.quantity === 0}
                    className="w-full bg-amber-600 hover:bg-amber-700 text-white disabled:bg-gray-400"
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    {product.quantity === 0 ? "OUT OF STOCK" : "ADD TO CART"}
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/shop">
              <Button
                size="lg"
                variant="outline"
                className="border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white bg-transparent"
              >
                VIEW ALL PRODUCTS
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-amber-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">STAY UPDATED</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter and be the first to know about new chemical solutions, exclusive offers, and
            technical updates.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            <Button className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3">SUBSCRIBE</Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
