# Smart Inventory API

This project implements a simple Node.js API for managing products and orders, serving static JSON data. It adheres to a clean architecture with separate concerns for routing, controllers, services, and utilities.

## Project Structure

```
smartinventory/
├── data/
│   ├── products.json
│   └── orders.json
├── src/
│   ├── controllers/
│   │   ├── productsController.js
│   │   └── ordersController.js
│   ├── services/
│   │   ├── productsService.js
│   │   └── ordersService.js
│   ├── utils/
│   │   ├── sendJson.js
│   │   ├── parseQuery.js
│   │   └── logger.js
│   ├── router.js
│   └── server.js
├── .env.sample
├── package.json
└── README.md
```

## Getting Started

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd smartinventory
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Environment Variables:**
    Create a `.env` file in the root directory by copying `.env.sample`:
    ```bash
    cp .env.sample .env
    ```
    Modify `.env` if you need to change the port:
    ```
    PORT=3000
    ```

4.  **Run the server:**
    *   **Development mode (with automatic restarts, if nodemon were allowed):**
        ```bash
        npm run dev
        ```
    *   **Production mode:**
        ```bash
        npm start
        ```

## API Endpoints

### Products

*   **GET /api/products**
    *   **Query Parameters:** `q`, `category`, `minPrice`, `maxPrice`, `inStock`, `page`, `limit`
*   **GET /api/products/:id**
*   **GET /api/products/sku/:sku**

### Orders

*   **GET /api/orders**
    *   **Query Parameters:** `status`, `from`, `to`, `page`, `limit`
*   **GET /api/orders/:id**
*   **GET /api/orders/number/:orderNumber**

### Health Check

*   **GET /health**
    *   Returns `{ status: "ok", uptime: <uptime_in_seconds>, timestamp: <ISO_date_string> }`

## Error Handling

*   `400 Bad Request`: Invalid query parameters (e.g., `minPrice` > `maxPrice`, invalid dates)
*   `404 Not Found`: Resource not found.
*   `500 Internal Server Error`: JSON read/parse issues.

## Logging

Minimal logging is implemented using `EventEmitter`:
*   `request:received`: Emitted when a request is received (logs `method`, `url`).
*   `response:sent`: Emitted when a response is sent (logs `statusCode`, `route`).

## Test Scenarios

### Products

```bash
curl "http://localhost:3000/api/products?category=tools&minPrice=10&maxPrice=100&page=2&limit=5"
curl "http://localhost:3000/api/products/sku/SKU-001"
curl "http://localhost:3000/api/products/123"
```

### Orders

```bash
curl "http://localhost:3000/api/orders?status=paid&from=2024-01-01&to=2024-12-31&limit=20"
curl "http://localhost:3000/api/orders/number/ORD-2025-0007"
```

### Health

```bash
curl "http://localhost:3000/health"
```
