function PropertyMap({ latitude, longitude}) {
    const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY

    if(!latitude || !longitude) {
        return null
    }

     const mapUrl = `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${latitude},${longitude}&zoom=15`

    return (
        <div className="propertyMap">
            <iframe title="Property location" src={mapUrl} width="100%" height="400" loading="lazy" allowFullScreen/>
            <a href={`https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`} target="_blank" rel="noreferrer">
                Get Directions
            </a>
        </div>
    )
}

export default PropertyMap