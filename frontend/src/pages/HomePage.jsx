import React from 'react'
import Hero from '../components/normal/Hero'
import About from '../components/normal/About'
import Feature from '../components/normal/Feature'
import Team from '../components/normal/Team'
const HomePage = () => {
  return (
    <div className='relative'>
        <Hero/>
        <div className='sticky  top-0 bg-black'>
    <About/>
    <Feature/>
    <Team/>
        </div>
        
    </div>
  )
}

export default HomePage
