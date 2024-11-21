import React, { useState, useEffect } from "react";
import axios from "axios";

const ClaimTabsTemp = () => {
  const [activeTab1, seTactiveTab1] = useState(true);
  const [inputs, setInputs] = useState([]);
  const [tabData, setTabData] = useState([]);
  const [showErrorMessages, setShowErrorMessages] = useState(false)
  const [makeApiCall, setMakeApiCall] = useState(false)
  const [sheetData, setSheetData] = useState(false);
  const [on, setOn] = useState(true);
  const [sheet, setSheet] = useState(false);
  const [file, setFile] = useState();
  const [msg, setMsg] = useState("");
  const [reas, setReas] = useState("");
  const [line, setLine] = useState([]);
  const [ins, setIns] = useState([]);
  const [clms, setClms] = useState([]);
  const [brok, setBrok] = useState([]);
  const [ci, setCi] = useState([]);

  const API_ENDPOINT = process.env.REACT_APP_API_URL;
  const name = JSON.parse(localStorage.getItem("namee"));
  const Password = JSON.parse(localStorage.getItem("pwd"));

  const handleChange = (e) => {
    const name = e.target.name;

    const value = e.target.value;

    setInputs((values) => ({
      ...values,
      [name]: name === "registered" ? e.target.id : value
    }));
  };
                /* ----------------- Api To Get Dropdown Values ------------------------ */
  useEffect(() => {
    axios
      .get(`${API_ENDPOINT}/configurable/get`, {
        auth: {
          username: name,
          password: Password
        },
        params: {
          fieldName: "lob",
          property: "claims"
        }
      })
      .then((response) => {
        setLine(response.data);
      });
    axios
      .get(`${API_ENDPOINT}/configurable/get`, {
        auth: {
          username: name,
          password: Password
        },
        params: {
          fieldName: "insurer",
          property: "claims"
        }
      })
      .then((response) => {
        setIns(response.data);
      });
    axios
      .get(`${API_ENDPOINT}/configurable/get`, {
        auth: {
          username: name,
          password: Password
        },
        params: {
          property: "claims",
          fieldName: "claimSta"
        }
      })
      .then((response) => {
        setClms(response.data);
      });
    axios
      .get(`${API_ENDPOINT}/configurable/get`, {
        auth: {
          username: name,
          password: Password
        },
        params: {
          property: "claims",
          fieldName: "brokerage"
        }
      })
      .then((response) => {
        setBrok(response.data);
      });
    axios
      .get(`${API_ENDPOINT}/configurable/get`, {
        auth: {
          username: name,
          password: Password
        },
        params: {
          property: "claims",
          fieldName: "cI"
        }
      })
      .then((response) => {
        setCi(response.data);
      });
  }, []);
    /* -------------------------------------------------------------- */

    /* ---------------------------- Form Data --------------------------- */
  const tab1Data = [
    {
      id: 1,
      labNam: "Insured Name ",
      type: "text",
      inId: "Insured_Name",
      inpTyp: "normal",
      plac: "Insured Name"
    },
    {
      id: 2,
      labNam: "Insurer",
      inpTyp: "dropdown",
      inId: "Insurer",
      type: "dropDown",
      dropArr: ins
    },
    {
      id: 3,
      labNam: "Date of Loss",
      type: "date",
      inId: "Date_Of_Loss",
      inpTyp: "normal",
      plac: "xyz@gmail.com"
    },
    {
      id: 4,
      labNam: "Intimation Date",
      type: "date",
      inId: "Intimation_Date",
      inpTyp: "normal",
      plac: "xyz@gmail.com"
    },
    {
      id: 5,
      labNam: "Line of Business ",
      inpTyp: "dropdown",
      inId: "Line_Of_Business",
      type: "dropDown",
      dropArr: line
    },
    {
      id: 6,
      labNam: "Claims Amount",
      type: "number",
      inId: "Claims_Amount",
      inpTyp: "normal",
      plac: "145235"
    },
    {
      id: 7,
      labNam: "Policy Number",
      type: "text",
      inId: "Policy_Number",
      inpTyp: "normal",
      plac: "158968752"
    },

    {
      id: 8,
      labNam: "Claims Status ",
      inpTyp: "dropdown",
      inId: "Claims_Status",
      type: "dropDown",
      dropArr: clms
    },
    {
      id: 9,
      labNam: "Surveyor Appointed",
      type: "text",
      inId: "Surveyor_Appointed",
      inpTyp: "normal",
      plac: "yes"
    },
    {
      id: 10,
      labNam: "Intimation Amount ",
      type: "text",
      inId: "Intimation_Amount",
      inpTyp: "normal",
      plac: "968455"
    },
    {
      id: 11,
      labNam: "Brokerage",
      inpTyp: "dropdown",
      inId: "Brokerage",
      type: "dropDown",
      dropArr: brok
    },
    {
      id: 12,
      labNam: "Rewards",
      type: "number",
      inId: "Rewards",
      inpTyp: "normal",
      plac: " 78596"
    },
    {
      id: 13,
      labNam: "Settlement amount",
      type: "number",
      inId: "Settlement_Amount",
      inpTyp: "normal",
      plac: " 78596"
    },
    {
      id: 13,
      labNam: "Client ID  ",
      inId: "Client_Id",
      inpTyp: "dropdown",
      dropArr: ci
    },
    {
      id: 10,
      labNam: "Entry Date",
      type: "date",
      inId: "Entry_Date",
      inpTyp: "normal",
      plac: "xyz@gmail.com"
    }
  ];

  useEffect(() => {
    if (activeTab1) {
      setTabData(tab1Data);
    }
  }, [activeTab1]);


  useEffect(()=>{
    if(Object.keys(inputs).length===15) {
      setMakeApiCall(true)
    }
  },[inputs])
console.log('input',Object.keys(inputs).length)
                /* ----------------------- Handle for Submitting the Form Data ------------------------- */

  const handleSubmit = (e) => {
    e.preventDefault();

    if(Object.keys(inputs).length!==15) {
      setShowErrorMessages(true)
    }else {
      setShowErrorMessages(false)
    }
    const userData = {
      lineOfBusiness: inputs.Line_Of_Business,
      insurer: inputs.Insurer,
      insuredName: inputs.Insured_Name,
      dateOfLoss: inputs.Date_Of_Loss,
      intimationDate: inputs.Intimation_Date,
      claimsAmount: inputs.Claims_Amount,
      policyNumber: inputs.Policy_Number,
      claimStatus: inputs.Claims_Status,
      surveyorAppointed: inputs.Surveyor_Appointed,
      intimationAmount: inputs.Intimation_Amount,
      brokerage: inputs.Brokerage,
      rewards: inputs.Rewards,
      settlementAmount: inputs.Settlement_Amount,
      clientId: inputs.Client_Id,
      entryDate: inputs.Entry_Date
    };
    makeApiCall&& axios
      .post(`${API_ENDPOINT}/save/claim`, userData, {
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
        }
      });
  };

            /* --------------------------------------------------------- */

            /* ---------------------------------- Handle for submitting data through Excel Sheet ------------------ */
  function handleFileChange(event) {
    setFile(event.target.files[0]);
  }

  function handleFileSubmit(event) {
    event.preventDefault();
    setOn(false);
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
      setOn(true);
      setMsg(response.data.message);
      setReas(response.data.reason);
    });
  }

  return (
    <div className="w-full">
      <div className="bg-back">
        <h3 className="pl-10 pt-10 text-3xl font-bold">Claims</h3>

        {/* <Tab1 onFileUploaded={(e)=> handleFileUploaded(e)}/> */}
        {/* <form onSubmit={handleFileSubmit}>
          <input
            type="file"
            onChange={handleFileChange}
            className="text-sm p-10
            file:mr-5 file:py-2 file:px-6
            file:rounded-full file:border-0
            file:text-sm file:font-medium
            
            hover:file:cursor-pointer "
          />

          <button
            type="submit"
            onClick={handleFileSubmit}
            className={`inline-block px-6 py-2.5 ${
              !on ? "bg-[#EBEBE4] text-black" : "bg-hero text-white"
            }  font-medium text-xs leading-tight uppercase rounded shadow-md  hover:shadow-lg hover:text-black focus:shadow-lg focus:outline-none `}
          >
            {on ? "Upload " : " Uploading..."}
          </button>
        </form>

        {sheet && (
          <p className="text-[#9ACD32] text-md text-left pl-10">
            {msg}
            {reas}
          </p>
        )} */}
      </div>
      {/*  ---------------------  The Form Entry Start Here ----------------------- */}
      <div className=" mx-52">
        <div className="flex justify-center font-bold text-xs  ga items-center w-full m-auto">
          <button
            className={`${
              activeTab1 ? "border-b-2 border-hero" : ""
            }  w-full pb-2`}
            onClick={() => seTactiveTab1(true)}
          >
            TAB 1
          </button>
          <div className="flex flex-1 w-full"></div>
          <button
            className={` ${
              activeTab1 ? "" : "border-b-2 border-hero"
            } o w-full pb-2`}
            onClick={() => seTactiveTab1(false)}
          >
            TAB 2
          </button>
        </div>
      </div>

      <form action="" onChange={handleChange} className="mx-48 pt-4">
        <div className=" w- ">
          {tabData.map((item, key) => (
            <div
              className={`${
                activeTab1 ? key > 6 && "hidden" : key < 7 && "hidden"
              } flex items-center relative justify-center pb-10`}
              id={item.inId}
              key={key}
            >
              {"normal".includes(item.inpTyp) ? (
                <>
                  <label htmlFor="">{item.labNam}</label>
                  <span className="text-[#f45138] pl-2"> *</span>
                  <div className="flex flex-1"></div>
                  <div className="md:w-2/3 max-w-sm mx-auto  ">
                    <div
                      className={`${
                        item.type == "date" ? "absolute -top-3" : ""
                      } `}
                    >
                      <input
                        type={item.type}
                        id={item.inId}
                        defaultValue={inputs.inId}
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
                        //   onChange={(e) => setLosofbus(e.target.value)}
                        className="block w-96 p-2   text-gray-700 bg-white   border-gray  rounded shadow border-2   focus:border-blue-500   focus:outline-none focus:ring"
                      >
                        <option value="">Select Title</option>
                        {item.dropArr.map((item) => (
                          <option value={item.value}>{item.value}</option>
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

          <div
            className={` ${
              activeTab1 ? "hidden" : ""
            } flex space-x-2 justify-center  pt-5`}
          >
            <button
              onClick={handleSubmit}
              type="submit"
              className="inline-block px-6 py-2.5 bg-hero text-white font-medium text-xs leading-tight uppercase rounded shadow-md  hover:shadow-lg hover:text-black focus:shadow-lg focus:outline-none "
            >
              submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ClaimTabsTemp;
