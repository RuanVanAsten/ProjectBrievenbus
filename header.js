const template = document.createElement("template")
template.innerHTML = /*html*/`
<style>
    :host {
        display: block;
        background-color: #333;
        color: white;
        width: 100%;
        text-align: center;
        position:fixed;
        top: 0;
        padding: 10px;
        height: 100px;
    }
    button {
        background-color: #555;
        color: #fff;
        padding: 5px;
        margin-bottom: 20px;
        margin-left: 10px;
        border: none;
        border-radius: 4px;
        
    }


    </style>
    <div id="header">
        <h1>Project Brievenbus</h1>
        <nav>
            <button id="login">Login</button>
            <button id="register">Register</button>
            <button id="home">Home</button>
            <button id="history">History</button>
            <button id="contact">Contact</button>
        </nav>
    </div>
`;    

class app extends HTMLElement {
    constructor(){
        super();
        this.shadow = this.attachShadow({mode: "open"}) 
        this.shadow.append(template.content.cloneNode(true))
        
        this.button = this.shadowRoot.querySelectorAll("button")

        this.isAuthenticated = false;
        document.addEventListener("InlogStatusChanged", (event) => {
        this.isAuthenticated = event.detail;
        });
    }
    connectedCallback()
    {
        this.button.forEach(btn => {
            btn.addEventListener('mousedown', (e) =>{
                console.log("btn Clicked")
                this.ChangePageEvent(btn.getAttribute("id"))
            })
        });
    }
    ChangePageEvent(id){
        if (id === "history") {
            if (this.isAuthenticated) {
              this.dispatchEvent(new CustomEvent("ChangePageEvent", {
                bubbles: true,
                composed: true,
                detail: id
              }));
            } else {
              console.log('Je hebt geen autorisatie voor de History-pagina.');
              alert('Je hebt geen autorisatie voor de History-pagina.');
            }
        } 
        else{
            this.dispatchEvent(new CustomEvent("ChangePageEvent", {
                bubbles: true,
                composed: true,
                detail: id
        }))}  
    }
}
customElements.define('header-comp', app);



