# Mini Merchant Dashboard with Authentication

## **Project Overview**

The Mini Merchant Dashboard is a full-stack MERN application that allows merchants to manage their products and view basic analytics with secure authentication. The app provides a user-friendly interface to perform CRUD operations on products, view statistics, and ensure that only authenticated users can access their data.

---

## **Features**

### **Authentication**
- Secure login and logout using JWT.
- Password hashing with bcrypt.
- Protected routes ensuring user-specific access.

### **Product Management**
- Add, view, update, and delete products.
- Each product includes: 
  - Name
  - Price
  - Category
  - Stock quantity
- User-specific product management.

### **Dashboard Analytics**
- Total product count
- Total inventory value
- Number of product categories

### **Frontend**
- Built with React.
- Responsive design with basic CSS.
- Axios used for API requests.
- Local storage for JWT token persistence.
- Form validation and error handling.
- Loading states for better UX.

### **Backend**
- Node.js with Express.js.
- RESTful API endpoints.
- CORS enabled for cross-origin requests.
- JWT authentication middleware for protected routes.
- In-memory storage for users and products (no database).

---

## **Demo Credentials**

Use the following credentials for testing:

- Email: `admin@test.com`  
- Password: `password123`

---

## **Installation and Setup**

### **Prerequisites**
- Node.js (v14 or higher)
- VS Code or similar code editor
- Postman or similar API testing tool

### **Clone Repository**
```bash
git clone https://github.com/NITHINNITHIN15/Merchant-Dashboard.git
cd Merchant-Dashboard
