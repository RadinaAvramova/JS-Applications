import { html } from "../../node_modules/lit-html/lit-html.js";

export const navTemplate = (userIsLoggedIn, logoutHandler) => html`
${userIsLoggedIn 
        ? html`
    <a class="active" href="/">Catalog</a>
    <div id="user">
        <a href="/createRecipe">Create Recipe</a>
        <a id="logoutBtn" href="javascript:void(0)" @click=${logoutHandler}>Logout</a>
    </div>`
        : html `
    <a class="active" href="/">Catalog</a>
    <div id="guest">
        <a href="/login">Login</a>
        <a href="/register">Register</a>
    </div>`
    }`;


