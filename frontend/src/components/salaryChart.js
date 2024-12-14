import React, { useEffect, useRef } from "react";
import { Chart, LineController, LineElement, PointElement, LinearScale, Title, CategoryScale, Tooltip } from "chart.js";

Chart.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale, Tooltip);

const SalaryLineChart = ({ payrolls, users }) => {
  const chartRef = useRef(null); // Reference to the canvas
  const chartInstanceRef = useRef(null); // Reference to the Chart.js instance

  useEffect(() => {
    if (!payrolls || !users || !chartRef.current) return;

    // Calculate total salary for each month
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    const salaryData = months.map((month) => {
      const payrollEntry = payrolls.find((entry) => entry.month === month);
      if (!payrollEntry) return 0;

      return payrollEntry.employees.reduce((total, employeeId) => {
        const user = users.find((user) => user._id === employeeId);
        return total + (user ? user.salary : 0);
      }, 0);
    });

    // Destroy existing chart instance if it exists
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    // Create a new chart instance
    const ctx = chartRef.current.getContext("2d");
    chartInstanceRef.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: months,
        datasets: [
          {
            label: "Total Salary Over Months",
            data: salaryData,
            borderColor: "rgba(255, 99, 132, 1)", // Pinkish red
            backgroundColor: "rgba(255, 99, 132, 0.2)", // Transparent fill
            borderWidth: 2,
            tension: 0.2, // Smooth the line
            pointRadius: 2, // Hide points for a cleaner line
            pointBackgroundColor: "rgba(75, 192, 192, 1)",
            pointBorderColor: "rgba(75, 192, 192, 1)",
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          title: {
          display: true,
          text: 'Salary Progression',
        },
          tooltip: {
            callbacks: {
              label: (context) => `Ksh ${context.raw.toLocaleString()}`,
            },
          },
        },
  
        scales: {
          y: {
            
            ticks: {
              callback: (value) => `Ksh ${value.toLocaleString()}`,
            },
          },
        },
      },
    });

    // Cleanup on component unmount
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
        chartInstanceRef.current = null;
      }
    };
  }, [payrolls, users]);

  return <canvas ref={chartRef} width={400} height={200}></canvas>;
};

export default SalaryLineChart;
