"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  LogOut,
  TrendingUp,
  Package,
  ShoppingCart,
  Users,
  DollarSign,
  Settings,
  Edit,
  Plus,
  Trash2,
  Save,
  Palette,
  ImageIcon,
  User,
  MessageSquare,
  Cloud,
  CloudOff,
} from "lucide-react"
import { initializeGoogleDrive, authenticateGoogleDrive, saveData, loadData } from "@/lib/google-drive"

export default function AdminDashboard() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("dashboard")
  const [isGoogleDriveConnected, setIsGoogleDriveConnected] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const [stats, setStats] = useState({
    totalOrders: 45,
    pendingOrders: 12,
    completedOrders: 33,
    totalRevenue: 125000,
    totalProducts: 16,
    lowStockProducts: 3,
  })

  // Website Settings State
  const [websiteSettings, setWebsiteSettings] = useState({
    siteName: "THE CENTURY SCENTS",
    logo: "",
    heroImage: "/hero-perfumes.png",
    heroTitle: "DISCOVER THE ESSENCE OF LUXURY",
    heroSubtitle: "Experience our exclusive collection of premium chemical solutions and fragrances",
    contactInfo: {
      phone1: "03300062483",
      phone2: "03335408761",
      email: "info@thecenturyscents.com",
      whatsapp: "03300062483",
      adminEmail: "noumantahir505@gmail.com",
    },
    colors: {
      background: "#ffffff",
      headerBg: "#ffffff",
      headerText: "#374151",
      topBarBg: "#b45309",
      footerBg: "#f9fafb",
      footerText: "#374151",
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
      quantity: 15,
      category: "Henyle Solutions",
      rating: 4.8,
      reviews: 124,
      badge: "PREMIUM",
    },
    {
      id: 2,
      name: "Benzyl Benzoate Pure",
      price: 2200,
      originalPrice: 2750,
      image: "/placeholder.svg?height=300&width=200&text=Benzyl+Benzoate",
      description: "Pure benzyl benzoate compound for chemical synthesis",
      quantity: 8,
      category: "Benzyl Compounds",
      rating: 4.7,
      reviews: 89,
      badge: "PURE",
    },
    {
      id: 3,
      name: "Aldehyde C-12 MNA",
      price: 3200,
      originalPrice: 4000,
      image: "/placeholder.svg?height=300&width=200&text=Aldehyde+C12",
      description: "Aldehyde C-12 MNA for sophisticated fragrance notes",
      quantity: 12,
      category: "Aldehyde Series",
      rating: 4.9,
      reviews: 156,
      badge: "TOP GRADE",
    },
    {
      id: 4,
      name: "Essential Oil Base",
      price: 1800,
      originalPrice: 2250,
      image: "/placeholder.svg?height=300&width=200&text=Essential+Oil",
      description: "Premium essential oil base for natural fragrances",
      quantity: 20,
      category: "Essential Oils",
      rating: 4.6,
      reviews: 67,
      badge: "NATURAL",
    },
  ])

  const [editingProduct, setEditingProduct] = useState(null)
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    originalPrice: "",
    image: "",
    description: "",
    quantity: "",
    category: "Henyle Solutions",
    badge: "",
  })

  // Chemical categories
  const categories = [
    "Henyle Solutions",
    "Benzyl Compounds",
    "Aldehyde Series",
    "Essential Oils",
    "Aromatic Compounds",
    "Synthetic Fragrances",
  ]

  useEffect(() => {
    if (localStorage.getItem("adminLoggedIn") !== "true") {
      router.push("/admin")
    }

    // Initialize Google Drive
    initializeGoogleDrive().then((success) => {
      if (success) {
        console.log("Google Drive initialized successfully")
      }
    })

    // Load data from storage
    loadDataFromStorage()
  }, [router])

  const loadDataFromStorage = async () => {
    setIsLoading(true)

    try {
      // Load website settings
      const savedSettings = await loadData("websiteSettings")
      if (savedSettings) {
        setWebsiteSettings(savedSettings)
      }

      // Load products
      const savedProducts = await loadData("adminProducts")
      if (savedProducts) {
        setProducts(savedProducts)
      }
    } catch (error) {
      console.error("Failed to load data:", error)
    }

    setIsLoading(false)
  }

  const connectGoogleDrive = async () => {
    setIsLoading(true)
    const success = await authenticateGoogleDrive()
    setIsGoogleDriveConnected(success)
    setIsLoading(false)

    if (success) {
      alert("✅ Google Drive connected successfully!")
      // Sync existing data to Google Drive
      await saveData("websiteSettings", websiteSettings)
      await saveData("adminProducts", products)
    } else {
      alert("❌ Failed to connect Google Drive")
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn")
    localStorage.removeItem("adminLoginTime")
    router.push("/admin")
  }

  // Save website settings
  const saveWebsiteSettings = async () => {
    setIsLoading(true)
    const success = await saveData("websiteSettings", websiteSettings)

    if (success) {
      // Trigger custom event to update other components
      window.dispatchEvent(new Event("websiteSettingsUpdated"))
      alert("✅ Website settings saved successfully! Changes will be visible on all pages.")
    } else {
      alert("❌ Failed to save website settings")
    }
    setIsLoading(false)
  }

  // Save products
  const saveProducts = async () => {
    const success = await saveData("adminProducts", products)
    if (success) {
      window.dispatchEvent(new Event("websiteSettingsUpdated"))
    }
    return success
  }

  const handleAddProduct = async () => {
    if (newProduct.name && newProduct.price && newProduct.quantity) {
      const product = {
        id: Date.now(),
        name: newProduct.name,
        price: Number.parseInt(newProduct.price),
        originalPrice: newProduct.originalPrice ? Number.parseInt(newProduct.originalPrice) : null,
        image: newProduct.image || `/placeholder.svg?height=300&width=200&text=${newProduct.name.replace(" ", "+")}`,
        description: newProduct.description,
        quantity: Number.parseInt(newProduct.quantity),
        category: newProduct.category,
        badge: newProduct.badge,
        rating: 4.5,
        reviews: 0,
      }

      const updatedProducts = [...products, product]
      setProducts(updatedProducts)

      const success = await saveData("adminProducts", updatedProducts)
      if (success) {
        window.dispatchEvent(new Event("websiteSettingsUpdated"))
        setNewProduct({
          name: "",
          price: "",
          originalPrice: "",
          image: "",
          description: "",
          quantity: "",
          category: "Henyle Solutions",
          badge: "",
        })
        alert("✅ Product added successfully!")
      } else {
        alert("❌ Failed to save product")
      }
    } else {
      alert("❌ Please fill in all required fields!")
    }
  }

  const handleUpdateProduct = async (id, updatedProduct) => {
    const updatedProducts = products.map((p) => (p.id === id ? { ...p, ...updatedProduct } : p))
    setProducts(updatedProducts)

    const success = await saveData("adminProducts", updatedProducts)
    if (success) {
      window.dispatchEvent(new Event("websiteSettingsUpdated"))
      setEditingProduct(null)
      alert("✅ Product updated successfully!")
    } else {
      alert("❌ Failed to update product")
    }
  }

  const handleDeleteProduct = async (id) => {
    if (confirm("⚠️ Are you sure you want to delete this product?")) {
      const updatedProducts = products.filter((p) => p.id !== id)
      setProducts(updatedProducts)

      const success = await saveData("adminProducts", updatedProducts)
      if (success) {
        window.dispatchEvent(new Event("websiteSettingsUpdated"))
        alert("✅ Product deleted successfully!")
      } else {
        alert("❌ Failed to delete product")
      }
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-600 to-amber-800 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">TC</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
                <p className="text-sm text-gray-600">{websiteSettings.siteName} Management</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {/* Google Drive Status */}
              <div className="flex items-center space-x-2">
                {isGoogleDriveConnected ? (
                  <div className="flex items-center space-x-2 text-green-600">
                    <Cloud className="w-4 h-4" />
                    <span className="text-sm">Drive Connected</span>
                  </div>
                ) : (
                  <Button
                    onClick={connectGoogleDrive}
                    disabled={isLoading}
                    size="sm"
                    variant="outline"
                    className="flex items-center space-x-2 bg-transparent"
                  >
                    <CloudOff className="w-4 h-4" />
                    <span>Connect Drive</span>
                  </Button>
                )}
              </div>
              <Button onClick={handleLogout} variant="outline" className="flex items-center space-x-2 bg-transparent">
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg flex items-center space-x-3">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-amber-600"></div>
            <span>Syncing with Google Drive...</span>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-7 bg-white p-1 rounded-lg shadow-sm">
            <TabsTrigger value="dashboard" className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="website" className="flex items-center space-x-2">
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Website</span>
            </TabsTrigger>
            <TabsTrigger value="colors" className="flex items-center space-x-2">
              <Palette className="w-4 h-4" />
              <span className="hidden sm:inline">Colors</span>
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center space-x-2">
              <ImageIcon className="w-4 h-4" />
              <span className="hidden sm:inline">Profile</span>
            </TabsTrigger>
            <TabsTrigger value="contact" className="flex items-center space-x-2">
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">Contact</span>
            </TabsTrigger>
            <TabsTrigger value="content" className="flex items-center space-x-2">
              <MessageSquare className="w-4 h-4" />
              <span className="hidden sm:inline">Content</span>
            </TabsTrigger>
            <TabsTrigger value="products" className="flex items-center space-x-2">
              <Package className="w-4 h-4" />
              <span className="hidden sm:inline">Products</span>
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            {/* Google Drive Connection Card */}
            <Card className="border-2 border-dashed border-amber-200">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Cloud className="w-5 h-5 text-amber-600" />
                  <span>Cloud Storage Status</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isGoogleDriveConnected ? (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-green-700">Google Drive Connected</span>
                      <Badge className="bg-green-100 text-green-800">Auto-Sync Enabled</Badge>
                    </div>
                    <p className="text-sm text-gray-600">All data is automatically backed up to Google Drive</p>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <span className="text-yellow-700">Using Local Storage</span>
                      <Badge className="bg-yellow-100 text-yellow-800">Limited Backup</Badge>
                    </div>
                    <Button
                      onClick={connectGoogleDrive}
                      disabled={isLoading}
                      className="bg-amber-600 hover:bg-amber-700"
                    >
                      <Cloud className="w-4 h-4 mr-2" />
                      Connect Google Drive
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-100 text-sm">Total Orders</p>
                      <p className="text-3xl font-bold">{stats.totalOrders}</p>
                    </div>
                    <ShoppingCart className="w-10 h-10 text-blue-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-orange-100 text-sm">Pending Orders</p>
                      <p className="text-3xl font-bold">{stats.pendingOrders}</p>
                    </div>
                    <Users className="w-10 h-10 text-orange-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-100 text-sm">Total Products</p>
                      <p className="text-3xl font-bold">{products.length}</p>
                    </div>
                    <Package className="w-10 h-10 text-green-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-100 text-sm">Total Revenue</p>
                      <p className="text-3xl font-bold">Rs {stats.totalRevenue.toLocaleString()}</p>
                    </div>
                    <DollarSign className="w-10 h-10 text-purple-200" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button
                    onClick={() => setActiveTab("website")}
                    className="h-20 flex flex-col items-center justify-center space-y-2"
                  >
                    <Settings className="w-6 h-6" />
                    <span>Website Settings</span>
                  </Button>
                  <Button
                    onClick={() => setActiveTab("colors")}
                    className="h-20 flex flex-col items-center justify-center space-y-2"
                  >
                    <Palette className="w-6 h-6" />
                    <span>Change Colors</span>
                  </Button>
                  <Button
                    onClick={() => setActiveTab("products")}
                    className="h-20 flex flex-col items-center justify-center space-y-2"
                  >
                    <Package className="w-6 h-6" />
                    <span>Manage Products</span>
                  </Button>
                  <Button
                    onClick={() => setActiveTab("profile")}
                    className="h-20 flex flex-col items-center justify-center space-y-2"
                  >
                    <ImageIcon className="w-6 h-6" />
                    <span>Web Profile</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Website Settings Tab */}
          <TabsContent value="website" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="w-5 h-5" />
                  <span>Website Settings</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="siteName">Website Name *</Label>
                    <Input
                      id="siteName"
                      value={websiteSettings.siteName}
                      onChange={(e) => setWebsiteSettings({ ...websiteSettings, siteName: e.target.value })}
                      placeholder="Enter website name"
                    />
                    <p className="text-sm text-gray-500 mt-1">This will appear in header and footer</p>
                  </div>
                  <div>
                    <Label htmlFor="logo">Logo URL</Label>
                    <Input
                      id="logo"
                      value={websiteSettings.logo}
                      onChange={(e) => setWebsiteSettings({ ...websiteSettings, logo: e.target.value })}
                      placeholder="Enter logo URL"
                    />
                    <p className="text-sm text-gray-500 mt-1">Leave empty to use default logo</p>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold mb-4">Hero Section</h3>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="heroTitle">Hero Title</Label>
                      <Input
                        id="heroTitle"
                        value={websiteSettings.heroTitle}
                        onChange={(e) => setWebsiteSettings({ ...websiteSettings, heroTitle: e.target.value })}
                        placeholder="Enter hero title"
                      />
                    </div>
                    <div>
                      <Label htmlFor="heroSubtitle">Hero Subtitle</Label>
                      <Textarea
                        id="heroSubtitle"
                        value={websiteSettings.heroSubtitle}
                        onChange={(e) => setWebsiteSettings({ ...websiteSettings, heroSubtitle: e.target.value })}
                        placeholder="Enter hero subtitle"
                      />
                    </div>
                    <div>
                      <Label htmlFor="heroImage">Hero Background Image URL</Label>
                      <Input
                        id="heroImage"
                        value={websiteSettings.heroImage}
                        onChange={(e) => setWebsiteSettings({ ...websiteSettings, heroImage: e.target.value })}
                        placeholder="Enter hero image URL"
                      />
                    </div>
                  </div>
                </div>

                <Button onClick={saveWebsiteSettings} disabled={isLoading} className="bg-green-600 hover:bg-green-700">
                  <Save className="w-4 h-4 mr-2" />
                  {isLoading ? "Saving..." : "Save Website Settings"}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Colors Tab */}
          <TabsContent value="colors" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Palette className="w-5 h-5" />
                  <span>Website Colors</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold">Header Colors</h3>
                    <div>
                      <Label htmlFor="headerBg">Header Background</Label>
                      <div className="flex items-center space-x-2">
                        <Input
                          id="headerBg"
                          type="color"
                          value={websiteSettings.colors.headerBg}
                          onChange={(e) =>
                            setWebsiteSettings({
                              ...websiteSettings,
                              colors: { ...websiteSettings.colors, headerBg: e.target.value },
                            })
                          }
                          className="w-16 h-10"
                        />
                        <Input
                          value={websiteSettings.colors.headerBg}
                          onChange={(e) =>
                            setWebsiteSettings({
                              ...websiteSettings,
                              colors: { ...websiteSettings.colors, headerBg: e.target.value },
                            })
                          }
                          placeholder="#ffffff"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="headerText">Header Text</Label>
                      <div className="flex items-center space-x-2">
                        <Input
                          id="headerText"
                          type="color"
                          value={websiteSettings.colors.headerText}
                          onChange={(e) =>
                            setWebsiteSettings({
                              ...websiteSettings,
                              colors: { ...websiteSettings.colors, headerText: e.target.value },
                            })
                          }
                          className="w-16 h-10"
                        />
                        <Input
                          value={websiteSettings.colors.headerText}
                          onChange={(e) =>
                            setWebsiteSettings({
                              ...websiteSettings,
                              colors: { ...websiteSettings.colors, headerText: e.target.value },
                            })
                          }
                          placeholder="#374151"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="topBarBg">Top Bar Background</Label>
                      <div className="flex items-center space-x-2">
                        <Input
                          id="topBarBg"
                          type="color"
                          value={websiteSettings.colors.topBarBg}
                          onChange={(e) =>
                            setWebsiteSettings({
                              ...websiteSettings,
                              colors: { ...websiteSettings.colors, topBarBg: e.target.value },
                            })
                          }
                          className="w-16 h-10"
                        />
                        <Input
                          value={websiteSettings.colors.topBarBg}
                          onChange={(e) =>
                            setWebsiteSettings({
                              ...websiteSettings,
                              colors: { ...websiteSettings.colors, topBarBg: e.target.value },
                            })
                          }
                          placeholder="#b45309"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold">Footer Colors</h3>
                    <div>
                      <Label htmlFor="footerBg">Footer Background</Label>
                      <div className="flex items-center space-x-2">
                        <Input
                          id="footerBg"
                          type="color"
                          value={websiteSettings.colors.footerBg}
                          onChange={(e) =>
                            setWebsiteSettings({
                              ...websiteSettings,
                              colors: { ...websiteSettings.colors, footerBg: e.target.value },
                            })
                          }
                          className="w-16 h-10"
                        />
                        <Input
                          value={websiteSettings.colors.footerBg}
                          onChange={(e) =>
                            setWebsiteSettings({
                              ...websiteSettings,
                              colors: { ...websiteSettings.colors, footerBg: e.target.value },
                            })
                          }
                          placeholder="#f9fafb"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="footerText">Footer Text</Label>
                      <div className="flex items-center space-x-2">
                        <Input
                          id="footerText"
                          type="color"
                          value={websiteSettings.colors.footerText}
                          onChange={(e) =>
                            setWebsiteSettings({
                              ...websiteSettings,
                              colors: { ...websiteSettings.colors, footerText: e.target.value },
                            })
                          }
                          className="w-16 h-10"
                        />
                        <Input
                          value={websiteSettings.colors.footerText}
                          onChange={(e) =>
                            setWebsiteSettings({
                              ...websiteSettings,
                              colors: { ...websiteSettings.colors, footerText: e.target.value },
                            })
                          }
                          placeholder="#374151"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="background">Page Background</Label>
                      <div className="flex items-center space-x-2">
                        <Input
                          id="background"
                          type="color"
                          value={websiteSettings.colors.background}
                          onChange={(e) =>
                            setWebsiteSettings({
                              ...websiteSettings,
                              colors: { ...websiteSettings.colors, background: e.target.value },
                            })
                          }
                          className="w-16 h-10"
                        />
                        <Input
                          value={websiteSettings.colors.background}
                          onChange={(e) =>
                            setWebsiteSettings({
                              ...websiteSettings,
                              colors: { ...websiteSettings.colors, background: e.target.value },
                            })
                          }
                          placeholder="#ffffff"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <Button onClick={saveWebsiteSettings} disabled={isLoading} className="bg-green-600 hover:bg-green-700">
                  <Save className="w-4 h-4 mr-2" />
                  {isLoading ? "Saving..." : "Save Colors"}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contact Info Tab */}
          <TabsContent value="contact" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="w-5 h-5" />
                  <span>Contact Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone1">Phone 1</Label>
                    <Input
                      id="phone1"
                      value={websiteSettings.contactInfo.phone1}
                      onChange={(e) =>
                        setWebsiteSettings({
                          ...websiteSettings,
                          contactInfo: { ...websiteSettings.contactInfo, phone1: e.target.value },
                        })
                      }
                      placeholder="Enter phone number"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone2">Phone 2</Label>
                    <Input
                      id="phone2"
                      value={websiteSettings.contactInfo.phone2}
                      onChange={(e) =>
                        setWebsiteSettings({
                          ...websiteSettings,
                          contactInfo: { ...websiteSettings.contactInfo, phone2: e.target.value },
                        })
                      }
                      placeholder="Enter phone number"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Contact Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={websiteSettings.contactInfo.email}
                      onChange={(e) =>
                        setWebsiteSettings({
                          ...websiteSettings,
                          contactInfo: { ...websiteSettings.contactInfo, email: e.target.value },
                        })
                      }
                      placeholder="Enter contact email"
                    />
                  </div>
                  <div>
                    <Label htmlFor="whatsapp">WhatsApp Number</Label>
                    <Input
                      id="whatsapp"
                      value={websiteSettings.contactInfo.whatsapp}
                      onChange={(e) =>
                        setWebsiteSettings({
                          ...websiteSettings,
                          contactInfo: { ...websiteSettings.contactInfo, whatsapp: e.target.value },
                        })
                      }
                      placeholder="Enter WhatsApp number"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="adminEmail">Admin Email (for order notifications) *</Label>
                    <Input
                      id="adminEmail"
                      type="email"
                      value={websiteSettings.contactInfo.adminEmail}
                      onChange={(e) =>
                        setWebsiteSettings({
                          ...websiteSettings,
                          contactInfo: { ...websiteSettings.contactInfo, adminEmail: e.target.value },
                        })
                      }
                      placeholder="Enter admin email for order notifications"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      All order notifications will be sent to this email address
                    </p>
                  </div>
                </div>

                <Button onClick={saveWebsiteSettings} disabled={isLoading} className="bg-green-600 hover:bg-green-700">
                  <Save className="w-4 h-4 mr-2" />
                  {isLoading ? "Saving..." : "Save Contact Info"}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Products Tab */}
          <TabsContent value="products" className="space-y-6">
            {/* Add Product Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Plus className="w-5 h-5" />
                  <span>Add New Chemical Product</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="newName">Product Name *</Label>
                    <Input
                      id="newName"
                      value={newProduct.name}
                      onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                      placeholder="Enter chemical product name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="newPrice">Price (Rs) *</Label>
                    <Input
                      id="newPrice"
                      type="number"
                      value={newProduct.price}
                      onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                      placeholder="Enter price"
                    />
                  </div>
                  <div>
                    <Label htmlFor="newOriginalPrice">Original Price (Rs)</Label>
                    <Input
                      id="newOriginalPrice"
                      type="number"
                      value={newProduct.originalPrice}
                      onChange={(e) => setNewProduct({ ...newProduct, originalPrice: e.target.value })}
                      placeholder="For discount badge"
                    />
                  </div>
                  <div>
                    <Label htmlFor="newQuantity">Quantity *</Label>
                    <Input
                      id="newQuantity"
                      type="number"
                      value={newProduct.quantity}
                      onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })}
                      placeholder="Enter quantity"
                    />
                  </div>
                  <div>
                    <Label htmlFor="newCategory">Chemical Category *</Label>
                    <select
                      id="newCategory"
                      value={newProduct.category}
                      onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500"
                    >
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="newBadge">Badge (Optional)</Label>
                    <Input
                      id="newBadge"
                      value={newProduct.badge}
                      onChange={(e) => setNewProduct({ ...newProduct, badge: e.target.value })}
                      placeholder="e.g., PREMIUM, PURE, TOP GRADE"
                    />
                  </div>
                  <div>
                    <Label htmlFor="newImage">Image URL</Label>
                    <Input
                      id="newImage"
                      value={newProduct.image}
                      onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                      placeholder="Enter image URL"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="newDescription">Description</Label>
                    <Textarea
                      id="newDescription"
                      value={newProduct.description}
                      onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                      placeholder="Enter chemical product description"
                    />
                  </div>
                </div>
                <Button
                  onClick={handleAddProduct}
                  disabled={isLoading}
                  className="mt-4 bg-green-600 hover:bg-green-700"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  {isLoading ? "Adding..." : "Add Chemical Product"}
                </Button>
              </CardContent>
            </Card>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <Card key={product.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <div className="relative mb-3">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-40 object-cover rounded-lg bg-gray-100"
                      />
                      {product.originalPrice && (
                        <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs">
                          {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                        </div>
                      )}
                      {product.badge && (
                        <div className="absolute top-2 right-2 bg-amber-600 text-white px-2 py-1 rounded text-xs">
                          {product.badge}
                        </div>
                      )}
                    </div>
                    <h3 className="font-bold text-lg mb-2">{product.name}</h3>
                    <p className="text-sm text-gray-600 mb-3">{product.description}</p>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="font-bold text-amber-600 text-lg">Rs {product.price.toLocaleString()}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">
                          Rs {product.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center justify-between mb-4">
                      <Badge
                        variant={
                          product.quantity === 0 ? "destructive" : product.quantity <= 5 ? "secondary" : "default"
                        }
                      >
                        {product.quantity === 0
                          ? "Out of Stock"
                          : product.quantity <= 5
                            ? `Low Stock: ${product.quantity}`
                            : `In Stock: ${product.quantity}`}
                      </Badge>
                      <Badge variant="outline">{product.category}</Badge>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => setEditingProduct(product)} className="flex-1">
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDeleteProduct(product.id)}
                        className="flex-1"
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <ImageIcon className="w-5 h-5" />
                  <span>Web Profile Management</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="logoPreview">Current Logo Preview</Label>
                    <div className="mt-1 p-4 border rounded-lg bg-gray-50 min-h-[100px] flex items-center justify-center">
                      {websiteSettings.logo ? (
                        <img
                          src={websiteSettings.logo || "/placeholder.svg"}
                          alt="Current Logo"
                          className="max-h-16 max-w-full"
                          onError={(e) => {
                            e.target.src = "/placeholder.svg?height=60&width=200&text=Logo+Error"
                          }}
                        />
                      ) : (
                        <div className="text-gray-500 text-center">
                          <ImageIcon className="w-8 h-8 mx-auto mb-2" />
                          <p>No logo uploaded</p>
                          <p className="text-sm">Using default logo</p>
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="heroPreview">Current Hero Image Preview</Label>
                    <div className="mt-1 p-4 border rounded-lg bg-gray-50">
                      <img
                        src={websiteSettings.heroImage || "/placeholder.svg"}
                        alt="Hero Preview"
                        className="w-full h-32 object-cover rounded-lg"
                        onError={(e) => {
                          e.target.src = "/placeholder.svg?height=300&width=600&text=Hero+Image+Error"
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-gray-600 mb-4">
                    To change logo or hero image, update the URLs in the Website Settings tab above.
                  </p>
                  <Button onClick={() => setActiveTab("website")} variant="outline">
                    Go to Website Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Content Tab */}
          <TabsContent value="content" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageSquare className="w-5 h-5" />
                  <span>Content Management</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="aboutContent">About Page Content</Label>
                    <Textarea id="aboutContent" placeholder="Enter about page content..." rows={4} className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="contactContent">Contact Page Content</Label>
                    <Textarea
                      id="contactContent"
                      placeholder="Enter contact page content..."
                      rows={4}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="shopContent">Shop Page Description</Label>
                    <Textarea id="shopContent" placeholder="Enter shop page description..." rows={3} className="mt-1" />
                  </div>
                </div>

                <Button className="bg-green-600 hover:bg-green-700">
                  <Save className="w-4 h-4 mr-2" />
                  Save Content
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Edit Product Modal */}
      {editingProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>Edit Product: {editingProduct.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Product Name</Label>
                  <Input
                    value={editingProduct.name}
                    onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Price (Rs)</Label>
                  <Input
                    type="number"
                    value={editingProduct.price}
                    onChange={(e) => setEditingProduct({ ...editingProduct, price: Number.parseInt(e.target.value) })}
                  />
                </div>
                <div>
                  <Label>Original Price (Rs)</Label>
                  <Input
                    type="number"
                    value={editingProduct.originalPrice || ""}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        originalPrice: e.target.value ? Number.parseInt(e.target.value) : null,
                      })
                    }
                  />
                </div>
                <div>
                  <Label>Quantity</Label>
                  <Input
                    type="number"
                    value={editingProduct.quantity}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, quantity: Number.parseInt(e.target.value) })
                    }
                  />
                </div>
                <div>
                  <Label>Chemical Category</Label>
                  <select
                    value={editingProduct.category}
                    onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label>Badge</Label>
                  <Input
                    value={editingProduct.badge || ""}
                    onChange={(e) => setEditingProduct({ ...editingProduct, badge: e.target.value })}
                    placeholder="e.g., PREMIUM, PURE"
                  />
                </div>
                <div>
                  <Label>Image URL</Label>
                  <Input
                    value={editingProduct.image}
                    onChange={(e) => setEditingProduct({ ...editingProduct, image: e.target.value })}
                  />
                </div>
                <div className="md:col-span-2">
                  <Label>Description</Label>
                  <Textarea
                    value={editingProduct.description}
                    onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                  />
                </div>
              </div>
              <div className="flex gap-2 pt-4">
                <Button
                  onClick={() => handleUpdateProduct(editingProduct.id, editingProduct)}
                  disabled={isLoading}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {isLoading ? "Updating..." : "Update Product"}
                </Button>
                <Button variant="outline" onClick={() => setEditingProduct(null)}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
