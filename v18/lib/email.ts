// Email notification system
export const sendOrderNotification = async (orderDetails: any, adminEmail: string) => {
  // Ye real mein email service (like Nodemailer, SendGrid, etc.) use karega
  const emailContent = `
    New Order Received!
    
    Order Details:
    - Order ID: #${orderDetails.id}
    - Customer: ${orderDetails.customerName}
    - Email: ${orderDetails.email}
    - Phone: ${orderDetails.phone}
    - Product: ${orderDetails.product}
    - Quantity: ${orderDetails.quantity}
    - Total Amount: Rs ${orderDetails.total}
    - Date: ${orderDetails.date}
    
    Please check your admin panel for more details.
  `

  // Real implementation
  try {
    // await sendEmail({
    //   to: adminEmail,
    //   subject: "New Order Received - The Century Scents",
    //   text: emailContent
    // })
    console.log("Order notification sent to:", adminEmail)
    console.log("Email content:", emailContent)
  } catch (error) {
    console.error("Failed to send email notification:", error)
  }
}

export const sendLowStockAlert = async (product: any, adminEmail: string) => {
  const emailContent = `
    Low Stock Alert!
    
    Product: ${product.name}
    Current Stock: ${product.quantity}
    
    Please restock this item soon.
  `

  try {
    console.log("Low stock alert sent to:", adminEmail)
    console.log("Email content:", emailContent)
  } catch (error) {
    console.error("Failed to send low stock alert:", error)
  }
}
