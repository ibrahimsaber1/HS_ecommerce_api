# E-commerce Product API

## Tech Stack
- **Node.js** with **Express.js** framework
- File-based data storage (JSON)

## How to Run
```bash
npm install
npm start
```

API Endpoints
1. Get All Products

GET /products
Query Parameters: category (optional)

2. Get Product by ID

GET /products/:id

3. Add New Product

POST /products
Body: { name, category, price, description, stock }

Sample Requests:

# Get all products
curl http://localhost:3000/products

# Filter by category
curl http://localhost:3000/products?category=Apparel

# Get specific product
curl http://localhost:3000/products/1

# Add new product
curl -X POST http://localhost:3000/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Laptop","category":"Electronics","price":999.99,"stock":10}'

