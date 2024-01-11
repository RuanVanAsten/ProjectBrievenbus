class app extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = /*html*/`
      <style>
        :host {
          display: block;
          width: 100%;
          background-color: #333;
          color: white;
          text-align: center;
          padding: 10px;
          position: fixed;
          bottom: 0;
        }
      </style>
      <div>
       Project Brievenbus 
      </div>
    `;
    }
}

customElements.define('footer-comp', app);
