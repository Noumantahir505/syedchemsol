"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Facebook, Instagram, Twitter, Phone, Mail, MapPin } from "lucide-react"

export default function Footer() {
  const [websiteSettings, setWebsiteSettings] = useState({
    siteName: "THE CENTURY SCENTS",
    contactInfo: {
      phone1: "03300062483",
      phone2: "03335408761",
      email: "info@thecenturyscents.com",
      whatsapp: "03300062483",
    },
    colors: {
      footerBg: "#f9fafb",
      footerText: "#374151",
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

  return (
    <footer style={{ backgroundColor: websiteSettings.colors.footerBg, color: websiteSettings.colors.footerText }}>
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">{websiteSettings.siteName}</h3>
            <p className="text-sm opacity-80">
              Experience the finest collection of premium fragrances and chemical solutions. Quality and authenticity
              guaranteed.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="sm" className="p-2">
                <Facebook className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2">
                <Instagram className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2">
                <Twitter className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold">Quick Links</h4>
            <div className="space-y-2">
              <Link href="/" className="block text-sm opacity-80 hover:opacity-100 transition-opacity">
                Home
              </Link>
              <Link href="/about" className="block text-sm opacity-80 hover:opacity-100 transition-opacity">
                About Us
              </Link>
              <Link href="/shop" className="block text-sm opacity-80 hover:opacity-100 transition-opacity">
                Shop
              </Link>
              <Link href="/contact" className="block text-sm opacity-80 hover:opacity-100 transition-opacity">
                Contact
              </Link>
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h4 className="font-semibold">Categories</h4>
            <div className="space-y-2">
              <Link href="/shop" className="block text-sm opacity-80 hover:opacity-100 transition-opacity">
                Henyle Solutions
              </Link>
              <Link href="/shop" className="block text-sm opacity-80 hover:opacity-100 transition-opacity">
                Benzyl Compounds
              </Link>
              <Link href="/shop" className="block text-sm opacity-80 hover:opacity-100 transition-opacity">
                Aldehyde Series
              </Link>
              <Link href="/shop" className="block text-sm opacity-80 hover:opacity-100 transition-opacity">
                Essential Oils
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-semibold">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-sm">
                <Phone className="w-4 h-4" />
                <span>{websiteSettings.contactInfo.phone1}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Phone className="w-4 h-4" />
                <span>{websiteSettings.contactInfo.phone2}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Mail className="w-4 h-4" />
                <span>{websiteSettings.contactInfo.email}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <MapPin className="w-4 h-4" />
                <span>Pakistan</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <div className="border-t border-gray-200">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h4 className="font-semibold mb-4">Stay Updated</h4>
            <p className="text-sm opacity-80 mb-4">Subscribe to get updates on new products and offers</p>
            <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <Input placeholder="Enter your email" className="flex-1" />
              <Button className="bg-amber-600 hover:bg-amber-700 text-white">Subscribe</Button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm opacity-80">
            <p>&copy; 2024 {websiteSettings.siteName}. All rights reserved.</p>
            <div className="flex space-x-4 mt-2 md:mt-0">
              <Link href="#" className="hover:opacity-100 transition-opacity">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:opacity-100 transition-opacity">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
