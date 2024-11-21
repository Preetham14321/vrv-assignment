import React from "react";
import { useState } from "react";
import Modal from "react-modal";
import axios from "axios";
const Tab1 = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const required = true;
  const [clientData, setclientData] = useState({
    title: "",
    client_status: "",
    type_of_client: "",
    name_of_the_client: "",
    address: "",
    office_code: "",
    pan: "",
    gst: "",
    occupancy: "",
    client_id: "",
  });
  const handleChange = (e) => {
    e.preventDefault();
    const value = e.target.value;
    setclientData({
      ...clientData,
      [e.target.name]: value,
    });
  };
  console.log(clientData);
  const [valuee, setValuee] = useState("");
  const [showModal, setShowModal] = React.useState(false);
  const handleClick = (e) => {
    e.preventDefault();
    setShowModal(true);
    setIsOpen(false);
  };
  const name = JSON.parse(localStorage.getItem("namee"));
  const Password = JSON.parse(localStorage.getItem("pwd"));
  const handleSubmitt = (e) => {
    console.log(clientData);
    e.preventDefault();
    const userData = {
      client_status: clientData.client_status,
      client_Id: clientData.client_id,
      title: valuee,
      type_of_client: clientData.type_of_client,
      name_of_the_client: clientData.name_of_the_client,
      address: clientData.address,
      office_code: clientData.office_code,
      pan: clientData.pan,
      gst: clientData.gst,
      occupancy: clientData.occupancy,
    };
    axios
      .post(`${process.env.REACT_APP_API_URL}/clientDetails/save`, userData, {
        auth: {
          username: "",
          password: "port90pw",
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
  return (
    <div className="">
      <button
        type="button"
        onClick={handleClick}
        className="inline-block px-6 py-2.5 ml-28 bg-hero text-white font-medium text-xs leading-tight uppercase rounded shadow-md  hover:shadow-lg hover:text-black focus:shadow-lg focus:outline-none "
      >
        Add Client
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden bg-[rgba(0,0,0,.2)] bg-blend-darken overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-9/12 my-6 mx-auto max-w-3xl">
              {/*content*/}
              <form>
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white  outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                    <h3 className="text-2xl font-semibold">Client Details</h3>
                    {isOpen && (
                      <p className="text-[#9ACD32] text-md text-center pl-10">
                        Details Uploaded Successfully
                      </p>
                    )}
                  </div>
                  {/*body*/}
                  <form>
                    <div>
                      <div>
                        <div>
                          <div className="grid grid-cols-1 gap-6 mt-4 ml-4 mr-4 sm:grid-cols-2">
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
                                value={
                                  isOpen ? "" : clientData.name_of_the_client
                                }
                                onChange={handleChange}
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray mb-5 rounded shadow border-2 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                              />
                            </div>
                            <div>
                              <label
                                className="text-black dark:text-gray-200"
                                for="emailAddress"
                              >
                                Client ID
                              </label>
                              <input
                                name="client_id"
                                type="text"
                                onChange={handleChange}
                                value={isOpen ? "" : clientData.client_id}
                                className="block w-full px-4 py-2 mt-2 text-gray-700 border border-gray mb-5 rounded shadow border-2 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                              />
                            </div>
                            <div>
                              <label
                                className="text-black dark:text-gray-200"
                                for="emailAddress"
                              >
                                Type of Client
                              </label>
                              <input
                                name="type_of_client"
                                type="text"
                                onChange={handleChange}
                                value={isOpen ? "" : clientData.type_of_client}
                                className="block w-full px-4 py-2 mt-2 text-gray-700 border border-gray mb-5 rounded shadow border-2 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                              />
                            </div>

                            <div>
                              <label className="text-black dark:text-gray-200">
                                Client Status
                              </label>
                              <input
                                name="client_status"
                                type="text"
                                onChange={handleChange}
                                value={isOpen ? "" : clientData.client_status}
                                className="block w-full px-4 py-2 mt-2 border border-gray mb-5 rounded shadow border-2 focus:outline-none focus:ring"
                              />
                            </div>
                            <div>
                              <label className="text-black dark:text-gray-200">
                                Address
                              </label>
                              <input
                                name="address"
                                type="textarea"
                                onChange={handleChange}
                                value={isOpen ? "" : clientData.address}
                                className="block w-full px-4 py-2 mt-2 border border-gray mb-5 rounded shadow border-2 focus:outline-none focus:ring"
                              />
                            </div>
                            <div>
                              <label className="text-black dark:text-gray-200">
                                Office Code
                              </label>
                              <input
                                name="office_code"
                                type="text"
                                onChange={handleChange}
                                value={isOpen ? "" : clientData.office_code}
                                className="block w-full px-4 py-2 mt-2 border border-gray mb-5 rounded shadow border-2 focus:outline-none focus:ring"
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
                                value={isOpen ? "" : clientData.pan}
                                className="block w-full px-4 py-2 mt-2 border border-gray mb-5 rounded shadow border-2 focus:outline-none focus:ring"
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
                                value={isOpen ? "" : clientData.gst}
                                className="block w-full px-4 py-2 mt-2 border border-gray mb-5 rounded shadow border-2 focus:outline-none focus:ring"
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
                                value={isOpen ? "" : clientData.occupancy}
                                className="block w-full px-4 py-2 mt-2 border border-gray mb-5 rounded shadow border-2 focus:outline-none focus:ring"
                              />
                            </div>
                          </div>
                        </div>
                        {/*footer*/}
                        <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                          <button
                            className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={() => setShowModal(false)}
                          >
                            Close
                          </button>

                          <button
                            type="submit"
                            onClick={handleSubmitt}
                            className="inline-block px-6 py-2.5 bg-hero text-white font-medium text-xs leading-tight uppercase rounded shadow-md  hover:shadow-lg hover:text-black focus:shadow-lg focus:outline-none "
                          >
                            submit
                          </button>
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
    </div>
  );
};

export default Tab1;
