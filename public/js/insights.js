axios.get("http://localhost:3000/api/products").then((result) => {
    const pieData = {
        labels: result.data.data.map((item) => item.product),
        datasets: [
            {
                data: result.data.data.map((item) => item.price), // Sample quantities for each fruit
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
    labels: result.data.data.map((item) => item.product),
    datasets: [
        {
            label: "Sideways Bar Graph",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
            data: result.data.data.map((item) => item.price),
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

});

