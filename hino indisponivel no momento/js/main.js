const IcoNotficacao = document.querySelector(".bx-bell");
const DivNotficacao = document.querySelector(".notficacao");
const CloseNotficacao = document.querySelector(".close");

//API PESQUISA YOUTUBE DATA V3
const apiKey = "AIzaSyC8CaMGmTdfrBNNVYlOHWnaEWydYK8imYQ";
const channelId = "UCJ1RTO5MjmLlgI5rlEEqCiA";

const searchInput = document.getElementById("search-input");
const videoContainer = document.querySelector(".main-videos");
const mainContent = document.querySelector("#video-container");

function searchYourVideos() {
  const searchQuery = searchInput.value;
  const apiUrl = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&q=${searchQuery}&part=snippet&type=video&maxResults=19`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {

      data.items.forEach((item) => {
        const videoId = item.id.videoId;
        const videoTitle = item.snippet.title;
        const videoThumbnail = item.snippet.thumbnails.medium.url;

        const videoElement = `
                            <div class="box-search video">
                                <a href="https://www.youtube.com/watch?v=${videoId}" target="_blank">
                                    <img class='hinolink img' src="${videoThumbnail}" alt="${videoTitle}">
                                </a>
                            </div>
                        `;

        videoContainer.innerHTML += videoElement;
      });
    })
    .catch((error) => {
      console.error("Error searching for videos:", error);
    });
}

searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    searchYourVideos();
  }
});

window.addEventListener("click", (e) => {
  if (e.target.className == "active") {
    searchInput.classList.remove("active");
    mainContent.classList.remove("active");
  }
});

searchInput.addEventListener("click", () => {
  searchInput.classList.add("active");
  mainContent.classList.add("active");
});

IcoNotficacao.addEventListener("click", () => {
  DivNotficacao.classList.add("active");
});

CloseNotficacao.addEventListener("click", () => {
  DivNotficacao.classList.remove("active");
});
