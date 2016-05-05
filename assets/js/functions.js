// JS file with all functions needed

// song Player Functions
var duration;
var music = [document.getElementById('song1'),
            document.getElementById('song2'),
            document.getElementById('song3')]
var currentSong = 0

// Get audio file duration
// song.addEventListener("canplaythrough", function() {
//     duration = song.duration;
// }, false);

function timeUpdate() {
    var min = Math.floor(song.currentTime / 60.0);
    var sec = Math.floor(song.currentTime % 60.0);  
    var minDuration = Math.floor(song.duration / 60.0);
    var secDuration = Math.floor(song.duration % 60.0);  

    if (min < 10) {
        min = "0" + min;
    }
    if (sec < 10) {
        sec = "0" + sec;
    }
    if (minDuration < 10) {
        minDuration = "0" + minDuration;
    }
    if (secDuration < 10) {
        secDuration = "0" + secDuration;
    }    

    var currentTime = min + ":" + sec;
    var duration = minDuration + ":" + secDuration;
    var timeDisplay = currentTime + " - " + duration;
    $("#trackTime").text(timeDisplay);
}

function play() {

    // Get current song
    song = music[currentSong];
    song.addEventListener("timeupdate", timeUpdate, false);

    if (song.paused) {
        song.play();
        playButton.className = "";
        playButton.className = "button pause";
    } else {
        song.pause();
        playButton.className = "";
        playButton.className = "button play";
    }

    $("#trackName").text(song.getAttribute("name"));
}

function next() {
    
    // Restart current song
    song.currentTime = 0;
    song.pause();
    song.removeEventListener("timeupdate", timeUpdate, false);

    // Advance to next song
    currentSong++;
    if (currentSong >= music.length) {
        currentSong = 0;
    }
    
    // Play
    play();
}

function previous() {

    // Restart current song
    song.currentTime = 0;
    song.pause();

    // Advance to previous song
    currentSong--;
    if (currentSong < 0) {
        currentSong = music.length - 1;
    }
    
    // Play
    play();
}

/***************** Top-Bar scrolling ******************/

$(window).scroll(function() {    
    var scroll = $(window).scrollTop();

    if (scroll >= 50) {
        $(".navbar-inverse").css("background-color", "rgba(0,0,0,0.6")
        $(".footer").css("background-color", "rgba(0,0,0,0.6")
    } else {
        $(".navbar-inverse").css("background-color", "transparent")
        $(".footer").css("background-color", "transparent")
    }
});