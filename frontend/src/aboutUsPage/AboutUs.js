import React from 'react'
import './AboutUs.css' // Create this CSS file for better organization

export default function AboutUs() {
  return (
    <div className='aboutus-cont'>
     
      <div className="text-center">
        <img 
          src="https://pravarshaindustries.com/img/aboutus.webp" 
          className="mx-auto hero-img" 
          alt="banners" 
        />
      </div>

      {/* Content Section */}
      <div className=" text-center content-container">
        
        <div>
          <h4>Who are we ?</h4>
          <span className='s1'>
            Sadguru Dairy is a corporate citizen who understands the enormous significance of hygienic milk and dairy products for agro and industrial development. Leveraging the strength of superior product offerings, Pravarsha Dairy has strategized its foray into the consumer market, with the aim of being the market leader, earning respect and revenue for the stakeholders.
          </span>
        </div>

        
        <div className="text-center mission-section">
          <h4>Our mission</h4>
          <span className='s1'>
            Our mission is to become the premier retailer of high-quality food products in India. To achieve this goal, we are committed to passionately focusing on customer value, being intolerant of waste, and serving as responsible citizens in our communities.
          </span>
        </div>

       
        <div className='text-center content-container'>
          <h4>Our vision</h4>
          <span className='s1'>
            Our aim is to meet the diverse needs of consumers every day by marketing and selling foods that are consistent and of high quality.
          </span>
        </div>

        {/* Vision Image */}
        <div className="text-center">
          <img 
            src="https://pravarshaindustries.com/img/vision.webp" 
            className="mx-auto vision-img" 
            alt="banners" 
          />
        </div>
      </div>
    </div>
  )
}
