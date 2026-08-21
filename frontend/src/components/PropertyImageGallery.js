import { useState } from "react";
import PropertyImageCarousel from "./PropertyImageCarousel";

function PropertyImageGallery({ photos }) {
    const [ mainPhoto, setMainPhoto] = useState(photos[0])
    const [ lightBox, setLightBox ] = useState(false)

    return (
        <div className="photoGallery">
            <img id="centerPhoto" src={mainPhoto} alt="Missing" onClick={() => {
                setLightBox(true)
            }}></img>
            <div className="thumbnailStrip">
                {photos.map((photo, index) => {
                    return (<img src={photo} alt="Missing" key={index} className="thumbnail" onClick={() => {
                            setMainPhoto(photo)
                        }}></img>)
                })}
            </div>
            {lightBox && (
                <div className="lightBox" tabIndex={0} autoFocus onKeyDown={(event) => {
                    if(event.key === "Escape") {
                        setLightBox(false)
                    }
                }}>
                    <button className="exit" onClick={() => {
                        setLightBox(false)
                    }}>X</button>
                    <PropertyImageCarousel images={photos} idx={photos.indexOf(mainPhoto)} />
                </div>)}
        </div>
    )
}

export default PropertyImageGallery