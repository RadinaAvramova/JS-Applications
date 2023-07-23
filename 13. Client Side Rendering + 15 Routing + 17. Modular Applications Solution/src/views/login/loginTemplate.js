import { html } from '../../node_modules/lit-html/lit-html.js';

export const loginTemplate = (login) => html`
<article id="login">
    <h2>Login</h2>
    <form @submit=${login}>
        <label>E-mail: <input type="text" name="email"></label>
        <label>Password: <input type="password" name="password"></label>
        <input type="submit" value="Login">
    </form>
</article>`;