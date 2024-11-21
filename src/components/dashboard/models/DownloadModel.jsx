import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdDelete } from "react-icons/md";
import { FaDownload  } from "react-icons/fa";
const DownloadModel = ({ uid = "", handleModel }) => {
  const [file, setFile] = useState(null);
  const [custUniqueId, setCustUniqueId] = useState("");
  const [docName, setDocName] = useState("panCard");
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
                toast.error('Document deleted successfully')
                getDocs()

            })
        // Handle success, if needed
    } 


    //download documents
    const downloadDocument = async (docId) => {
        try {
         axios.get(`${API_ENDPOINT}/download-doc?documentId=${docId}`, {
                 responseType: 'json', // Set responseType to 'json' to receive JSON response
                 auth: {
                   username: 'user90',
                   password: 'port90pw'
                 }
               })
               .then(response => {
                 
         const fileName =  response.data.fileName
         const fileData = response.data.fileData
     if (fileName && fileData) {
       // Decode the Base64 string into a binary data array
       const byteCharacters = atob(fileData);
       const byteNumbers = new Array(byteCharacters.length);
       for (let i = 0; i < byteCharacters.length; i++) {
         byteNumbers[i] = byteCharacters.charCodeAt(i);
       }
       const byteArray = new Uint8Array(byteNumbers);
 
       // Create a Blob object from the binary data array
       const blob = new Blob([byteArray], { type: 'application/octet-stream' });
 
       // Create a download link
       const url = URL.createObjectURL(blob);
       const link = document.createElement('a');
       link.href = url;
       link.setAttribute('download', fileName); // Set the file name
 
       // Trigger a click event on the download link
       document.body.appendChild(link);
       link.click();
 
       // Clean up
       document.body.removeChild(link);
       URL.revokeObjectURL(url);
     }
               })
               toast.success('Successfully Downloaded docement')
        }
 
        catch(err) {
         console.log(err)
        }
        
        
    
     }
 

  return (
    <div>
      <ToastContainer />

      <div className="justify-center items-center h-11/12 flex overflow-x-hidden bg-[rgba(0,0,0,.2)] bg-blend-darken overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative my-6 mx-auto  ">
          {/*content*/}
          <form>
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col  h-7/12 overflow-auto bg-white p-5  ">
              {/*header*/}
              <div className=" flex justify-end">
                <div
                  className="cursor-pointer  font-semibold  w-5  text-xl  "
                  onClick={(e) => setHandleCloseModel(!handleCloseModel)}
                >
                  X
                </div>
              </div>

            
              {uploadedDocs.length<1&& <p className="text-center"> 
                No Documents Uploaded Yet! <br /> Please Click on the 'Upload' Button Below To Add Your Documents
            </p> }
            
              <section className={`${uploadedDocs.length<1?'hidden':''}`}>
                <h2 className="text-lg font-semibold my-2">
                  Download Documents
                </h2>

             

                <table className={`  w-full border-collapse border border-gray-200`}>
        <thead>
          <tr>
            <th className="border border-gray-200 px-4 py-2">Document Id</th>
            <th className="border border-gray-200 px-4 py-2">Document Name</th>
            <th className="border border-gray-200 px-4 py-2"> Actions</th>
          </tr>
        </thead>
        <tbody>
          {uploadedDocs.map(doc => (
            <>
            <tr  key={doc.documentId}>
              <td className="border text-center border-gray-200 px-4 py-2">{doc.documentId}</td>
              <td className="border  text-center border-gray-200 px-4 py-2">{doc.documentType}</td>
              <td className="flex items-center gap-5 border font-medium text-center m-auto  rounded-md         border-gray-200 px-4 py-2 "  >  <MdDelete title="Delete" cla  onClick={()=>{deleteDocument(doc.documentId)}} className="text-2xl opacity-40 hover:opacity-100 hover:text-[#d44545]"/>
              <FaDownload title="Delete" className="text-2xl opacity-40 hover:opacity-100 hover:text-[#669656] " onClick={()=>{
downloadDocument(doc.documentId)
              }}/>
</td>
           
           
           
 
            </tr>
            <tr className={`${uploadedDocs.length>0?'hidden':""}`}>
                Please Add Documents to Download..
            </tr>
            </>


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

export default DownloadModel;
