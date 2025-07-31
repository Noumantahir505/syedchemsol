"use client"
import { useState } from "react"
import type React from "react"

import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useCart } from "@/components/cart-context"

interface OrderFormProps {
  cartItems: any[]
  totalPrice: number
  onClose: () => void
}

export default function OrderForm({ cartItems, totalPrice, onClose }: OrderFormProps) {
  const { clearCart } = useCart()
  const [orderData, setOrderData] = useState({
    customerName: "",
    email: "",
    phone: "",
    address: "",
    notes: "",
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const orderDetails = {
        id: Date.now(),
        ...orderData,
        items: cartItems,
        total: totalPrice,
        date: new Date().toISOString().split("T")[0],
      }

      // In a real app, this would send email to admin
      console.log("📧 Order notification sent to admin:", {
        subject: "New Order Received - The Century Scents",
        orderDetails,
      })

      alert(
        "✅ Order placed successfully! Admin has been notified via email. You will be contacted soon for confirmation.",
      )
      clearCart()
      onClose()
    } catch (error) {
      console.error("Order submission error:", error)
      alert("❌ An error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-[60]">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Complete Your Order</CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        <CardContent>
          {/* Order Summary */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold mb-3">Order Summary</h3>
            <div className="space-y-2">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>
                    {item.name} x {item.quantity}
                  </span>
                  <span>Rs {(item.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
              <div className="border-t pt-2 flex justify-between font-semibold">
                <span>Total</span>
                <span>Rs {totalPrice.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="customerName">Full Name *</Label>
                <Input
                  id="customerName"
                  value={orderData.customerName}
                  onChange={(e) => setOrderData({ ...orderData, customerName: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={orderData.email}
                  onChange={(e) => setOrderData({ ...orderData, email: e.target.value })}
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                value={orderData.phone}
                onChange={(e) => setOrderData({ ...orderData, phone: e.target.value })}
                placeholder="03xxxxxxxxx"
                required
              />
            </div>

            <div>
              <Label htmlFor="address">Delivery Address *</Label>
              <Textarea
                id="address"
                value={orderData.address}
                onChange={(e) => setOrderData({ ...orderData, address: e.target.value })}
                placeholder="Enter complete delivery address"
                rows={3}
                required
              />
            </div>

            <div>
              <Label htmlFor="notes">Special Instructions (Optional)</Label>
              <Textarea
                id="notes"
                value={orderData.notes}
                onChange={(e) => setOrderData({ ...orderData, notes: e.target.value })}
                placeholder="Any special delivery instructions..."
                rows={2}
              />
            </div>

            <div className="bg-amber-50 p-4 rounded-lg">
              <p className="text-sm text-amber-700">
                💳 <strong>Payment Method:</strong> Cash on Delivery (COD)
                <br />📦 <strong>Delivery:</strong> 2-3 business days
                <br />📞 <strong>Note:</strong> Our team will call you to confirm the order
              </p>
            </div>

            <div className="flex gap-3">
              <Button type="submit" disabled={loading} className="flex-1 bg-amber-600 hover:bg-amber-700 text-white">
                {loading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Placing Order...</span>
                  </div>
                ) : (
                  "Place Order"
                )}
              </Button>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
