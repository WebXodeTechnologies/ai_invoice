import React from 'react'
import Header from '../../components/landing/Header'
import Hero from './Hero'
import Features from '../../components/landing/Features'
import Testimonials from '../../components/landing/Testimonials'
import Faq from '../../components/landing/Faq'

const LandingPage = () => {
  return (
    <div className='bg-[#ffffff] text-gray-600'>
      <Header/>
      <main className='mb-[100vh]'>
        <Hero/>
        <Features/>
        <Testimonials/>
        <Faq/>
      </main>
    </div>
  )
}

export default LandingPage