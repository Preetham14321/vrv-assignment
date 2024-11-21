import React,{useState,useEffect,useRef}  from 'react'
import Header from '../components/Header'
import NavHeader from '../components/NavHeader'
import SideBar from '../components/SideBar'
import Sales from '../components/claims/Sales'

const Claims = () => {
  const [isTableTouchingNavbar, setIsTableTouchingNavbar] = useState(false);

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
      <Header type='Claims'/>
         
         <div className="py-10 bg-[#f8f9fa]">
            <Sales ids='table' isSticky={[isTableTouchingNavbar, setIsTableTouchingNavbar]} handleTableIntersection={setIsTableTouchingNavbar}/>
         </div>

        </div>
        </main></div>
  )
}

export default Claims