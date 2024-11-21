import React,{useContext,useState,useEffect} from 'react'
import Header from '../components/Header'
import NavHeader from '../components/NavHeader'
import SideBar from '../components/SideBar'
import Lead from '../components/Leads/Leads'
import { UserContext }  from '../Home'
const Leadpage = () => {
    const user = useContext(UserContext);
    console.log(user.authen);

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
    <NavHeader />
    <main
      className=" lg:pt-10 ml-20 flex  "
      //   style="background-image:url('../assets/FooterSvg/irdaLogo.png);"
    >
     
        <div className="w-11/12">
   
      <div className="py-10">
            <Lead  ids='table' isSticky={[isTableTouchingNavbar, setIsTableTouchingNavbar]} handleTableIntersection={setIsTableTouchingNavbar}/>
         </div>
        </div>
        </main></div>
  )
}

export default Leadpage