import React from 'react'
import Header from '../components/Header'
import NavHeader from '../components/NavHeader'
import SideBar from '../components/SideBar'
import Form from '../components/policy/Tabs'
const Policy = () => {
  return (
    <div className='px-2 py-3'>
    <NavHeader />
    <main
      className=" lg:pt-10 px-32  w-full  "
      //   style="background-image:url('../assets/FooterSvg/irdaLogo.png);"
    >
      
        
        {/* <div className="w-full">
      <Header/>
        </div> */}
        <div >
          <Form/>
        </div>
        </main></div>
  )
}

export default Policy