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
      padding-left: 20px;
      padding-right: 20px;
      
      margin-top: 80px;
  }
  
  .logo {
      width: 100px;
      
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
          <p>Project brievenbus <br> <br> 
            Steffen pousset en Ruan Van Asten</p>
        </div>
      </div>
    `;

class app extends HTMLElement {
    constructor() {
        super();

        // Creëer e en Shadow DOM
        const shadow = this.attachShadow({ mode: 'open' });
        shadow.appendChild(template.content.cloneNode(true));

        this.button = this.shadowRoot.querySelectorAll("button");
    }

   
    connectedCallback() {
    }
    ChangePageEvent(id) {
        this.dispatchEvent(new CustomEvent("ChangePageEvent", {
            bubbles: true,
            composed: true,
            detail: id

        }))
    }

}


customElements.define('contact-comp', app);