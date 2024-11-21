
import React,{useState,useEffect,useContext  } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Claims from "./pages/Claims";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Policy from "./pages/Policy";
import Profile from "./pages/Profile";
import Reports from "./pages/Reports";
import Forgot from "./pages/Forgot"
import Leads from "./pages/Leadpage"
import Adminen from './pages/Adminen';
import Listadmin from './pages/Listad';
import Addcli from './pages/Addcli';
import Listcli from './pages/Listcli'
import Policycon from './pages/Policycon';
import axios from "axios";
import {Context} from './components/Context/Context'
import { UserContext }  from './Home'
import { ToastContainer, toast } from 'react-toastify';
import ClaimsEntry from './components/claims/ClaimsEntry';
import ClaimsCon from './pages/ClaimsCon';
import LeadsEntry from './components/Leads/LeadsEntry';
import LeadsConfig from './components/Settings/LeadsConfig';
import LeadsCon from './pages/LeadsCon';
import ClaimsConfigTemp from './components/Settings/ClaimsConfigTemp';
import ClaimsConfig from './components/Settings/ClaimsConfig';
import SessionTimeout from './components/SessionTimeout';
import RenewalsConfigHandle from './pages/RenewalsConfig';
import Renewals from './pages/Renewals';
import GlobalConfig from './pages/GlobalConfig';
import FilesAndDocuments from './pages/FilesAndDocuments';
function App() {
  const [lineOfB, setLineofB]=useState(['a','b','c','d','e']);
  const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT
  const user = useContext(UserContext);

 

  useEffect(() => {
    console.log(user);
    axios
      .post(
        `https://staging-policymart.co.in/api/v1/token`,
        {
          
            username: "oneadmin",
            credentials: "$%#@gh817655$$#1jk"
    
        },
        {
          headers: {
            "Content-Type": "application/json",
            accept: "application/json",

          }
        }
        )
        .then((res) => {
          localStorage.setItem('jwt_token',res.data)

        //   setTokenLoaded(true)
        // setJwtToken(res.data);
      })
      
      .catch((error) => console.log(error));
        
      }, [API_ENDPOINT, user])

  useEffect(() => {
    
    const interval = setInterval(() => {
       axios
      .post(
        `${API_ENDPOINT}/token`,
        {
          
            username: "oneadmin",
            credentials: "$%#@gh817655$$#1jk"
    
        },
        {
          headers: {
            "Content-Type": "application/json",
            accept: "application/json"
          }
        }
        )
        .then((res) => {
          localStorage.setItem('jwt_token',res.data)
          window.dispatchEvent(new Event("storage"));
        // setJwtToken(res.data);
      })
      
      .catch((error) => console.log(error));
    
  
    },240000);
  
    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, [])
  

  const handleLogout = () => {
    // Implement your logout logic here, e.g., redirecting to the login page
    console.log('User logged out due to inactivity');
    window.location.href='/'
  };

  return (
    <Context.Provider value={{lineOfB, setLineofB}}> 

 <div className="App">
      <BrowserRouter>
      <SessionTimeout onLogout={handleLogout}>
        <ScrollToTop>
      
          <Routes>
        
          <Route exact path="/" element={<Login />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/policyEntry" element={<Policy />} />
          <Route exact path="/claimsEntry" element={<ClaimsEntry />} />
          <Route exact path="/leadsEntry" element={<LeadsEntry />} />
          <Route exact path="/claims" element={<Claims />} />
          <Route exact path="/reports" element={<Reports />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/forgot" element={<Forgot />} />
          <Route exact path="/leads" element={<Leads />} />
          <Route exact path="/filesDocs" element={<FilesAndDocuments />} />
          <Route exact path="/renewals" element={<Renewals />} />
          <Route exact path="/settings/adminen" element={<Adminen />} />
          <Route exact path="/settings/listadmin" element={<Listadmin />} />
          <Route exact path="/settings/addcli" element={<Addcli />} />
          <Route exact path="/settings/listcli" element={<Listcli />} />
          <Route exact path="/settings/globalconfig" element={<GlobalConfig />} />
          <Route exact path="/settings/policycon" element={<Policycon />} />
          <Route exact path="/settings/claimscon" element={<ClaimsCon/>} />
          <Route exact path="/settings/claimscontem" element={<ClaimsConfig />} />
          <Route exact path="/settings/leadscon" element={<LeadsCon />} />
          <Route exact path="/settings/renewalscon" element={<RenewalsConfigHandle />} />
          </Routes>

          </ScrollToTop>
          </SessionTimeout>
          </BrowserRouter>
    </div></Context.Provider>
  );
}

export default App;
