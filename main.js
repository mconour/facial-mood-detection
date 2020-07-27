const video = document.getElementById("video");

// loaded all different models
Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri('./models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('./models'),
    faceapi.nets.faceRecognitionNet.loadFromUri('./models'),
    faceapi.nets.faceExpressionNet.loadFromUri('./models')
]).then(startVideo);


// hook up webcam to video element
function startVideo() {
    navigator.getUserMedia({
        video: {}
    },
    stream => video.srcObject = stream,
    err => console.log(err)
    )
}

/* setting up the facial detection */
video.addEventListener('play', () => {
    setInterval(async () => {
        const detections = await faceapi.detectAllFaces()
    }, 100)
})