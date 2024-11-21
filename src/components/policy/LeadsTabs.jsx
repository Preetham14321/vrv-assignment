import React from "react";
import { useState } from "react";
import Tab1 from "./Tab1";
import axios from "axios";
import { useEffect } from "react";
import { Context } from "../Context/Context";
const LeadsTabs = ({ color }) => {
  const [openTab, setOpenTab] = React.useState(1);
  const [sheetData, setSheetData] = useState(false);
  const [sheet, setSheet] = useState(false);
  const [file, setFile] = useState();
  const required = true;
  const API_ENDPOINT = process.env.REACT_APP_API_URL;
  const [value, setValue] = useState();
  const [valuee, setValuee] = useState("");
  const [product, setProduct] = useState("");
  const [valueeee, setValueeee] = useState("");
  const [valueeeee, setValueeeee] = useState("");
  const [losofbus, setLosofbus] = useState('')
  const [leadStatus, setLeadStatus] = useState("")
  const [busby, setBusby] = useState('')
  const [instype, setInstype] = useState()

  const [ls, setLs] = useState([])
  const [instyp, setInstyp] = useState([])
  const [bb, setBb] = useState([])
  const [lob, setLob] = useState([])
  ////................................................................/////
  //getting values from local storage lob

  ////................................................................/////
  const [nameData, setNameData] = useState({
    id:'',
    name:'',
    email:'',
    contactno:'',
    message:'',
    comments:'',
    submit_date:'',






  });
  let a = [
    "Branch",
    "Business_By",
    "Business_Type",
    "Department",
    "Gross_Premium",
    "Insurance_Class",
    "Insurance_Class_Desc",
    "Insurance_Product",
    "Insurance_Type",
    "Insurance_Type_Desc",
    "Insured_Name",
    "Insurer",
    "Location",
    "MOTOR_OD_PREMIUM_AMOUNT",
    "MOTOR_TP_PREMIUM_AMOUNT",
    "OD_Brokerage_rate",
    "Policy_Expiry_Date",
    "Policy_No",
    "Policy_Start_Date",
    "Policy_Type",
    "Sum_Insured",
    "TP_Brokerage_rate",
    "TP_commission",
    "Total_Commission",
  ];
  const [msg, setMsg] = useState("");
  const [reas, setReas] = useState("");
  const [line, setLine] = useState([]);
  const [it, setIt] = useState([]);
  const [ip, setIp] = useState([]);
  const name = JSON.parse(localStorage.getItem("namee"));
  const Password = JSON.parse(localStorage.getItem("pwd"));
  useEffect(() => {
    axios
      .get(`${API_ENDPOINT}/configurable/get`, {
        auth: {
          username: name,
          password: Password,
        },
        params: {
          fieldName: "lob",
         property: "leads"

        },
      })
      .then((response) => {
        console.log(response.data);
        setLob(response.data);
      });
    axios
      .get(`${API_ENDPOINT}/configurable/get`, {
        auth: {
          username: name,
          password: Password,
        },
        params: {
          fieldName: "businessby",
      property: "leads"

        },
      })
      .then((response) => {
        console.log(response.data);
        setBb(response.data);
      });
    axios
      .get(`${API_ENDPOINT}/configurable/get`, {
        auth: {
          username: name,
          password: Password,
        },
        params: {
          fieldName: "instyp",
      property: "leads"

        },
      })
      .then((response) => {
        console.log(response.data);
        setInstyp(response.data);
      });
    axios
      .get(`${API_ENDPOINT}/configurable/get`, {
        auth: {
          username: name,
          password: Password,
        },
        params: {
          fieldName: "leasta",
      property: "leads"

        },
      })
      .then((response) => {
        console.log(response.data);
        setLs(response.data);
      });
  }, []);
  const handleChange = (e) => {
    const value = e.target.value;
    setNameData({
      ...nameData,
      [e.target.name]: value,
    });
  };
  const handleSubmit = (e) => {
 
    e.preventDefault();
    const userData = {
      'lId':nameData.id,
      'name':nameData.name,
      'email':nameData.email,
      'lineOfBusiness':losofbus,
      'businessBy':busby,
      'contactNo':nameData.contactno,
      'insuranceType':instype,
      'message':nameData.message,
      'leadStatus':leadStatus,
      'comment':nameData.comments,
      'submitDate':nameData.submit_date,

     
    };
    axios
      .post(`${API_ENDPOINT}/save/leads`, userData, {
        auth: {
          username: name,
          password: Password,
        },
      })
      .then((response) => {
        console.log(response.status);
        console.log(response.data.token);
        if (response.status === 200) {
          setSheetData(true);
        }
      });
  };

  function handleFileChange(event) {
    setFile(event.target.files[0]);
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
        "content-type": "multipart/form-data",
      },
      auth: {
        username: name,
        password: Password,
      },
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
    <div className="">
      <div className="bg-back">
        <h3 className="pl-10 pt-10 text-3xl font-bold">Leads</h3>

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
              className="inline-block px-6 py-2.5 bg-hero text-white font-medium text-xs leading-tight uppercase rounded shadow-md  hover:shadow-lg hover:text-black focus:shadow-lg focus:outline-none "
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
        </form>

        {sheet && (
          <p className="text-[#9ACD32] text-md text-left pl-10">
            {msg}
            {reas}
          </p>
        )}

        <div className="flex flex-auto pl-30">
          <div className="w-full">
            <ul className="flex mb-0 list-none flex-wrap pt-3 pb-4 pl-10 flex-row items-center justify-center">
              <li
                className={
                  "-mb-px mr-2 last:mr-0  text-center text-xs font-bold uppercase  w-60 px-5 py-3  flex-auto block" +
                  (openTab === 1
                    ? "text-white border-b-2 border-hero"
                    : "text-black bg-back")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(1);
                }}
                href="#link1"
              >
                Tab1
              </li>
              <li
                className={
                  "-mb-px mr-2 last:mr-0  text-center text-xs font-bold uppercase w-60 px-5 py-3  flex-auto block" +
                  (openTab === 2
                    ? "text-white border-b-2 border-hero"
                    : "text-black bg-back")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(2);
                }}
                href="#link2"
              >
                Tab2
              </li>
              
            </ul>

            <div className="relative flex flex-col w-auto  break-words text-ellipsis pl-10 mb-6 ">
              <div className=" ">
                <form onSubmit={handleSubmit}>
                  <div className="tab-content ">
                    <div
                      className={openTab === 1 ? "block" : "hidden"}
                      id="link1"
                    >
                      <div className="md:flex space-y-4 md:space-y-0 w-full p-4  items-center">
                        <h2 className="md:w-1/3 max-w-sm mx-auto">
               ID
                          <span
                            className={required ? `text-[#f45138]` : "hidden"}
                          >
                            *
                          </span>
                        </h2>
                        <div className="flex flex-1 w-full"/>


                        <div className="md:w-2/3 max-w-sm mx-auto">
                          <input
                            type="text"
                            className="w-11/12 focus:outline-none focus:text-gray-600  p-2  border border-gray rounded shadow border-2"
                            placeholder="ex: Id"
                            name="id"
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <hr className="border-gray" />
                      <div className="md:inline-flex space-y-4 md:space-y-0 w-full p-4  items-center">
                        <h2 className="md:w-1/3 max-w-sm mx-auto">
                        Name
                          <span
                            className={required ? `text-[#f45138]` : "hidden"}
                          >
                            *
                          </span>
                        </h2>
                        <div className="md:w-2/3 max-w-sm mx-auto">
                          <div>
                          <input
                            type="text"
                            className="w-11/12 focus:outline-none focus:text-gray-600  p-2  border border-gray rounded shadow border-2"
                            placeholder="ex: Banavath Preetham Kumar"
                            name="name"
                            onChange={handleChange}
                          />
                          </div>
                        </div>
                      </div>
                      <hr className="border-gray" />
                      <div className="md:inline-flex space-y-4 md:space-y-0 w-full p-4  items-center">
                        <h2 className="md:w-1/3 max-w-sm mx-auto">
                        Email
                          <span
                            className={required ? `text-[#f45138]` : "hidden"}
                          >
                            *
                          </span>
                        </h2>
                        <div className="md:w-2/3 max-w-sm mx-auto">
                          <div className="md:w-2/3 max-w-sm mx-auto">
                          <input
                            type="text"
                            className="w-11/12 focus:outline-none focus:text-gray-600  p-2  border border-gray rounded shadow border-2"
                            placeholder="ex: xyz@gmail.com"
                            name="email"
                            onChange={handleChange}
                          />
                        </div>
                        </div>
                      </div>
                      <hr className="border-gray" />
                      <div className="md:inline-flex space-y-4 md:space-y-0 w-full p-4  items-center">
                        <h2 className="md:w-1/3 max-w-sm mx-auto">
                        Line of Business
                        </h2>
                        <div className="md:w-2/3 max-w-sm mx-auto">
                        <select
                              onChange={(e) => setLosofbus(e.target.value)}
                              className="block w-11/12 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray mb-5 rounded shadow border-2 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                            >
                              <option value="">Select Title</option>
                              {lob.map((item) => (
                                <option value={item.value}>{item.value}</option>
                              ))}
                            </select>
                        </div>
                      </div>
                      <hr className="border-gray" />
                      <div className="md:inline-flex space-y-4 md:space-y-0 w-full p-4  items-center">
                        <h2 className="md:w-1/3 max-w-sm mx-auto">
                        Business By
                          <span
                            className={required ? `text-[#f45138]` : "hidden"}
                          >
                            *
                          </span>
                        </h2>
                        <div className="md:w-2/3 max-w-sm mx-auto">
                          <div>
                            <select
                              onChange={(e) => setBusby(e.target.value)}
                              className="block w-11/12 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray mb-5 rounded shadow border-2 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                            >
                              <option value="">Select Title</option>
                              {bb.map((item) => (
                                <option value={item.value}>{item.value}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                      <hr className="border-gray" />
                       
                      
                      <hr className="border-gray" />
                    </div>
                    <div
                      className={openTab === 2 ? "block" : "hidden"}
                      id="link2"
                    >
                        <div className="md:inline-flex space-y-4 md:space-y-0 w-full p-4  items-center">
                        <h2 className="md:w-1/3 max-w-sm mx-auto">
                        Contact No
                          <span
                            className={required ? `text-[#f45138]` : "hidden"}
                          >
                            *
                          </span>
                        </h2>
                        <div className="md:w-2/3 max-w-sm mx-auto">
                          <div> 
                          <input
                            type="Number"
                            className="w-11/12 focus:outline-none focus:text-gray-600  p-2  border border-gray rounded shadow border-2"
                            placeholder="ex: 9381589970"
                            name="contactno"
                            onChange={handleChange}
                          />

                          
                          </div>
                        </div>
                      </div>
                      <hr className="border-gray" />
                     
                      <hr className="border-gray mt-8" />
                      <div className="md:inline-flex space-y-4 md:space-y-0 w-full p-4  items-center">
                        <h2 className="md:w-1/3 max-w-sm mx-auto">
                        Insurance Type
                          <span
                            className={required ? `text-[#f45138]` : "hidden"}
                          >
                            *
                          </span>
                        </h2>
                        <div className="md:w-2/3 max-w-sm mx-auto">
                        <select
                              onChange={(e) => setInstype(e.target.value)}
                              className="block w-11/12 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray mb-5 rounded shadow border-2 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                            >
                              <option value="">Select Title</option>
                              {instyp.map((item) => (
                                <option value={item.value}>{item.value}</option>
                              ))}
                            </select>
                        </div>
                      </div>
                      <div className="md:inline-flex space-y-4 md:space-y-0 w-full p-4  items-center">
                        <h2 className="md:w-1/3 max-w-sm mx-auto">
                      Message
                          <span
                            className={required ? `text-[#f45138]` : "hidden"}
                          >
                            *
                          </span>
                        </h2>
                        <div className="md:w-2/3 max-w-sm mx-auto">
                          <textarea
                            type="text"
                            className="w-11/12 focus:outline-none focus:text-gray-600  p-2  border border-gray rounded shadow border-2"
                            placeholder="ex: 1104"
                            name="message"
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                       <div className="md:inline-flex space-y-4 md:space-y-0 w-full p-4  items-center">
                        <h2 className="md:w-1/3 max-w-sm mx-auto">
                        Lead Status  
                          <span
                            className={required ? `text-[#f45138]` : "hidden"}
                          >
                            *
                          </span>
                        </h2>
                        <div className="md:w-2/3 max-w-sm mx-auto">
                          <div>
                          <select
                              onChange={(e) => setLeadStatus(e.target.value)}
                              className="block w-11/12 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray mb-5 rounded shadow border-2 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                            >
                              <option value="">Select Title</option>
                              {ls.map((item) => (
                                <option value={item.value}>{item.value}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="md:inline-flex space-y-4 md:space-y-0 w-full p-4  items-center">
                        <h2 className="md:w-1/3 max-w-sm mx-auto">
                        Comments
                          <span
                            className={required ? `text-[#f45138]` : "hidden"}
                          >
                            *
                          </span>
                        </h2>
                        <div className="md:w-2/3 max-w-sm mx-auto">
                          <input
                            type="text"
                            className="w-11/12 focus:outline-none focus:text-gray-600  p-2  border border-gray rounded shadow border-2"
                            placeholder="ex: 1104"
                            name="comments"
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <hr className="border-gray" />
                      <div className="md:inline-flex space-y-4 md:space-y-0 w-full p-4  items-center">
                        <h2 className="md:w-1/3 max-w-sm mx-auto">
                        Submit Date
                          <span
                            className={required ? `text-[#f45138]` : "hidden"}
                          >
                            *
                          </span>
                        </h2>
                        <div className="md:w-2/3 max-w-sm mx-auto ">
                          <div className="absolute bottom-[81px]">
                          <input
                              type="date"
                              className="w-11/12 focus:outline-none focus:text-gray-600  p-2  border border-gray rounded shadow border-2"
                              placeholder="ex: 2022"
                              name="submit_date"
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                      </div>
                 
                       
                     
                      
                  
                      {sheetData && (
                        <p className="text-[#9ACD32] text-md text-center pl-10">
                          Details Uploaded Successfully
                        </p>
                      )}
                      <div className="flex space-x-2 justify-center pt-10">
                        <button
                          type="submit"
                          className="inline-block px-6 py-2.5 bg-hero text-white font-medium text-xs leading-tight uppercase rounded shadow-md  hover:shadow-lg hover:text-black focus:shadow-lg focus:outline-none "
                        >
                          submit
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function TabsRender() {
  return (
    <div className="pl-30">
      <LeadsTabs />
    </div>
  );
}
