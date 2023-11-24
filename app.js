// Definieer het aangepaste inlogcomponent
class LoginComponent extends HTMLElement {
  constructor() {
    super();

    // Creëer een Shadow DOM
    this.attachShadow({ mode: 'open' });

    // Voeg stijlen toe aan het Shadow DOM
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          text-align: center;
          padding: 20px;
          background-color: #fff;
        }
        button {
          background-color: #007bff;
          color: #fff;
          padding: 10px 20px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
      </style>
      <div>
        <button id="loginButton">Inloggen</button>
      </div>
    `;
  }

  // Wordt aangeroepen wanneer het element aan het DOM wordt toegevoegd
  connectedCallback() {
    // Voeg een click-eventlistener toe aan de inlogknop
    this.shadowRoot.getElementById('loginButton').addEventListener('click', () => {
      // Voeg hier inlogfunctionaliteit toe
      alert('Inlogpoging!');
    });
  }
}

// Registreer het aangepaste inlogcomponent
customElements.define('login-component', LoginComponent);

// Definieer het aangepaste footercomponent
class FooterComponent extends HTMLElement {
  constructor() {
    super();

    // Creëer een Shadow DOM
    this.attachShadow({ mode: 'open' });

    // Voeg stijlen toe aan het Shadow DOM
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          text-align: center;
          padding: 20px;
          background-color: #333;
          color: #fff;
        }
      </style>
      <div>
        Footer-tekst hier
      </div>
    `;
  }
}

// Registreer het aangepaste footercomponent
customElements.define('footer-component', FooterComponent);
