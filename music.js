// Sample audio tracks and corresponding images
const tracks = [
  {
    title: "On and On",
    artist: "NCS",
    src: "assets/song1.mp3",
    img: "https://images.unsplash.com/photo-1495434942214-9b525bba74e9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c29uZ3xlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    title: "Royalty",
    artist: "NCS",
    src: "assets/song2.mp3",
    img: "practice/img2.jpg",
  },
  {
    title: "Mortal",
    artist: "NCS",
    src: "assets/song3.mp3",
    img: "practice/img3.jpg",
  },
];

let currentTrackIndex = 0;
const audio = new Audio();
const playButton = document.querySelector('.play');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
const progressBar = document.querySelector('.prograss-bar');
const songTitle = document.getElementById('songTitle');
const artistName = document.getElementById('artistName');
const albumArt = document.getElementById('albumArt');

// Function to update the track
function updateTrack() {
  // Fade out the current image
  albumArt.classList.add('hidden');

  // After a short delay (to allow fade-out to complete), change the image and fade it back in
  setTimeout(() => {
    audio.src = tracks[currentTrackIndex].src;
    songTitle.textContent = tracks[currentTrackIndex].title;
    artistName.textContent = tracks[currentTrackIndex].artist;
    albumArt.src = tracks[currentTrackIndex].img;

    // Fade the image back in
    albumArt.onload = () => {
      albumArt.classList.remove('hidden');
    };

    audio.load(); // Load the new audio file
    console.log(`Loading track: ${tracks[currentTrackIndex].title}`); // Debug log
  }, 500); // Match this duration with your CSS transition duration
}

// Wait for the DOM to load before setting up the event listeners
document.addEventListener('DOMContentLoaded', () => {
  updateTrack(); // Initialize the player with the first track

  // Play or pause the audio
  playButton.addEventListener('click', () => {
    if (audio.paused) {
      audio.play().catch(error => {
        console.error("Error playing audio:", error);
      });
      playButton.classList.remove('fa-play');
      playButton.classList.add('fa-pause'); // Change to pause icon
    } else {
      audio.pause();
      playButton.classList.remove('fa-pause');
      playButton.classList.add('fa-play'); // Change to play icon
    }
  });

  // Previous track
  prevButton.addEventListener('click', () => {
    currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    updateTrack();
    audio.play().catch(error => {
      console.error("Error playing audio:", error);
    });
    playButton.classList.remove('fa-play');
    playButton.classList.add('fa-pause'); // Change to pause icon
  });

  // Next track
  nextButton.addEventListener('click', () => {
    currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
    updateTrack();
    audio.play().catch(error => {
      console.error("Error playing audio:", error);
    });
    playButton.classList.remove('fa-play');
    playButton.classList.add('fa-pause'); // Change to pause icon
  });

  // Update progress bar as the audio plays
  audio.addEventListener('timeupdate', () => {
    const progress = (audio.currentTime / audio.duration) * 100;
    progressBar.style.setProperty('--progress', `${progress}%`);
  });

  // Allow user to seek using the progress bar
  progressBar.addEventListener('click', (e) => {
    const progressBarWidth = progressBar.offsetWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;

    const newTime = (clickX / progressBarWidth) * duration;
    audio.currentTime = newTime;
  });

  // Reset progress when the audio ends
  audio.addEventListener('ended', () => {
    currentTrackIndex = (currentTrackIndex + 1) % tracks.length; // Next track
    updateTrack();
    audio.play().catch(error => {
      console.error("Error playing audio:", error);
    });
    playButton.classList.remove('fa-play');
    playButton.classList.add('fa-pause'); // Change to pause icon
  });
});
