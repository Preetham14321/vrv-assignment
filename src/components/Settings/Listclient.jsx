import React from "react";
import { useEffect, useState, useRef } from "react";
import Pagination from "../dashboard/Pagination";
import axios from "axios";
const Listclient = () => {
  const [data, setData] = useState([]);
  const [did, setDid] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [idd, setIdd] = useState();
  const [modell, setModell] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [key, setKey] = useState();
  const [namee, setNamee] = useState("");
  const [valuee, setValuee] = useState("");
  const [toc, setToc] = useState("");
  const [cs, setCs] = useState("");
  const [opt, setOpt] = useState(true);
  const [opp, setOpp] = useState(false);
  const [content, setContent] = useState([]);
  const id = key;
  const delid = idd;
  const nam = did;
  const con = content;
  const API_ENDPOINT = process.env.REACT_APP_API_URL;
  const name = JSON.parse(localStorage.getItem("namee"));
  const Password = JSON.parse(localStorage.getItem("pwd"));
  useEffect(() => {
    var i;
    axios
      .get(`${API_ENDPOINT}/clientDetails/get`, {
        auth: {
          username: name,
          password: Password,
        },
      })
      .then((response) => {
        setData(response.data);
      });
  }, []);
  console.log(data);
  const handleSubmitt = (e) => {
    console.log(update);
    e.preventDefault();
    const userData = {
      title: valuee,
      client_status: cs,
      type_of_client: toc,
      name_of_the_client: update.name_of_the_client,
      address: update.address,
      office_code: update.office_code,
      pan: update.pan,
      gst: update.gst,
      occupancy: update.occupancy,
    };
    axios
      .put(`${API_ENDPOINT}/clientDetails/update?clientID=` + id, userData, {
        auth: {
          username: name,
          password: Password,
        },
      })
      .then((response) => {
        console.log(response.status);
        if (response.status === 200) {
          setIsOpen(true);
        }
      });

    console.log(userData);
  };
  const handleDelete = (e) => {
    e.preventDefault();
    axios
      .delete(`${API_ENDPOINT}/clientDetails/delete?client_id=` + nam, {
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
  const [update, setUpdate] = useState({
    title: "",
    client_status: "",
    type_of_client: "",
    name_of_the_client: "",
    address: "",
    office_code: "",
    pan: "",
    gst: "",
    occupancy: "",
  });
  const handleChange = (e) => {
    e.preventDefault();
    const value = e.target.value;
    setUpdate({
      ...update,
      [e.target.name]: value,
    });
  };

  return (
    <div className="flex w-full bg-[#f8f9fa]  overflow-x-hidden">
      <div className="relative overflow-x-auto  shadow-md sm:rounded-lg w-11/12 ml-14 mt-10 mb-10 p-4 bg-white">
        <h3 className="bg-white text-xl p-4 font-semibold">Clients</h3>

        <table className=" text-sm w-full text-center text-gray-500 dark:text-gray-400 ">
          <thead className="text-xs text-gray-700 border-b-2 border-gray uppercase bg-white dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Client ID
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Type Of Client
              </th>
              <th scope="col" className="px-6 py-3">
                Client Status
              </th>
              <th scope="col" className="px-6 py-3">
                Address
              </th>
              <th scope="col" className="px-6 py-3">
                Office Code
              </th>
              <th scope="col" className="px-6 py-3">
                PAN
              </th>
              <th scope="col" className="px-6 py-3">
                GST
              </th>
              <th scope="col" className="px-6 py-3">
                Occupancy
              </th>

              {/* <th scope="col" className="px-6 py-3">
<span >Edit</span>
</th> */}
            </tr>
          </thead>
          <tbody>
            {data.map((item, key) => (
              <tr className="bg-white border-b-2 border-gray dark:bg-gray-800 dark:border-gray-700 hover:bg-gray dark:hover:bg-gray-600">
                <td className="px-6 py-4" key={item.id}>
                  {item.client_Id}
                </td>
                <td className="px-6 py-4">{item.name_of_the_client}</td>
                <td className="px-6 py-4">{item.type_of_client}</td>
                <td className="px-6 py-4">{item.client_status}</td>
                <td className="px-6 py-4">{item.address}</td>
                <td className="px-6 py-4">{item.office_code}</td>
                <td className="px-6 py-4 ">{item.pan}</td>
                <td className="px-6 py-4">{item.gst}</td>
                <td className="px-6 py-4">{item.occupancy}</td>

                <td className="px-6 py-4 text-right right-0 sticky p-2 bg-white">
                  <button
                    onClick={() => {
                      setContent(item);
                      setKey(item.client_Id);
                      setNamee(item.name_of_the_client);
                      setShowModal(true);
                      setIsOpen(false);
                    }}
                    id={key}
                    className="font-medium p-2  bg-gray text-black rounded-md hover:bg-hero"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      setIdd(item.name_of_the_client);
                      setModell(true);
                      setDid(item.client_Id);
                    }}
                    id={key}
                    className="font-medium p-2 ml-2  bg-[#C41E3A] text-white rounded-md hover:bg-hero"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden bg-[rgba(0,0,0,.2)] bg-blend-darken overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
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
                    <div>
                      <div>
                        <div>
                          <div className="grid grid-cols-1 gap-6 mt-4 ml-4 mr-4 sm:grid-cols-2">
                            <div>
                              <label
                                className="text-[#000] dark:text-gray-200"
                                for="username"
                              >
                                Client ID
                              </label>
                              <input
                                name="id"
                                type="text"
                                value={id}
                                disabled
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray mb-5 rounded shadow border-2 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                              />
                            </div>
                            <div>
                              <label
                                className="text-black dark:text-gray-200"
                                for="passwordConfirmation"
                              >
                                Title
                              </label>
                              <select
                                onChange={(e) => setValuee(e.target.value)}
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray mb-5 rounded shadow border-2 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                              >
                                <option value="">Select Title</option>
                                <option value="Mr">Mr</option>
                                <option value="Mrs">Mrs</option>
                                <option value="Miss">Miss</option>
                              </select>
                            </div>
                            <div>
                              <label
                                className="text-[#000] dark:text-gray-200"
                                for="username"
                              >
                                Client Name
                              </label>
                              <input
                                name="name_of_the_client"
                                type="text"
                                disabled
                                value={con.name_of_the_client}
                                onChange={handleChange}
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray mb-5 rounded shadow border-2 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                              />
                            </div>

                            <div>
                              <label
                                className="text-black dark:text-gray-200"
                                for="passwordConfirmation"
                              >
                                Type Of Client
                              </label>
                              <select
                                onChange={(e) => {
                                  setToc(e.target.value);
                                  if (e.target.value === "Insured") {
                                    setOpt(false);
                                    setOpp(true);
                                  } else {
                                    setOpt(true);
                                    setOpp(false);
                                  }
                                }}
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray mb-5 rounded shadow border-2 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                              >
                                <option value="">Select Type of client</option>
                                <option value="Insured">Insured</option>
                                <option value="Insurance Company">
                                  Insurance Company
                                </option>
                                <option value="POSP">POSP</option>
                                <option value="Employee">Employee</option>
                                <option value="Supplier">Supplier</option>
                                <option value="Others">Others</option>
                              </select>
                            </div>
                            <div>
                              <label
                                className="text-black dark:text-gray-200"
                                for="passwordConfirmation"
                              >
                                Client Status
                              </label>
                              {opt && (
                                <select
                                  onChange={(e) => setCs(e.target.value)}
                                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray mb-5 rounded shadow border-2 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                >
                                  <option value="">Select Client Status</option>
                                  <option value="corporate">corporate</option>
                                  <option value="Retail">Retail</option>
                                  <option value="SME">SME</option>
                                  <option value="Others">Others</option>
                                </select>
                              )}
                              {opp && (
                                <select
                                  onChange={(e) => setCs(e.target.value)}
                                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray mb-5 rounded shadow border-2 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                >
                                  <option value="">Select Client Status</option>
                                  <option value="corporate">corporate</option>
                                  <option value="Retail">Retail</option>
                                </select>
                              )}
                            </div>

                            <div>
                              <label className="text-black dark:text-gray-200">
                                Address
                              </label>
                              <input
                                name="address"
                                type="textarea"
                                placeholder={con.address}
                                onChange={handleChange}
                                className="block placeholder-[#000000] w-full px-4 py-2 mt-2 border border-gray mb-5 rounded shadow border-2 focus:outline-none focus:ring"
                              />
                            </div>
                            <div>
                              <label className="text-black dark:text-gray-200">
                                Office Code
                              </label>
                              <input
                                name="office_code"
                                type="text"
                                placeholder={con.office_code}
                                onChange={handleChange}
                                className="block placeholder-[#000000] w-full px-4 py-2 mt-2 border border-gray mb-5 rounded shadow border-2 focus:outline-none focus:ring"
                              />
                            </div>
                            <div>
                              <label className="text-black dark:text-gray-200">
                                PAN
                              </label>
                              <input
                                name="pan"
                                type="text"
                                onChange={handleChange}
                                placeholder={con.pan}
                                className="block w-full placeholder-[#000000] px-4 py-2 mt-2 border border-gray mb-5 rounded shadow border-2 focus:outline-none focus:ring"
                              />
                            </div>
                            <div>
                              <label className="text-black dark:text-gray-200">
                                GST
                              </label>
                              <input
                                name="gst"
                                type="text"
                                onChange={handleChange}
                                placeholder={con.gst}
                                className="block w-full placeholder-[#000000] px-4 py-2 mt-2 border border-gray mb-5 rounded shadow border-2 focus:outline-none focus:ring"
                              />
                            </div>
                            <div>
                              <label className="text-black dark:text-gray-200">
                                Occupancy
                              </label>
                              <input
                                name="occupancy"
                                type="text"
                                onChange={handleChange}
                                placeholder={con.occupancy}
                                className="block placeholder-[#000000] w-full px-4 py-2 mt-2 border border-gray mb-5 rounded shadow border-2 focus:outline-none focus:ring"
                              />
                            </div>
                          </div>
                        </div>
                        {/*footer*/}
                        <div className="flex items-center justify-center p-6 border-t border-solid border-slate-200 rounded-b">
                          <button
                            type="submit"
                            onClick={handleSubmitt}
                            className="inline-block px-6 py-2.5 bg-hero text-white font-medium text-xs leading-tight uppercase rounded shadow-md  hover:shadow-lg hover:text-black focus:shadow-lg focus:outline-none "
                          >
                            submit
                          </button>
                        </div>
                        {isOpen && (
                          <p className="text-[#9ACD32] text-md text-center pl-10 mb-10">
                            Details Updated successfully
                          </p>
                        )}
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
                      <span className="text-[#50C878]">{delid}</span>
                    </h3>
                    <button
                      className="text-red-500 background-transparent font-bold text-2xl uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => {
                        setModell(false);
                        setKey(false);
                      }}
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
                      onClick={() => setModell(false)}
                    >
                      Close
                    </button>

                    <button
                      type="submit"
                      onClick={handleDelete}
                      className="inline-block px-6 py-2.5 bg-hero text-white font-medium text-xs leading-tight uppercase rounded shadow-md  hover:shadow-lg hover:text-black focus:shadow-lg focus:outline-none "
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
    </div>
  );
};

export default Listclient;
