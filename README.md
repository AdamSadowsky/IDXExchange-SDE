# IDX Exchange Property Search

A full-stack real estate property search application built with React, Node.js, Express, and MySQL. Users can filter and sort property listings, paginate through results, view property details and photos, see property locations on a map, and view scheduled open houses.

<img width="948" height="471" alt="Screenshot 2026-08-27 223958" src="https://github.com/user-attachments/assets/2a6d621a-765d-4da5-ae6a-0dc483cfb72c" />


## Tech Stack

### Frontend
- React 19.2.7
- React Router DOM 7.18.2
- React Testing Library 16.3.2
- JavaScript
- CSS

### Backend
- Node.js
- Express 5.2.1
- MySQL 8
- mysql2 3.22.5
- Jest 30.4.2
- Supertest 7.2.2
- Nodemon 3.1.14

## Architecture

```text
React Frontend
      |
      | HTTP requests
      v
Node.js / Express API
      |
      | SQL queries
      v
MySQL Database
```

The React frontend handles filtering, sorting, pagination, property cards, property details, images, and maps.

The Express backend validates requests and queries the MySQL database using a connection pool.

## Local Setup

### Prerequisites

Install:

- Node.js and npm
- MySQL 8
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/AdamSadowsky/IDXExchange-SDE.git
cd IDXExchange-SDE
```

### 2. Database

The application was developed using a private IDX/RETS property dataset. The dataset is **not included in this repository**.

The backend requires a MySQL database containing:

```text
rets_property
rets_openhouse
```

Without access to a compatible IDX/RETS database, the full application cannot display property listings. The automated tests can still be run because the backend database connection is mocked during testing.

### 3. Backend Setup

```bash
cd backend
npm install
```

Create `backend/.env`:

```env
DB_HOST=localhost
DB_USER=your_mysql_user
DB_PASSWORD=your_mysql_password
DB_NAME=rets
DB_PORT=3306
```

Start the backend:

```bash
npm start
```

The backend runs at:

```text
http://localhost:5000
```

### 4. Frontend Setup

Open another terminal:

```bash
cd frontend
npm install
npm start
```

The frontend runs at:

```text
http://localhost:3000
```

For Google Maps, create `frontend/.env`:

```env
REACT_APP_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

## API Reference

### Health Check

```http
GET /api/health
```

Example response:

```json
{
  "status": "ok",
  "database": "connected"
}
```

### Get Properties

```http
GET /api/properties
```

Supported query parameters:

| Parameter | Description |
| --- | --- |
| `city` | City |
| `zipcode` | ZIP code |
| `minPrice` | Minimum price |
| `maxPrice` | Maximum price |
| `beds` | Bedrooms |
| `baths` | Bathrooms |
| `limit` | Results per page |
| `offset` | Results to skip |
| `sortBy` | Sort field |
| `sortOrder` | Sort direction |

Example request:

```text
GET /api/properties?city=Oroville&minPrice=300000&maxPrice=800000&beds=3
```

Example response:

```json
{
  "total": 1,
  "limit": 20,
  "offset": 0,
  "results": [
    {
      "L_ListingID": "1234567890",
      "L_City": "Oroville",
      "L_SystemPrice": 500000
    }
  ]
}
```

### Get Property Details

```http
GET /api/properties/:id
```

The property ID must contain exactly 10 digits.

Example request:

```text
GET /api/properties/1234567890
```

Example response:

```json
{
  "status": "ok",
  "database": "connected",
  "result": {
    "L_ListingID": "1234567890",
    "L_Address": "123 Main St",
    "L_City": "Oroville"
  }
}
```

### Get Open Houses

```http
GET /api/properties/:id/openhouses
```

Example request:

```text
GET /api/properties/1234567890/openhouses
```

Example response:

```json
{
  "status": "ok",
  "database": "connected",
  "result": [
    {
      "L_ListingID": "1234567890",
      "OpenHouseDate": "2026-08-30",
      "OH_StartTime": "10:00:00",
      "OH_EndTime": "12:00:00"
    }
  ]
}
```

A property with no scheduled open houses returns:

```json
{
  "status": "ok",
  "database": "connected",
  "result": []
}
```

## Database Schema

### `rets_property`

Stores property listings.

Important fields include:

- `L_ListingID`
- `L_Address`
- `L_City`
- `L_State`
- `L_Zip`
- `L_SystemPrice`
- `L_Keyword2` — bedrooms
- `LM_Dec_3` — bathrooms
- `LM_Int2_3` — square footage
- `L_Photos`
- `LMD_MP_Latitude`
- `LMD_MP_Longitude`

### `rets_openhouse`

Stores open-house information.

Important fields include:

- `L_ListingID`
- `OpenHouseDate`
- `OH_StartTime`
- `OH_EndTime`

The tables are related through `L_ListingID`.

```text
rets_property.L_ListingID
          |
          v
rets_openhouse.L_ListingID
```

One property can have zero or more open-house records.

## Testing

### Backend

```bash
cd backend
npm test
```

Coverage:

```bash
npm test -- --coverage
```

### Frontend

```bash
cd frontend
npm test -- --watchAll=false
```

Coverage:

```bash
npm test -- --coverage --watchAll=false
```

Critical frontend and backend files meet the required 70%+ test coverage target.

## Known Issues and Limitations

- The private IDX/RETS dataset is not included in this repository.
- A compatible database is required to run the full application with property listings.
- Some listings may have missing property information, photos, or map coordinates.
- Property photo URLs may expire.
- A Google Maps API key is required to display property maps.
- The application is currently intended for local development.

## Future Improvements

- Provide a sanitized sample dataset for public use.
- Add user authentication.
- Add saved or favorite properties.
- Improve responsive/mobile styling.
- Add production deployment configuration.
- Expand automated test coverage.
