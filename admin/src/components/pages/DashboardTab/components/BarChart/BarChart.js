import React from "react";
// import ApexCharts from "apexcharts";
import Chart from "react-apexcharts";
import styles from "./BarChart.module.css";

const BarChart = ({ title, categories, data, className, opposite }) => {
  const options = {
    title: {
      text: title,
      align: "left",
    },
    chart: {
      height: 350,
      zoom: {
        enabled: false,
      },
      brush: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories: categories,
      tooltip: {
        enabled: false,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: true,
      },
    },
    stroke: {
      curve: "smooth",
      colors: ["#FF7152"],
      width: 2,
    },
    dataLabels: {
      enabled: false,
    },
    fill: {
      colors: ["#FF7152"],
    },
    noData: {
      text: "Loading...",
      align: "center",
      verticalAlign: "middle",
      offsetX: 0,
      offsetY: 0,
    },
    yaxis: {
      opposite: opposite ? opposite : false,
      axisTicks: {
        show: false,
      },
      labels: {
        style: {
          colors: ["#969BA6"],
        },
        offsetX: -10,
        show: true,
      },
    },
    legend: {
      horizontalAlign: "left",
    },
    grid: {
      show: true,
    },
  };
  const series = [data];

  return (
    <div className={`${styles.chartWrap} ${className}`}>
      <div id="chart" className={`${styles.chart} dashboard-chart-bar`}>
        <Chart options={options} series={series} type={"bar"} />
      </div>
    </div>
  );
};

export default BarChart;
