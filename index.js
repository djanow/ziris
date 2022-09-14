var currentPlay = 0
var videos;

const play = function () {
    videos = document.querySelectorAll("video");
    videos[1].style.display = "none";
    videos[2].style.display = "none";
    videos[3].style.display = "none";
    console.info("test ");
    // Get all videos.

    // Create a promise to wait all videos to be loaded at the same time.
    // When all of the videos are ready, call resolve().
    var promise = new Promise(function (resolve) {
        var loaded = 0;

        videos.forEach(function (v) {
            console.log(v.readyState)
            if (v.readyState > 0) {
                resolve();
            } else {
                v.addEventListener("loadedmetadata", function () {
                    debugger;
                    loaded++;

                    if (loaded === videos.length) {
                        resolve();
                    }
                });

            }
        });
    });

    // Play all videos one by one only when all videos are ready to be played.
    promise.then(function () {
        console.info("done");

        videos.forEach(function (v, index) {
            if(index > 0){
                v.muted = true;
            }
            v.loop = true;
            v.play();
        });
    });
}

const switchTo = function (bool) {
    videos[bool ? currentPlay + 1 : currentPlay - 1].style.display = "block";
    currentPlay = bool ? currentPlay + 1 : currentPlay - 1;
    videos[bool ? currentPlay - 1 : currentPlay + 1].style.display = "none";
}