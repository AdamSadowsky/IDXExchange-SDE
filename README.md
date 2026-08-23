# IDX Exchange Property Search

A full-stack real estate property search application built with React, Node.js, Express, and MySQL. The application allows users to browse property listings, apply filters, sort results, paginate through listings, and view detailed property information including images, maps, and scheduled open houses.

## Tech Stack

### Frontend
- React
- React Router
- JavaScript
- CSS
- Jest
- React Testing Library

### Backend
- Node.js
- Express
- MySQL
- mysql2
- Jest
- Supertest

## Features

- Browse property listings
- Filter listings by:
  - City
  - Zip code
  - Minimum price
  - Maximum price
  - Bedrooms
  - Bathrooms
- Sort listings by:
  - Price
  - Listing date
  - Square footage
  - Bedrooms
- Paginate through search results
- View individual property details
- View property images
- View property location on a map
- View scheduled open houses
- Backend input validation
- Request logging
- Frontend and backend automated tests

## Project Structure

```text
IDX-Exchange-Project/
│
├── backend/
│   ├── routes/
│   │   └── properties.js
│   ├── db.js
│   ├── server.js
│   ├── properties.test.js
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── utils/
│   │   └── App.js
│   └── package.json
│
└── README.md
```

## Architecture

The application uses a client-server architecture.

The React frontend handles the user interface, filtering, sorting, pagination, property cards, and property detail pages.

The Express backend exposes REST API endpoints that validate requests and query the MySQL property database.

```text
React Frontend
      |
      | HTTP requests
      v
Express / Node.js API
      |
      | SQL queries
      v
MySQL Database
```

The frontend communicates with the backend through `/api` endpoints. The backend uses a MySQL connection pool provided by `mysql2/promise`.

## Setup

### Prerequisites

Install the following before running the project:

- Node.js
- npm
- MySQL
- Git

The application also requires access to the IDX Exchange property database.

### Clone the Repository

```bash
git clone https://github.com/AdamSadowsky/IDXExchange-SDE.git
cd IDXExchange-SDE
```

### Backend Setup

Navigate to the backend directory:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file inside the `backend` directory:

```env
DB_HOST=your_database_host
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_NAME=your_database_name
DB_PORT=3306
```

Start the backend:

```bash
npm start
```

For development with Nodemon:

```bash
npm run dev
```

The backend runs on:

```text
http://localhost:5000
```

### Frontend Setup

Open another terminal and navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the React application:

```bash
npm start
```

The frontend will open in the browser and communicate with the backend API.

## API Documentation

### Health Check

```http
GET /api/health
```

Checks whether the backend can connect to the MySQL database.

Example response:

```json
{
  "status": "ok",
  "database": "connected"
}
```

---

### Get Properties

```http
GET /api/properties
```

Returns a paginated list of properties.

### Query Parameters

| Parameter | Description | Example |
|---|---|---|
| `city` | Filter by city | `Oroville` |
| `zipcode` | Filter by zip code | `95966` |
| `minPrice` | Minimum property price | `300000` |
| `maxPrice` | Maximum property price | `800000` |
| `beds` | Number of bedrooms | `3` |
| `baths` | Number of bathrooms | `2` |
| `limit` | Number of results returned | `20` |
| `offset` | Number of results skipped | `0` |
| `sortBy` | Field used for sorting | `1` |
| `sortOrder` | Sort direction | `1` |

### Sorting Values

`sortBy`:

| Value | Sort Field |
|---|---|
| `1` | Price |
| `2` | Listing date |
| `3` | Square footage |
| `4` | Bedrooms |

`sortOrder`:

| Value | Direction |
|---|---|
| `1` | Descending |
| `2` | Ascending |

Example:

```http
GET /api/properties?city=Oroville&minPrice=300000&maxPrice=800000&beds=3&limit=20&offset=0
```

Example response:

```json
{
  "total": 50,
  "limit": 20,
  "offset": 0,
  "results": []
}
```

Invalid filter values return HTTP `400`.

---

### Get Property Details

```http
GET /api/properties/:id
```

Returns the property associated with the specified listing ID.

The listing ID must contain exactly 10 digits.

Example:

```http
GET /api/properties/1234567890
```

Possible responses:

- `200` - Property found
- `400` - Invalid listing ID
- `404` - Property not found
- `500` - Server or database error

Example response:

```json
{
  "status": "ok",
  "database": "connected",
  "result": {
    "L_ListingID": "1234567890"
  }
}
```

---

### Get Property Open Houses

```http
GET /api/properties/:id/openhouses
```

Returns scheduled open houses for a property.

Example:

```http
GET /api/properties/1234567890/openhouses
```

If the property exists but has no scheduled open houses, the API returns:

```json
{
  "status": "ok",
  "database": "connected",
  "result": []
}
```

Possible responses:

- `200` - Property exists
- `400` - Invalid listing ID
- `404` - Property does not exist
- `500` - Server or database error

## Testing

The project includes automated frontend and backend tests.

### Backend Tests

From the `backend` directory:

```bash
npm test
```

Run tests with coverage:

```bash
npm test -- --coverage
```

Backend tests use Jest and Supertest. The database connection is mocked so tests can exercise the Express route handlers without querying the real MySQL database.

Tests cover:

- Property listing requests
- Filtering
- Pagination
- Invalid query parameters
- Property detail responses
- Invalid and unknown listing IDs
- Open house results
- Properties with no open houses
- Unknown properties

### Frontend Tests

From the `frontend` directory:

```bash
npm test -- --watchAll=false
```

Run frontend tests with coverage:

```bash
npm test -- --coverage --watchAll=false
```

Tests cover critical components including:

- `PropertyFilters`
- `Pagination`
- `PropertyCard`

Critical frontend and backend files maintain at least 70% line coverage.

## Known Issues and Limitations

- The application requires access to the IDX Exchange MySQL property database.
- Property information is limited to the data available in the source database.
- Some properties may not contain images, map coordinates, or open house information.
- The application currently does not include user authentication or saved property functionality.
- The project is currently intended for development use and is not configured as a production deployment.
