# Bajar Project - Frontend

Welcome to the **Bajar Project Frontend**! This is the frontend of a book management and e-commerce platform built with modern web technologies. The frontend is developed using **React**, **TailwindCSS**, and **Redux** for state management.

---

## **Features**

### **User Authentication**
- Secure registration and login with JWT-based authentication.
- Passwords are securely hashed before being stored.
- Logout functionality to clear the token from local storage.

### **Public Routes**
- **Home Page**:
  - Navbar with logo, favicon, and navigation items.
  - Banner with a carousel for special offers.
  - Featured products section with a "View All" button.
  - Extra section for testimonials or blogs.
  - Footer with essential links and contact details.
- **All Products Page**:
  - Search functionality by title, author, or category.
  - Filters for price range, author, category, and availability.
  - Dynamic product cards with details like name, author, price, and category.
  - "View Details" button for each product.
- **Product Details Page**:
  - Detailed product information and image.
  - "Buy Now" button to redirect to the checkout page.
- **About Page**:
  - Informative page about the shop and its mission.

### **Private Routes**
- **Checkout Page**:
  - Order placement with product details, user details, and total price calculation.
  - Payment integration with **ShurjoPay**.
  - "Order Now" button to confirm the purchase.
- **Dashboard**:
  - **Admin Dashboard**: Manage users, products, and orders (CRUD operations).
  - **User Dashboard**: View orders and manage profile settings.
  - Password update functionality with current password verification.

### **UI/UX Design**
- Responsive design for all screen sizes.
- Error handling for invalid login credentials, registration errors, and failed operations.
- Loading states with spinners or loaders during API calls.
- Toast notifications for important actions (e.g., "Login successful", "Order placed").

## **Technologies Used**

- **React**: Frontend library for building user interfaces.
- **TailwindCSS**: Utility-first CSS framework for styling.
- **Redux**: State management library.
- **React Router DOM**: For routing and navigation.
- **React Hook Form**: For form handling and validation.
- **React Toastify**: For displaying toast notifications.
- **Vite**: Build tool for fast development.

---

## **Installation**

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/bajar-project.git
   cd bajar-project/frontend


2. Install dependencies:
   ```bash
   npm install

3. Start the development server:
    ```bash
      npm run dev

4. Open your browser and navigate to http://localhost:5173.


## **Scripts**
npm run dev: Start the development server.

npm run build: Build the project for production.

npm run lint: Run ESLint to check for code issues.

npm run preview: Preview the production build locally.

## **Environment Variables**
Create a .env file in the root directory and add the following variables:

