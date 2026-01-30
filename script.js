const audio = document.getElementById("audio");
const playBtn = document.getElementById("playBtn");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
const likeBtn = document.getElementById("likeBtn");
const progress = document.getElementById("progress");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const cover = document.getElementById("cover");
const currentT = document.getElementById("current");
const durationT = document.getElementById("duration");
const themeBtn = document.getElementById("themeBtn");
const colorTheme = document.getElementById("colorTheme");

let isPlaying = false;
let liked = false;
let songIndex = 0;

/* Playlist */
const songs = [
  { name:"God I look to you", artist:"Jen Johnson", src:"./audio/God I look to you.mp3", cover:"./images/music-6.jpg" },
  { name:"nagode", artist:"Dunsin", src:"./audio/nagode.mp3", cover:"./images/music-1.jpg" }
];

function loadSong(s){
  title.textContent = s.name;
  artist.textContent = s.artist;
  audio.src = s.src;
  cover.src = s.cover;
}
loadSong(songs[songIndex]);

/* Play */
playBtn.onclick = ()=> isPlaying ? pause() : play();
function play(){ audio.play(); isPlaying=true; playBtn.textContent="⏸"; }
function pause(){ audio.pause(); isPlaying=false; playBtn.textContent="▶"; }

/* Next / Prev */
nextBtn.onclick = ()=>{
  songIndex = (songIndex+1)%songs.length;
  loadSong(songs[songIndex]); play();
};

prevBtn.onclick = ()=>{
  songIndex = (songIndex-1+songs.length)%songs.length;
  loadSong(songs[songIndex]); play();
};

/* Like */
likeBtn.onclick = ()=>{
  liked=!liked;
  likeBtn.textContent = liked ? "❤️" : "♡";
};

/* Progress */
audio.ontimeupdate = ()=>{
  progress.value = (audio.currentTime/audio.duration)*100 || 0;
  currentT.textContent = format(audio.currentTime);
  durationT.textContent = format(audio.duration);
};

progress.oninput = ()=>{
  audio.currentTime = (progress.value/100)*audio.duration;
};

function format(t){
  if(!t) return "0:00";
  let m = Math.floor(t/60);
  let s = Math.floor(t%60);
  return `${m}:${s<10?'0'+s:s}`;
}

/* AUTO THEME BY TIME */
const hour = new Date().getHours();
if(hour >= 18 || hour < 6){
  document.body.classList.add("dark");
  themeBtn.textContent="☀️";
}

/* Manual theme toggle */
themeBtn.onclick = ()=>{
  document.body.classList.toggle("dark");
  themeBtn.textContent =
    document.body.classList.contains("dark") ? "☀️" : "🌙";
};

/* Color themes */
colorTheme.onchange = ()=>{
  document.body.classList.remove("purple","blue","green","red");
  document.body.classList.add(colorTheme.value);
};

