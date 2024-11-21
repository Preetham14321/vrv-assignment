import React, { useState, useEffect } from 'react';
import { HiSquares2X2 } from "react-icons/hi2";
import { BiMessageCheck } from "react-icons/bi";
import { IoMdNotifications } from "react-icons/io";
import { FaUserAlt,FaBookOpen } from "react-icons/fa";
import {FiSettings} from "react-icons/fi"
import {BiLogOut} from "react-icons/bi"

import {BsFillCaretDownFill,BsArrowLeftCircleFill,BsArrowRightCircleFill} from "react-icons/bs"
import { Link } from 'react-router-dom';
const Menus = [
  { title: 'Dashboard',link:'/dashboard', icon: <HiSquares2X2 /> },
  { title: 'Claims',link:'/claims', icon: <BiMessageCheck /> },
  { title: 'Reports',link:'/reports', icon: <IoMdNotifications /> },
  { title: 'Profile',link:'/profile', icon: <FaUserAlt /> },
  { title: 'Policy',link:'/policy', icon: <FaBookOpen /> },
  { title: 'Renewals',link:'/renewals', icon: <FaBookOpen /> },
  { title: 'Leads',link:'/leads', icon: <FaBookOpen /> },
  {
    title: 'Settings',
    icon: <FiSettings />,
    subMenus: [
      {
        title: 'Enroll User',
        link:'/adminen',


      },
      {
        title: 'List Admin',
        link: '/listadmin',


      },
      {
        title: 'Add Client',
        link: '/addcli',
      },
      {
        title: 'Policy Configuration',
        link: '/policyconfig',
      },
    ],
  },
  { title: 'Logout', link: '/', icon: <BiLogOut /> },
];
const LMSMENU = [
    { title: 'Dashboard',link:'/dashboard', icon: <HiSquares2X2 /> },
 
    { title: 'Reports',link:'/reports', icon: <IoMdNotifications /> },
    { title: 'Profile',link:'/profile', icon: <FaUserAlt /> },
    { title: 'Logout', link: '/', icon: <BiLogOut /> },
  ];
const SideBar = () => {
  const [open, setOpen] = useState(true);
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const [sidebar,setSideBar]=useState(false)
  const toggleSidebar = () => {
   setSideBar(true)
  };
  const toggleSidebarclose = () => {
    setSideBar(false)
   };
  const location = window.location.pathname
    const [authenticated, setauthenticated] = useState(false);
  const [authenticatedadmin, setauthenticatedadmin] = useState(false);
  const userType=JSON.parse(localStorage.getItem('access'));
  console.log(userType);
  //const userType='admin';
  useEffect(() => {
     if(userType === 'LMSUSER'){
      setauthenticated(true)
     }else if(userType === 'ADMIN'){
       setauthenticatedadmin(true)
     }
    }, [authenticated, userType]);
     console.log('shit',authenticatedadmin)
  return (
    <div className=" h-screen flex  ">
 { !sidebar && <button onClick={toggleSidebar} className='mb-[500px] '><BsArrowRightCircleFill size={40}/></button>}
  <div
        className={` ${
          open ? 'w-32 px-2 ' : 'w-0 '
        } lg:w-48  h-screen   relative duration-500`}
      >
        <ul className="pt-1">
          {authenticated && LMSMENU.map((Menu, index) => (
            <>
             <Link to={Menu.link}>
              <li
                key={index}
                className={`  ${Menu.link==location?'text-[#141522] text-xl':'text-[#8E92BC]'}   text-lg flex p-3 `}
              >
               <span className='mt-2'> {Menu.icon ? Menu.icon : <HiSquares2X2 />}</span>
                <span className="flex-1 pl-4">{Menu.title}</span>

               {Menu.subMenus && (
                  <BsFillCaretDownFill
                    onClick={() => setSubMenuOpen(!subMenuOpen)}
                    className={`mt-1 mr-8 ${subMenuOpen && 'rotate-180'}` }
                  />
                )}
              </li></Link>
              {Menu.subMenus && subMenuOpen && open && (
                <ul>
                  {Menu.subMenus.map((subMenuItem, idx) => (
                    <Link to={subMenuItem.link}>
                    <li
                      key={idx}
                      className="flex px-5 cursor-pointer text-center text-sm text-[#8E92BC]  p-2"
                    >
                      {subMenuItem.title}
                    </li>
                    </Link>
                  ))}
                </ul>
              )}
            </>
          ))}
           {authenticatedadmin && Menus.map((Menu, index) => (
            <>
             <Link to={Menu.link}>
              <li
                key={index}
                className={`  ${Menu.link==location?'text-[#141522] text-xl':'text-[#8E92BC]'}   text-lg flex p-3 `}
              >
               <span className='mt-2'> {Menu.icon ? Menu.icon : <HiSquares2X2 />}</span>
                <span className="flex-1 pl-4">{Menu.title}</span>

               {Menu.subMenus && (
                  <BsFillCaretDownFill
                    onClick={() => setSubMenuOpen(!subMenuOpen)}
                    className={`mt-1 mr-8 ${subMenuOpen && 'rotate-180'}` }
                  />
                )}
              </li></Link>
              {Menu.subMenus && subMenuOpen && open && (
                <ul>
                  {Menu.subMenus.map((subMenuItem, idx) => (
                    <Link to={subMenuItem.link}>
                    <li
                      key={idx}
                      className="flex px-5 cursor-pointer text-center text-sm text-[#8E92BC]  p-2"
                    >
                      {subMenuItem.title}
                    </li>
                    </Link>
                  ))}
                </ul>
              )}
            </>
          ))}
        </ul>
      </div>
      {sidebar && <button onClick={toggleSidebarclose} className='mb-[500px] '><BsArrowLeftCircleFill size={40}/></button>}
    </div>
  );
};

export default SideBar;