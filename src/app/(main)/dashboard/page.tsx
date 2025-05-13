"use client";
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { Form } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import RangePickerCustom from "@/components/Date/RangePickerCustom";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Dashboard = () => {
  const labels = ["Shopee", "Lazada", "Other"];
  const datasets = [820, 600, 700];
  const data = {
    labels: labels,
    datasets: [
      {
        // Title of Graph
        label: "Profit",
        data: datasets,
        backgroundColor: ["#FF6633", "#0D1274", "#6E6E6E"],
        borderColor: ["#FF6633", "#0D1274", "#6E6E6E"],
        borderWidth: 1,
        barPercentage: 1,
        barThickness: 50, 
        categoryPercentage: 0.6,
      },
    ],
  };
  const options = {
    maintainAspectRatio: false,
    scales: {
      y: {
        title: {
          display: true,
        },
        display: true,
        beginAtZero: true,
      },
      x: {
        title: {
          display: true,
        },
        display: true,
      },
    },
  };
  return (
    <div className="w-full flex-col flex  h-full">
      <Form>
        
      </Form>
      <div className="flex items-center justify-center px-5 py-10 h-[500px]">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default Dashboard;
