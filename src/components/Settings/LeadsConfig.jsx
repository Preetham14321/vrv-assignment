import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { AiOutlineInfoCircle } from "react-icons/ai";
import "react-toastify/dist/ReactToastify.css";
import ConfigModel from "../../ui/ConfigModel";
import axios from "axios";

const LeadsConfig = () => {
  const [inputs, setInputs] = useState([]);
  const [openModel, setOpenModel] = useState(false);

  const [modalKey, setModalKey] = useState(null);
  const [modalProps, setModalProps] = useState({});
  const [title, settitle] = useState();

  const name = JSON.parse(localStorage.getItem("namee"));
  const Password = JSON.parse(localStorage.getItem("pwd"));
  const API_ENDPOINT = process.env.REACT_APP_API_URL;

  const handleChange = (e) => {
    const name = e.target.name;

    const value = e.target.value;

    setInputs((values) => ({
      ...values,
      [name]: name === "registered" ? e.target.id : value
    }));
  };

  /* ----------------------- Handles To Submit The Data --------------------- */

  const handleSubmitlob = (e) => {
    e.preventDefault();

    const datalob = {
      fieldName: "lob",
      value: inputs.lob,
      property: "leads"
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
          toast.success("Line Of Business field added");
          //   setData("");
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

  const handleSubmitBus = (e) => {
    e.preventDefault();

    const datalob = {
      fieldName: "businessby",
      value: inputs.businessby,
      property: "leads"
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
          toast.success("Business by added");
          //   setData("");
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
  const handleSubmitInsTyp = (e) => {
    e.preventDefault();

    const datalob = {
      fieldName: "instyp",
      value: inputs.instyp,
      property: "leads"
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
          toast.success("Insurance Type field added");
          //   setData("");
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
  const handleSubmitLedSt = (e) => {
    e.preventDefault();

    const datalob = {
      fieldName: "leasta",
      value: inputs.leasta,
      property: "leads"
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
          toast.success("Leads Status field added");
          //   setData("");
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
 
  /* ------------------------------------------------------- */

  const configData = [
    {
      id: 1,
      ide: "lob",
      name: "Line of business",
      handlePost: handleSubmitlob
    },
    {
      id: 2,
      ide: "businessby",
      name: "Business by",
      handlePost: handleSubmitBus
    },
    {
      id: 3,
      ide: "instyp",
      name: "Insurance type",
      handlePost: handleSubmitInsTyp
    },
    {
      id: 4,
      ide: "leasta",
      name: "Lead Status",
      handlePost: handleSubmitLedSt
    },
      
  ];

  const openModal = (key, names, fieldName) => {
    // Set the modalKey to the key of the clicked input
    setModalKey(key);

    settitle(names);
    setModalProps([]);

    axios
      .get(`${API_ENDPOINT}/configurable/get`, {
        auth: {
          username: name,
          password: Password
        },
        params: {
          fieldName: fieldName,
          property: "leads"
        }
      })
      .then((response) => {
        console.log(response.data);
        setModalProps(response.data);
      });
  };

  const closeModal = () => {
    setModalKey(null);
    setModalProps({});
  };

  return (
    <div>
      <ToastContainer />

      {/* ------------- Header ------------------- */}
      <div className="mx-80  ">
        <h3 className="text-2xl pl-4 font-semibold text-">
          Leads Configuration
        </h3>
        <hr className="mt-4" />

        {/* ------------------ Content Inputs --------- */}

        <form action="" onChange={handleChange}>
          <div className="grid grid-cols-2 gap-x-10">
            {configData.map((item, key) => (
              <div className="relative" id={key}>
                {/* ---------------- Config Model for Entry Details  --------------------- */}

                <div className="pt-5 flex items-center gap-3">
                  <label htmlFor="" className=" text-gray-700">
                    {item.name}
                  </label>
                  <div className="">
                    <AiOutlineInfoCircle
                      className="cursor-pointer"
                      id={item.ide}
                      onClick={() => openModal(item.id, item.name, item.ide)}
                    />
                  </div>
                </div>
                <div className="flex items-center gap-5">
                  <input
                    name={item.ide}
                    id={item.ide}
                    type="text"
                    // onChange={handledataChange}
                    className="block w-full px-4 py-3 mt-2 text-gray-700 bg-white  border-gray mb-5 rounded shadow border-2   focus:border-blue-500  focus:outline-none focus:ring"
                  />
                  <button
                    type="submit"
                    onClick={item.handlePost}
                    className="inline-block px-6 py-2.5 bg-hero text-white font-medium text-xs leading-tight uppercase rounded shadow-md  hover:shadow-lg hover:text-black focus:shadow-lg focus:outline-none "
                  >
                    Add
                  </button>
                </div>
              </div>
            ))}
          </div>
          {modalKey !== null && (
            <ConfigModel
              viewState={[openModel, setOpenModel]}
              heroName={title}
              getData={modalProps}
              isOpen={modalKey !== null}
              closeModal={closeModal}
              propType='leads'
            />
          )}
        </form>
      </div>
    </div>
  );
};

export default LeadsConfig;
