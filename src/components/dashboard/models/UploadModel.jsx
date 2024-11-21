import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdDelete } from "react-icons/md";

const UploadModel = ({ uid = "", handleModel }) => {
  const [file, setFile] = useState(null);
  const [custUniqueId, setCustUniqueId] = useState("");
  const [docName, setDocName] = useState("Pan Card");
  const [handleCloseModel, setHandleCloseModel] = handleModel;
  const [documentId, setDocumentId] = useState('');

  const [key, setKey] = useState(false);
  const [uploadedDocs, setUploadedDocs] = useState([]);
  const name = JSON.parse(localStorage.getItem("namee"));
  const Password = JSON.parse(localStorage.getItem("pwd"));
  const API_ENDPOINT = process.env.REACT_APP_API_URL;


  const getDocs = ()=>{
    axios
    .get(`${API_ENDPOINT}/get-cust-doc?custUId=${uid}`, {
      auth: {
        username: name,
        password: Password
      }
    })
    .then((response) => {
      setUploadedDocs(response.data);
      console.log("Customer documents:", response.data);
    });
  }


  const uploadDocument = async (e) => {
    e.preventDefault();

    const fileSizeInMB = file.size / (1024 * 1024); // Convert file size to MB

    if (fileSizeInMB > 5) {
      // File size exceeds 5MB, display an error message or perform appropriate action
      toast.error('File size should be less than 5MB');
      return; // Prevent further processing
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("custUniqueId", uid);
    formData.append("docName", docName);
    const auth = {
      username: name,
      password: Password
    };

    try {
      const response = await axios.post(
        `${API_ENDPOINT}/doc-upload`,
        formData,
        { auth },
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );
      
      // Handle success, if needed
      if (response.status === 200) {
        toast.success("Document uploaded successfully");
      }
      getDocs()
    } catch (error) {
      console.error("Error uploading document:", error);
      // Handle error, if needed
    }
    }

  //get customer documents
  useEffect(() => {
    getDocs()
    // Handle received documents, if needed
  }, []);

  // delete documents


  const deleteDocument =  (id) => {

       axios.delete(`${API_ENDPOINT}/delete-cust-doc?documentId=${id}`, {
            auth: {
              username: name,
              password: Password
            }}).
            then((response)=>{
                toast.success('Document deleted successfully')
                getDocs()

            })
        // Handle success, if needed
    } 

  return (
    <div>
      <ToastContainer />

      <div className="justify-center items-center h-11/12 flex overflow-x-hidden bg-[rgba(0,0,0,.2)] bg-blend-darken overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative my-6 mx-auto  ">
          {/*content*/}
          <form>
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full h-7/12 overflow-auto bg-white p-5  ">
              {/*header*/}
              <div className=" flex justify-end">
                <div
                  className="cursor-pointer  font-semibold  w-5  text-xl  "
                  onClick={(e) => setHandleCloseModel(!handleCloseModel)}
                >
                  X
                </div>
              </div>

              {key && (
                <p className="text-[#9ACD32] text-md text-left pl-10">
                  Deleted Successfully
                </p>
              )}

              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Upload Document</h3>
                {/* <input
                  type="text"
                  placeholder="Customer Unique ID"
                  value={custUniqueId}
                  onChange={(e) => setCustUniqueId(e.target.value)}
                  className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500 mb-2"
                /> */}

                <select
                  name="doc"
                  id="doc"
                  onChange={(e) => setDocName(e.target.value)}
                  className="border border-gray-300 rounded-md p-2 mx-5 focus:outline-none focus:ring focus:ring-blue-500 mb-2"
                >
                  <option value="Pan Card">Pan Card</option>
                  <option value="Adhar Card">Adhar Card</option>
                  <option value="RC Copy">RC Copy</option>
                  <option value="Others">Others</option>
                </select>

                <input
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500 mb-2"
                />
                <button
                  onClick={uploadDocument}
                  className="bg-blue-500 bg-hero shadow-hero text-white ml-5 hover:shadow-xl px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-500"
                >
                  Upload
                </button>
              </div>
              <section className="">
                <h2 className="text-lg font-semibold my-2">
                  Uploaded Documents
                </h2>
                <table className="w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border border-gray-200 px-4 py-2">Document Id</th>
            <th className="border border-gray-200 px-4 py-2">Document Name</th>
            <th className="border border-gray-200 px-4 py-2"> Actions</th>
          </tr>
        </thead>
        <tbody>
          {uploadedDocs.map(doc => (
            <tr key={doc.docid}>
              <td className="border text-center border-gray-200 px-4 py-2">{doc.documentId}</td>
              <td className="border  text-center border-gray-200 px-4 py-2">{doc.documentType}</td>
              <td className="border font-medium text-center m-auto  rounded-md hover:bg -hero  opacity-40 hover:opacity-100 hover:text-[#d44545]    border-gray-200 px-4 py-2"  onClick={()=>{deleteDocument(doc.documentId)}} >  <MdDelete title="Delete" className="text-2xl"/>
</td>
            </tr>
          ))}
        </tbody>
      </table>
            
              </section>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UploadModel;
