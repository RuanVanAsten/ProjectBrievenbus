const template = document.createElement("template");
template.innerHTML = `
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

class PostHistoryComponent extends HTMLElement {
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
    this.populateSelect(selectElement);
  }

  populateSelect(selectElement) {
    const fakeTimestamps = [
      '4 August 2021 09:35',
      '27 July 2021 18:15',
      '19 June 2021 11:50',
      '11 May 2021 16:25',
      '3 April 2021 11:00',
      '26 March 2021 19:40',
      '17 February 2021 14:15',
      '9 January 2021 22:55',
      '1 December 2020 17:30',
      '23 October 2020 11:15',
      '14 September 2020 15:50',
      '6 August 2020 10:25',
      '28 June 2020 19:05',
      '20 May 2020 12:40',
      '12 April 2020 17:15',
      '4 March 2020 11:00',
      '24 February 2020 19:40',
      '15 January 2020 14:15',
      '7 December 2019 22:55',
      '29 November 2019 17:30',
      '21 October 2019 11:15',
      '13 September 2019 15:50',
      '5 August 2019 10:25',
      '27 June 2019 19:05',
      '19 May 2019 12:40',
      '11 April 2019 17:15',
      '3 March 2019 11:00',
      '23 February 2019 19:40',
      '14 January 2019 14:15',
      '6 December 2018 22:55',
      '28 November 2018 17:30',
      '20 October 2018 11:15',
      '12 September 2018 15:50',
      '4 August 2018 09:35',
      '27 July 2018 18:15',
      '19 June 2018 11:50',
      '11 May 2018 16:25',
      '3 April 2018 11:00',
      '26 March 2018 19:40',
      '17 February 2018 14:15',
      '9 January 2018 22:55',
      '1 December 2017 17:30',
      '23 October 2017 11:15',
      '14 September 2017 15:50',
      '6 August 2017 10:25',
      '28 June 2017 19:05',
      '20 May 2017 12:40',
    ];
    fakeTimestamps.forEach((timestamp, index) => {
      const option = document.createElement('option');
      option.value = index;
      option.textContent = `Package was delivered on ${timestamp}`;
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

customElements.define('posthistory-component', PostHistoryComponent);
