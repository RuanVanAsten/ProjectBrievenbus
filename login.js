
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
  
  .logo {
      width: 100px;
      margin-bottom: 20px;
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
  
  button {
      background-color: #4caf50;
      color: #fff;
      padding: 10px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
  }
  
  button:hover {
      background-color: #45a049;
  }
  
  p {
      margin-top: 16px;
  }
  
  a {
      color: #007bff;
      text-decoration: none;
  }
  
  a:hover {
      text-decoration: underline;
  }
  #registerknop
  {
    color: blue;
  }
      </style>
      
      
  <div class="container">
  <img src="pigeon.jpg" alt="Logo" class="logo">
    <div class="form-container">
      <label for="email">Email:</label>
      <input type="email" id="email" placeholder="Enter your email" required>
  
      <label for="password">Password:</label>
      <input type="password" id="password" placeholder="Enter your password" required>
  
      <button id="loginButton">Inloggen</button>
  
      <p>Don't have an account? <button id="register">Register</button></p>
    </div>
  </div>
      `;

class app extends HTMLElement {
  constructor() {
    super();

    // CreÃ«er e en Shadow DOM
    const shadow= this.attachShadow({ mode: 'open' });
    shadow.appendChild(template.content.cloneNode(true));

    this.button = this.shadowRoot.querySelectorAll("button");

    // Voeg stijlen toe aan het Shadow DOM
    
  }
  
    // Wordt aangeroepen wanneer het element aan het DOM wordt toegevoegd
  connectedCallback() 
  {
    // Voeg een click-eventlistener toe aan de inlogknop
    this.shadowRoot.getElementById('loginButton').addEventListener('click', () => {
      // Voeg hier inlogfunctionaliteit toe
    this.login();
    });

      this.register();   
    
  }
  ChanePageEvent(id) {
    this.dispatchEvent(new CustomEvent("ChangePageEvent", {
      bubbles: true,
      composed: true,
      detail: id

    }))

  }

  
    // Inlog
    async login() {
      const emailInput = this.shadowRoot.getElementById('email');
      const passwordInput = this.shadowRoot.getElementById('password');
    
      const email = emailInput.value;
      const password = passwordInput.value;
    
      const url = 'http://linuxmpk.northeurope.cloudapp.azure.com:3000/login';
    
      const data = {
        username: email,
        password: password
      };
    
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });
    
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
    
        const responseData = await response.text();
        console.log('Login successful:', responseData);
        
      } catch (error) {
        console.error('There was a problem with the login:', error);

      }
    }
    
    
    }


  
  // Registreer het aangepaste inlogcomponent
  customElements.define('login-comp', app);