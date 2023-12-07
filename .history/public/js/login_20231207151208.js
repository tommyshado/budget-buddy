document.querySelector(".loginForm").addEventListener("submit", function(event) {
    event.preventDefault();

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

            // Consider more secure storage options for the token
            localStorage.setItem("data", JSON.stringify({ token, userId: loggedUserId }));

            // Redirect or update UI upon successful login
            // window.location.href = 'path_to_redirect';
        })
        .catch(err => {
            message.textContent = "An error occurred during login.";
            message.classList.add("alert", "alert-danger");
            console.error(err);
        });
});
