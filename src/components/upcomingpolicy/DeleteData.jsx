import React from 'react'

const DeleteData = () => {
  return (
    <div className="justify-center items-center h-11/12 flex overflow-x-hidden bg-[rgba(0,0,0,.2)] bg-blend-darken overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
    <div className="relative w-9/12 my-6 mx-auto max-w-3xl">
      {/*content*/}
      <form>
        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white  outline-none focus:outline-none">
          {/*header*/}
          <div className="flex items-center justify-between p-5 border-solid border-slate-200 rounded-t">
            <h3 className="text-2xl font-semibold ">
              Are you sure you want to delete this user{" "}
              <span className="text-[#50C878]">{"uid"}</span>
            </h3>
            <button
              className="text-red-500 background-transparent font-bold text-2xl uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
            //   onClick={() => setModell(false)}
            >
              X
            </button>
          </div>
          {/*body*/}
          {/* <div>
   <h1>ss</h1>
    </div> */}
          {'key' && (
            <p className="text-[#9ACD32] text-md text-left pl-10">
              Deleted Successfully
            </p>
          )}
          <div className="flex items-center justify-end p-6  border-solid border-slate-200 rounded-b">
            <button
              className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
            //   onClick={() => setModell(false)}
            >
              Close
            </button>

            <button
              type="submit"
            //   onClick={handleDelete}
              className="inline-block px-6 py-2.5 bg-hero text-white font-medium text-xs leading-tight uppercase rounded  hover:shadow-lg hover:text-black focus:shadow-lg focus:outline-none "
            >
              submit
            </button>
          </div>
        </div>
      </form>
    </div>
    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>

  </div>
  )
}

export default DeleteData