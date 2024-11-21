import React from "react";
import { useEffect, useState } from "react";
import Avatar from "react-avatar-edit";
import img from "../../assets/img1.jpg";
import Modal from "react-modal";
const Pro = () => {
  const [preview, setPreview] = useState(null);
  const [pre, setPre] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [sta, setSta] = useState(false);
  function toggleModal() {
    setIsOpen(!isOpen);
  }
  function onClose() {
    setPre(null);
  }
  function onCrop(pv) {
    setPreview(pv);
    setSta(true);
  }
  function onBeforeFileLoad(elem) {
    if (elem.target.files[0].size > 2000000) {
      alert("File is too big!");
      elem.target.value = "";
    }
  }

  return (
    <div className="">
      <div className="p-2">
        <div className="p-2 bg-gray shadow mt-16">
          <div className="grid grid-cols-1 md:grid-cols-3">
            <div className="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0"></div>{" "}
            <div className="relative">
              <div className="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
                <img
                  style={{
                    width: "200px",
                    height: "200px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: "4px solid green",
                    marginLeft: "5%",
                  }}
                  onClick={toggleModal}
                  src={sta ? preview : img}
                  alt=""
                />
                <Modal
                  isOpen={isOpen}
                  onRequestClose={toggleModal}
                  contentLabel="My dialog"
                  className="fixed p-10 bg-gray drop-shadow-lg ml-96 w-1/2 h-9/12 -mt-96"
                  overlayClassName="fixed bg-[#000]"
                  closeTimeoutMS={500}
                >
                  <Avatar
                    label="choose file to upload"
                    width={500}
                    height={400}
                    imageWidth={400}
                    onCrop={onCrop}
                    onClose={onClose}
                    onBeforeFileLoad={onBeforeFileLoad}
                    src={null}
                  />
                  <button
                    onClick={toggleModal}
                    className="p-4 rounded-xl mt-10 ml-72 drop-shadow-md text-white bg-hero hover:bg-back-700"
                  >
                    Close
                  </button>
                </Modal>
              </div>
            </div>
            <div className="space-x-8 flex justify-between mt-32 md:mt-0 md:justify-center"></div>
          </div>
          <div className="mt-28 text-center  pb-12">
            <h1 className="text-4xl font-medium text-gray-700">
              {JSON.parse(localStorage.getItem("namee"))}
            </h1>
            <p className="font-light text-gray-600 mt-3">
              {JSON.parse(localStorage.getItem("access"))}
            </p>
            <p className="mt-8 text-gray-500">Senior Manager</p>
            <p className="mt-2 text-gray-500">Last Login : </p>{" "}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Pro;
