import React, { useState } from 'react'
import DmListSection from './DmListSection'
import OpenDm from './OpenDm'
const DmSection = () => {
    const [activeDm,setActiveDm]=useState("")
  return (
    <div className="bg-red-400 w-screen flex">
      <DmListSection setActiveDm={setActiveDm}/>
      <div className='w-[50%] bg-black'>
       {activeDm && <OpenDm item={activeDm}/>}
      </div>
    </div>
  )
}

export default DmSection
