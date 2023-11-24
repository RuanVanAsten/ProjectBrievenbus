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
        }
        form {
          width: 300px;
          padding: 20px;
          background-color: #fff;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
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
      <form>
        <label for="username">Email:</label>
        <input type="text" id="username" name="username" required>
        <label for="password">Wachtwoord:</label>
        <input type="password" id="password" name="password" required>
        <button type="button" id="loginButton">Inloggen</button>
      </form>
    `;
    }

    // Wordt aangeroepen wanneer het element aan het DOM wordt toegevoegd
    connectedCallback() {
        // Voeg een click-eventlistener toe aan de inlogknop
        this.shadowRoot.getElementById('loginButton').addEventListener('click', () => {
            // Voeg hier inlogfunctionaliteit toe
            alert('Inloggen gelukt!');
        });
    }
}

// Registreer het aangepaste inlogcomponent
customElements.define('login-component', LoginComponent);
