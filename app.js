const $ = document;

const playList = [
  {
    name: "Age",
    artist: "Ali Yasini",
    img: "./public/images/0.jpg",
    music: "./public/audio/0.mp3",
  },
  {
    name: "Zol nazan",
    artist: "Amiram",
    img: "./public/images/1.jpg",
    music: "./public/audio/1.mp3",
  },
  {
    name: "Biya",
    artist: "Abuli",
    img: "./public/images/2.jpg",
    music: "./public/audio/2.mp3",
  },
  {
    name: "Marg",
    artist: "Javadetem",
    img: "./public/images/3.jpg",
    music: "./public/audio/3.mp3",
  },
  {
    name: "Mordab",
    artist: "Locy",
    img: "./public/images/4.jpg",
    music: "./public/audio/4.mp3",
  },
  {
    name: "Yaghoot",
    artist: "Reza",
    img: "./public/images/5.jpg",
    music: "./public/audio/5.mp3",
  },
  {
    name: "Farsh",
    artist: "Yasin",
    img: "./public/images/6.jpg",
    music: "./public/audio/6.mp3",
  },
  {
    name: "Mah man",
    artist: "Negar",
    img: "./public/images/7.jpg",
    music: "./public/audio/7.mp3",
  },
  {
    name: "Soltan",
    artist: "Tataloo",
    img: "./public/images/8.jpg",
    music: "./public/audio/8.mp3",
  },
  {
    name: "Nemikham",
    artist: "Soorosh",
    img: "./public/images/9.jpg",
    music: "./public/audio/9.mp3",
  },
];

const audio = $.querySelector("audio");
const musicName = $.querySelector(".music_title h1");
const musicArtist = $.querySelector(".music_title span");
const cover = $.querySelector(".music_cover img");
const playBtn = $.querySelector("#playBtn");
const preMusic = $.querySelector("#preMusic");
const nextMusic = $.querySelector("#nextMusic");
const randomBtn = $.querySelector("#randomPlay");
const loopBtn = $.querySelector("#loopPlay");
const currentTime = $.querySelector("#currentTime");
const duration = $.querySelector("#duration");
const progressClick = $.querySelector(".progress_bar");
const progress = $.querySelector("#progress");


// play
let isPlaying = false;
function playSong() {
  isPlaying = true;
  playBtn.classList.replace("fa-play", "fa-pause");
  playBtn.title = "Pause";
  autoNext();
  changeTitle();
  changeCover();
  musicTime();
  audio.play();
}

// Pause
function pauseSong() {
  isPlaying = false;
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.title = "Play";
  audio.pause();
}

// Play or Pause
playBtn.addEventListener("click", function () {
  if (!isPlaying) {
    playSong();
  } else {
    pauseSong();
  }
});

// Next Music
let songIndex = 0;
function nextSong() {
  if (isRandom) {
    randomMusic();
  } else {
    songIndex++;
    if (songIndex > playList.length - 1) {
      songIndex = 0;
    }
  }
  audio.src = playList[songIndex].music;
  playSong();
}

// Previose Music
function preSong() {
  if (isRandom) {
    randomMusic();
  } else {
    songIndex--;
    if (songIndex < 0) {
      songIndex = playList.length - 1;
    }
  }
  audio.src = playList[songIndex].music;
  playSong();
}

// Auto next
function autoNext() {
  setInterval(function () {
    if (audio.currentTime == audio.duration) {
      if (isRandom) {
        randomMusic();
      } else if (isLoop) {
        playSong();
      } else nextSong();
    }
  }, 1000);
}

// Random Music
function randomMusic() {
  songIndex = Math.floor(Math.random() * playList.length);
  audio.src = playList[songIndex].music;
  playSong();
}

// Random Play
let isRandom = false;
function randomPlay() {
  if (!isRandom) {
    loopBtn.style.color = "#07b9ff";
    randomBtn.style.color = "#f102e6";
    isLoop = false;
    isRandom = true;
  } else {
    randomBtn.style.color = "#07b9ff";
    isRandom = false;
  }
}

// Loop Play
let isLoop = false;
function loopPlay() {
  if (!isLoop) {
    randomBtn.style.color = "#07b9ff";
    loopBtn.style.color = "#f102e6";
    isRandom = false;
    isLoop = true;
  } else {
    loopBtn.style.color = "#07b9ff";
    isLoop = false;
  }
}

// Cover
function changeCover() {
  cover.src = playList[songIndex].img;
  $.body.style.background = `url(${playList[songIndex].img}) center no-repeat`;
  $.body.style.backgroundSize = "cover";
}

// Change Title
function changeTitle() {
  musicName.innerHTML = playList[songIndex].name;
  musicArtist.innerHTML = playList[songIndex].artist;
}

// Music time
function musicTime() {
  setInterval(function () {
    newDuration();
    progressBar();
    let m = Math.floor(audio.currentTime / 60);
    let s = Math.floor(audio.currentTime % 60);
    currentTime.innerHTML = `${m.toString().padStart(2, "0")}:${s
      .toString()
      .padStart(2, "0")}`;
  }, 1000);
}

function newDuration() {
  const d = audio.duration;
  const m = Math.floor(d / 60);
  const s = Math.floor(d % 60);
  duration.textContent = `${m.toString().padStart(2, "0")}:${s
    .toString()
    .padStart(2, "0")}`;
}

// Progress
function progressBar() {
  const width = (audio.currentTime * 100) / audio.duration;
  progress.style.width = `${width}%`;
}

progressClick.addEventListener("click", function (e) {
  console.log(e.offsetX);
  const timeLine = (e.offsetX * audio.duration) / 360;
  audio.currentTime = timeLine;
  playSong();
});

nextMusic.addEventListener("click", nextSong);
preMusic.addEventListener("click", preSong);
randomBtn.addEventListener("click", randomPlay);
loopBtn.addEventListener("click", loopPlay);
