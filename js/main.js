var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);


let map = new Map();

function setYoutubeIframeAPI(item, i) {
    map.set(`player${i}`, new YT.Player(`background-yotube-player${i}`, {
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
            'onStateChange': onPlayerStateChange
        },
    }))
}

function onYouTubeIframeAPIReady() {
    setYoutubeIframeAPI('5_2htTpUhG8', 0);
    setYoutubeIframeAPI('3lclBr8-HpY', 1);
}


let qwer = 0;

function onPlayerReady(event) {
    event.target.mute();
    let div = document.getElementById("representative-youtube-video-button")
    let button = document.createElement('button');
    button.id = `player-button${qwer}`

    button.onclick = function() {
        let num = button.id.slice(13);
        let zxcv = document.getElementById("representative-youtube-video")
        zxcv.style.transform = `translate(-${num * 100}vw)`
        event.target.playVideo();
    }

    div.append(button);

    if(!qwer) {
        event.target.playVideo();
    }

    qwer += 1
    // // qwer 변수 삭제시 아래 if문 사용
    // if(map.values().next().value == event.target) {
    //     event.target.playVideo();
    // }
}

function onPlayerStateChange(event) {
    if (event.data == 1) {
        pauseOthersYoutubes(event.target);
    }
}

function stopVideo() {
    player.stopVideo();
}

function pauseOthersYoutubes( target ) {
    if (!target) return;
    for (let value of map.values()){
        if(value != target){
            value.pauseVideo();
        }
    }  
}