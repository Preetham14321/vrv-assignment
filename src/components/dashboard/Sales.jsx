import React from "react";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import fileDownload from 'js-file-download';
import Pagination1 from "./Pagination";
import Pagination from "react-responsive-pagination";
import DatePicker from "react-datepicker";
import * as XLSX from "xlsx";
import { AiOutlineSearch } from "react-icons/ai";
import { FaFileDownload,FaRegEdit,FaUpload,FaDownload  } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { BsInfo } from "react-icons/bs";

import "./Pagination.css";
import ModalDashBoard from "../modals/ModalDashBoard";
import { Link } from "react-router-dom";
import DetailsModel from "./DetailsModel";
import {tabHead} from './dataSet/TabHeadData.js'
import DeleteModel from "./models/DeleteModel.jsx";
import EditModel from "./models/EditModel.jsx";
import UploadModel from "./models/UploadModel.jsx";
import DownloadModel from "./models/DownloadModel.jsx";
const Sales = ({ids,isSticky='', handleTableIntersection }) => {
  const [loading, setLoading] = useState(false);
  const [timeframe, setTimeframe] = useState(false);
  const [monthly, setMonthly] = useState(false);
  const [showUploadModell, setShowUploadModell] = useState(false)
  const [showDownloadModell, setShowDownloadModell] = useState(false)
  const [custom, setCustom] = useState(false);
  const [mode, setMode] = useState("timeframe");
  const [year, setYear] = useState("2022");
  const [option1, setOption1] = useState("yearly");
  const [token, setToken] = useState(false);
  const [tokenn, setTokenn] = useState(false);
  const [color, setColor] = useState();
  const [modelType, setModelType] = useState('')
  const [jwtToken, setJwtToken] = useState(localStorage.getItem("jwt_token"));
  const [len, setLen] = useState();
  const [data, setData] = useState([]);
  const [dataadmin, setDataadmin] = useState([]);
  const [searchDefData, setSearchDefData] = useState([])
  const [ap, setAp] = useState();
  const [policySoldLen, setPolicySoldLen] = useState('')
  const [claimsCount, setClaimsCount] = useState()
  const [leadsCount, setLeadsCount] = useState()
  const [ur, setUr] = useState();
  const [nameDa, setNameDa] = useState({
    Branch: "",
    Business_By: "",
    Business_Type: "",
    Department: "",
    Gross_Premium: "",
    Insured_By: "",
    Insurance_Class: "",
    Insurance_Class_Desc: "",
    Insurance_Product: "",
    Insurance_Type: "",
    Insurance_Type_Desc: "",
    Insured_Name: "",
    Insurer: "",
    Location: "",
    Reg_No: "",
    Vehicle_Make: "",
    Model: "",
    year_of_reg: "",
    Engine_no: "",
    Chassis_no: "",
    Desc: "",
    Premium: "",
    GST: "",
    OD_Commission: "",
    MOTOR_OD_PREMIUM_AMOUNT: "",
    MOTOR_TP_PREMIUM_AMOUNT: "",
    OD_Brokerage_rate: "",
    Policy_Expiry_Date: "",
    Policy_No: "",
    Policy_Start_Date: "",
    Policy_Type: "",
    Sum_Insured: "",
    TP_Brokerage_rate: "",
    TP_commission: "",
    Total_Commission: "",
    insuredAddress: "",
    previousPolicyNumber: "",
    previousInsurer: "",
    coverNoteNumber: "",
    modeOfPayment: "",
    retroactiveDate: "",
    BQP: "",
    riskLocation: "",
    assetsCovered: "",
    panNo: "",
    Deductible: "",
    financierName: "",
    mobileNo: "",
    entryDate: "",
    insuredType: "",
    clientId: "",
  });
  const [namee, setNamee] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modell, setModell] = useState(false);
  const [showModalPolicy, setShowModalPolicy] = useState(false);
  const [showModalPolicyy, setShowModalpolicyy] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState('asc');
  const [sortingFor, setSortingFor] = useState()
  const [key, setKey] = useState(false);
  const [idd, setIdd] = useState();
  const [valuee, setValuee] = useState("");
  const [lob, setLob] = useState("");
  const [openTab, setOpenTab] = React.useState(1);
  const [entriesData, setEntriesData] = useState()
  const [scrolltrue, setScrolltrue] = useState(false)
  const [filterValue, setFilterValue] = useState(''); // State to store the input value
  const [authenticated, setauthenticated] = useState(false);
  const [authenticatedadmin, setauthenticatedadmin] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState();
  const [allProducts, setAllProducts] = useState(false);
  const [content, setContent] = useState([]);
  let [pageCount, setPageCount] = useState(0)
  const userType = JSON.parse(localStorage.getItem("access"));
  const name = JSON.parse(localStorage.getItem("namee"));
  const Password = JSON.parse(localStorage.getItem("pwd"));
  const API_ENDPOINT = process.env.REACT_APP_API_URL;
  const handleChangee = (e) => {
    const value = e.target.value;
    setNameDa({
      ...nameDa,
      [e.target.name]: value,
    });
  };
 
  useEffect(() => {
    mode === "timeframe" ? setTimeframe(true) : setTimeframe(false);
    mode === "monthly" ? setMonthly(true) : setMonthly(false);
    mode === "custom" ? setCustom(true) : setCustom(false);
  }, [mode]);
  useEffect(() => {}, []);
  console.warn(dataadmin);
  

  const uid = idd;
  const tableRef = useRef(null);
  const previousPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Function to handle input changes


  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    };

    const observer = new IntersectionObserver(handleTableIntersection, options);

    if (tableRef.current) {
      observer.observe(tableRef.current);
    }

    return () => {
      if (tableRef.current) {
        observer.unobserve(tableRef.current);
      }
    };
  }, [handleTableIntersection,tableRef]);
  useEffect(() => {
    const onStorage = () => {
      setJwtToken(localStorage.getItem("jwt_token"));
    };

    window.addEventListener("storage", onStorage);

    return () => {
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  const nextPage = () => {
    if (currentPage !== Math.ceil(data.length / postsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };


 

  //const userType='admin';
  useEffect(() => {
    if (userType === "LMSUSER") {
      setauthenticated(true);
    } else if (userType === "ADMIN") {
      setauthenticatedadmin(true);
    }
  }, [authenticated]);
  const [update, setUpdate] = useState({
    editLeadStatus: "",
    editComments: "",
  });
  const handleChange = (e) => {
    e.preventDefault();
    const value = e.target.value;
    setUpdate({
      ...update,
      [e.target.name]: value,
    });
    console.log(value);
  };

  useEffect(() => {
 
    axios
      .get(`${API_ENDPOINT}/activePolicies`, {
        auth: {
          username: name,
          password: Password,
        },
      })
      .then((response) => {
        setAp(response.data);
      });

      axios
      .get(`${API_ENDPOINT}/get/claim/count`, {
        auth: {
          username: name,
          password: Password,
        },
        params: {
          mode: 'FULL',
          year: year,
          timeFrameOrMonth: option1,
          startDate: "",
          endDate: "",
        },
      })
      .then((response) => {
        setClaimsCount(response.data);
      });
      axios
      .get(`${API_ENDPOINT}/get/leads/count`, {
        auth: {
          username: name,
          password: Password,
        },
        params: {
          mode: 'FULL',
          year: year,
          timeFrameOrMonth: option1,
          startDate: "",
          endDate: "",
        },
      })
      .then((response) => {
        setLeadsCount(response.data);
      });
   
   
    axios
      .get(`${API_ENDPOINT}/expiryWithinAMonth`, {
        auth: {
          username: name,
          password: Password,
        },
      })
      .then((response) => {
        setUr(response.data);
      });

      axios
      .get(`${API_ENDPOINT}/lineOfBusinessReports`, {
        auth: {
          username: name,
          password: Password,
        },
        params: {
          mode: "FULL",
          year: "",
          timeFrameOrMonth: "",
          startDate: "",
          endDate: "",
        },
      })
      .then((response) => {
        setPolicySoldLen(response.data.totalPolicies)
        // setLob(response.data);
        //console.log(response.data)
      });
  
  
  }, []);

  useEffect(()=>{
  
  },[  mode, name, option1, year])

  const policySoldRev = () => {
    axios
    .get(`${API_ENDPOINT}/lineOfBusinessReports`, {
      auth: {
        username: name,
        password: Password,
      },
      params: {
        mode: "FULL",
        year: "",
        timeFrameOrMonth: "",
        startDate: "",
        endDate: "",
      },
    })
    .then((response) => {
      setLob(response.data.lineOfBusinessObjs
        );
        setModelType('policySold')
      //console.log(response.data)
    });
  }

  const claimRev = (e)=>{
    axios
    .get(`${API_ENDPOINT}/line-of-business-leads?mode=full`, {
      auth: {
        username: name,
        password: Password,
      },
    
    })
    .then((response) => {
      console.log(response.data)
      setLob(response.data)
      setModelType('claims');

    });
  }
console.log('lobDatasss',lob)
  const salesData = [
    {
      id: "1",
      title: "Upcoming Renewals",
      quantity: ur,
      link:'/renewals'
    },

    {
      id: "2",
      title: "Active Policies",
      quantity: ap,
      link:''
    },
    {
      id: "3",
      title: "Claims",
      quantity: claimsCount?claimsCount:0,
      link:'/claims'

    },
    {
      id: "4",
      title: "Leads",
      quantity: leadsCount?leadsCount:0,
      link:'/leads'

    },
  ];

  useEffect(() => {
    var i;
    axios
      .get(`${API_ENDPOINT}/lms`, {
        headers: {
          authorization: `${jwtToken}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        // console.log(AxiosError.response.statusCode)
        var len = response.data.length;
        setLen(len);
        //    for(i=0;i<response.data.length;i++){
        //    arr.push(response.data[i])
        //    }
        setData(response.data);
        if (response.data.leadStatus === "pending") {
          setColor("#FFFF00");
        }
        console.log(color);
      });
  }, [token]);
  console.log(key);
  const id = key;
  const nam = namee;
  const handleSubmitt = (e) => {
    e.preventDefault();
    const userData = {
      id: id,
      editLeadStatus: valuee,
      editComments: update.editComments,
    };
    axios
      .put("https://api.policymart.co.in:10057/api/v1/lms/", userData, {
        headers: {
          authorization: `${jwtToken}`,
        },
      })
      .then((response) => {
        console.log(response.status);
        console.log(response.data.token);
        if (response.status === 200) {
          console.log("success");
          setIsOpen(true);
        }
      });
  };
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  // ...

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = data.slice(indexOfFirstPost, indexOfLastPost);
const [sortedDatas, setSortedDatas] = useState(dataadmin)
const [firstCall, setFirstCall] = useState(true)

  var currentPostsadmin = sortedDatas.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  // for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
  //   pageNumbers.push(i);
  // }

  // DATE RANGE

  
  const date1 = startDate;
  const date2 = endDate;
  const con = content;
useEffect(()=>{

  axios
  .get(`${API_ENDPOINT}/get/policy?mode=${mode}&year=${year}&timeFrameOrMonth=${option1}&page=-1`, {auth: {
    username: name,
    password: Password,
  }})
  .then((response) => {
    setSearchDefData(response.data)
  });
},[API_ENDPOINT, Password, name,mode, option1, year])


/* ------------ Function for Search Functionality ----------------- */
const handleSearchChange = (e) => {
  const searchValue = e.target.value;
  setFilterValue(searchValue);
  setFirstCall(false)
  
   // Recalculate the filter based on the updated searchValue
  //  const updatedFilteredData = searchDefData.filter(item => {
  //   const searchTerms = searchValue.trim().toLowerCase().split(' ');
  //   return searchTerms.every(term => {
  //     return Object.values(item).some(value => {
  //       if (value && value.toString().toLowerCase().includes(term)) {
  //         return true;
  //       }else {
  //         return false
  //       }
  //     });
  //   });
  // });
  // setSortedDatas(updatedFilteredData);

};

useEffect(() => {
  // This will trigger when filterValue or firstCall changes
  if (!firstCall) {
    // Recalculate the filter based on the updated searchValue
    const updatedFilteredData = searchDefData.filter((item) => {
      const searchTerms = filterValue.trim().toLowerCase().split(' ');
      return searchTerms.every((term) => {
        return Object.values(item).some((value) => {
          if (value && value.toString().toLowerCase().includes(term)) {
            return true;
          } else {
            return false;
          }
        });
      });
    });
    setSortedDatas(updatedFilteredData);
  }
}, [filterValue, firstCall, searchDefData]);

/* ------------------------------- */

/* ------------------------------------------------------------------- */
      
                
                /* ------------------------------------------------------------------- */


  const handleSubmittt = (e) => {
    e.preventDefault();

    axios
      .get(`${API_ENDPOINT}/get/policy?page=0`, {
        auth: {
          username: name,
          password: Password,
        },
        params: {
          mode: mode,
          year: year,
          timeFrameOrMonth: option1,
          startDate: startDate,
          endDate: endDate,
          // mode: "timeframe",
          // year: "2023",
          // timeFrameOrMonth: "yearly",
          // startDate: "",
          // endDate: "",
        },
      })
      .then((response) => {
        var len = response.data.length;
        setLen(len);
setPageCount(pageCount+1)
        setDataadmin(response.data);
        setSortedDatas(response.data)
        setTokenn(true);
      });
  };
  useEffect(()=>{
    if( currentPage%10===0){
      setPageCount(pageCount+1)
    }
  },[currentPage])

  useEffect(()=>{
    axios
    .get(`${API_ENDPOINT}/get/policy/count?mode=${mode}&year=${year}&timeFrameOrMonth=${option1}&startDate&endDate`, {auth: {
      username: name,
      password: Password,
    }})
    .then((response) => {
      setEntriesData(response.data)
    });
  },[API_ENDPOINT, Password, endDate, mode, name, option1, startDate, year])


 const handleDownloadExcel = ()=>{ 

      axios({
        url:`${API_ENDPOINT}/downloadPolicyExcel?mode=${mode}&year=${year}&timeFrameOrMonth=${option1}&startDate&endDate`,
        method: 'GET',
        responseType: 'blob',
        auth: {
          username: name,
          password: Password,
        }// Set the responseType to 'blob' to receive the response as a binary Blob object
      }, )
        .then((response) => {


          if(firstCall) {
               // Create a URL object from the response data
          const url = window.URL.createObjectURL(new Blob([response.data]));
          
          // Create a link element and set its attributes for downloading
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'filename.xlsx'); // Set the desired filename
          
          // Programmatically click the link to initiate the download
          document.body.appendChild(link);
          link.click();
          
          // Clean up the URL object and remove the link element
          window.URL.revokeObjectURL(url);
          document.body.removeChild(link);
          } 
          else {
            const worksheet = XLSX.utils.json_to_sheet(sortedDatas);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

  XLSX.writeFile(workbook, "DataSheet.xlsx");
          }
      
        })
        .catch((error) => {
        
          console.error('Error downloading file:', error);
        });
  }
  useEffect(() => {
    currentPage%10===0&& axios
      .get(`${API_ENDPOINT}/get/policy?page=${pageCount}`, {
        auth: {
          username: name,
          password: Password,
        },
        params: {
          mode: mode,
          year: year,
          timeFrameOrMonth: option1,
          startDate: startDate,
          endDate: endDate,
      
        },
      })
      .then((response) => {
        var len = response.data.length;
        setLen(len);
        const apiData = response.data;
        setDataadmin(prevData => [...prevData, ...apiData]);
        setSortedDatas(prevData => [...prevData, ...apiData])

        setTokenn(true);
      });
  }, [API_ENDPOINT, Password, currentPage,pageCount, endDate, mode, name, option1, startDate, year]);
  const tot = Math.ceil(sortedDatas.length / postsPerPage);

console.log('upload',showUploadModell)
  const sortedData = [...currentPostsadmin].sort((a, b) => {
    if (sortOrder === 'asc') {

      if(sortingFor==='lineOfBusiness') {

        return a.lineOfBusiness.localeCompare(b.lineOfBusiness);
      }
      if(sortingFor==='insuranceProduct') {

        return a.insuranceProduct.localeCompare(b.insuranceProduct);
      }
      if(sortingFor==='insuranceType') {

        return a.insuranceType.localeCompare(b.insuranceType);
      }
      if(sortingFor==='insuredName') {

        return a.insuredName.localeCompare(b.insuredName);
      }
      
    } else {

      if(sortingFor==='lineOfBusiness') {

        return b.lineOfBusiness.localeCompare(a.lineOfBusiness);
      }
      if(sortingFor==='insuranceProduct') {

        return b.insuranceProduct.localeCompare(a.insuranceProduct);
      }
      if(sortingFor==='insuranceType') {

        return b.insuranceType.localeCompare(a.insuranceType);
      }
      if(sortingFor==='insuredName') {

        return b.insuredName.localeCompare(a.insuredName);
      }
      
      // return b.lineOfBusiness.localeCompare(a.lineOfBusiness);
    }
  });
    
  
  /* ----------------------- Sorting Logic For Table End Here ---------------------------- */

  const [scrollLeft, setScrollLeft] = useState(0);
  const divRef = useRef(null);
  const [scrollLeft2, setScrollLeft2] = useState(0)  
const divRef2 = useRef(null)

          const handleScroll2 = React.useCallback(() => {
            // Scroll event handler logic
            // setIsStickyClass(false)
            if (divRef2.current) {
                  setScrollLeft2(divRef2.current.scrollLeft);
                }
            console.log('Scroll event occurred on the div.');
          });

          useEffect(() => {
            const tableElement = divRef2.current;
            if (tableElement) {
              tableElement.addEventListener('scroll', handleScroll2);
              return () => {
                tableElement.removeEventListener('scroll', handleScroll2);
              };
            }
          }, [handleScroll2]);
   

          // dataset for monthly 
          const monthlyDs = ['Year',2024,2023,2022,2021,2020] 

          //dataset for  monthIcon 
          const monthIcon = ['Select','M1','M2','M3','M4','M5','M6','M7','M8','M9','M10','M11','M12']

            //dataset for year interval
            const yearInt = ['Select','Q1','Q2','Q3','Q4','H1','H2','YEARLY']

        const polParam = {
            mode: mode,
                year: year,
                timeFrameOrMonth: option1,
                startDate: startDate,
                endDate: endDate,
        }
     /*----------------------------------------------- Handle to Close Delete Model and Update the Table Data after edit -------------------  */
     const handleCloseModel = (e)=>{
      e.preventDefault();
      setModell(false)
      setShowModalPolicy(false)
      axios
      .get(`${API_ENDPOINT}/get/policy?page=0`, {
        auth: {
          username: name,
          password: Password,
        },
        params: polParam,
      })
        .then((response) => {
         

          var len = response.data.length;
          setLen(len);
      setPageCount(pageCount+1)
          setDataadmin(response.data);
          setSearchDefData( response.data)
          setSortedDatas(firstCall ?  response.data:sortedDatas)
          setTokenn(true);

          handleSearchChange({ target: { value: filterValue } });
        });
      
      }

  const required = true;
  return (
    <div className=" bg-white z-50" >
      {/* <div className=" w- z-50 bg-[#9b9e9d69]    " style={ {'position': 'absolute',
  'top':' 50%',
  'left': '50%',
  'transform': 'translate(-50%, -50%)'}}>
        <ModalDashBoard/>
      </div> */}
      <div className="flex gap-7 float-center items-center justify-evenly overscroll-x-none">
        <div className="border rounded-xl bg-white border-[#EEF0F2] shadow-[0px_5px_8px_rgba(204,204,204,0.15)] w-64 px-5  py-3 ">
        
        <div className="flex items-center pb-1">

          <h1 className="text-[#1818195a] p">Policies Sold</h1>
          <BsInfo className="text-2xl bg-hero cursor-pointer text-white rounded-full ml-3"  onClick={(e) => {
              e.preventDefault();
              policySoldRev()
              setShowModalpolicyy(true);
              setIsOpen(false);
            }}/>

        </div>
          <p className="font-bold  text-3xl">{policySoldLen}</p>
          {/* <button
            onClick={(e) => {
              e.preventDefault();
              setShowModalpolicyy(true);
              setIsOpen(false);
            }}
            className="font-medium p-2  ml-40 mr-2 bg-gray text-black rounded-md hover:bg-hero"
          >
            Details
          </button> */}
        </div>
        {authenticatedadmin &&
          salesData.map((item, key) => (
             <Link to={item.link} >
            <div className="border rounded-xl bg-white border-[#EEF0F2] shadow-[0px_5px_8px_rgba(204,204,204,0.15)] w-64 px-5  py-3 ">

             <div className="flex items-center pb-1 ">

              <h1 className="text-[#BFC6D0] ">{item.title}</h1>
              <BsInfo className={`${item.title!=='Claims'?'hidden':''} text-2xl bg-hero text-white cursor-pointer rounded-full ml-3`} onClick={(e) => {
              e.preventDefault();
              claimRev(e)
              setShowModalpolicyy(true);
              setIsOpen(false);
            }}/>
             </div>

              <p className="font-bold  text-3xl">{item.quantity}</p>
            </div>
            </Link>
            

          ))}
      </div>
      {authenticatedadmin && (
        <div className="relative overflow-x-auto  shadow-md sm:rounded-lg w-11/12 ml-14 mt-10 p-4 bg-white">
          <div className="flex">
            <h3 className="bg-white text-xl p-4 font-semibold">Summary</h3>
            <div className="flex  -mt-[19px]">
              <select
                className=" px-6 py-2.5 bg-gray mt-8 mr-4 ml-4 text-black font-medium text-m rounded  focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg  flex items-center  whitespace-nowrap"
                value={mode}
                onChange={(e) => setMode(e.target.value)}
              >
                <option value="selectchart">Select Timeframe</option>
                <option value="timeframe">Timeframe</option>
                <option value="monthly">Monthly</option>
                <option value="custom">Custom</option>
              </select>
              {custom && (
                <div className="w-96">

                <div className='  flex justify-center absolute items-center mr-2'>
                  {" "}
                  <div className=" flex flex-col  w-full  mb-6  ">
                    <p className="pr-4 text-center m"> From</p>
                    <div className="w-20 ">

                    <input
                      type="date"
                      className="border p-1 absolute border-gray rounded-md shadow bg-gray"
                      onChange={(e) => setStartDate(e.target.value)}
                    ></input>
                    </div>

                  </div>
                  <div className=" top-8 m left-[520px] ml-3 mb-6 flex flex-col">
                    <p className="pr-4 text-center "> To</p>
                    <div className="w-36">

                    <input
                      type="date"
                      className="border p-1 absolute border-gray rounded-md shadow bg-gray"
                      onChange={(e) => setEndDate(e.target.value)}
                    ></input>
                    </div>

                  </div>
                  <button
                    type="submit"
                    onClick={handleSubmittt}
                    className="font-medium w-36 h-10 mt-8 ml bg-[#458758ae] text-black rounded-md hover:bg-hero"
                  >
                    Filter
                  </button>
                </div>
                </div>
              )}
              {monthly && (
                <div className="flex w-auto">
                  <select
                    className="px-6 p-2 mr-2 py-2.5 bg-gray mt-8 text-black font-medium text-m rounded  focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg  flex items-center  whitespace-nowrap"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                  >
                    {monthlyDs.map((item,key) =>(

                    <option value={item}>{item}</option>
                    ))}
                  
                  </select>
                  <select
                    className="dropdown-toggle px-6 py-2.5 bg-gray mt-8 text-black font-medium text-m rounded  focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg  flex items-center  whitespace-nowrap"
                    value={option1}
                    onChange={(e) => setOption1(e.target.value)}
                  >
                  {monthIcon.map((item,key) =>(

<option value={item}>{item}</option>
))}

                   
                  </select>
                  <button
                    type="submit"
                    onClick={handleSubmittt}
                    className="font-medium w-20 h-10 mt-8 ml-5  bg-[#458758ae] text-black rounded-md hover:bg-hero"
                  >
                    Filter
                  </button>
                </div>
              )}
              {timeframe && (
                <div className="flex w-auto">
                  <select
                    className="px-6 p-2 mr-2 py-2.5 bg-gray mt-8 text-black font-medium text-m rounded  focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg  flex items-center  whitespace-nowrap"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                  >
                   {monthlyDs.map((item,key) =>(

<option value={item}>{item}</option>
))}
                  </select>
                  <select
                    className="dropdown-toggle px-6 py-2.5 bg-gray mt-8 text-black font-medium text-m rounded  focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg  flex items-center  whitespace-nowrap"
                    value={option1}
                    onChange={(e) => setOption1(e.target.value)}
                  >
               {yearInt.map((item,key) =>(

<option value={item}>{item}</option>
))}
                  </select>
                  <button
                    type="submit"
                    onClick={handleSubmittt}
                    className="font-medium w-20 h-10 mt-8 ml-5  bg-[#458758ae] text-black rounded-md hover:bg-hero"
                  >
                    Filter
                  </button>
                </div>
              )}
           
            </div>
            <div title="Click to download File" className="mt-3  text-xl cursor-pointer bg-[#f1f2f5] h-9 w-9 shadow-2xl  drop-shadow-2xl border border-[#d1d6d6] rounded-full ml-5" onClick={handleDownloadExcel}><FaFileDownload className="text-hero mt-2 ml-2    shadow-xl"/> </div>
         
         <div className="">

        <div className="mt-4 h-8 ml-5 flex  border-2 border-[#676d7089] rounded-lg px-2 ">

         <AiOutlineSearch className="text-xl mt-1.5" />
         <input  
        value={filterValue}   onChange={handleSearchChange}  type="text" placeholder="Search here to filter" className="focus:outline-none pl-1" />
        </div>
        <h1 className={`mt-1 text-center ml-5 ${Object.keys(dataadmin).length>0?'':'hidden'} `}><span className="font-semibold">{entriesData}</span>  Entries Found {`(${sortedDatas.length}) `} </h1>
        </div>
          </div>
          {tokenn && (
            <div className="table-container scrollbar-hidden h-[580px] w-full ">

       
                        <table id={ids} ref={tableRef} className={` h-[544  text-[12px]  overflow-scroll  text-center text-gray-500 dark:text-gray-400 `} >
                          <thead ref={divRef} style={{   height: '100px', overflow: 'auto' }} className={`bg- w-screen sticky top-0 z-30  text-[12px] text-gray-700 border-b-2 border-gray uppercase bg-white dark:bg-gray-700 dark:text-gray-400 `}>
        <tr>  
          <th className="sticky left-0 bg-white">Actions</th>
          {tabHead.map((item,key)=>(
            <th scope="col" id={key} className="px-6 py-3 bg-white">
                  {item.name}
                  </th>
          ))}

                  
        </tr>
            
              </thead>
           
              <tbody  onScroll={handleScroll2}  className='relative' style={{ transform: `translateX(-${scrollLeft}px)` }}  >
                {sortedData.map((item, key) => (
                  <tr className="bg-white border-b-2 border-gray dark:bg-gray-800 dark:border-gray-700 hover:bg-gray dark:hover:bg-gray-600">
                      <td className="px -6 w-20 py -4 grid grid-cols-2 sticky left-0 mt- 5 text- right gap-5 shadow- lg    p -4 bg-white  h-full py-5 "  style={{ transform: `translateX(${scrollLeft}px)`  }}>

<button
  onClick={() => {
    setShowModalPolicy(true);
    setIsOpen(false);
    setContent(item);
    setIdd(item.id);
    setLoading(false);
  }}
  id={key}
  className="font-medium p -4   bg -gray text-black rounded-md  opacity-40 hover:opacity-100 hover:text-hero "
>
  <FaRegEdit   title="Edit" className="text-2xl"/>
</button>

<button
  onClick={() => {
    setIdd(item.id);
    setModell(true);
  }}
  id={key}
  className="font-medium p- 2  bg- [#D2042D] text- white rounded-md hover:bg -hero  opacity-40 hover:opacity-100 hover:text-[#d44545]"
>
  <MdDelete title="Delete" className="text-2xl"/>
</button>
<button
  onClick={() => {
    setShowUploadModell(true)
    setIdd(item.id);
  }}
  id={key}
  className="font-medium p- 2  bg- [#D2042D] text- white rounded-md hover:bg -hero  hover:text-[#526398] opacity-40 hover:opacity-100"
>
  <FaUpload title="Upload" className="text-2xl"/>
</button>
<button
  onClick={() => {
    setIdd(item.id);
    setShowDownloadModell(true);
  }}
  id={key}
  className="font-medium p -2  bg- [#D2042D] text- white rounded-md hover:text-[#669656] opacity-40 hover:opacity-100"
>
  <FaDownload title="Download" className="text-2xl"/>
</button>
</td>
                    <td className="px-6 py-4">{item.id}</td>

                    <td className="px-6 py-4">{item.lineOfBusiness}</td>
                    <td className="px-6 py-4">{item.insuranceProduct}</td>
                    <td className="px-6 py-4">{item.insuranceType}</td>
                    <td className="px-6 py-4">{item.insuranceTypeDesc}</td>
                    <td className="px-6 py-4">{item.insuredAddress}</td>

                    <td className="px-6 py-4">{item.businessBy}</td>
                    <td className="px-6 py-4">{item.insuredName}</td>

                    <td className="px-6 py-4 cursor-pointer"  onClick={() => {
                          setShowModalPolicy(true);
                          setIsOpen(false);
                          setContent(item);
                          setIdd(item.id);
                        }}>{item.insurer}</td>

                    <td className="px-6 py-4">{item.policyStartDate}</td>
                    <td className="px-6 py-4">{item.policyEndDate}</td>
                    <td className="px-6 py-4">{item.policyNo}</td>
                    <td className="px-6 py-4">{item.registrationNo}</td>
                    <td className="px-6 py-4">{item.vehicleMake}</td>
                    <td className="px-6 py-4">{item.model}</td>
                    <td className="px-6 py-4">{item.yearOfRegistration}</td>
                    <td className="px-6 py-4">{item.engineNo}</td>
                    <td className="px-6 py-4">{item.chassisNo}</td>
                    <td className="px-6 py-4">{item.description}</td>
                    <td className="px-6 py-4">{item.sumInsured}</td>
                    <td className="px-6 py-4">{item.motorOdPremiumAmount}</td>
                    <td className="px-6 py-4">{item.motorTpPremiumAmount}</td>
                    <td className="px-6 py-4">{item.premium}</td>
                    <td className="px-6 py-4">{item.gst}</td>
                    <td className="px-6 py-4">{item.grossPremium}</td>
                    <td className="px-6 py-4">{item.odBrokerageRate}</td>
                    <td className="px-6 py-4">{item.tpBrokerageRate}</td>
                    <td className="px-6 py-4">{item.odCommission}</td>
                    <td className="px-6 py-4">{item.tpCommission}</td>
                    <td className="px-6 py-4">{item.brokerageEligible}</td>
                    <td className="px-6 py-4">{item.brokerageReceived}</td>
                    <td className="px-6 py-4">{item.rewardEligible}</td>
                    <td className="px-6 py-4">{item.rewardReceived}</td>
                    <td className="px-6 py-4">{item.totalCommission}</td>
                    <td className="px-6 py-4">{item.previousPolicyNumber}</td>
                    <td className="px-6 py-4">{item.previousInsurer}</td>
                    <td className="px-6 py-4">{item.coverNoteNumber}</td>
                    <td className="px-6 py-4">{item.modeOfPayment}</td>
                    <td className="px-6 py-4">{item.retroactiveDate}</td>
                    <td className="px-6 py-4">{item.bqp}</td>
                    <td className="px-6 py-4">{item.riskLocation}</td>
                    <td className="px-6 py-4">{item.assetsCovered}</td>
                    <td className="px-6 py-4">{item.panNo}</td>
                    <td className="px-6 py-4">{item.deductible}</td>
                    <td className="px-6 py-4">{item.financierName}</td>
                    <td className="px-6 py-4">{item.mobileNo}</td>
                    <td className="px-6 py-4">{item.entryDate}</td>
                    <td className="px-6 py-4">{item.insuredType}</td>
                    <td className="px-6 py-4">{item.clientId}</td>
                  
                  </tr>
                ))}
              </tbody>
              {/* </div> */}
            </table>
            </div>

          )}
          
          {modell ? (
            <>
      <DeleteModel handleDeleteCloseModell={handleCloseModel} polParam= {polParam} uid={uid}/>
            </>
          ) : null}
       
          <Pagination
            className="flex justify-center"
                  current={currentPage}
            total={tot}
            onPageChange={setCurrentPage}
            maxWidth={100}
          />
        </div>
      )}

 
      {showModalPolicyy ? (
    <DetailsModel modelTypee={modelType} modelData={lob} modalhandle={[showModalPolicyy,setShowModalpolicyy]}/>
      ) : null}
<div className="">

      {showModalPolicy &&<>
      <EditModel  handleDeleteCloseModell={handleCloseModel} preData = {[content,setContent]} idd={idd} handleModel={[showModalPolicy,setShowModalPolicy]}/>
      </>}

</div>

<div className="">
{showUploadModell &&
      <UploadModel  uid={idd} handleModel={[showUploadModell,setShowUploadModell]}/>
      }
</div>
<div className="">
{showDownloadModell &&
      <DownloadModel  uid={idd} handleModel={[showDownloadModell, setShowDownloadModell]}/>
      }
</div>

    </div>
  );
};

export default Sales;
