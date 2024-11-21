import React from "react";
import { useEffect, useState, useRef } from "react";
import * as XLSX from "xlsx";

import axios from "axios";
import Pagination from "react-responsive-pagination";
import { AiOutlineSearch } from "react-icons/ai";
import { FaFileDownload } from "react-icons/fa";
import '../dashboard/Pagination.css'
import DeleteData from "./DeleteData";
import EditData from "./EditData";
import ScrollToTop from "../ScrollToTop";
const Sales = ({ids,isSticky='',handleTableIntersection}) => {
  
  const [scrollLeft, setScrollLeft] = useState(0);
  const [filterValue, setFilterValue] = useState(''); // State to store the input value
  const [firstCall, setFirstCall] = useState(true)
  const [mode, setMode] = useState("45");
  const [tokenn, setTokenn] = useState(false);
  const [len, setLen] = useState();
  const [option1, setOption1] = useState("1");
  const [year, setYear] = useState("2023");


  const [dataadmin, setDataadmin] = useState([]);
const [openModel, setOpenModel] = useState(false)
const [showModalPolicy, setShowModalpolicy] = useState(false);
const [sortOrder, setSortOrder] = useState('asc');
const [sortingFor, setSortingFor] = useState()
const [currentPage, setCurrentPage] = useState(1);
const [postsPerPage] = useState(10);
let [pageCount, setPageCount] = useState(0)
const [sendEditData, setSendEditData] = useState([])
const [sortedDatas, setSortedDatas] = useState(dataadmin)

const tableRef = useRef(null);
  
  const API_ENDPOINT = process.env.REACT_APP_API_URL;
  const name = JSON.parse(localStorage.getItem("namee"));
  const Password = JSON.parse(localStorage.getItem("pwd"));
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPostsadmin = sortedDatas.slice(indexOfFirstPost, indexOfLastPost);

/* ---------------------- Function for to filter Send Edit Data ------------- */

const handleFindEditData = (id)=>{
  console.log('id',id)
const filterItem = dataadmin.filter(itemId=>{
 
  return (itemId.id.toString() === id.toString());
})
setSendEditData(filterItem)

}




  const handleSubmittt = (e) => {
    e.preventDefault();
    axios
      .get(`${API_ENDPOINT}/get/upcoming/policy/v2?years=${year}&months=${+option1}`, {
        auth: {
          username: name,
          password: Password,
        }
       
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

  const tot = Math.ceil(sortedDatas.length / postsPerPage);



  
          /* ----------------------- Sorting Logic For Table start Here ---------------------------- */
  const handleSortLOB = () => {
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newSortOrder);
    setSortingFor('lineOfBusiness')
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

  // Sort the data array based on the sortOrder
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


const tableTrData = [
  {
    id:1,
    name:'Id',
  },
  {
    id:2,
    name:'Line Of Business',
    func:handleSortLOB
  },
  {
    id:3,
    name:'Insurance Product',
    func:handleSortIP
  },
  {
    id:4,
    name:'Insurance Type',
    func:handleSortLOB
  },
  {
    id:5,
    name:'Insured Address',
  },
  {
    id:6,
    name:'Business By',
  },
  {
    id:7,
    name:'Insured Name',
    func:handleSortIN
  },
  {
    id:8,
    name:'Insurer',
  },
  {
    id:9,
    name:'Policy Start Date',
  },
  {
    id:10,
    name:'Policy End Date',
  },
  {
    id:11,
    name:'Gross Premium',
  },
  {
    id:12,
    name:'Insured Type',
  },
  {
    id:13,
    name:'Renewal Status',
  },
  {
    id:14,
    name:'Comments',
  },
  {
    id:15,
    name:'Not Converted Reason',
  },
  
]


const handleSearchChange = (e)=>{
  const searchValue = e.target.value;
  setFilterValue(searchValue);
  setFirstCall(false)
  // Recalculate the filter based on the updated searchValue
   const updatedFilteredData = sortedData.filter(item => {
    const searchTerms = searchValue.trim().toLowerCase().split(' ');
    return searchTerms.every(term => {
      return Object.values(item).some(value => {
        if (value && value.toString().toLowerCase().includes(term)) {
          return true;
        }else {
          return false
        }
      });
    });
  });
  setSortedDatas(searchValue.length>0?updatedFilteredData:dataadmin);
}
const handleDownloadExcel = ()=>{ 
  axios({
    url:`${API_ENDPOINT}/UpcomingRenewalExcel?Days=${mode}`,
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
   link.setAttribute('download', 'leadsReport.xlsx'); // Set the desired filename
   
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
      // Handle any error that occurs during the API request
      console.error('Error downloading file:', error);
    });
}
  return (
    <div className=" " >

      <div className="" >

   
        <div className="relative overflow-x-auto  shadow-md sm:rounded-lg w-11/12 ml-14  p-4 bg-white" >
            <h3 className="bg-white text-xl p-4 font-semibold">Summary</h3>
          <div className="flex items-center ml-20">
          <h1 className="font-semibold">
              Expiring In : 
            </h1>
          {/*   <select
                className=" px-6 py-2.5 bg-gray mt- 8 mr-4 ml-4 text-black font-medium text-m rounded  focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg  flex items-center  whitespace-nowrap"
                value={mode}
                onChange={(e) => setMode(e.target.value)}
              >
                <option value="selectchart">Select Days</option>
                <option value="45">45</option>
                <option value="30">30</option>
                <option value="15">15</option>
                <option value="10">10</option>
              </select> */}
                  <select
                    className="px-6 p-2 mr-2 py-2.5 bg-gray mt-   text-black font-medium text-m rounded  focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg  flex items-center  whitespace-nowrap"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                  >
                    <option value="">Year</option>
                    <option value="2024">2024</option>
                    <option value="2023">2023</option>
                    <option value="2022">2022</option>
                    <option value="2021">2021</option>
                    <option value="2020">2020</option>
                  </select>
                  <select
                    className="dropdown-toggle px-6 py-2.5 bg-gray   text-black font-medium text-m rounded  focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg  flex items-center  whitespace-nowrap"
                    value={option1}
                    onChange={(e) => setOption1(e.target.value)}
                  >
                    <option value="">Select</option>
                    <option value="1">1</option>  
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                  </select>
               
              <button
                    type="submit"
                    onClick={handleSubmittt}
                    className="font-medium w-20 h-10  ml-3 mt- 8  bg-gray text-black rounded-md hover:bg-hero"
                  >
                    Filter
                  </button>

              <div  title="Click to download File" className="  text-xl cursor-pointer bg-[#f1f2f5] h-9 w-9 shadow-2xl  drop-shadow-2xl border border-[#d1d6d6] rounded-full ml-5"  onClick={handleDownloadExcel}><FaFileDownload className="text-hero mt-2 ml-2    shadow-xl"/></div>
              <h1 className={` ml-5 ${Object.keys(dataadmin).length>0?'':'hidden'} `}><span className="font-semibold">{len}</span>  Entries Found </h1>
              <div className=" h-8 ml-5 flex  border-2 border-[#676d7089] rounded-lg px-2 ">

<AiOutlineSearch className="text-xl mt-1.5" />
<input  
value={filterValue}   onChange={handleSearchChange}  type="text" placeholder="Search here to filter" className="focus:outline-none pl-1" />
</div>

          </div>
          {tokenn && (
              <div className="table-container scrollbar-hidden h-[580px] w-full  ">

                          <table id={ids} ref={tableRef} className={` h-[544  text-[12px]  overflow-scroll  text-center text-gray-500 dark:text-gray-400 `} >
                            <thead   style={{   height: '100px', overflow: 'auto' }} className={`bg- w-screen sticky top-0 z-30  text-[12px] text-gray-700 border-b-2 border-gray uppercase bg-white dark:bg-gray-700 dark:text-gray-400 `}> <tr>
                  {tableTrData.map((item,key)=>(
                        <th scope="col" id={key} key={key} className="px-6 py-3 w-max" >
                       {item.name}
                      </th>
                  ))}
                </tr>
                 

              </thead>
              <tbody>
                {currentPostsadmin.map((item, key) => (
                  <tr className="bg-white border-b-2 border-gray dark:bg-gray-800 dark:border-gray-700 hover:bg-gray dark:hover:bg-gray-600">
                    <td className="px-6 py-4" onClick={(event)=>{
                      setOpenModel(!openModel)
                      }} >{item.id}</td>

                    <td className="px-6 py-4">{item.lineOfBusiness}</td>
                    <td className="px-6 py-4">{item.insuranceProduct}</td>
                    <td className="px-6 py-4">{item.insuranceType}</td>
                    <td className="px-6 py-4">{item.insuredAddress}</td>
                    <td className="px-6 py-4">{item.businessBy}</td>
                    <td className="px-6 py-4">{item.insuredName}</td>
                    <td className="px-6 py-4">{item.insurer}</td>
                    <td className="px-6 py-4">{item.policyStartDate}</td>
                    <td className="px-6 py-4">{item.policyEndDate}</td>
                    <td className="px-6 py-4">{item.grossPremium}</td>
                    <td className="px-6 py-4">{item.insuredType}</td>
                    <td className="px-6 py-4">{item.renewalStatus}</td>
                    <td className="px-6 py-4">{item.comments}</td>
                    <td className="px-6 py-4">{item.notConvertedReason}</td>

                  
                    <td className=" sticky right-5 text-right  flex p-4  rounded-lg bg-white"  style={{ transform: `translateX(${scrollLeft}px)`  }}>
                      <button
                        onClick={() => {
                          setShowModalpolicy(true);
                          handleFindEditData(item.id)
                          // setIsOpen(false);
                          // setContent(item);
                          // setIdd(item.id);
                          // setLoading(false);
                        }}
                        id={key}
                        className="font-medium p-4 mr-2 bg-gray shadow-lg text-black rounded-md hover:bg-[#bcb7b9]"
                      >
                        Edit
                      </button>

                      
                    </td>
                  </tr>
                ))}
              </tbody>
              </table>
              <Pagination
                     className="flex  justify-center"

            current={currentPage}
            total={tot}
            onPageChange={setCurrentPage}
            maxWidth={100}
          />
            </div>

          )}

      
        </div>
    
      {showModalPolicy ? (
      <ScrollToTop>


    <EditData mode={mode} editData={sendEditData} updateEditData ={[dataadmin,setDataadmin]} showModel={[showModalPolicy, setShowModalpolicy]} />
      </ScrollToTop>
      ) : null}
  
      </div>

    </div>
  );
};

export default Sales;
