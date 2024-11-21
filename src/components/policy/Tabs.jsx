import React from "react";
import { useState } from "react";
import Tab1 from "./Tab1";
import axios from "axios";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Context } from "../Context/Context";
const Tabs = ({ color }) => {
  const [openTab1, setOpenTab1] = useState(true);
  const [sheetData, setSheetData] = useState(false);
  const [sheet, setSheet] = useState(false);
  const [file, setFile] = useState();
  const required = true;
  const [makeApiCall, setMakeApiCall] = useState(false)
  const API_ENDPOINT = process.env.REACT_APP_API_URL;
 
  ////................................................................/////
  //getting values from local storage lob

  ////................................................................/////
  const [nameData, setNameData] = useState({
    "lob":'',
    "insPro":'',
    "insTyp":'',
    "busBy":'',
    "insdNam":'',
    "insdAdd":'',
    "insurer":'',
    "insAdd":'',
    "polSd":'',
    "polEd":'',
    "polNo":'',
    "mobNo":'',
    "prevPolNo":'',
    "groPre":'',
    "sumIns":'',
    "regNo":'',
    "vehMake":'',
    "model":'',
    "yor":'',
    "engNo":'',
    "chaNo":'',
    "mopa":'',
    "mtpa":''
  });
 
  const [msg, setMsg] = useState("");
  const [reas, setReas] = useState("");
  const [line, setLine] = useState([]);
  const [tabValue, setTabValue] = useState(1);
  const [insurerData, setInsurerData] = useState([]);
  const [it, setIt] = useState([]);
  const [ip, setIp] = useState([]);
  const [isUpload, setIsUpload] = useState(false)
  const name = JSON.parse(localStorage.getItem("namee"));
  const Password = JSON.parse(localStorage.getItem("pwd"));
  const tablen = [
    { id: 1, name: "TAB1" },
    { id: 2, name: "TAB2" }
  ];


  const requiredFields =[
{
  id: "lob",
  name: "Line of Business",
},
{
  id: "insPro",
      name: "Insurance Product",
},
{
  id: "insTyp",
      name: "Insurance Type",
},
{
  id: "busBy",
  name: "Business By",
},
{
  id: "insdNam",
  name: "Insured Name",
},
{
  id: "insdAdd",
  name: "Insured Address",
},
{
  id: "insurer",
  name: "Insurer",
},
{
  id: "insAdd",
      name: "Insurer Address",
},
{
  id: "polSd",
      name: "Policy Start Date",
},
{
  id: "polEd",
  name: "Policy End Date",
},
{
  id: "polNo",
      name: "Policy Number",
},
{
  id: "mobNo",
  name: "Mobile Number",
},
{
  id: "prevPolNo",
  name: "Previous Policy Number",
},
{
  id:'groPre',
      name:"Gross Premium",
},
{
  id:'sumIns',
      name:'Sum Insured',
},
{
  id:'regNo',
  name:'Registration Number',
},
{
  id:'vehMake',
  name:'Vehicle Make',
},
{
  id:'model',
  name:'Model',
},
{
  id:'yor',
      name:'Year of Registration',
},
{
  id:'engNo',
  name:'Engine Number',
},
{
  id:'chaNo',
      name:'Chasis Number',
},
{
  id:'mopa',
  name:'Motor Od Premium Amount',
},
{
  id:'mtpa',
  name:'Motor Tp Premium Amount',
}

   
  ]
  
  // Fields for Common Fields

  const commonInfo = [
    {
      id: "lob",
      name: "Line of Business",
      req: true,
      isDrp: true,
      drpVal: line
    },
    {
      id: "insPro",
      name: "Insurance Product",
      req: true,
      isDrp: true,
      drpVal: ip
    },

    {
      id: "insTyp",
      name: "Insurance Type",
      req: true,
      isDrp: true,
      drpVal: it
    },
    {
      id: "busBy",
      name: "Business By",
      req: true,
      inpTyp: "text"
    },
    {
      id: "des",
      name: "Description",
      inpTyp: "text"
    },
    {
      id: "covNotNo",
      name: "Cover Note Number",
      inpTyp: "number"
    },
    {
      id: "retDate",
      name: "Retroactive Data",
      inpTyp: "date"
    },
    {
      id: "bqp",
      name: "BQP",
      inpTyp: "text"
    },
    {
      id: "riskLoc",
      name: "Risk Location",
      inpTyp: "text"
    },
    {
      id: "assCov",
      name: "Assets Covered",
      inpTyp: "text"
    },
    {
      id: "deductible",
      name: "Deductible",
      inpTyp: "number"
    },
    {
      id: "finName",
      name: "Financiar Name",
      inpTyp: "text"
    },
    {
      id: "entDate",
      name: "Entry Date",
      inpTyp: "date"
    },
    {
      id: "insdTyp",
      name: "Insured Type",
      inpTyp: "text"
    },
    {
      id: "cliId",
      name: "Client Id",
      inpTyp: "text"
    }
  ];

  const insurerInfo = [
    {
      id: "insdNam",
      name: "Insured Name",
      req: true,
      inpTyp: "text"
    },
    {
      id: "insdAdd",
      name: "Insured Address",
      req: true,
      inpTyp: "text"
    },
    {
      id: "insurer",
      name: "Insurer",
      req: true,
      isDrp: true,
      drpVal: insurerData
    },
    {
      id: "insAdd",
      name: "Insurer Address",
      req: true,
      inpTyp: "text"
    },
    {
      id: "polSd",
      name: "Policy Start Date",
      req: true,
      inpTyp: "date"
    },
    {
      id: "polEd",
      name: "Policy End Date",
      req: true,
      inpTyp: "date"
    },
    {
      id: "polNo",
      name: "Policy Number",
      req: true,
      inpTyp: "text"
    },
    {
      id: "mobNo",
      name: "Mobile Number",
      req: true,
      inpTyp: "number"
    },
    {
      id: "prevPolNo",
      name: "Previous Policy Number",
      req: true,
      inpTyp: "text"
    },
    {
      id: "prevIns",
      name: "Previous Insurer",
      inpTyp: "text"
    },
    {
      id: "panNo",
      name: "Pan Number",
      inpTyp: "number"
    }
  ];

  const premiumInfo = [
    {
      id:'premium',
      name:"Premium",
      inpTyp:'number'
    },
    {
      id:'gst',
      name:'GST',
      inpTyp:'number'
    },
    {
      id:'groPre',
      name:"Gross Premium",
      inpTyp:"number",
      req:true
    },
    {
      id:'totCom',
      name:'Total Commission',
      inpTyp:'number',

    },

    {
      id:'sumIns',
      name:'Sum Insured',
      inpTyp:'number',
      req:true
    },

    {
      id:'mop',
      name:'Mode Of Payment',
      inpTyp:'text',

    }

  ]


  const motorInfo = [
    {
      id:'regNo',
      name:'Registration Number',
      inpTyp:'text',
      req:true
    },
    {
      id:'vehMake',
      name:'Vehicle Make',
      inpTyp:'text',
      req:true
    },

    {
      id:'model',
      name:'Model',
      req:true,
      inpTyp:'text'
    },
    {
      id:'yor',
      name:'Year of Registration',
      req:true,
      inpTyp:'text'
    },
    {
      id:'engNo',
      name:'Engine Number',
      req:true,
      inpTyp:'text'
    }, 
    {
      id:'chaNo',
      name:'Chasis Number',
      req:true,
      inpTyp:'text'
    },
    {
      id:'mopa',
      name:'Motor Od Premium Amount',
      req:true,
      inpTyp:'number'
    },
    {
      id:'mtpa',
      name:'Motor Tp Premium Amount',
      req:true,
      inpTyp:'number'
    },
    {
      id:'odBro',
      name:'Od Brokerage Rate',
      inpTyp:'number'
    },
    {
      id:'tpBro',
      name:"Tp Brokerage Rate",
      inpTyp:'number'
    },
    {
      id:'odCom',
      name:"Od Commission",
      inpTyp:'number',

    },
    {
      id:'tpCom',
      name:'Tp Commission',
      inpTyp:'number'
    }
  ]
  useEffect(() => {
    axios
      .get(`${API_ENDPOINT}/configurable/get`, {
        auth: {
          username: name,
          password: Password
        },
        params: {
          fieldName: "lob",
          property: "policy"
        }
      })
      .then((response) => {
        console.log(response.data);
      const values = response.data.map(item => item.value);

        setLine(values);
      });
  
    axios
      .get(`${API_ENDPOINT}/configurable/get`, {
        auth: {
          username: name,
          password: Password
        },
        params: {
          property: "policy",
          fieldName: "lob",
          value: nameData.lob,
        }
      })
      .then((response) => {
        console.log(response.data);
      const values = response.data.map(item => item.insuranceProduct);

        setIp(values);
      });
      axios
      .get(`${API_ENDPOINT}/configurable/get`, {
        auth: {
          username: name,
          password: Password
        },
        params: {
          property: "policy",
          fieldName: "lob",
          value:nameData.lob,
          insuranceProduct:nameData.insPro
        }
      })
      .then((response) => {
        console.log(response.data);
      const values = response.data.map(item => item.insuranceType);

        setIt(values);
      });
    axios
      .get(`${API_ENDPOINT}/configurable/get`, {
        auth: {
          username: name,
          password: Password
        },
        params: {
          fieldName: "insurer",
          property: "policy"
        }
      })
      .then((response) => {
        console.log(response.data);
        const values = response.data.map(item=>item.value)
        setInsurerData(values);
      });
  }, [API_ENDPOINT, Password, name, nameData]);
  const handleChange = (e) => {
    const value = e.target.value;
    setNameData({
      ...nameData,
      [e.target.name]: value
    });
  };


  const handleCheck = ()=>{
    if(Object.keys(nameData).includes(
      "lob"&&
      "insPro"&&
      "insTyp"&&
      "busBy"&&
      "insdNam"&&
      "insurer"&&
      "insAdd"&&
      "polSd"&&
      "polEd"&&
      "polNo"&&
      "mobNo"&&
      "prevPolNo"&&
      "groPre"&&
      "sumIns"&&
      "regNo"&&
      "vehMake"&&
      "model"&&
      "yor"&&
      "engNo"&&
      "chaNo"&&
      "mopa"&&
      "mtpa"
     
  )&&nameData&&nameData.lob.length>0&&nameData.insPro.length>0&&nameData.insTyp.length>0&&nameData.busBy.length>0&&nameData.insdNam.length>0&&nameData.insurer.length>0&&nameData.insAdd.length>0&&nameData.polSd.length>0&&nameData.polEd.length>0&&nameData.polNo.length>0&&nameData.mobNo.length>0&&nameData.prevPolNo.length>0&&nameData.groPre.length>0&&nameData.sumIns.length>0&&nameData.regNo.length>0&&nameData.vehMake.length>0&&nameData.model.length>0&&nameData.yor.length>0&&nameData.engNo.length>0&&nameData.chaNo.length>0&&nameData.mopa.length>0&&nameData.mtpa.length>0) {
      setMakeApiCall(true)
    }
    else {
      setMakeApiCall(false)
    }
  }
  
  useEffect(()=>{
    if(Object.keys(nameData).includes(
      "lob"&&
      "insPro"&&
      "insTyp"&&
      "busBy"&&
      "insdNam"&&
      "insurer"&&
      "insAdd"&&
      "polSd"&&
      "polEd"&&
      "polNo"&&
      "mobNo"&&
      "prevPolNo"&&
      "groPre"&&
      "sumIns"&&
      "regNo"&&
      "vehMake"&&
      "model"&&
      "yor"&&
      "engNo"&&
      "chaNo"&&
      "mopa"&&
      "mtpa"
     
  )&&nameData&&nameData.lob.length>0&&nameData.insPro.length>0&&nameData.insTyp.length>0&&nameData.busBy.length>0&&nameData.insdNam.length>0&&nameData.insurer.length>0&&nameData.insAdd.length>0&&nameData.polSd.length>0&&nameData.polEd.length>0&&nameData.polNo.length>0&&nameData.mobNo.length>0&&nameData.prevPolNo.length>0&&nameData.groPre.length>0&&nameData.sumIns.length>0&&nameData.regNo.length>0&&nameData.vehMake.length>0&&nameData.model.length>0&&nameData.yor.length>0&&nameData.engNo.length>0&&nameData.chaNo.length>0&&nameData.mopa.length>0&&nameData.mtpa.length>0) {
      setMakeApiCall(true)
    }
    else {
      setMakeApiCall(false)

    }
  },[nameData])


  const handleSubmit = (e) => {
    e.preventDefault();
    
     // Check for empty required fields
     const emptyFields = [];
     requiredFields.forEach((field) => {
       if (!nameData[field.id]) {
         emptyFields.push(field.name); // Push the field name instead of the ID
       }
     });
 
     // If there are empty required fields, show toast error message
     if (emptyFields.length > 0) {
       toast.error(`Please fill in the required fields: ${emptyFields.join(', ')}`, {
         position: toast.POSITION.TOP_RIGHT,
         autoClose: 5000 // Set autoClose duration
       });
     } else {
       // Submit form logic here
       console.log('Form submitted successfully');
     }
    
    console.log('error',emptyFields)
    handleCheck()

    const userData = {
      property: "policy",



      lineOfBusiness: nameData.lob,
      insuranceProduct: nameData.insPro,
      insuranceType: nameData.insTyp,
      businessBy: nameData.busBy,
      insuredName: nameData.insdNam,
      insuredAddress: nameData.insdAdd,
      insurer: nameData.insurer,
      insurerAddress: nameData.insAdd,
      policyStartDate: nameData.polSd,
      policyEndDate: nameData.polEd,
      policyNo: nameData.polNo,
      registrationNo: nameData.regNo,
      vehicleMake: nameData.vehMake,
      model: nameData.model,
      yearOfRegistration: nameData.yor,
      engineNo: nameData.engNo,
      chassisNo: nameData.chaNo,
       description: nameData.des,
      sumInsured: nameData.sumIns,
      motorOdPremiumAmount: nameData.mopa,
      motorTpPremiumAmount: nameData.mtpa,
      premium: nameData.premium,
      gst: nameData.gst,
      grossPremium: nameData.groPre,
      odBrokerageRate: nameData.odBro,
      tpBrokerageRate: nameData.tpBro,
      odCommission: nameData.odCom,
      tpCommission: nameData.tpCom,
      // brokerageEligible: nameData.Brokerage_Eligible,
      // brokerageReceived: nameData.Brokerage_Received,
      // rewardEligible: nameData.Reward_Eligible,
      // rewardReceived: nameData.Reward_Received,
      totalCommission: nameData.totCom,

      previousPolicyNumber: nameData.prevPolNo,
      previousInsurer: nameData.prevIns,
      coverNoteNumber: nameData.covNotNo,
      modeOfPayment: nameData.mop,
      retroactiveDate: nameData.retDate,
      BQP: nameData.bqp,
      riskLocation: nameData.riskLoc,
      assetsCovered: nameData.assCov,
      panNo: nameData.panNo,
      Deductible: nameData.deductible,
      financierName: nameData.finName,
      mobileNo: nameData.mobNo,
      entryDate: nameData.entDate,
      insuredType: nameData.insdTyp,
      clientId: nameData.cliId
    };
    makeApiCall&&axios
      .post(`${API_ENDPOINT}/save/policy`, userData, {
        auth: {
          username: name,
          password: Password
        }
      })
      .then((response) => {
        console.log(response.status);
        console.log(response.data.token);
        if (response.status === 200) {
          setSheetData(true);
          toast.success("Policy Added Successfully")
        }
      });
  };

  function handleFileChange(event) {
    setFile(event.target.files[0]);
    setIsUpload(true)
  }
  const [on, setOn] = useState(false);
  function handleFileSubmit(event) {
    event.preventDefault();
    setOn(true);
    const url = `${API_ENDPOINT}/upload`;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", file.name);
    const config = {
      headers: {
        "content-type": "multipart/form-data"
      },
      auth: {
        username: name,
        password: Password
      }
    };
    axios.post(url, formData, config).then((response) => {
      console.log(response.data);
      setSheet(true);
      setOn(false);
      setMsg(response.data.message);
      setReas(response.data.reason);
    });
  }
  return (
    <div className="w-full">
        <ToastContainer />
      <div className="bg-back">
        <h3 className="pl-10 pt-10 text-3xl font-bold">Policies</h3>

        {/* <Tab1 onFileUploaded={(e)=> handleFileUploaded(e)}/> */}
        <form onSubmit={handleFileSubmit}>
          <input
            type="file"
            onChange={handleFileChange}
            className="text-sm p-10
            file:mr-5 file:py-2 file:px-6
            file:rounded-full file:border-0
            file:text-sm file:font-medium
            
            hover:file:cursor-pointer "
          />

          {!on && (
            <button
              type="submit"
              className={`${isUpload?'bg-hero':'bg-[#78c49e] cursor-not-allowed opacity-80'} inline-block px-6 py-2.5  text-white font-medium text-xs leading-tight uppercase rounded shadow-md  hover:shadow-lg hover:text-black focus:shadow-lg focus:outline-none `}
           disabled={isUpload?false:true}
           >
              Upload
            </button>
          )}
          {on && (
            <button
              type="submit"
              disabled
              className="inline-block px-6 py-2.5 bg-[#EBEBE4] text-black font-medium text-xs leading-tight uppercase rounded  hover:text-black focus:shadow-lg focus:outline-none "
            >
              Uploading...
            </button>
          )}
           <button
           onClick={handleSubmit}
              type="submit"
              className="inline-block ml-5 px-6 py-2.5 bg-hero text-white font-medium text-xs leading-tight uppercase rounded shadow-md  hover:shadow-lg hover:text-black focus:shadow-lg focus:outline-none "
            >
              Submit
            </button>
        </form>

        {sheet && (
          <p className="text-[#9ACD32] text-md text-left pl-10">
            {msg}
            {reas}
          </p>
        )}

        <div className="w-full">
          <ul className="flex items-center   justify-center w-full ">
            {tablen.map((item, key) => (
              <li
                onClick={() => {
                  setTabValue(item.id);
                  setOpenTab1(tabValue !== key + 1 && !openTab1);
                }}
                className={
                  "text-center text-xs font-bold uppercase w-60  px-5 py-3  flex-auto block" +
                  (tabValue === key + 1
                    ? "text-white border-b-2 border-hero"
                    : "text-black bg-back")
                }
              >
                {item.name}
              </li>
            ))}
          </ul>
        </div>

        <form className="flex mt-5 " onChange={handleChange}>
          <div className="w-full flex ">
            <div className={openTab1 ? "flex w-full  " : "hidden"} id="link1">
              <div className="w-full  relative ">
                {commonInfo.map((item, key) => (
                  <>
                    <div className="flex  relative w-full  pb-10 items-center ">
                      <label className="w-max font-semibold" htmlFor={item.id}>
                        {item.name} : <span className={` ${item.req?'':'hidden'} text-[#cc5050]`}>*</span>
                      </label>
                      <div className="flex flex-1"></div>
                      <input
                      onChange={handleChange}
                        type={item.inpTyp}
                        id={item.id}
                        name={item.id}
                        className={`${item.isDrp ? "hidden" : ""} ${
                          item.inpTyp === "date" ? "absolute right-0 " : ""
                        } w-80 focus:outline-none focus:text-gray-600  p-2  border border-gray rounded shadow `}
                      />

                      <select
                         id={item.id}
                         name={item.id}
                        // onChange={(e) => setValuee(e.target.value)}
                        className={`${
                          item.isDrp ? "block" : "hidden"
                        }  w-80 px-4 py-2 mt-2 text-gray-700 uppercase bg-white border border-gray mb-5 rounded shadow  focus:border-blue-500 focus:outline-none focus:ring`}
                      >
                        <option value="">{`Select ${item.name}`}</option>
                        {item.drpVal &&
                          item.drpVal.map((item) => (
                            <option value={item}>{item}</option>
                          ))}
                      </select>
                    </div>
                  </>
                ))}
              </div>
            </div>
            <div
              className={openTab1 ? "flex  " : "hidden"}
              id="link1"
            >
              <div className="w-full pl-28  relative ">
                {insurerInfo.map((item, key) => (
                  <>
                    <div className="flex relative w-full gap-10 pb-10 items-center ">
                      <label className="w-max font-semibold" htmlFor={item.id}>
                        {item.name} : <span className={` ${item.req?'':'hidden'} text-[#cc5050]`}>*</span>
                      </label>
                      <div className="flex flex-1"></div>
                      <input
                        type={item.inpTyp}
                        id={item.id}
                        name={item.id}
                        className={`${item.isDrp ? "hidden" : ""} ${
                          item.inpTyp === "date" ? "absolute right-0 " : ""
                        } w-80 focus:outline-none focus:text-gray-600  p-2  border border-gray rounded shadow `}
                      />

                      <select
                         id={item.id}
                         name={item.id}
                        // onChange={(e) => setValuee(e.target.value)}
                        className={`${
                          item.isDrp ? "block" : "hidden"
                        }  w-80 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray mb-5 rounded shadow  focus:border-blue-500 focus:outline-none focus:ring`}
                      >
                        <option value="">{`Select ${item.name}`}</option>
                        {item.drpVal &&
                          item.drpVal.map((item) => (
                            <option value={item}>{item}</option>
                          ))}
                      </select>
                    </div>
                  </>
                ))}
              </div>
            </div>

         
          </div>

          <div className="w-full flex gap-20">
            <div className={openTab1 ? "hidden   " : "flex w-full"} id="link1">
              <div className="w-full  relative ">
                {premiumInfo.map((item, key) => (
                  <>
                    <div className="flex  relative w-full  pb-10 items-center ">
                      <label className="w-max font-semibold" htmlFor={item.id}>
                        {item.name} : <span className={` ${item.req?'':'hidden'} text-[#cc5050]`}>*</span>
                      </label>
                      <div className="flex flex-1"></div>
                      <input
                        type={item.inpTyp}
                        id={item.id}
                        name={item.id}
                     
                        className={`${item.isDrp ? "hidden" : ""} ${
                          item.inpTyp === "date" ? "absolute right-0 " : ""
                        } w-80 focus:outline-none focus:text-gray-600  p-2  border border-gray rounded shadow `}
                      />

                     
                    </div>
                  </>
                ))}
              </div>
            </div>
            <div
              className={openTab1 ? "  hidden" : " flex"}
              id="link1"
            >
              <div className="w-full  relative ">
                {motorInfo.map((item, key) => (
                  <>
                    <div className="flex relative w-full gap-10 pb-10 items-center ">
                      <label className="w-max font-semibold" htmlFor={item.id}>
                        {item.name} : <span className={` ${item.req?'':'hidden'} text-[#cc5050]`}>*</span>
                      </label>
                      <div className="flex flex-1"></div>
                      <input
                        type={item.inpTyp}
                        id={item.id}
                        name={item.id}
                        className={`${item.isDrp ? "hidden" : ""} ${
                          item.inpTyp === "date" ? "absolute right-0 " : ""
                        } w-80 focus:outline-none focus:text-gray-600  p-2  border border-gray rounded shadow `}
                      />

         
                    </div>
                  </>
                ))}
              </div>
            </div>

         
          </div>
        </form>
      </div>
    </div>
  );
};

export default function TabsRender() {
  return (
    <div className="w-full pl-30">
      <Tabs />
    </div>
  );
}
