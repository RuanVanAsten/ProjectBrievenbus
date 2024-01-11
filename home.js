
const template = document.createElement("template");
template.innerHTML = /*html*/`
  <style>
    :host {
    font-family: Arial, sans-serif;
  
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #f4f4f4;
    }
    .container {
      text-align: center;
      background-color: #fff;
      border-radius: 10px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      padding: 20px;
      margin-top: 80px;
      width: 500px;
    }
    
    .logo {
      width: 100px;
      margin-bottom: 20px;
    }
    
    .form-container {
      max-width: 300px;
      margin: 0 auto;
    }
    
   
    p {
      margin-top: 16px;
    }
    
   
   
  </style>
      
      
  <div class="container">
  <img src="pigeon.jpg" alt="Logo" class="logo">
    <div class="form-container">
      
      <p>Dit is ons project brievenbus, waar je kunt inloggen en registreren. <br> Na het inloggen krijg je toegang tot de history pagina, waar je kunt zien of je post hebt ontvangen of niet.</p>
    </div>
  </div>
      `;

class app extends HTMLElement {
  constructor() {
    super();

    
    const shadow= this.attachShadow({ mode: 'open' });
    shadow.appendChild(template.content.cloneNode(true));

    this.button = this.shadowRoot.querySelectorAll("button");

    // Voeg stijlen toe aan het Shadow DOM
    
  }
  
  
  connectedCallback() 
  {
   
    this.shadowRoot.getElementById('loginButton').addEventListener('click', () => {
  
    this.login();
    });

      
    
  }
  ChanePageEvent(id) {
    this.dispatchEvent(new CustomEvent("ChangePageEvent", {
      bubbles: true,
      composed: true,
      detail: id

    }))

  }
    
    }
  customElements.define('home-comp', app);