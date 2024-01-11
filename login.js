
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
    
    
    #registerknop
    {
      color: blue;
    }
    #logoutButton{
      
      display: block;
      margin-bottom: 8px;
      color: red;
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
      <button id="logoutButton">Uitloggen</button>
    </div>
  </div>
      `;

class app extends HTMLElement {
  constructor() {
    super();

    
    this.shadow = this.attachShadow({mode: "open"}) 
    this.shadow.append(template.content.cloneNode(true))
    
    this.button = this.shadowRoot.querySelectorAll("button")
    this.isAuthenticated = false; 
    // Voeg stijlen toe aan het Shadow DOM
    
  }
  
  
  connectedCallback() 
  {
   
    this.shadowRoot.getElementById('loginButton').addEventListener('click', () => {
  
    this.login();
    });

    this.shadowRoot.getElementById('logoutButton').addEventListener('click', () => {
      this.logout();
    });

    this.shadowRoot.getElementById("register").addEventListener('mousedown', (e) =>{
          console.log("btn Clicked")
          this.ChangePageEvent("register")
      })
  ;
  }

    ChangePageEvent(id) {
      if (id === "history") {
        // Voeg hier je autorisatiecontrole toe
        if (this.isAuthenticated) {
          this.dispatchEvent(new CustomEvent("ChangePageEvent", {
            bubbles: true,
            composed: true,
            detail: id
          }));
        } else {
          console.log('Je hebt geen autorisatie voor de History-pagina.');
          // Voeg hier eventueel een melding toe aan de gebruiker dat ze geen toegang hebben
        }
      }
      else{
        this.dispatchEvent(new CustomEvent("ChangePageEvent", {
          bubbles: true,
          composed: true,
          detail: id

        }));
      }

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
        alert('Login successful');
                                    
        this.setInlogStatus(true);
        this.ChangePageEvent("history")
     
        
        
      } catch (error) {
        console.error('There was a problem with the login:', error);

      }
    }
    logout() {
      this.setInlogStatus(false);
      console.log('Logout successful');
      alert('Logout successful');
    }
    setInlogStatus(isAuthenticated) {
      this.isAuthenticated = isAuthenticated;
      this.dispatchEvent(new CustomEvent("InlogStatusChanged", {
        bubbles: true,
        composed: true,
        detail: isAuthenticated
      }));
    }
    
    }
  customElements.define('login-comp', app);
