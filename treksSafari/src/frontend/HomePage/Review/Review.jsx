import React, {useEffect} from 'react'
import './Review.css'

// Improted Images
import user1 from '../../../assets/avatar.png'
import user2 from '../../../assets/avatar.png'
import user3 from '../../../assets/avatar.png'

const Review = () => {


  return (
    <div className='review section'>
      <div className="secContainer">
        <span className="secTitle">
          What People Say
          <p>We have satisfied a nunmber of clients so far!</p>
        </span>

        <div className="reviewContainer container grid">

          <div data-aos='fade-up' data-aos-duration='3000' className="singleReview">
            <div className="imgDiv">
              <img src={user1}/>
            </div>

            <p>
            My family and I got to enjoy our trip with no hassle! Thank you so much. Will book again with the rest of my family 
            (well, of course, on a more discounted price again hehe). Thank you and stay safe always!
            </p>

            <div className="name">
              Samantha Juan
            </div>

          </div>

          <div data-aos='fade-up' data-aos-duration='3500' className="singleReview">
            <div className="imgDiv">
              <img src={user2}/>
            </div>

            <p>
            TreksSafari was really helpful for our Hiking trip. They guide us to go to mount apo and the staff is so kind
             We had a great time to go to mount apo. We hike 3 days , will surely go back. Thank you for all the help
            </p>

            <div className="name">
            Wanwan Cruz
            </div>

          </div>

          <div data-aos='fade-up' data-aos-duration='4000' className="singleReview">
            <div className="imgDiv">
              <img src={user3}/>
            </div>

            <p>
            had a really smooth and relaxing hiking experience with my husbands family. the view of the mount ulap was so nice and the 
            food was great too. thank you so much trekssafari to the unforgetable experiece we will surely book again.
            </p>

            <div className="name">
            Maria Dela Cruz
            </div>

          </div>

        </div>
      </div>
    </div>
  )
}

export default Review