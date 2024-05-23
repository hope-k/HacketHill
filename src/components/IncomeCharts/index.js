import React from "react";
import { Line } from "react-chartjs-2";
import getSymbolFromCurrency  from "currency-symbol-map";
import accounting from "accounting";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);


const IncomeCharts = ({ stats, currency }) => {
    const currencySymbol = (currentCurrency) => {
        if (currentCurrency) {
          return getSymbolFromCurrency(currentCurrency);
        } else {
          return getSymbolFromCurrency("usd");
        }
      };
  const state = {
    labels: stats && stats.map((stat) => stat?.income?.year),

    datasets: [
      {
        label: `Investment Metrics ( ${accounting.formatMoney(
            stats && stats.reduce((acc, curr) => acc + curr?.income?.amount, 0), currencySymbol(currency)
        )})`,
        fill: true,
        lineTension: 0.4,
        backgroundColor: "rgba(0, 128, 128, 0.2)",
        borderColor: "rgba(0, 128, 128, 0.2)",
        borderWidth: 0.2,
        hoverBorderWidth: 2,
        pointHoverRadius: 4,
        pointRadius: 3,
        hoverBorderColor: "rgba(0, 128, 128, 1)",
        data: stats && stats.map((stat) => stat?.income?.amount),
        pointBackgroundColor: "rgba(0, 128, 128, 0.1)",
        pointBorderColor: "rgba(0, 128, 128, 1)",
        pointHoverBackgroundColor: "rgba(0, 128, 128, 1)",
      },

    ],
    
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        align: "center",
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
          font: {
            size: 10,
            family: "Poppins",
            weight: "500",
          },
          color: "#333",
        },
      },
      tooltip: {
        backgroundColor: "rgba(0, 128, 128, 0.8)",
        titleFont: {
          size: 12,
          family: "Poppins",
          weight: "500",
        },
        bodyFont: {
          size: 12,
          family: "Poppins",
          weight: "400",
        },
        footerFont: {
          size: 10,
          family: "Poppins",
          weight: "300",
        },
      },
    },
    interaction: {
      mode: "index",
      intersect: false,
    },
    scales: {
      x: {
        ticks: {
          color: "#333",
          font: {
            family: "Poppins",
            size: 12,
            weight: "300",
          },
        },
        grid: {
          display: false,
        },
      },
      y: {
        ticks: {
          color: "#333",
          font: {
            family: "Poppins",
            size: 12,
            weight: "300",
          },
        },
        grid: {
          borderDash: [3, 3],
          color: "rgba(0, 0, 0, 0.0)",
        },
      },
    },
  };
  return (
    <div>
      <Line  data={state} options={options} />
    </div>
  );
};

export default IncomeCharts;
