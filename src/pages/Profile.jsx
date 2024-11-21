import React from 'react'
import Header from '../components/Header'
import NavHeader from '../components/NavHeader'
import SideBar from '../components/SideBar'
import Pro from '../components/Pro/Pro'
const Profile = () => {
  return (
    <div className='px-2 py-3'>
    <NavHeader />
    <main
      className=" lg:pt-10  flex "
      //   style="background-image:url('../assets/FooterSvg/irdaLogo.png);"
    >
       
        <div className="w-full">
        <div><Pro></Pro></div>
        </div>
       
        </main></div>
  )
}

export default Profile