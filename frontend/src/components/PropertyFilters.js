import { useState } from "react"

function PropertyFilters({ onSearch }) {
    const emptyFilters = {
        city: "",
        zipcode: "",
        minPrice: "",
        maxPrice: "",
        beds: "",
        baths: ""
    }
    const [filters, setFilters] = useState(emptyFilters)


    return (
        <div className="filterHolder">

            <input 
                type="text" 
                placeholder="City" 
                value={filters.city}
                onChange={(e) => setFilters({...filters, city: e.target.value})}
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
            
            <select value={filters.beds} onChange={(e) => setFilters({...filters, beds: e.target.value})}>
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

            <select value={filters.baths} onChange={(e) => setFilters({...filters, baths: e.target.value})}>
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
            
            <button className="search" onClick={() => {onSearch(filters)}}>Search</button>
            <button className="clear" onClick={() => {
                onSearch(emptyFilters)
                setFilters(emptyFilters)}}>Clear</button>
        </div>
    )
}

export default PropertyFilters
