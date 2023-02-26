import React, { useState } from 'react'

 
const defaultImage = "http://pets-images.dev-apis.com/pets/none.jpg"
// const active = 0;


const Carousel = ({images}) => {
    const [active, setActive] = useState(0);
    
    const handleIndexClick = (index) => {
        setActive(index);
        }
  return (
    <div className="carousel">
        <img src={images[active]} alt="animal" />
        <div className="carousel-smaller">
            {
                images.map((photo,index) => (
                    <img onClick={() =>handleIndexClick(index)} src={photo} data-set={index} key={photo}
                    className={active === index ? "active":""} alt = "animal thumbnail" />
                ))
            }
        </div>
    </div>
  )
}

export default Carousel
