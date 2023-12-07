document.addEventListener('DOMContentLoaded', function () {
    const signupForm = document.querySelector('.signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            const formData = new FormData(signupForm);
            const data = Object.fromEntries(formData.entries());

            console.log('Form data:', data); // Log form data

            try {
                const response = await axios.post('/api/signup/user', data); // Make sure the URL matches your API endpoint
                console.log('Response:', response); // Log response

                if (response.status === 201) {
                    // Redirect to insights.html on successful signup
                    window.location.href = 'insights.html';
                } else {
                    // Handle any other HTTP status codes as errors
                    displayError('Signup failed. Please try again.');
                }
            } catch (error) {
                // Log error details
                console.error('Error:', error.response ? error.response.data : error.message);
                // Handle network error or server error response
                displayError(error.response ? error.response.data.error : 'Network error. Please try again.');
            }
        });
    } else {
        console.error('Signup form not found');
    }
});

function displayError(message) {
    const messageDiv = document.querySelector('.message');
    messageDiv.textContent = message;
    messageDiv.classList.add('alert', 'alert-danger');
}
