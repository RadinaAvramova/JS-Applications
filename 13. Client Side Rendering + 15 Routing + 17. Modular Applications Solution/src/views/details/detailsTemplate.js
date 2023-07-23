import { html } from '../../../node_modules/lit-html/lit-html.js'

export const detailsTemplate = (recipe, goToEdit) => html`
<article>
    <h2>${recipe.name}</h2>
    <div class="band">
        <div class="thumb">
            <img src=${recipe.img}>
        </div>
        <div class="ingredients">
            <h3>Ingredients:</h3>
            <ul>
                ${recipe.ingredients.map(i => html`<li>${i}</li>`)}
            </ul>
        </div>
    </div>
    <div class="description">
        <h3>Preparation:</h3>
        ${recipe.steps.map(s => html`<p>${s}</p>`)}
    </div>
    <button @click=${(e) => goToEdit(recipe._id)}>Edit</button>
</article>`;