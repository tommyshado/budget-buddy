document.addEventListener('DOMContentLoaded', function () {
    const signupForm = document.querySelector('.signupForm');
    signupForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        const formData = new FormData(signupForm);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await axios.post('/api/signup/', data);
            if (response.status === 201) {
                // Redirect to insights.html on successful signup
                window.location.href = 'insights.html';
            } else {
                // Handle any other HTTP status codes as errors
                displayError('Signup failed. Please try again.');
            }
        } catch (error) {
            // Handle network error or server error response
            displayError(error.response ? error.response.data.error : 'Network error. Please try again.');
        }
    });
});

function displayError(message) {
    const messageDiv = document.querySelector('.message');
    messageDiv.textContent = message;
    messageDiv.classList.add('alert', 'alert-danger');
}
