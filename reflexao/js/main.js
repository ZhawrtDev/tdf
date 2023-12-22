const IcoNotficacao = document.querySelector(".bx-bell");
const DivNotficacao = document.querySelector(".notficacao");
const CloseNotficacao = document.querySelector(".close");

// IMG SETA

const imagens = [
  {
    src: "https://i.ytimg.com/vi/kSjJmCB0eio/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCeiTQXDLuShTyA3Q63Ke3bKohzfA",
    link: "https://www.youtube.com/watch?v=kSjJmCB0eio",
  },
  {
    src: "./img/rs-1.jpg",
    link: "https://www.youtube.com/watch?v=TXWyfyfEMxg",
  },
  {
    src: "./img/rs-2.jpg",
    link: "https://www.youtube.com/watch?v=LNAlpwIAQN0",
  },
  {
    src: "./img/rs-3.webp",
    link: "https://www.youtube.com/watch?v=jW08WA8HUxQ",
  },
  {
    src: "./img/rs-4.jpg",
    link: "https://www.youtube.com/watch?v=2M37vyzF-r8",
  },
  {
    src: "./img/rs-5.jpg",
    link: "https://www.youtube.com/watch?v=1YGTnvD5VR8",
  },
  // Adicione mais URLs de imagens e links aqui
];

let indiceImagemAtual = 0;

function carregarImagens() {
  const imagemContainer = document.querySelector(".imagem-container");
  imagemContainer.innerHTML = ""; // Limpa o conteúdo atual

  for (let i = 0; i < 4; i++) {
    const imagemDiv = document.createElement("div");
    const reflexaoDiv = document.createElement("div");
    const imagem = document.createElement("img");
    const link = document.createElement("a");

    reflexaoDiv.setAttribute("class", "img-content-reflexao");
    imagemDiv.setAttribute("class", "box");
    link.setAttribute("class", "videos-box");

    imagem.className = "hinolink img";
    imagem.src = imagens[indiceImagemAtual].src;
    link.href = imagens[indiceImagemAtual].link;

    reflexaoDiv.appendChild(imagem);
    link.appendChild(reflexaoDiv);
    imagemDiv.appendChild(link);
    imagemContainer.appendChild(imagemDiv);

    indiceImagemAtual = (indiceImagemAtual + 1) % imagens.length;
  }
}

// REFLEXAO API
const destaque = document.querySelector("#destaque");
const recomendados = document.querySelector("#recomendados");
const short = document.querySelector("#short");

const urll = "../../src/json/main.json";

fetch(urll)
  .then((res) => res.text())
  .then((res) => {
    res = JSON.parse(res);

    destaque.innerHTML = `${res.categoria.destaques.reflexao}`;
    recomendados.innerHTML = `${res.categoria.recomendado.reflexao}`;
    short.innerHTML = `${res.categoria.short.reflexao}`;
  })
  .catch((error) => {
    console.error("Ocorreu um erro:", error);
  });

let nextPageToken = "";
const banner = document.querySelector(".reflexao-banner");
const tituloReflexao = document.querySelector(".nome-reflexao");

function getVideo() {
  fetch(
    "https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=UCJ1RTO5MjmLlgI5rlEEqCiA&maxResults=4&order=date&key=AIzaSyC8CaMGmTdfrBNNVYlOHWnaEWydYK8imYQ&pageToken=" +
      nextPageToken
  )
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      banner.innerHTML = `
                <a href="https://www.youtube.com/watch?v=${data.items[0].id.videoId}" target="_blank">
                    <img class='img-banner' src="${data.items[0].snippet.thumbnails.medium.url}">
                </a>
            `;

      tituloReflexao.innerHTML = `
               <h2 id="titulo-reflexao">${data.items[0].snippet.title}</h2>
               <p id="data-reflexao">${data.items[0].snippet.publishedAt}</p>
               <p id="descrição-reflexao">${data.items[0].snippet.description}</p>
               <a id="btn-reflexao" href="https://www.youtube.com/watch?v=${data.items[0].id.videoId}" target="_blank">
               <ion-icon name="play-circle-outline"></ion-icon> Assistir
               </a>
            `;

      nextPageToken = data.nextPageToken;
      let videos = data.items;
      let ultimo = document.querySelector(".tds");
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

function nextVideo(){
  let ultimo = document.querySelector(".tds");
  ultimo.innerHTML = ""
  getVideo();
}

getVideo();

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
