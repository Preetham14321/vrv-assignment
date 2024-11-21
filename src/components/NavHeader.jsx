import React from "react";
import axios from 'axios'
import { GiHamburgerMenu } from "react-icons/gi";
import img from "../assets/img1.jpg";
import logo from "../assets/logo1.png";
import { useState, useEffect } from "react";
import { HiSquares2X2 } from "react-icons/hi2";
import { BiMessageCheck } from "react-icons/bi";
import { IoMdNotifications } from "react-icons/io";
import { FaUserAlt, FaBookOpen } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";
import { BiLogOut } from "react-icons/bi";
import { MdClose } from "react-icons/md";
import {
  BsFillCaretDownFill,
  BsArrowLeftCircleFill,
  BsArrowRightCircleFill,
} from "react-icons/bs";
import { Link } from "react-router-dom";
const AdminMenu = [
  { title: "Dashboard", link: "/dashboard", icon: <HiSquares2X2 /> },
  { title: "Leads", link: "/leads", icon: <FaBookOpen /> },
  { title: "Renewals", link: "/renewals", icon: <FaBookOpen /> },
  { title: "Claims", link: "/claims", icon: <BiMessageCheck /> },
  { title: "Reports", link: "/reports", icon: <IoMdNotifications /> },
  

  { title: "Leads Entry", link: "/leadsEntry", icon: <BiMessageCheck /> },
  { title: "Policy Entry", link: "/policyEntry", icon: <FaBookOpen /> },

  { title: "Claims Entry", link: "/claimsEntry", icon: <BiMessageCheck /> },

  {
    icon: <FiSettings />,
    subMenus: [
      {
        title: "Enroll User",
        link: "/settings/adminen",
      },
      {
        title: "List Admin",
        link: "/settings/listadmin",
      },
      {
        title: "Add Client",
        link: "/settings/addcli",
      },
      {
        title: "List Client",
        link: "/settings/listcli",
      },
      {
        title: "Global Config",
        link: "/settings/globalconfig",
      },
      // {
      //   title: "Policy Config",
      //   link: "/settings/policycon",
      // },
      // {
      //   title: "Claims Config",
      //   link: "/settings/claimscon",
      // },
      // {
      //   title: "Leads Config",
      //   link: "/settings/leadscon",
      // },
      // {
      //   title: "RenewalsConfig",
      //   link: "/settings/renewalscon",
      // },
    ],
  },
  { title: "Profile", link: "/profile", icon: <FaUserAlt /> },

];
 const SubUserMenu = [
  { title: "Dashboard", link: "/dashboard", icon: <HiSquares2X2 /> },
  { title: "Leads", link: "/leads", icon: <FaBookOpen /> },
  { title: "Renewals", link: "/renewals", icon: <FaBookOpen /> },
  { title: "Claims", link: "/claims", icon: <BiMessageCheck /> },
  
  { title: "Profile", link: "/profile", icon: <FaUserAlt /> },

  { title: "Leads Entry", link: "/leadsEntry", icon: <BiMessageCheck /> },
  { title: "Policy Entry", link: "/policyEntry", icon: <FaBookOpen /> },
  { title: "Claims Entry", link: "/claimsEntry", icon: <BiMessageCheck /> },

 ]

const EntryUserMenu = [
  { title: "Leads Entry", link: "/leadsEntry", icon: <BiMessageCheck /> },
  { title: "Policy Entry", link: "/policyEntry", icon: <FaBookOpen /> },
  { title: "Claims Entry", link: "/claimsEntry", icon: <BiMessageCheck /> },
]

