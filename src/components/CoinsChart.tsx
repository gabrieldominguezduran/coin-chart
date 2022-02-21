import * as React from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import CoinsContext from "../store/CoinsContext";
import { ButtonGroup } from "@mui/material";
import { Button } from "@material-ui/core";
import { setLabels } from "react-chartjs-2/dist/utils";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const CoinChart = () => {
  const { addedCoins } = React.useContext(CoinsContext);
  const [chartData, setChartData] = React.useState([]);
  const [addLabels, setAddLabels] = React.useState<string[]>([]);
  const [hasPeriod, setHasPeriod] = React.useState<string>("24h");
  console.log(addedCoins, "ADD");

  React.useEffect(() => {
    if (addedCoins && addedCoins.length > 0) {
      addedCoins.forEach((coin) => fetchChart(hasPeriod, coin.id));
      setAddLabels(labelsDay);
    }
  }, [hasPeriod]);

  const fetchChart = async (period: string = "24h", id: string) => {
    try {
      const response = await fetch(
        `https://api.coinstats.app/public/v1/charts?period=${period}&coinId=${id}`
      );
      const data = await response.json();
      setChartData(data.chart);
    } catch (error) {
      console.log("error", error);
    }
  };
  console.log(chartData, "CHART");

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Coin's Chart",
      },
    },
  };

  const handleSetLables = (label: string) => {
    if (label === "day") {
      setAddLabels(labelsDay);
      setHasPeriod("24h");
    }
    if (label === "week") {
      setAddLabels(labelsWeek);
      setHasPeriod("1w");
    }
    if (label === "month") {
      setAddLabels(labelsMonth);
      setHasPeriod("1m");
    }
  };

  const labelsDay = [
    "00:00",
    "01:00",
    "02:00",
    "03:00",
    "04:00",
    "05:00",
    "06:00",
    "07:00",
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00",
    "23:00",
    "24:00",
  ];

  const labelsWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const labelsMonth = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const labels = addLabels;

  const data = {
    labels,
    datasets: [
      {
        label: addedCoins[0] ? addedCoins[0].name : "None added",
        data: chartData.map((coin) => coin[1]),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  return (
    <div className="chart-container">
      <Line options={options} data={data} />
      <ButtonGroup
        sx={{ display: "flex", justifyContent: "center" }}
        variant="text"
        aria-label="text button group"
      >
        <Button onClick={() => handleSetLables("day")}>24H</Button>
        <Button onClick={() => handleSetLables("week")}>WEEK</Button>
        <Button onClick={() => handleSetLables("month")}>MONTH</Button>
      </ButtonGroup>
    </div>
  );
};

export default CoinChart;
