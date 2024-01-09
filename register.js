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
      </style>
      
      
  <div class="container">
  <img src="pigeon.jpg" alt="Logo" class="logo">
    <div class="form-container">
      <label for="email">Email:</label>
      <input type="email" id="email" placeholder="Enter your email" required>
  
      <label for="password">Password:</label>
      <input type="password" id="password" placeholder="Enter your password" required>

      <label for="password">Confirm Password:</label>
      <input type="password" id="password" placeholder="Enter your password" required>

      <button id="registerButton">Register</button>
  
      <p>Yoou already have an account? <button id="loginbtn">Login</button></p>
    </div>
  </div>
      `;

class app extends HTMLElement {
    constructor() {
      super();
  
     
      const shadow = this.attachShadow({ mode: 'open' });
      shadow.appendChild(template.content.cloneNode(true));
      
      
    }
  
   
    connectedCallback() {
      // Voeg een click-eventlistener toe aan de registerknop
      this.shadowRoot.getElementById('registerButton').addEventListener('click', () => {
        // Voeg hier registerfunctie toe
        this.register();
      });
    }
  
    //register
    async register() {
    
      const emailInput = this.shadowRoot.getElementById('email');
      const passwordInput = this.shadowRoot.getElementById('password');
  
      const email = emailInput.value;
      const password = passwordInput.value;
  
      const url = 'http://linuxmpk.northeurope.cloudapp.azure.com:3000/register';
  
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
        console.log('Registration successful:', responseData);
        // Voer verdere acties uit na een succesvolle registratie
      } catch (error) {
        console.error('There was a problem with the registration:', error);
        // Behandel fouten of geef meldingen weer voor de gebruiker bij een mislukte registratie
      }
    };
  }
  
  // Registreer het aangepaste inlogcomponent
customElements.define('register-comp', app);