axios.get("/api/categories").then((result) => {
    console.log(result.data.data);
    const pieData = {
        labels: result.data.data.map((item) => item.category_type),
        datasets: [
            {
                data: result.data.data.map((item) => item.product_count),
                backgroundColor: ["yellow", "purple", "pink", "green"],
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
}).catch((error) => {
    console.error("Error fetching categories:", error);
});

// *******************************************************

axios.get('/api/products/user', {
    headers: {
        'Authorization': `Bearer ${YOUR_USER_TOKEN}` // Replace with actual token retrieval logic
    }
}).then((response) => {
    const userProducts = response.data.data;
    console.log(userProducts);

    updateBarChart(userProducts);
}).catch((error) => {
    console.error("Error fetching user products:", error);
});

function updateBarChart(userProducts) {
    const data = {
        labels: userProducts.map(product => product.product),
        datasets: [
            {
                label: "Product Prices",
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
                data: userProducts.map(product => product.price)
            },
        ],
    };

    const options = {
        scales: {
            x: {
                beginAtZero: true,
            },
            y: {
                beginAtZero: true,
            },
        },
        indexAxis: "y",
    };

    var ctx = document.getElementById("sidewaysBarChart").getContext("2d");
    var sidewaysBarChart = new Chart(ctx, {
        type: "bar",
        data: data,
        options: options,
    });
}
