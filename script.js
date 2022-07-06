console.log("Welcome to wynk");
let songIndex = 0;
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar')
let gif = document.getElementById('gif')
let audioElement = new Audio('wynk/songs/1.mp3')
let songItem = Array.from(document.getElementsByClassName('songItem'))
let masterSong = document.getElementById('masterSongName')
let songs = [
    { songName: "Salam-e-Ishq", filePath: "wynk/songs/1.mp3", coverPath: "wynk/covers/1.jpg" },
    { songName: "Salam-e-Ishq", filePath: "wynk/songs/2.mp3", coverPath: "wynk/covers/2.jpg" },
    { songName: "Jag-Suna-Lage", filePath: "wynk/songs/3.mp3", coverPath: "wynk/covers/3.jpg" },
    { songName: "Salam-e-Ishq", filePath: "wynk/songs/4.mp3", coverPath: "wynk/covers/4.jpg" },
    { songName: "Salam-e-Ishq", filePath: "wynk/songs/5.mp3", coverPath: "wynk/covers/5.jpg" },
    { songName: "Raba-Ishq-naHove", filePath: "wynk/songs/6.mp3", coverPath: "wynk/covers/6.jpg" },
    { songName: "Salam-e-Ishq", filePath: "wynk/songs/7.mp3", coverPath: "wynk/covers/7.jpg" },
    { songName: "Salam-e-Ishq", filePath: "wynk/songs/8.mp3", coverPath: "wynk/covers/8.jpg" },
    { songName: "Salam-e-Ishq", filePath: "wynk/songs/9.mp3", coverPath: "wynk/covers/9.jpg" },
    { songName: "Salam-e-Ishq", filePath: "wynk/songs/10.mp3", coverPath: "wynk/covers/10.jpg" }
]

songItem.forEach((element, i) => {

    element.getElementsByTagName('img')[0].src = songs[i].coverPath
    element.getElementsByClassName('songName')[0].innerHTML = songs[i].songName
});

//let audioElement= document.getElementById('audio')

masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause')
        masterPlay.classList.add('fa-circle-play')
        gif.style.opacity = 0;
    }
})

audioElement.addEventListener('timeupdate', () => {
    console.log('timeupdate');
    //update seekbar
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100)
    myProgressBar.value = progress
})

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
})

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-circle-pause')
        element.classList.add('fa-circle-play')
    }
    )
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        audioElement.src = `wynk/songs/${songIndex+1}.mp3`
        audioElement.currentTime=0;
        if (audioElement.paused){
            
            e.target.classList.remove('fa-circle-play')
            e.target.classList.add('fa-circle-pause')
            masterPlay.classList.remove('fa-circle-play');
            masterPlay.classList.add('fa-circle-pause');
            masterSong.innerHTML = songs[songIndex].songName
            gif.style.opacity = 1;
            audioElement.play();
        }
        else {
            audioElement.pause()
            e.target.classList.add('fa-circle-play')
            e.target.classList.remove('fa-circle-pause')
            masterPlay.classList.add('fa-circle-play');
            masterPlay.classList.remove('fa-circle-pause');
            gif.style.opacity = 0;
        }
        
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=9) {
        songIndex = 0
    } else {
        songIndex += 1
    }
    audioElement.src = `wynk/songs/${songIndex+1}.mp3`
        audioElement.currentTime=0;
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        masterSong.innerHTML = songs[songIndex].songName
})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0) {
        songIndex = 9
    } else {
        songIndex -= 1
    }
    audioElement.src = `wynk/songs/${songIndex+1}.mp3`
        audioElement.currentTime=0;
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        masterSong.innerHTML = songs[songIndex].songName
})