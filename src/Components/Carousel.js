import React from 'react'
import C1 from '../Assets/car1.jpg'
import C2 from '../Assets/car2.jpg'
import C3 from '../Assets/car3.jpg'

const Carousel = () => {
  return (
    <>
        <div className=''>
      <Carousel fade>
        <Carousel.Item>
          <img className='d-block w-100' style={{height:'60vh'}} src={C1} alt='first slide' />
          <Carousel.Caption>
            <h1>First Label</h1>
            <p>This is FIrst slide para</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className='d-block w-100' style={{height:'60vh'}} src={C2} alt='first slide' />
          <Carousel.Caption>
            <h1>First Label</h1>
            <p>This is FIrst slide para</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className='d-block w-100' style={{height:'60vh'}} src={C3} alt='first slide' />
          <Carousel.Caption>
            <h1>First Label</h1>
            <p>This is FIrst slide para</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel> 
        </div>
    </>
  )
}

export default Carousel