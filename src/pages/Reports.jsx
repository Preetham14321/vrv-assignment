import React,{useState,useEffect} from 'react'
import Header from '../components/Header'
import NavHeader from '../components/NavHeader'
import SideBar from '../components/SideBar'
import Reportss from '../components/reportss/Reportss'
const Reports = () => {

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
    <NavHeader  id='navbar' />
    <main
      className="w-full lg:pt-10 flex "
      //   style="background-image:url('../assets/FooterSvg/irdaLogo.png);"
    >
      
        {/* <div className="w-full">
      <Header/>
        </div> */}
        <div className='ml-16 w-full overflow-x-hidden'><Reportss ids='table'  isSticky={[isTableTouchingNavbar, setIsTableTouchingNavbar]} handleTableIntersection={isTableTouchingNavbar}/></div>
        </main></div>
  )
}

export default Reports