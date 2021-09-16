var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

let representativePlayerMap = new Map();

function setBackgrounPlayer(item) {
    let num2 = representativePlayerMap.size;

    let div1 = document.querySelector("#representative-youtube-video");
    let div2 = document.createElement('div');
    div2.id = `background-yotube${num2}`;
    let div3 = document.createElement('div');
    div3.id = `background-yotube-player${num2}`;
    div2.append(div3);
    div1.append(div2);

    representativePlayerMap.set(`player${num2}`, new YT.Player(`background-yotube-player${num2}`, {
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

    let num = representativePlayerMap.get(`player${num2}`).id - 1;
    let button = document.createElement('button');
    button.id = `player-button${num}`;
    
    button.onclick = function() {
        let view = document.querySelector("#representative-youtube-video");
        view.style.transform = `translate(-${num * 100}vw)`;
        representativePlayerMap.get(`player${num2}`).playVideo();
    }

    document.querySelector("#representative-youtube-video-button").append(button);
}

window.onYouTubeIframeAPIReady = function() {
    setBackgrounPlayer('5_2htTpUhG8', 0);
    setBackgrounPlayer('3lclBr8-HpY', 1);
    setModalPlayer()
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

function stopVideo() {
    // player.stopVideo();
}

function pauseOthersYoutubes(target) {
    for (let value of representativePlayerMap.values()){
        if(value != target){
            value.pauseVideo();
        }
    }  
}




let modalPlayerMap = new Map();

let modalPlayerInfo = [
    {
        videoId: "qSnbJSALeqU",
        thumbnailImg: "./picture.jpg",
        type: "모션그래픽",
        title: "영상 디자인의 미학",
        productionDate: "May 21, 2021"
    },
    {
        videoId: "KpJGflWrAOA",
        thumbnailImg: "./picture.jpg",
        type: "모션그래픽",
        title: "영상 디자인의 미학",
        productionDate: "May 21, 2021"
    },
    {
        videoId: "Bsb9_rlsl28",
        thumbnailImg: "./picture.jpg",
        type: "모션그래픽",
        title: "영상 디자인의 미학",
        productionDate: "May 21, 2021"
    },
    {
        videoId: "zVJ04eNGTFY",
        thumbnailImg: "./picture.jpg",
        type: "모션그래픽",
        title: "영상 디자인의 미학",
        productionDate: "May 21, 2021"
    },
]

function setModalPlayer() {
    let div = document.querySelector(".youtube-videos")

    modalPlayerInfo.forEach((el, i) => {
        let divModal = document.createElement('div');
        let divModalBody = document.createElement('div');
        let divModalCloseBtn = document.createElement('div');
        let divModalBg = document.createElement('div');

        let divInfo = document.createElement('div');
        let divInfoImg = document.createElement('img');
        let divInfoType = document.createElement('div');
        let divInfoTitle = document.createElement('div');
        let divInfoProductionDate = document.createElement('div');

        divModal.append(divModalBody, divModalCloseBtn, divModalBg);
        divInfo.append(divInfoImg, divInfoType, divInfoTitle, divInfoProductionDate);
        div.append(divModal, divInfo)

        divModal.className = `modal-youtube-video hidden`;
        divModal.id = `modal-youtube${i}`
        divModalBody.className = `modal-youtube-video-body`;
        divModalBody.id = `modal-youtube-player${i}`
        divModalCloseBtn.className = `modal-yotube-video-close-btn`;
        divModalCloseBtn.textContent = "X"
        divModalBg.className = "bg";

        divInfo.className = `modal-yotube-information`;
        divInfoImg.className = `modal-yotube-information-thumbnailImg`;
        divInfoImg.src = el.thumbnailImg;
        divInfoType.className = `modal-yotube-information-type`;
        divInfoType.textContent = el.type;
        divInfoTitle.className = `modal-yotube-information-title`;
        divInfoTitle.textContent = el.title;
        divInfoProductionDate.className = `modal-yotube-information-productionDate`;
        divInfoProductionDate.textContent = el.productionDate;

        function modalOpen() {
            document.querySelector(`#${divModal.id}`).classList.remove('hidden');
        }

        function modalClose() {
            document.querySelector(`#${divModal.id}`).classList.add('hidden');
        }

        divInfoImg.addEventListener("click", modalOpen);
        divModalCloseBtn.addEventListener("click", modalClose);
        divModalBg.addEventListener("click", modalClose);

        modalPlayerMap.set(divModal.id, new YT.Player(`modal-youtube-player${i}`, {
            height: '100%',
            width: '100%',
            videoId: el.videoId,
            playerVars: {
                enablejsapi: 1,
            },
        }))
    });
}


// function addModalPlayer() {

// }