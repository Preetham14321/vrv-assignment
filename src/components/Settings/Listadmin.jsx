import React from "react";
import { useEffect, useState, useRef } from "react";
import Pagination from "../dashboard/Pagination";
import axios from "axios";
const Listadmin = () => {
  const [len, setLen] = useState();
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [key, setKey] = useState();
  const [namee, setNamee] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [valuee, setValuee] = useState("");
  const [jwtToken, setJwtToken] = useState(localStorage.getItem("jwt_token"));
  const nam = namee;
  const previousPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const API_ENDPOINT = process.env.REACT_APP_API_URL;
  const nextPage = () => {
    if (currentPage !== Math.ceil(data.length / postsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };
  const name = JSON.parse(localStorage.getItem("namee"));
  const Password = JSON.parse(localStorage.getItem("pwd"));
 

const fetchUsers = () => {
var i ;
  axios
  .get(`${API_ENDPOINT}/userList`, {
    auth: {
      username: name,
      password: Password,
    },
  })
  .then((response) => {
    // console.log(AxiosError.response.statusCode)
    var len = response.data.length;
    setLen(len);
 
    setData(response.data);
    if (response.data.leadStatus === "pending") {
    }
  });

}


useEffect(() => {
  fetchUsers()

}, []);
  var storedNames = JSON.parse(localStorage.getItem("names"));
  console.log(storedNames);
  const handleSubmitt = (e) => {
    e.preventDefault();
    const userData = {
      username: nam,
    };
    const auth = {
      username: name,
      password: Password,
    }


    axios.delete(`${API_ENDPOINT}/enrollment/delete?username=${nam}`, { auth })
    .then(response => {
      console.log(response.status);
          
            if (response.status === 200) {
              console.log("success");
              setIsOpen(true);
              setShowModal(!showModal);

            }
            fetchUsers()
    })
    .catch(error => {
      console.error('Error deleting:', error);
      // Handle error, show error message, etc.
    });
}
 
  console.log();
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = data.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return (
    <div className="flex w-full bg-[#f8f9fa]  overflow-x-hidden">
      <div className="relative overflow-x-auto  shadow-md sm:rounded-lg w-11/12 ml-14 mt-10 mb-10 p-4 bg-white">
        <h3 className="bg-white text-xl p-4 font-semibold">User List</h3>

        <table className=" text-sm w-full text-center text-gray-500 dark:text-gray-400 ">
          <thead className="text-xs text-gray-700 border-b-2 border-gray uppercase bg-white dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                id
              </th>
              <th scope="col" className="px-6 py-3">
                User Name
              </th>
              <th scope="col" className="px-6 py-3">
                First Name
              </th>
              <th scope="col" className="px-6 py-3">
                Last Name
              </th>
              <th scope="col" className="px-6 py-3">
                Access Type
              </th>
              {/* <th scope="col" className="px-6 py-3">Role</th> */}
              {/* <th scope="col" className="px-6 py-3">
<span >Edit</span>
</th> */}
            </tr>
          </thead>
          <tbody>
            {currentPosts.map((item, key) => (
              <tr className="bg-white border-b-2 border-gray dark:bg-gray-800 dark:border-gray-700 hover:bg-gray dark:hover:bg-gray-600">
                <td className="px-6 py-4" key={item.id}>
                  {item.id}
                </td>
                <td className="px-6 py-4">{item.userName}</td>
                <td className="px-6 py-4">{item.firstName}</td>
                <td className="px-6 py-4">{item.lastName}</td>
                <td className="px-6 py-4">{item.currentAccessType}</td>
                {/* <td className="px-6 py-4">{}</td> */}
                <td className="px-6 py-4 text-right right-0 sticky p-4 bg-white">
                  <button
                    onClick={() => {
                      setShowModal(true);
                      setNamee(item.userName);
                      setIsOpen(false);
                    }}
                    id={key}
                    className="font-medium p-4  bg-gray text-black rounded-md hover:bg-hero"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={data.length}
          paginate={paginate}
          previousPage={previousPage}
          nextPage={nextPage}
        />
      </div>
      {showModal ? (
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
                      <span className="text-[#50C878]">{nam}</span>
                    </h3>
                    <button
                      className="text-red-500 background-transparent font-bold text-2xl uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setShowModal(false)}
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
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      Close
                    </button>

                    <button
                      type="submit"
                      className="inline-block px-6 py-2.5 bg-hero text-white font-medium text-xs leading-tight uppercase rounded shadow-md  hover:shadow-lg hover:text-black focus:shadow-lg focus:outline-none "
                      onClick={handleSubmitt}
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

export default Listadmin;
