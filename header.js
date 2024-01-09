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



</style>
<div id="header">

<h1>Project Brievenbus</h1>
<nav>
<button id="login">Login</button>
<button id="register">Register</button>
<button id="home">Home</button>
<button id="history">History</button>
<button id="contact">Contact</button
</nav>
</div>



`;    



class app extends HTMLElement {
  constructor(){
    super();

    this.shadow = this.attachShadow({mode: "open"}) 
    this.shadow.append(template.content.cloneNode(true))
    
    this.button = this.shadowRoot.querySelectorAll("button")

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
        this.dispatchEvent(new CustomEvent("ChangePageEvent", {
            bubbles: true,
            composed: true,
            detail: id
        }))
    }
}


customElements.define('header-comp', app);



