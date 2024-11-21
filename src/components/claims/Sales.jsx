import React from "react";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import fileDownload from 'js-file-download';
// import Pagination1 from "./Pagination";
import Pagination1 from "../dashboard/Pagination";
import Pagination from "react-responsive-pagination";
import DatePicker from "react-datepicker";
import * as XLSX from "xlsx";

import "../dashboard/Pagination.css";
import ModalDashBoard from "../modals/ModalDashBoard";
const Sales = ({ids,isSticky='', handleTableIntersection }) => {
  const [loading, setLoading] = useState(false);
  const [startDatepolicy, setStartDatepolicy] = useState();
  const [endDatepolicy, setEndDatepolicy] = useState();
  const [timeframe, setTimeframe] = useState(false);
  const [monthly, setMonthly] = useState(false);
  const [custom, setCustom] = useState(false);
const [isStickyClass, setIsStickyClass] = isSticky
  const [items, setItems] = useState([]);
  const [sortingOrder, setSortingOrder] = useState('asc');
  const [mode, setMode] = useState("timeframe");
  const [year, setYear] = useState("2022");
  const [option1, setOption1] = useState("yearly");
  const [token, setToken] = useState(false);
  const [tokenn, setTokenn] = useState(false);
  const [color, setColor] = useState();
  const [jwtToken, setJwtToken] = useState(localStorage.getItem("jwt_token"));
  const [len, setLen] = useState();
  const [data, setData] = useState([]);
  const [totalAdminData, setTotalAdminData] = useState([])
  const [dataadmin, setDataadmin] = useState([]);
  const [policySold, setPolicySold] = useState();
  const [ap, setAp] = useState();
  const [ur, setUr] = useState();

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState();
  const [allProducts, setAllProducts] = useState(false);
  const [products, setProducts] = useState([]);
  const [content, setContent] = useState([]);
  let [pageCount, setPageCount] = useState(0)
  const [authenticated, setauthenticated] = useState(false);
  const [authenticatedadmin, setauthenticatedadmin] = useState(false);
  const [namee, setNamee] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modell, setModell] = useState(false);
  const [showModalPolicy, setShowModalpolicy] = useState(false);
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
  let [refreshData, setRefreshData] = useState(1)
  const [nameDa, setNameDa] = useState({
    Insured_Name:'',
    Insurer:'',
    Date_of_Loss:'',
    Intimation_Date:'',
    Line_Of_Business:'',
    Claims_Amount:'',
    Policy_Number:'',
    Claims_Status:'',
    Surveyor_Appointed:"",
    Intimation_Amount:'',
    Brokerage:'',
    Rewards:'',
    Settlement_Amount:'',
    Client_ID:'',
    Entry_Date:''

  });


  const uid = idd;
  const tableRef = useRef(null);
  const date1 = startDate;
  const date2 = endDate;
  const con = content;
  const name = JSON.parse(localStorage.getItem("namee"));
  const Password = JSON.parse(localStorage.getItem("pwd"));
  const userType = JSON.parse(localStorage.getItem("access"));
  const API_ENDPOINT = process.env.REACT_APP_API_URL;
  console.warn(name);
 
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

  console.warn(Password);
  const handleChangee = (e) => {
    const value = e.target.value;
    setNameDa({
      ...nameDa,
      [e.target.name]: value,
    });
  };
  const handleOnMode = (e) => {
    setMode(e.target.value);
  };
  const handleOnYear = (e) => {
    setYear(e.target.value);
  };
  const handleOnOption = (e) => {
    setOption1(e.target.value);
  };
  console.warn(mode, year, option1);
  useEffect(() => {
    mode === "timeframe" ? setTimeframe(true) : setTimeframe(false);
    mode === "monthly" ? setMonthly(true) : setMonthly(false);
    mode === "custom" ? setCustom(true) : setCustom(false);
  }, [mode]);
  useEffect(() => {}, []);
  console.warn(dataadmin);

  const previousPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };


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


        /*-------------------------------- Fuction API to Delete the Entry -----------------------------------  */
  const handleDelete = (e) => {
    e.preventDefault();
    axios
      .delete(`${API_ENDPOINT}/delete/claim?id=` + uid, {
        auth: {
          username: name,
          password: Password,
        },
      })
      .then((response) => {
        console.log(response.status);
        if (response.status === 200) {
          setKey(true);
        }
      });
  };
