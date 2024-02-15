// BANNER
let nextPageToken = "";
const banner = document.querySelector(".img-banner");
const tituloReflexao = document.querySelector(".text-banner");

function getBanner() {
  fetch(
    "https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=UCJ1RTO5MjmLlgI5rlEEqCiA&maxResults=3&order=date&key=AIzaSyCwe-ZnGmDOAUUlEe9_n06UejfOS9gRrUw&pageToken=" +
      nextPageToken
  )
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      banner.innerHTML = `
            <a href="https://www.youtube.com/watch?v=${data.items[0].id.videoId}" target="_blank">
                <img src="${data.items[0].snippet.thumbnails.medium.url}">
            </a>
        `;

      tituloReflexao.innerHTML = `
            <h1>${data.items[0].snippet.title}</h1>
            <h2>${data.items[0].snippet.publishedAt}</h2>
            <p>${data.items[0].snippet.description}</p>
            <a href="https://www.youtube.com/watch?v=${data.items[0].id.videoId}" target="_blank">
               Assistir <i class="uil uil-play"></i>
            </a>
        `;
    });
}
getBanner();

// RECENTES
function getVideo() {
  fetch(
    "https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=UCJ1RTO5MjmLlgI5rlEEqCiA&maxResults=3&order=date&key=AIzaSyCwe-ZnGmDOAUUlEe9_n06UejfOS9gRrUw&pageToken=" +
      nextPageToken
  )
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      nextPageToken = data.nextPageToken;
      let videos = data.items;
      let ultimo = document.querySelector(".tds");
      ultimo.innerHTML = "";
      for (video of videos) {
        ultimo.innerHTML += `
          <div class='box video'>
          <a href="https://www.youtube.com/watch?v=${video.id.videoId}" target="_blank">
          <img class='hinolink img' src="${video.snippet.thumbnails.medium.url}" />
          </a>
          </div>
        `;
      }
    });
}
getVideo();

// DESTAQUE
const channelId = "UCJ1RTO5MjmLlgI5rlEEqCiA";
const apiKey = "AIzaSyCwe-ZnGmDOAUUlEe9_n06UejfOS9gRrUw";

const apiUrl = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=viewCount&maxResults=3`;

function loadVideos() {
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      let videos = data.items;
      let videosContainer = document.getElementById("videos");
      videosContainer.innerHTML = "";

      videos.forEach((video) => {
        const videoId = video.id.videoId;
        const videoTitle = video.snippet.title;
        const videoThumbnail = video.snippet.thumbnails.medium.url;

        videosContainer.innerHTML += `
                  <div class="box video">
                      <a href="https://www.youtube.com/watch?v=${videoId}" target="_blank">
                          <img class='hinolink img' src="${videoThumbnail}" alt="${videoTitle}">
                      </a>
                  </div>
              `;
      });
    })
    .catch((error) => {
      console.error("Erro ao carregar os vídeos:", error);
    });
}

loadVideos();

//RECOMENDADOS
const RecomendadoKey = "AIzaSyCwe-ZnGmDOAUUlEe9_n06UejfOS9gRrUw";
let recomendadoUrl = `https://www.googleapis.com/youtube/v3/search?key=${RecomendadoKey}&channelId=${channelId}&part=snippet,id&order=rating&maxResults=3`;

function RecomendadosFunc() {
  fetch(recomendadoUrl)
    .then((response) => response.json())
    .then((data) => {
      let videos = data.items;
      let videosContainer = document.getElementById("Recomandados");
      videosContainer.innerHTML = "";

      videos.forEach((video) => {
        const videoId = video.id.videoId;
        const videoTitle = video.snippet.title;
        const videoThumbnail = video.snippet.thumbnails.medium.url;

        videosContainer.innerHTML += `
        <div class="box video">
          <a href="https://www.youtube.com/watch?v=${videoId}" target="_blank">
              <img class='hinolink img' src="${videoThumbnail}" alt="${videoTitle}">
           </a>
        </div>
              `;
      });
    })
    .catch((error) => {
      console.error("Erro ao carregar os vídeos:", error);
    });
}

RecomendadosFunc();

// SEARCH
const videoContainer = document.querySelector("#pop-up-input-main");

function searchYourVideos() {
  videoContainer.innerHTML = "";
  const searchQuery = searchInput.value;
  const apiUrl = `https://www.googleapis.com/youtube/v3/search?key=AIzaSyCwe-ZnGmDOAUUlEe9_n06UejfOS9gRrUw&channelId=UCJ1RTO5MjmLlgI5rlEEqCiA&q=${searchQuery}&part=snippet&type=video&maxResults=19`;

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
                                    <img class='hinolink img search-media' src="${videoThumbnail}" alt="${videoTitle}">
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
