import React from 'react'
import Header from '../../components/landing/Header'
import Hero from './Hero'
import Features from '../../components/landing/Features'
import Testimonials from '../../components/landing/Testimonials'
import Faq from '../../components/landing/Faq'
import Footer from '../../components/landing/Footer'

const LandingPage = () => {
  return (
    <div className='bg-[#ffffff] text-gray-600'>
      <Header/>
      <main className=''>
        <Hero/>
        <Features/>
        <Testimonials/>
        <Faq/>
        <Footer/>
      </main>
    </div>
  )
}

export default LandingPage