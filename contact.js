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
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      padding: 20px;
  }
  
 
  
  .form-container {
      max-width: 300px;
      margin: 0 auto;
  }
  
  label {
      display: block;
      margin-bottom: 8px;
  }
  
  input {
      width: 100%;
      padding: 8px;
      margin-bottom: 16px;
      box-sizing: border-box;
      border: 1px solid #ccc;
      border-radius: 4px;
  }
  
 
      </style>
      
      
  <div class="container">
  <img src="pigeon.jpg" alt="Logo" class="logo">
    <div class="form-container">
      <label for="email">Email:</label>
      <label for="password">Password:</label>
      
    </div>
  </div>
      `;

class LoginComponent extends HTMLElement {
    constructor() {
        super();

        // Creëer e en Shadow DOM
        const shadow = this.attachShadow({ mode: 'open' });
        shadow.appendChild(template.content.cloneNode(true));

        this.button = this.shadowRoot.querySelectorAll("button");

        // Voeg stijlen toe aan het Shadow DOM

    }

    // Wordt aangeroepen wanneer het element aan het DOM wordt toegevoegd
    connectedCallback() {
        // Voeg een click-eventlistener toe aan de inlogknop
       
    

    }
    ChanePageEvent(id) {
        this.dispatchEvent(new CustomEvent("ChangePageEvent", {
            bubbles: true,
            composed: true,
            detail: id

        }))

    }


    // Inlogfunctionaliteit
    
}

// Registreer het aangepaste inlogcomponent
customElements.define('login-component', LoginComponent);