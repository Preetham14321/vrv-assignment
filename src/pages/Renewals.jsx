import React,{useState,useEffect} from 'react'
import Sales from '../components/upcomingpolicy/Sales'
import NavHeader from '../components/NavHeader'

const Renewals = () => {

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
      className="w-full  "
      //   style="background-image:url('../assets/FooterSvg/irdaLogo.png);"
    >

  <Sales isSticky={[isTableTouchingNavbar, setIsTableTouchingNavbar]} handleTableIntersection={setIsTableTouchingNavbar} />
  </main>
</div>
  )
}

export default Renewals