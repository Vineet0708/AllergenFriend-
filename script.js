// Define imageData variable globally
var imageData;

// Function to capture image from webcam
function captureImage() {
    var videoElement = document.getElementById('videoElement');
    var canvasElement = document.getElementById('canvasElement');
    var resultDiv = document.getElementById('result');

    // Draw the video frame onto the canvas
    canvasElement.getContext('2d').drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);

    // Convert canvas content to base64 encoded image data
    imageData = canvasElement.toDataURL('image/png');

    // Display captured image
    var img = new Image();
    img.src = imageData;
    resultDiv.innerHTML = '';
    resultDiv.appendChild(img);

    // Hide video and canvas elements
    videoElement.style.display = 'none';
    canvasElement.style.display = 'none';
    
    // Show capture button
    document.getElementById('captureButton').style.display = 'none';
    
    // Show webcam button
    document.getElementById('webcamButton').style.display = 'block';
}

// Function to show webcam feed again
function showWebcam() {
    // Show webcam area and appropriate buttons
    document.getElementById('camera-area').style.display = 'block';
    document.getElementById('captureButton').style.display = 'inline-block';
    document.getElementById('uploadButton').style.display = 'inline-block'; // Show upload button
    document.getElementById('webcamButton').style.display = 'none'; // Hide webcam button
    document.getElementById('result').innerHTML = ''; // Clear any uploaded image
    
    // Access webcam video stream
    var videoElement = document.getElementById('videoElement');
    
    // Check if the browser supports getUserMedia
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(function(stream) {
                videoElement.srcObject = stream;
                videoElement.style.display = 'block'; // Show video element
            })
            .catch(function(error) {
                console.error('Error accessing the webcam:', error);
            });
    } else {
        console.error('getUserMedia is not supported');
    }
}

function uploadImage() {
    document.getElementById('fileInput').click();
}

function handleFileSelect(event) {
    var file = event.target.files[0];
    if (file) {
        var reader = new FileReader();
        reader.onload = function (e) {
            var img = new Image();
            img.onload = function () {
                var resultDiv = document.getElementById('result');
                resultDiv.innerHTML = ''; // Clear any previous content
                resultDiv.appendChild(img); // Append the uploaded image
                
                // Show buttons for using webcam again
                document.getElementById('uploadButton').style.display = 'none'; // Hide upload button
                document.getElementById('webcamButton').style.display = 'inline-block'; // Show webcam button
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
}

// Export the imageData variable
export { imageData };
