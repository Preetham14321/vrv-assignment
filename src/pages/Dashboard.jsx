import React,{useState,useEffect,useRef}  from 'react'
import Sales from '../components/dashboard/Sales'
import Header from '../components/Header'
import NavHeader from '../components/NavHeader'
import SideBar from '../components/SideBar'

const Dashboard = () => {
  const [isTableTouchingNavbar, setIsTableTouchingNavbar] = useState(false);
  const userType = JSON.parse(localStorage.getItem("access"));

  useEffect(()=>{
    if(userType==='ENTRYUSER'){
      window.location.href='/policyEntry'
    }
  },[])
  const handleScroll = () => {
    const navbarHeight = document.getElementById('navbar').offsetHeight;
    const tableElement = document.getElementById('table');

    if (tableElement) {
      const tableRect = tableElement.getBoundingClientRect();
      setIsTableTouchingNavbar(tableRect.top <= navbarHeight);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className='px-2 py-3'>
    <NavHeader id='navbar' />
    <main
      className=" w-full lg:pt-10 pl-20 flex    "
      //   style="background-image:url('../assets/FooterSvg/irdaLogo.png);"
    >
      
        <div className="w-11/12">
         
         <div className="  bg-[#f8f9fa]">
            <Sales ids='table' isSticky={[isTableTouchingNavbar, setIsTableTouchingNavbar]} handleTableIntersection={setIsTableTouchingNavbar}/>
         </div>

        </div>
        </main></div>
  )
}

export default Dashboard