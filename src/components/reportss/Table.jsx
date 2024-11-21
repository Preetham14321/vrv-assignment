import React,{useRef,useEffect,useState} from "react";
import axios from "axios";
const Table = ({ mode, xlDatas,loadingData, ids,isSticky='', handleTableIntersection,year, timeFrameOrMonth, startDate, endDate }) => {
  const [xldata, setXldata] = useState([]);

  const name = JSON.parse(localStorage.getItem("namee"));
  const Password = JSON.parse(localStorage.getItem("pwd"));
  const API_ENDPOINT = process.env.REACT_APP_API_URL;
const [isStickyClass, setIsStickyClass] = isSticky

  useEffect(() => {
   false&& axios
      .get(`${API_ENDPOINT}/reports`, {
        auth: {
          username: name,
          password: Password,
        },
        params: {
          mode: mode,
          year: year,
          timeFrameOrMonth: timeFrameOrMonth,
          startDate: startDate,
          endDate: endDate,
        },
      })
      .then((response) => {
        setXldata(response.data);

      });
  }, [API_ENDPOINT, Password, endDate, mode, name, startDate, timeFrameOrMonth, year]);
  let rupee = new Intl.NumberFormat("en-IN", {
    currency: "INR",
  });

  const sdata = xlDatas?xlDatas:[];

  /////////////
  const ins = [
   
    "Cholamandalam MS General Insurance Company Limited",//
    "HDFC Life Insurance Company limited",//
    "Future Generali India Insurance Company Limited",//
    "Go Digit General Insurance Company Limited",//
    "HDFC Ergo General Insurance Company Ltd",//
    "Kotak Mahindra General Insurance Company Limited",//
    "ICICI Lombard General Insurance Company Limited",//
    "Magma HDI General Insurance Company Limited",//
    "Mahindra Insurance Brokers Limited",//
    "National Insurance Company Limited",//
    "The New India Assurance Company Limited",//
    "The Oriental Insurance Company Limited",//
    "Reliance General Insurance Company limited",//
    "Royal Sundaram General Insurance Company Limited",//
    "SBI General Insurance Company Limited",//
    "Shriram General Insurance Company Limited",//
    "Star Health and Allied Insurance Compnay Limited",
    "Tata AIG General Insurance Company Limited",//
    "United India Insurance Company Limited",

  ];
  const chola = []
  const hdfc = [];
  const fgi = []
  const gd = [];
  const hdfcErgo = []
  const kotak = [];
  const icici = [];
  const magma = [];
  const mahindra =[]
  const nic=[]
  const newindia = [];
  const toi = []
  const reliance = [];
  const rs = [];
  const sbi = [];
  const shriram = [];
  const starHealt =[]
  const tata = [];
  const unitedind =[]

  sdata.map((data) => {
    if (data.insurer === "The New India Assurance Company Limited") {
      newindia.push(data);
    } else if (data.insurer === "SBI General Insurance Company Limited") sbi.push(data);
    else if (data.insurer==="Cholamandalam MS General Insurance Company Limited") chola.push(data)
    else if (data.insurer==="Future Generali India Insurance Company Limited") fgi.push(data)
    else if (data.insurer=== "HDFC Ergo General Insurance Company Ltd") hdfcErgo.push(data)
    else if (data.insurer===  "Mahindra Insurance Brokers Limited") mahindra.push(data)
    else if (data.insurer===  "National Insurance Company Limited") nic.push(data)
    else if (data.insurer===   "The Oriental Insurance Company Limited") toi.push(data)
    else if (data.insurer===   "Star Health and Allied Insurance Compnay Limited") starHealt.push(data)
    else if (data.insurer===   "United India Insurance Company Limited"
    ) unitedind.push(data)
    
    else if (data.insurer === "Royal Sundaram General Insurance Company Limited")
      rs.push(data);
    else if (data.insurer === "ICICI Lombard General Insurance Company Limited")
      icici.push(data);
    else if (data.insurer === "HDFC Life Insurance Company limited") hdfc.push(data);
    else if (data.insurer === "Go Digit General Insurance Company Limited")
      gd.push(data);
    else if (data.insurer === "Tata AIG General Insurance Company Limited")
      tata.push(data);
    else if (data.insurer === "Kotak Mahindra General Insurance Company Limited")
      kotak.push(data);
    else if (data.insurer === "Shriram General Insurance Company Limited")
      shriram.push(data);
    else if (data.insurer === "Reliance General Insurance Company limited")
      reliance.push(data);
    else if (data.insurer === "Magma HDI General Insurance Company Limited")
      magma.push(data);
  });
  const ni = {
    Engineering: 0,
    EngineeringPremium: 0,
    Fire: 0,
    Firepre: 0,
    Health: 0,
    Healthpre: 0,
    Liability: 0,
    Liabilitypre: 0,
    Life:0,
    Lifepre:0,
    MarineCargo: 0,
    MarineCargopre: 0,
    MarineHull: 0,
    MarineHullpre: 0,
    Misc: 0,
    MiscPre: 0,
    Motor: 0,
    Motorpre: 0,
    Totalpolicy: 0,
    Totalpre: 0,
  };
  const chl = {
    Engineering: 0,
    EngineeringPremium: 0,
    Fire: 0,
    Firepre: 0,
    Health: 0,
    Healthpre: 0,
    Liability: 0,
    Liabilitypre: 0,
    Life:0,
    Lifepre:0,
    MarineCargo: 0,
    MarineCargopre: 0,
    MarineHull: 0,
    MarineHullpre: 0,
    Misc: 0,
    MiscPre: 0,
    Motor: 0,
    Motorpre: 0,
    Totalpolicy: 0,
    Totalpre: 0,
  };
  const sth = {
    Engineering: 0,
    EngineeringPremium: 0,
    Fire: 0,
    Firepre: 0,
    Health: 0,
    Healthpre: 0,
    Liability: 0,
    Liabilitypre: 0,
    Life:0,
    Lifepre:0,
    MarineCargo: 0,
    MarineCargopre: 0,
    MarineHull: 0,
    MarineHullpre: 0,
    Misc: 0,
    MiscPre: 0,
    Motor: 0,
    Motorpre: 0,
    Totalpolicy: 0,
    Totalpre: 0,
  };
  const uii = {
    Engineering: 0,
    EngineeringPremium: 0,
    Fire: 0,
    Firepre: 0,
    Health: 0,
    Healthpre: 0,
    Liability: 0,
    Liabilitypre: 0,
    Life:0,
    Lifepre:0,
    MarineCargo: 0,
    MarineCargopre: 0,
    MarineHull: 0,
    MarineHullpre: 0,
    Misc: 0,
    MiscPre: 0,
    Motor: 0,
    Motorpre: 0,
    Totalpolicy: 0,
    Totalpre: 0,
  };
  const toic = {
    Engineering: 0,
    EngineeringPremium: 0,
    Fire: 0,
    Firepre: 0,
    Health: 0,
    Healthpre: 0,
    Liability: 0,
    Liabilitypre: 0,
    Life:0,
    Lifepre:0,
    MarineCargo: 0,
    MarineCargopre: 0,
    MarineHull: 0,
    MarineHullpre: 0,
    Misc: 0,
    MiscPre: 0,
    Motor: 0,
    Motorpre: 0,
    Totalpolicy: 0,
    Totalpre: 0,
  };
  const fg = {
    Engineering: 0,
    EngineeringPremium: 0,
    Fire: 0,
    Firepre: 0,
    Health: 0,
    Healthpre: 0,
    Liability: 0,
    Liabilitypre: 0,
    Life:0,
    Lifepre:0,
    MarineCargo: 0,
    MarineCargopre: 0,
    MarineHull: 0,
    MarineHullpre: 0,
    Misc: 0,
    MiscPre: 0,
    Motor: 0,
    Motorpre: 0,
    Totalpolicy: 0,
    Totalpre: 0,
  };
  const mhi = {
    Engineering: 0,
    EngineeringPremium: 0,
    Fire: 0,
    Firepre: 0,
    Health: 0,
    Healthpre: 0,
    Liability: 0,
    Liabilitypre: 0,
    Life:0,
    Lifepre:0,
    MarineCargo: 0,
    MarineCargopre: 0,
    MarineHull: 0,
    MarineHullpre: 0,
    Misc: 0,
    MiscPre: 0,
    Motor: 0,
    Motorpre: 0,
    Totalpolicy: 0,
    Totalpre: 0,
  };
  const nicl = {
    Engineering: 0,
    EngineeringPremium: 0,
    Fire: 0,
    Firepre: 0,
    Health: 0,
    Healthpre: 0,
    Liability: 0,
    Liabilitypre: 0,
    Life:0,
    Lifepre:0,
    MarineCargo: 0,
    MarineCargopre: 0,
    MarineHull: 0,
    MarineHullpre: 0,
    Misc: 0,
    MiscPre: 0,
    Motor: 0,
    Motorpre: 0,
    Totalpolicy: 0,
    Totalpre: 0,
  };
  const hdfer = {
    Engineering: 0,
    EngineeringPremium: 0,
    Fire: 0,
    Firepre: 0,
    Health: 0,
    Healthpre: 0,
    Liability: 0,
    Liabilitypre: 0,
    Life:0,
    Lifepre:0,
    MarineCargo: 0,
    MarineCargopre: 0,
    MarineHull: 0,
    MarineHullpre: 0,
    Misc: 0,
    MiscPre: 0,
    Motor: 0,
    Motorpre: 0,
    Totalpolicy: 0,
    Totalpre: 0,
  };
  const mgm = {
    Engineering: 0,
    EngineeringPremium: 0,
    Fire: 0,
    Firepre: 0,
    Health: 0,
    Healthpre: 0,
    Liability: 0,
    Liabilitypre: 0,
    Life:0,
    Lifepre:0,
    MarineCargo: 0,
    MarineCargopre: 0,
    MarineHull: 0,
    MarineHullpre: 0,
    Misc: 0,
    MiscPre: 0,
    Motor: 0,
    Motorpre: 0,
    Totalpolicy: 0,
    Totalpre: 0,
  };
  const sb = {
    Engineering: 0,
    EngineeringPremium: 0,
    Fire: 0,
    Firepre: 0,
    Health: 0,
    Healthpre: 0,
    Liability: 0,
    Liabilitypre: 0,
    Life:0,
    Lifepre:0,
    MarineCargo: 0,
    MarineCargopre: 0,
    MarineHull: 0,
    MarineHullpre: 0,
    Misc: 0,
    MiscPre: 0,
    Motor: 0,
    Motorpre: 0,
    Totalpolicy: 0,
    Totalpre: 0,
  };
  const rsg = {
    Engineering: 0,
    EngineeringPremium: 0,
    Fire: 0,
    Firepre: 0,
    Health: 0,
    Healthpre: 0,
    Liability: 0,
    Liabilitypre: 0,
    Life:0,
    Lifepre:0,
    MarineCargo: 0,
    MarineCargopre: 0,
    MarineHull: 0,
    MarineHullpre: 0,
    Misc: 0,
    MiscPre: 0,
    Motor: 0,
    Motorpre: 0,
    Totalpolicy: 0,
    Totalpre: 0,
  };
  const icic = {
    Engineering: 0,
    EngineeringPremium: 0,
    Fire: 0,
    Firepre: 0,
    Health: 0,
    Healthpre: 0,
    Liability: 0,
    Liabilitypre: 0,
    Life:0,
    Lifepre:0,
    MarineCargo: 0,
    MarineCargopre: 0,
    MarineHull: 0,
    MarineHullpre: 0,
    Misc: 0,
    MiscPre: 0,
    Motor: 0,
    Motorpre: 0,
    Totalpolicy: 0,
    Totalpre: 0,
  };
  const hdfcli = {
    Engineering: 0,
    EngineeringPremium: 0,
    Fire: 0,
    Firepre: 0,
    Health: 0,
    Healthpre: 0,
    Liability: 0,
    Liabilitypre: 0,
    Life:0,
    Lifepre:0,
    MarineCargo: 0,
    MarineCargopre: 0,
    MarineHull: 0,
    MarineHullpre: 0,
    Misc: 0,
    MiscPre: 0,
    Motor: 0,
    Motorpre: 0,
    Totalpolicy: 0,
    Totalpre: 0,
  };
  const gdg = {
    Engineering: 0,
    EngineeringPremium: 0,
    Fire: 0,
    Firepre: 0,
    Health: 0,
    Healthpre: 0,
    Liability: 0,
    Liabilitypre: 0,
    Life:0,
    Lifepre:0,
    MarineCargo: 0,
    MarineCargopre: 0,
    MarineHull: 0,
    MarineHullpre: 0,
    Misc: 0,
    MiscPre: 0,
    Motor: 0,
    Motorpre: 0,
    Totalpolicy: 0,
    Totalpre: 0,
  };
  const tataagi = {
    Engineering: 0,
    EngineeringPremium: 0,
    Fire: 0,
    Firepre: 0,
    Health: 0,
    Healthpre: 0,
    Liability: 0,
    Liabilitypre: 0,
    Life:0,
    Lifepre:0,
    MarineCargo: 0,
    MarineCargopre: 0,
    MarineHull: 0,
    MarineHullpre: 0,
    Misc: 0,
    MiscPre: 0,
    Motor: 0,
    Motorpre: 0,
    Totalpolicy: 0,
    Totalpre: 0,
  };
  const kmg = {
    Engineering: 0,
    EngineeringPremium: 0,
    Fire: 0,
    Firepre: 0,
    Health: 0,
    Healthpre: 0,
    Liability: 0,
    Liabilitypre: 0,
    Life:0,
    Lifepre:0,
    MarineCargo: 0,
    MarineCargopre: 0,
    MarineHull: 0,
    MarineHullpre: 0,
    Misc: 0,
    MiscPre: 0,
    Motor: 0,
    Motorpre: 0,
    Totalpolicy: 0,
    Totalpre: 0,
  };
  const shri = {
    Engineering: 0,
    EngineeringPremium: 0,
    Fire: 0,
    Firepre: 0,
    Health: 0,
    Healthpre: 0,
    Liability: 0,
    Liabilitypre: 0,
    Life:0,
    Lifepre:0,
    MarineCargo: 0,
    MarineCargopre: 0,
    MarineHull: 0,
    MarineHullpre: 0,
    Misc: 0,
    MiscPre: 0,
    Motor: 0,
    Motorpre: 0,
    Totalpolicy: 0,
    Totalpre: 0,
  };
  const reli = {
    Engineering: 0,
    EngineeringPremium: 0,
    Fire: 0,
    Firepre: 0,
    Health: 0,
    Healthpre: 0,
    Liability: 0,
    Liabilitypre: 0,
    Life:0,
    Lifepre:0,
    MarineCargo: 0,
    MarineCargopre: 0,
    MarineHull: 0,
    MarineHullpre: 0,
    Misc: 0,
    MiscPre: 0,
    Motor: 0,
    Motorpre: 0,
    Totalpolicy: 0,
    Totalpre: 0,
  };
  newindia.map((data) => {
    if (data.lineOfBusiness.toLowerCase().includes("fire")) {
      ni.Fire = data.numberOfPolicies;
      ni.Firepre = data.totalPremium;
    }
    if (data.lineOfBusiness.toLowerCase().includes('health')) {
      ni.Health = data.numberOfPolicies;
      ni.Healthpre = data.totalPremium;
    }
    if (data.lineOfBusiness.toLowerCase().includes("cargo")) {
      ni.MarineCargo = data.numberOfPolicies;
      ni.MarineCargopre = data.totalPremium;
    }
    if (data.lineOfBusiness.toLowerCase().includes("motor")) {
      ni.Motor = data.numberOfPolicies;
      ni.Motorpre = data.totalPremium;
    }
    if (data.lineOfBusiness.toLowerCase().includes("engineering")) {
      ni.Engineering = data.numberOfPolicies;
      ni.EngineeringPremium = data.totalPremium;
    }
    if (data.lineOfBusiness.toLowerCase().includes('liability')) {
      ni.Liability = data.numberOfPolicies;
      ni.Liabilitypre = data.totalPremium;
    }
    if (data.lineOfBusiness.toLowerCase().includes("hull")) {
      ni.MarineHull = data.numberOfPolicies;
      ni.MarineHullpre = data.totalPremium;
    }
    if (data.lineOfBusiness.toLowerCase().includes('miscellaneous')) {
      ni.Misc = data.numberOfPolicies;
      ni.MiscPre = data.totalPremium;
    }
    if (data.lineOfBusiness.toLowerCase().includes('life')) {
      ni.Life = data.numberOfPolicies;
      ni.Lifepre = data.totalPremium;
       
    }
  });
  chola.map((data) => {
    if (data.lineOfBusiness.toLowerCase().includes("fire")) {
      chl.Fire = data.numberOfPolicies;
      chl.Firepre = data.totalPremium;
    }
    if (data.lineOfBusiness.toLowerCase().includes('health') ) {
      chl.Health = data.numberOfPolicies;
      chl.Healthpre = data.totalPremium;
    }
    if (data.lineOfBusiness.toLowerCase().includes("cargo")) {
      chl.MarineCargo = data.numberOfPolicies;
      chl.MarineCargopre = data.totalPremium;
    }
    if (data.lineOfBusiness.toLowerCase().includes('motor')) {
      chl.Motor = data.numberOfPolicies;
      chl.Motorpre = data.totalPremium;
    }
    if (data.lineOfBusiness.toLowerCase().includes("engineering")) {
      chl.Engineering = data.numberOfPolicies;
      chl.EngineeringPremium = data.totalPremium;
    }
    if (data.lineOfBusiness.toLowerCase().includes('liability')) {
      chl.Liability = data.numberOfPolicies;
      chl.Liabilitypre = data.totalPremium;
    }
    if (data.lineOfBusiness.toLowerCase().includes("hull")) {
      chl.MarineHull = data.numberOfPolicies;
      chl.MarineHullpre = data.totalPremium;
    }
    if (data.lineOfBusiness.toLowerCase().includes('miscellaneous')) {
      chl.Misc = data.numberOfPolicies;
      chl.MiscPre = data.totalPremium;
    }
    if (data.lineOfBusiness.toLowerCase().includes('life')) {
      chl.Life = data.numberOfPolicies;
      chl.Lifepre = data.totalPremium;
    }
  });
  starHealt.map((data) => {
    if (data.lineOfBusiness.toLowerCase().includes("fire")) {
      sth.Fire = data.numberOfPolicies;
      sth.Firepre = data.totalPremium;
    }
    if (data.lineOfBusiness.toLowerCase().includes('health')) {
      sth.Health = data.numberOfPolicies;
      sth.Healthpre = data.totalPremium;
    }
    if (data.lineOfBusiness.toLowerCase().includes("cargo")) {
      sth.MarineCargo = data.numberOfPolicies;
      sth.MarineCargopre = data.totalPremium;
    }
    if (data.lineOfBusiness.toLowerCase().includes('motor')) {
      sth.Motor = data.numberOfPolicies;
      sth.Motorpre = data.totalPremium;
    }
    if (data.lineOfBusiness.toLowerCase().includes("engineering")) {
      sth.Engineering = data.numberOfPolicies;
      sth.EngineeringPremium = data.totalPremium;
    }
    if (data.lineOfBusiness.toLowerCase().includes('liability')) {
      sth.Liability = data.numberOfPolicies;
      sth.Liabilitypre = data.totalPremium;
    }
    
    if (data.lineOfBusiness.toLowerCase().includes("hull")) {
      sth.MarineHull = data.numberOfPolicies;
      sth.MarineHullpre = data.totalPremium;
    }
    if (data.lineOfBusiness.toLowerCase().includes('miscellaneous')) {
      sth.Misc = data.numberOfPolicies;
      sth.MiscPre = data.totalPremium;
    }
    if (data.lineOfBusiness.toLowerCase().includes('life')) {
      sth.Life = data.numberOfPolicies;
      sth.Lifepre = data.totalPremium;
    }
  });
  unitedind.map((data) => {
    if (data.lineOfBusiness.toLowerCase().includes("fire")) {
      uii.Fire = data.numberOfPolicies;
      uii.Firepre = data.totalPremium;
    }
    if (data.lineOfBusiness.toLowerCase().includes('health')) {
      uii.Health = data.numberOfPolicies;
      uii.Healthpre = data.totalPremium;
    }
    if (data.lineOfBusiness.toLowerCase().includes("cargo")) {
      uii.MarineCargo = data.numberOfPolicies;
      uii.MarineCargopre = data.totalPremium;
    }
    if (data.lineOfBusiness.toLowerCase().includes('motor')) {
      uii.Motor = data.numberOfPolicies;
      uii.Motorpre = data.totalPremium;
    }
    if (data.lineOfBusiness.toLowerCase().includes("engineering")) {
      uii.Engineering = data.numberOfPolicies;
      uii.EngineeringPremium = data.totalPremium;
    }
    if (data.lineOfBusiness.toLowerCase().includes('liability')) {
      uii.Liability = data.numberOfPolicies;
      uii.Liabilitypre = data.totalPremium;
    }
    if (data.lineOfBusiness.toLowerCase().includes("hull")) {
      uii.MarineHull = data.numberOfPolicies;
      uii.MarineHullpre = data.totalPremium;
    }
    if (data.lineOfBusiness.toLowerCase().includes('miscellaneous')) {
      uii.Misc = data.numberOfPolicies;
      uii.MiscPre = data.totalPremium;
    }
    if (data.lineOfBusiness.toLowerCase().includes('life')) {
      uii.Life = data.numberOfPolicies;
      uii.Lifepre = data.totalPremium;
    }
  });
  toi.map((data) => {
    if (data.lineOfBusiness.toLowerCase().includes("fire")) {
      toic.Fire = data.numberOfPolicies;
      toic.Firepre = data.totalPremium;
    }
    if (data.lineOfBusiness.toLowerCase().includes('health')) {
      toic.Health = data.numberOfPolicies;
      toic.Healthpre = data.totalPremium;
    }
    if (data.lineOfBusiness.toLowerCase().includes("cargo")) {
      toic.MarineCargo = data.numberOfPolicies;
      toic.MarineCargopre = data.totalPremium;
    }
    if (data.lineOfBusiness.toLowerCase().includes('motor')) {
      toic.Motor = data.numberOfPolicies;
      toic.Motorpre = data.totalPremium;
    }
    if (data.lineOfBusiness.toLowerCase().includes("engineering")) {
      toic.Engineering = data.numberOfPolicies;
      toic.EngineeringPremium = data.totalPremium;
    }
    if (data.lineOfBusiness.toLowerCase().includes('liability')) {
      toic.Liability = data.numberOfPolicies;
      toic.Liabilitypre = data.totalPremium;
    }
    if (data.lineOfBusiness.toLowerCase().includes("hull")) {
      toic.MarineHull = data.numberOfPolicies;
      toic.MarineHullpre = data.totalPremium;
    }
    if (data.lineOfBusiness.toLowerCase().includes('miscellaneous')) {
      toic.Misc = data.numberOfPolicies;
      toic.MiscPre = data.totalPremium;
    }
    if (data.lineOfBusiness.toLowerCase().includes('life')) {
      toic.Life = data.numberOfPolicies;
      toic.Lifepre = data.totalPremium;
    }
  });
  fgi.map((data) => {
    if (data.lineOfBusiness.toLowerCase().includes("fire")) {
      fg.Fire = data.numberOfPolicies;
      fg.Firepre = data.totalPremium;
    }
    if (data.lineOfBusiness.toLowerCase().includes('health')) {
      fg.Health = data.numberOfPolicies;
      fg.Healthpre = data.totalPremium;
    }
    if (data.lineOfBusiness.toLowerCase().includes("cargo")) {
      fg.MarineCargo = data.numberOfPolicies;
      fg.MarineCargopre = data.totalPremium;
    }
    if (data.lineOfBusiness.toLowerCase().includes('motor')) {
      fg.Motor = data.numberOfPolicies;
      fg.Motorpre = data.totalPremium;
    }
    if (data.lineOfBusiness.toLowerCase().includes("engineering")) {
      fg.Engineering = data.numberOfPolicies;
      fg.EngineeringPremium = data.totalPremium;
    }
    if (data.lineOfBusiness.toLowerCase().includes('liability')) {
      fg.Liability = data.numberOfPolicies;
      fg.Liabilitypre = data.totalPremium;
    }
    if (data.lineOfBusiness.toLowerCase().includes("hull")) {
      fg.MarineHull = data.numberOfPolicies;
      fg.MarineHullpre = data.totalPremium;
    }
    if (data.lineOfBusiness.toLowerCase().includes('miscellaneous')) {
      fg.Misc = data.numberOfPolicies;
      fg.MiscPre = data.totalPremium;
    }
    if (data.lineOfBusiness.toLowerCase().includes('life')) {
      fg.Life = data.numberOfPolicies;
      fg.Lifepre = data.totalPremium;
    }
  });
  mahindra.map((data) => {
    if (data.lineOfBusiness.toLowerCase().includes("fire")) {
      mhi.Fire = data.numberOfPolicies;
      mhi.Firepre = data.totalPremium;
    }
    if (data.lineOfBusiness.toLowerCase().includes('health')) {
      mhi.Health = data.numberOfPolicies;
      mhi.Healthpre = data.totalPremium;
    }
    if (data.lineOfBusiness.toLowerCase().includes("cargo")) {
      mhi.MarineCargo = data.numberOfPolicies;
      mhi.MarineCargopre = data.totalPremium;
    }
    if (data.lineOfBusiness.toLowerCase().includes('motor')) {
      mhi.Motor = data.numberOfPolicies;
      mhi.Motorpre = data.totalPremium;
    }
    if (data.lineOfBusiness.toLowerCase().includes("engineering")) {
      mhi.Engineering = data.numberOfPolicies;
      mhi.EngineeringPremium = data.totalPremium;
    }
    if (data.lineOfBusiness.toLowerCase().includes('liability')) {
      mhi.Liability = data.numberOfPolicies;
      mhi.Liabilitypre = data.totalPremium;
    }
    if (data.lineOfBusiness.toLowerCase().includes("hull")) {
      mhi.MarineHull = data.numberOfPolicies;
      mhi.MarineHullpre = data.totalPremium;
    }
    if (data.lineOfBusiness.toLowerCase().includes('miscellaneous')) {
      mhi.Misc = data.numberOfPolicies;
      mhi.MiscPre = data.totalPremium;
    }
    if (data.lineOfBusiness.toLowerCase().includes('life')) {
      mhi.Life = data.numberOfPolicies;
      mhi.Lifepre = data.totalPremium;
    }
  });
  nic.map((data) => {
    if (data.lineOfBusiness.toLowerCase().includes("fire")) {
      nicl.Fire = data.numberOfPolicies;
      nicl.Firepre = data.totalPremium;
    }
    if (data.lineOfBusiness.toLowerCase().includes('health')) {
      nicl.Health = data.numberOfPolicies;
      nicl.Healthpre = data.totalPremium;
    }
    if (data.lineOfBusiness.toLowerCase().includes("cargo")) {
      nicl.MarineCargo = data.numberOfPolicies;
      nicl.MarineCargopre = data.totalPremium;
    }
    if (data.lineOfBusiness.toLowerCase().includes('motor')) {
      nicl.Motor = data.numberOfPolicies;
      nicl.Motorpre = data.totalPremium;
    }
    if (data.lineOfBusiness.toLowerCase().includes("engineering")) {
      nicl.Engineering = data.numberOfPolicies;
      nicl.EngineeringPremium = data.totalPremium;
    }
    if (data.lineOfBusiness.toLowerCase().includes('liability')) {
      nicl.Liability = data.numberOfPolicies;
      nicl.Liabilitypre = data.totalPremium;
    }
    if (data.lineOfBusiness.toLowerCase().includes("hull")) {
      nicl.MarineHull = data.numberOfPolicies;
      nicl.MarineHullpre = data.totalPremium;
    }
    if (data.lineOfBusiness.toLowerCase().includes('miscellaneous')) {
      nicl.Misc = data.numberOfPolicies;
      nicl.MiscPre = data.totalPremium;
    }
    if (data.lineOfBusiness.toLowerCase().includes('life')) {
      nicl.Life = data.numberOfPolicies;
      nicl.Lifepre = data.totalPremium;
    }
  });
  hdfcErgo.map((data) => {
    if (data.lineOfBusiness.toLowerCase().includes("fire")) {
      hdfer.Fire = data.numberOfPolicies;
      hdfer.Firepre = data.totalPremium;
    }
    if (data.lineOfBusiness.toLowerCase().includes('health')) {
      hdfer.Health = data.numberOfPolicies;
      hdfer.Healthpre = data.totalPremium;
    }
    if (data.lineOfBusiness.toLowerCase().includes("cargo")) {
      hdfer.MarineCargo = data.numberOfPolicies;
      hdfer.MarineCargopre = data.totalPremium;
    }
    if (data.lineOfBusiness.toLowerCase().includes('motor')) {
      hdfer.Motor = data.numberOfPolicies;
      hdfer.Motorpre = data.totalPremium;
    }
    if (data.lineOfBusiness.toLowerCase().includes("engineering")) {
      hdfer.Engineering = data.numberOfPolicies;
      hdfer.EngineeringPremium = data.totalPremium;
    }
    if (data.lineOfBusiness.toLowerCase().includes('liability')) {
      hdfer.Liability = data.numberOfPolicies;
      hdfer.Liabilitypre = data.totalPremium;
    }
    if (data.lineOfBusiness.toLowerCase().includes("hull")) {
      hdfer.MarineHull = data.numberOfPolicies;
      hdfer.MarineHullpre = data.totalPremium;
    }
    if (data.lineOfBusiness.toLowerCase().includes('miscellaneous')) {
      hdfer.Misc = data.numberOfPolicies;
      hdfer.MiscPre = data.totalPremium;
    }
    if (data.lineOfBusiness.toLowerCase().includes('life')) {
      hdfer.Life = data.numberOfPolicies;
      hdfer.Lifepre = data.totalPremium;
    }
  });
  //////////////////////////////////////////////////////
  sbi.map((data) => {
    if (data.lineOfBusiness.toLowerCase().includes("fire")) {
      sb.Fire = data.numberOfPolicies;
      sb.Firepre = data.totalPremium;
    }
    if (data.lineOfBusiness.toLowerCase().includes('health')) {
      sb.Health = data.numberOfPolicies;
      sb.Healthpre = data.totalPremium;
    }
    if (data.lineOfBusiness.toLowerCase().includes("cargo")) {
      sb.MarineCargo = data.numberOfPolicies;
      sb.MarineCargopre = data.totalPremium;
    }
    if (data.lineOfBusiness.toLowerCase().includes('motor')) {
      sb.Motor = data.numberOfPolicies;
      sb.Motorpre = data.totalPremium;
    }
    if (data.lineOfBusiness.toLowerCase().includes("engineering")) {
      sb.Engineering = data.numberOfPolicies;
      sb.EngineeringPremium = data.totalPremium;
    }
    if (data.lineOfBusiness.toLowerCase().includes('liability')) {
      sb.Liability = data.numberOfPolicies;
      sb.Liabilitypre = data.totalPremium;
    }
    if (data.lineOfBusiness.toLowerCase().includes("hull")) {
      sb.MarineHull = data.numberOfPolicies;
      sb.MarineHullpre = data.totalPremium;
    }
    if (data.lineOfBusiness.toLowerCase().includes('miscellaneous')) {
      sb.Misc = data.numberOfPolicies;
      sb.MiscPre = data.totalPremium;
    }
    if (data.lineOfBusiness.toLowerCase().includes('life')) {
      sb.Life = data.numberOfPolicies;
      sb.Lifepre = data.totalPremium;
    }
  });
  rs.map((data) => {
    if (data.lineOfBusiness.toLowerCase().includes("fire")) {
      rsg.Fire = data.numberOfPolicies;
      rsg.Firepre = data.totalPremium;
    }
    if (data.lineOfBusiness.toLowerCase().includes('health')) {
      rsg.Health = data.numberOfPolicies;
      rsg.Healthpre = data.totalPremium;
    }
    if (data.lineOfBusiness.toLowerCase().includes("cargo")) {
      rsg.MarineCargo = data.numberOfPolicies;
      rsg.MarineCargopre = data.totalPremium;
    }
    if (data.lineOfBusiness.toLowerCase().includes('motor')) {
      rsg.Motor = data.numberOfPolicies;
      rsg.Motorpre = data.totalPremium;
    }
    if (data.lineOfBusiness.toLowerCase().includes("engineering")) {
      rsg.Engineering = data.numberOfPolicies;
      rsg.EngineeringPremium = data.totalPremium;
    }
    if (data.lineOfBusiness.toLowerCase().includes('liability')) {
      rsg.Liability = data.numberOfPolicies;
      rsg.Liabilitypre = data.totalPremium;
    }
    if (data.lineOfBusiness.toLowerCase().includes("hull")) {
      rsg.MarineHull = data.numberOfPolicies;
      rsg.MarineHullpre = data.totalPremium;
    }
    if (data.lineOfBusiness.toLowerCase().includes('miscellaneous')) {
      rsg.Misc = data.numberOfPolicies;
      rsg.MiscPre = data.totalPremium;
    }
    if (data.lineOfBusiness.toLowerCase().includes('life')) {
      rsg.Life = data.numberOfPolicies;
      rsg.Lifepre = data.totalPremium;
    }
  });
  icici.map((data) => {
    if (data.lineOfBusiness.toLowerCase().includes("fire")) {
      icic.Fire = data.numberOfPolicies;
      icic.Firepre = data.totalPremium;
    }
    if (data.lineOfBusiness.toLowerCase().includes('health')) {
      icic.Health = data.numberOfPolicies;
      icic.Healthpre = data.totalPremium;
    }
    if (data.lineOfBusiness.toLowerCase().includes("cargo")) {
      icic.MarineCargo = data.numberOfPolicies;
      icic.MarineCargopre = data.totalPremium;
    }
    if (data.lineOfBusiness.toLowerCase().includes('motor')) {
      icic.Motor = data.numberOfPolicies;
      icic.Motorpre = data.totalPremium;
    }
    if (data.lineOfBusiness.toLowerCase().includes("engineering")) {
      icic.Engineering = data.numberOfPolicies;
      icic.EngineeringPremium = data.totalPremium;
    }
    if (data.lineOfBusiness.toLowerCase().includes('liability')) {
      icic.Liability = data.numberOfPolicies;
      icic.Liabilitypre = data.totalPremium;
    }
    if (data.lineOfBusiness.toLowerCase().includes("hull")) {
      icic.MarineHull = data.numberOfPolicies;
      icic.MarineHullpre = data.totalPremium;
    }
    if (data.lineOfBusiness.toLowerCase().includes('miscellaneous')) {
      icic.Misc = data.numberOfPolicies;
      icic.MiscPre = data.totalPremium;
    }
    if (data.lineOfBusiness.toLowerCase().includes('life')) {
      icic.Life = data.numberOfPolicies;
      icic.Lifepre = data.totalPremium;
    }
  });
  hdfc.map((data) => {
    if (data.lineOfBusiness.toLowerCase().includes("fire")) {
      hdfcli.Fire = data.numberOfPolicies;
      hdfcli.Firepre = data.totalPremium;
    }
    if (data.lineOfBusiness.toLowerCase().includes('health')) {
      hdfcli.Health = data.numberOfPolicies;
      hdfcli.Healthpre = data.totalPremium;
    }
    if (data.lineOfBusiness.toLowerCase().includes("cargo")) {
      hdfcli.MarineCargo = data.numberOfPolicies;
      hdfcli.MarineCargopre = data.totalPremium;
    }
    if (data.lineOfBusiness.toLowerCase().includes('motor')) {
      hdfcli.Motor = data.numberOfPolicies;
      hdfcli.Motorpre = data.totalPremium;
    }
    if (data.lineOfBusiness.toLowerCase().includes("engineering")) {
      hdfcli.Engineering = data.numberOfPolicies;
      hdfcli.EngineeringPremium = data.totalPremium;
    }
    if (data.lineOfBusiness.toLowerCase().includes('liability')) {
      hdfcli.Liability = data.numberOfPolicies;
      hdfcli.Liabilitypre = data.totalPremium;
    }
    if (data.lineOfBusiness.toLowerCase().includes("hull")) {
      hdfcli.MarineHull = data.numberOfPolicies;
      hdfcli.MarineHullpre = data.totalPremium;
    }
    if (data.lineOfBusiness.toLowerCase().includes('miscellaneous')) {
      hdfcli.Misc = data.numberOfPolicies;
      hdfcli.MiscPre = data.totalPremium;
    }
    if (data.lineOfBusiness.toLowerCase().includes('life')) {
      hdfcli.Life = data.numberOfPolicies;
      hdfcli.Lifepre = data.totalPremium;
    }
  });
  gd.map((data) => {
  

    if (data.lineOfBusiness.toLowerCase().includes("fire")) {
      gdg.Fire = data.numberOfPolicies;
      gdg.Firepre = data.totalPremium;
    }
    if (data.lineOfBusiness.toLowerCase().includes('health')) {
      gdg.Health = data.numberOfPolicies;
      gdg.Healthpre = data.totalPremium;
    }
    if (data.lineOfBusiness.toLowerCase().includes("cargo")) {
      gdg.MarineCargo = data.numberOfPolicies;
      gdg.MarineCargopre = data.totalPremium;
    }
    if (data.lineOfBusiness.toLowerCase().includes('motor')) {
      gdg.Motor = data.numberOfPolicies;
      gdg.Motorpre = data.totalPremium;
    }
    if (data.lineOfBusiness.toLowerCase().includes("engineering")) {
      gdg.Engineering = data.numberOfPolicies;
      gdg.EngineeringPremium = data.totalPremium;
    }
    if (data.lineOfBusiness.toLowerCase().includes('liability')) {
      gdg.Liability = data.numberOfPolicies;
      gdg.Liabilitypre = data.totalPremium;
    }
    if (data.lineOfBusiness.toLowerCase().includes("hull")) {
      gdg.MarineHull = data.numberOfPolicies;
      gdg.MarineHullpre = data.totalPremium;
    }
    if (data.lineOfBusiness.toLowerCase().includes('miscellaneous')) {
      gdg.Misc = data.numberOfPolicies;
      gdg.MiscPre = data.totalPremium;
    }
    if (data.lineOfBusiness.toLowerCase().includes('life')) {
      gdg.Life = data.numberOfPolicies;
      gdg.Lifepre = data.totalPremium;
    }
  });
  tata.map((data) => {
    if (data.lineOfBusiness.toLowerCase().includes("fire")) {
      tataagi.Fire = data.numberOfPolicies;
      tataagi.Firepre = data.totalPremium;
    }
    if (data.lineOfBusiness.toLowerCase().includes('health')) {
      tataagi.Health = data.numberOfPolicies;
      tataagi.Healthpre = data.totalPremium;
    }
    if (data.lineOfBusiness.toLowerCase().includes("cargo")) {
      tataagi.MarineCargo = data.numberOfPolicies;
      tataagi.MarineCargopre = data.totalPremium;
    }
    if (data.lineOfBusiness.toLowerCase().includes('motor')) {
      tataagi.Motor = data.numberOfPolicies;
      tataagi.Motorpre = data.totalPremium;
    }
    if (data.lineOfBusiness.toLowerCase().includes("engineering")) {
      tataagi.Engineering = data.numberOfPolicies;
      tataagi.EngineeringPremium = data.totalPremium;
    }
    if (data.lineOfBusiness.toLowerCase().includes('liability')) {
      tataagi.Liability = data.numberOfPolicies;
      tataagi.Liabilitypre = data.totalPremium;
    }
    if (data.lineOfBusiness.toLowerCase().includes("hull")) {
      tataagi.MarineHull = data.numberOfPolicies;
      tataagi.MarineHullpre = data.totalPremium;
    }
    if (data.lineOfBusiness.toLowerCase().includes('miscellaneous')) {
      tataagi.Misc = data.numberOfPolicies;
      tataagi.MiscPre = data.totalPremium;
    }
    if (data.lineOfBusiness.toLowerCase().includes('life')) {
      tataagi.Life = data.numberOfPolicies;
      tataagi.Lifepre = data.totalPremium;
    }
  });
  kotak.map((data) => {
    if (data.lineOfBusiness.toLowerCase().includes("fire")) {
      kmg.Fire = data.numberOfPolicies;
      kmg.Firepre = data.totalPremium;
    }
    if (data.lineOfBusiness.toLowerCase().includes('health')) {
      kmg.Health = data.numberOfPolicies;
      kmg.Healthpre = data.totalPremium;
    }
    if (data.lineOfBusiness.toLowerCase().includes("cargo")) {
      kmg.MarineCargo = data.numberOfPolicies;
      kmg.MarineCargopre = data.totalPremium;
    }
    if (data.lineOfBusiness.toLowerCase().includes('motor')) {
      kmg.Motor = data.numberOfPolicies;
      kmg.Motorpre = data.totalPremium;
    }
    if (data.lineOfBusiness.toLowerCase().includes("engineering")) {
      kmg.Engineering = data.numberOfPolicies;
      kmg.EngineeringPremium = data.totalPremium;
    }
    if (data.lineOfBusiness.toLowerCase().includes('liability')) {
      kmg.Liability = data.numberOfPolicies;
      kmg.Liabilitypre = data.totalPremium;
    }
    if (data.lineOfBusiness.toLowerCase().includes("hull")) {
      kmg.MarineHull = data.numberOfPolicies;
      kmg.MarineHullpre = data.totalPremium;
    }
    if (data.lineOfBusiness.toLowerCase().includes('miscellaneous')) {
      kmg.Misc = data.numberOfPolicies;
      kmg.MiscPre = data.totalPremium;
    }
    if (data.lineOfBusiness.toLowerCase().includes('life')) {
      kmg.Life = data.numberOfPolicies;
      kmg.Lifepre = data.totalPremium;
    }
  });
  shriram.map((data) => {
    if (data.lineOfBusiness.toLowerCase().includes("fire")) {
      shri.Fire = data.numberOfPolicies;
      shri.Firepre = data.totalPremium;
    }
    if (data.lineOfBusiness.toLowerCase().includes('health')) {
      shri.Health = data.numberOfPolicies;
      shri.Healthpre = data.totalPremium;
    }
    if (data.lineOfBusiness.toLowerCase().includes("cargo")) {
      shri.MarineCargo = data.numberOfPolicies;
      shri.MarineCargopre = data.totalPremium;
    }
    if (data.lineOfBusiness.toLowerCase().includes('motor')) {
      shri.Motor = data.numberOfPolicies;
      shri.Motorpre = data.totalPremium;
    }
    if (data.lineOfBusiness.toLowerCase().includes("engineering")) {
      shri.Engineering = data.numberOfPolicies;
      shri.EngineeringPremium = data.totalPremium;
    }
    if (data.lineOfBusiness.toLowerCase().includes('liability')) {
      shri.Liability = data.numberOfPolicies;
      shri.Liabilitypre = data.totalPremium;
    }
    if (data.lineOfBusiness.toLowerCase().includes("hull")) {
      shri.MarineHull = data.numberOfPolicies;
      shri.MarineHullpre = data.totalPremium;
    }
    if (data.lineOfBusiness.toLowerCase().includes('miscellaneous')) {
      shri.Misc = data.numberOfPolicies;
      shri.MiscPre = data.totalPremium;
    }
    if (data.lineOfBusiness.toLowerCase().includes('life')) {
      shri.Life = data.numberOfPolicies;
      shri.Lifepre = data.totalPremium;
    }
  });
  magma.map((data) => {
    if (data.lineOfBusiness.toLowerCase().includes("fire")) {
      mgm.Fire = data.numberOfPolicies;
      mgm.Firepre = data.totalPremium;
    }
    if (data.lineOfBusiness.toLowerCase().includes('health')) {
      mgm.Health = data.numberOfPolicies;
      mgm.Healthpre = data.totalPremium;
    }
    if (data.lineOfBusiness.toLowerCase().includes("cargo")) {
      mgm.MarineCargo = data.numberOfPolicies;
      mgm.MarineCargopre = data.totalPremium;
    }
    if (data.lineOfBusiness.toLowerCase().includes('motor')) {
      mgm.Motor = data.numberOfPolicies;
      mgm.Motorpre = data.totalPremium;
    }
    if (data.lineOfBusiness.toLowerCase().includes("engineering")) {
      mgm.Engineering = data.numberOfPolicies;
      mgm.EngineeringPremium = data.totalPremium;
    }
    if (data.lineOfBusiness.toLowerCase().includes('liability')) {
      mgm.Liability = data.numberOfPolicies;
      mgm.Liabilitypre = data.totalPremium;
    }
    if (data.lineOfBusiness.toLowerCase().includes("hull")) {
      mgm.MarineHull = data.numberOfPolicies;
      mgm.MarineHullpre = data.totalPremium;
    }
    if (data.lineOfBusiness.toLowerCase().includes('miscellaneous')) {
      mgm.Misc = data.numberOfPolicies;
      mgm.MiscPre = data.totalPremium;
    }
    if (data.lineOfBusiness.toLowerCase().includes('life')) {
      mgm.Life = data.numberOfPolicies;
      mgm.Lifepre = data.totalPremium;
    }
  });
  reliance.map((data) => {
    if (data.lineOfBusiness.toLowerCase().includes("fire")) {
      reli.Fire = data.numberOfPolicies;
      reli.Firepre = data.totalPremium;
    }
    if (data.lineOfBusiness.toLowerCase().includes('health')) {
      reli.Health = data.numberOfPolicies;
      reli.Healthpre = data.totalPremium;
    }
    if (data.lineOfBusiness.toLowerCase().includes("cargo")) {
      reli.MarineCargo = data.numberOfPolicies;
      reli.MarineCargopre = data.totalPremium;
    }
    if (data.lineOfBusiness.toLowerCase().includes('motor')) {
      reli.Motor = data.numberOfPolicies;
      reli.Motorpre = data.totalPremium;
    }
    if (data.lineOfBusiness.toLowerCase().includes("engineering")) {
      reli.Engineering = data.numberOfPolicies;
      reli.EngineeringPremium = data.totalPremium;
    }
    if (data.lineOfBusiness.toLowerCase().includes('liability')) {
      reli.Liability = data.numberOfPolicies;
      reli.Liabilitypre = data.totalPremium;
    }
    if (data.lineOfBusiness.toLowerCase().includes("hull")) {
      reli.MarineHull = data.numberOfPolicies;
      reli.MarineHullpre = data.totalPremium;
    }
    if (data.lineOfBusiness.toLowerCase().includes('miscellaneous')) {
      reli.Misc = data.numberOfPolicies;
      reli.MiscPre = data.totalPremium;
    }
    if (data.lineOfBusiness.toLowerCase().includes('life')) {
      reli.Life = data.numberOfPolicies;
      reli.Lifepre = data.totalPremium;
    }
  });
  console.log(ni);
  //love
  const sheetdata = [
    {
      "Name of Non Life Insurers": ins[0],
      "Engineering-No. of Policies": chl.Engineering,
      "Engineering-Premium": chl.EngineeringPremium,
      "Fire-No. of Policies": chl.Fire,
      "Fire-Premium": chl.Firepre,
      "Health-No. of Policies": chl.Health,
      "Health-Premium": chl.Healthpre,
      "Liability-No. of Policies": chl.Liability,
      "Liability-Premium": chl.Liabilitypre,
      "Life-No. of Policies": chl.Life,
      "Life-Premium": chl.Lifepre,
      "Marine Cargo-No. of Policies": chl.MarineCargo,
      "Marine Cargo-Premium": chl.MarineCargopre,
      "Marine Hull-No. of Policies": chl.MarineHull,
      "Marine Hull-Premium": chl.MarineHullpre,
      "Misc-No. of Policies": chl.Misc,
      "Misc-Premium": chl.MiscPre,
      "Motor-No.of Policies": chl.Motor,
      "Motor-Premium": chl.Motorpre,
      "Total no.of police":
        parseInt(chl.Engineering) +
        parseInt(chl.Fire) +
        parseInt(chl.Health) +
        parseInt(chl.Liability) +
        parseInt(chl.Life) +
        parseInt(chl.MarineCargo) +
        parseInt(chl.MarineHull) +
        parseInt(chl.Misc) +
        parseInt(chl.Motor),
      "Total of premium": rupee.format(
        (
          parseFloat(chl.EngineeringPremium) +
          parseFloat(chl.Firepre) +
          parseFloat(chl.Healthpre) +
          parseFloat(chl.Liabilitypre) +
          parseFloat(chl.Lifepre) +
          parseFloat(chl.MarineCargopre) +
          parseFloat(chl.MarineHullpre) +
          parseFloat(chl.MiscPre) +
          parseFloat(chl.Motorpre)
        ).toFixed(2)
      ),
    },
    {
      "Name of Non Life Insurers": ins[1],
      "Engineering-No. of Policies": hdfcli.Engineering,
      "Engineering-Premium": hdfcli.EngineeringPremium,
      "Fire-No. of Policies": hdfcli.Fire,
      "Fire-Premium": hdfcli.Firepre,
      "Health-No. of Policies": hdfcli.Health,
      "Health-Premium": hdfcli.Healthpre,
      "Liability-No. of Policies": hdfcli.Liability,
      "Liability-Premium": hdfcli.Liabilitypre,
      "Life-No. of Policies": hdfcli.Life,
      "Life-Premium": hdfcli.Lifepre,
      "Marine Cargo-No. of Policies": hdfcli.MarineCargo,
      "Marine Cargo-Premium": hdfcli.MarineCargopre,
      "Marine Hull-No. of Policies": hdfcli.MarineHull,
      "Marine Hull-Premium": hdfcli.MarineHullpre,
      "Misc-No. of Policies": hdfcli.Misc,
      "Misc-Premium": hdfcli.MiscPre,
      "Motor-No.of Policies": hdfcli.Motor,
      "Motor-Premium": hdfcli.Motorpre,
      "Total no.of police":
        parseInt(hdfcli.Engineering) +
        parseInt(hdfcli.Fire) +
        parseInt(hdfcli.Health) +
        parseInt(hdfcli.Liability) +
        parseInt(hdfcli.Life) +
        parseInt(hdfcli.MarineCargo) +
        parseInt(hdfcli.MarineHull) +
        parseInt(hdfcli.Misc) +
        parseInt(hdfcli.Motor),
      "Total of premium": rupee.format(
        (
          parseFloat(hdfcli.EngineeringPremium) +
          parseFloat(hdfcli.Firepre) +
          parseFloat(hdfcli.Healthpre) +
          parseFloat(hdfcli.Liabilitypre) +  
          parseFloat(hdfcli.Lifepre) +  
          parseFloat(hdfcli.MarineCargopre) +
          parseFloat(hdfcli.MarineHullpre) +
          parseFloat(hdfcli.MiscPre) +
          parseFloat(hdfcli.Motorpre)
        ).toFixed(2)
      ),
    },
    {
      "Name of Non Life Insurers": ins[2],
      "Engineering-No. of Policies": fg.Engineering,
      "Engineering-Premium": fg.EngineeringPremium,
      "Fire-No. of Policies": fg.Fire,
      "Fire-Premium": fg.Firepre,
      "Health-No. of Policies": fg.Health,
      "Health-Premium": fg.Healthpre,
      "Liability-No. of Policies": fg.Liability,
      "Liability-Premium": fg.Liabilitypre,
      "Life-No. of Policies": fg.Life,
      "Life-Premium": fg.Lifepre,
      "Marine Cargo-No. of Policies": fg.MarineCargo,
      "Marine Cargo-Premium": fg.MarineCargopre,
      "Marine Hull-No. of Policies": fg.MarineHull,
      "Marine Hull-Premium": fg.MarineHullpre,
      "Misc-No. of Policies": fg.Misc,
      "Misc-Premium": fg.MiscPre,
      "Motor-No.of Policies": fg.Motor,
      "Motor-Premium": fg.Motorpre,
      "Total no.of police":
        parseInt(fg.Engineering) +
        parseInt(fg.Fire) +
        parseInt(fg.Health) +
        parseInt(fg.Liability) +
        parseInt(fg.Life) +
        parseInt(fg.MarineCargo) +
        parseInt(fg.MarineHull) +
        parseInt(fg.Misc) +
        parseInt(fg.Motor),
      "Total of premium": rupee.format(
        (
          parseFloat(fg.EngineeringPremium) +
          parseFloat(fg.Firepre) +
          parseFloat(fg.Healthpre) +
          parseFloat(fg.Liabilitypre) +
          parseFloat(fg.Lifepre) +
          parseFloat(fg.MarineCargopre) +
          parseFloat(fg.MarineHullpre) +
          parseFloat(fg.MiscPre) +
          parseFloat(fg.Motorpre)
        ).toFixed(2)
      ),
    },
    {
      "Name of Non Life Insurers": ins[3],
      "Engineering-No. of Policies": gdg.Engineering,
      "Engineering-Premium": gdg.EngineeringPremium,
      "Fire-No. of Policies": gdg.Fire,
      "Fire-Premium": gdg.Firepre,
      "Health-No. of Policies": gdg.Health,
      "Health-Premium": gdg.Healthpre,
      "Liability-No. of Policies": gdg.Liability,
      "Liability-Premium": gdg.Liabilitypre,
      "Life-No. of Policies": gdg.Life,
      "Life-Premium": gdg.Lifepre,
      "Marine Cargo-No. of Policies": gdg.MarineCargo,
      "Marine Cargo-Premium": gdg.MarineCargopre,
      "Marine Hull-No. of Policies": gdg.MarineHull,
      "Marine Hull-Premium": gdg.MarineHullpre,
      "Misc-No. of Policies": gdg.Misc,
      "Misc-Premium": gdg.MiscPre,
      "Motor-No.of Policies": gdg.Motor,
      "Motor-Premium": gdg.Motorpre,
      "Total no.of police":
        parseInt(gdg.Engineering) +
        parseInt(gdg.Fire) +
        parseInt(gdg.Health) +
        parseInt(gdg.Liability) +
        parseInt(gdg.Life) +
        parseInt(gdg.MarineCargo) +
        parseInt(gdg.MarineHull) +
        parseInt(gdg.Misc) +
        parseInt(gdg.Motor),
      "Total of premium": rupee.format(
        (
          parseFloat(gdg.EngineeringPremium) +
          parseFloat(gdg.Firepre) +
          parseFloat(gdg.Healthpre) +
          parseFloat(gdg.Liabilitypre) +
          parseFloat(gdg.Lifepre) +
          parseFloat(gdg.MarineCargopre) +
          parseFloat(gdg.MarineHullpre) +
          parseFloat(gdg.MiscPre) +
          parseFloat(gdg.Motorpre)
        ).toFixed(2)
      ),
    },
    {
      "Name of Non Life Insurers": ins[4],
      "Engineering-No. of Policies": hdfer.Engineering,
      "Engineering-Premium": hdfer.EngineeringPremium,
      "Fire-No. of Policies": hdfer.Fire,
      "Fire-Premium": hdfer.Firepre,
      "Health-No. of Policies": hdfer.Health,
      "Health-Premium": hdfer.Healthpre,
      "Liability-No. of Policies": hdfer.Liability,
      "Liability-Premium": hdfer.Liabilitypre,
      "Life-No. of Policies": hdfer.Life,
      "Life-Premium": hdfer.Lifepre,
      // "Life-Premium": hdfer.Lifepre,
      "Marine Cargo-No. of Policies": hdfer.MarineCargo,
      "Marine Cargo-Premium": hdfer.MarineCargopre,
      "Marine Hull-No. of Policies": hdfer.MarineHull,
      "Marine Hull-Premium": hdfer.MarineHullpre,
      "Misc-No. of Policies": hdfer.Misc,
      "Misc-Premium": hdfer.MiscPre,
      "Motor-No.of Policies": hdfer.Motor,
      "Motor-Premium": hdfer.Motorpre,
      "Total no.of police":
        parseInt(hdfer.Engineering) +
        parseInt(hdfer.Fire) +
        parseInt(hdfer.Health) +
        parseInt(hdfer.Liability) +
        parseInt(hdfer.Life) +
        parseInt(hdfer.MarineCargo) +
        parseInt(hdfer.MarineHull) +
        parseInt(hdfer.Misc) +
        parseInt(hdfer.Motor),
      "Total of premium": rupee.format(
        (
          parseFloat(hdfer.EngineeringPremium) +
          parseFloat(hdfer.Firepre) +
          parseFloat(hdfer.Healthpre) +
          parseFloat(hdfer.Liabilitypre) +
          parseFloat(hdfer.Lifepre) +
          parseFloat(hdfer.MarineCargopre) +
          parseFloat(hdfer.MarineHullpre) +
          parseFloat(hdfer.MiscPre) +
          parseFloat(hdfer.Motorpre)
        ).toFixed(2)
      ),
    },
    {
      "Name of Non Life Insurers": ins[5],
      "Engineering-No. of Policies": kmg.Engineering,
      "Engineering-Premium": kmg.EngineeringPremium,
      "Fire-No. of Policies": kmg.Fire,
      "Fire-Premium": kmg.Firepre,
      "Health-No. of Policies": kmg.Health,
      "Health-Premium": kmg.Healthpre,
      "Liability-No. of Policies": kmg.Liability,
      "Liability-Premium": kmg.Liabilitypre,
      "Life-No. of Policies": kmg.Life,
      "Life-Premium": kmg.Lifepre,
      "Marine Cargo-No. of Policies": kmg.MarineCargo,
      "Marine Cargo-Premium": kmg.MarineCargopre,
      "Marine Hull-No. of Policies": kmg.MarineHull,
      "Marine Hull-Premium": kmg.MarineHullpre,
      "Misc-No. of Policies": kmg.Misc,
      "Misc-Premium": kmg.MiscPre,
      "Motor-No.of Policies": kmg.Motor,
      "Motor-Premium": kmg.Motorpre,
      "Total no.of police":
        parseInt(kmg.Engineering) +
        parseInt(kmg.Fire) +
        parseInt(kmg.Health) +
        parseInt(kmg.Liability) +
        parseInt(kmg.Life) +
        parseInt(kmg.MarineCargo) +
        parseInt(kmg.MarineHull) +
        parseInt(kmg.Misc) +
        parseInt(kmg.Motor),
      "Total of premium": rupee.format(
        (
          parseFloat(kmg.EngineeringPremium) +
          parseFloat(kmg.Firepre) +
          parseFloat(kmg.Healthpre) +
          parseFloat(kmg.Liabilitypre) +
          parseFloat(kmg.Lifepre) +
          parseFloat(kmg.MarineCargopre) +
          parseFloat(kmg.MarineHullpre) +
          parseFloat(kmg.MiscPre) +
          parseFloat(kmg.Motorpre)
        ).toFixed(2)
      ),
    },
    {
      "Name of Non Life Insurers": ins[6],
      "Engineering-No. of Policies": icic.Engineering,
      "Engineering-Premium": rupee.format(icic.EngineeringPremium),
      "Fire-No. of Policies": icic.Fire,
      "Fire-Premium": rupee.format(icic.Firepre),
      "Health-No. of Policies": icic.Health,
      "Health-Premium": rupee.format(icic.Healthpre),
      "Liability-No. of Policies": icic.Liability,
      "Liability-Premium": rupee.format(icic.Liabilitypre),
      "Life-No. of Policies": icic.Life,
      "Life-Premium": rupee.format(icic.Lifepre),
      "Marine Cargo-No. of Policies": icic.MarineCargo,
      "Marine Cargo-Premium": rupee.format(icic.MarineCargopre),
      "Marine Hull-No. of Policies": icic.MarineHull,
      "Marine Hull-Premium": rupee.format(icic.MarineHullpre),
      "Misc-No. of Policies": icic.Misc,
      "Misc-Premium": rupee.format(icic.MiscPre),
      "Motor-No.of Policies": icic.Motor,
      "Motor-Premium": rupee.format(icic.Motorpre),
      "Total no.of police":
        icic.Engineering +
        icic.Fire +
        icic.Health +
        icic.Liability +
        icic.Life +
        icic.MarineCargo +
        icic.MarineHull +
        icic.Misc +
        icic.Motor,
      "Total of premium": rupee.format(
        (
          parseFloat(icic.EngineeringPremium) +
          parseFloat(icic.Firepre) +
          parseFloat(icic.Healthpre) +
          parseFloat(icic.Liabilitypre) +
          parseFloat(icic.Lifepre) +
          parseFloat(icic.MarineCargopre) +
          parseFloat(icic.MarineHullpre) +
          parseFloat(icic.MiscPre) +
          parseFloat(icic.Motorpre)
        ).toFixed(2)
      ),
    },
    {
      "Name of Non Life Insurers": ins[7],
      "Engineering-No. of Policies": mgm.Engineering,
      "Engineering-Premium": mgm.EngineeringPremium,
      "Fire-No. of Policies": mgm.Fire,
      "Fire-Premium": mgm.Firepre,
      "Health-No. of Policies": mgm.Health,
      "Health-Premium": mgm.Healthpre,
      "Liability-No. of Policies": mgm.Liability,
      "Liability-Premium": mgm.Liabilitypre,
      "Life-No. of Policies": mgm.Life,
      "Life-Premium": mgm.Lifepre,
      "Marine Cargo-No. of Policies": mgm.MarineCargo,
      "Marine Cargo-Premium": mgm.MarineCargopre,
      "Marine Hull-No. of Policies": mgm.MarineHull,
      "Marine Hull-Premium": mgm.MarineHullpre,
      "Misc-No. of Policies": mgm.Misc,
      "Misc-Premium": mgm.MiscPre,
      "Motor-No.of Policies": mgm.Motor,
      "Motor-Premium": mgm.Motorpre,
      "Total no.of police":
        mgm.Engineering +
        mgm.Fire +
        mgm.Health +
        mgm.Liability +
        mgm.Life +
        mgm.MarineCargo +
        mgm.MarineHull +
        mgm.Misc +
        mgm.Motor,
      "Total of premium": rupee.format(
        (
          parseFloat(mgm.EngineeringPremium) +
          parseFloat(mgm.Firepre) +
          parseFloat(mgm.Healthpre) +
          parseFloat(mgm.Liabilitypre) +
          parseFloat(mgm.Lifepre) +
          parseFloat(mgm.MarineCargopre) +
          parseFloat(mgm.MarineHullpre) +
          parseFloat(mgm.MiscPre) +
          parseFloat(mgm.Motorpre)
        ).toFixed(2)
      ),
    },
   
    {
      "Name of Non Life Insurers": ins[8],
      "Engineering-No. of Policies": mhi.Engineering,
      "Engineering-Premium": mhi.EngineeringPremium,
      "Fire-No. of Policies": mhi.Fire,
      "Fire-Premium": mhi.Firepre,
      "Health-No. of Policies": mhi.Health,
      "Health-Premium": mhi.Healthpre,
      "Liability-No. of Policies": mhi.Liability,
      "Liability-Premium": mhi.Liabilitypre,
      "Life-No. of Policies": mhi.Life,
      "Life-Premium": mhi.Lifepre,
      "Marine Cargo-No. of Policies": mhi.MarineCargo,
      "Marine Cargo-Premium": mhi.MarineCargopre,
      "Marine Hull-No. of Policies": mhi.MarineHull,
      "Marine Hull-Premium": mhi.MarineHullpre,
      "Misc-No. of Policies": mhi.Misc,
      "Misc-Premium": mhi.MiscPre,
      "Motor-No.of Policies": mhi.Motor,
      "Motor-Premium": mhi.Motorpre,
      "Total no.of police":
        parseInt(mhi.Engineering) +
        parseInt(mhi.Fire) +
        parseInt(mhi.Health) +
        parseInt(mhi.Liability) +
        parseInt(mhi.Life) +
        parseInt(mhi.MarineCargo) +
        parseInt(mhi.MarineHull) +
        parseInt(mhi.Misc) +
        parseInt(mhi.Motor),
      "Total of premium": rupee.format(
        (
          parseFloat(mhi.EngineeringPremium) +
          parseFloat(mhi.Firepre) +
          parseFloat(mhi.Healthpre) +
          parseFloat(mhi.Liabilitypre) +
          parseFloat(mhi.Lifepre) +
          parseFloat(mhi.MarineCargopre) +
          parseFloat(mhi.MarineHullpre) +
          parseFloat(mhi.MiscPre) +
          parseFloat(mhi.Motorpre)
        ).toFixed(2)
      ),
    },
    {
      "Name of Non Life Insurers": ins[9],
      "Engineering-No. of Policies": nicl.Engineering,
      "Engineering-Premium": nicl.EngineeringPremium,
      "Fire-No. of Policies": nicl.Fire,
      "Fire-Premium": nicl.Firepre,
      "Health-No. of Policies": nicl.Health,
      "Health-Premium": nicl.Healthpre,
      "Liability-No. of Policies": nicl.Liability,
      "Liability-Premium": nicl.Liabilitypre,
      "Life-No. of Policies": nicl.Life,
      "Life-Premium": nicl.Life,
      "Marine Cargo-No. of Policies": nicl.MarineCargo,
      "Marine Cargo-Premium": nicl.MarineCargopre,
      "Marine Hull-No. of Policies": nicl.MarineHull,
      "Marine Hull-Premium": nicl.MarineHullpre,
      "Misc-No. of Policies": nicl.Misc,
      "Misc-Premium": nicl.MiscPre,
      "Motor-No.of Policies": nicl.Motor,
      "Motor-Premium": nicl.Motorpre,
      "Total no.of police":
        parseInt(nicl.Engineering) +
        parseInt(nicl.Fire) +
        parseInt(nicl.Health) +
        parseInt(nicl.Liability) +
        parseInt(nicl.Life) +
        parseInt(nicl.MarineCargo) +
        parseInt(nicl.MarineHull) +
        parseInt(nicl.Misc) +
        parseInt(nicl.Motor),
      "Total of premium": rupee.format(
        (
          parseFloat(nicl.EngineeringPremium) +
          parseFloat(nicl.Firepre) +
          parseFloat(nicl.Healthpre) +
          parseFloat(nicl.Liabilitypre) +
          parseFloat(nicl.Lifepre) +
          parseFloat(nicl.MarineCargopre) +
          parseFloat(nicl.MarineHullpre) +
          parseFloat(nicl.MiscPre) +
          parseFloat(nicl.Motorpre)
        ).toFixed(2)
      ),
    },
    {
      "Name of Non Life Insurers": ins[10],
      "Engineering-No. of Policies": ni.Engineering,
      "Engineering-Premium": ni.EngineeringPremium,
      "Fire-No. of Policies": ni.Fire,
      "Fire-Premium": ni.Firepre,
      "Health-No. of Policies": ni.Health,
      "Health-Premium": ni.Healthpre,
      "Liability-No. of Policies": ni.Liability,
      "Liability-Premium": ni.Liabilitypre,
      "Life-No. of Policies": ni.Life,
      "Life-Premium": ni.Lifepre,
      "Marine Cargo-No. of Policies": ni.MarineCargo,
      "Marine Cargo-Premium": ni.MarineCargopre,
      "Marine Hull-No. of Policies": ni.MarineHull,
      "Marine Hull-Premium": ni.MarineHullpre,
      "Misc-No. of Policies": ni.Misc,
      "Misc-Premium": ni.MiscPre,
      "Motor-No.of Policies": ni.Motor,
      "Motor-Premium": ni.Motorpre,
      "Total no.of police":
        parseInt(ni.Engineering) +
        parseInt(ni.Fire) +
        parseInt(ni.Health) +
        parseInt(ni.Liability) +
        parseInt(ni.Life) +
        parseInt(ni.MarineCargo) +
        parseInt(ni.MarineHull) +
        parseInt(ni.Misc) +
        parseInt(ni.Motor),
      "Total of premium": rupee.format(
        (
          parseFloat(ni.EngineeringPremium) +
          parseFloat(ni.Firepre) +
          parseFloat(ni.Healthpre) +
          parseFloat(ni.Liabilitypre) +
          parseFloat(ni.Lifepre) +
          parseFloat(ni.MarineCargopre) +
          parseFloat(ni.MarineHullpre) +
          parseFloat(ni.MiscPre) +
          parseFloat(ni.Motorpre)
        ).toFixed(2)
      ),
    },
    {
      "Name of Non Life Insurers": ins[11],
      "Engineering-No. of Policies": toic.Engineering,
      "Engineering-Premium": toic.EngineeringPremium,
      "Fire-No. of Policies": toic.Fire,
      "Fire-Premium": toic.Firepre,
      "Health-No. of Policies": toic.Health,
      "Health-Premium": toic.Healthpre,
      "Liability-No. of Policies": toic.Liability,
      "Liability-Premium": toic.Liabilitypre,
      "Life-No. of Policies": toic.Life,
      "Life-Premium": toic.Lifepre,
      "Marine Cargo-No. of Policies": toic.MarineCargo,
      "Marine Cargo-Premium": toic.MarineCargopre,
      "Marine Hull-No. of Policies": toic.MarineHull,
      "Marine Hull-Premium": toic.MarineHullpre,
      "Misc-No. of Policies": toic.Misc,
      "Misc-Premium": toic.MiscPre,
      "Motor-No.of Policies": toic.Motor,
      "Motor-Premium": toic.Motorpre,
      "Total no.of police":
        parseInt(toic.Engineering) +
        parseInt(toic.Fire) +
        parseInt(toic.Health) +
        parseInt(toic.Liability) +
        parseInt(toic.Life) +
        parseInt(toic.MarineCargo) +
        parseInt(toic.MarineHull) +
        parseInt(toic.Misc) +
        parseInt(toic.Motor),
      "Total of premium": rupee.format(
        (
          parseFloat(toic.EngineeringPremium) +
          parseFloat(toic.Firepre) +
          parseFloat(toic.Healthpre) +
          parseFloat(toic.Liabilitypre) +
          parseFloat(toic.Lifepre) +
          parseFloat(toic.MarineCargopre) +
          parseFloat(toic.MarineHullpre) +
          parseFloat(toic.MiscPre) +
          parseFloat(toic.Motorpre)
        ).toFixed(2)
      ),
    },
    {
      "Name of Non Life Insurers": ins[12],
      "Engineering-No. of Policies": reli.Engineering,
      "Engineering-Premium": reli.EngineeringPremium,
      "Fire-No. of Policies": reli.Fire,
      "Fire-Premium": reli.Firepre,
      "Health-No. of Policies": reli.Health,
      "Health-Premium": reli.Healthpre,
      "Liability-No. of Policies": reli.Liability,
      "Liability-Premium": reli.Liabilitypre,
      "Life-No. of Policies": reli.Life,
      "Life-Premium": reli.Lifepre,
      "Marine Cargo-No. of Policies": reli.MarineCargo,
      "Marine Cargo-Premium": reli.MarineCargopre,
      "Marine Hull-No. of Policies": reli.MarineHull,
      "Marine Hull-Premium": reli.MarineHullpre,
      "Misc-No. of Policies": reli.Misc,
      "Misc-Premium": reli.MiscPre,
      "Motor-No.of Policies": reli.Motor,
      "Motor-Premium": reli.Motorpre,
      "Total no.of police":
        parseInt(reli.Engineering) +
        parseInt(reli.Fire) +
        parseInt(reli.Health) +
        parseInt(reli.Liability) +
        parseInt(reli.Life) +
        parseInt(reli.MarineCargo) +
        parseInt(reli.MarineHull) +
        parseInt(reli.Misc) +
        parseInt(reli.Motor),
      "Total of premium": rupee.format(
        (
          parseFloat(reli.EngineeringPremium) +
          parseFloat(reli.Firepre) +
          parseFloat(reli.Healthpre) +
          parseFloat(reli.Liabilitypre) +
          parseFloat(reli.Lifepre) +
          parseFloat(reli.MarineCargopre) +
          parseFloat(reli.MarineHullpre) +
          parseFloat(reli.MiscPre) +
          parseFloat(reli.Motorpre)
        ).toFixed(2)
      ),
    },
    {
      "Name of Non Life Insurers": ins[13],
      "Engineering-No. of Policies": rsg.Engineering,
      "Engineering-Premium": rsg.EngineeringPremium,
      "Fire-No. of Policies": rsg.Fire,
      "Fire-Premium": rsg.Firepre,
      "Health-No. of Policies": rsg.Health,
      "Health-Premium": rsg.Healthpre,
      "Liability-No. of Policies": rsg.Liability,
      "Liability-Premium": rsg.Liabilitypre,
      "Life-No. of Policies": rsg.Life,
      "Life-Premium": rsg.Lifepre,
      "Marine Cargo-No. of Policies": rsg.MarineCargo,
      "Marine Cargo-Premium": rsg.MarineCargopre,
      "Marine Hull-No. of Policies": rsg.MarineHull,
      "Marine Hull-Premium": rsg.MarineHullpre,
      "Misc-No. of Policies": rsg.Misc,
      "Misc-Premium": rsg.MiscPre,
      "Motor-No.of Policies": rsg.Motor,
      "Motor-Premium": rsg.Motorpre,
      "Total no.of police":
        parseInt(rsg.Engineering) +
        parseInt(rsg.Fire) +
        parseInt(rsg.Health) +
        parseInt(rsg.Liability) +
        parseInt(rsg.Life) +
        parseInt(rsg.MarineCargo) +
        parseInt(rsg.MarineHull) +
        parseInt(rsg.Misc) +
        parseInt(rsg.Motor),
      "Total of premium": rupee.format(
        (
          parseFloat(rsg.EngineeringPremium) +
          parseFloat(rsg.Firepre) +
          parseFloat(rsg.Healthpre) +
          parseFloat(rsg.Liabilitypre) +
          parseFloat(rsg.Lifepre) +
          parseFloat(rsg.MarineCargopre) +
          parseFloat(rsg.MarineHullpre) +
          parseFloat(rsg.MiscPre) +
          parseFloat(rsg.Motorpre)
        ).toFixed(2)
      ),
    },
    {
      "Name of Non Life Insurers": ins[14],
      "Engineering-No. of Policies": sb.Engineering,
      "Engineering-Premium": sb.EngineeringPremium,
      "Fire-No. of Policies": sb.Fire,
      "Fire-Premium": sb.Firepre,
      "Health-No. of Policies": sb.Health,
      "Health-Premium": sb.Healthpre,
      "Liability-No. of Policies": sb.Liability,
      "Liability-Premium": sb.Liabilitypre,
      "Life-No. of Policies": sb.Life,
      "Life-Premium": sb.Lifepre,
      "Marine Cargo-No. of Policies": sb.MarineCargo,
      "Marine Cargo-Premium": sb.MarineCargopre,
      "Marine Hull-No. of Policies": sb.MarineHull,
      "Marine Hull-Premium": sb.MarineHullpre,
      "Misc-No. of Policies": sb.Misc,
      "Misc-Premium": sb.MiscPre,
      "Motor-No.of Policies": sb.Motor,
      "Motor-Premium": sb.Motorpre,
      "Total no.of police":
        parseInt(sb.Engineering) +
        parseInt(sb.Fire) +
        parseInt(sb.Health) +
        parseInt(sb.Liability) +
        parseInt(sb.Life) +
        parseInt(sb.MarineCargo) +
        parseInt(sb.MarineHull) +
        parseInt(sb.Misc) +
        parseInt(sb.Motor),
      "Total of premium": rupee.format(
        (
          parseFloat(sb.EngineeringPremium) +
          parseFloat(sb.Firepre) +
          parseFloat(sb.Healthpre) +
          parseFloat(sb.Liabilitypre) +
          parseFloat(sb.Lifepre) +
          parseFloat(sb.MarineCargopre) +
          parseFloat(sb.MarineHullpre) +
          parseFloat(sb.MiscPre) +
          parseFloat(sb.Motorpre)
        ).toFixed(2)
      ),
    },
    {
      "Name of Non Life Insurers": ins[15],
      "Engineering-No. of Policies": shri.Engineering,
      "Engineering-Premium": shri.EngineeringPremium,
      "Fire-No. of Policies": shri.Fire,
      "Fire-Premium": shri.Firepre,
      "Health-No. of Policies": shri.Health,
      "Health-Premium": shri.Healthpre,
      "Liability-No. of Policies": shri.Liability,
      "Liability-Premium": shri.Liabilitypre,
      "Life-No. of Policies": shri.Life,
      "Life-Premium": shri.Lifepre,
      "Marine Cargo-No. of Policies": shri.MarineCargo,
      "Marine Cargo-Premium": shri.MarineCargopre,
      "Marine Hull-No. of Policies": shri.MarineHull,
      "Marine Hull-Premium": shri.MarineHullpre,
      "Misc-No. of Policies": shri.Misc,
      "Misc-Premium": shri.MiscPre,
      "Motor-No.of Policies": shri.Motor,
      "Motor-Premium": shri.Motorpre,
      "Total no.of police":
        parseInt(shri.Engineering) +
        parseInt(shri.Fire) +
        parseInt(shri.Health) +
        parseInt(shri.Liability) +
        parseInt(shri.Life) +
        parseInt(shri.MarineCargo) +
        parseInt(shri.MarineHull) +
        parseInt(shri.Misc) +
        parseInt(shri.Motor),
      "Total of premium": rupee.format(
        (
          parseFloat(shri.EngineeringPremium) +
          parseFloat(shri.Firepre) +
          parseFloat(shri.Healthpre) +
          parseFloat(shri.Liabilitypre) +
          parseFloat(shri.Lifepre) +
          parseFloat(shri.MarineCargopre) +
          parseFloat(shri.MarineHullpre) +
          parseFloat(shri.MiscPre) +
          parseFloat(shri.Motorpre)
        ).toFixed(2)
      ),
    },
    {
      "Name of Non Life Insurers": ins[16],
      "Engineering-No. of Policies": sth.Engineering,
      "Engineering-Premium": sth.EngineeringPremium,
      "Fire-No. of Policies": sth.Fire,
      "Fire-Premium": sth.Firepre,
      "Health-No. of Policies": sth.Health,
      "Health-Premium": sth.Healthpre,
      "Liability-No. of Policies": sth.Liability,
      "Liability-Premium": sth.Liabilitypre,
      "Life-No. of Policies": sth.Life,
      "Life-Premium": sth.Lifepre,
      "Marine Cargo-No. of Policies": sth.MarineCargo,
      "Marine Cargo-Premium": sth.MarineCargopre,
      "Marine Hull-No. of Policies": sth.MarineHull,
      "Marine Hull-Premium": sth.MarineHullpre,
      "Misc-No. of Policies": sth.Misc,
      "Misc-Premium": sth.MiscPre,
      "Motor-No.of Policies": sth.Motor,
      "Motor-Premium": sth.Motorpre,
      "Total no.of police":
        parseInt(sth.Engineering) +
        parseInt(sth.Fire) +
        parseInt(sth.Health) +
        parseInt(sth.Liability) +
        parseInt(sth.Life) +
        parseInt(sth.MarineCargo) +
        parseInt(sth.MarineHull) +
        parseInt(sth.Misc) +
        parseInt(sth.Motor),
      "Total of premium": rupee.format(
        (
          parseFloat(sth.EngineeringPremium) +
          parseFloat(sth.Firepre) +
          parseFloat(sth.Healthpre) +
          parseFloat(sth.Liabilitypre) +
          parseFloat(sth.Lifepre) +
          parseFloat(sth.MarineCargopre) +
          parseFloat(sth.MarineHullpre) +
          parseFloat(sth.MiscPre) +
          parseFloat(sth.Motorpre)
        ).toFixed(2)
      ),
    },
    {
      "Name of Non Life Insurers": ins[17],
      "Engineering-No. of Policies": tataagi.Engineering,
      "Engineering-Premium": tataagi.EngineeringPremium,
      "Fire-No. of Policies": tataagi.Fire,
      "Fire-Premium": tataagi.Firepre,
      "Health-No. of Policies": tataagi.Health,
      "Health-Premium": tataagi.Healthpre,
      "Liability-No. of Policies": tataagi.Liability,
      "Liability-Premium": tataagi.Liabilitypre,
      "Life-No. of Policies": tataagi.Life,
      "Life-Premium": tataagi.Lifepre,
      "Marine Cargo-No. of Policies": tataagi.MarineCargo,
      "Marine Cargo-Premium": tataagi.MarineCargopre,
      "Marine Hull-No. of Policies": tataagi.MarineHull,
      "Marine Hull-Premium": tataagi.MarineHullpre,
      "Misc-No. of Policies": tataagi.Misc,
      "Misc-Premium": tataagi.MiscPre,
      "Motor-No.of Policies": tataagi.Motor,
      "Motor-Premium": tataagi.Motorpre,
      "Total no.of police":
        parseInt(tataagi.Engineering) +
        parseInt(tataagi.Fire) +
        parseInt(tataagi.Health) +
        parseInt(tataagi.Liability) +
        parseInt(tataagi.Life) +
        parseInt(tataagi.MarineCargo) +
        parseInt(tataagi.MarineHull) +
        parseInt(tataagi.Misc) +
        parseInt(tataagi.Motor),
      "Total of premium": rupee.format(
        (
          parseFloat(tataagi.EngineeringPremium) +
          parseFloat(tataagi.Firepre) +
          parseFloat(tataagi.Healthpre) +
          parseFloat(tataagi.Liabilitypre) +
          parseFloat(tataagi.Lifepre) +
          parseFloat(tataagi.MarineCargopre) +
          parseFloat(tataagi.MarineHullpre) +
          parseFloat(tataagi.MiscPre) +
          parseFloat(tataagi.Motorpre)
        ).toFixed(2)
      ),
    },
   
    {
      "Name of Non Life Insurers": ins[18],
      "Engineering-No. of Policies": uii.Engineering,
      "Engineering-Premium": uii.EngineeringPremium,
      "Fire-No. of Policies": uii.Fire,
      "Fire-Premium": uii.Firepre,
      "Health-No. of Policies": uii.Health,
      "Health-Premium": uii.Healthpre,
      "Liability-No. of Policies": uii.Liability,
      "Liability-Premium": uii.Liabilitypre,
      "Life-No. of Policies": uii.Life,
      "Life-Premium": uii.Lifepre,
      "Marine Cargo-No. of Policies": uii.MarineCargo,
      "Marine Cargo-Premium": uii.MarineCargopre,
      "Marine Hull-No. of Policies": uii.MarineHull,
      "Marine Hull-Premium": uii.MarineHullpre,
      "Misc-No. of Policies": uii.Misc,
      "Misc-Premium": uii.MiscPre,
      "Motor-No.of Policies": uii.Motor,
      "Motor-Premium": uii.Motorpre,
      "Total no.of police":
        parseInt(uii.Engineering) +
        parseInt(uii.Fire) +
        parseInt(uii.Health) +
        parseInt(uii.Liability) +
        parseInt(uii.Life) +
        parseInt(uii.MarineCargo) +
        parseInt(uii.MarineHull) +
        parseInt(uii.Misc) +
        parseInt(uii.Motor),
      "Total of premium": rupee.format(
        (
          parseFloat(uii.EngineeringPremium) +
          parseFloat(uii.Firepre) +
          parseFloat(uii.Healthpre) +
          parseFloat(uii.Liabilitypre) +
          parseFloat(uii.Lifepre) +
          parseFloat(uii.MarineCargopre) +
          parseFloat(uii.MarineHullpre) +
          parseFloat(uii.MiscPre) +
          parseFloat(uii.Motorpre)
        ).toFixed(2)
      ),
    },
   
    
   
   
   
   
   
  
  
   
    
   
  ];
  const column = Object.keys(sheetdata[0]);
  console.log(column);
  const ThData = () => {
    return column.map((data) => {
      return (
        <th
          key={data}
          scope="col"
          className="text-lg font-md text-gray-900 px-6 py-4 text-center"
        >
          {data}
        </th>
      );
    });
  };
  const tdData = () => {
    return sheetdata.map((data) => {
      return (
        <tr className="bg-white border-b border-gray transition duration-300 ease-in-out hover:bg-gray">
          {column.map((v) => {
            return (
              <td className="px-6 py-4 whitespace-nowrap text-md text-center font-medium text-gray-900">
                {data[v]}
              </td>
            );
          })}
        </tr>
      );
    });
  };

  const containerRef = useRef(null);
  let previousScrollLeft = 0;

  const handleScroll = () => {
    const container = containerRef.current;
    const currentScrollLeft = container.scrollLeft;

    if (currentScrollLeft > previousScrollLeft) {
      // Horizontal scroll to the right
      console.log('Horizontal scroll to the right detected!');
    } else if (currentScrollLeft < previousScrollLeft) {
      // Horizontal scroll to the left
      console.log('Horizontal scroll to the left detected!');
    }

    previousScrollLeft = currentScrollLeft;
  };


  const [scrollLeft, setScrollLeft] = useState(0);
  const divRef = useRef(null);

  // const handleScroll = () => {
  //  
  // };
  const tableRef = useRef(null);

  
  // useEffect(() => {
  //   const options = {
  //     root: null,
  //     rootMargin: '0px',
  //     threshold: 1.0,
  //   };

  //   const observer = new IntersectionObserver(handleTableIntersection, options);

  //   if (tableRef.current) {
  //     observer.observe(tableRef.current);
  //   }

  //   return () => {
  //     if (tableRef.current) {
  //       observer.unobserve(tableRef.current);
  //     }
  //   };
  // }, [handleTableIntersection,tableRef]);

          console.log('shit scrol',scrollLeft)


          const handleScroll2 = React.useCallback(() => {
            // Scroll event handler logic
            // setIsStickyClass(false)
            if (containerRef.current) {
                  setScrollLeft(containerRef.current.scrollLeft);
                }
            console.log('Scroll event occurred on the div.');
          });

          useEffect(() => {
            const tableElement = containerRef.current;
            if (tableElement) {
              tableElement.addEventListener('scroll', handleScroll2);
              return () => {
                tableElement.removeEventListener('scroll', handleScroll2);
              };
            }
          }, [handleScroll2]);
        
          // Attach the scroll event listener when the component mounts
          React.useEffect(() => {
            const divElement = containerRef.current;
        
            if (divElement) {
              divElement.addEventListener('scroll', handleScroll2);
            }
        
            // Clean up the event listener when the component unmounts
            return () => {
              if (divElement) {
                divElement.removeEventListener('scroll', handleScroll2);
              }
            };
          }, [handleScroll2]);

          console.log('sheetData',sheetdata)
  return (
    <div className="overscroll-x-none w-full mb-2">

      <div className={`${loadingData?'':'hidden'} absolute bg-[#9794946e] w-[89vw] overflow-hidden h-[720px]  z-50`}>

        <h1 className="text-center flex flex-col text-lg font-semibold h-full waterFlow justify-center">
          Data Fetching Please Wait ...
        </h1>
      </div>
      <div className="relative overflow-x-auto   shadow-md sm:rounded-lg w-11/12 ml-14 mt-10  bg-white">
        <h3 className="bg-white text-xl p-4 font-semibold">Summary</h3>
        <div className="table-container2  h-[650px] w-full scrollbar-hidden"   >

        <table  id={ids} ref={tableRef} className={`  text-[12px] text-sm w-full overflow-scroll  text-center text-gray-500 dark:text-gray-400 `} >
          <thead onScroll={handleScroll2}  className={` sticky top-0 z-40 h-20 w-[82%] text-xs text-gray-700 border-b-2 border-gray uppercase bg-white dark:bg-gray-700 dark:text-gray-400`}>
            <tr className="bg-[#5a9775b5]">
              <th scope="col" className={` ${isStickyClass?' z-30':''} bg-[#35a061f4] px-10 py-3 w-40 sticky left-0`}>
                Name of Non Life Insurers
              </th>
              <th scope="col" className="px-6 py-3">
                Engineering-No. of Policies
              </th>
              <th scope="col" className="px-6 py-3">
                Engineering-Premium
              </th>
              <th scope="col" className="px-6 py-3">
                Fire-No. of Policies
              </th>
              <th scope="col" className="px-6 py-3">
                Fire-Premium
              </th>
              <th scope="col" className="px-6 py-3">
                Health-No. of Policies
              </th>
              <th scope="col" className="px-6 py-3">
                Health-Premium
              </th>
              <th scope="col" className="px-6 py-3">
                Liability-No. of Policies
              </th>
              <th scope="col" className="px-6 py-3">
                Liability-Premium
              </th>
              <th scope="col" className="px-6 py-3">
                Life-No. of Policies
              </th>
              <th scope="col" className="px-6 py-3">
                Life-Premium
              </th>
              <th scope="col" className="px-6 py-3">
                Marine Cargo-No. of Policies
              </th>
              <th scope="col" className="px-6 py-3">
                Marine Cargo-Premium
              </th>
              <th scope="col" className="px-6 py-3">
                Marine Hull-No. of Policies
              </th>
              <th scope="col" className="px-6 py-3">
                Marine Hull-Premium
              </th>
              <th scope="col" className="px-6 py-3">
                Misc-No. of Policies
              </th>
              <th scope="col" className="px-6 py-3">
                Misc-Premium
              </th>
              <th scope="col" className="px-6 py-3">
                Motor-No.of Policies
              </th>
              <th scope="col" className="px-6 py-3">
                Motor-Premium
              </th>
              <th scope="col" className="px-6 py-3">
                Total no.of police
              </th>
              <th scope="col" className="px-6 py-3">
                Total of premium
              </th>

              {/* <th scope="col" className="px-6 py-3">
<span >Edit</span>
</th> */}
            </tr>
          </thead>
          <tbody >
            {sheetdata.map((item, key) => {
               const filteredRows = sheetdata.filter(row => row["Name of Non Life Insurers"] === item["Name of Non Life Insurers"]);

               // Calculate aggregated premium for the filtered rows
               const aggregatedEngineeringPremium = filteredRows.reduce((acc, row) => acc + parseInt(row["Marine Cargo-No. of Policies"]), 0);
             
              return (
              <tr key={key} className="bg-white border-b-2 border-gray dark:bg-gray-800 dark:border-gray-700 hover:bg-gray dark:hover:bg-gray-600">
                <td className="px-5 h-full py-4 w-52 z-30 bg-gray-200 sticky left-0 bg-[#6dc893]"  >{item["Name of Non Life Insurers"]}</td>
                <td className="px-6 py-4">{item["Engineering-No. of Policies"]}</td>
                <td className="px-6 py-4">{sheetdata
    .filter(row => row["Name of Non Life Insurers"] === item["Name of Non Life Insurers"])
    .reduce((acc, row) => acc + parseInt(row["Engineering-Premium"]), 0)}</td>
                <td className="px-6 py-4">{item["Fire-No. of Policies"]}</td>
                <td className="px-6 py-4">{item["Fire-Premium"]}</td>

                <td className="px-6 py-4">{item["Health-No. of Policies"]}</td>
                <td className="px-6 py-4">{item["Health-Premium"]}</td>

                <td className="px-6 py-4">{item["Liability-No. of Policies"]}</td>
                <td className="px-6 py-4">{item["Liability-Premium"]}</td>
                <td className="px-6 py-4">{item["Life-No. of Policies"]}</td>
                <td className="px-6 py-4">{item["Life-Premium"]}</td>
                <td className="px-6 py-4">
                {/* {item["Marine Cargo-No. of Policies"]} <br /> */}
        {aggregatedEngineeringPremium.toLocaleString()}
                </td>
                <td className="px-6 py-4">{item["Marine Cargo-Premium"]}</td>
                <td className="px-6 py-4">{item["Marine Hull-No. of Policies"]}</td>

                <td className="px-6 py-4">{item["Marine Hull-Premium"]}</td>
                <td className="px-6 py-4">{item["Misc-No. of Policies"]}</td>

                <td className="px-6 py-4">{item["Misc-Premium"]}</td>
                <td className="px-6 py-4">{item["Motor-No.of Policies"]}</td>
                <td className="px-6 py-4">{item["Motor-Premium"]}</td>
                <td className="px-6 py-4">{item["Total no.of police"]}</td>
                <td className="px-6 py-4">{item["Total of premium"]}</td>
              </tr>
            )})}
          </tbody>
        </table>
      </div>
      </div>
    </div>
  );
};

export default Table;
