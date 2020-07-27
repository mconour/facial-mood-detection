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

    // adding canvas element
    const canvas = faceapi.createCanvasFromMedia(video)
    document.body.append(canvas)

    // gets display size of current video
    const displaySize = {
        width: video.width,
        height: video.height
    }


    faceapi.matchDimensions(canvas, displaySize)

    setInterval(async () => {
        // gets all faces inside of webcam image each time called
        const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
        console.log(detections)

        // displays elements inside canvas
        const resizedDetections = faceapi.resizeResults(detections, displaySize)

        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
       faceapi.draw.drawDetections(canvas, resizedDetections)

    }, 100)
})