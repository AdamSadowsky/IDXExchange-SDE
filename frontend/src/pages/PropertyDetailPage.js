import { useParams } from "react-router-dom"
import { fetchPropertyDetail } from "../api/client"
import { useState, useEffect } from "react"
import "./PropertyDetailPage.css"
import PropertyImageGallery from "../components/PropertyImageGallery"
import { useNavigate } from "react-router-dom"
import PropertyMap from "../components/PropertyMap"

function PropertyDetailPage() {
    const params = useParams()
    const [property, setProperty] = useState()
    const [openhouses, setOpenHouses] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        async function loadProperty() {
            try {
                setLoading(true)
                const propertyData = await fetchPropertyDetail(params.id)
                setProperty(propertyData.result)
                const res = await fetch(`/api/properties/${params.id}/openhouses`)

                if(!res.ok) {
                    throw new Error("Failed to fetch open houses")
                }

                const openhouseData = await res.json()
                console.log(openhouseData)
                setOpenHouses(openhouseData.result)
            } catch(err) {
                console.log(err)
            } finally {
                setLoading(false)
            }
        }
        loadProperty()
    }, [params.id])

    let photos = []

    if (loading) {
        return <p>Loading...</p>
    }

    if (!property) {
        return <p>Property not found</p>
    }

    if (property?.L_Photos) {
        try {
            const parsedPhotos = JSON.parse(property.L_Photos)

            if (Array.isArray(parsedPhotos)) {
                photos = parsedPhotos
            }
        } catch (err) {
            photos = []
        }
    }

    let ohDesc = ''

    if(openhouses[0]?.all_data) {
        try {
            const details = JSON.parse(openhouses[0].all_data)
            ohDesc = details.OpenHouseRemarks
        } catch(err) {
            ohDesc = ''
        }
    }

    const cityState = property
    ? `${property.L_City}, ${property.L_State}`
    : ""

    return (
        <>
            {loading ? <p>Loading...</p> : 
                <div className="propertyDetails">
                    <button className="back" onClick={() => {
                    navigate(-1)
                }}>Back</button>
                <PropertyImageGallery photos={photos}/>
                <div className="location">
                    <div className="address">{property.L_Address}</div>
                    <div className="cityState">{cityState}</div>
                </div>
                <div className="homeDetails">
                    <div className="propertyPrice">{`Price: $${Number(property.L_SystemPrice).toLocaleString()}`}</div>
                    <div className="propertyBeds">{`Beds: ${property.L_Keyword2}`}</div>
                    <div className="propertyBaths">{`Baths: ${property.LM_Dec_3}`}</div>
                    <div className="propertySqft">{`Sqft: ${property.LM_Int2_3}`}</div>
                    <div className="propertyYearBuilt">{`Year Built: ${property.YearBuilt}`}</div>
                </div>
                <div className="propertyDescription">{property.L_Remarks}</div>
                <PropertyMap latitude={property.LMD_MP_Latitude} longitude={property.LMD_MP_Longitude} />
                {openhouses.length === 0 ? <p>No open houses scheduled</p> : 
                    openhouses.map((openhouse, index) => {
                        const date = new Date(openhouse.OpenHouseDate).toLocaleDateString()
                        return (
                            <div className="openhouse" key={index}>
                                <div className="ohDate">{`Date: ${date}`}</div>
                                <div className="ohStartTime">{`Start Time: ${openhouse.OH_StartTime}`}</div>
                                <div className="ohEndTime">{`End Time: ${openhouse.OH_EndTime}`}</div>
                            </div>
                        )
                    })}
                <div className="ohDescription">{ohDesc}</div>
            </div>}
        </>
    )
}


export default PropertyDetailPage