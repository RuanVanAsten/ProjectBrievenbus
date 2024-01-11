
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
      max-width: 80vh;
      margin: 0 auto;
    }

    form {
      display: flex;
      flex-direction: column;
    }

    label {
      display: block;
      margin-top: 8px;
    }

    input {
      margin-bottom: 10px;
      padding: 8px;
      box-sizing: border-box;
      border: 1px solid #ccc;
      border-radius: 4px;
    }

    textarea {
      max-width: 80vh;
      margin-bottom: 10px;
      padding: 8px;
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
      margin-bottom: 10px;
    }

    button:hover {
      background-color: #333;
    }
  </style>

  <div class="container">
    <img src="pigeon.jpg" alt="Logo" class="logo">
    <div class="form-container">
      <p>Project brievenbus <br> <br> Steffen Pousset en Ruan Van Asten</p>
      
      <form id="contactForm">
        <label for="name">Naam:</label>
        <input type="text" id="name" name="name" required>

        <label for="email">E-mail:</label>
        <input type="email" id="email" name="email" required>

        <label for="message">Bericht:</label>
        <textarea id="message" name="message" rows="4" required></textarea>

        <button type="button" id="submitBtn">Verzend</button>
      </form>
    </div>
  </div>
`;


class app extends HTMLElement {
  constructor() {
    super();

    // Creëer en Shadow DOM
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.appendChild(template.content.cloneNode(true));

    // Voeg event listener toe aan de verzendknop
    this.shadowRoot.getElementById('submitBtn').addEventListener('click', this.handleSubmit.bind(this));
  }

  handleSubmit() {
    const form = this.shadowRoot.getElementById('contactForm');
    const formData = new FormData(form);

    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');

    // Verzend het e-mailbericht via Email.js
    emailjs.send("service_8ecfe8b", "template_p981o5t", {
      name,
      email,
      message
    })
    .then(function (response) {
      console.log('SUCCESS!', response.status, response.text);
      alert('SUCCESS!');
    }, function (error) {
      console.error("Fout bij het verzenden van e-mail:", error);
      alert("Fout bij het verzenden van e-mail");
    });
  }

  ChangePageEvent(id) {
    this.dispatchEvent(new CustomEvent("ChangePageEvent", {
      bubbles: true,
      composed: true,
      detail: id
    }));
  }
}

customElements.define('contact-comp', app);
