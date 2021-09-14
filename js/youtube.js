var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

let playerMap = new Map();

function setYoutubeIframeAPI(item, i) {
    let div1 = document.getElementById("representative-youtube-video");
    let div2 = document.createElement('div');
    div2.id = `background-yotube${i}`;
    let div3 = document.createElement('div');
    div3.id = `background-yotube-player${i}`;
    div2.append(div3);
    div1.append(div2);

    playerMap.set(`player${i}`, new YT.Player(`background-yotube-player${i}`, {
        height: '100%',
        width: '100%',
        videoId: item,
        playerVars: {
            controls: 0,
            disablekb: 1,
            enablejsapi: 1,
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange,
        },
    }))

    let num = playerMap.get(`player${i}`).id - 1;
    let button = document.createElement('button');
    button.id = `player-button${num}`;
    
    button.onclick = function() {
        let view = document.getElementById("representative-youtube-video");
        view.style.transform = `translate(-${num * 100}vw)`;
        playerMap.get(`player${i}`).playVideo();
    }

    document.getElementById("representative-youtube-video-button").append(button);
}

window.onYouTubeIframeAPIReady = function() {
    setYoutubeIframeAPI('5_2htTpUhG8', 0);
    setYoutubeIframeAPI('3lclBr8-HpY', 1);
}

function onPlayerReady(event) {
    event.target.mute();

    if(event.target.id === 1) {
        event.target.playVideo();
    }
}

function onPlayerStateChange(event) {
    let style = document.getElementById(`player-button${event.target.id - 1}`).style;
    if (event.data == 1) {
        pauseOthersYoutubes(event.target);
        style.backgroundColor = "blue";
    } else {
        style.backgroundColor = "white";
    }
}

function stopVideo() {
    // player.stopVideo();
}

function pauseOthersYoutubes(target) {
    for (let value of playerMap.values()){
        if(value != target){
            value.pauseVideo();
        }
    }  
}