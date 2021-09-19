import {backgroundPlayerList, modalPlayerInfo} from './youtubeList.js';

var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

window.onYouTubeIframeAPIReady = function() {
    addBackgroundPlayer();
    addModalPlayer();
}

function onPlayerReady(event) {
    event.target.mute();

    if(event.target.id === 1) {
        event.target.playVideo();
    }
}

function onPlayerStateChange(event) {
    let style = document.querySelector(`#player-button${event.target.id - 1}`).style;
    if (event.data == 1) {
        pauseOthersYoutubes(event.target);
        style.backgroundColor = "blue";
    } else {
        style.backgroundColor = "white";
    }
}

function pauseOthersYoutubes(target) {
    for (let value of backgroundPlayerMap.values()){
        if(value != target){
            value.pauseVideo();
        }
    }  
}

let backgroundPlayerMap = [];

function setBackgrounPlayer(item, i) {
    let div1 = document.querySelector(".representative-youtube-video");
    let div2 = document.createElement('div');
    div2.className = "background-yotube";
    div2.id = `background-yotube${i}`;
    let div3 = document.createElement('div');
    div3.id = `background-yotube-player${i}`;
    div2.append(div3);
    div1.append(div2);

    backgroundPlayerMap[i] = new YT.Player(div3, {
        height: '100%',
        width: '100%',
        videoId: item,
        playerVars: {
            controls: 0,
            disablekb: 1,
            loop: 1,
            playlist: item,
            enablejsapi: 1,
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange,
        },
    })

    let button = document.createElement('button');
    button.id = `player-button${i}`;
    
    button.onclick = function() {
        let view = document.querySelector(".representative-youtube-video");
        view.style.transform = `translate(-${i * 100}vw)`;
        backgroundPlayerMap[i].playVideo();
    }

    document.querySelector(".representative-youtube-video-button").append(button);
}

function addBackgroundPlayer() {
    backgroundPlayerList.forEach((el, i) => {
        setBackgrounPlayer(el, i);
    })
}

let modalPlayerMap = [];

function setModalPlayer(el, i) {
    let div = document.querySelector(".youtube-videos");

    let divModal = document.createElement('div');
    let divModalBody = document.createElement('div');
    // let divModalCloseBtn = document.createElement('div');
    let divModalBg = document.createElement('div');

    let divInfo = document.createElement('div');
    let divInfoImgBox = document.createElement('div');
    let divInfoImg = document.createElement('img');
    let divInfoImgIcon = document.createElement('i');
    let divInfoType = document.createElement('div');
    let divInfoTitle = document.createElement('div');
    let divInfoProductionDate = document.createElement('div');

    divModal.append(divModalBody, divModalBg);
    divInfoImgBox.append(divInfoImg, divInfoImgIcon)
    divInfo.append(divInfoImgBox, divInfoType, divInfoTitle, divInfoProductionDate);
    div.append(divModal, divInfo);

    divModal.className = `modal-youtube-video hidden`;
    divModal.id = `modal-youtube${i}`;
    divModalBody.className = `modal-youtube-video-body`;
    divModalBody.id = `modal-youtube-player${i}`;
    // divModalCloseBtn.className = `modal-yotube-video-close-btn`;
    // divModalCloseBtn.textContent = "X";
    divInfoImgIcon.className = "far fa-play-circle";
    divModalBg.className = "bg";

    divInfo.className = `modal-yotube-information`;
    divInfoImgBox.className = `modal-yotube-information-thumbnailImg-box`
    divInfoImg.className = `modal-yotube-information-thumbnailImg`;
    divInfoImg.src = el.thumbnailImg;
    divInfoType.className = `modal-yotube-information-type`;
    divInfoType.textContent = el.type;
    divInfoTitle.className = `modal-yotube-information-title`;
    divInfoTitle.textContent = el.title;
    divInfoProductionDate.className = `modal-yotube-information-productionDate`;
    divInfoProductionDate.textContent = el.productionDate;

    function modalOpen() {
        divModal.classList.remove('hidden');
        // divModal.scrollIntoView()
    }

    function modalClose() {
        divModal.classList.add('hidden');
        modalPlayerMap[i].pauseVideo();
    }

    divInfoImg.addEventListener("click", modalOpen);
    // divModalCloseBtn.addEventListener("click", modalClose);
    divModalBg.addEventListener("click", modalClose);

    modalPlayerMap[i] = new YT.Player(divModalBody, {
        height: '100%',
        width: '100%',
        videoId: el.videoId,
        playerVars: {
            enablejsapi: 1,
        },
    })
}

function addModalPlayer() {
    modalPlayerInfo.forEach((el, i) => {
        setModalPlayer(el, i);
    })
}