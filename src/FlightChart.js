import React from "react";
import { Line } from "react-chartjs-2";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const FlightTable = ({ flights, checkButton }) => {
  const seasonalTicketCounts = {};
  const dailyTicketCounts = {};
  const routeTicketCounts = {};
  const routeCounts = {};

  const getSeason = (month) => {
    if (month >= 3 && month <= 5) return "Весна";
    if (month >= 6 && month <= 8) return "Лето";
    if (month >= 9 && month <= 11) return "Осень";
    return "Зима";
  };

  flights.forEach((flight) => {
    const date = new Date(flight.departureDate);
    const month = date.getMonth() + 1;
    const day = date.toLocaleDateString();

    const season = getSeason(month);

    routeCounts[flight.route] = routeCounts[flight.route] || 0;
    dailyTicketCounts[day] = (dailyTicketCounts[day] || 0) + flight.ticketCount;
    seasonalTicketCounts[season] =
      (seasonalTicketCounts[season] || 0) + flight.ticketCount;
    routeTicketCounts[flight.route] =
      (routeTicketCounts[flight.route] || 0) + flight.ticketCount;
  });

  let chartData = { labels: [], datasets: [] };
  let chartTitle = "";

  if (checkButton === "general") {
    chartData = {
      labels: Object.keys(dailyTicketCounts).sort(),
      datasets: [
        {
          label: "Количество проданных билетов",
          data: Object.values(dailyTicketCounts).sort(),
          borderColor: "rgba(54, 162, 235, 1)",
          tension: 0.4,
          fill: false,
        },
      ],
    };
    chartTitle = "Продажи билетов по дням";
  } else if (checkButton === "routes") {
    chartData = {
      labels: Object.keys(routeCounts),
      datasets: [
        {
          label: "Количество проданных билетов",
          data: Object.values(routeTicketCounts),
          borderColor: "rgba(54, 162, 235, 1)",
          tension: 0.4,
          fill: false,
        },
      ],
    };
    chartTitle = "Продажи билетов по временам года";
  } else if (checkButton === "seasons") {
    chartData = {
      labels: Object.keys(seasonalTicketCounts),
      datasets: [
        {
          label: "Количество проданных билетов",
          data: Object.values(seasonalTicketCounts),
          borderColor: "rgba(54, 162, 235, 1)",
          tension: 0.4,
          fill: false,
        },
      ],
    };
    chartTitle = "Продажи билетов по маршрутам";
  }

  const options = {
    scales: {
      y: {
        type: "linear",
        beginAtZero: true,
      },
      x: {
        type: "category",
      },
    },
    plugins: {
      title: {
        display: true,
        text: chartTitle,
      },
    },
  };

  return (
    <div class="graph">
      <Line data={chartData} options={options} />
    </div>
  );
};

export default FlightTable;
