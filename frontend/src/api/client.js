export async function fetchProperties(filters = {}) {
    const params = new URLSearchParams()
    Object.entries(filters).forEach(([key, value]) => {
        if(value !== "") {
            params.append(key, value)
        }
    })
    const res = await fetch(`/api/properties?${params.toString()}`)

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