/* --------------------------------------------------------------- */


  const nextPage = () => {
    if (currentPage !== Math.ceil(data.length / postsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };
  const handleClick = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  console.log(userType);
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
    // axios
    //   .get(`${API_ENDPOINT}/get/policy`, {
    //     auth: {
    //       username: name,
    //       password: Password,
    //     },
    //   })
    //   .then((response) => {
    //     var len = response.data.length;
    //     setLen(len);

    //     setDataadmin(response.data);
    //     setTokenn(true);
    //   });
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
        setLob(response.data);
        //console.log(response.data)
      });
  }, []);
  const salesData = [
    {
      id: "2",
      title: "Upcoming Renewals",
      quantity: ur,
    },

    {
      id: "1",
      title: "Active Policies",
      quantity: ap,
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
  const currentPostsadmin = dataadmin.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  // for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
  //   pageNumbers.push(i);
  // }

  // DATE RANGE
 
  console.log(con);

                /* ----------------------- Function API  to get Table Data ------------------------------------ */
  const handleSubmittt = (e) => {
    e.preventDefault();

    axios
    .get(`${API_ENDPOINT}/get/claim?mode=${mode}&year=${year}&timeFrameOrMonth=${option1}&startDate&endDate&page=0`, {auth: {
      username: name,
      password: Password,
    }})
      .then((response) => {
        var len = response.data.length;
        setLen(len);
setPageCount(pageCount+1)
        setDataadmin(response.data);
        setTokenn(true);
      });
  };

  /* ---------------------------------------------------------------- */
  useEffect(()=>{
    if( currentPage%10===0){
      setPageCount(pageCount+1)
    }
  },[currentPage])



              /*----------------------------------------------- Handle to Close Model and Update the Table Data after edit -------------------  */
const handleCloseModel = (e)=>{
e.preventDefault();
setShowModalpolicy(false)
axios
.get(`${API_ENDPOINT}/get/claim?mode=${mode}&year=${year}&timeFrameOrMonth=${option1}&startDate&endDate&page=0`, {auth: {
  username: name,
  password: Password,
}})
  .then((response) => {
    var len = response.data.length;
    setLen(len);
setPageCount(pageCount+1)
    setDataadmin(response.data);
    setTokenn(true);
  });

}

/* ------------------------------------------------------------------- */
              /*----------------------------------------------- Handle to Close Delete Model and Update the Table Data after edit -------------------  */
const handleDeleteCloseModel = (e)=>{
e.preventDefault();
setModell(false)
axios
.get(`${API_ENDPOINT}/get/claim?mode=${mode}&year=${year}&timeFrameOrMonth=${option1}&startDate&endDate&page=0`, {auth: {
  username: name,
  password: Password,
}})
  .then((response) => {
    var len = response.data.length;
    setLen(len);
setPageCount(pageCount+1)
    setDataadmin(response.data);
    setTokenn(true);
  });

}

/* ------------------------------------------------------------------- */
           


                                 /*-----------------------  To Get the Values from Api -----------------  */ 

  useEffect(()=>{
    // 


    axios
    .get(`${API_ENDPOINT}/get/claim?mode=${mode}&year=${year}&timeFrameOrMonth=${option1}&startDate&endDate&page=0`, {auth: {
      username: name,
      password: Password,
    }})
    .then((response) => {
      console.log('claim value',response.data.length)
      // setEntriesData(response.data)
      setEntriesData(response.data.length)
    });
  },[API_ENDPOINT, Password, endDate, mode, name, option1, startDate, year])

                                /*--------------------------- To Download the Excel File ---------------------------  */
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
        })
        .catch((error) => {
          // Handle any error that occurs during the API request
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
        const apiData = response.data;
        setDataadmin(prevData => [...prevData, ...apiData]);
        setTokenn(true);
      });
  }, [API_ENDPOINT, Password, currentPage, endDate, mode, name, option1, startDate, year]);
  const tot = Math.ceil(dataadmin.length / postsPerPage);

  const handleSum = (e) => {
    e.preventDefault();

    const userData = {
        
        "lineOfBusiness": nameDa.Line_Of_Business,
        "insurer":nameDa.Insurer,
        "insuredName":nameDa.Insured_Name,
        "dateOfLoss": nameDa.Date_of_Loss,
        "intimationDate": nameDa.Intimation_Date,
        "claimsAmount": nameDa.Claims_Amount,
        "policyNumber": nameDa.Policy_Number,
        "claimStatus": nameDa.Claims_Status,
        "surveyorAppointed": nameDa.Surveyor_Appointed,
        "intimationAmount": nameDa.Intimation_Amount,
        "brokerage": nameDa.Brokerage,
        "rewards": nameDa.Rewards,
        "settlementAmount": nameDa.Settlement_Amount,
        "clientId": nameDa.Client_ID,
        "entryDate": nameDa.Entry_Date
    };
    axios
      .put(`${API_ENDPOINT}/edit/claim?id=${+ uid}` , userData, {
        auth: {
          username: name,
          password: Password,
        },
      })
      .then((response) => {
        console.log(response.status);

        if (response.status === 200) {
          setLoading(true);
        }
        setRefreshData(refreshData++)
      });
  };
  console.warn(dataadmin.reverse);


  
  const handleClose = () => {
    setAllProducts(false);
    setTokenn(true);
    setStartDate(new Date());
  };

  
          /* ----------------------- Sorting Logic For Table start Here ---------------------------- */
  const handleSortLOB = () => {
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newSortOrder);
    setSortingFor('insurer')
  };
  const   handleSortIP  = () => {
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newSortOrder);
    setSortingFor('insuranceProduct')
  };
  const   handleSortIT  = () => {
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newSortOrder);
    setSortingFor('insuranceType')
  };
  const   handleSortIN  = () => {
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newSortOrder);
    setSortingFor('insuredName')
  };

  // const handleScroll = () => {
  //   const container = tableRef.current;
  //   if (container.scrollLeft > 0) {
  //     // Right scrolling detected
  //     console.log('Scrolled to the right');
  //   }
  //   console.log('scrol',container)
  // };
  // Sort the data array based on the sortOrder
  const sortedData = [...currentPostsadmin].sort((a, b) => {
    if (sortOrder === 'asc') {

      if(sortingFor==='insurer') {

        return a.insurer.localeCompare(b.insurer);
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

      if(sortingFor==='insurer') {

        return b.insurer.localeCompare(a.insurer);
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

  // const handleScroll = () => {
  //  
  // };




          const handleScroll = React.useCallback(() => {
            // Scroll event handler logic
            // setIsStickyClass(false)
            if (divRef.current) {
                  setScrollLeft(divRef.current.scrollLeft);
                }
          });
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
        
          // Attach the scroll event listener when the component mounts
          // React.useEffect(() => {
          //   const divElement = divRef2.current;
        
          //   if (divElement) {
          //     divElement.addEventListener('scroll', handleScroll2);
          //   }
        
          //   // Clean up the event listener when the component unmounts
          //   return () => {
          //     if (divElement) {
          //       divElement.removeEventListener('scroll', handleScroll2);
          //     }
          //   };
          // }, [handleScroll2]);
          // useEffect(() => {
          //   const tableElement = divRef.current;
          //   if (tableElement) {
          //     tableElement.addEventListener('scroll', handleScroll);
          //     return () => {
          //       tableElement.removeEventListener('scroll', handleScroll);
          //     };
          //   }
          // }, [handleScroll]);
        
          // // Attach the scroll event listener when the component mounts
          // React.useEffect(() => {
          //   const divElement = divRef.current;
        
          //   if (divElement) {
          //     divElement.addEventListener('scroll', handleScroll);
          //   }
        
          //   // Clean up the event listener when the component unmounts
          //   return () => {
          //     if (divElement) {
          //       divElement.removeEventListener('scroll', handleScroll);
          //     }
          //   };
          // }, [handleScroll]);

  const required = true;
  return (
    <div className=" bg-white z-50" >
      {/* <div className=" w- z-50 bg-[#9b9e9d69]    " style={ {'position': 'absolute',
  'top':' 50%',
  'left': '50%',
  'transform': 'translate(-50%, -50%)'}}>
        <ModalDashBoard/>
      </div> */}
 
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
                <div>
                  {" "}
                  <div className="absolute top-8 left-[400px]  flex">
                    <p className="pr-4 mt-2"> From</p>
                    <input
                      type="date"
                      className="border p-1 border-gray rounded-md shadow bg-gray"
                      onChange={(e) => setStartDate(e.target.value)}
                    ></input>
                  </div>
                  <div className="absolute top-8 ml-20 left-[520px] flex">
                    <p className="pr-4 mt-2"> To</p>
                    <input
                      type="date"
                      className="border p-1 border-gray rounded-md shadow bg-gray"
                      onChange={(e) => setEndDate(e.target.value)}
                    ></input>
                  </div>
                  <button
                    type="submit"
                    onClick={handleSubmittt}
                    className="font-medium w-20 h-10 mt-8 ml-5  bg-[#458758ae] text-black rounded-md hover:bg-hero"
                  >
                    Filter
                  </button>
                </div>
              )}
              {monthly && (
                <div className="flex w-auto">
                  <select
                    className="px-6 p-2 mr-2 py-2.5 bg-gray mt-8 text-black font-medium text-m rounded  focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg  flex items-center  whitespace-nowrap"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                  >
                    <option value="">Year</option>
                    <option value="2023">2023</option>
                    <option value="2022">2022</option>
                    <option value="2021">2021</option>
                    <option value="2020">2020</option>
                  </select>
                  <select
                    className="dropdown-toggle px-6 py-2.5 bg-gray mt-8 text-black font-medium text-m rounded  focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg  flex items-center  whitespace-nowrap"
                    value={option1}
                    onChange={(e) => setOption1(e.target.value)}
                  >
                    <option value="">Select</option>
                    <option value="M1">M1</option>
                    <option value="M2">M2</option>
                    <option value="M3">M3</option>
                    <option value="M4">M4</option>
                    <option value="M5">M5</option>
                    <option value="M6">M6</option>
                    <option value="M7">M7</option>
                    <option value="M8">M8</option>
                    <option value="M9">M9</option>
                    <option value="M10">M10</option>
                    <option value="M11">M11</option>
                    <option value="M12">M12</option>
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
                    <option value="">Year</option>
                    <option value="2023">2023</option>
                    <option value="2022">2022</option>
                    <option value="2021">2021</option>
                    <option value="2020">2020</option>
                  </select>
                  <select
                    className="dropdown-toggle px-6 py-2.5 bg-gray mt-8 text-black font-medium text-m rounded  focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg  flex items-center  whitespace-nowrap"
                    value={option1}
                    onChange={(e) => setOption1(e.target.value)}
                  >
                    <option value="">Select</option>
                    <option value="Q1">Q1</option>
                    <option value="Q2">Q2</option>
                    <option value="Q3">Q3</option>
                    <option value="Q4">Q4</option>
                    <option value="H1">H1</option>
                    <option value="H2">H2</option>
                    <option value="YEARLY">Yearly</option>
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
              {/* <button
                type="submit"
                onClick={handleSubmittt}
                className="font-medium w-20 h-10 mt-5 ml-[520px] bg-gray text-black rounded-md hover:bg-hero"
              >
                Filter
              </button>
              <button
                type="reset"
                onClick={handleClose}
                className="font-medium w-20 h-10 mt-5 ml-[50px] bg-gray text-black rounded-md hover:bg-hero"
              >
                clear
              </button> */}
            </div>
            <div className="mt-5  text-xl  rounded-full ml-5" onClick={handleDownloadExcel}>📩</div>
            <h1 className={`mt-5 ml-5 ${Object.keys(dataadmin).length>0?'':'hidden'} `}><span className="font-semibold">{entriesData}</span>  Entries Found </h1>
          </div>
          {tokenn && (
            <div className="table-container scrollbar-hidden h-[580px] w-full ">

            {/* position: fixed;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              overflow-x: auto; */}
                        <table id={ids} ref={tableRef} className={` h-[544  text-[12px]  overflow-scroll  text-center text-gray-500 dark:text-gray-400 `} >
                          <thead ref={divRef} style={{   height: '100px', overflow: 'auto' }} className={`bg- w-screen sticky top-0 z-30  text-[12px] text-gray-700 border-b-2 border-gray uppercase bg-white dark:bg-gray-700 dark:text-gray-400 `}>
                        {/* <table id={ids} ref={tableRef} className={` ${isStickyClass?'flex flex-col':''} w-  text-[12px]  overflow-scroll  text-center text-gray-500 dark:text-gray-400 `} >
                          <thead ref={divRef} style={{  transform: `translateX(-${scrollLeft2}px)`, height: '100px', overflow: 'auto' }} className={`${isStickyClass?'fixed top-20 w-[unset] scrollbar-hidden fixed-container overflow-x-auto z-40':'absolute z-50 w-[unset]'}  text-[12px] f -0  text-gray-700 border-b-2 border-gray uppercase bg-white dark:bg-gray-700 dark:text-gray-400`}> */}



                <tr>
                  <th scope="col" className="px-6 py-3">
                  Insured Name 
                  </th>
                  <th scope="col" className="px-6 py-3 cursor-pointer" onClick={handleSortLOB}>
                  Insurer
                  </th>
                  <th scope="col" className="px-6 py-3" >
                  Date of Loss
                  </th>
                  <th scope="col" className="px-6 py-3 cursor-pointer"   >
                  Intimation Date
                  </th>
                  <th scope="col" className="px-6 py-3">
                  Line of Business
                  </th>
                  <th scope="col" className="px-6 py-3">
                  Claims Amount
                  </th>
                  <th scope="col" className="px-6 py-3">
                  Policy Number
                  </th>
                  <th scope="col" className="px-6 py-3 cursor-pointer"  >
                  Claims Status
                  </th>

                  <th scope="col" className="px-6 py-3">
                  Surveyor Appointed
                  </th>
                  <th scope="col" className="px-6 py-3">
                  Intimation Amount 
                  </th>
                  <th scope="col" className="px-6 py-3">
                  Brokerage
                  </th>
                  <th scope="col" className="px-6 py-3">
                  Rewards
                  </th>
                  <th scope="col" className="px-6 py-3">
                  Settlement amount
                  </th>
                  <th scope="col" className="px-6 py-3">
                  Client ID  
                  </th>
                  <th scope="col" className="px-6 py-3">
                  Entry Date 
                  </th>
                
                  {/* <th scope="col" className="px-6 py-3">
<span >Edit</span>
</th> */}
                </tr>
              </thead>
              {/* <div ref={divRef2}  className="w h-full relative overflow-scroll"> */}
                {/* sdfjlfjlfdsffffffffffffffffffffffffffffffffffffffffff */}
              
              <tbody  onScroll={handleScroll2}  className='relative' style={{ transform: `translateX(-${scrollLeft}px)` }}  >
                {sortedData.map((item, key) => (
                  <tr className="bg-white border-b-2 capitalize border-gray dark:bg-gray-800 dark:border-gray-700 hover:bg-gray dark:hover:bg-gray-600">
                    <td className="px-6 py-4  " >{item.insuredName}</td>

                    <td className="px-6 py-4" onClick={() => {
                          setShowModalpolicy(true);
                          setIsOpen(false);
                          setContent(item);
                          setIdd(item.id);
                        }}>{item.insurer}</td>
                    <td className="px-6 py-4 ">{item.dateOfLoss}</td>
                    <td className="px-6 py-4">{item.intimationDate}</td>
                    <td className="px-6 py-4">{item.lineOfBusiness}</td>
                    <td className="px-6 py-4">{item.claimsAmount}</td>

                    <td className="px-6 py-4">{item.policyNumber}</td>
                    <td className="px-6 py-4">{item.claimStatus}</td>

                    <td className="px-6 py-4 cursor-pointer"  >{item.surveyorAppointed}</td>

                    <td className="px-6 py-4">{item.intimationAmount}</td>
                    <td className="px-6 py-4">{item.brokerage}</td>
                    <td className="px-6 py-4">{item.rewards}</td>
                    <td className="px-6 py-4">{item.settlementAmount}</td>
                    <td className="px-6 py-4">{item.clientId}</td>
                    <td className="px-6 py-4">{item.entryDate}</td>
                   
                    <td className="px-6 py-4 sticky right-10 text-right  flex p-4 bg-white"  style={{ transform: `translateX(${scrollLeft}px)`  }}>
                      <button
                        onClick={() => {
                          setShowModalpolicy(true);
                          setIsOpen(false);
                          setContent(item);
                          setIdd(item.id);
                          setLoading(false);
                        }}
                        id={key}
                        className="font-medium p-4 mr-2 bg-gray text-black rounded-md hover:bg-hero"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => {
                          setIdd(item.id);
                          setModell(true);
                          setKey(false);
                        }}
                        id={key}
                        className="font-medium p-2  bg-[#D2042D] text-white rounded-md hover:bg-hero"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              {/* </div> */}
            </table>
            </div>

          )}
          {modell ? (
            <>
              <div className="justify-center items-center h-11/12 flex overflow-x-hidden bg-[rgba(0,0,0,.2)] bg-blend-darken overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-9/12 my-6 mx-auto max-w-3xl">
                  {/*content*/}
                  <form>
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white  outline-none focus:outline-none">
                      {/*header*/}
                      <div className="flex items-center justify-between p-5 border-solid border-slate-200 rounded-t">
                        <h3 className="text-2xl font-semibold ">
                          Are you sure you want to delete this user{" "}
                          <span className="text-[#50C878]">{uid}</span>
                        </h3>
                        <button
                          className="text-red-500 background-transparent font-bold text-2xl uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          type="button"
                          onClick={handleDeleteCloseModel}
                        >
                          X
                        </button>
                      </div>
                      {/*body*/}
                      {/* <div>
               <h1>ss</h1>
                </div> */}
                      {key && (
                        <p className="text-[#9ACD32] text-md text-left pl-10">
                          Deleted Successfully
                        </p>
                      )}
                      <div className="flex items-center justify-end p-6  border-solid border-slate-200 rounded-b">
                        <button
                          className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          type="button"
                          onClick={handleDeleteCloseModel}
                        >
                          Close
                        </button>

                        <button
                          type="submit"
                          onClick={handleDelete}
                          className="inline-block px-6 py-2.5 bg-hero text-white font-medium text-xs leading-tight uppercase rounded  hover:shadow-lg hover:text-black focus:shadow-lg focus:outline-none "
                        >
                          submit
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </>
          ) : null}
          {allProducts && (
            <table className=" text-sm w-full text-center text-gray-500 dark:text-gray-400 ">
              <thead className="text-xs text-gray-700 border-b-2 border-gray uppercase bg-white dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Department
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Insurance Product
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Insurance Type
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Insurance Type Description
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Insured Address
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Business By
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Insured Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Insured Location
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Insurer
                  </th>

                  <th scope="col" className="px-6 py-3">
                    Policy Start Date
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Policy End Date
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Policy Number
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Registration Number
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Vehicle Make
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Model
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Year of Registration
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Engine Number
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Chassis Number
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Description
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Sum Insured
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Motor OD Premium Amount
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Motor TP Premium Amount
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Premium
                  </th>
                  <th scope="col" className="px-6 py-3">
                    GST
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Gross Premium
                  </th>
                  <th scope="col" className="px-6 py-3">
                    OD Brokerage Rate
                  </th>
                  <th scope="col" className="px-6 py-3">
                    TP Brokerage Rate
                  </th>
                  <th scope="col" className="px-6 py-3">
                    OD Commision
                  </th>
                  <th scope="col" className="px-6 py-3">
                    TP Commision
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Total Commision
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Previous Policy No
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Previous Insurer
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Cover Note NO
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Mode Of Payment
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Retro Active Date
                  </th>
                  <th scope="col" className="px-6 py-3">
                    BQP
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Risk Location
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Assests Covered
                  </th>
                  <th scope="col" className="px-6 py-3">
                    PAN No
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Deductible
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Financier Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Mobile No
                  </th>
                  {/* <th scope="col" className="px-6 py-3">
<span >Edit</span>
</th> */}
                </tr>
              </thead>
              <tbody>
                {dataadmin.reverse().map((item, key) => (
                  <tr className="bg-white border-b-2 border-gray dark:bg-gray-800 dark:border-gray-700 hover:bg-gray dark:hover:bg-gray-600">
                    <td className="px-6 py-4">{item.lineOfBusiness}</td>
                    <td className="px-6 py-4">{item.insuranceProduct}</td>
                    <td className="px-6 py-4">{item.insuranceType}</td>
                    <td className="px-6 py-4">{item.insuranceTypeDesc}</td>
                    <td className="px-6 py-4">{item.insuredAddress}</td>
                    <td className="px-6 py-4">{item.businessBy}</td>
                    <td className="px-6 py-4">{item.insuredName}</td>

                    <td className="px-6 py-4">{item.insurer}</td>

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
                    <td className="px-6 py-4">{item.totalCommission}</td>
                    <td className="px-6 py-4">{item.previousPolicyNo}</td>
                    <td className="px-6 py-4">{item.previousInsurer}</td>
                    <td className="px-6 py-4">{item.coverNoteNumber}</td>
                    <td className="px-6 py-4">{item.modeOfPayment}</td>
                    <td className="px-6 py-4">{item.retroActiveDate}</td>
                    <td className="px-6 py-4">{item.bpq}</td>
                    <td className="px-6 py-4">{item.riskLocation}</td>
                    <td className="px-6 py-4">{item.assestsCovered}</td>
                    <td className="px-6 py-4">{item.panNo}</td>
                    <td className="px-6 py-4">{item.deductible}</td>
                    <td className="px-6 py-4">{item.financierName}</td>
                    <td className="px-6 py-4">{item.mobileNo}</td>
                    <td className="px-6 py-4 text-right right-0 sticky p-4 bg-white">
                      <button
                        onClick={() => {
                          setShowModalpolicy(true);
                          setIsOpen(false);
                        }}
                        id={key}
                        className="font-medium p-4  bg-gray text-black rounded-md hover:bg-hero"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {/* <Pagination
                  postsPerPage={postsPerPage}
                  totalPosts={dataadmin.length}
                  paginate={paginate}
                  previousPage={previousPage}
                  nextPage={nextPage}
                  currentPage={currentPage}
               /> */}
          <Pagination
            className="flex justify-center"
            current={currentPage}
            total={tot}
            onPageChange={setCurrentPage}
            maxWidth={100}
          />
        </div>
      )}

      {authenticated && (
        <div className="relative overflow-x-auto  shadow-md sm:rounded-lg w-11/12 ml-14 mt-10 p-4 bg-white">
          <h3 className="bg-white text-lg p-4 font-semibold">Summary</h3>

          <table className=" text-sm w-full text-center text-gray-500 dark:text-gray-400 ">
            <thead className="text-xs text-gray-700 border-b-2 border-gray uppercase bg-white dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  id
                </th>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Contact No
                </th>
                <th scope="col" className="px-6 py-3">
                  Insurance Type
                </th>
                <th scope="col" className="px-6 py-3">
                  Message
                </th>
                <th scope="col" className="px-6 py-3">
                  Lead Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Comments
                </th>
                <th scope="col" className="px-6 py-3">
                  Submit Date
                </th>

                {/* <th scope="col" className="px-6 py-3">
<span >Edit</span>
</th> */}
              </tr>
            </thead>
            <tbody>
              {currentPosts.map((item, key) => (
                <tr className="bg-white border-b-2 border-gray dark:bg-gray-800 dark:border-gray-700 hover:bg-gray dark:hover:bg-gray-600">
                  <td className="px-6 py-4" key={item.id}>
                    {item.id}
                  </td>
                  <td className="px-6 py-4">{item.name}</td>
                  <td className="px-6 py-4">{item.email}</td>
                  <td className="px-6 py-4">{item.contactNo}</td>
                  <td className="px-6 py-4">{item.insuranceType}</td>
                  <td className="px-6 py-4">{item.message}</td>
                  <td className="px-6 py-4 ">
                    <div
                      className="p-1 rounded-full"
                      style={{
                        backgroundColor:
                          item.leadStatus === "Inprogress"
                            ? "#FFBF00"
                            : item.leadStatus === "Pending"
                            ? "#FAA0A0"
                            : item.leadStatus === "Done"
                            ? "#AFE1AF"
                            : "white",
                      }}
                    >
                      {item.leadStatus}
                    </div>
                  </td>
                  <td className="px-6 py-4">{item.comments}</td>
                  <td className="px-6 py-4">{item.submitDate}</td>

                  <td className="px-6 py-4 text-right right-0 sticky p-4 bg-white">
                    <button
                      onClick={() => {
                        setKey(item.id);
                        setNamee(item.name);
                        setShowModal(true);
                        setIsOpen(false);
                      }}
                      id={key}
                      className="font-medium p-4  bg-gray text-black rounded-md hover:bg-hero"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={data.length}
            paginate={paginate}
            previousPage={previousPage}
            nextPage={nextPage}
          />
        </div>
      )}
      {showModal ? (
        <>
          <div className="justify-center items-center h-11/12 flex overflow-x-hidden bg-[rgba(0,0,0,.2)] bg-blend-darken overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-9/12 my-6 mx-auto max-w-3xl">
              {/*content*/}
              <form>
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white  outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                    <h3 className="text-2xl font-semibold">Update</h3>
                    <button
                      className="text-red-500 background-transparent font-bold text-2xl uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      X
                    </button>
                  </div>
                  {/*body*/}
                  <form>
                    <div className="flex justify-start">
                      <div className="flex flex-col">
                        <label
                          className="text-black text-lg ml-10 mb-2 mt-4 float-left  "
                          for="emailAddress"
                        >
                          ID
                        </label>
                        <input
                          name="id"
                          type="text"
                          value={id}
                          disabled
                          className="block w-11/12 px-4 py-2 ml-10 text-gray-700 border border-gray mb-5 rounded shadow border-2 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label
                          className="text-black text-lg  ml-11 mb-2 mt-4 float-left dark:text-gray-200"
                          for="emailAddress"
                        >
                          Name
                        </label>
                        <input
                          name="editLeadStatus"
                          type="text"
                          value={nam}
                          disabled
                          className="block w-11/12 ml-10 px-4 py-2  text-gray-700 border border-gray mb-5 rounded shadow border-2 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        className="text-black mb-4 ml-4 text-lg float-left dark:text-gray-200"
                        for="passwordConfirmation"
                      >
                        Lead Status
                      </label>
                      <select
                        onChange={(e) => setValuee(e.target.value)}
                        className="block w-11/12 px-4 ml-10 py-2 mt-2 text-gray-700 bg-white border border-gray mb-5 rounded shadow border-2 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                      >
                        <option value="">Select Status</option>
                        <option value="Pending">Pending</option>
                        <option value="Inprogress">In Progress</option>
                        <option value="Done">Done</option>
                      </select>
                    </div>
                    <div>
                      <label
                        className="text-black text-lg mb-4 ml-4 float-left dark:text-gray-200"
                        for="emailAddress"
                      >
                        Comments
                      </label>
                      <input
                        name="editComments"
                        type="text"
                        onChange={handleChange}
                        value={isOpen ? "" : update.editComments}
                        className="block w-11/12 ml-10 px-4 py-2 mt-2 text-gray-700 border border-gray mb-5 rounded shadow border-2 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                      />
                    </div>

                    {/*footer*/}
                    <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                      {isOpen && (
                        <p className="text-[#9ACD32] text-md text-center pl-10">
                          Details Uploaded Successfully
                        </p>
                      )}

                      <button
                        type="submit"
                        onClick={handleSubmitt}
                        className="inline-block px-6 py-2.5 bg-hero text-white font-medium text-xs leading-tight uppercase rounded shadow-md  hover:shadow-lg hover:text-black focus:shadow-lg focus:outline-none "
                      >
                        submit
                      </button>
                    </div>
                  </form>
                </div>
              </form>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}

      {showModalPolicy ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden bg-[rgba(0,0,0,.2)] bg-blend-darken overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-9/12  h-[91%] overflow-x-hidden overflow-y-auto  mx-auto max-w-3xl ">
              {/*content*/}
              <form>
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white  outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-center  justify-around p-5 border-b border-solid border-slate-200 rounded-t">
                    <h3 className="text-2xl font-semibold">Update Policy</h3>
                    {loading && (
                      <p className="text-[#9ACD32] text-md text-center pl-10">
                        Details Uploaded Successfully
                      </p>
                    )}
 <div className="flex space-x-2  justify-center ">
                                  <button
                                    type="submit"
                                    onClick={handleSum}
                                    className="inline-block px-6 py-2.5 bg-hero text-white font-medium text-xs leading-tight uppercase rounded shadow-md  hover:shadow-lg hover:text-black focus:shadow-lg focus:outline-none"
                                  >
                                    submit
                                  </button>
                                </div>

                    <button
                      className="text-red-500 background-transparent font-bold text-2xl uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={handleCloseModel }
                    >
                      X
                    </button>
                  </div>
                  {/*body*/}
                  <form>
                    <div className="flex flex-wrap">
                      <div className="w-full">
                        <ul
                          className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
                          role="tablist"
                        >
                          <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                            <a
                              className={
                                "text-xs font-bold uppercase px-5 py-3 ml-2 block leading-normal " +
                                (openTab === 1
                                  ? "text-black border-b-2 border-hero"
                                  : "text-black")
                              }
                              onClick={(e) => {
                                e.preventDefault();
                                setOpenTab(1);
                              }}
                              data-toggle="tab"
                              href="#link1"
                              role="tablist"
                            >
                              Tab1
                            </a>
                          </li>
                          <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                            <a
                              className={
                                "text-xs font-bold uppercase px-5 py-3 block leading-normal " +
                                (openTab === 2
                                  ? "text-black border-b-2 border-hero"
                                  : "text-" + color + "-600 bg-white")
                              }
                              onClick={(e) => {
                                e.preventDefault();
                                setOpenTab(2);
                              }}
                              data-toggle="tab"
                              href="#link2"
                              role="tablist"
                            >
                              Tab2
                            </a>
                          </li>
                         
                           
                        </ul>
                        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                          <div className="px-4 py-5 flex-auto">
                            <div className="tab-content tab-space">
                              <div
                                className={openTab === 1 ? "block" : "hidden"}
                                id="link1"
                              >
                                <div className="md:inline-flex space-y-4 md:space-y-0 w-full p-4  items-center">
                                  <h2 className="md:w-1/3 max-w-sm mx-auto">
                                  Insured Name
                                    <span
                                      className={
                                        required ? `text-[#f45138]` : "hidden"
                                      }
                                    >
                                      *
                                    </span>
                                  </h2>
                                  <div className="md:w-2/3 max-w-sm mx-auto">
                                    <input
                                      type="text"
                                      className="w-11/12 placeholder-[#000000] focus:outline-none focus:text-gray-600  p-2  border border-gray rounded shadow border-2"
                                      placeholder={con.insuredName}
                                      name="Insured_Name"
                                      onChange={handleChangee}
                                    />
                                  </div>
                                </div>
                                <hr className="border-gray" />
                                <div className="md:inline-flex space-y-4 md:space-y-0 w-full p-4  items-center">
                                  <h2 className="md:w-1/3 max-w-sm mx-auto">
                                  Insurer
                                    <span
                                      className={
                                        required ? `text-[#f45138]` : "hidden"
                                      }
                                    >
                                      *
                                    </span>
                                  </h2>
                                  <div className="md:w-2/3 max-w-sm mx-auto">
                                    <input
                                      type="text"
                                      className="w-11/12 placeholder-[#000000] focus:outline-none focus:text-gray-600  p-2  border border-gray rounded shadow border-2"
                                      placeholder={con.insurer}
                                      name="Insurer"
                                      onChange={handleChangee}

                                    />
                                  </div>
                                </div>
                                <hr className="border-gray" />
                                <div className="md:inline-flex relative space-y-4 md:space-y-0 w-full p-4  items-center">
                                  <h2 className="md:w-1/3 max-w-sm mx-auto">
                                  Date of Loss
                                    <span
                                      className={
                                        required ? `text-[#f45138]` : "hidden"
                                      }
                                    >
                                      *
                                    </span>
                                  </h2>
                                  <div className="md:w-2/3  max-w-sm mx-auto">
                          <div className="md:w-2/3 absolute top-0   max-w-sm mx-auto">
                                    <input
                                      type="date"
                                      className="w-11/12 placeholder-[#000000]  focus:outline-none focus:text-gray-600  p-2  border border-gray rounded shadow border-2"
                                      defaultValue={con.dateOfLoss}
                                      name="Date_of_Loss"
                                      id='Date_of_Loss'
                                      onChange={handleChangee}
                                    />
                                  </div>
                                  </div>
                                </div>
                                <div className="md:inline-flex relative space-y-4 md:space-y-0 w-full p-4  items-center">
                                  <h2 className="md:w-1/3 max-w-sm mx-auto">
                                  Intimation Date
                                    <span
                                      className={
                                        required ? `text-[#f45138]` : "hidden"
                                      }
                                    >
                                      *
                                    </span>
                                  </h2>
                                  <div className="md:w-2/3  max-w-sm mx-auto">
                          <div className="md:w-2/3 absolute top-0   max-w-sm mx-auto">
                                    <input
                                      type="date"
                                      className="w-11/12 placeholder-[#000000]  focus:outline-none focus:text-gray-600  p-2  border border-gray rounded shadow border-2"
                                      defaultValue={con.intimationDate}
                                      name="Intimation_Date"
                                      id='Intimation_Date'
                                      onChange={handleChangee}
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
                                    <input
                                      type="text"
                                      className="w-11/12 placeholder-[#000000]  focus:outline-none focus:text-gray-600  p-2  border border-gray rounded shadow border-2"
                                      placeholder={con.lineOfBusiness}
                                      name="Line_Of_Business"
                                      onChange={handleChangee}
                                    />
                                  </div>
                                </div>

                                <div className="md:inline-flex space-y-4 md:space-y-0 w-full p-4  items-center">
                                  <h2 className="md:w-1/3 max-w-sm mx-auto">
                                  Claims Amount
                                  </h2>
                                  <div className="md:w-2/3 max-w-sm mx-auto">
                                    <input
                                      type="text"
                                      className="w-11/12 placeholder-[#000000]  focus:outline-none focus:text-gray-600  p-2  border border-gray rounded shadow border-2"
                                      placeholder={con.claimsAmount}
                                      name="Claims_Amount"
                                      onChange={handleChangee}
                                    />
                                  </div>
                                </div>

                                <div className="md:inline-flex space-y-4 md:space-y-0 w-full p-4  items-center">
                                  <h2 className="md:w-1/3 max-w-sm mx-auto">
                                  Policy Number
                                  </h2>
                                  <div className="md:w-2/3 max-w-sm mx-auto">
                                    <input
                                      type="text"
                                      className="w-11/12 placeholder-[#000000]  focus:outline-none focus:text-gray-600  p-2  border border-gray rounded shadow border-2"
                                      placeholder={con.policyNumber}
                                      name="Policy_Number"
                                      onChange={handleChangee}
                                    />
                                  </div>
                                </div>
                                <hr className="border-gray" />
                              </div>
                              <div
                                className={openTab === 2 ? "block" : "hidden"}
                                id="link2"
                              >
                                <div className="md:inline-flex space-y-4 md:space-y-0 w-full p-4  items-center">
                                  <h2 className="md:w-1/3 max-w-sm mx-auto">
                                  Claims Status
                                    <span
                                      className={
                                        required ? `text-[#f45138]` : "hidden"
                                      }
                                    >
                                      *
                                    </span>
                                  </h2>
                                  <div className="md:w-2/3 max-w-sm mx-auto">
                                    <input
                                      type="text"
                                      className="w-11/12 placeholder-[#000000] focus:outline-none focus:text-gray-600  p-2  border border-gray rounded shadow border-2"
                                      placeholder={con.claimStatus}
                                      name="Claims_Status"
                                      onChange={handleChangee}
                                    />
                                  </div>
                                </div>
                                <hr className="border-gray" />
                                <div className="md:inline-flex space-y-4 md:space-y-0 w-full p-4  items-center">
                                  <h2 className="md:w-1/3 max-w-sm mx-auto">
                                  Surveyor Appointed
                                    <span
                                      className={
                                        required ? `text-[#f45138]` : "hidden"
                                      }
                                    >
                                      *
                                    </span>
                                  </h2>
                                  <div className="md:w-2/3 max-w-sm mx-auto">
                                    <input
                                      type="text"
                                      className="w-11/12 placeholder-[#000000] focus:outline-none focus:text-gray-600  p-2  border border-gray rounded shadow border-2"
                                      placeholder={con.surveyorAppointed}
                                      name="Surveyor_Appointed"
                                      onChange={handleChangee}
                                    />
                                  </div>
                                </div>
                                <hr className="border-gray" />
                                <div className="md:inline-flex space-y-4 md:space-y-0 w-full p-4  items-center">
                                  <h2 className="md:w-1/3 max-w-sm mx-auto">
                                  Intimation Amount
                                    <span
                                      className={
                                        required ? `text-[#f45138]` : "hidden"
                                      }
                                    >
                                      *
                                    </span>
                                  </h2>
                                  <div className="md:w-2/3 max-w-sm mx-auto">
                                    <input
                                      type="text"
                                      className="w-11/12 placeholder-[#000000] focus:outline-none focus:text-gray-600  p-2  border border-gray rounded shadow border-2"
                                      placeholder={con.intimationAmount}
                                      name="Intimation_Amount"
                                      onChange={handleChangee}
                                    />
                                  </div>
                                </div>
                                <hr className="border-gray" />
                                
                                <div>
                                  <div className="md:inline-flex space-y-4 md:space-y-0 w-full p-4  items-center">
                                    <h2 className="md:w-1/3 max-w-sm mx-auto ">
                                    Brokerage
                                      <span
                                        className={
                                          required ? `text-[#f45138]` : "hidden"
                                        }
                                      >
                                        *
                                      </span>
                                    </h2>

                                    <div className="md:w-2/3 max-w-sm mx-auto">
                                      <input
                                        type="text"
                                        className="w-11/12 placeholder-[#000000] focus:outline-none focus:text-gray-600  p-2  border border-gray rounded shadow border-2"
                                        placeholder={con.brokerage}
                                        name="Brokerage"
                                        onChange={handleChangee}
                                      />
                                    </div>
                                  </div>
                                  <div className="md:inline-flex space-y-4 md:space-y-0 w-full p-4  items-center">
                                    <h2 className="md:w-1/3 max-w-sm mx-auto ">
                                    Rewards
                                      <span
                                        className={
                                          required ? `text-[#f45138]` : "hidden"
                                        }
                                      >
                                        *
                                      </span>
                                    </h2>

                                    <div className="md:w-2/3 max-w-sm mx-auto">
                                      <input
                                        type="text"
                                        className="w-11/12 placeholder-[#000000] focus:outline-none focus:text-gray-600  p-2  border border-gray rounded shadow border-2"
                                        placeholder={con.rewards}
                                        name="Rewards"
                                        onChange={handleChangee}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <hr className="border-gray mt-8" />
                                <div className="md:inline-flex space-y-4 md:space-y-0 w-full p-4  items-center">
                                  <h2 className="md:w-1/3 max-w-sm mx-auto">
                                  Settlement Amount
                                    <span
                                      className={
                                        required ? `text-[#f45138]` : "hidden"
                                      }
                                    >
                                      *
                                    </span>
                                  </h2>
                                  <div className="md:w-2/3 max-w-sm mx-auto">
                                    <input
                                      type="Number"
                                      className="w-11/12 placeholder-[#000000] focus:outline-none focus:text-gray-600  p-2  border border-gray rounded shadow border-2"
                                      placeholder={con.settlementAmount}
                                      name="Settlement_Amount"
                                      onChange={handleChangee}
                                    />
                                  </div>
                                </div>
                                <hr className="border-gray" />
                                <div className="md:inline-flex space-y-4 md:space-y-0 w-full p-4  items-center">
                                  <h2 className="md:w-1/3 max-w-sm mx-auto">
                                  Client ID
                                    <span
                                      className={
                                        required ? `text-[#f45138]` : "hidden"
                                      }
                                    >
                                      *
                                    </span>
                                  </h2>
                                  <div className="md:w-2/3 max-w-sm mx-auto">
                                    <input
                                      type="text"
                                      className="w-11/12 placeholder-[#000000] focus:outline-none focus:text-gray-600  p-2  border border-gray rounded shadow border-2"
                                      placeholder={con.clientId}
                                      name="Client_ID"
                                      onChange={handleChangee}
                                    />
                                  </div>
                                </div>
                                <hr className="border-gray" />
                                <div className="md:inline-flex relative space-y-4 md:space-y-0 w-full p-4  items-center">
                                  <h2 className="md:w-1/3 max-w-sm mx-auto">
                                  Entry Date
                                    <span
                                      className={
                                        required ? `text-[#f45138]` : "hidden"
                                      }
                                    >
                                      *
                                    </span>
                                  </h2>
                                  <div className="md:w-2/3  max-w-sm mx-auto">
                          <div className="md:w-2/3 absolute top-0   max-w-sm mx-auto">
                                    <div className="   bottom-[390px]">
                                      <input
                                        type="date"
                                        className="w-11/12 placeholder=[#000000] focus:outline-none focus:text-gray-600  p-2  border border-gray rounded shadow border-2"
                                        defaultValue={con.entryDate}
                                        name="Entry_Date"
                                        onChange={handleChangee}
                                      />
                                    </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                          
                           
                          
                       

                            </div>
                          </div>
                          
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </form>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
      {showModalPolicyy ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden bg-[rgba(0,0,0,.2)] bg-blend-darken overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-9/12 h-11/12 my-6 mx-auto max-w-3xl">
              {/*content*/}
              <form>
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white  outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                    <h3 className="text-2xl font-semibold">Details</h3>

                    <button
                      className="text-red-500 background-transparent font-bold text-2xl uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setShowModalpolicyy(false)}
                    >
                      X
                    </button>
                  </div>
                  {/*body*/}
                  <form>
                    <table className=" text-sm w-full text-center text-gray-500 dark:text-gray-400 ">
                      <thead className="text-xs text-gray-700 border-b-2 border-gray uppercase bg-white dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                          <th scope="col" className="px-6 py-3">
                            Line Of Business
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Number Of Customers
                          </th>

                          {/* <th scope="col" className="px-6 py-3">
<span >Edit</span>
</th> */}
                        </tr>
                      </thead>
                      <tbody>
                        {lob.lineOfBusinessObjs.map((item, key) => (
                          <tr className="bg-white border-b-2 border-gray dark:bg-gray-800 dark:border-gray-700 hover:bg-gray dark:hover:bg-gray-600">
                            <td className="px-6 py-4">{item.lineOfBusiness}</td>
                            <td className="px-6 py-4">{item.numberOfPolicies}</td>

                            <td className="px-6 py-4 text-right right-0 sticky p-4 bg-white"></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </form>
                </div>
              </form>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </div>
  );
};

export default Sales;
