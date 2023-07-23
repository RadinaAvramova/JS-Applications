import { html } from "../../../node_modules/lit-html/lit-html.js";

let modalTemplate = (message, handler) => html`
<div class="overlay"> 
    <div class"modal">
        <p>${message}</p>
        <button @click = ${(e) => handler(true)}>Accept</button>
        <button @click = ${(e) => handler(false)}>Cancel</button>
    </div>
</div>`


export class Modal {
    constructor(renderHandler) {
        this.renderHandler = renderHandler;
        this.showModal = this._showModal.bind(this);
    }

    async _showModal(message) {
        let handler = undefined;
        let promise = new Promise((resolve) => {
            handler = (val) => {
                this.renderHandler(null);
                resolve(val);
            }
        });
        let template = modalTemplate(message, handler);
        this.renderHandler(template);
        //ctx.renderBody(template);

        return promise;
    }
}    
    
