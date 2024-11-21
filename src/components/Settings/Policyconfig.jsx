import React from "react";
import { useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import Listadmin from "./Listadmin";
import { useEffect } from "react";
import { Context } from "../Context/Context";
import { ToastContainer, toast } from "react-toastify";
import { AiOutlineInfoCircle } from "react-icons/ai";
import "react-toastify/dist/ReactToastify.css";
import PolicyConfigView from "../policy/PolicyConfigView";
import PolicyConfigDel from "../policy/PolicyConfigDel";
import SearchDropdown from "../policy/PolicyInput";

const Policyconfig = () => {
  const [triggerValues, setTriggerValues] = useState(false)
  // states for 4 config
  const [data, setData] = useState('');
  const [itype, setItype] = useState();
  const [iproduct, setIproduct] = useState();
  const [iname, setIname] = useState();
  //states for 4 modals
  const [model, setModel] = useState(false);
  const [itmodel, setItModel] = useState(false);
  const [ipmodel, setIpModel] = useState(false);
  const [inmodel, setInmodel] = useState(false);
  //array for fields
  const [line, setLine] = useState([]);
  const [lineOptions, setLineOptions] = useState([])
  const [it, setIt] = useState([]);
  const [itOptions, setItOptions] = useState([])
  const [ip, setIp] = useState([]);
  const [ipOtions, setIpOtions] = useState([])
  const [inn, setInn] = useState([]);
  // states foor del
  const [dellob, setDellob] = useState();
  const [delit, setDelit] = useState();
  const [delip, setDelip] = useState();
  const [delis, setDelis] = useState();
  //states for 4 delete model
  const [modell, setModell] = useState(false);
  const [modellit, setModellit] = useState(false);
  const [modellip, setModellip] = useState(false);
  const [modellis, setModellis] = useState(false);
  //useeffect
  const name = JSON.parse(localStorage.getItem("namee"));
  const Password = JSON.parse(localStorage.getItem("pwd"));
  const API_ENDPOINT = process.env.REACT_APP_API_URL;

  /*------------------------- Handle to get The  data ----------------------  */

  const handleGetLob = (e) => {
    e.preventDefault();
    setModel(true);

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
  };


  useEffect(()=>{

    axios
    .get(`${API_ENDPOINT}/configurable/get`, {
      auth: {
        username: name,
        password: Password
      },
      params: {
        property: "policy",
        fieldName: "lob",
     
      }
    })
    .then((response) => {
      console.log(response.data);
      setLine(response.data);
      const values = response.data.map(item => item.value);
      setLineOptions(values);
     



    });


    
  },[API_ENDPOINT, Password, name,triggerValues])
  useEffect(()=>{

    axios
    .get(`${API_ENDPOINT}/configurable/get`, {
      auth: {
        username: name,
        password: Password
      },
      params: {
        property: "policy",
        fieldName: "lob",
        value:data,
        // value:"marine"
        // insuranceProduct=cargo
        // "insuranceProduct":"cargo",
        // "inssuranceType":"cargoinsurance1",
      }
    })
    .then((response) => {
      setIp(response.data);
      const values = response.data.map(item => item.insuranceProduct);

      setIpOtions(values);




    });

  },[API_ENDPOINT, Password, data, name,triggerValues])
  useEffect(()=>{

    axios
    .get(`${API_ENDPOINT}/configurable/get`, {
      auth: {
        username: name,
        password: Password
      },
      params: {
        property: "policy",
        fieldName: "lob",
        value:data,
        // value:"marine"
        insuranceProduct:iproduct
        // "insuranceProduct":"cargo",
        // "inssuranceType":"cargoinsurance1",
      }
    })
    .then((response) => {
      console.log('instyp',response.data);
      setIt(response.data);
      const values = response.data.map(item => item.insuranceType);
      setItOptions(values)



    });


  },[API_ENDPOINT, Password, data, iproduct, name,triggerValues])

  useEffect(()=>{
   
 

 
    axios
    .get(`${API_ENDPOINT}/configurable/get`, {
      auth: {
        username: name,
        password: Password
      },
      params: {
        property: "policy",
        fieldName: "insurer",
        // value:"marine"
        // insuranceProduct=cargo
      }
    })
    .then((response) => {
      console.log(response.data);
      const values = response.data.map(item => item.value);

      setInn(values);
    });



  },[API_ENDPOINT, Password, name,triggerValues])
 

  const handleGetInsTyp = (e) => {
    e.preventDefault();
    setItModel(true);

    // https://93.127.206.91:10590/configurable/get?fieldName=lob&property=policy&value=marine&insuranceProduct=cargo

   
  };
  const handleGetInsPro = (e) => {
    e.preventDefault();
    setIpModel(true);

    // axios
    //   .get(`${API_ENDPOINT}/configurable/get`, {
    //     auth: {
    //       username: name,
    //       password: Password
    //     },
    //     params: {
        
    //       property: "policy",
    //     fieldName: "lob",
    //     value:data
    //     }
    //   })
    //   .then((response) => {
    //     console.log(response.data);
    //     setIp(response.data);
    //   });
  };
  const handleGetInsNam = (e) => {
    e.preventDefault();
    setInmodel(true);

    axios
      .get(`${API_ENDPOINT}/configurable/get`, {
        auth: {
          username: name,
          password: Password
        },
        params: {
          property: "policy",
          fieldName: "insurer"
        }
      })
      .then((response) => {
        console.log(response.data);
        const values = response.data.map(item => item.value);

        setInn(values);
      });
  };

  /* --------------------------------------------------------------- */

  const timeDel = 500;
  // handle delete for lob
  const handleDelete = (e) => {
    e.preventDefault();
    axios
      .delete(`${API_ENDPOINT}/configurable/delete`, {
        auth: {
          username: name,
          password: Password
        },
        params: {
          fieldName: "lob",
          value: dellob,
          property: "policy",
          insuranceProduct:'',
          insuranceType:''
        }
      })
      .then((response) => {
        console.log(response.status);
        setTimeout(() => {
          setModell(false);
          setModel(false);
        }, timeDel);

        if (response.status === 200) {
          toast.success("Line Of Business Deleted Successfully");
        }
        setTriggerValues(!triggerValues)
      });
  };
  //handle delete for insurance type
  const handleDeletee = (e) => {
    e.preventDefault();
    axios
      .delete(`${API_ENDPOINT}/configurable/delete`, {
        auth: {
          username: name,
          password: Password
        },
        params: {
          fieldName: "lob",
          value: data,
          property: "policy",
          insuranceProduct:iproduct,
          insuranceType:delit
        }
      })
      .then((response) => {
        console.log(response.status);
        setTimeout(() => {
          setModellit(false);
          setItModel(false);
        }, timeDel);

        if (response.status === 200) {
          toast.success("Insurance Type Deleted Successfully");
        }
        setTriggerValues(!triggerValues)

      });
  };
  //handle delete forinsurance product
  const handleDeleteee = (e) => {
    e.preventDefault();
    axios
      .delete(`${API_ENDPOINT}/configurable/delete`, {
        auth: {
          username: name,
          password: Password
        },
        params: {
          fieldName: "lob",
          value:data ,
          property: "policy",
          insuranceProduct:delip,
        }
      })
      .then((response) => {
        console.log(response.status);
        setTimeout(() => {
          setModellip(false);
          setIpModel(false);
        }, timeDel);

        if (response.status === 200) {
          toast.success("Insurance Type Deleted Successfully");
        }
        setTriggerValues(!triggerValues)

      });
  };
  //handle delete for insurer Name
  const handleDeleteeee = (e) => {
    e.preventDefault();
    axios
      .delete(`${API_ENDPOINT}/configurable/delete`, {
        auth: {
          username: name,
          password: Password
        },
        params: {
          fieldName: "insurer",
          value: delis,
          property: "policy"
        }
      })
      .then((response) => {
        console.log(response.status);

        setTimeout(() => {
          setModellis(false);
          setInmodel(false);
        }, timeDel);

        if (response.status === 200) {
          toast.success("Insurer Name Deleted Successfully");
        }
        setTriggerValues(!triggerValues)

      });
  };
  // state for warning
  const [key, setKey] = useState(false);



  //handle submit for lob
  const handleAddLobs = (e) => {
    e.preventDefault();

    if(data.length<1) {
      toast.error('Please Enter Required Fields')
    }

    const datalob = {
      fieldName: "lob",
      property: "policy",
      value: data,
    insuranceProduct:iproduct,
    inssuranceType:itype,

    };
    data.length>0&&
    axios
      .post(`${API_ENDPOINT}/configurable/save`, datalob, {
        auth: {
          username: name,
          password: Password
        }
      })
      .then((response) => {
        console.log(response.message);
        setTriggerValues(!triggerValues)
        if (response.status === 200) {
          toast.success("Line Of Business field added");
          setData("");
          setIproduct("");
          setItype("");
        }

      })
      .catch(function (error) {
        if (error.response) {
          if (error.response.status === 409) {
            toast.error("Field Already Exists");
          }
        }
      });
  };
  //handle submit for insurance type
  const handleSubmittt = (e) => {
    e.preventDefault();

    const datalob = {
      fieldName: "insuranceType",
      value: itype,
      property: "policy"
    };
    axios
      .post(`${API_ENDPOINT}/configurable/save`, datalob, {
        auth: {
          username: name,
          password: Password
        }
      })
      .then((response) => {
        console.log(response.message);
        if (response.status === 200) {
          toast.success("Insurance Type added");
          setData("");
        }
      })
      .catch(function (error) {
        if (error.response) {
          if (error.response.status === 409) {
            toast.error("Field Already Exists");
          }
        }
      });
  };
  //handle submit for insurance product
  const handleSubmitt = (e) => {
    e.preventDefault();

    const datalob = {
      fieldName: "insuranceProduct",
      value: iproduct,
      property: "policy"
    };
    axios
      .post(`${API_ENDPOINT}/configurable/save`, datalob, {
        auth: {
          username: name,
          password: Password
        }
      })
      .then((response) => {
        console.log(response.message);
        if (response.status === 200) {
          toast.success("Insurance Product added");
          setData("");
        }
      })
      .catch(function (error) {
        if (error.response) {
          if (error.response.status === 409) {
            toast.error("Field Already Exists");
          }
        }
      });
  };
  //handle submit for insurar name
  const handleSubmit = (e) => {
    e.preventDefault();

    const datalob = {
      fieldName: "insurer",
      value: iname,
      property: "policy",
        "insuranceProduct":"",
        "inssuranceType":"",

    };
    axios
      .post(`${API_ENDPOINT}/configurable/save`, datalob, {
        auth: {
          username: name,
          password: Password
        }
      })
      .then((response) => {
        console.log(response.message);
        if (response.status === 200) {
          toast.success("Insurer added");
          setData("");
        }
      })
      .catch(function (error) {
        if (error.response) {
          if (error.response.status === 409) {
            toast.error("Field Already Exists");
          }
        }
      });
  };


  return (
    <div className="">
      <>
        {" "}
        <ToastContainer />
        <div className="justify-center items-center flex overflow-x-hidden  w-full bg-gray bg-blend-darken overflow-y-auto outline-none focus:outline-none">
          <div className="relative w-full  my-6 mx-auto max-w-3xl">
            {/*content*/}
            <form>
              <div className="border-0  relative flex flex-col w-full   outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-2xl font-semibold">
                    Policy Configuration
                  </h3>
                </div>
                {/*body*/}
                <form>
                  <div>
                    <div>
                      <div>
                        <div className="gr id grid-c ols-1 gap -6 mt-4 ml-4 mr-4 sm:grid-cols-2">
                          <div className="flex items-center gap-3">
                            {/* Line Of Business */}
                            <div>
                              <label
                                className="text-[#000] dark:text-gray-200"
                                for="lob"
                              >
                                Line of business
                              </label>

                              <button className="pl-2" onClick={handleGetLob}>
                                <AiOutlineInfoCircle />
                              </button>
                              {/* modal for line of business */}
                              {model ? (
                                <PolicyConfigView
                                  title="Line Of Business"
                                  openModel={[model, setModel]}
                                  mapVal={[lineOptions, setLineOptions]}
                                  delModel={[modell, setModell]}
                                  delItem={[dellob, setDellob]}
                                />
                              ) : null}
                              {modell ? (
                                <PolicyConfigDel
                                  dellob={dellob}
                                  clsModel={[modell, setModell]}
                                  handleDelete={handleDelete}
                                  typeDel='Line of business'
                                />
                              ) : null}
                              <div className="flex">
                                <SearchDropdown  data={[data,setData]} name="lob"  options={lineOptions}/>

                              </div>
                            </div>
                           
                            {/* Insurance Product                           */}
                            <div>
                              <label
                                className="text-[#000] dark:text-gray-200"
                                for="lob"
                              >
                                Insurance Product
                              </label>
                              <button
                                className="pl-2"
                                onClick={handleGetInsPro}
                              >
                                <AiOutlineInfoCircle />
                              </button>
                              {ipmodel ? (
                                <PolicyConfigView
                                  title="Insurance Product"
                                  openModel={[ipmodel, setIpModel]}
                                  mapVal={[ipOtions, setIpOtions]}
                                  delModel={[modellip, setModellip]}
                                  delItem={[delip, setDelip]}
                                />
                              ) : null}
                              {modellip ? (
                                <PolicyConfigDel
                                  delit={delip}
                                  clsModel={[modellip, setModellip]}
                                  handleDelete={handleDeleteee}
                                  typeDel='Insurance Product'
                                />
                              ) : null}
                              <div className="flex items-center gap-3">
                              <SearchDropdown filterType='insuranceProduct'  data={ [iproduct, setIproduct]} name="insProduct"  options={ipOtions}/>

                                 
                              </div>
                            </div>
                             {/* Insurance Type                           */}
                             <div>
                              <label
                                className="text-[#000] dark:text-gray-200"
                                for="lob"
                              >
                                Insurance Type
                              </label>
                              <button
                                className="pl-2"
                                onClick={handleGetInsTyp}
                              >
                                <AiOutlineInfoCircle />
                              </button>
                              {/* modal for i type */}
                              {itmodel ? (
                                <PolicyConfigView
                                  title="Insurance Type"
                                  openModel={[itmodel, setItModel]}
                                  mapVal={[itOptions, setItOptions]}
                                  delModel={[modellit, setModellit]}
                                  delItem={[delit, setDelit]}
                                />
                              ) : null}
                              {modellit ? (
                                <PolicyConfigDel
                                  delit={delit}
                                  clsModel={[modellit, setModellit]}
                                  handleDelete={handleDeletee}
                                  typeDel='Insurance Type'
                                />
                              ) : null}
                              <div className="flex items-center gap-3">
                              <SearchDropdown filterType="insuranceType"  data={[itype,setItype]} name="insType"  options={itOptions}/>
                              <button
                                    type="submit"
                                    onClick={handleAddLobs}
                                    className="inline-block px-6 py-2.5 bg-hero text-white font-medium text-xs leading-tight uppercase rounded shadow-md  hover:shadow-lg hover:text-black focus:shadow-lg focus:outline-none "
                                  >
                                    Add
                                  </button>
                              </div>
                            </div>
                          </div>

                          <div>
                            <div>
                              <div className="flex items-center gap-3">
                                <label
                                  className="text-[#000] dark:text-gray-200"
                                  for="lob"
                                >
                                  Insurer Name
                                </label>
                                <AiOutlineInfoCircle
                                  onClick={handleGetInsNam}
                                />
                              </div>

                              {inmodel ? (
                                <PolicyConfigView
                                  title="Insurer Name"
                                  openModel={[inmodel, setInmodel]}
                                  mapVal={[inn, setInn]}
                                  delModel={[modellis, setModellis]}
                                  delItem={[delis, setDelis]}
                                />
                              ) : null}
                              {modellis ? (
                                <PolicyConfigDel
                                  delit={delis}
                                  clsModel={[modellis, setModellis]}
                                  handleDelete={handleDeleteeee}
                                  typeDel='Insurer Name'
                                />
                              ) : null}
                            </div>

                            <div className="flex items-center gap-3">
                            <SearchDropdown  data={ [iname, setIname]} name="lob"  options={inn}/>
                                <button
                                  type="submit"
                                  onClick={handleSubmit}
                                  className="inline-block px-6 py-2.5 bg-hero text-white font-medium text-xs leading-tight uppercase rounded shadow-md  hover:shadow-lg hover:text-black focus:shadow-lg focus:outline-none "
                                >
                                  Add
                                </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/*footer*/}
                      {key && (
                        <p className="text-[#9ACD32] text-md text-left pl-10">
                          Added Successfully
                        </p>
                      )}
                    </div>
                  </div>
                </form>
              </div>
            </form>
          </div>
        </div>
      </>
    </div>
  );
};

export default Policyconfig;
