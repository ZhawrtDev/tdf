// HEADER SCRIPT
const navigation = document.querySelector(".navigation");
const menu = document.querySelector(".toogle");
const close = document.querySelector(".close");

menu.addEventListener("click", () => {
    navigation.classList.add("active");
    menu.classList.add("active");
    close.classList.add("active");
});

close.addEventListener("click", () => {
    navigation.classList.remove("active");
    menu.classList.remove("active");
    close.classList.remove("active");
});

// MAIN
window.addEventListener("click", (e) => {
    // POP UP - MAIN - NOTFICAÇÃO
    const ElNotificacao = document.querySelector(".bx-bell");
    const ElNotificacaoPopUp = document.querySelector(".notficação");

    ElNotificacao.addEventListener("click", () => {
        ElNotificacaoPopUp.classList.toggle("active");
    });

    if (e.target.tagName == "SECTION" || e.target.tagName == "HEADER") {
        ElNotificacaoPopUp.classList.remove("active");
    }

    if(e.target.className == "bx bx-bell") {
        navigation.classList.remove("active");
        menu.classList.remove("active");
        close.classList.remove("active");
    }

})

// SCROLL
document.addEventListener("DOMContentLoaded", function() {
    var scrollToTopButton = document.getElementById('scroll-to-top');

    if (!scrollToTopButton) {
        console.error("Element with ID 'scroll-to-top' not found.");
        return;
    }

    window.onscroll = function() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            scrollToTopButton.classList.remove('hidden');
        } else {
            scrollToTopButton.classList.add('hidden');
        }
    };
});

function scrollToTop() {
    document.body.scrollTop = 0; // Para navegadores mais antigos
    document.documentElement.scrollTop = 0; // Para navegadores modernos
}