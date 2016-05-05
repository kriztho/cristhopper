// JS file with all functions needed

// Music Player Functions
var duration;
var timelineWidth = timeline.offsetWidth - playhead.offsetWidth;
var music = document.getElementById('song1')
music.addEventListener("timeupdate", timeUpdate, false);

// Get audio file duration
music.addEventListener("canplaythrough", function() {
    duration = music.duration;
}, false);

timeline.addEventListener("click", function(event) {
    moveplayhead(event);
    music.currentTime = duration * clickPercent(event);
}, false);

// Makes playhead draggable
playhead.addEventListener('mousedown', mouseDown, false);
playhead.addEventListener('touchstart', mouseDown, false);
window.addEventListener('mouseup', mouseUp, false);
window.addEventListener('touchstop', mouseUp, false);

// Boolean value so that mouse is moved on mouseUp only when the playhead is released
var onplayhead = false;
// mouseDown EventListener
function mouseDown() {
    onplayhead = true;
    window.addEventListener('mousemove', moveplayhead, true);
    music.removeEventListener('timeupdate', timeUpdate, false);
}
// mouseUp EventListener
// getting input from all mouse clicks
function mouseUp(e) {
    if (onplayhead == true) {
        moveplayhead(e);
        window.removeEventListener('mousemove', moveplayhead, true);
        // change current time
        music.currentTime = duration * clickPercent(e);
        music.addEventListener('timeupdate', timeUpdate, false);
    }
    onplayhead = false;
}

window.addEventListener('mouseup', function() {

}, false);

function clickPercent(e) {
    return (e.pageX - timeline.offsetLeft) / timelineWidth
}

function moveplayhead(e) {
    var newMarginLeft = e.pageX - timeline.offsetLeft;

    // console.log(" " + e.pageX + " " + timeline.offsetLeft);

    if (newMarginLeft > 0 && newMarginLeft < timelineWidth) {
        playhead.style.marginLeft = newMarginLeft + "px";
    }
    if (newMarginLeft == 0) {
        playhead.style.marginLeft = "0px";
    }
    if (newMarginLeft == timelineWidth) {
        playhead.style.marginLeft = timelineWidth + "px";
    }
}

function timeUpdate() {
    var playPercent = 100 * (music.currentTime / duration);
    playhead.style.marginLeft = playPercent + "%";
}

function play() {
    if (music.paused) {
        music.play();
        playButton.className = "";
        playButton.className = "button pause";
    } else {
        music.pause();
        playButton.className = "";
        playButton.className = "button play";
    }
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