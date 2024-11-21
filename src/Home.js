import React,{useState,useEffect,createContext } from 'react'
import App from './App'
export const UserContext = createContext();
function Home() {
   
const [authen, setAuthen]=useState(false);
    return (
        <>
          <UserContext.Provider value={{authen,setAuthen}}>
           <App></App>
           </UserContext.Provider>
        </>
    )
}
export default Home;