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
                const apiURL = "http://localhost:3000/api/preprocessData";
                const data = {
                    text: text,
                    categoryId: 4
                };
    
                axios.post(apiURL, data).then(()=>{
                });
                resultDiv.innerHTML = `Item has been scanned....`;
                window.location.href = "/insights.html"
            }
            // <p>Extracted Text: ${text}</p>
            
        }).catch((error) => {
            console.error('OCR Error:', error);
        });
    });
});
