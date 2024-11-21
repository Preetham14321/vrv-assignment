import React from "react";
import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

import axios from "axios";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Barchart = ({ mode, year, timeFrameOrMonth, startDate, endDate }) => {
  const name = JSON.parse(localStorage.getItem("namee"));
  const Password = JSON.parse(localStorage.getItem("pwd"));
  const API_ENDPOINT = process.env.REACT_APP_API_URL;
  const [xldata, setXldata] = useState([]);
  useEffect(() => {
    axios
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
  }, []);
  let rupee = new Intl.NumberFormat("en-IN", {
    currency: "INR",
  });

  console.log(mode, year, timeFrameOrMonth, startDate, endDate);
  const sdata = xldata;
  console.warn(sdata);
  const datainsu = sdata.reduce(
    (
      datainsurer,
      { insurer, lineOfBusiness, numberOfPolicies, totalPremium }
    ) => {
      if (!datainsurer[insurer]) datainsurer[insurer] = [];
      datainsurer[insurer].push(totalPremium);
      return datainsurer;
    },
    {}
  );
  const datalob = sdata.reduce(
    (
      datainsurer,
      { insurer, lineOfBusiness, numberOfPolicies, totalPremium }
    ) => {
      if (!datainsurer[lineOfBusiness]) datainsurer[lineOfBusiness] = [];
      datainsurer[lineOfBusiness].push(numberOfPolicies);
      return datainsurer;
    },
    {}
  );
  const datatotpre = sdata.reduce(
    (
      datainsurer,
      { insurer, lineOfBusiness, numberOfPolicies, totalPremium }
    ) => {
      if (!datainsurer[lineOfBusiness]) datainsurer[lineOfBusiness] = [];
      datainsurer[lineOfBusiness].push(totalPremium);
      return datainsurer;
    },
    {}
  );

  const propertyNames = Object.keys(datainsu);
  const entries = Object.entries(datainsu);
  const lob = Object.entries(datalob);
  const premium = Object.entries(datatotpre);
  // Object.entries(cats).forEach(([key, value]) => {
  //   console.warn(`${key}: ${value}`);

  // });
  console.warn(entries, lob, premium);

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
  const insurername = [];
  const totalpremium = [];
  const lineofbusiness = [];
  const lobvalues = [];
  s.map((data) => insurername.push(data[0]));
  s.map((data) => totalpremium.push(data[1]));
  lob.map((data) => lineofbusiness.push(data[0]));
  lob.flatMap((data) => lobvalues.push(data[1]));
  console.warn(lobvalues);
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
  const databar = {
    labels: insurername,
    datasets: [
      {
        label: "#premium",
        data: totalpremium,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  const tableRows = lineofbusiness.map((name, index) => (
    <tr key={index}>
      <td className="pr-2">{name}</td>
    </tr>
  ));
  const table = insurername.map((name, index) => (
    <tr key={index}>
      <td className="pr-2">{name}</td>
    </tr>
  ));
  return (
    <div className="">
      <Bar options={optionsbar} data={databar} className="pl-32" />
    </div>
  );
};

export default Barchart;
