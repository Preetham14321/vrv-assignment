import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const DeleteModel = ({ fieldName, fieldValue, closeModal, closeModel2,propTyp='claims' }) => {
  const name = JSON.parse(localStorage.getItem("namee"));
  const Password = JSON.parse(localStorage.getItem("pwd"));
  const API_ENDPOINT = process.env.REACT_APP_API_URL;

  const handleDeleteeee = (e) => {
    e.preventDefault();
    axios
      .delete(`${API_ENDPOINT}/configurable/delete`, {
        auth: {
          username: name,
          password: Password
        },
        params: {
          fieldName: fieldName,
          value: fieldValue,
          property:propTyp
        }
      })
      .then((response) => {
        console.log(response.status);

        setTimeout(() => {
          closeModal();
          closeModel2();
          //   setModellis(false)
          //   setInmodel(false)
        }, 500);

        if (response.status === 200) {
          toast.success(`${fieldName} Deleted Successfully`);
        }
      });
  };

  return (
    <div>
      <div className="justify-center items-center h-11/12 flex overflow-x-hidden bg-[rgba(0,0,0,.2)] bg-blend-darken overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-9/12 my-6 mx-auto max-w-3xl">
          {/*content*/}
          <form>
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white  outline-none focus:outline-none">
              {/*header*/}
              <div className="flex items-center justify-between p-5 border-solid border-slate-200 rounded-t">
                <h3 className="text-2xl font-semibold ">
                  Are you sure you want to delete this Insurance Product{" "}
                  <span className="text-[#50C878]">{fieldValue}</span>
                </h3>
                <button
                  className="text-red-500 background-transparent font-bold text-2xl uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={closeModal}
                >
                  X
                </button>
              </div>
              {/*body*/}
              {/* <div>
               <h1>ss</h1>
                </div> */}
              <div className="flex items-center justify-end p-6  border-solid border-slate-200 rounded-b">
                <button
                  className="text-red-500  background-transparent font-bold uppercase px-6 py-2  text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={closeModal}
                  // onClick={() =>
                  //         //  setModellis(false)
                  //    }
                >
                  Close
                </button>

                <button
                  type="submit"
                  onClick={handleDeleteeee}
                  className="inline-block px-6 py-2.5 bg-[#87898c39] text-black   hover:bg-[#e65858] hover:text-white  shadow-xl  hover:shadow-[#e65858] font-medium text-xs leading-tight uppercase rounded shadow-md  hover:shadow-lg hover:text-black focus:shadow-lg focus:outline-none "
                >
                  Delete
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </div>
  );
};

export default DeleteModel;
