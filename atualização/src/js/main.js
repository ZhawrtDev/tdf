// MAIN
const elEnviar = document.querySelector(".enviar");
const elPopupMain = document.querySelector(".popup-main");

window.addEventListener("click", (e) => {
    elEnviar.addEventListener("click", () => {
        elPopupMain.classList.add("active");
    });

    if(e.target.className == "popup-main active") {
        elPopupMain.classList.remove("active");
    }
})

// Toda A Configuração Para Cair As Notficações No Email
class FormSubmit {
    constructor(settings) {
        this.settings = settings;
        this.form = document.querySelector(settings.form);
        this.formButton = document.querySelector(settings.button);
        if (this.form){
            this.url = this.form.getAttribute("action");
        }
        this.sendForm = this.sendForm.bind(this);
    }
    
    displaySucces() {
        this.form.innerHTML += this.settings.success;
    }
    
    
    displayError() {
        this.form.innerHTML += this.settings.error;
    }
    
    getFormObject() {
        const formObject = {};
        const fields = this.form.querySelectorAll("[name]");
        fields.forEach((field) => {
            formObject[field.getAttribute("name")] = field.value;
        });
        return formObject;
    }
    
    onSubmission(event) {
        event.preventDefault();
        event.target.disabled = true;
        event.target.innerText = "Enviando...";
    }
    
    async sendForm(event) {
        try {
            this.onSubmission(event);
        await fetch(this.url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(this.getFormObject()),
        });
        this.displaySucces();
     } 
    catch (error) {
        this.displayError();
        throw new Error(error);
    }
    }
    
    init() {
        if (this.form) this.formButton.addEventListener("click",  this.sendForm);
        return this;
    }
}

const formSubmit = new FormSubmit({
    form: "[data-form]",
    button: "[data-button]",
    success: "<h1 class='success'>Mensagem enviada!</h1>",
    error: "<h1 class='error'>Não foi possível enviar sua mensagem.</h1>",
});
formSubmit.init();

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
