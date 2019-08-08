const ctx = document.getElementById("myChart").getContext('2d');

const _chartCtrl = {
    addData: function(chart, chartData) {
        chart.data.datasets[0].data = chartData;
        chart.update();
    },
    myChart: new Chart(ctx, {
        type: 'pie',
        data: {
            labels: [
                "Surplus",
                "Bills",
                "Debt",
                "Groceries",
                "Prepared Food",
                "Entertainment",
                "Subscriptions",
                "Miscellaneous"
            ],
            datasets: [{
                label: "Expenses",
                data: [],
                backgroundColor: [
                    'rgba(68, 201, 50, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 159, 255, 1)'
                ],
                borderWidth: 0
            }]
        },
        options: {
            maintainAspectRatio: false,
        }
    })
};


export const chartCtrl = _chartCtrl;
