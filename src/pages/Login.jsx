import React, { useState, useEffect, useContext } from "react";
import InputPP from "../components/customs/InputPP";
import axios from "axios";
import logo from "../assets/logo.png";
import { Navigate } from "react-router-dom";
import { Link, Redirect } from "react-router-dom";
import { UserContext } from "../Home";
const Login = () => {
  const user = useContext(UserContext);
  const [inputs, setInputs] = useState({});
  const [userNameError, setUserNameError] = useState();
  const [passwordError, setPasswordError] = useState();
  const [authenticated, setauthenticated] = useState(false);
  const [enable, setEnable] = useState(false);
  const [namee, setNamee] = useState([]);
  const API_ENDPOINT = process.env.REACT_APP_API_URL;
  // useEffect(() => {
  //   // storing input name
  //   localStorage.setItem("name", JSON.stringify(namee));
  // }, [namee]);



  
  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      axios
        .get(`${API_ENDPOINT}/admin`, {
          auth: {
            username: inputs.userName,
            password: inputs.password,
          },
        })
        .then(
          (response) => {
            // console.log(AxiosError.response.statusCode)
            if (response.data === "ADMIN") {
              // console.log("hi");
              user.setAuthen(true);

              window.location.replace("/dashboard");
              localStorage.setItem("namee", JSON.stringify(inputs.userName));
              localStorage.setItem("pwd", JSON.stringify(inputs.password));
              localStorage.setItem("adminauth", JSON.stringify("true"));
              localStorage.setItem("access", JSON.stringify(response.data));
            } else if (response.data === "SUBUSER") {
              window.location.replace("/dashboard");
              localStorage.setItem("namee", JSON.stringify(inputs.userName));
              localStorage.setItem("pwd", JSON.stringify(inputs.password));
              localStorage.setItem("adminauth", JSON.stringify("true"));
              localStorage.setItem("access", JSON.stringify(response.data));
            } else if (response.data === "ENTRYUSER") {
              window.location.replace("/dashboard");
              localStorage.setItem("namee", JSON.stringify(inputs.userName));
              localStorage.setItem("pwd", JSON.stringify(inputs.password));

              localStorage.setItem("access", JSON.stringify(response.data));
            }
          },
          (error) => {
            var error1 = error.response.status;
            console.log(error1);
            if (error1 === 401) {
              setauthenticated(true);
            }
          }
        );
    } catch (AxiosError) {}
  };

  const handleChange = (e) => {
    const name = e.target.name;

    const value = e.target.value;

    setInputs((values) => ({
      ...values,
      [name]: name === "registered" ? e.target.id : value,
    }));
  };

  useEffect(()=>{
   Object.values(inputs).length==2&&inputs.userName.length>0&&inputs.password.length>0?  setEnable(true):setEnable(false)

  },[inputs])
  console.log(inputs);

  return (
    <div className="flex flex-col  justify-center items-center h-screen">
      <img src={logo} alt="logo" className="w-48 pb-12"/>
      <h1 className="font-semibold lg:text-md pb-4">Admin Portal</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <InputPP
          className="w-full lg:w-80 border-[#EEF0F2]  px-3 py-2 my-2 rounded-md"
          labelClassName=" font-sm pl-1 "
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
          labelClassName=" font-sm pl-1 "
          id="password"
          label="Password"
          type="password"
          placeholder="Your password"
          // state={[ownerName, setOwnerName]}
          value={inputs.password}
          changeFunction={handleChange}
          errorState={[passwordError, setPasswordError]}
        />
        <a className="text-[#8E92BC] text-right text-sm " href="/forgot">
          Forgot Password?
        </a>
        {enable && (
          <input
            type="submit"
            className="bg-[#0D6EFD] w-full px-5 py-3 rounded-[15px] text-white focus:outline-none cursor-pointer "
            //   onClick={handleSubmit}
            value="Login"
          />
        )}
        {!enable && (
          <input
            type="submit"
            className="bg-[#EBEBE4] w-full px-5 py-3 disable rounded-[15px] text-white focus:outline-none cursor-pointer "
            //   onClick={handleSubmit}
            value="Login"
          />
        )}
        {authenticated && (
          <p className="text-[#FF0000] text-sm text-center">
            incorrect username and password
          </p>
        )}
      </form>
    </div>
  );
};

export default Login;
