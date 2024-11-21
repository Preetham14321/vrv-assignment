import React from 'react'
import Header from '../components/Header'
import NavHeader from '../components/NavHeader'
import SideBar from '../components/SideBar'
import Adminenroll from '../components/Settings/Adminenroll'
const Claims = () => {
  return (
    <div className='px-2 py-3'>
    <NavHeader />
    <main
      className=" lg:pt-10 flex  "
      //   style="background-image:url('../assets/FooterSvg/irdaLogo.png);"
    >
     
        {/* <div className="w-full">
      <Header/>
        </div> */}
        <div className='w-full bg-gray'>
          <Adminenroll/>
        </div>
        </main></div>
    
  )
}

export default Claims