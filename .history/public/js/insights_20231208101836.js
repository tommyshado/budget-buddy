axios.get("/api/categories").then((result) => {
    console.log(result.data.data)
    const pieData = {
        labels: result.data.data.map((item) => item.category_type),
        datasets: [
            {
                data: result.data.data.map((item) => item.product_count), // Sample quantities for each fruit
                backgroundColor: ["yellow", "purple", "pink", "green"], // Colors for each slice
            },
        ],
    };

    const pieConfig = {
        type: "pie",
        data: pieData,
        options: {
            plugins: {
                legend: {
                    position: "left", // Adjust legend position
                },
            },
        },
    };

    // Assuming you have a canvas element with an id "fruit-chart" in your HTML.
    const pieElem = document.getElementById("pie-chart").getContext("2d");
    const pieChart = new Chart(pieElem, pieConfig);



// *******************************************************

var data = {
    labels: result.data.data.map((item) => item.category_type),
    datasets: [
        {
            label: "Sideways Bar Graph",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
            data: result.data.data.map((item) => item.product_count)
        },
    ],
};

var options = {
    scales: {
        x: {
            beginAtZero: true,
        },
        y: {
            beginAtZero: true,
        },
    },
    indexAxis: "y", // This makes the chart horizontal
};

// Get the canvas element
var ctx = document.getElementById("sidewaysBarChart").getContext("2d");

// Create the sideways bar chart
var sidewaysBarChart = new Chart(ctx, {
    type: "bar",
    data: data,
    options: options,
});

axios.get('/api/products/user', {
    headers: {
        'Authorization': `Bearer ${YOUR_USER_TOKEN}` // Replace with actual token retrieval logic
    }
}).then((response) => {
    const userProducts = response.data.data;

    // Process the data for chart display
    updatePieChart(userProducts);
    updateBarChart(userProducts);
}).catch((error) => {
    console.error("Error fetching user products:", error);
});

});



