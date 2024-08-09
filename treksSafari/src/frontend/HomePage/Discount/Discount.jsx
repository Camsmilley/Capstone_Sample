import React, {useEffect} from 'react'
import './Discount.css'

//IMported Video
import video from '../../../assets/video.mp4'

//  import Aos from 'aos'
// import 'aos/dist/aos.css'


const Discount = () => {

  //  useEffect(()=>{
  //   Aos.init({duration: 2000})
  // }, [])

  return (
    <div className='discount'>
      <div className="secContainer">
          <video src={video} autoPlay loop muted typeof='mp4'></video>
          <div className="textDiv">
            <span data-aos='fade-up' data-aos-duration='2000' className="title">
            Sign Up for newsletters
            </span>
            <p data-aos='fade-up' data-aos-duration='2500'>
            Want to get an instant discount for your next hiking to any of your favorite mountains.
            </p>

            <div data-aos='fade-up' data-aos-duration='3000' className="input_btn flex">
              <input type="text" placeholder='Enter Your Email' />
              <button className='btn'>Subscribe</button>
            </div>
          </div>
      </div>

    </div>
  )
}

export default Discount