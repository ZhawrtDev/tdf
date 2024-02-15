// Darck Theme
var isColorChanged = false;

var buttons = document.querySelectorAll(".uil-moon");

buttons.forEach(function (button) {
  button.addEventListener("click", function () {
    if (isColorChanged) {
      document.documentElement.style.setProperty("--color-black", "#342A24");
      document.documentElement.style.setProperty("--color-gray", "#616063");
      document.documentElement.style.setProperty("--color-fundo", "#8e7a62");
      document.documentElement.style.setProperty("--background-color", "#fff");
      document.documentElement.style.setProperty(
        "--color-destaques",
        "#897c6e"
      );
      document.documentElement.style.setProperty("--color-destaques", "#fff");
      document.documentElement.style.setProperty(
        "--shadow-destaque",
        "1px 1px 12px #333"
      );
    } else {
      document.documentElement.style.setProperty("--color-black", "#D3C4CB");
      document.documentElement.style.setProperty("--color-gray", "#D1CED8");
      document.documentElement.style.setProperty(
        "--background-color",
        "#1e1e1e"
      );
      document.documentElement.style.setProperty(
        "--color-destaques",
        "#161616"
      );
      document.documentElement.style.setProperty("--color-fundo", "#635443");
      document.documentElement.style.setProperty(
        "--shadow-destaque",
        "1px 1px 12px rgba(255,255,255 0.100)"
      );
    }
    isColorChanged = !isColorChanged;
  });
});

// POP UP - MAIN - NOTFICAÇÃO
window.addEventListener("click", (e) => {
  const ElNotificacao = document.querySelector(".uil-bell");
  const ElNotificacaoPopUp = document.querySelector(".notficação");

  ElNotificacao.addEventListener("click", () => {
    ElNotificacaoPopUp.classList.toggle("active");
  });

  if (e.target.tagName == "SECTION" || e.target.tagName == "HEADER") {
    ElNotificacaoPopUp.classList.remove("active");
  }

  if (e.target.className == "bx bx-bell") {
    navigation.classList.remove("active");
    menu.classList.remove("active");
    close.classList.remove("active");
  }
});

// SCROLL
document.addEventListener("DOMContentLoaded", function () {
  var scrollToTopButton = document.getElementById("scroll-to-top");

  if (!scrollToTopButton) {
    console.error("Element with ID 'scroll-to-top' not found.");
    return;
  }

  window.onscroll = function () {
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      scrollToTopButton.classList.remove("hidden");
    } else {
      scrollToTopButton.classList.add("hidden");
    }
  };
});

function scrollToTop() {
  document.body.scrollTop = 0; // Para navegadores mais antigos
  document.documentElement.scrollTop = 0; // Para navegadores modernos
}

// SEARCH
const searchInput = document.getElementById("search-input");
const mainContent = document.querySelector("#video-container");
const searchIcon = document.querySelector(".uil-search");

searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    searchYourVideos();
  }
});

window.addEventListener("click", (e) => {
  if (e.target.className == "pop-up-input-main active") {
    searchInput.classList.remove("active");
    searchIcon.classList.remove("active");
    mainContent.classList.remove("active");
  }
});

searchInput.addEventListener("click", () => {
  searchInput.classList.add("active");
  searchIcon.classList.add("active");
  mainContent.classList.add("active");
});