const Menusenrty = [
  { title: "Dashboard", link: "/dashboard", icon: <HiSquares2X2 /> },
  { title: "Claims", link: "/claims", icon: <BiMessageCheck /> },
  { title: "Reports", link: "/reports", icon: <IoMdNotifications /> },
  { title: "Profile", link: "/profile", icon: <FaUserAlt /> },
  { title: "Policy", link: "/policy", icon: <FaBookOpen /> },

  { title: "Logout", link: "/", icon: <BiLogOut /> },
];
const LMSMENU = [
  { title: "Dashboard", link: "/dashboard", icon: <HiSquares2X2 /> },

  { title: "Reports", link: "/reports", icon: <IoMdNotifications /> },
  { title: "Profile", link: "/profile", icon: <FaUserAlt /> },
  { title: "Logout", link: "/", icon: <BiLogOut /> },
];
const sub = [
  { title: "Dashboard", link: "/dashboard", icon: <HiSquares2X2 /> },

  { title: "Reports", link: "/reports", icon: <IoMdNotifications /> },
  { title: "Profile", link: "/profile", icon: <FaUserAlt /> },
  { title: "Logout", link: "/", icon: <BiLogOut /> },
];
const NavHeader = ({id}) => {
  const [showModal, setShowModal] = useState(false);
  const name = JSON.parse(localStorage.getItem("namee"));
  console.log(name);
  const handleClick = (e) => {
    e.preventDefault();
    setShowModal(true);
  };
  const [open, setOpen] = useState(true);
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const [sidebar, setSideBar] = useState(false);
  const toggleSidebar = () => {
    setSideBar(true);
  };
  const toggleSidebarclose = () => {
    setShowModal(false);
  };
  const location = window.location.pathname;
  const [authenticated, setauthenticated] = useState(false);
  const [authenticatedadmin, setauthenticatedadmin] = useState(true);
  const [authenticatedenrty, setauthenticatedentry] = useState(false);
  const [authenticatedsub, setauthenticatedsub] = useState(false);

  const [adminAccess, setAdminAccess] = useState(false)
  const [subUserAccess, setSubUserAccess] = useState(false)
  const [entryUserAccess, setEntryUserAccess] = useState(false)
  const [menu, setMenu] = useState([])
  
  const API_ENDPOINT = process.env.REACT_APP_API_URL;
  const namee = JSON.parse(localStorage.getItem("namee"));
  const Password = JSON.parse(localStorage.getItem("pwd"));
  const userType = JSON.parse(localStorage.getItem("access"));
  console.log(userType);
  //const userType='admin';
  useEffect(() => {
    if (userType ==="ADMIN") {
      setAdminAccess(true);
    } else if (userType === "ENTRYUSER") {
      setEntryUserAccess(true);
    } else if (userType === "SUBUSER") {
      setSubUserAccess(true);
    }
  }, [ userType]);

  useEffect(()=>{
if(adminAccess) {
  setMenu(AdminMenu)
}else if (entryUserAccess){
  setMenu(EntryUserMenu)
} else if (subUserAccess){
setMenu(SubUserMenu)
}
  },[adminAccess, entryUserAccess, subUserAccess])

//Logout Function 

const  handleLogout = () =>{
  
  axios.post(`https://api.testadmin-smarttechinsurance.co.in:10590/logout/user?username=raj`, {
    auth: {
        Username: namee,
        Password: Password
    }
})
.then((response) => {
    console.log(response.data);
})
.catch((error) => {
    console.error("Error:", error);
});


   
}

  return (
    <div id={id} className="flex z-50 items-center sticky top-0 bg-white h-20 ">
      <div className="flex">
        <button onClick={handleClick} className="m-2">
          <GiHamburgerMenu size={25} />
        </button>
        {showModal ? (
          <>
            <div className="justify-start items-start flex overflow-x-hidden bg-[rgba(0,0,0,.2)] bg-blend-darken overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-[300px] h- max-w-3xl">
                {/*content*/}
                <form>
                  <div className="border-0  shadow-lg relative flex flex-col w-full bg-white  outline-none focus:outline-none">
                    {/*header*/}
                    <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                      <div
                        className={` ${
                          open ? "w-48 px-2 " : "w-0 "
                        } lg:w-48  ${subMenuOpen?'':' h-screen '}  relative duration-500`}
                      >
                        <ul className="pt-1">
                          {authenticated &&
                            LMSMENU.map((Menu, index) => (
                              <>
                                <Link to={Menu.link}>
                                  <li
                                    key={index}
                                    className={`  ${
                                      Menu.link == location
                                        ? "text-[#141522] text-md"
                                        : "text-[#8E92BC]"
                                    }   text-md flex p-3 `}
                                  >
                                    <span className="mt-2">
                                      {" "}
                                      {Menu.icon ? Menu.icon : <HiSquares2X2 />}
                                    </span>
                                    <span className="flex-1 pl-4 text-md">
                                      {Menu.title}
                                    </span>

                                    {Menu.subMenus && (
                                      <BsFillCaretDownFill
                                        onClick={() =>
                                          setSubMenuOpen(!subMenuOpen)
                                        }
                                        className={`mt-1 mr-8 ${
                                          subMenuOpen && "rotate-180"
                                        }`}
                                      />
                                    )}
                                  </li>
                                </Link>
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
                          {authenticatedadmin &&
                            menu.map((Menu, index) => (
                              <>
                                <Link to={Menu.link}>
                                  <li
                                    key={index}
                                    className={`  ${
                                      Menu.link == location
                                        ? "text-[#141522] text-lg"
                                        : "text-[#8E92BC]"
                                    }   text-lg flex p-3 w-max `}
                                  >
                                    <span className="mt-2 mr-4">
                                      {" "}
                                      {Menu.icon ? Menu.icon : <HiSquares2X2 />}
                                    </span>
                                    <span className="text-md">
                                      {Menu.title}
                                    </span>

                                    {Menu.subMenus && (
                                      <button
                                        onClick={() =>
                                          setSubMenuOpen(!subMenuOpen)
                                        }
                                        className="flex"
                                      >
                                        Settings
                                        <BsFillCaretDownFill
                                          className={`mt-[6px] ml-2 mr-8 ${
                                            subMenuOpen && "rotate-180"
                                          }`}
                                        />
                                      </button>
                                    )}
                                  </li>
                                </Link>
                                {Menu.subMenus && subMenuOpen && open && (
                                  <ul>
                                    {Menu.subMenus.map((subMenuItem, idx) => (
                                      <Link to={subMenuItem.link}>
                                        <li
                                          key={idx}
                                          className="flex px-5 cursor-pointer text-center text-sm  text-[#8E92BC]  p-3 ml-6 "
                                        >
                                          {subMenuItem.title}
                                        </li>
                                      </Link>
                                    ))}
                                  </ul>
                                )}
                              </>
                            ))}
                                      <div className="cursor-pointer flex items-center text-lg gap-4 pl-2 pt-2 text-[#8E92BC]" onClick={handleLogout}>
                                      <BiLogOut className="text-xl"/>
                                      <h2 className="">
                                        Logout
                                      </h2>
                                      </div>
                          {authenticatedenrty &&
                            Menusenrty.map((Menu, index) => (
                              <>
                                <Link to={Menu.link}>
                                  <li
                                    key={index}
                                    className={`  ${
                                      Menu.link == location
                                        ? "text-[#141522] text-xl"
                                        : "text-[#8E92BC]"
                                    }   text-lg flex p-3 `}
                                  >
                                    <span className="mt-2">
                                      {" "}
                                      {Menu.icon ? Menu.icon : <HiSquares2X2 />}
                                    </span>
                                    <span className="flex-1 pl-4">
                                      {Menu.title}
                                    </span>

                                    {Menu.subMenus && (
                                      <BsFillCaretDownFill
                                        onClick={() =>
                                          setSubMenuOpen(!subMenuOpen)
                                        }
                                        className={`mt-1 mr-8 ${
                                          subMenuOpen && "rotate-180"
                                        }`}
                                      />
                                    )}
                                  </li>
                                </Link>
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
                          {authenticatedsub &&
                            LMSMENU.map((Menu, index) => (
                              <>
                                <Link to={Menu.link}>
                                  <li
                                    key={index}
                                    className={`  ${
                                      Menu.link == location
                                        ? "text-[#141522] text-xl"
                                        : "text-[#8E92BC]"
                                    }   text-lg flex p-3 `}
                                  >
                                    <span className="mt-2">
                                      {" "}
                                      {Menu.icon ? Menu.icon : <HiSquares2X2 />}
                                    </span>
                                    <span className="flex-1 pl-4">
                                      {Menu.title}
                                    </span>

                                    {Menu.subMenus && (
                                      <BsFillCaretDownFill
                                        onClick={() =>
                                          setSubMenuOpen(!subMenuOpen)
                                        }
                                        className={`mt-1 mr-8 ${
                                          subMenuOpen && "rotate-180"
                                        }`}
                                      />
                                    )}
                                  </li>
                                </Link>
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
                        <button
                          onClick={toggleSidebarclose}
                          className="absolute left-48 top-1"
                        >
                          <MdClose size={30} />
                        </button>
                      </div>
                    </div>
                    {/*body*/}
                  </div>
                </form>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        ) : null}
        <Link to='/dashboard'>

        <img src={logo} alt="Hero Logo"  className="w-40"/>
        </Link>
        {/* <h1 className="text-hero font-semibold text-xl">SMARTTECH</h1>
            <p className="text-[#293651]  text-xs ">INSURANCE BROKER</p> */}
      </div>
      <div className="flex flex-1">
        <h1 className="capitalize text-[#333840] ml-[525px] font-semibold">
          Admin Portal
        </h1>
      </div>
      <div className="flex items-center">
        <img
          src={img}
          alt=""
          className="w-[50px] h-[50px] object-cover rounded-full"
        />

        <div className="lg:pl-5">
          <h1 className="capitalize text-[#333840] font-semibold">{name}</h1>
          <h2 className="text-[#7F8DA1]">
            {JSON.parse(localStorage.getItem("access"))}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default NavHeader;
