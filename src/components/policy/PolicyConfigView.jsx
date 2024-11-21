import React,{useState,useEffect} from 'react'

const PolicyConfigView = ({title,openModel,mapVal,delModel,delItem}) => {
    const [line, setline] = mapVal
    const [model, setModel] =openModel
    const [modell, setModell] = delModel
    const [dellob, setDellob] = delItem


  return (
        <>
          <div className="justify-center items-center h-11/12 flex overflow-x-hidden bg-[rgba(0,0,0,.2)] bg-blend-darken overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-9/12 h-5/6 overflow-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <form>
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white  outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-center justify-between p-5 border-solid border-slate-200 rounded-t">
                    <h3 className="text-2xl font-semibold ">
                      {title}
                      <span className="text-[#50C878]"></span>
                    </h3>
                    <button
                      className="text-red-500 background-transparent font-bold text-2xl uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => {
                        setModel(false);
                      }}
                    >
                      X
                    </button>
                  </div>
                  <table className=" text-sm w-full text-center text-gray-500 dark:text-gray-400 ">
                    <thead className="text-xs text-gray-700 border-b-2 border-gray uppercase bg-white dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" className="px-1 py-1">
                         {title}
                        </th>

                        {/* <th scope="col" className="px-6 py-3">
<span >Edit</span>
</th> */}
                      </tr>
                    </thead>
                    <tbody>
                      {line.map((item, key) => (
                        <tr className="bg-white border-b-2 border-gray dark:bg-gray-800 dark:border-gray-700 hover:bg-gray dark:hover:bg-gray-600">
                          <td className="uppercase px-1 py-1">
                            {item}
                          </td>

                          <td className="px-1 py-1 text-right right-0 sticky p-4  bg-white">
                            <button
                              className="font-medium p-4 bg-[#87898c39] text-black rounded-md hover:bg-[#e65858] shadow-xl hover:shadow-[#e65858] hover:text-white mb-2"
                              onClick={(e) => {
                                e.preventDefault();
                                setDellob(item);
                                setModell(true);
                              }}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </form>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
  )
}

export default PolicyConfigView