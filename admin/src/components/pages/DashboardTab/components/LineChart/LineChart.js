import React from "react";
// import ApexCharts from "apexcharts";
import Chart from "react-apexcharts";
import styles from "./LineChart.module.css";

const LineChart = ({ title, categories, data, className, opposite }) => {
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
    markers: {
      size: 0,
      colors: "#FF7152",
      strokeColors: "#FF7152",
      strokeWidth: 15,
      strokeOpacity: 0.6,
      strokeDashArray: 0,
      fillOpacity: 1,
      hover: {
        size: 5,
      },
    },
    dataLabels: {
      enabled: false,
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
      <div id="chart" className={`${styles.chart} dashboard-chart`}>
        <Chart options={options} series={series} type={"line"} />
      </div>
    </div>
  );
};

export default LineChart;
