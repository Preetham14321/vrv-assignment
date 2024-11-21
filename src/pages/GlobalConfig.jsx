import React,{useState,useEffect} from 'react'
import Header from '../components/Header'
import NavHeader from '../components/NavHeader'
import SideBar from '../components/SideBar'
import LeadsConfig from '../components/Settings/LeadsConfig'
import Policyconfig from '../components/Settings/Policyconfig'
import ClaimsConfig from '../components/Settings/ClaimsConfig'
import RenewalsConfig from '../components/Settings/UpcomingPolicyConfig'
const GloblaConfig = () => {
  
  
    const configTypes = [
        {id:'policyconfig',name:'Policy Config'},{id:'claimsConfig',name:'Claims Config'},{id:'leadsconfig',name:'Leads Config'},{id:'renerwalsconfig',name:'Renewals Config'}]

        const [selectedValue, setSelectedValue] = useState('');

        const handleChange = (event) => {
          setSelectedValue(event.target.value);
        };
        console.log('valu',selectedValue)
      

//     const handleChange = (e)=>{
//       const name = e.target.value;
//         setConfigTyp(e.target.value);
//         setIdd(e.target.value);
// // setConfigTyp(e.target.name)
//     //         const value = e.target.name;
//     //         setConfigTyp((values) => ({
//     //           ...values,
//     //           [name]: name === "registered" ? e.target.id : value
//     //         }));
//     console.log('config',configTyp)
//     }

  return (
    <div className='px-2 py-3'>
    <NavHeader />
    <main
      className=" lg:pt-10 flex  "
      //   style="background-image:url('../assets/FooterSvg/irdaLogo.png);"
    >
    
     
        
        {/* <div className="w-full">
      <Header/>
        </div> */}
        <div className='w-full bg-gray'>
        <div className=" mx-[10rem] my-5">
        <h3 className="text-2xl pl-4 font-semibold text-">
          Global Configuration
        </h3>
        <div className="mx-[15rem] mt-2 ">
        <select className="block w-96 p-2   text-gray-700 bg-white   border-gray  rounded shadow border-2   focus:border-blue-500   focus:outline-none focus:ring" value={selectedValue} onChange={handleChange}>
        <option value="">Select an option</option>
        {configTypes.map((item) => (
          <option key={item.id} value={item.name}>{item.name}</option>
        ))}
      </select>
       

                    </div>
        </div>
        {selectedValue==='Policy Config'&&<Policyconfig/>}
        {selectedValue==='Claims Config'&&<ClaimsConfig/>}
        {selectedValue==='Leads Config'&&<LeadsConfig/>}
        {selectedValue==='Renewals Config'&&<RenewalsConfig/>}
        </div>
        </main></div>
    
  )
}

export default GloblaConfig