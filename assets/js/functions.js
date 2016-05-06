// JS file with all functions needed

// song Player Functions
var player;
var music;
var song;
var currentSong = 0

$(document).ready(getPlaylist());

function timeUpdate() {

    currentTime = player.currentTime() / 1000;
    duration = song.duration / 1000;
    var min = Math.floor(currentTime / 60.0);
    var sec = Math.floor(currentTime % 60.0);  
    var minDuration = Math.floor(duration / 60.0);
    var secDuration = Math.floor(duration % 60.0);  

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

    if (playButton.className == "button play") {

        // Get current song
        song = music[currentSong];

        SC.stream('/tracks/'+song.id).then(function(p){
            player = p;
            player.play();

            player.on("play-start", function(){
                setTrackName(song.title);
                playButton.className = "button pause";
            })

            player.on("play-resume", function(){
                playButton.className = "button pause";
            })

            player.on("pause", function(){
                playButton.className = "button play";
            })

            player.on("time", function(){
                timeUpdate();
            })          
        });

    } else {
        player.pause();
    }
}

function playSong(index) {
    currentSong = index;
    restart();
    play();
}

function restart() {
    if (player != null) {
        player.seek(0);
        player.pause();
    }
}

function setTrackName(name) {
    $("#trackName").text(name);
}

function getPlaylist() {

    SC.initialize({
        client_id: '77f5b478af070e995f57553bb4ac0eaa'
    })

    SC.get('/playlists/215541872').then(function(playlist) {
        music = playlist.tracks;
        currentSong = 0;
    })
}

function next() {

    // Advance to next song
    currentSong++;
    if (currentSong >= music.length) {
        currentSong = 0;
    }
    
    // Play
    restart();
    play();
}

function previous() {

    // Advance to previous song
    currentSong--;
    if (currentSong < 0) {
        currentSong = music.length - 1;
    }
    
    // Play
    restart();
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