import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LeadsTabsTemp = () => {
  const [activeTab1, seTactiveTab1] = useState(true);
  const [inputs, setInputs] = useState( {
    name: '',
    email: '',
    lob: '',
    busby: '',
    contactNo: '',
    instyp: '',
    requirement: '',
    leaSta: '',
    comments: '',
    notConvertedReason:'',
    submitDate: '',
    referredBy:''
  });
  const [tabData, setTabData] = useState([]);
  const [ls, setLs] = useState([]);
  const [instyp, setInstyp] = useState([]);
  const [bb, setBb] = useState([]);
  const [lob, setLob] = useState([]);
  const [sheetData, setSheetData] = useState(false);
  const [file, setFile] = useState();
  const [diffVal, setDiffVal] = useState('')
  const [showErrorMessages, setShowErrorMessages] = useState(false)
const [makeApiCall, setMakeApiCall] = useState(false)
  const API_ENDPOINT = process.env.REACT_APP_API_URL;
  const name = JSON.parse(localStorage.getItem("namee"));
  const Password = JSON.parse(localStorage.getItem("pwd"));

  const handleChange = (e) => {
    const name = e.target.name;

    const value = e.target.value;
    setDiffVal()
    setInputs((values) => ({
      ...values,
      [name]: name === "registered" ? e.target.id : value
    }));
  };

  // useEffect(()=>{
  //     setBb([
  //       {
  //           "id": 89,
  //           "fieldName": "BUSINESSBY",
  //           "value": "PREETH",
  //           "property": "LEADS",
  //           "accessApplicable": true
  //       }
  //   ])
  //   },[])
    

  // },[])

  useEffect(() => {
    axios
      .get(`${API_ENDPOINT}/configurable/get`, {
        auth: {
          username: name,
          password: Password
        },
        params: {
          fieldName: "lob",
          property: "leads"
        }
      })
      .then((response) => {
        console.log(response.data);
        setLob(response.data);
      });
    axios
      .get(`${API_ENDPOINT}/configurable/get`, {
        auth: {
          username: name,
          password: Password
        },
        params: {
          fieldName: "businessby",
          property: "leads"
        }
      })
      .then((response) => {
        console.log(response.data);
        setBb(response.data);
      });
    axios
      .get(`${API_ENDPOINT}/configurable/get`, {
        auth: {
          username: name,
          password: Password
        },
        params: {
          fieldName: "instyp",
          property: "leads"
        }
      })
      .then((response) => {
        console.log(response.data);
        setInstyp(response.data);
      });
    axios
      .get(`${API_ENDPOINT}/configurable/get`, {
        auth: {
          username: name,
          password: Password
        },
        params: {
          fieldName: "leasta",
          property: "leads"
        }
      })
      .then((response) => {
        console.log(response.data);
        setLs(response.data);
      });
  }, [API_ENDPOINT, Password, name]);


console.log('api Call',makeApiCall)

const handleCheck = ()=>{
  if(Object.keys(inputs).includes(
    "name"&&
    "email"&&
    "lob"&&
    "busby"&&
    "contactNo"&&
    "instyp"&&
    "leaSta"
)&&inputs.name.length>0&&inputs.email.length>0&&inputs.lob.length>0&&inputs.busby.length>0&&inputs.contactNo.length>0&&inputs.instyp&&inputs.leaSta.length>0) {
    setMakeApiCall(true)
    toast.success('Policy Entered Successfully')
  }
  else {
    toast.error('Please Enter Required Fields')
    setMakeApiCall(false)
  }
}

  useEffect(()=>{
    if(Object.keys(inputs).includes(
      "name"&&
      "email"&&
      "lob"&&
      "busby"&&
      "contactNo"&&
      "instyp"&&
      "leaSta"
  )&&inputs.name.length>0&&inputs.email.length>0&&inputs.lob.length>0&&inputs.busby.length>0&&inputs.contactNo.length>0&&inputs.instyp&&inputs.leaSta.length>0) {
      setMakeApiCall(true)
    }else{
      setMakeApiCall(false)
    }
   inputs.length>0&& handleCheck()
    setTimeout(()=>{
      setSheetData(sheetData&&false)
    },5000)

  },[ inputs,sheetData])

  useEffect(()=>{
    if(showErrorMessages||inputs.length<=0) {
      setSheetData(false)
    }
  
  },[showErrorMessages,inputs])
  

  useEffect(() => {
    const tab1Data = [

      {
        id: 2,
        labNam: "Name",
        type: "text",
        inId: "name",
        inpTyp: "normal",
       
        plac: "Banavath Preetham Kumar"
      },
      {
        id: 3,
        labNam: "Email",
        type: "text",
        inId: "email",
        inpTyp: "normal",
        plac: "xyz@gmail.com"
      },
      {
        id: 4,
        labNam: "Line of Business",
        inpTyp: "dropdown",
        inId: "lob",
        type: "dropDown",
        dropArr: lob
      },
      {
        id: 5,
        labNam: "Business By",
        inpTyp: "dropdown",
        inId: "busby",
        type: "dropDown",
        req:false,
        dropArr: bb
      },
      {
        id: 6,
        labNam: "Contact No",
        type: "text",
        inId: "contactNo",
        inpTyp: "normal",
        plac: "9658458875"
      },
      {
        id: 7,
        labNam: "Insurance Type",
        inpTyp: "dropdown",
        inId: "instyp",
        type: "dropDown",
        req:false,
        dropArr: instyp
      },
      {
        id: 8,
        labNam: "Requirement",
        type: "text",
        inId: "requirement",
        inpTyp: "normal",
        req:false,
        plac: "Requirement"
      },
      {
        id: 9,
        labNam: "Lead Status",
        inId: "leaSta",
        inpTyp: "dropdown",
        dropArr: ls
      },
      {
        id: 10,
        labNam: "Comments",
        type: "text",
        inId: "comments",
        inpTyp: "normal",
        req:false,
        plac: "Comment"
      },
      {
        id: 11,
        labNam: "Not Converted Reason",
        type: "text",
        inId: "notConvertedReason",
        inpTyp: "normal",
        req:false,
        plac: "Not Converted Reason"
      },
      {
        id: 11,
        labNam: "Submit Date",
        type: "date",
        inId: "submitDate",
        inpTyp: "normal",
        req:false,
        plac: ""
      },
      {
        id: 12,
        labNam: "Referred By",
        type: "text",
        inId:'referredBy',
        inpTyp: "normal",
        req:false,
        plac: ""
      }
     
    ];
      setTabData(tab1Data);
  }, [lob,bb,instyp,ls]);


  const handleSubmit = (e) => {
    e.preventDefault();
    handleCheck()

    if(Object.keys(inputs).includes(
      "name"&&
      "email"&&
      "lob"&&
      "busby"&&
      "contactNo"&&
      "instyp"&&
      "leaSta"
  )) {
      setShowErrorMessages(false)
    }else {
      setShowErrorMessages(true)
    }
    const userData = {
      lId: inputs.Id,
      name: inputs.name,
      email: inputs.email,
      lineOfBusiness: inputs.lob,
      businessBy: inputs.busby,
      contactNo: inputs.contactNo,
      insuranceType: inputs.instyp,
      requirement: inputs.requirement,
      leadStatus: inputs.leaSta,
      comment: inputs.comments,
      notConvertedReason:inputs.notConvertedReason,
      submitDate: inputs.submitDate,
      referredBy:inputs.referredBy
    };
    makeApiCall&&  axios
      .post(`${API_ENDPOINT}/save/leads`, userData, {
        auth: {
          username: name,
          password: Password
        }
      })
      .then((response) => {
        console.log(response.status);
        console.log(response.data.token);
        setSheetData(true)
        seTactiveTab1(true)
      
    
        setInputs(
          {
            name: '',
            email: '',
            lob: '',
            busby: '',
            contactNo: '',
            instyp: '',
            requirement: '',
            leaSta: '',
            comments: '',
            notConvertedReason:'',
            submitDate: '',
            referredBy:''
          }
        );
       
      });
  };

  function handleFileChange(event) {
    setFile(event.target.files[0]);
  }

  function handleFileSubmit(event) {
    event.preventDefault();
    if(inputs.length!==7) {
      setShowErrorMessages(true)
    }else{
      setShowErrorMessages(false)

    }
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
    });
  }

  return (
    <div className="w-full">
            <ToastContainer />
      <div className="bg-back">
        <h3 className="pl-10 pt-10 pb-5 text-3xl font-bold">Leads</h3>

      
      </div>
      {/*  ---------------------  The Form Entry Start Here ----------------------- */}
   

      <form action=""  className="mx-20 pt-5">
        <div className=" grid grid-cols-2 gap-x-20 ">
          {tabData.map((item, key) => (
            <div
              className={`   flex items-center relative justify-center pb-12`}
              id={item.inId}
              key={key}
            >
              {"normal".includes(item.inpTyp) ? (
                <>
                  <label htmlFor="">{item.labNam}</label>
                  <span className={`${item.req===false?'hidden':''} text-[#f45138] pl-2`}> *</span>
                  <div className="flex flex-1"></div>
                  <div className="md:w-2/3 max-w-sm mx-auto  ">
                    <div
                      className={`${
                        item.type == "date" ? "  -top-3" : ""
                      } `}
                    >
                      <input
                        type={item.type}
                        id={item.inId}
                        onChange={handleChange}
                        value={inputs[item.inId]}
                        className={`  w-96 focus:outline-none focus:text-gray-600  p-2    border-gray rounded shadow border-2`}
                        placeholder={`Ex : ${item.plac}`}
                        name={item.inId}
                      />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center w-full justify-center ">
                    <h2 className=" ">{item.labNam}</h2>
                  <span className="text-[#f45138] pl-2"> *</span>

                    <div className="flex flex-1"></div>

                    <div className=" ">
                      <select
                        id={item.inId}
                        name={item.inId}
                        onChange={handleChange}
                        value={inputs[item.inId]}

                        //   onChange={(e) => setLosofbus(e.target.value)}
                        className="block w-96 p-2   text-gray-700 bg-white   border-gray  rounded shadow border-2   focus:border-blue-500   focus:outline-none focus:ring"
                      >
                        <option value="">Select Title</option>
                        {console.log('dropda',item.dropArr)}
                        {item.dropArr.map((item) => (
                          <option                         value={inputs[item.inId]}
                          >{item.value}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}{" "}
          {sheetData && (
            <p className="text-[#9ACD32] text-md text-center pl-10">
              Details Uploaded Successfully
            </p>
          )}
            {showErrorMessages&&<p className="text-[#af3a3a] text-center font-semibold text-sm">Please Fill All Required Fields</p>}

         </div>
         </form>
       <div className="flex justify-center">

            <button
              onClick={handleSubmit}
              type="submit"
              className="text-center  px-6 py-2.5 bg-hero text-white font-medium text-xs leading-tight uppercase rounded shadow-md  hover:shadow-lg hover:text-black focus:shadow-lg focus:outline-none "
            >
              submit
            </button>
       </div>

    </div>
  );
};

export default LeadsTabsTemp;
