import "./login.js"

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

    select {
      width: 90vw;
      height: 40vh;
      margin-bottom: 20px;
      overflow-y: auto;
    }

    input {
      width: 30%;
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
      background-color: #333; /* Darker red on hover */
    }
  </style>

  <div class="container">
    <input type="date" id="dateInput" />
    <button id="clearButton">Clear</button>
    <select id="deliverySelect" size="15"></select>
    <button id="deleteButton">Delete Selected Option</button>
  </div>
`;

class app extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    const dataMessages = [];

    shadow.appendChild(template.content.cloneNode(true));

    // Add event listener to the delete button
    const deleteButton = shadow.getElementById('deleteButton');
    deleteButton.addEventListener('click', this.deleteSelectedOption.bind(this));

    // Add event listener to the clear button
    const clearButton = shadow.getElementById('clearButton');
    clearButton.addEventListener('click', this.clearDateInput.bind(this));


    //date
    const dateInput = shadow.getElementById('dateInput');

    dateInput.addEventListener('change', event => {
      const selectedDate = event.target.value;
      
      const filteredMessages = this.dataMessages.filter(message => {
        const messageDate = new Date(message.Timestamp).toISOString().split('T')[0];

        return messageDate === selectedDate;
      });

      this.addToList(selectElement, filteredMessages);

    });

    const selectElement = shadow.getElementById('deliverySelect');
    console.log(selectElement);
    this.populateSelect(selectElement);
  }

  populateSelect(selectElement) {
    fetch('http://linuxmpk.northeurope.cloudapp.azure.com:3000/data')
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log(data);
        this.dataMessages = data;
  
        this.addToList(selectElement, data);

        selectElement.scrollTop = selectElement.scrollHeight;
      })
      .catch(error => {
        console.error('There was a problem fetching the data:', error);
      });
  }

  addToList(selectElement, data){
    selectElement.innerHTML = '';
    data.forEach((delivery, index) => {
      const option = document.createElement('option');
      option.value = index;
      const timestamp = delivery.Timestamp;

      const dateObj = new Date(timestamp);
      const date = dateObj.toISOString().split('T')[0];

      const time = dateObj.toTimeString().split(' ')[0];

      option.textContent = `Message: ${delivery.Post} - Delivered on ${date} at ${time}`;
      selectElement.appendChild(option);
    });
  }

  deleteSelectedOption() {
    const selectElement = this.shadowRoot.querySelector('select');
    const selectedIndex = selectElement.selectedIndex;

    if (selectedIndex !== -1) {
      selectElement.remove(selectedIndex);
    }
  }

  clearDateInput() {
    const dateInput = this.shadowRoot.getElementById('dateInput');
    dateInput.value = ''; 

    const selectElement = this.shadowRoot.getElementById('deliverySelect');
    const options = selectElement.options;

    for (let i = 0; i < options.length; i++) {
      options[i].style.display = ''; 
    }

    this.populateSelect(selectElement)
  }
}

customElements.define('history-comp', app);
