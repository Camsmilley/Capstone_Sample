import React from 'react'
import './Guide.css'

// Imported Images
import tourGuide from  '../../../assets/tour-guide.png'
import tourPackage from '../../../assets/gift-box.png'
import safari from  '../../../assets/hiking.png'

const Guide = () => {
  return (
    <div className='guide container section'>
      <div className="secContainer">
        <span className="secTitle">
          How to get started!
          <p>Hike now! We are here to serve you.</p>
        </span>

        <div className="grid steps">
            <div className="singleStep">
               <img src={tourPackage} alt="Image" />
               <div className="information">
                <span className="title">
                    Choose Your Package
                </span>
                <p>
                Visit top Hiking destinations in the Philippines with these all-inclusive hiking packages
                 guided tours for a hassle-free vacation. Browse our collection of curated Philippines Hiking
                  with the best itinerary, perfect for first-time visitors
                </p>
               </div>
            </div>

            <div className="singleStep">
               <img src={tourGuide} alt="Image" />
               <div className="information">
                <span className="title">
                    Contact Guide
                </span>
                <p>
                A guided hiking tour is the perfect way to experience a hike. You can let your guide handle the 
                harder aspects of the hike, and you can just enjoy all the beauty that the hike has to offer. 
                I offer customized, private guiding hiking tours and trips to small groups. 
                </p>
               </div>
            </div>

            <div className="singleStep">
               <img src={safari}alt="Image" />
               <div className="information">
                <span className="title">
                    Enjoy your trekssafari
                </span>
                <p>
                Not only are these experiences enjoyable to have, but they’re good for you, too.
                Hiking is proven to have many health benefits, ranging from physical exercise you get when out on the trail, 
                to emotional or mental relief that comes from being in nature.
                </p>
               </div>
            </div>
        </div>


      </div>
      
    </div>
  )
}

export default Guide