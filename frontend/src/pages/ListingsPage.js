import { useEffect, useState } from "react"
import { fetchProperties } from "../api/client";
import PropertyCard from "../components/PropertyCard";
import PropertyFilters from "../components/PropertyFilters"
import "./ListingsPage.css"

function ListingsPage() {
    const [properties, setProperties] = useState([])
    const [total, setTotal] = useState(0)
    const [limit, setLimit] = useState(20)
    const [offset, setOffset] = useState(0)
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(true)
    const [filters, setFilters] = useState({})

    useEffect(() => {
        let ignore = false
        async function loadProperties() {
            try {
                setLoading(true)
                setError("")
                const data = await fetchProperties({ ...filters, limit, offset})
                if(!ignore) {
                    setProperties(data.results)
                    setTotal(data.total)
                }
            } catch(err) {
                if(!ignore) {
                    setError(`Error: ${err.message}`)
                }
            } finally {
                if(!ignore) {
                    setLoading(false)
                }
            }
        }
        loadProperties()
        return () => {
            ignore = true
        }
    }, [filters, limit, offset])

    return (
        <main>
            <h1 className="header">Property Listings</h1>
            <PropertyFilters onSearch={setFilters}/>
            {loading ? 
                <p>Loading...</p> 
            : error ? 
            <p>{error}</p> 
            : (
            <>
                <p className="total">Showing {properties.length} of {total}</p>
                <div className="property-grid">
                    {properties.length !== 0 ? (properties.map((property) => (
                        <PropertyCard
                            key={property.L_ListingID}
                            property={property}
                        />
                    ))) : 
                    <p>No properties found</p>
                }
                </div>
            </>
            )}
        </main>
    )
}

export default ListingsPage
