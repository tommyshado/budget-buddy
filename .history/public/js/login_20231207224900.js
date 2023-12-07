document.querySelector(".loginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const usernameOrEmail = document.querySelector(".loginForm input[name='usernameOrEmail']");
    const password = document.querySelector(".loginForm input[name='password']");
    const message = document.querySelector(".message");

    const user = {
        usernameOrEmail: usernameOrEmail.value,
        password: password.value
    };
    axios.post("/api/login/user", user)
    .then(result => {
        const { error, token, loggedUserId } = result.data;

        if (error) {
            message.textContent = error;
            message.classList.add("alert", "alert-danger");
            setTimeout(() => message.textContent = "", 3000);
            return;
        }

        // Store token in localStorage
        localStorage.setItem("data", JSON.stringify({ token, userId: loggedUserId }));

        // Redirect to insights.html upon successful login
        window.location.href = 'insights.html';
    })
    .catch(err => {
        message.textContent = "An error occurred during login.";
        message.classList.add("alert", "alert-danger");
        console.error(err);
    });

});
