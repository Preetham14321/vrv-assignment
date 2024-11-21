import React, { useState, useEffect } from "react";
import InputPP from "../components/customs/InputPP";
import axios from "axios";
import Modal from "react-modal";
import { Navigate } from "react-router-dom";
import { Link, Redirect } from "react-router-dom";
const Forgot = () => {
  const [inputs, setInputs] = useState({});
  const [value, setValue] = useState("");
  const [value1, setValue1] = useState(false);
  const [userNameError, setUserNameError] = useState();
  const [success, setSuccess] = useState(false);
  const [passwordError, setPasswordError] = useState();
  const [authenticated, setauthenticated] = useState(false);
  const [abc, setAbc] = useState(false);
  const name = JSON.parse(localStorage.getItem("namee"));
  const Password = JSON.parse(localStorage.getItem("pwd"));
  const handleSubmit = (e) => {
    e.preventDefault();

    if (inputs.password != inputs.cpassword) {
      setauthenticated(true);
    } else {
      setauthenticated(false);
      axios
        .put(
          `${process.env.REACT_APP_API_URL}/update/forgotPass`,
          {
            username: inputs.userName,
            password: inputs.password,
          },
          {
            auth: {
              username: name,
              password: Password,
            },
          }
        )
        .then(
          (response) => {
            setSuccess(true);
          },
          (error) => {
            let error1 = error.response.status;
            console.log(error);
            if (error1 === 400) {
              window.alert(error.response.data);
            }
          }
        );
    }
  };

  const handleChange = (e) => {
    const name = e.target.name;

    const value = e.target.value;

    setInputs((values) => ({
      ...values,
      [name]: name === "registered" ? e.target.id : value,
    }));
  };
  console.log(inputs);

  return (
    <div className="flex flex-col  justify-center items-center h-screen">
      {success && (
        <p className="text-[#006400] text-lg text-center">
          password reset successful
        </p>
      )}
      <h1 className="font-semibold lg:text-lg pb-4">Forgot password</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <InputPP
          className="w-full lg:w-80 border-[#EEF0F2]  px-3 py-2 my-2 rounded-md"
          labelClassName=" font-medium pl-1 "
          id="userName"
          label="Username"
          type="text"
          placeholder="Your username"
          // state={[ownerName, setOwnerName]}
          value={inputs.userName}
          changeFunction={handleChange}
          errorState={[userNameError, setUserNameError]}
        />
        <InputPP
          className="w-full lg:w-80 border-[#EEF0F2]  px-3 py-2 my-2 rounded-md"
          labelClassName=" font-medium pl-1 "
          id="password"
          label="Password"
          type="password"
          placeholder="Your username"
          // state={[ownerName, setOwnerName]}
          value={inputs.password}
          changeFunction={handleChange}
          errorState={[passwordError, setPasswordError]}
        />
        <InputPP
          className="w-full lg:w-80 border-[#EEF0F2]  px-3 py-2 my-2 rounded-md"
          labelClassName=" font-medium pl-1 "
          id="cpassword"
          label="Confirm Password"
          type="password"
          placeholder="Your username"
          // state={[ownerName, setOwnerName]}
          value={inputs.cpassword}
          changeFunction={handleChange}
          errorState={[passwordError, setPasswordError]}
        />
        <input
          type="submit"
          className="bg-[#0D6EFD] w-full px-5 py-3 rounded-[15px] text-white focus:outline-none cursor-pointer "
          //   onClick={handleSubmit}
          value="Change Password"
        />
        {authenticated && (
          <p className="text-[#FF0000] text-sm text-center">
            Passwords should match
          </p>
        )}
        {value1 && (
          <p className="text-[#FF0000] text-sm text-center">
            please enter correct user name
          </p>
        )}

        <a className="text-hero text-right text-md" href="/">
          Back to login
        </a>
      </form>
      {/* <Modal
        isOpen={isOpen}
        onRequestClose={toggleModal}
        contentLabel="My dialog"
        className="fixed p-10 bg-gray drop-shadow-lg ml-96 w-1/2 h-9/12 -mt-96"
        overlayClassName="fixed bg-[#000]"
        closeTimeoutMS={500}
      ></Modal> */}
    </div>
  );
};

export default Forgot;
