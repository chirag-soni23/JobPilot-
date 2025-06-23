import React from 'react'
import Hero from '../components/Hero'
import StatsGrid from '../components/StatsGrid'
import PopularVacancies from '../components/PopularVacancies'
import HowItWorks from '../components/HowItWorks'
import PopularCategory from '../components/PopularCategory'
import FeaturedJobs from '../components/FeaturedJobs'
import Testimonials from '../components/Testimonial'
import Footer from '../components/Footer'

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
      <Footer/>
    </div>
  )
}

export default Home