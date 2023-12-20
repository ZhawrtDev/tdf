const menutoggle = document.querySelector('.toggle');
const navigation = document.querySelector('.navigation');
const mostraricon = document.querySelector('.icon-section');
const HinoLink = document.querySelector('.hinolink');
const HinoLinkPrincipal = document.querySelector('.hinolinkp');
const HinoMostrar = document.querySelector('.hino-mostrar');
const HinoFechar = document.querySelector('.fechar');
const ButaoPagina = document.querySelector('.btn-p')
const MobileBtn = document.querySelector('#btn-p');
const ImgMobile = document.querySelector('#img-mobile');
const IcoNotficacao = document.querySelector('.bx-bell');
const DivNotficacao = document.querySelector('.notficacao');
const CloseNotficacao = document.querySelector('.close');

IcoNotficacao.addEventListener('click', () =>{
    DivNotficacao.classList.add('active')
});

CloseNotficacao.addEventListener('click', () =>{
    DivNotficacao.classList.remove('active')
});

menutoggle.addEventListener('click', ()=> {
    menutoggle.classList.toggle('active');
    navigation.classList.toggle('active');
});

HinoLink.addEventListener('click', () =>{
    HinoMostrar.classList.add('active');
});

HinoLinkPrincipal.addEventListener('click', () =>{
    HinoMostrar.classList.add('active');
});

ButaoPagina.addEventListener('click', () =>{
    HinoMostrar.classList.add('active');
});

HinoFechar.addEventListener('click', ()=>{
    HinoMostrar.classList.remove('active');
});

MobileBtn.addEventListener('click', ()=>{
    HinoMostrar.classList.add('active');
});

ImgMobile.addEventListener('click', ()=>{
    HinoMostrar.classList.add('active');
});

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