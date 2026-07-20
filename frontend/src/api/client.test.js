import { fetchProperties, fetchPropertyDetail } from "./client";

global.fetch = jest.fn()

beforeEach(() => {
    global.fetch.mockClear()
})

test("fetchProperties returns property data", async () => {
    const fakeData = {
        total: 1,
        results: [
            {
                L_ListingID: "123",
                L_City: "Miami"
            }
        ]
    }

    global.fetch.mockResolvedValue({
        ok: true,
        json: async () => fakeData
    })

    const data = await fetchProperties({ city: "Miami" })

    expect(data).toEqual(fakeData)
})

test("fetchProperties does not send empty filters", async () => {
    global.fetch.mockResolvedValue({
        ok: true,
        json: async () => ({ total: 0, results: [] })
    })

    await fetchProperties({
        city: "Miami",
        zipcode: "",
        beds: "3",
        baths: ""
    })

    expect(global.fetch).toHaveBeenCalledWith(
        "/api/properties?city=Miami&beds=3"
    )
})

test("fetchProperties throws an error when request fails", async () => {
    global.fetch.mockResolvedValue({
        ok: false,
        status: 500
    })

    await expect(fetchProperties()).rejects.toThrow(
        "Failed to fetch properties: 500"
    )
})