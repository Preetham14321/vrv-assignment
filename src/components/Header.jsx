import React from 'react'
import { FaCalendarAlt } from "react-icons/fa";
const Header = ({type=''}) => {
  return (
    <div className="flex w-full bg-[#f8f9fa] overflow-x-hidden">

    <h1 className="font-semibold text-xl p-6">{type}</h1>
 <div className="flex flex-1"></div>
 <div className="flex  items-center gap-x-3 -mr-[-50px] rounded-md px-2 py-2 ">
</div>
  
 </div>
  )
}

export default Header