import React, { useState } from 'react';
import axios from 'axios';
import NavHeader from '../components/NavHeader';

function FilesAndDocuments() {
    const [custUniqueId, setCustUniqueId] = useState('');
    const [docName, setDocName] = useState('');
    const [file, setFile] = useState(null);
    const [documentId, setDocumentId] = useState('');

    const API_ENDPOINT = process.env.REACT_APP_API_URL;
    const name = JSON.parse(localStorage.getItem("namee"));
    const Password = JSON.parse(localStorage.getItem("pwd"));

    const uploadDocument = async () => {
        // const formData = {
        //     custUniqueId:12345,
        //     docName: 'Pan',


        // }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('custUniqueId', 5);
        formData.append('docName', 'Pan');
    const auth = {
        username: name,
        password: Password
    }

        try {
            const response = await axios.post(`${API_ENDPOINT}/doc-upload`,formData, 
                {auth}, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Document uploaded successfully:', response.data);
            // Handle success, if needed
        } catch (error) {
            console.error('Error uploading document:', error);
            // Handle error, if needed
        }
    };
 
  
    const downloadDocument = async () => {
       try {
        axios.get(`${API_ENDPOINT}/download-doc?documentId=${documentId}`, {
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
       }

       catch(err) {
        console.log(err)
       }
       
       
    //     try {
    //   // Make API request to get file data and file name
    //   axios.get(`${API_ENDPOINT}/download-doc?documentId=${this.props.fileId}`, {
    //     responseType: 'json', // Set responseType to 'json' to receive JSON response
    //     auth: {
    //       username: 'user90',
    //       password: 'port90pw'
    //     }
    //   })
    //   .then(response => {
      
       
    //     const fileName =  response.data.fileName
    //     const fileData = response.data.fileData
    // if (fileName && fileData) {
    //   // Decode the Base64 string into a binary data array
    //   const byteCharacters = atob(fileData);
    //   const byteNumbers = new Array(byteCharacters.length);
    //   for (let i = 0; i < byteCharacters.length; i++) {
    //     byteNumbers[i] = byteCharacters.charCodeAt(i);
    //   }
    //   const byteArray = new Uint8Array(byteNumbers);

    //   // Create a Blob object from the binary data array
    //   const blob = new Blob([byteArray], { type: 'application/octet-stream' });

    //   // Create a download link
    //   const url = URL.createObjectURL(blob);
    //   const link = document.createElement('a');
    //   link.href = url;
    //   link.setAttribute('download', fileName); // Set the file name

    //   // Trigger a click event on the download link
    //   document.body.appendChild(link);
    //   link.click();

    //   // Clean up
    //   document.body.removeChild(link);
    //   URL.revokeObjectURL(url);
    // }
    
    //   })
    // }
    //   .catch(error => console.error('Error fetching data:', error));
    }

    const getCustomerDocuments = async () => {
        try {
            const response = await axios.get(`${API_ENDPOINT}/get-cust-doc?custUId=${custUniqueId}`, {
                auth: {
                  username: name,
                  password: Password
                }});
            console.log('Customer documents:', response.data);
            // Handle received documents, if needed
        } catch (error) {
            console.error('Error getting customer documents:', error);
            // Handle error, if needed
        }
    };

    const deleteDocument = async () => {
        try {
            const response = await axios.delete(`${API_ENDPOINT}/delete-cust-doc?documentId=${documentId}`, {
                auth: {
                  username: name,
                  password: Password
                }});
            console.log('Document deleted successfully:', response.data);
            // Handle success, if needed
        } catch (error) {
            console.error('Error deleting document:', error);
            // Handle error, if needed
        }
    };

    return (
        <>
<NavHeader/>
        <div className="container mx-auto p-4">

            <h2 className="text-2xl font-bold mb-4">Document Management</h2>

            {/* Upload Document */}
            <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Upload Document</h3>
                <input 
                    type="text" 
                    placeholder="Customer Unique ID" 
                    value={custUniqueId} 
                    onChange={(e) => setCustUniqueId(e.target.value)} 
                    className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500 mb-2"
                />

                <select name="" id=""   value={docName}   onChange={(e) => setDocName(e.target.value)}   className="border border-gray-300 rounded-md p-2 mx-5 focus:outline-none focus:ring focus:ring-blue-500 mb-2">  
                <option value="">Pan Card</option>
                <option value="">Adhar Card</option>
                <option value="">RC Copy</option>
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

            {/* Download Document */}
            <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Download Document</h3>
                <input 
                    type="text" 
                    placeholder="Document ID" 
                    value={documentId} 
                    onChange={(e) => setDocumentId(e.target.value)} 
                    className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500 mb-2"
                />
                    <button 
                    onClick={downloadDocument} 
                    className="bg-blue-500 bg-hero shadow-hero text-white ml-5 hover:shadow-xl px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-500"
                >
                    Download
                </button>
            </div>

            {/* Get Customer Documents */}
            <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Get Customer Documents</h3>
                <input 
                    type="text" 
                    placeholder="Customer Unique ID" 
                    value={custUniqueId} 
                    onChange={(e) => setCustUniqueId(e.target.value)} 
                    className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500 mb-2"
                />
                    <button 
                    onClick={getCustomerDocuments} 
                    className="bg-blue-500 bg-hero shadow-hero text-white ml-5 hover:shadow-xl px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-500"
                >
                    Get Documents
                </button>
            </div>

            {/* Delete Document */}
            <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Delete Document</h3>
                <input 
                    type="text" 
                    placeholder="Document ID" 
                    value={documentId} 
                    onChange={(e) => setDocumentId(e.target.value)} 
                    className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500 mb-2"
                />
                    <button 
                    onClick={deleteDocument} 
                    className="bg-blue-500 bg-[#e04343] shadow-[#e04343] text-white ml-5 hover:shadow-xl px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-500"
                >
                    Delete
                </button>
            </div>
        </div>
        </>
    );
}

export default FilesAndDocuments;
