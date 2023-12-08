axios.get("/api/categories").then((result) => {
    console.log(result.data.data);
    const pieData = {
        labels: result.data.data.map((item) => item.category_type),
        datasets: [
            {
                data: result.data.data.map((item) => item.product_count),
                backgroundColor: ["yellow", "blue","purple", "red", "pink", "green","orange"]
            },
        ],
    };

    const pieConfig = {
        type: "pie",
        data: pieData,
        options: {
            plugins: {
                legend: {
                    position: "left",
                },
            },
        },
    };

    const pieElem = document.getElementById("pie-chart").getContext("2d");
    const pieChart = new Chart(pieElem, pieConfig);

    const barData = {
        labels: result.data.data.map((item) => item.category_type),
        datasets: [
            {
                data: result.data.data.map((item) => item.product_count),
                // backgroundColor: ["yellow", "purple", "pink", "green"],
            },
        ],
    };
    
    const barConfig = {
        type: "bar",
        data: barData,
        options: {
            scales: {
                x: {
                    beginAtZero: true
                },
                y: {
                    beginAtZero: true
                }
            },
            indexAxis: 'y', // This makes the chart horizontal
            plugins: {
                legend: {
                    position: "left",
                },
            },
        },
    };
    
    const barElem = document.getElementById("sidewaysBarChart").getContext("2d");
    const barChart = new Chart(barElem, barConfig);
}).catch((error) => {
    console.error("Error fetching categories:", error);
});

// *******************************************************

