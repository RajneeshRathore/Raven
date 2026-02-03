import React from 'react'
import Hero from '../components/normal/Hero'
import About from '../components/normal/About'
const HomePage = () => {
  return (
    <div className='relative'>
        <Hero/>
        <div className='sticky h-[500vh] top-0 bg-white'>

    <About/>
        </div>
    </div>
  )
}

export default HomePage
