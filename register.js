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
      margin-top: 80px;
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
      background-color: #555;
      color: #fff;
      padding: 10px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
  
  button:hover {
      background-color: #333;
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

    
      <label for="confirmPassword">Confirm Password:</label>
      <input type="password" id="confirmPassword" placeholder="Confirm your password" required>
      
      <button id="registerButton">Register</button>
  
      <p>You already have an account? <button id="login">Login</button></p>
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
    this.shadowRoot.getElementById('registerButton').addEventListener('click', () => {
      this.register();
    });

    this.shadowRoot.getElementById("login").addEventListener('mousedown', (e) =>{
      console.log("btn Clicked")
      this.ChangePageEvent("login")
    })
  }
  ChangePageEvent(id) {
    this.dispatchEvent(new CustomEvent("ChangePageEvent", {
      bubbles: true,
      composed: true,
      detail: id

    }))
  }

    //register
  async register() {
  
    const emailInput = this.shadowRoot.getElementById('email');
    const passwordInput = this.shadowRoot.getElementById('password');
    const confirmPasswordInput = this.shadowRoot.getElementById('confirmPassword');

    const email = emailInput.value;
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    if (password !== confirmPassword) {
      alert('Wachtwoord en bevestigingswachtwoord komen niet overeen.');
      return;
    }
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
      alert("registratie is gelukt");
      this.ChangePageEvent("login")

   
    } catch (error) {
      console.error('There was a problem with the registration:', error);
      alert('There was a problem with the registration:', error);
    
    }
  };
  }
  
customElements.define('register-comp', app);