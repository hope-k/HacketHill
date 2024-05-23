import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';
import getSymbolFromCurrency from 'currency-symbol-map';
import accounting from 'accounting';

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

const ExpenseChart = ({ stats, currency }) => {
    const currencySymbol = (currentCurrency) => {
        if (currentCurrency) {
          return getSymbolFromCurrency(currentCurrency);
        } else {
          return getSymbolFromCurrency("usd");
        }
      };
    const data = {
        labels: stats && stats.map(stat => stat?.expense?.year),
        datasets: [
            {
                label: `Expense Metrics ( ${accounting.formatMoney(
                    stats && stats.reduce((acc, curr) => acc + curr?.income?.amount, 0), currencySymbol(currency)
                )})`,                fill: true,
                lineTension: 0.4,
                backgroundColor: 'rgba(252, 3, 3, 0.2)',
                borderColor: 'rgba(252, 3, 3, 0.6)',
                hoverBorderColor: 'rgba(252, 3, 3, 0.8)',
                data: stats && stats.map(stat => stat?.expense?.amount),
                borderWidth: 0.2,
                hoverBorderWidth: 2,
                pointHoverRadius: 4,
                pointRadius: 3,
                pointBackgroundColor: 'rgba(252, 3, 3, 0.1)',
                pointBorderColor: 'rgba(252, 3, 3, 0.1)',
                pointHoverBackgroundColor: 'rgba(252, 3, 3, 1)',
                pointHoverBorderColor: 'rgba(252, 3, 3, 1)',
            }
        ]
    };

    // 'rgba(252, 3, 3, 0.6)'

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                align: 'center',
                labels: {
                    usePointStyle: true,
                    pointStyle: 'circle',
                    font: {
                        size: 10,
                        family: 'Poppins',
                        weight: '500',
                    },
                    color: '#333',
                },
            },
            tooltip: {
                backgroundColor: 'rgba(252, 3, 3, 0.8)',
                titleFont: {
                    size: 12,
                    family: 'Poppins',
                    weight: '500',
                },
                bodyFont: {
                    size: 12,
                    family: 'Poppins',
                    weight: '400',
                },
                footerFont: {
                    size: 10,
                    family: 'Poppins',
                    weight: '300',
                },
            },
        
        },
        interaction: {
            mode: 'index',
            intersect: false,
        },
        scales: {
            x: {
                ticks: {
                    color: '#333',
                    font: {
                        family: 'Poppins',
                        size: 12,
                        weight: '300',
                    },
                },
                grid: {
                    display: false,
                },
            },
            y: {
                ticks: {
                    color: '#333',
                    font: {
                        family: 'Poppins',
                        size: 12,
                        weight: '300',
                    },
                },
                grid: {
                    borderDash: [3, 3],
                    color: 'rgba(0, 0, 0, 0.0)',
                },
            },
        },
    };

    return (
        <div>
            <Line data={data} options={options} />
        </div>
    );
}

export default ExpenseChart;
