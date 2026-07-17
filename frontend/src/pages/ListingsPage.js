import { useEffect, useState } from "react"
import { fetchProperties } from "../api/client";
import PropertyCard from "../components/PropertyCard";
import "./ListingsPage.css"

function ListingsPage() {
    const [properties, setProperties] = useState([])
    const [total, setTotal] = useState([])
    const [limit, setLimit] = useState(20)
    const [offset, setOffset] = useState(0)
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function loadProperties() {
            try {
                setLoading(true)
                setError(false)
                const data = await fetchProperties({ limit, offset})
                setProperties(data.results)
                setTotal(data.total)
            } catch(err) {
                setError(true)
            } finally {
                setLoading(false)
            }
        }
        loadProperties()
    }, [limit, offset])

    if(loading) {
        <p>Loading...</p>
    }

    if(error) {
        <p>Error</p>
    }

    return (
        <main>
            <h1 className="header">Property Listings</h1>
            <p className="total">Showing {properties.length} of {total}</p>
            <div className="property-grid">
                {properties.map((property) => (
                    <PropertyCard
                        key={properties.L_ListingID}
                        property={property}
                    />
                ))}
            </div>
        </main>
    )
}

export default ListingsPage
