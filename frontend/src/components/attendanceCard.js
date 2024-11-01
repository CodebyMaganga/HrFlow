import { Card } from 'primereact/card';
import { useEffect, useState } from 'react';
import attendances from '../assets/attendance'
import { Chart } from 'primereact/chart';
import dayjs from 'dayjs';


const AttendanceCard = () =>{

    const [chartData, setChartData] = useState({});
const [chartOptions, setChartOptions] = useState({});

useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    // Helper function to convert time strings (HH:mm:ss) to decimal hours
    const timeToDecimalHours = (timeStr) => {
        const [hours, minutes, seconds] = timeStr.split(':').map(Number);
        return hours + minutes / 60 + seconds / 3600;
    };

    // Group attendance data by month
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    const monthlyCheckInData = new Array(12).fill(0);  // Array to store check-in times for each month
    const monthlyCheckOutData = new Array(12).fill(0); // Array to store check-out times for each month
    const attendanceCounts = new Array(12).fill(0);    // Count how many records per month

    attendances.forEach(attendance => {
        const monthIndex = dayjs(attendance.date).month(); // Get zero-based month index (0 = January)
        const checkInTime = timeToDecimalHours(attendance.checkIn);   // Convert check-in time to hours
        const checkOutTime = timeToDecimalHours(attendance.checkOut); // Convert check-out time to hours

        monthlyCheckInData[monthIndex] += checkInTime;
        monthlyCheckOutData[monthIndex] += checkOutTime;
        attendanceCounts[monthIndex] += 1;
    });

    // Calculate average check-in and check-out times per month
    const avgCheckInData = monthlyCheckInData.map((total, index) => total / (attendanceCounts[index] || 1));
    const avgCheckOutData = monthlyCheckOutData.map((total, index) => total / (attendanceCounts[index] || 1));

    const data = {
        labels: months, // Month labels
        datasets: [
            {
                label: 'Average Check In',
                data: avgCheckInData.slice(0, 7), // For months from January to July
                fill: false,
                borderColor: documentStyle.getPropertyValue('--blue-500'),
                tension: 0.8
            },
            {
                label: 'Average Check Out',
                data: avgCheckOutData.slice(0, 7), // For months from January to July
                fill: false,
                borderColor: documentStyle.getPropertyValue('--pink-500'),
                tension: 0.8
            }
        ]
    };

    const options = {
        maintainAspectRatio: false,
        aspectRatio: 0.9,
        plugins: {
            legend: {
                labels: {
                    color: textColor
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder
                }
            },
            y: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder
                }
            }
        }
    };

    setChartData(data);
    setChartOptions(options);
}, [attendances]);

    return (
        <>
        <div title="Simple Card" className='bg-white mt-10 w-full h-50px] rounded-lg'>
        <Chart type="line" data={chartData} options={chartOptions} className='h-40px' />
</div>
        </>
    )
}

export default AttendanceCard