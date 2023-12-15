import "./footer.js"
import "./header.js"
import "./login.js"
import "./register.js"
import "./postHistory.js"


const template = document.createElement("template");

template.innerHTML = /*html*/ ` 
    <div id="mainPage">
        <header-component></header-component>
    
        <contact-component></contact-component>
    
        <footer-component></footer-component>
    </div>

   

`;




class app extends HTMLElement
{   
    constructor(){
        super()
        const shadow = this.attachShadow({mode: "open"}) // zorgt ervoor dart het component een afgeschermde stijl kan hebben
        shadow.append(template.content.cloneNode(true))

        this.cachedPages = [];
        this.currentPage = "";
        this.mainPage = this.shadowRoot.querySelector("#mainPage");
    }

    ChangePageEvent(e){
        console.log("btnPress Received " + e.detail);

        this.showPages(e.detail);
    }

    connectedCallback(){
        this.addEventListener("ChangePageEvent", this.ChangePageEvent);
    }

    showPages(page)
    {
        console.log(page);
        for(let oldPage of this.cachedPages){
                this.shadowRoot.querySelector("<login-component></login-component>").style.display = "none";
                
        }

        if(this.cachedPages.indexOf(page) !== -1){
            console.log("i already cached! " + page)
            
            this.shadowRoot.querySelector(`#${page}`).style.display = "block";


        }
        else{
            this.cachedPages.push(page) 
            console.log(`${page}`)
            
            let newPage = document.createElement(`${page}-comp`);
            newPage.setAttribute("id", page)

            this.mainPage.append(newPage)

        }
        console.log(this.cachedPages);

        
    }
    
}

customElements.define('app-comp', app)