import React, { useState, useEffect } from "react";
import axios from "axios";
import InputPP from "./InputPP";

const EditModel = ({handleModel,idd,preData,handleDeleteCloseModell}) => {
  const [openTab1, setOpenTab1] = useState(true);
  const [sheetData, setSheetData] = useState(false);
  const [sheet, setSheet] = useState(false);
  const [file, setFile] = useState();
  const [loading, setLoading] = useState(false);
  const [content, setContent] = preData
  const required = true;
  const API_ENDPOINT = process.env.REACT_APP_API_URL;
  const [value, setValue] = useState();
  const [valuee, setValuee] = useState("");
  const [product, setProduct] = useState("");
  const [valueeee, setValueeee] = useState("");
  const [valueeeee, setValueeeee] = useState("");
  const [showModalPolicy, setShowModalPolicy] = handleModel
  ////................................................................/////
  //getting values from local storage lob

  ////................................................................/////
  const [nameData, setNameData] = useState({

  });

  const [msg, setMsg] = useState("");
  const [reas, setReas] = useState("");
  const [line, setLine] = useState([]);
  const [tabValue, setTabValue] = useState(1);
  const [insurerData, setInsurerData] = useState([]);
  const [it, setIt] = useState([]);
  const [ip, setIp] = useState([]);
  const name = JSON.parse(localStorage.getItem("namee"));
  const Password = JSON.parse(localStorage.getItem("pwd"));

  const tablen = [
    { id: 1, name: "TAB1" },
    { id: 2, name: "TAB2" },
    { id: 3, name: "TAB3" },
    { id: 4, name: "TAB4" }
  ];

console.log('shit',content,idd)

  // Fields for Common Fields

  const tab1Data = [
    {
      id: "lob",
      name: "Line of Business",
      req: true,
      isDrp: true,
      drpVal: line,
      defVal:content.lineOfBusiness
    },
    {
      id: "insPro",
      name: "Insurance Product",
      req: true,
      isDrp: true,
      drpVal: ip,
      defVal:content.insuranceProduct
    },

    {
      id: "insTyp",
      name: "Insurance Type",
      req: true,
      isDrp: true,
      drpVal: it,
      defVal:content.insuranceType
    },
    {
      id: "busBy",
      name: "Business By",
      req: true,
      inpTyp: "text",
      defVal:content.businessBy
    },
    // {
    //   id: "des",
    //   name: "Description",
    //   inpTyp: "text",
    //   defVal:content.
    // },
    {
      id: "covNotNo",
      name: "Cover Note Number",
      inpTyp: "number",
      defVal:content.coverNoteNumber
    },
    {
      id: "retDate",
      name: "Retroactive Data",
      inpTyp: "date",
      defVal:content.retroactiveDate
    },
    {
      id: "bqp",
      name: "BQP",
      inpTyp: "text",
      defVal:content.BQP
    },
    {
      id: "riskLoc",
      name: "Risk Location",
      inpTyp: "text",
      defVal:content.riskLocation
    },
    {
      id: "assCov",
      name: "Assets Covered",
      inpTyp: "text",
      defVal:content.assetsCovered
    },
    {
      id: "deductible",
      name: "Deductible",
      inpTyp: "number",
      defVal:content.deductible
    },
    {
      id: "finName",
      name: "Financiar Name",
      inpTyp: "text",
      defVal:content.financierName
    },
    {
      id: "entDate",
      name: "Entry Date",
      inpTyp: "date",
      defVal:content.entryDate
    },
    {
      id: "insdTyp",
      name: "Insured Type",
      inpTyp: "text",
      defVal:content.insuredType
    },
    {
      id: "cliId",
      name: "Client Id",
      inpTyp: "text",
      defVal:content.clientId
    }
  ];
  

  const tab2Data =  [
    {
      id: "insdNam",
      name: "Insured Name",
      req: true,
      inpTyp: "text",
      defVal:content.insuredName
    },
    {
      id: "insdAdd",
      name: "Insured Address",
      req: true,
      inpTyp: "text",
      defVal:content.insuredAddress
    },
    {
      id: "insurer",
      name: "Insurer",
      req: true,
      isDrp: true,
      drpVal: insurerData,
      defVal:content.insurer
    },
    {
      id: "insAdd",
      name: "Insurer Address",
      req: true,
      inpTyp: "text",
      defVal:content.insurerAddress
    },
    {
      id: "polSd",
      name: "Policy Start Date",
      req: true,
      inpTyp: "date",
      defVal:content.policyStartDate
    },
    {
      id: "polEd",
      name: "Policy End Date",
      req: true,
      inpTyp: "date",
      defVal:content.policyEndDate
    },
    {
      id: "polNo",
      name: "Policy Number",
      req: true,
      inpTyp: "text",
      defVal:content.policyNo
    },
    {
      id: "mobNo",
      name: "Mobile Number",
      req: true,
      inpTyp: "number",
      defVal:content.mobileNo
    },
    {
      id: "prevPolNo",
      name: "Previous Policy Number",
      req: true,
      inpTyp: "text",
      defVal:content.previousPolicyNumber
    },
    {
      id: "prevIns",
      name: "Previous Insurer",
      inpTyp: "text",
      defVal:content.previousInsurer
    },
    {
      id: "panNo",
      name: "Pan Number",
      inpTyp: "number",
      defVal:content.panNo
    }
  ]

  const tab3Data = [
    {
      id:'premium',
      name:"Premium",
      inpTyp:'number',
      defVal:content.premium
    },
    {
      id:'gst',
      name:'GST',
      inpTyp:'number',
      defVal:content.gst
    },
    {
      id:'groPre',
      name:"Gross Premium",
      inpTyp:"number",
      req:true,
      defVal:content.grossPremium
    },
    {
      id:'totCom',
      name:'Total Commission',
      inpTyp:'number',
      defVal:content.totalCommission

    },

    {
      id:'sumIns',
      name:'Sum Insured',
      inpTyp:'number',
      req:true,
      defVal:content.sumInsured
    },

    {
      id:'mop',
      name:'Mode Of Payment',
      inpTyp:'text',
      defVal:content.modeOfPayment

    }

  ]

  const tab4Data =  [
    {
      id:'regNo',
      name:'Registration Number',
      inpTyp:'text',
      req:true,
      defVal:content.registrationNo
    },
    {
      id:'vehMake',
      name:'Vehicle Make',
      inpTyp:'text',
      req:true,
      defVal:content.vehicleMake
    },

    {
      id:'model',
      name:'Model',
      req:true,
      inpTyp:'text',
      defVal:content.model
    },
    {
      id:'yor',
      name:'Year of Registration',
      req:true,
      inpTyp:'text',
      defVal:content.yearOfRegistration
    },
    {
      id:'engNo',
      name:'Engine Number',
      req:true,
      inpTyp:'text',
      defVal:content.engineNo
    }, 
    {
      id:'chaNo',
      name:'Chasis Number',
      req:true,
      inpTyp:'text',
      defVal:content.chassisNo
    },
    {
      id:'mopa',
      name:'Motor Od Premium Amount',
      req:true,
      inpTyp:'number',
      defVal:content.motorOdPremiumAmount
    },
    {
      id:'mtpa',
      name:'Motor Tp Premium Amount',
      req:true,
      inpTyp:'number',
      defVal:content.motorTpPremiumAmount
    },
    {
      id:'odBro',
      name:'Od Brokerage Rate',
      inpTyp:'number',
      defVal:content.odBrokerageRate
    },
    {
      id:'tpBro',
      name:"Tp Brokerage Rate",
      inpTyp:'number',
      defVal:content.tpBrokerageRate
    },
    {
      id:'odCom',
      name:"Od Commission",
      inpTyp:'number',
      defVal:content.odCommission

    },
    {
      id:'tpCom',
      name:'Tp Commission',
      inpTyp:'number',
      defVal:content.tpCommission
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
        setLine(response.data);
      });
    axios
      .get(`${API_ENDPOINT}/configurable/get`, {
        auth: {
          username: name,
          password: Password
        },
        params: {
          fieldName: "insuranceType",
          property: "policy"
        }
      })
      .then((response) => {
        console.log(response.data);
        setIt(response.data);
      });
    axios
      .get(`${API_ENDPOINT}/configurable/get`, {
        auth: {
          username: name,
          password: Password
        },
        params: {
          fieldName: "insuranceProduct",
          property: "policy"
        }
      })
      .then((response) => {
        console.log(response.data);
        setIp(response.data);
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
        setInsurerData(response.data);
      });
  }, []);
  const handleChange = (e) => {
    const value = e.target.value;
    setNameData({
      ...nameData,
      [e.target.name]: value
    });
  };



  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {



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
    axios
      .put(`${API_ENDPOINT}/edit?id=` + idd, userData, {
        auth: {
          username: name,
          password: Password,
        },
      })
      .then((response) => {

        console.log(response.status);
        setSheet(true)
        if (response.status === 200) {
          setLoading(true);
          setMsg('Details Uploaded Successfully')
        }
      });
  };

  
  return (
    <div className="justify-center items-center h-11/12 flex overflow-x-hidden bg-[rgba(0,0,0,.2)] bg-blend-darken overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
     
   
      <div className="bg-back  h-[80%] relative p-5 overflow-auto">
      
      <div className="cursor-pointer  font-semibold  w-5 float-right text-xl  "  onClick={(e)=>{
        handleDeleteCloseModell(e)
        setShowModalPolicy(!showModalPolicy)
      }}>
        X
      </div>
      <div className="mb-4 flex items-center justify-center ">

           <button
           onClick={handleSubmit}
           type="submit"
           className="   px-6 py-2.5 bg-hero text-white font-medium text-xs  rounded shadow-md  hover:shadow-lg   "
           > 
              Submit
            </button>

        {sheet && (
          <p className="text-[#9ACD32] text-md text-left pl-10">
            {msg}
            {reas}
          </p>
        )}
        </div>

        <div className="w-full">
          <ul className="flex items-center   justify-center w-full ">
            {tablen.map((item, key) => (
              <li
                onClick={() => {
                  setTabValue(key+1);
                  // setOpenTab1(tabValue !== key + 1 && !openTab1);
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

       <div className={`${tabValue==1?'grid grid-cols-2  gap-x-10':'hidden'}  `}>  

          <InputPP  dataInp={tab1Data}/>
       </div>
       <div className={`${tabValue==2?'grid grid-cols-2  gap-x-10':'hidden'}  `}>  

          <InputPP dataInp={tab2Data}/>
       </div>
     <div className="flex gap-x-10">

       <div className={`${tabValue==3?'grid grid-cols-2  gap-x-10':'hidden'}   `}>  

          <InputPP dataInp={tab3Data}/>
       </div>
       <div className={`${tabValue==4?'grid grid-cols-2  gap-x-10':'hidden'} `}>  

          <InputPP dataInp={tab4Data}/>
       </div>
     </div>
    </form>
      </div>
    </div>
  );
};

export default EditModel;
