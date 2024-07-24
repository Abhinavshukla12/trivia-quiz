// script.js
document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('audio');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const progress = document.getElementById('progress');
    const volume = document.getElementById('volume');
    const currentTimeElem = document.getElementById('current-time');
    const durationElem = document.getElementById('duration');
    const trackNameElem = document.getElementById('track-name');
    const artistNameElem = document.getElementById('artist-name');
    const playlistElement = document.getElementById('playlist');

    let isPlaying = false;
    let currentTrackIndex = 0;

    // Sample playlist
    const playlist = [
        { src: 'song/Fire.mp3', name: 'Fire', artist: 'Artist 1' },
        { src: 'song/Dekha_Tenu.mp3', name: 'Dekha Tenu', artist: 'Artist 2' },
        { src: 'song/O_Sajni_Re.mp3', name: 'O Sajni Re', artist: 'Artist 3' },
        { src: 'song/Criminal.mp3', name: 'Criminal', artist: 'Artist 4' },
        { src: 'song/Envy.mp3', name: 'Envy', artist: 'Artist 5' },
        { src: 'song/Gulabi_Sadi.mp3', name: 'Gulabi_Sadi', artist: 'Artist 6' },
        { src: 'song/Inni_Soni.mp3', name: 'Inni_Soni', artist: 'Artist 7' },
        { src: 'song/Tujhe_Dekha.mp3', name: 'Tujhe_Dekha', artist: 'Artist 8' }
    ];

    function loadTrack(index) {
        if (index >= 0 && index < playlist.length) {
            audio.src = playlist[index].src;
            trackNameElem.textContent = playlist[index].name;
            artistNameElem.textContent = playlist[index].artist;
            currentTrackIndex = index;
            audio.load(); // Ensure the new track is loaded
            if (isPlaying) {
                audio.play();
            }
        }
    }

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    }

    function populatePlaylist() {
        playlistElement.innerHTML = '';
        playlist.forEach((track, index) => {
            const li = document.createElement('li');
            li.textContent = `${track.name} - ${track.artist}`;
            li.addEventListener('click', () => {
                loadTrack(index);
                playPauseBtn.textContent = 'Pause';
                isPlaying = true;
                audio.play();
            });
            playlistElement.appendChild(li);
        });
    }

    playPauseBtn.addEventListener('click', () => {
        if (isPlaying) {
            audio.pause();
            playPauseBtn.textContent = 'Play';
        } else {
            audio.play().catch(error => {
                console.error('Error playing audio:', error);
            });
            playPauseBtn.textContent = 'Pause';
        }
        isPlaying = !isPlaying;
    });

    prevBtn.addEventListener('click', () => {
        const newIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
        loadTrack(newIndex);
    });

    nextBtn.addEventListener('click', () => {
        const newIndex = (currentTrackIndex + 1) % playlist.length;
        loadTrack(newIndex);
    });

    audio.addEventListener('loadeddata', () => {
        durationElem.textContent = formatTime(audio.duration);
    });

    audio.addEventListener('timeupdate', () => {
        const currentTime = audio.currentTime;
        const duration = audio.duration;
        progress.value = (currentTime / duration) * 100;
        currentTimeElem.textContent = formatTime(currentTime);
        durationElem.textContent = formatTime(duration);
    });

    progress.addEventListener('input', () => {
        const value = progress.value;
        audio.currentTime = (value / 100) * audio.duration;
    });

    volume.addEventListener('input', () => {
        audio.volume = volume.value / 100;
    });

    // Initialize the first track and populate the playlist
    loadTrack(currentTrackIndex);
    populatePlaylist();
});
