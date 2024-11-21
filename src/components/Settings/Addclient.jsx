import React from "react";
import { useState } from "react";
import Modal from "react-modal";
import axios from "axios";
const Addclient = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [toc, setToc] = useState("");
  const [cs, setCs] = useState("");
  const [opt, setOpt] = useState(true);
  const [opp, setOpp] = useState(false);
  const required = true;
  const API_ENDPOINT = process.env.REACT_APP_API_URL;
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
  console.log(cs, toc);
  const a = cs;
  const b = toc;
  const name = JSON.parse(localStorage.getItem("namee"));
  const Password = JSON.parse(localStorage.getItem("pwd"));
  const handleSubmitt = (e) => {
    console.log(clientData);
    e.preventDefault();
    const userData = {
      client_status: a,

      title: valuee,
      type_of_client: b,
      name_of_the_client: clientData.name_of_the_client,
      address: clientData.address,
      office_code: clientData.office_code,
      pan: clientData.pan,
      gst: clientData.gst,
      occupancy: clientData.occupancy,
    };

    axios
      .post(`${API_ENDPOINT}/clientDetails/save`, userData, {
        auth: {
          username: name,
          password: Password,
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
    console.log(userData);
  };
  return (
    <div className="">
      <>
        <div className="justify-center items-center flex overflow-x-hidden  w-full bg-gray bg-blend-darken overflow-y-auto outline-none focus:outline-none">
          <div className="relative w-full  my-6 mx-auto max-w-3xl">
            <form>
              <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                <h3 className="text-2xl font-semibold">Add Client</h3>
              </div>
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
                          onChange={handleChange}
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
                          className="block w-full px-4 py-2 mt-2 border border-gray mb-5 rounded shadow border-2 focus:outline-none focus:ring"
                        />
                      </div>
                      <div>
                        <label className="text-black dark:text-gray-200">PAN</label>
                        <input
                          name="pan"
                          type="text"
                          onChange={handleChange}
                          className="block w-full px-4 py-2 mt-2 border border-gray mb-5 rounded shadow border-2 focus:outline-none focus:ring"
                        />
                      </div>
                      <div>
                        <label className="text-black dark:text-gray-200">GST</label>
                        <input
                          name="gst"
                          type="text"
                          onChange={handleChange}
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
                          className="block w-full px-4 py-2 mt-2 border border-gray mb-5 rounded shadow border-2 focus:outline-none focus:ring"
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
                    <p className="text-[#9ACD32] text-md text-center pl-10">
                      User Added successfully
                    </p>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </>
    </div>
  );
};

export default Addclient;
