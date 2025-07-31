"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, ShoppingCart, Menu, X, Phone, Mail } from "lucide-react"
import { useCart } from "./cart-context"
import CartSidebar from "./cart-sidebar"
import SearchModal from "./search-modal"

export default function Header() {
  const { cartItems } = useCart()
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [websiteSettings, setWebsiteSettings] = useState({
    siteName: "THE CENTURY SCENTS",
    logo: "",
    contactInfo: {
      phone1: "03300062483",
      phone2: "03335408761",
      email: "info@thecenturyscents.com",
    },
    colors: {
      headerBg: "#ffffff",
      headerText: "#374151",
      topBarBg: "#b45309",
    },
  })

  useEffect(() => {
    const savedSettings = localStorage.getItem("websiteSettings")
    if (savedSettings) {
      const settings = JSON.parse(savedSettings)
      setWebsiteSettings((prev) => ({ ...prev, ...settings }))
    }

    const handleStorageChange = () => {
      const savedSettings = localStorage.getItem("websiteSettings")
      if (savedSettings) {
        const settings = JSON.parse(savedSettings)
        setWebsiteSettings((prev) => ({ ...prev, ...settings }))
      }
    }

    window.addEventListener("storage", handleStorageChange)
    window.addEventListener("websiteSettingsUpdated", handleStorageChange)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
      window.removeEventListener("websiteSettingsUpdated", handleStorageChange)
    }
  }, [])

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <>
      {/* Top Bar */}
      <div className="text-white text-sm py-2" style={{ backgroundColor: websiteSettings.colors.topBarBg }}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Phone className="w-3 h-3" />
                <span>{websiteSettings.contactInfo.phone1}</span>
              </div>
              <div className="hidden md:flex items-center space-x-1">
                <Mail className="w-3 h-3" />
                <span>{websiteSettings.contactInfo.email}</span>
              </div>
            </div>
            <div className="text-xs">
              <span>Free Shipping on Orders Over Rs 2000</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="shadow-sm sticky top-0 z-40" style={{ backgroundColor: websiteSettings.colors.headerBg }}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              {websiteSettings.logo ? (
                <img
                  src={websiteSettings.logo || "/placeholder.svg"}
                  alt={websiteSettings.siteName}
                  className="h-10 w-auto"
                  onError={(e) => {
                    e.target.style.display = "none"
                    e.target.nextSibling.style.display = "block"
                  }}
                />
              ) : null}
              <div
                className="text-2xl font-bold tracking-wider"
                style={{
                  color: websiteSettings.colors.headerText,
                  display: websiteSettings.logo ? "none" : "block",
                }}
              >
                {websiteSettings.siteName}
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link
                href="/"
                className="hover:text-amber-600 transition-colors font-medium"
                style={{ color: websiteSettings.colors.headerText }}
              >
                HOME
              </Link>
              <Link
                href="/about"
                className="hover:text-amber-600 transition-colors font-medium"
                style={{ color: websiteSettings.colors.headerText }}
              >
                ABOUT
              </Link>
              <Link
                href="/shop"
                className="hover:text-amber-600 transition-colors font-medium"
                style={{ color: websiteSettings.colors.headerText }}
              >
                SHOP
              </Link>
              <Link
                href="/contact"
                className="hover:text-amber-600 transition-colors font-medium"
                style={{ color: websiteSettings.colors.headerText }}
              >
                CONTACT
              </Link>
            </nav>

            {/* Header Actions */}
            <div className="flex items-center space-x-4">
              {/* Search */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsSearchOpen(true)}
                className="hidden md:flex"
                style={{ color: websiteSettings.colors.headerText }}
              >
                <Search className="w-5 h-5" />
              </Button>

              {/* Cart */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsCartOpen(true)}
                className="relative"
                style={{ color: websiteSettings.colors.headerText }}
              >
                <ShoppingCart className="w-5 h-5" />
                {totalItems > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-amber-600 text-white text-xs min-w-[20px] h-5 flex items-center justify-center rounded-full">
                    {totalItems}
                  </Badge>
                )}
              </Button>

              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden"
                style={{ color: websiteSettings.colors.headerText }}
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t py-4">
              <nav className="flex flex-col space-y-4">
                <Link
                  href="/"
                  className="hover:text-amber-600 transition-colors font-medium"
                  style={{ color: websiteSettings.colors.headerText }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  HOME
                </Link>
                <Link
                  href="/about"
                  className="hover:text-amber-600 transition-colors font-medium"
                  style={{ color: websiteSettings.colors.headerText }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  ABOUT
                </Link>
                <Link
                  href="/shop"
                  className="hover:text-amber-600 transition-colors font-medium"
                  style={{ color: websiteSettings.colors.headerText }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  SHOP
                </Link>
                <Link
                  href="/contact"
                  className="hover:text-amber-600 transition-colors font-medium"
                  style={{ color: websiteSettings.colors.headerText }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  CONTACT
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setIsSearchOpen(true)
                    setIsMobileMenuOpen(false)
                  }}
                  className="justify-start p-0"
                  style={{ color: websiteSettings.colors.headerText }}
                >
                  <Search className="w-5 h-5 mr-2" />
                  SEARCH
                </Button>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Cart Sidebar */}
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      {/* Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  )
}
