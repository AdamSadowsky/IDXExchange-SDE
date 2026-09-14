import { useState } from "react"

function PropertyFilters({ onSearch, setCurrentPage, setOffset, sortBy, sortOrder, setSortBy, setSortOrder}) {
    const emptyFilters = {
        city: "",
        zipcode: "",
        minPrice: "",
        maxPrice: "",
        beds: "",
        baths: "",
    }
    const [filters, setFilters] = useState(emptyFilters)


    return (
        <div className="filterHolder">

            <input 
                type="text" 
                placeholder="City" 
                value={filters.city}
                onChange={(e) => 
                    setFilters({...filters, city: e.target.value})}
            />

            <input 
                type="text" 
                placeholder="Zipcode" 
                value={filters.zipcode}
                onChange={(e) => setFilters({...filters, zipcode: e.target.value})}
            />
            
            <input 
                type="number" 
                placeholder="Minimum Price" 
                value={filters.minPrice}
                onChange={(e) => setFilters({...filters, minPrice: e.target.value})}
            />

            <input 
                type="number" 
                placeholder="Maximum Price" 
                value={filters.maxPrice}
                onChange={(e) => setFilters({...filters, maxPrice: e.target.value})}
            />
            
            <select value={filters.beds} onChange={(e) => { 
                setFilters({...filters, beds: e.target.value})
            }}>
                <option value="">Beds</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
                <option>7</option>
                <option>8</option>
            </select>

            <select value={filters.baths} onChange={(e) => { 
                setFilters({...filters, baths: e.target.value})
            }}>
                <option value="">Baths</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
                <option>7</option>
                <option>8</option>
            </select>

            <select value={sortBy} onChange={(e) => { 
                setSortBy(e.target.value)
            }}>
                <option value="">Sort by</option>
                <option value={1}>Price</option>
                <option value={2}>Date</option>
                <option value={3}>SQFT</option>
                <option value={4}>Beds</option>
            </select>

            <select value ={sortOrder} onChange={(e) => { 
                setSortOrder(e.target.value)
            }}>
                <option value="">Order by</option>
                <option value={1}>Descending</option>
                <option value={2}>Ascending</option>
            </select>
            
            <button className="search" onClick={() => { 
                onSearch(filters) 
                setCurrentPage(1)
                setOffset(0)
                setSortBy("")
                setSortOrder("")
            }}>Search</button>

            <button className="clear" onClick={() => {
                onSearch(emptyFilters)
                setFilters(emptyFilters)
                setCurrentPage(1)
                setOffset(0)
                setSortBy("")
                setSortOrder("")
            }}>Clear</button>
        </div>
    )
}

export default PropertyFilters
