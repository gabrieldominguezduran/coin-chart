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
import DeleteIcon from "@mui/icons-material/Delete";
import Tool from "@mui/material/Tooltip";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface chartObj {
  id: string;
  charts: [];
}

const CoinChart = () => {
  const { addedCoins, removeAddedCoin } = React.useContext(CoinsContext);
  const [charts, setCharts] = React.useState<chartObj[]>([]);
  const [addLabels, setAddLabels] = React.useState<string[]>([]);
  const [hasPeriod, setHasPeriod] = React.useState<string>("24h");

  React.useEffect(() => {
    if (addedCoins && addedCoins.length > 0) {
      addedCoins.forEach((coin) => fetchChart(hasPeriod, coin.id));
    }
  }, [addedCoins]);

  React.useEffect(() => {
    if (hasPeriod === "24h") {
      setAddLabels(labelsDay);
    }
    if (hasPeriod === "1w") {
      setAddLabels(labelsWeek);
    }
    if (hasPeriod === "1m") {
      setAddLabels(labelsMonth);
    }
  }, [hasPeriod]);

  const fetchChart = async (period: string, id: string) => {
    period = period === "" ? "24h" : period;
    if (charts.findIndex((chart) => chart.id === id) === -1) {
      try {
        const response = await fetch(
          `https://api.coinstats.app/public/v1/charts?period=${period}&coinId=${id}`
        );

        const data = await response.json();

        setCharts((prevCharts): chartObj[] => {
          return [...prevCharts, { id: id, charts: data.chart }];
        });
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Coin's Chart",
        color: "white",
      },
    },
  };

  const handleSetLables = (period: string) => {
    if (period === "day") {
      setHasPeriod("24h");
    }
    if (period === "week") {
      setHasPeriod("1w");
    }
    if (period === "month") {
      setHasPeriod("1m");
    }
  };

  const removeFromChart = (id: string) => {
    removeAddedCoin(id);
    setCharts((prevChart) => {
      return prevChart.filter((chart) => chart.id !== id);
    });
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

  let sets = charts.map((chart, i) => {
    let borColor = [
      "rgb(255, 99, 132)",
      "rgb(244, 244, 11)",
      "rgb(76, 244, 11)",
      "rgb(11, 124, 244 )",
      "rgb(244, 11, 234 )",
    ];
    let bacColor = [
      "rgba(255, 99, 132, 0.5)",
      "rgba(244, 244, 11, 0.5)",
      "rgba(76, 244, 11, 0.5)",
      "rgba(11, 124, 244, 0.5)",
      "rgba(244, 11, 234, 0.5)",
    ];

    return {
      label: chart.id,
      data: chart.charts.map((chart) => chart[1]),
      borderColor: borColor[i],
      backgroundColor: bacColor[i],
    };
  });

  const labels = addLabels;

  const data = {
    labels,
    datasets:
      sets && sets.length > 0
        ? sets
        : [
            {
              label: "",
              data: [],
              borderColor: "",
              backgroundColor: "",
            },
          ],
  };
  return (
    <div className="chart-container">
      <Line options={options} data={data} />
      <ButtonGroup
        sx={{
          display: "flex",
          justifyContent: "center",
          backgroundColor: "white",
          width: "fit-content",
          margin: "auto",
        }}
        variant="text"
        aria-label="text button group"
      >
        <Button onClick={() => handleSetLables("day")}>24H</Button>
        <Button onClick={() => handleSetLables("week")}>WEEK</Button>
        <Button onClick={() => handleSetLables("month")}>MONTH</Button>
      </ButtonGroup>
      <div className="chart-icons">
        {addedCoins.map((coin) => {
          return (
            <span key={coin.id} className="chart">
              <DeleteIcon
                onClick={() => removeFromChart(coin.id)}
                sx={{ width: "20px", height: "20px", cursor: "pointer" }}
              />
              <Tool title={coin.name}>
                <img src={coin.icon} alt="Coin Icon" className="chart__icon" />
              </Tool>
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default CoinChart;
