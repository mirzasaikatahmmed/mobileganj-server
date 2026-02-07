# API Integration Checklist

## 📋 Step-by-Step API Integration Guide

### 1. Product APIs

#### GET /api/products
```typescript
// Replace in: All product listing pages
// Files: shop/page.tsx, buy-phone/page.tsx, accessories/page.tsx, (home)/page.tsx

// Current (Mock):
import { mockProducts } from '@/lib/mock-data';

// Replace with:
const { data: products, isLoading } = useQuery({
  queryKey: ['products', filters],
  queryFn: () => fetchProducts(filters)
});
```

#### GET /api/products/:slug
```typescript
// Replace in: product/[slug]/page.tsx

// Current (Mock):
const product = mockProducts.find((p) => p.slug === params.slug);

// Replace with:
const { data: product } = useQuery({
  queryKey: ['product', params.slug],
  queryFn: () => fetchProduct(params.slug)
});
```

#### GET /api/products/filter
```typescript
// Add filtering logic
// Connect FilterSidebar component to API
```

---

### 2. Cart APIs

#### POST /api/cart/add
```typescript
// Add in: ProductCard.tsx, product/[slug]/page.tsx

const addToCart = useMutation({
  mutationFn: (product) => api.post('/cart/add', product),
  onSuccess: () => {
    toast.success('Added to cart');
    queryClient.invalidateQueries(['cart']);
  }
});
```

#### GET /api/cart
```typescript
// Add in: Header.tsx for cart count
const { data: cart } = useQuery({
  queryKey: ['cart'],
  queryFn: fetchCart
});
```

---

### 3. Pre-Order APIs

#### POST /api/pre-order
```typescript
// Add in: product/[slug]/page.tsx

const createPreOrder = useMutation({
  mutationFn: (orderData) => api.post('/pre-order', orderData),
  onSuccess: () => {
    toast.success('Pre-order placed successfully');
    router.push('/orders');
  }
});
```

---

### 4. EMI APIs

#### POST /api/emi/calculate
```typescript
// Add in: EMICalculator.tsx
// Optional: If you want server-side calculation

const calculateEMI = async (data) => {
  const response = await api.post('/emi/calculate', data);
  return response.data;
};
```

#### POST /api/emi/apply
```typescript
// When user confirms EMI purchase
const applyEMI = useMutation({
  mutationFn: (emiData) => api.post('/emi/apply', emiData),
  onSuccess: (data) => {
    // data.invoiceId - for tracking
    toast.success('EMI application submitted');
  }
});
```

---

### 5. Order APIs

#### POST /api/orders
```typescript
// Create order
const createOrder = useMutation({
  mutationFn: (orderData) => api.post('/orders', orderData),
  onSuccess: (data) => {
    // data.orderId, data.invoiceUrl
    toast.success('Order placed successfully');
  }
});
```

#### GET /api/orders/:id
```typescript
// Get order details with due amount
const { data: order } = useQuery({
  queryKey: ['order', orderId],
  queryFn: () => fetchOrder(orderId)
});

// Response should include:
// - order details
// - payment history
// - due amount
// - next installment date (for EMI)
```

---

### 6. Contact APIs

#### POST /api/contact
```typescript
// Add in: contact/page.tsx

const sendMessage = useMutation({
  mutationFn: (formData) => api.post('/contact', formData),
  onSuccess: () => {
    toast.success('Message sent successfully');
    setFormData(initialState);
  }
});
```

---

### 7. Search API

#### GET /api/search?q=query
```typescript
// Add in: Header.tsx search input

const { data: searchResults } = useQuery({
  queryKey: ['search', searchQuery],
  queryFn: () => api.get(`/search?q=${searchQuery}`),
  enabled: searchQuery.length > 2
});
```

---

### 8. User/Auth APIs

#### POST /api/auth/login
```typescript
const login = useMutation({
  mutationFn: (credentials) => api.post('/auth/login', credentials),
  onSuccess: (data) => {
    // Store token
    localStorage.setItem('token', data.token);
    // Update auth state
    setUser(data.user);
  }
});
```

#### POST /api/auth/register
```typescript
const register = useMutation({
  mutationFn: (userData) => api.post('/auth/register', userData),
  onSuccess: () => {
    toast.success('Registration successful');
    router.push('/login');
  }
});
```

---

## 🔧 Setup Required

### 1. Create API Client
```typescript
// src/lib/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
```

### 2. Setup React Query Provider
```typescript
// Already installed, just need to wrap app
// src/providers/QueryProvider.tsx
'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

export default function QueryProvider({ children }) {
  const [queryClient] = useState(() => new QueryClient());
  
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
```

### 3. Add to Root Layout
```typescript
// src/app/layout.tsx
import QueryProvider from '@/providers/QueryProvider';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <QueryProvider>
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
```

---

## 📝 Environment Variables

Create `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

---

## ✅ Integration Checklist

### Phase 1: Core Features
- [ ] Setup API client
- [ ] Setup React Query provider
- [ ] Product listing API
- [ ] Product details API
- [ ] Search API

### Phase 2: E-commerce
- [ ] Cart APIs
- [ ] Order creation API
- [ ] Pre-order API
- [ ] EMI calculation API

### Phase 3: User Features
- [ ] Authentication APIs
- [ ] User profile API
- [ ] Order history API
- [ ] Wishlist API

### Phase 4: Additional
- [ ] Contact form API
- [ ] Newsletter API
- [ ] Reviews/Ratings API
- [ ] Payment gateway integration

---

## 🎯 Priority Order

1. **High Priority** (Must have for launch)
   - Product APIs (listing, details, search)
   - Cart APIs
   - Order creation
   - Contact form

2. **Medium Priority** (Important but can wait)
   - Pre-order system
   - EMI application
   - User authentication
   - Order tracking

3. **Low Priority** (Nice to have)
   - Wishlist
   - Reviews
   - Newsletter
   - Advanced analytics

---

## 🔍 Testing Checklist

After API integration:
- [ ] Test product listing with filters
- [ ] Test product details page
- [ ] Test add to cart
- [ ] Test checkout flow
- [ ] Test pre-order flow
- [ ] Test EMI calculator
- [ ] Test contact form
- [ ] Test search functionality
- [ ] Test mobile responsiveness
- [ ] Test error handling
- [ ] Test loading states

---

## 📚 API Response Examples

### Product Response
```json
{
  "id": "1",
  "name": "iPhone 15 Pro Max",
  "slug": "iphone-15-pro-max",
  "brand": "Apple",
  "category": "Phone",
  "images": ["url1", "url2"],
  "price": 145000,
  "offerPrice": 139000,
  "condition": "Brand New",
  "tags": ["Hot", "Best Deal"],
  "stock": 5,
  "variants": [...]
}
```

### Order Response (with EMI)
```json
{
  "orderId": "ORD-001",
  "totalAmount": 139000,
  "paidAmount": 27800,
  "dueAmount": 111200,
  "emiDetails": {
    "duration": 6,
    "monthlyInstallment": 18533,
    "nextPaymentDate": "2024-02-01",
    "remainingInstallments": 5
  },
  "invoiceUrl": "/invoices/ORD-001.pdf"
}
```

---

**Ready to integrate! Follow this checklist step by step. 🚀**
