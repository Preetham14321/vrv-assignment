import React from 'react'
import NavHeader from '../NavHeader'
import Form from '../policy/ClaimTabsTemp'
const Policy = () => {
  return (
    <div className='px-2 py-3'>
    <NavHeader />
    <main
      className=" lg:pt-10 pl-32 flex  "
      //   style="background-image:url('../assets/FooterSvg/irdaLogo.png);"
    >
      
        
        {/* <div className="w-full">
      <Header/>
        </div> */}
        <div  className='w-full'>
          <Form/>
        </div>
        </main></div>
  )
}

export default Policy