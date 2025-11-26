import React from 'react'
import Hero from '../components/Hero'
import StatsGrid from '../components/StatsGrid'
import PopularVacancies from '../components/PopularVacancies'
import HowItWorks from '../components/HowItWorks'
import PopularCategory from '../components/PopularCategory'
import FeaturedJobs from '../components/FeaturedJobs'
import Testimonials from '../components/Testimonial'

const Home = () => {
  return (
    <div>
      <Hero/>
      <StatsGrid/>
      <PopularVacancies/>
      <HowItWorks/>
      <PopularCategory/>
      <FeaturedJobs/>
      <Testimonials/>
    </div>
  )
}

export default Home