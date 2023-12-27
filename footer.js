class app extends HTMLElement {
    constructor() {
        super();

        // Creëer een Shadow DOM
        this.attachShadow({ mode: 'open' });

        // Voeg stijlen toe aan het Shadow DOM
        this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
          background-color: #333;
          color: white;
          text-align: center;
          padding: 10px;
          position: fixed;
          bottom: 0;
        }
      </style>
      <div>
        Project Brievenbus
      </div>
    `;
    }
}

// Registreer het aangepaste footercomponent
customElements.define('footer-comp', app);
