import React from 'react'
import Header from '../components/Header'
import NavHeader from '../components/NavHeader'
import SideBar from '../components/SideBar'
import LeadsConfig from '../components/Settings/LeadsConfig'
import RenewalsConfig from '../components/Settings/UpcomingPolicyConfig'
const RenewalsConfigHandle = () => {
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
        <div className=" mx-[24rem] my-10">
          <RenewalsConfig/>
        </div>
        </div>
        </main></div>
    
  )
}

export default RenewalsConfigHandle;