import { html } from '../../../node_modules/lit-html/lit-html.js'

export const catalogPageTemplate = (page, count, searchHandler, recipes, detailedRecipes, toggleCard, goToEdit) => html`
<section id="catalog">
    <div>
        <input type="text" @change =${searchHandler}>
    </div>

    <div>
        ${page > 1
        ? html`<a href=${`/?page=${page - 1}`}>Prev</a>`
        : ''}
        <p>${page}</p>
        ${page < count
            ? html `<a href=${`/?page=${page + 1}`}>Next</a>`
            : ''}
        
    </div>

    ${recipes.map(r => detailedRecipes[r._id] === undefined
        ? recipePreviewTemplate(r, toggleCard)
        : recipeCardTemplate(detailedRecipes[r._id], goToEdit)
    )}
</section>`;

let recipePreviewTemplate = (recipe, toggleCard) => html`
<article class="preview" @click=${() => toggleCard(recipe._id)}>
    <div class="title">
        <h2>${recipe.name}</h2>
    </div>
    <div class="small">
        <img src=${recipe.img}>
    </div>
</article>`;

