import React,{useState,useEffect} from 'react'
import ScrollToTop from '../ScrollToTop'

const ModalDashBoard = ({sortdata,idValue,openmodel,position}) => {


const [sortedData, setSortedData] = useState([])
const [filteredData, setFilteredData] = useState(null)
const [openModel, setOpenModel] = openmodel

useEffect(()=>{
  setSortedData(sortdata)
},[sortdata])
useEffect(()=>{
  const selected = sortedData.filter(item=>item.id===idValue);
  setFilteredData(selected);
},[idValue, sortedData])



const modalStyles = {
  top: position.y,
  left: position.x,
};







  
  return (

    <div className="w-[50%] h-[80%] overflow-y-scroll p-5 bg-white " style={ {'position': 'absolute',
    'top':' 50%',
    'left': '50%',
    'transform': 'translate(-50%, -50%)'}}>
        <div className="float-right text-xl font-semibold cursor-pointer"  onClick={()=>{
          setOpenModel(!openModel)
        }}>X</div>
        <table className="grid text-[12px] w-full text-center text-gray-500 dark:text-gray-400 ">
       <div className="grid grid-cols-3 grid-rows-1 " style={modalStyles}>
              <thead className="text-[12px] grid text-gray-700 border-b-2 border-gray uppercase ">
                <tr className='flex flex-col gap-y-2'>
                 


                  <th scope="col" className="px-6 ">
                    Insurance Type Description
                  </th>
                  
                 
                

                  
                
                  <th scope="col" className="px-6 ">
                    Policy Number
                  </th>
                  <th scope="col" className="px-6 ">
                    Registration Number
                  </th>
                  <th scope="col" className="px-6">
                    Vehicle Make
                  </th>
                  <th scope="col" className="px-6 ">
                    Model
                  </th>
                  <th scope="col" className="px-6">
                    Year of Registration
                  </th>
                  <th scope="col" className="px-6">
                    Engine Number
                  </th>
                  <th scope="col" className="px-6">
                    Chassis Number
                  </th>
                  <th scope="col" className="px-6">
                    Description
                  </th>
                  <th scope="col" className="px-6 ">
                    Sum Insured
                  </th>
                  <th scope="col" className="px-6 ">
                    Motor OD Premium Amount
                  </th>
                  <th scope="col" className="px-6 ">
                    Motor TP Premium Amount
                  </th>
                  
                  <th scope="col" className="px-6">
                    GST
                  </th>
                  <th scope="col" className="px-6">
                    Gross Premium
                  </th>
                  <th scope="col" className="px-6 ">
                    OD Brokerage Rate
                  </th>
                  <th scope="col" className="px-6">
                    TP Brokerage Rate
                  </th>
                  <th scope="col" className="px-6">
                    OD Commision
                  </th>
                  <th scope="col" className="px-6">
                    TP Commision
                  </th>
                  <th scope="col" className="px-6 ">
                    Total Commision
                  </th>
                  <th scope="col" className="px-6 ">
                    Previous Policy No
                  </th>
                  <th scope="col" className="px-6 ">
                    Previous Insurer
                  </th>
                  <th scope="col" className="px-6">
                    Cover Note NO
                  </th>
                  <th scope="col" className="px-6">
                    Mode Of Payment
                  </th>
                  <th scope="col" className="px-6">
                    Retro Active Date
                  </th>
                  <th scope="col" className="px-6">
                    BQP
                  </th>
                  <th scope="col" className="px-6">
                    Risk Location
                  </th>
                  <th scope="col" className="px-6">
                    Assests Covered
                  </th>
                  <th scope="col" className="px-6">
                    PAN No
                  </th>
                  <th scope="col" className="px-6">
                    Deductible
                  </th>
                  <th scope="col" className="px-6">
                    Financier Name
                  </th>
                  <th scope="col" className="px-6">
                    Mobile No
                  </th>
                  <th scope="col" className="px-6">
                    Entry Date
                  </th>
                  <th scope="col" className="px-6">
                    Insured Type
                  </th>
                  <th scope="col" className="px-6">
                    Client Id
                  </th>
                  {/* <th scope="col" className="px-6 py-3">
<span >Edit</span>
</th> */}
                </tr>
              </thead>
              <tbody>
                {filteredData&&filteredData.map((item, key) => (
                  <tr className="border-b-2 gap-y-2 border-gray flex flex-col  dark:bg-gray-800 dark:border-gray-700 hover:bg-gray dark:hover:bg-gray-600">
                  
                   
                    <td className="px-6  text-[#142547]">{item.insuranceTypeDesc?item.insuranceTypeDesc:'None'}</td>




                    
                    <td className="px-6 ">{item.policyNo?item.policyNo:'None'}</td>
                    <td className="px-6 ">{item.registrationNo?item.registrationNo:'None'}</td>
                    <td className="px-6 ">{item.vehicleMake?item.vehicleMake:'None'}</td>
                    <td className="px-6 ">{item.model?item.model:'None'}</td>
                    <td className="px-6 ">{item.yearOfRegistration?item.yearOfRegistration:'None'}</td>
                    <td className="px-6 ">{item.engineNo?item.engineNo:'None'}</td>
                    <td className="px-6 ">{item.chassisNo?item.chassisNo:'None'}</td>
                    <td className="px-6 ">{item.description?item.description:'None'}</td>
                    <td className="px-6 ">{item.sumInsured?item.sumInsured:'None'}</td>
                    <td className="px-6 ">{item.motorOdPremiumAmount?item.motorOdPremiumAmount:'None'}</td>
                    <td className="px-6 ">{item.motorTpPremiumAmount?item.motorTpPremiumAmount:'None'}</td>
                    <td className="px-6  ">{item.gst?item.gst:'None'}</td>
                    <td className="px-6 ">{item.grossPremium?item.grossPremium:'None'}</td>
                    <td className="px-6 ">{item.odBrokerageRate?item.odBrokerageRate:'None'}</td>
                    <td className="px-6 ">{item.tpBrokerageRate?item.tpBrokerageRate:'None'}</td>
                    <td className="px-6 ">{item.odCommission?item.odCommission:'None'}</td>
                    <td className="px-6 ">{item.tpCommission?item.tpCommission:'None'}</td>
                    <td className="px-6 ">{item.totalCommission?item.totalCommission:'None'}</td>
                    <td className="px-6 ">{item.previousPolicyNumber?item.previousPolicyNumber:'None'}</td>
                    <td className="px-6 ">{item.previousInsurer?item.previousInsurer:'None'}</td>
                    <td className="px-6 ">{item.coverNoteNumber?item.coverNoteNumber:'None'}</td>
                    <td className="px-6 ">{item.modeOfPayment?item.modeOfPayment:'None'}</td>
                    <td className="px-6 ">{item.retroactiveDate?item.retroactiveDate:'None'}</td>
                    <td className="px-6 ">{item.bqp?item.bqp:'None'}</td>
                    <td className="px-6 ">{item.riskLocation?item.riskLocation:'None'}</td>
                    <td className="px-6 ">{item.assetsCovered?item.assetsCovered:'None'}</td>
                    <td className="px-6 ">{item.panNo?item.panNo:'None'}</td>
                    <td className="px-6 ">{item.deductible?item.deductible:'None'}</td>
                    <td className="px-6 ">{item.financierName?item.financierName:'None'}</td>
                    <td className="px-6 ">{item.mobileNo?item.mobileNo:'None'}</td>
                    <td className="px-6 ">{item.entryDate?item.entryDate:'None'}</td>
                    <td className="px-6 ">{item.insuredType?item.insuredType:'None'}</td>
                    <td className="px-6 ">{item.clientId?item.clientId:'None'}</td>
                    
                  </tr>
                ))}
              </tbody>
       </div>
            </table>

          {/* )} */}
    </div>

  )
}

export default ModalDashBoard