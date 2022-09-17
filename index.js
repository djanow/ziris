var currentPlay = 0
var videos;

const play = function () {
    this.videos = document.querySelectorAll("video");
    this.input = document.getElementsByTagName('input');
    this.videos[1].style.opacity = 0;
    this.videos[2].style.opacity = 0;
    this.videos[3].style.opacity = 0;
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
        videos[1].muted = true;
        videos[2].muted = true;
        videos[3].muted = true;

        videos[0].loop = true;
        videos[1].loop = true;
        videos[2].loop = true;
        videos[3].loop = true;

        videos[1].play()
        videos[2].play()
        videos[3].play()
        videos[0].play()
    });
}

const switchTo = function (bool) {
    videos[bool ? currentPlay + 1 : currentPlay - 1].style.display = "block";
    currentPlay = bool ? currentPlay + 1 : currentPlay - 1;
    videos[bool ? currentPlay - 1 : currentPlay + 1].style.display = "none";
}

const switchVideo = function (value) {
    document.getElementById("labelCurseur").innerText = +value;
    const values = value.toString().split(".");
    console.log(value)
    this.videos.forEach((video, index) => {
        // console.log(index," !== ",values[0])
        this.videos[+values[0]].style.opacity = Math.abs((+values[1] / 10) - 1);
        this.videos[+values[0] + 1].style.opacity = (+values[1] / 10);
        if (index !== +values[0]) {
            this.videos[index].style.opacity = 0;
        }
    });


}