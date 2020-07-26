const video = document.getElementById("video");


// hook up webcam to video element
startVideo = () => {
    navigator.getUserMedia({
            video: {}
        },
        stream => video.srcObject = stream,
        err => console.log(err)
    )
}

startVideo()