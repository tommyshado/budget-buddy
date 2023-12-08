document.addEventListener('DOMContentLoaded', (event) => {
    const video = document.getElementById('video');
    const canvas = document.getElementById('canvas');
    const captureBtn = document.getElementById('captureBtn');
    const resultDiv = document.getElementById('result');

    // Access the camera
    navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
            video.srcObject = stream;
        })
        .catch((error) => {
            console.error('Error accessing camera:', error);
        });

    // Capture image from video feed
    captureBtn.addEventListener('click', () => {
        const context = canvas.getContext('2d');
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Perform OCR on the captured image
        Tesseract.recognize(
            canvas.toDataURL('image/png'),
            'eng',
            { logger: info => console.log(info) }
        ).then(({ data: { text } }) => {

            if(text){
                const apiURL = "/api/preprocessData";
                const data = {
                    text: text,
                    categoryId: 1
                };
    
                resultDiv.innerHTML = `<p>Extracted Text: ${text}</p>`;
                axios.post(apiURL, data).then(()=>{

                    window.location.href = "/insights.html"
                });
            }
            // 
            
        }).catch((error) => {
            console.error('OCR Error:', error);
        });
    });
});
