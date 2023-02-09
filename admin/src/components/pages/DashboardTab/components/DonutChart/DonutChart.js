import React from "react";
import styles from "./DonutChart.module.css";
import Chart from "react-apexcharts";

const DonutChart = ({ data, labels }) => {
  const options = {
    series: data,
    labels: labels,
    chart: {
      type: "donut",
    },
    legend: {
      position: "top",
      horizontalAlign: "center",
    },
    breakpoint: 480,
    responsive: [{}],
  };
  return (
    <div className={`donut-chart ${styles.donutChart}`}>
      <Chart options={options} series={options.series} type="donut" />
    </div>
  );
};

export default DonutChart;
