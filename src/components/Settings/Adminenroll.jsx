import React from "react";
import { useState } from "react";
import Modal from "react-modal";
import axios from "axios";
const Adminenroll = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const required = true;
  const [clientData, setclientData] = useState({
    firstName: "",
    userName: "",
    password: "",
    currentAccessType: "",
    roles: [
      {
        role: "",
      },
    ],
  });
  const handleusrChange = (e) => {
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
  const API_ENDPOINT = process.env.REACT_APP_API_URL;
  const name = JSON.parse(localStorage.getItem("namee"));
  const Password = JSON.parse(localStorage.getItem("pwd"));
  const handleSubmitt = (e) => {
    console.log(clientData);
    e.preventDefault();
    const userData = {
      firstName: clientData.firstName,
      userName: clientData.userName,
      password: clientData.password,
      currentAccessType: clientData.currentAccessType,
      roles: [
        {
          role: clientData.roles,
        },
      ],
    };
    axios
      .post(`${API_ENDPOINT}/enrollment`, userData, {
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
  };
  return (
    <div className="">
      <>
        <div className="justify-center items-center flex overflow-x-hidden  w-full bg-gray bg-blend-darken overflow-y-auto outline-none focus:outline-none">
          <div className="relative w-full  my-6 mx-auto max-w-3xl">
            {/*content*/}
            <form>
              <div className="border-0  relative flex flex-col w-full   outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-2xl font-semibold">User Enrollment</h3>
                </div>
                {/*body*/}
                <form>
                  <div>
                    <div>
                      <div>
                        <div className="grid grid-cols-1 gap-6 mt-4 ml-4 mr-4 sm:grid-cols-2">
                          {/* <div>
                <label className="text-black dark:text-gray-200" for="passwordConfirmation">Title</label>
                <select onChange={(e) => setValuee(e.target.value)} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray mb-5 rounded shadow border-2 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring">
                    <option value='Mr'>Mr</option>
                    <option value='Mrs'>Mrs</option>
                    <option value='Miss'>Miss</option>
                   
                </select>
            </div> */}
                          <div>
                            <label
                              className="text-[#000] dark:text-gray-200"
                              for="username"
                            >
                              FirstName
                            </label>
                            <input
                              name="firstName"
                              type="text"
                              value={
                                isOpen ? "" : clientData.name_of_the_client
                              }
                              onChange={handleusrChange}
                              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray mb-5 rounded shadow border-2 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                            />
                          </div>
                          <div>
                            <label
                              className="text-black dark:text-gray-200"
                              for="emailAddress"
                            >
                              UserName
                            </label>
                            <input
                              name="userName"
                              type="text"
                              onChange={handleusrChange}
                              value={isOpen ? "" : clientData.client_id}
                              className="block w-full px-4 py-2 mt-2 text-gray-700 border border-gray mb-5 rounded shadow border-2 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                            />
                          </div>
                          <div>
                            <label
                              className="text-black dark:text-gray-200"
                              for="emailAddress"
                            >
                              Password
                            </label>
                            <input
                              name="password"
                              type="text"
                              onChange={handleusrChange}
                              value={isOpen ? "" : clientData.type_of_client}
                              className="block w-full px-4 py-2 mt-2 text-gray-700 border border-gray mb-5 rounded shadow border-2 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                            />
                          </div>

                          <div>
                            <label className="text-black dark:text-gray-200">
                              Access Type
                            </label>
                            <input
                              name="currentAccessType"
                              type="text"
                              onChange={handleusrChange}
                              value={isOpen ? "" : clientData.client_status}
                              className="block w-full px-4 py-2 mt-2 border border-gray mb-5 rounded shadow border-2 focus:outline-none focus:ring"
                            />
                          </div>
                          <div>
                            <label className="text-black dark:text-gray-200">
                              Role
                            </label>
                            <input
                              name="roles"
                              type="textarea"
                              onChange={handleusrChange}
                              value={isOpen ? "" : clientData.address}
                              className="block w-full px-4 py-2 mt-2 border border-gray mb-5 rounded shadow border-2 focus:outline-none focus:ring"
                            />
                          </div>
                        </div>
                      </div>
                      {/*footer*/}
                      <div className="flex items-center justify-center p-6  rounded-b">
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
            </form>
          </div>
        </div>
      </>
    </div>
  );
};

export default Adminenroll;
