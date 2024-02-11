const prevButton = document.getElementById('prev')
const nextButton = document.getElementById('next')
const repeatButton = document.getElementById('repeat')
const shuffleButton = document.getElementById('shuffle')
const audio = document.getElementById('audio')
const songImage = document.getElementById('song-image')
const songName = document.getElementById('song-name')
const songArtist = document.getElementById('song-artist')
const pauseButton = document.getElementById('pause')
const playButton = document.getElementById('play')
const playListButton = document.getElementById('playlist')

const maxDuration = document.getElementById('max-duration')
const currentTimeRef = document.getElementById('current-time')

const progressBar = document.getElementById('progress-bar')
const playListContainer = document.getElementById('playlist-container')
const closeButton= document.getElementById('close-button')
const playListSongs = document.getElementById('playlist-songs')

const currentProgress = document.getElementById('current-progress')

//sarki sirasi
let index

//dongu durumu
let loop = true

//sarki listesi obje olarak
const songsLists = [
    {
        name: "Gelo Ew Ki Bu",
        link: "assets/gelo-ew-ki-bu.mp3",
        artist: "Aram Tigran",
        image: "assets/aram-tigran.jpeg"
    },
    {
        name: "Gitme Kal",
        link: "assets/yara-bere-icindeyim.mp3",
        artist: "Hira-i Zerdust",
        image: "assets/hirai.jpeg"
    },
    {
        name: "Aramam",
        link: "assets/aramam.mp3",
        artist: "Ibrahim Tatlises",
        image: "assets/ibrahim-tatlises.jpeg"
    },
    {
        name: "Ax Eman",
        link: "assets/ax-eman.mp3",
        artist: "Rewsan Celiker",
        image: "assets/rewsan-celiker.jpeg"
    },
    {
        name: "Dinle",
        link: "assets/dinle.mp3",
        artist: "Mahsun Kirmizigul",
        image: "assets/mahsun.jpeg"
    }
]

//zaman duzenleme
const timeFormatter = (timeInput) =>{
    let minute = Math.floor(timeInput / 60)
    minute = minute < 10 ? "0"+minute : minute

    let second = Math.floor(timeInput % 60)
    second = second < 10 ? "0"+second : second

    return `${minute}:${second}`
}

//sarki atama

const setSong = (arrayIndex) =>{

    let {name, link, artist, image} = songsLists[arrayIndex]

    audio.src = link
    songName.innerHTML = name
    songArtist.innerHTML = artist
    songImage.src = image

    audio.onloadeddata = () =>{
        maxDuration.innerText = timeFormatter(audio.duration)
    }
    playListContainer.classList.add('hide')
    playAudio()
}

//Sesi ac
const playAudio =()=>{
    audio.play()
    pauseButton.classList.remove('hide')
    playButton.classList.add('hide')
}

//Ses ilerlemesi
progressBar.addEventListener("click",event=>{

    let coordStart = progressBar.getBoundingClientRect().left

    let coordEnd = event.clientX

    let progress = (coordEnd - coordStart) / progressBar.offsetWidth

    currentProgress.style.width = progress * 100 + "%"

    audio.currentTime = progress * audio.duration

    audio.play()
    pauseButton.classList.remove('hide')
    playButton.classList.add('hide')

})

setInterval(() => {
    currentTimeRef.innerHTML = timeFormatter(audio.currentTime)
    currentProgress.style.width = (audio.currentTime / audio.duration.toFixed(3))* 100 + "%"
}, 1000);

audio.addEventListener('timeupdate',()=>{
    currentTimeRef.innerText = timeFormatter(audio.currentTime)
})

//sonraki sarki
const nextSong = () =>{
    if (loop) {
        if (index == (songsLists.length - 1)) {
            index = 0
        } else {
            index = index + 1
        }
        setSong(index)
    } else {
        let randIndex = Math.floor((Math.random() * 100  ) % songsLists.length)
        setSong(randIndex)
    }
}

//sarki bittiginde
audio.onended = () =>{
    nextSong()
}

//tekrar durumu
repeatButton.addEventListener('click',()=>{
    if (repeatButton.classList.contains('active')) {
        repeatButton.classList.remove('active')
        audio.loop = false
        console.log('dongu kapatildi')
    } else {
        repeatButton.classList.add('active')
        audio.loop = true
        console.log('dongu acildi')
    }
})

//karistirici ac
shuffleButton.addEventListener('click',()=>{
    if (shuffleButton.classList.contains('active')) {
        shuffleButton.classList.remove('active')
        audio.loop = true
        console.log('dongu kapatildi')
    } else {
        shuffleButton.classList.add('active')
        audio.loop = false
        console.log('dongu acildi')
    }
})


const previousSong =() =>{
    if (index>0) {
        //sarkiyi durdur
        index-=1
    } else{
        index = songsLists.length - 1
    }
    setSong(index)
}

const pauseAudio = () =>{
    audio.pause()
    pauseButton.classList.add('hide')
    playButton.classList.remove('hide')
}

//sarki listesi ac
playListButton.addEventListener('click',()=>{
    playListContainer.classList.remove('hide')
})

//sarki listesini kapat
closeButton.addEventListener('click',()=>{
    playListContainer.classList.add('hide')
})

//sarki listesini olustur
const initializePlaylist = () => {
    for (let i in songsLists) {
        playListSongs.innerHTML += 
        `<li class="playlistSong"
        onclick="setSong(${i})">
            <div class="playlist-image-container">
             <img src="${songsLists[i].image}"/>
            </div>
            <div class="playlist-song-details">
                <span id="playlist-song-name">
                ${songsLists[i].name}
                </span>
                <span id="playlist-song-artist-name">
                ${songsLists[i].artist}
                </span>
            </div>
        </li>`
    }
}

//ekran yuklenildiginde
window.onload = () =>{
    index = 0
    setSong(index)
    pauseAudio()
    initializePlaylist()
}


//play button
playButton.addEventListener('click',playAudio)

//next button
nextButton.addEventListener('click',nextSong)

//prev button
prevButton.addEventListener('click',previousSong)

//pause button
pauseButton.addEventListener('click',pauseAudio)