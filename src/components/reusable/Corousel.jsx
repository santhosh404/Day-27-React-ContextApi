import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

export default function CustomCorousel({ images, imageName }) {
   
    return (
        <>
            <Carousel width={250} dynamicHeight={400} autoPlay infiniteLoop showArrows={false} showStatus={false} style={{ backgroundColor: "lightgray" }}>
                {
                    images.map((image, idx) => (
                        <div key={idx} style={{ height: "100px" }}>
                            <img src={image}  />
                        </div>
                    ))
                }
            </Carousel>
        </>
    )
}
