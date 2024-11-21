import React,{useState,useEffect} from 'react'

const InputPP = ({dataInp}) => {
    const [nameData, setNameData] = useState({ });
    const handleChange = (e) => {
        const value = e.target.value;
        setNameData({
          ...nameData,
          [e.target.name]: value
        });
      };
  return (
    <>
    {dataInp.map((item, key) => (
        <>
          <div className="flex overflow-auto relative w-full  pb-7 items-center ">
            <label className="w-max font-semibold" htmlFor={item.id}>
              {item.name} : <span className={` ${item.req?'':'hidden'} text-[#cc5050]`}>*</span>
            </label>
            <div className="flex flex-1"></div>
            <input
            onChange={handleChange}
              type={item.inpTyp}
              id={item.id}
              name={item.id}
              defaultValue={item.defVal}
              className={`${item.isDrp ? "hidden" : ""} ${
                item.inpTyp === "date" ? "absolute right-0 " : ""
              } w-80 focus:outline-none focus:text-gray-600  p-2  border border-gray rounded shadow `}
            />

            <select
               id={item.id}
               name={item.id}
              defaultValue={item.defVal}

              // onChange={(e) => setValuee(e.target.value)}
              className={`${
                item.isDrp ? "block" : "hidden"
              }  w-80 px-4 py-2   text-gray-700 bg-white border border-gray mb -5 rounded shadow    focus:outline-none  `}
            >
              <option defaultValue={item.defVal} value="">{item.defVal}</option>
              {item.drpVal &&
                item.drpVal.map((item) => (
                  <option value={item.value}>{item.value}</option>
                ))}
            </select>
          </div>
        </>
      ))}
    </>

  )
}

export default InputPP