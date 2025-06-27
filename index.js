document.addEventListener("DOMContentLoaded", () => {
  const songs = [
    {
      title: "Lost in the City Lights",
      author: "Cosmo Sheldrake",
      src: "./resources/lost-in-city-lights-145038.mp3",
      img: "./resources/cover-1.jpg",
    },
    {
      title: "Forest Lullaby",
      author: "Lesfm",
      src: "./resources/forest-lullaby-110624.mp3",
      img: "./resources/cover-2.jpg",
    },
  ];

  let currentSongIndex = 0;
  const audio = new Audio(songs[currentSongIndex].src);
  const playIcon = document.querySelector("#playButton img");
  const progressContainer = document.querySelector(".progressBar");
  const progressFill = document.querySelector(".progress-bar-fill");

  document.getElementById("playButton").addEventListener("click", playPause);
  document.getElementById("nextButton").addEventListener("click", nextSong);
  document.getElementById("prevButton").addEventListener("click", prevSong);
  audio.addEventListener("timeupdate", updateProgressBar);

  audio.addEventListener("loadedmetadata", () => {
    document.getElementById("duration").textContent = formatTime(
      audio.duration
    );
  });
  audio.addEventListener("ended", () => {
    playIcon.src = "/resources/Play_fill.svg";
  });

  progressContainer.addEventListener("click", function (e) {
    const rect = this.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const percentage = clickX / width;

    audio.currentTime = percentage * audio.duration;
    progressFill.style.width = `${percentage * 100}%`;
  });

  function playPause() {
    if (audio.paused) {
      audio.play();
      playIcon.src = "./resources/Stop.svg";
    } else {
      audio.pause();
      playIcon.src = "/resources/Play_fill.svg";
    }
  }

  function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
    audio.play();
  }

  function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
    audio.play();
  }

  function loadSong(index) {
    audio.src = songs[index].src;
    document.getElementById("track-name").textContent = songs[index].title;
    document.getElementById("artist").textContent = songs[index].author;
    document.querySelector(".card img").src = songs[index].img;
    progressFill.style.width = "0%";
    playIcon.src = "/resources/Play_fill.svg";
  }

  function updateProgressBar() {
    const progressPercent = (audio.currentTime / audio.duration) * 100;
    progressFill.style.width = `${progressPercent}%`;
    document.getElementById("currentTime").textContent = formatTime(
      audio.currentTime
    );
    document.getElementById("duration").textContent = formatTime(
      audio.duration
    );
  }

  function formatTime(seconds) {
    if (isNaN(seconds)) return "00:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  }

  // Initial load
  loadSong(currentSongIndex);
});
