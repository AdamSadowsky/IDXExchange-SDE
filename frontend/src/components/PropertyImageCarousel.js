import { useState } from "react"

function PropertyImageCarousel({ images, idx }) {
    const [imgIdx, setImgIdx] = useState(idx)
    const imgCount = images.length
    const photo = images[imgIdx]
    console.log(photo)

    if(imgCount === 0) {
        return <p>No images available</p>
    }

    return (
        <div className="imageCarousel">
            <img id="cardPhoto" src={photo} alt="Missing image"/>
            <div className="navigation">
                <button className="prev" disabled={imgIdx <= 0} onClick={(event) => {
                    event.stopPropagation()
                    setImgIdx(imgIdx - 1)
                }}>←</button>
                <div className="pageNumber">{`${imgIdx + 1}/${imgCount}`}</div>
                <button className="next" disabled={imgIdx >= imgCount - 1} onClick={(event) => {
                    event.stopPropagation()
                    setImgIdx(imgIdx + 1)
                }}>→</button>
            </div>
        </div>
    )
}

export default PropertyImageCarousel