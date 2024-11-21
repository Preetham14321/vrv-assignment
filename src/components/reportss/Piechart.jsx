import React from "react";
import { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import axios from "axios";

ChartJS.register(ArcElement, Tooltip, Legend);
const Piechart = ({ mode, year, timeFrameOrMonth, startDate, endDate }) => {
  const [xldata, setXldata] = useState([]);
  const name = JSON.parse(localStorage.getItem("namee"));
  const Password = JSON.parse(localStorage.getItem("pwd"));
  const API_ENDPOINT = process.env.REACT_APP_API_URL;
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

  const sdata = xldata;
  const datainsu = sdata.reduce(
    (
      datainsurer,
      { insurer, lineOfBusiness, numberOfPolicies, totalPremium }
    ) => {
      if (!datainsurer[insurer]) datainsurer[insurer] = [];
      datainsurer[insurer].push(numberOfPolicies);
      return datainsurer;
    },
    {}
  );
  const entries = Object.entries(datainsu);
  var s = [];
  for (let i = 0; i < entries.length; i++) {
    let temp = [];
    let sum = 0;
    const values = entries[i][1];

    for (let j = 0; j < values.length; j++) {
      sum += Number(values[j]);
    }
    temp.push(entries[i][0]);
    temp.push(sum);
    s.push(temp);
  }
  const premium = sdata.reduce(
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
  const premiumentires = Object.entries(premium);
  var pre = [];
  for (let i = 0; i < premiumentires.length; i++) {
    let temp = [];
    let sum = 0;
    const values = premiumentires[i][1];

    for (let j = 0; j < values.length; j++) {
      sum += Number(values[j]);
    }
    temp.push(premiumentires[i][0]);
    temp.push(sum);
    pre.push(temp);
  }
  const insurername = [];
  const totalpremium = [];
  s.map((data) => insurername.push(data[0]));
  s.map((data) => totalpremium.push(data[1]));

  const optionsinspie = {
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

  const data2 = {
    labels: insurername,
    datasets: [
      {
        label: "# of policies",
        data: totalpremium,
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
    <div>
      <div
        style={{ position: "relative", height: "80vh", width: "80vh" }}
        className="ml-96 mt-20"
      >
        {/* <h1 className='pl-10 mt-10 text-xl font-bold'>pie</h1> */}

        <Pie className=" " width={"30%"} data={data2} options={optionsinspie} />
      </div>
    </div>
  );
};

export default Piechart;
