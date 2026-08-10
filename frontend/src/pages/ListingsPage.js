import { useEffect, useState } from "react"
import { fetchProperties } from "../api/client";
import PropertyCard from "../components/PropertyCard";
import PropertyFilters from "../components/PropertyFilters"
import Pagination from "../components/Pagination"
import "./ListingsPage.css"

function ListingsPage() {
    const [properties, setProperties] = useState([])
    const [total, setTotal] = useState(0)
    const [limit] = useState(20)
    const [offset, setOffset] = useState(0)
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(true)
    const [filters, setFilters] = useState({})
    const [sortBy, setSortBy] = useState("")
    const [sortOrder, setSortOrder] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(0)

    useEffect(() => {
        let ignore = false
        async function loadProperties() {
            try {
                setLoading(true)
                setError("")
                const data = await fetchProperties({ ...filters, limit, offset, sortBy, sortOrder})
                if(!ignore) {
                    setProperties(data.results)
                    setTotal(data.total)
                    setItemsPerPage(data.results.length)
                    console.log(data)
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
    }, [filters, limit, offset, sortBy, sortOrder])
    
    return (
        <main>
            <h1 className="header">Property Listings</h1>
            <PropertyFilters onSearch={setFilters} setCurrentPage={setCurrentPage} setOffset={setOffset} sortBy={sortBy} sortOrder={sortOrder} setSortBy={setSortBy} setSortOrder={setSortOrder}/>
            {loading ? 
                <p>Loading...</p> 
            : error ? 
            <p>{error}</p> 
            : (
            <>
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
                <Pagination page={currentPage} items={itemsPerPage} total={total} limit={limit} setCurrentPage={setCurrentPage} setOffset={setOffset}/>
            </>
            )}
        </main>
    )
}

export default ListingsPage
