export async function fetchProperties(params = {}) {
    const path = new URLSearchParams(params)
    const res = await fetch(`/api/properties?${path}`)

    if(!res.ok) {
        throw new Error(`Failed to fetch properties: ${res.status}`)
    }

    return res.json()
}

export async function fetchPropertyDetail(id) {
    const res = await fetch(`/api/properties/${id}`)

    if(!res.ok) {
        throw new Error(`Failed to fetch properties: ${res.status}`)
    }

    return res.json()
}