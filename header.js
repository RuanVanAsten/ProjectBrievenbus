class HeaderComponent extends HTMLElement {
    constructor() {
        super();

        // Creëer een Shadow DOM
        this.attachShadow({ mode: 'open' });

        // Voeg stijlen toe aan het Shadow DOM
        this.shadowRoot.innerHTML = `
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
              
        }
        
      </style>
      <div id="header">
        <h1>Your Website</h1>
        <nav>
          <a href="#">Home</a>
          <a href="#">About</a>
          <a href="#">Contact</a>
        </nav>
      </div>
    `;
    }
}

// Registreer het aangepaste headercomponent
customElements.define('header-component', HeaderComponent);


