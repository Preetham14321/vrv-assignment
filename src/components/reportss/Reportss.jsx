import React from "react";
import { useEffect, useState, useRef } from "react";
import Pie1 from "./Piechart";
import Bar1 from "./Barchart";
import Piechart from "./Piechart";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Table from "./Table";
import Barchart from "./Barchart";
import logoimg from "../../assets/logo.png";
import { PDFExport, savePDF } from "@progress/kendo-react-pdf";
import * as XLSX from "xlsx";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { PDFDownloadLink } from "@react-pdf/renderer";

ChartJS.register(ArcElement, Tooltip, Legend);
const optionsbar = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
    },
  },
};
const optionscli = {
  plugins: {
    legend: {
      display: true,
      position: "top",
      align: "start",
      labels: {
        color: "black",
        font: {},
        textAlign: "left",
      },
    },
  },
  scales: {
    x: {
      display: false, // Hide the x-axis
    },
    y: {
      display: false, // Hide the y-axis
    },
  },
  elements: {
    arc: {
      borderWidth: 0,
    },
  },
};
const optionsinspie = {
  legend: {
    display: false,
    position: "top",
  },
  tooltips: {
    callbacks: {
      label: function (tooltipItem, data) {
        const datasetLabel =
          data.datasets[tooltipItem.datasetIndex].label || "";
        const value = tooltipItem.yLabel;
        return `${datasetLabel}: ${value}`;
      },
    },
  },
  elements: {
    arc: {
      borderWidth: 0,
    },
  },
};
const Reportss = ({ids,isSticky='', handleTableIntersection}) => {
  const API_ENDPOINT = process.env.REACT_APP_API_URL;
  // states for timeframe
  const [mode, setMode] = useState("");
  const [timeframe, setTimeframe] = useState(false);
  const [monthly, setMonthly] = useState(false);
  const [custom, setCustom] = useState(false);
  const [year, setYear] = useState("");
  const [option1, setOption1] = useState("");
  //----------------------------------------------------------------//
  const [chart, setChart] = useState("selectchart");
  const pdfExportComponent = useRef(null);
  const [pieContentVisible, setPieContentVisible] = useState(false);
  const [insu, setInsu] = useState(false);
  const [tableContentVisible, setTableContentVisible] = useState(false);
  const [barContentVisible, setBarContentVisible] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [download, setDownload] = useState("Select Type");
  const [report, setReport] = useState("");
  const [des, setDes] = useState(false);
  const [showLoading, setShowLoading] = useState(false)
  const [pdf, setPdf] = useState(false);
  const [clidata, setClidata] = useState([]);
  const [clientwise, setClientwise] = useState(false);
  const [endDate, setEndDate] = useState("");
  const name = JSON.parse(localStorage.getItem("namee"));
  const Password = JSON.parse(localStorage.getItem("pwd"));

  console.warn(name, Password);

  const handleOnChangee = (e) => {
    setReport(e.target.value);
  };
  const handleOnMode = (e) => {
    setMode(e.target.value);
  };
  const handleOnYear = (e) => {
    setYear(e.target.value);
  };
  const handleOnOption = (e) => {
    setOption1(e.target.value);
  };
  const handleOnChange = (e) => {
    setChart(e.target.value);
  };
  const handleOnChangeee = (e) => {
    e.preventDefault();
    setDownload(e.target.value);
    setPdf(true);
  };
  useEffect(() => {
    chart === "pie" ? setPieContentVisible(true) : setPieContentVisible(false);
    chart === "bar" ? setBarContentVisible(true) : setBarContentVisible(false);
    chart === "table"
      ? setTableContentVisible(true)
      : setTableContentVisible(false);
  }, [chart]);
  useEffect(() => {
    mode === "timeframe" ? setTimeframe(true) : setTimeframe(false);
    mode === "monthly" ? setMonthly(true) : setMonthly(false);
    mode === "custom" ? setCustom(true) : setCustom(false);
  }, [mode]);
  const [xldata, setXldata] = useState([]);
  useEffect(() => {
    setShowLoading(true)

    axios
      .get(`${API_ENDPOINT}/reports`, {
        auth: {
          username: name,
          password: Password,
        },
        params: {
          mode: mode,
          year: year,
          timeFrameOrMonth: option1,
          startDate: startDate,
          endDate: endDate,
          // mode: "timeframe",
          // year: year,
          // timeFrameOrMonth: "yearly",
          // startDate: "",
          // endDate: "",
        },
      })
      .then((response) => {
        console.warn(response.data);
        setXldata(response.data);
    setShowLoading(false)

      });
  }, [API_ENDPOINT, Password, endDate, mode, name, option1, startDate, year]);
  useEffect(() => {
    axios
      .get(`${API_ENDPOINT}/clientReports`, {
        auth: {
          username: name,
          password: Password,
        },
        params: {
          mode: mode,
          year: year,
          timeFrameOrMonth: option1,
          startDate: startDate,
          endDate: endDate,
        },
      })
      .then((response) => {
        console.warn(response);
        setClidata(response.data.ClientWiseReports?response.data.ClientWiseReports:[]);
      });
  }, [API_ENDPOINT, Password, endDate, mode, name, option1, startDate, year]);

  const cdata = clidata?clidata:[];

  console.log('xll',xldata)

  const sdata = xldata;
  // const ins = [
  //   "ICICI Lombard General Insurance Co. Ltd.",
  //   "Magma HDI General Insurance Company Limited",
  //   "Reliance General Insurance Co. Ltd.",
  //   "Royal Sundaram Alliance Insurance Co. Ltd.",
  //   "SBI General Insurance Company Limited",
  //   "Shriram General Insurance Company Limited",
  //   "Tata AIG General Insurance Co. Ltd.",
  //   "The New India Assurance Co. Ltd.",
  //   "Kotak Mahindra General Insurance Company Limited",
  //   "Go Digit General Insurance Limited",
  // ];
  useEffect(() => {
    report === "Insurance company wise premium"
      ? setInsu(true)
      : setInsu(false);
    report === "Client wise premium"
      ? setClientwise(true)
      : setClientwise(false);
    chart === "table"
      ? setTableContentVisible(true)
      : setTableContentVisible(false);
  }, [report]);
  const handleExportWithComponent = (event) => {
    pdfExportComponent.current.save();
  };
  const handlessuumm = (e) => {
    e.preventDefault();
    if (download === "excel") {
      if (report === "Insurance company wise premium") {
        downloadExcel(sheetdata);
      }
      if (report === "Client wise premium") {
        downloadExcel(clidata);
      }
    } else if (download === "word") {
      downloadTxtFile(sheetdata);
    } else if (download === "pdf") {
      handleExportWithComponent();
    }
  };
  console.log(download);
  // txt
  const downloadTxtFile = (sheetdata) => {
    const element = document.createElement("a");
    const fileData = JSON.stringify(sheetdata);
    const file = new Blob([fileData], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "myFile.txt";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  };
  // excel data

  //   const sheetdata =
  // ins.map((data) =>({
  //   "Name of Non Life Insurers" : data,

  // }))
  console.warn(sdata);

  let rupee = new Intl.NumberFormat("en-IN", {
    currency: "INR",
  });
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
  console.log('sheettt',sheetdata);
  const datazero = [];
  sheetdata.map((data) => {
    if (data["Total of premium"] !== 0) {
      datazero.push(data);
    }
  });
  console.warn(datazero);
  const labels = [];
  const ep = [];
  const fp = [];
  const hp = [];
  const lp = [];
  const mcp = [];
  const mhp = [];
  const mip = [];
  const mop = [];

  datazero.map((data) => {
    ep.push(data["Engineering-Premium"]);
  });
  datazero.map((data) => {
    fp.push(data["Fire-Premium"]);
  });
  datazero.map((data) => {
    hp.push(data["Health-Premium"]);
  });
  datazero.map((data) => {
    lp.push(data["Liability-Premium"]);
  });
  datazero.map((data) => {
    mcp.push(data["Marine Cargo-Premium"]);
  });
  datazero.map((data) => {
    mhp.push(data["Marine Hull-Premium"]);
  });
  datazero.map((data) => {
    mip.push(data["Misc-Premium"]);
  });
  datazero.map((data) => {
    mop.push(data["Motor-Premium"]);
  });
  datazero.map((data) => {
    console.log('data zero',data["Name of Non Life Insurers"])

    labels.push(data["Name of Non Life Insurers"]);
  });

  const optionsinsbar = {
    plugins: {
      title: {
        display: true,
        text: "",
      },
    },
    responsive: true,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };
  const options = {
    plugins: {
      title: {
        display: true,
        text: "",
      },
    },
    responsive: true,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };
  console.log(reliance);
  console.warn(datazero);
  // const labels= ["<  1","1 - 2","3 - 4","5 - 9","10 - 14","15 - 19","20 - 24","25 - 29","> - 29"]
  //const labels=["ICICI Lombard General Insurance Co. Ltd.","Magma HDI General Insurance Company Limited","Reliance General Insurance Co. Ltd.","Royal Sundaram Alliance Insurance Co. Ltd.","SBI General Insurance Company Limited","Shriram General Insurance Company Limited","Tata AIG General Insurance Co. Ltd.","The New India Assurance Co. Ltd.","Kotak Mahindra General Insurance Company Limited","Go Digit General Insurance Limited"]
  const datains = {
    labels,

    datasets: [
      {
        label: "Engineering",
        backgroundColor: "#caf270",
        data: ep,
      },
      {
        label: "Fire",
        backgroundColor: "#45c490",
        data: fp,
      },
      {
        label: "Health",
        backgroundColor: "#008d93",
        data: hp,
      },
      {
        label: "Liability",
        backgroundColor: "#2e5468",
        data: lp,
      },
      {
        label: "Marine Cargo",
        backgroundColor: "#2a6468",
        data: mcp,
      },
      {
        label: "Marine Hull",
        backgroundColor: "#2b7468",
        data: mhp,
      },
      {
        label: "Misc",
        backgroundColor: "#2c8468",
        data: mip,
      },
      {
        label: "Motor",
        backgroundColor: "#2d9468",
        data: mop,
      },
    ],
  };

  const downloadExcel = (dataexcel) => {
    const worksheet = XLSX.utils.json_to_sheet(dataexcel);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    XLSX.writeFile(workbook, "DataSheet.xlsx");
  };
  const ini = sdata.reduce(
    (iniSoFar, { insurer, lineOfBusiness, numberOfPolicies, totalPremium }) => {
      if (!iniSoFar[insurer]) iniSoFar[insurer] = [];
      iniSoFar[insurer].push(totalPremium);

      return iniSoFar;
    },
    {}
  );

  const entriesinsurer = Object.entries(ini);
  console.warn(entriesinsurer);
  var c = [];
  for (let i = 0; i < entriesinsurer.length; i++) {
    let temp = [];
    let sum = 0;
    const values = entriesinsurer[i][1];
    for (let j = 0; j < values.length; j++) {
      sum += Number(values[j]);
    }
    temp.push(entriesinsurer[i][0]);
    temp.push(sum);
    c.push(temp);
  }
  console.warn(c);
  const carr = [];
  const val = [];
  const sum = [];
  const insur = [];
  // const groupedItems = clidata.reduce((acc, item) => {
  //   const name = item.insuredName;

  //   if (!acc[name]) {
  //     acc[name] = [];
  //   }

  //   acc[name].push(item);
  //   return acc;
  // }, {});
  const cats = clidata?clidata.reduce((catsSoFar, { insuredName, totalPremium }) => {
    if (!catsSoFar[insuredName]) catsSoFar[insuredName] = [];
    catsSoFar[insuredName].push(totalPremium);

    return catsSoFar;
  }, {}):[]
  const propertyNames = Object.keys(cats);
  const entries = Object.entries(cats);
  // Object.entries(cats).forEach(([key, value]) => {
  //   console.warn(`${key}: ${value}`);
  // });
  var s = [];
  for (let i = 0; i < entries.length; i++) {
    let temp = [];
    let sum = 0;
    const values = entries[i][1];
    for (let j = 0; j < values.length; j++) {
      sum += Number(values[j]);
    }
    temp.push(entries[i][0]);
    temp.push(sum.toFixed(2));
    s.push(temp);
  }
  console.warn(s);
  const xy = [];
  const ab = [];
  s.map((data) => xy.push(data[0]));
  s.map((data) => ab.push(data[1]));
  // const result = Object.values(groupedItems);
  const tableRows = xy.map((name, index) => (
    <tr key={index}>
      <td>{name}</td>
      <td>{ab[index]}</td>
    </tr>
  ));
  console.warn(insur, sum);
  const databar = {
    labels: xy,
    datasets: [
      {
        label: "#premium",
        data: ab,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  const data = {
    labels: xy,
    datasets: [
      {
        label: "# premium",
        data: ab,
        backgroundColor: [
          "rgba(255, 99, 132)",
          "rgba(54, 162, 235)",
          "rgba(255, 206, 86)",
          "rgba(75, 192, 192)",
          "rgba(153, 102, 255)",
          "rgba(25, 159, 64)",
          "rgba(221, 159, 64)",
          "rgba(55, 159, 64)",
          "rgba(255, 19, 64)",
          "rgba(255, 159, 4)",
        ],
        borderColor: [
          "rgba(255, 99, 132)",
          "rgba(54, 162, 235)",
          "rgba(255, 206, 86)",
          "rgba(75, 192, 192)",
          "rgba(153, 102, 255)",
          "rgba(25, 159, 64)",
          "rgba(221, 159, 64)",
          "rgba(55, 159, 64)",
          "rgba(255, 19, 64)",
          "rgba(255, 159, 4)",
        ],
        borderWidth: 1,
      },
    ],
  };
  const data2 = {
    labels: [
      "ICICI Lombard General Insurance Co. Ltd.",
      "Magma HDI General Insurance Company Limited",
      "Reliance General Insurance Co. Ltd.",
      "Royal Sundaram Alliance Insurance Co. Ltd.",
      "SBI General Insurance Company Limited",
      "Shriram General Insurance Company Limited",
      "Tata AIG General Insurance Co. Ltd.",
      "The New India Assurance Co. Ltd.",
      "Kotak Mahindra General Insurance Company Limited",
      "Go Digit General Insurance Limited",
    ],
    datasets: [
      {
        label: "# of policies",
        data: [
          sheetdata[0]["Total no.of police"],
          sheetdata[1]["Total no.of police"],
          sheetdata[2]["Total no.of police"],
          sheetdata[3]["Total no.of police"],
          sheetdata[4]["Total no.of police"],
          sheetdata[5]["Total no.of police"],
          sheetdata[6]["Total no.of police"],
          sheetdata[7]["Total no.of police"],
          sheetdata[8]["Total no.of police"],
          sheetdata[9]["Total no.of police"],
        ],
        backgroundColor: [
          "rgba(255, 99, 132)",
          "rgba(54, 162, 235)",
          "rgba(255, 206, 86)",
          "rgba(75, 192, 192)",
          "rgba(153, 102, 255)",
          "rgba(25, 159, 64)",
          "rgba(221, 159, 64)",
          "rgba(55, 159, 64)",
          "rgba(255, 19, 64)",
          "rgba(255, 159, 4)",
        ],
        borderColor: [
          "rgba(255, 99, 132)",
          "rgba(54, 162, 235)",
          "rgba(255, 206, 86)",
          "rgba(75, 192, 192)",
          "rgba(153, 102, 255)",
          "rgba(25, 159, 64)",
          "rgba(221, 159, 64)",
          "rgba(55, 159, 64)",
          "rgba(255, 19, 64)",
          "rgba(255, 159, 4)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="w-full bg-back">
      <div className="pl-10 pr-10">
        <h3 className="pl-10  text-xl font-bold">Reports</h3>
        <div className=" flex justify-around ">
          <div className="space-x-2 justify-end">
            <div className="flex flex-col w-10/12">
              {/* type of report */}
              <select
                className="dropdown-toggle px-6 py-2.5 bg-gray mt-8 text-black font-medium text-m rounded  shadow-md focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg  flex items-center  whitespace-nowrap"
                value={report}
                onChange={handleOnChangee}
              >
                <option value="selectchart">Select Type Of Report</option>
                <option value="Insurance company wise premium">
                  Insurance company wise premium
                </option>
                <option value="Client wise premium">Client wise premium</option>
                {/* <option value="Linewise premium">Linewise premium</option>
                <option value="Insurance company line wise no of policies">
                  Insurance company line wise no of policies
                </option>
                <option value="Productwise report">Productwise report</option>
                <option value="Linewise commision received">
                  Linewise commision received
                </option>
                <option value="Insurance compnay wise ">
                  Insurance compnay wise{" "}
                </option> */}
              </select>
              {/* timeframe*/}
              {report!==''&&<select
                className=" px-6 py-2.5 bg-gray mt-8 text-black font-medium text-m rounded  shadow-md focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg  flex items-center  whitespace-nowrap"
                value={mode}
                onChange={handleOnMode}
              >
                <option value="selectchart">Select Timeframe</option>
                <option value="timeframe">Timeframe</option>
                <option value="monthly">Monthly</option>
                <option value="custom">Custom</option>
              </select>}
              {/* custom date picker */}
              {custom && (
                <div className="flex">
                  <div className="flex flex-col mr-10 mt-6">
                    <label>From</label>
                    <DatePicker
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      className="p-2 bg-gray text-hero shadow flex justify-center items-center"
                    />
                  </div>
                  <div className="flex flex-col mt-6">
                    <label>To</label>
                    <DatePicker
                      selected={endDate}
                      onChange={(date) => setEndDate(date)}
                      className="p-2 bg-gray text-hero shadow flex justify-center items-center"
                    />
                  </div>
                </div>
              )}
                  {monthly && (
                <div className="flex w-auto">
                  <select
                    className="px-6 p-2 mr-2 py-2.5 bg-gray mt-8 text-black font-medium text-m rounded  focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg  flex items-center  whitespace-nowrap"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                  >
                    <option value="">Year</option>
                    <option value="2023">2023</option>
                    <option value="2022">2022</option>
                    <option value="2021">2021</option>
                    <option value="2020">2020</option>
                  </select>
                  <select
                    className="dropdown-toggle px-6 py-2.5 bg-gray mt-8 text-black font-medium text-m rounded  focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg  flex items-center  whitespace-nowrap"
                    value={option1}
                    onChange={(e) => setOption1(e.target.value)}
                  >
                    <option value="">Select</option>
                    <option value="M1">M1</option>
                    <option value="M2">M2</option>
                    <option value="M3">M3</option>
                    <option value="M4">M4</option>
                    <option value="M5">M5</option>
                    <option value="M6">M6</option>
                    <option value="M7">M7</option>
                    <option value="M8">M8</option>
                    <option value="M9">M9</option>
                    <option value="M10">M10</option>
                    <option value="M11">M11</option>
                    <option value="M12">M12</option>
                  </select>
                
                </div>
              )}
              {timeframe && (
                <div className="flex w-auto">
                  <select
                    className="px-6 p-2 mr-2 py-2.5 bg-gray mt-8 text-black font-medium text-m rounded  shadow-md focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg  flex items-center  whitespace-nowrap"
                    value={year}
                    onChange={handleOnYear}
                  >
                    <option value="">Year</option>
                    <option value="2023">2023</option>
                    <option value="2022">2022</option>
                    <option value="2021">2021</option>
                    <option value="2020">2020</option>
                  </select>
                  <select
                    className="dropdown-toggle px-6 py-2.5 bg-gray mt-8 text-black font-medium text-m rounded  shadow-md focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg  flex items-center  whitespace-nowrap"
                    value={option1}
                    onChange={handleOnOption}
                  >
                    <option value="">Select</option>
                    <option value="Q1">Q1</option>
                    <option value="Q2">Q2</option>
                    <option value="Q3">Q3</option>
                    <option value="Q4">Q4</option>
                    <option value="H1">H1</option>
                    <option value="H2">H2</option>
                    <option value="YEARLY">Yearly</option>
                  </select>
                </div>
              )}
            </div>
          </div>

          <div className="">
            {mode!==''&&<select
              className="dropdown-toggle px-6 py-2.5 bg-gray mt-8 text-black font-medium text-m rounded  shadow-md focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg  flex items-center  whitespace-nowrap"
              value={chart}
              onChange={handleOnChange}
            >
              <option value="selectchart">Select Chart</option>
              <option value="pie">pie</option>
              <option value="bar">Bar</option>
              <option value="table">Table</option>
            </select>}
            {chart!=='selectchart'&&<select
              className="dropdown-toggle px-6 py-2.5 bg-gray  mt-8 text-black font-medium text-m rounded  shadow-md focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg  flex items-center  whitespace-nowrap"
              value={download}
              onChange={handleOnChangeee}
            >
              <option value="selectchart">Select Type</option>
              <option value="pdf">Pdf</option>
              <option value="excel">Excel</option>
              <option value="word">Word</option>
            </select>}
            {download!=='Select Type'&&<button
              className="p-2 h-10 mt-[10px] mb-4 bg-gray shadow-md"
              onClick={handlessuumm}
            >
              Download
            </button>}{" "}
          </div>
        </div>
        {insu && (
          <div>
            {pieContentVisible && (
              <Piechart
                mode={mode}
                year={year}
                timeFrameOrMonth={option1}
                startDate={startDate}
                endDate={endDate}
              ></Piechart>
            )}
            {barContentVisible && (
              // <div>
              //   <Bar options={optionsinsbar} data={datains} />
              // </div>
              <Barchart
                mode={mode}
                year={year}
                timeFrameOrMonth={option1}
                startDate={startDate}
                endDate={endDate}
              ></Barchart>
            )}
            {tableContentVisible  && (
              <Table
                mode={mode}
                year={year}
                loadingData={showLoading}
                xlDatas={xldata}
                timeFrameOrMonth={option1}
                startDate={startDate}
                endDate={endDate}
                ids='table'  isSticky={isSticky} handleTableIntersection={handleTableIntersection}
              />
            )}

                {/* -------------------------------  Section For Preview Start Here ------------------------------- */}

           
          </div>
        )}
       
      </div>
    </div>
  );
};

export default Reportss;
