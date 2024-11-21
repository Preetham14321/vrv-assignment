import React,{useState,useEffect} from 'react'

const DetailsModel = ({modelData=[],modalhandle,modelTypee}) => {
const [lob, setLob] = useState([])
const [showModalPolicy, setShowModalPolicy] = modalhandle
const [modelType, setModelType] = useState('')

useEffect(()=>{
    setLob(modelData)
    setModelType(modelTypee)
},[modelData,modelTypee])

console.log('lobData ', modelType)

  return (
    <>
    <div className="justify-center items-center flex overflow-y-auto overflow-x-hidden bg-[rgba(0,0,0,.2)] bg-blend-darken  fixed inset-0 z-50 outline-none focus:outline-none">
      <div className="relative w-9/12 h-5/6 overflow-y-auto my- mx-auto max-w-3xl">
        {/*content*/}
        <form>
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white  outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-2 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-2xl font-semibold">Details</h3>

              <button
                className="text-red-500 background-transparent font-bold text-2xl uppercase px-6 py- text-sm outline-none focus:outline-none mr- mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setShowModalPolicy(false)}
              >
                X
              </button>
            </div>
            {/*body*/}
            <form>
              <table className=" text-sm w-full text-center text-gray-500 dark:text-gray-400 ">
                <thead className="text-xs text-gray-700 border-b-2 border-gray uppercase bg-white dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className=" py-3">
                      Line Of Business
                    </th>
                    <th scope="col" className=" py-3">
                      Number Of Customers
                    </th>

                    {/* <th scope="col" className="px-6 py-3">
<span >Edit</span>
</th> */}
                  </tr>
                </thead>
                <tbody className="w-full ml-2">
                  {lob&&lob.map((item, key) => (
                    <tr className={`${key%2!==0?'bg-[#28d6731b]':''} ml-2 border-b-2 border-gray dark:bg-gray-800 dark:border-gray-700 hover:bg-g dark:hover:bg-gray-600 w-full`}>
                      <td className="pl-2 py-3">{item.lineOfBusiness}</td>
                      <td className={`${modelType==='claims'?'hidden':''} pl-2 py-3"`}>{item.numberOfPolicies}</td>
                      <td className={`pl-2 text-center py-3"`}>{item.numberOfLeads}</td>

                      <td className=" py-4 text-right right-0 sticky p- bg-white"></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </form>
          </div>
        </form>
      </div>
    </div>
    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
  </>
  )
}

export default DetailsModel