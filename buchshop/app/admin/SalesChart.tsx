"use client";
 
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
} from "chart.js";
 
import { Bar } from "react-chartjs-2";
 
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);
 
export default function SalesChart({ data, range }: any) {
 
  let labels: any[] = [];
 
  if (range === "day") {
    labels = data.map((d: any) => d.label + ":00");
  }
 
  if (range === "week") {
    labels = ["Mo","Di","Mi","Do","Fr","Sa","So"];
  }
 
  if (range === "month") {
    labels = ["W1","W2","W3","W4","W5"];
  }
 
  if (range === "year") {
    labels = [
      "Jan","Feb","Mär","Apr","Mai","Jun",
      "Jul","Aug","Sep","Okt","Nov","Dez"
    ];
  }
 
  const chartData = {
    labels,
    datasets: [
      {
        label: "Verkäufe",
        data: data.map((d: any) => d.verkauft),
        backgroundColor: "#16a34a",
        borderRadius: 6
      }
    ]
  };
 
  const options = {
    responsive: true,
    plugins: {
      legend: { display: false }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };
 
  return (
<div className="bg-white p-6 rounded shadow">
<h2 className="text-xl font-bold mb-4">
        Verkäufe im Zeitraum
</h2>
<Bar data={chartData} options={options}/>
</div>
  );
}