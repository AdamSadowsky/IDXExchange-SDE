function PropertyCard({ property }) {
    let mainPhoto = ""
    try {
        const photos = JSON.parse(property.L_Photos)
        if(Array.isArray(photos) && photos.length > 0) {
            mainPhoto = photos[0]
        }
    } catch(err) {
        mainPhoto = ""
    }

    const location = `${property.L_City}, ${property.L_State}`
    return (
        <div className="property-card">
            {mainPhoto ? (<img className="photo" src={mainPhoto} alt={property.L_Address}/>) 
            : <div className="photo">No photo</div>}
            <p className="propertyPrice">${Number(property.L_SystemPrice).toLocaleString()}</p>
            <div className="propertyLocation">
                <p className="propertyLocation">{property.L_Address}</p>
                <p className="propertyLocation">{location}</p>
            </div>
            <div className="propertyDetails">
                <p>{property.L_Keyword2} beds</p>  
                <p>{Number(property.LM_Dec_3)} baths</p>
                <p>{property.LM_Int2_3} sqft</p>
            </div>
        </div>
    )
}

export default PropertyCard