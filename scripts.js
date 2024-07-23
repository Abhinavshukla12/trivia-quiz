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

    let isPlaying = false;
    let currentTrackIndex = 0;

    // Sample playlist
    const playlist = [
        { src: 'song/Fire.mp3', name: 'Track 1', artist: 'Artist 1' },
        { src: 'track2.mp3', name: 'Track 2', artist: 'Artist 2' },
        { src: 'track3.mp3', name: 'Track 3', artist: 'Artist 3' }
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

    // Initialize the first track
    loadTrack(currentTrackIndex);
});
