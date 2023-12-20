// Pegar Os Elementos Da Pagina
const menutoggle = document.querySelector('.toggle');
const mostraricon = document.querySelector('.icon-section');
const body = document.querySelector('body');
const UltimoBox = document.querySelector('.box-ultimos');
const IcoNotficacao = document.querySelector('.bx-bell');
const DivNotficacao = document.querySelector('.notficacao');
const CloseNotficacao = document.querySelector('.close');
var UlContent = document.querySelectorAll(".ul-content");
const list = document.querySelectorAll('.list');
const mensagemEl = document.querySelector(".mensagem");

// Consumindo Api
var mensagemA = document.createElement("a");
mensagemA.setAttribute("class", "reflxao");
var content_mensagem = document.querySelector(".mensagem-container");
content_mensagem.appendChild(mensagemA);
mensagemA.innerText = "Abaixa"

var mensagemJson = "../json/main.json";

fetch(mensagemJson)
.then((res) => res.text())
.then((res) => {
    res = JSON.parse(res)

    mensagemA.href = res.mensagem.link
    mensagemEl.innerText = res.mensagem.mensage;
})
.catch((err) => {
    mensagemEl.innerText = "Flha Na Api";
})

// Função Sepatando o Elemento e Adicionando / Removendo Elementos
function activeLink(){
    list.forEach((item) =>
    item.classList.remove('active'));
    this.classList.add('active');
}
list.forEach((item) =>
item.addEventListener('click',activeLink));

// Adicionar Eventos De Click
IcoNotficacao.addEventListener('click', () =>{ DivNotficacao.classList.add('active'); });
CloseNotficacao.addEventListener('click', () =>{ DivNotficacao.classList.remove('active'); });

// Separando Cada Item Dos Elementos
for( var i = 0; i < UlContent.length; i++){
    UlContent[i].addEventListener('click', Ulclick);
}

// Função Dos Item Do Elemento UlContent
function Ulclick(){
    UlContent.forEach((item) =>
    item.classList.remove("active"))
    this.classList.add("active")
}
//scrool cabeçario
window.addEventListener('scroll', function() {
    var header = document.querySelector('.header');
    if (window.scrollY > 50) {
      header.style.position = 'fixed';
      header.style.top = '0';
      header.style.width = '100%';
      header.style.background = '#33333321';
      header.style.boxShadow = '4px 4px 12px rgba(0,0,0, 0.20)';
    } else {
      header.style.position = 'relative';
      header.style.background = 'none';
      header.style.boxShadow = 'none';
    }
  });

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
        this.form.innerHTML = this.settings.success;
    }
    
    
    displayError() {
        this.form.innerHTML = this.settings.error;
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