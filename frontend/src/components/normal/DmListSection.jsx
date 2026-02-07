import React from 'react'
import { dms } from '../../SampleData'
import Nameplate from './Nameplate'
const DmListSection = ({setActiveDm}) => {
  return (
    <div className='w-[20%] bg-[#0f0f0f] h-full p-3 overflow-scroll'>
        
     {dms.map((item)=>{
        return (
            <Nameplate item={item} openDm={()=>setActiveDm(item)}/>
        )
     })}
    </div>
  )
}

export default DmListSection
