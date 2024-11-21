import React,{useState,useEffect} from 'react'
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const DeleteModel = ({uid='',handleDeleteCloseModell}) => {


    const [key, setKey] = useState(false);

    const name = JSON.parse(localStorage.getItem("namee"));
    const Password = JSON.parse(localStorage.getItem("pwd"));
    const API_ENDPOINT = process.env.REACT_APP_API_URL;

        /*----------------------------------------------- Handle to Close Delete Model and Update the Table Data after edit -------------------  */
        // const handleDeleteCloseModel = (e)=>{
        //     e.preventDefault();
        //     handleDeleteCloseModell()
            
        //     }


            const handleDelete = (e) => {
                e.preventDefault();
                axios
                  .delete(`${API_ENDPOINT}/policy/delete?id=` + uid, {
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
                    toast.error('Deleted Successfully')
                    setTimeout(()=>{

                      handleDeleteCloseModell(e)
                    },2000)
                  });
              };

  return (
    <div>
      <ToastContainer />

                <div className="justify-center items-center h-11/12 flex overflow-x-hidden bg-[rgba(0,0,0,.2)] bg-blend-darken overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-9/12 my-6 mx-auto max-w-3xl">
                  {/*content*/}
                  <form>
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white  outline-none focus:outline-none">
                      {/*header*/}
                      <div className="flex items-center justify-between p-5 border-solid border-slate-200 rounded-t">
                        <h3 className="text-2xl font-semibold ">
                          Are you sure you want to delete this user{" "}
                          <span className="text-[#50C878]">{uid}</span>
                        </h3>
                        <button
                          className="text-red-500 background-transparent font-bold text-2xl uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          type="button"
                          onClick={  (e)=> handleDeleteCloseModell(e)}
                          // onClick={() => setModell(false)}
                        >
                          X
                        </button>
                      </div>
                     
                      {key && (
                        <p className="text-[#9ACD32] text-md text-left pl-10">
                          Deleted Successfully
                        </p>
                      )}
                      <div className="flex items-center justify-end p-6  border-solid border-slate-200 rounded-b">
                        <button
                          className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          type="button"
                     
                          onClick={  (e)=> handleDeleteCloseModell(e)}
                        >
                          Close
                        </button>

                        <button
                          type="submit"
                          onClick={handleDelete}
                          className="inline-block px-6 py-2.5 bg-hero text-white font-medium text-xs leading-tight uppercase rounded  hover:shadow-lg hover:text-black focus:shadow-lg focus:outline-none "
                        >
                          submit
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </div>
  )
}

export default DeleteModel