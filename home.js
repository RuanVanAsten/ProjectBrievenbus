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
      background-color: #ff0000;
      color: #fff;
      padding: 10px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }

    button:hover {
      background-color: #cc0000; /* Darker red on hover */
    }
  </style>

  <div class="container">
    <input type="date" id="dateInput" />
    <button id="clearButton">Clear</button>
    <select id="deliverySelect" size="15"></select>
    <button id="deleteButton">Delete Selected Option</button>
  </div>
`;

class App extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.appendChild(template.content.cloneNode(true));

    // Add event listener to the delete button
    const deleteButton = shadow.getElementById('deleteButton');
    deleteButton.addEventListener('click', this.deleteSelectedOption.bind(this));

    // Add event listener to the clear button
    const clearButton = shadow.getElementById('clearButton');
    clearButton.addEventListener('click', this.clearDateInput.bind(this));

    const dateInput = shadow.getElementById('dateInput');
    dateInput.addEventListener('input', this.filterOptionsByDate.bind(this));

    const selectElement = shadow.getElementById('deliverySelect');
    this.fetchDataAndPopulateSelect(selectElement);
  }

  async fetchDataAndPopulateSelect(selectElement) {
    try {
      const response = await axios.get('http://linuxmpk.northeurope.cloudapp.azure.com:3000/data');
      this.populateSelect(selectElement, response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  populateSelect(selectElement, data) {
    data.forEach((item, index) => {
      const option = document.createElement('option');
      option.value = index;
      // Pas deze regel aan op basis van de structuur van je gegevens
      option.textContent = `ID: ${item.Id}, Battery State: ${item.BatteryState}, Post: ${item.Post}, Timestamp: ${item.Timestamp}`;
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

  filterOptionsByDate() {
    const dateInput = this.shadowRoot.getElementById('dateInput');
    const selectedDate = new Date(dateInput.value);

    const selectElement = this.shadowRoot.getElementById('deliverySelect');
    const options = selectElement.options;

    for (let i = 0; i < options.length; i++) {
      const optionText = options[i].textContent;
      const optionDate = optionText.match(/\d{1,2} \w+ \d{4}/)?.[0] || optionText.match(/\d{1,2} \d{1,2} \d{4}/)?.[0];

      if (optionDate) {
        const optionDateObj = new Date(optionDate);
        if (
          optionDateObj.getFullYear() === selectedDate.getFullYear() &&
          optionDateObj.getMonth() === selectedDate.getMonth() &&
          optionDateObj.getDate() === selectedDate.getDate()
        ) {
          options[i].style.display = ''; // Show matching options
        } else {
          options[i].style.display = 'none'; // Hide non-matching options
        }
      } else {
        options[i].style.display = 'none'; // Hide options without a valid date
      }
    }
  }

  clearDateInput() {
    const dateInput = this.shadowRoot.getElementById('dateInput');
    dateInput.value = ''; // Clear the date input

    const selectElement = this.shadowRoot.getElementById('deliverySelect');
    const options = selectElement.options;

    for (let i = 0; i < options.length; i++) {
      options[i].style.display = ''; // Show all options
    }
  }
}

customElements.define('home-comp', App);
