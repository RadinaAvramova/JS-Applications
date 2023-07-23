import { html } from "../../../node_modules/lit-html/lit-html.js"
import { classMap } from "../../../node_modules/lit-html/directives/class-map.js"
//import * as userService from '../services/usersService.js';

export const registerTemplate = (form) => html`
<article id="register">
    <h2>Register</h2>
    <form @submit=${(e) => form.submitHandler(e)}>
        <label>E-mail: <input .className = ${form.email.error != '' ? 'error' : '' } type="text" name="email" .value=${form.email.value}></label><p class="hidden">${form.email.error}</p>
        <label>Password: <input type="password" name="password" .value=${form.password.value}></label>
        <label>Repeat: <input type="password" name="rePass" .value=${form.rePass.value}></label>
        <input type="submit" value="Register">
    </form>
</article>`;
