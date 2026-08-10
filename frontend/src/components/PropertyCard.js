import { useNavigate } from "react-router-dom"
import PropertyDetailPage from "../pages/PropertyDetailPage"
import { useState } from "react"
import PropertyImageCarousel from "./PropertyImageCarousel"

function PropertyCard({ property }) {
    let photos = []
    try {
        photos = JSON.parse(property.L_Photos)
    } catch(err) {
        console.log(err)
    }

    const location = `${property.L_City}, ${property.L_State}`
    const navigate = useNavigate()
    return (
        <div className="property-card" onClick={() => { 
            navigate(`/property/${property.L_ListingID}`)}
        }>
            <PropertyImageCarousel images={photos} idx={0}/>
            <p className="propertyPrice">${Number(property.L_SystemPrice).toLocaleString()}</p>
            <div className="propertyLocation">
                <p className="propertyLocation">{property.L_Address}</p>
                <p className="propertyLocation">{location}</p>
            </div>
            <div className="cardDetails">
                <p>{property.L_Keyword2} beds |</p>  
                <p>{Number(property.LM_Dec_3)} baths |</p>
                <p>{property.LM_Int2_3} sqft</p>
            </div>
        </div>
    )
}

export default PropertyCard