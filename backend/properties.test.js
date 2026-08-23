const request = require("supertest")

jest.mock("./db", () => ({
    query: jest.fn()
}))

const pool = require("./db")
const app = require("./server")

beforeEach(() => {
    pool.query.mockReset()
})

test("GET /api/properties returns properties", async () => {
    const fakeProperty = {
        L_ListingID: "1234567890",
        L_City: "Oroville",
        L_SystemPrice: 500000
    }

    pool.query
        .mockResolvedValueOnce([[{ total: 1 }]])
        .mockResolvedValueOnce([[fakeProperty]])

    const response = await request(app)
        .get("/api/properties")

    expect(response.statusCode).toBe(200)
    expect(response.body.total).toBe(1)
    expect(response.body.results).toEqual([fakeProperty])
})

test("GET /api/properties uses filters", async () => {
    const fakeProperty = {
        L_ListingID: "1234567890",
        L_City: "Oroville",
        L_SystemPrice: 500000
    }

    pool.query
        .mockResolvedValueOnce([[{ total: 1 }]])
        .mockResolvedValueOnce([[fakeProperty]])

    const response = await request(app)
        .get("/api/properties?city=Oroville&zipcode=95966&minPrice=300000&maxPrice=800000&beds=3&baths=2")

    expect(response.statusCode).toBe(200)
    expect(response.body.total).toBe(1)
    expect(response.body.results).toEqual([fakeProperty])

    expect(pool.query.mock.calls[0][1]).toEqual([
        "oroville",
        "95966",
        800000,
        300000,
        3,
        2
    ])
})

test("GET /api/properties returns 400 for invalid city", async () => {
    const response = await request(app)
        .get("/api/properties?city=28")

    expect(response.statusCode).toBe(400)

    expect(pool.query).not.toHaveBeenCalled()
})

test("GET /api/properties uses pagination", async () => {
    const fakeProperty = {
        L_ListingID: "1234567890",
        L_City: "Oroville",
        L_SystemPrice: 500000
    }

    pool.query
        .mockResolvedValueOnce([[{ total: 50 }]])
        .mockResolvedValueOnce([[fakeProperty]])

    const response = await request(app)
        .get("/api/properties?limit=10&offset=20")

    expect(response.statusCode).toBe(200)
    expect(response.body.limit).toBe(10)
    expect(response.body.offset).toBe(20)
})

test("GET /api/properties/id returns properties", async () => {
    const fakeProperty = {
        L_ListingID: "1234567890",
        L_City: "Oroville",
        L_SystemPrice: 500000
    }

    pool.query
        .mockResolvedValueOnce([[fakeProperty]])

    const response = await request(app)
        .get(`/api/properties/${fakeProperty.L_ListingID}`)

    expect(response.statusCode).toBe(200)
    expect(response.body.result).toEqual(fakeProperty)
})

test("GET /api/properties/id 404", async () => {
    const fakeProperty = {
        L_ListingID: "1234567890",
        L_City: "Oroville",
        L_SystemPrice: 500000
    }

    pool.query
        .mockResolvedValueOnce([[]])

    const response = await request(app)
        .get(`/api/properties/1234567891`)

    expect(response.statusCode).toBe(404)
})

test("GET /api/properties/id invalid ID", async () => {
    const fakeProperty = {
        L_ListingID: "1234567890",
        L_City: "Oroville",
        L_SystemPrice: 500000
    }

    pool.query
        .mockResolvedValueOnce([[]])

    const response = await request(app)
        .get(`/api/properties/123`)

    expect(response.statusCode).toBe(400)
    expect(pool.query).not.toHaveBeenCalled()
})

test("GET /api/properties/id/openhouses returns properties", async () => {
    const fakeProperty = {
        L_ListingID: "1234567890",
        L_City: "Oroville",
        L_SystemPrice: 500000
    }

    pool.query
        .mockResolvedValueOnce([[{}]])
        .mockResolvedValueOnce([[fakeProperty]])

    const response = await request(app)
        .get(`/api/properties/${fakeProperty.L_ListingID}/openhouses`)

    expect(response.statusCode).toBe(200)
    expect(response.body.result).toEqual([fakeProperty])
})

test("GET /api/properties/id/openhouses invlalid id", async () => {
    const fakeProperty = {
        L_ListingID: "1234567891",
        L_City: "Oroville",
        L_SystemPrice: 500000
    }

    pool.query.mockResolvedValueOnce([[]])
    const response = await request(app)
        .get(`/api/properties/${fakeProperty.L_ListingID}/openhouses`)

    expect(response.statusCode).toBe(404)
})

test("GET /api/properties/:id/openhouses returns empty array", async () => {
    pool.query
        .mockResolvedValueOnce([[{}]]) // property exists
        .mockResolvedValueOnce([[]])   // no open houses exist

    const response = await request(app)
        .get("/api/properties/1234567890/openhouses")

    expect(response.statusCode).toBe(200)
    expect(response.body.result).toEqual([])
})

test("GET /api/properties returns 400 for invalid zipcode", async () => {
    const response = await request(app)
        .get("/api/properties?zipcode=abc")

    expect(response.statusCode).toBe(400)
    expect(pool.query).not.toHaveBeenCalled()
})

test("GET /api/properties returns 400 for invalid beds", async () => {
    const response = await request(app)
        .get("/api/properties?beds=2.5")

    expect(response.statusCode).toBe(400)
    expect(pool.query).not.toHaveBeenCalled()
})

test("GET /api/properties returns 400 for invalid limit", async () => {
    const response = await request(app)
        .get("/api/properties?limit=0")

    expect(response.statusCode).toBe(400)
    expect(pool.query).not.toHaveBeenCalled()
})