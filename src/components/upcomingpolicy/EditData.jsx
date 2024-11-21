import axios from 'axios'
import React,{useState,useEffect} from 'react'

const EditData = ({showModel,editData,mode,updateEditData}) => {

    const [openTab, setOpenTab] = useState(1)
    const [tabVal, setTabVal] = useState(1)
    const [loading, setLoading] = useState(false)
    const [renewalDroVal, setRenewalDroVal] = useState([])
    const [updateLeadData, setUpdateLeadData] = updateEditData
const [inputs, setInputs] = useState({})
    const [editDatas, setEditDatas] = useState([
        
        {
            "lineOfBusiness": "",
            "insuranceProduct": "",
            "insuranceType": '',
            "insuredAddress": "",
            "businessBy": "",
            "insuredName": "",
            "insurer": "",
            "policyStartDate": "",
            "policyEndDate": "",
            "grossPremium": "",
            "insuredType": "",
            "renewalStatus": "",
            "comments": "",
            "notConvertedReason": ""
        }
        
    ])
    const [showModalPolicy, setShowModalpolicy] =showModel

    const API_ENDPOINT = process.env.REACT_APP_API_URL;
    const name = JSON.parse(localStorage.getItem("namee"));
    const Password = JSON.parse(localStorage.getItem("pwd"));


    const formatDate = (dateString) => {
        const dateObject = new Date(dateString);
        return dateObject.toISOString().split('T')[0]; // Format as YYYY-MM-DD
      };

      useEffect(()=>{
         axios
      .get(`${API_ENDPOINT}/configurable/get?fieldName=renewal`, {
        auth: {
          username: name,
          password: Password
        },
        params: {
          property: "upcoming renewal"
        }
      })
      .then((response) => {
        console.log(response.data);
        setRenewalDroVal(response.data);
      });
      },[API_ENDPOINT, Password, name])

    const tabData = [
        {
            id:1,
            nameId:'lineOfBusiness',
            name:'Line Of Business',
            type:'text',
            defVal:editDatas[0].lineOfBusiness

        },
        {
            id:2,
            nameId:'insuranceProduct',
            name:'Insurance Product',
            type:'text',
            defVal:editDatas[0].insuranceProduct
        },
        {
            id:3,
            nameId:'insuranceType',
            name:'Insurance Type',
            type:'text',
            defVal:editDatas[0].insuranceType
        },
        {
            id:4,
            nameId:'insuredAddress',
            name:'Insured Address',
            type:'text',
            defVal:editDatas[0].insuredAddress
        },
        {
            id:5,
            nameId:'businessBy',
            name:'Business By',
            type:'text',
            defVal:editDatas[0].businessBy
        },
        {
            id:6,
            nameId:'insuredName',
            name:'Insured Name',
            type:'text',
            defVal:editDatas[0].insuredName
        },
        {
            id:7,
            nameId:'insurer',
            name:'Insurer',
            type:'text',
            defVal:editDatas[0].insurer
        },
        {
            id:8,
            nameId:'policyStartDate',
            name:'Policy Start Date',
            type:'date',
            defVal:false&&formatDate(editDatas[0].policyStartDate) 
        },
        {
            id:9,
            nameId:'policyEndDate',
            name:'Policy End Date',
            type:'date',
            // defVal:formatDate(editDatas[0].policyEndDate)
        },
        {
            id:10,
            nameId:'grossPremium',
            name:'Gross Premium',
            type:'text',
            defVal:editDatas[0].grossPremium
        },
        {
            id:11,
            nameId:'insuredType',
            name:'Insured Type',
            type:'text',
            defVal:editDatas[0].insuredType
        },
        {
            id:12,
            nameId:'renewalStatus',
            name:'Renewal Status',
            type:'text',
            defVal:editDatas[0].renewalStatus,
            isDrop:true,
            dropArr:renewalDroVal?renewalDroVal:[],
            edit:true
        },
        {
            id:13,
            nameId:'comments',
            name:'Comments',
            type:'text',
            defVal:editDatas[0].comments,
            edit:true

        },
        {
            id:14,
            nameId:'notConvertedReason',
            name:'Not Converted Reason',
            type:'text',
            defVal:editDatas[0].notConvertedReason,
            edit:true

        },
    ]

    const tabs =[
        
        {
            id:1,
            name:'Tab1'
        },
        {
            id:2,
            name:'Tab2'
        }
        ]

        useEffect(()=>{
setEditDatas(editData)
        },[editData])



        /* ----------------------- Handle for to Read the Values ----------------- */

        const handleChange = (e)=>{
            const value = e.target.value;
           
           setInputs({...inputs,[e.target.name]:value})
        }
        /* ------------------- Function for Submit edited Data ------------- */


        const handleSubmit = (e)=>{
            e.preventDefault();

            const userData = {
                "lineOfBusiness": inputs.lineOfBusiness,
            "insuranceProduct": inputs.insuranceProduct,
            "insuranceType": inputs.insuranceType,
            "insuredAddress": inputs.insuredAddress,
            "businessBy": inputs.businessBy,
            "insuredName": inputs.insuredName,
            "insurer": inputs.insurer,
            "policyStartDate": inputs.policyStartDate,
            "policyEndDate": inputs.policyEndDate,
            "grossPremium": inputs.grossPremium,
            "insuredType": inputs.insuredType,
            "renewalStatus": inputs.renewalStatus,
            "comments": inputs.comments,
            "notConvertedReason": inputs.notConvertedReason
        
            };
            axios
              .put(`${API_ENDPOINT}/edit/upcoming-renewal?id=${editDatas[0].id}`, userData, {
                auth: {
                  username: name,
                  password: Password,
                },
              })
              .then((response) => {
                console.log(response.status);
                axios
                .get(`${API_ENDPOINT}/get/upcoming/policy?Days=${mode}`, {
                  auth: {
                    username: name,
                    password: Password,
                  }
                 
                })
                .then((response) => {
                  var len = response.data.length;
                  setUpdateLeadData(response.data)
                });
        
                if (response.status === 200) {
                  setLoading(true);
                }
              });
          };


  return (
    <div className='absolute top-0 w-full h-full z-50 overflow-x-hidden bg-[rgba(0,0,0,.2)]'>
          <div className="justify-center  items-center flex overflow-x-hidden  mt-10   overflow-y-auto  outline-none focus:outline-none">
            <div className="relative w-[52rem] h-[38rem] my-6 mx-auto z-50 overflow-y-auto  ">
              {/*content*/}
              <form onChange={handleChange}>
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white  outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                    <h3 className="text-2xl font-semibold">Update Policy</h3>
                    {loading && (
                      <p className="text-[#9ACD32] text-md text-center pl-10">
                        Details Uploaded Successfully
                      </p>
                    )}
                      <div className={` flex space-x-2 justify-center `}>
                                  <button
                                    type="submit"
                                    onClick={handleSubmit}
                                    className="inline-block px-6 py-2.5 bg-hero text-white font-medium text-xs leading-tight uppercase rounded shadow-md  hover:shadow-lg hover:text-black focus:shadow-lg focus:outline-none "
                                  >
                                    submit
                                  </button>
                                </div>
                    <button
                      className="text-red-500 background-transparent font-bold text-2xl uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setShowModalpolicy(false)}
                    >
                      X
                    </button>
                  </div>
                  {/*body*/}
                  <form>
                    <div className="flex justify-between flex-wrap">
                      <div className="w-full">
                        <ul
                          className="flex justify-between mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
                          role="tablist"
                        >
                            {tabs.map((item,key)=>(
                                <div className="m-auto w-60" >
                                     <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                            <a
                              className={
                                "text-xs font-bold uppercase px-5 py-3 ml-2 block leading-normal " +
                                ((key+1 && item.id )==tabVal
                                  ? "text-black border-b-2 border-hero"
                                  : "text-black")
                              }
                              onClick={(e) => {
                                e.preventDefault();
                                setOpenTab(1);
                                setTabVal(item.id)
                              }}
                              data-toggle="tab"
                              href="#link1"
                              role="tablist"
                            >
                            {item.name}
                            </a>
                          </li>
                                </div>
                            ))}

                     
                        </ul>
                        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                          <div className="px-4 py-5 relative   mx-20">
                              

                              {tabData.map((item,key)=>(
                                    <div   className={`${tabVal===1&&key>6?'hidden':'flex '} ${tabVal===2&&key<7?'hidden':'flex '} flex relative items-center  space-y-4 mb-8 `}>
                                        <div className="">

                                  <h2 className="w-max mx-auto">
                                   {item.name}
                                    <span
                                    //   className={
                                    //     required ? `text-[#f45138]` : "hidden"
                                    //   }
                                    >
                                      *
                                    </span>
                                  </h2>
                                  </div>

                                  <div className="absolute top- left-96">

                                  <div className={`${item.isDrop?'hidden':''} mx-auto`}>
                                    <input
                                      type={item.type}
                                      disabled={item.edit===true?false:true}
                                      className="w-52 placeholder-[#000000] focus:outline-none focus:text-gray-600  p-2  border border-gray rounded shadow "
                                      defaultValue={item.defVal}
                                      name={item.nameId}
                                    //   onChange={handleChangee}
                                    />
                                  </div>
                                  <div className={`${item.isDrop?'':'hidden'}`}>
                      <select
                        id={item.nameId}
                        name={item.nameId}
                        //   onChange={(e) => setLosofbus(e.target.value)}
                        className="w-52 placeholder-[#000000] focus:outline-none focus:text-gray-600  p-2  border border-gray rounded shadow "
                      >
                        <option value=""> {item.defVal?item.defVal:'Select Value'}</option>
                        {console.log('dropda',item.dropArr)}
                        {item.dropArr&&item.dropArr.map((drop) => (
                          <option value={drop.value}>{drop.value}</option>
                        ))}
                      </select>
                    </div>
                                  </div>

                                  </div>

                                 ))}

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
        </div>
  )
}

export default EditData