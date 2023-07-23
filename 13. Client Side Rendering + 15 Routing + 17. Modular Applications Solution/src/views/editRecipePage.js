import * as recipeService from "../services/recipeService.js";
import { html } from "../../node_modules/lit-html/lit-html.js";

let editPageTemplate = (recipe, submitHandler) => html`
<article>
    <form @submit=${(e) => submitHandler(e, recipe._id)}>
        <label>Name:<input type="text" name="name" placeholder="Recipe Name" .value=${recipe.name}></label>
        <label>Image:<input type="text" name="img" placeholder="Image URL" .value=${recipe.img}></label>
        <label>Ingredients:<textarea name="ingredients" placeholder="Enter ingredients on separate lines" .value=${recipe.ingredients.join('\n')}></textarea></label>
        <label>Preparation:<textarea name="steps" placeholder="Enter preparation steps on separate lines" .value=${recipe.steps.join('\n')}></textarea></label>
        <input type="submit" value="Edit Recipe">
    </form>
</article>`;


export async function showEditPage(ctx, next) {
    let id = ctx.params.id;
    //breaks lit-html refactor into lit-html template

    let result = await recipeService.getRecipeById(id);

    let template = editPageTemplate(result, editRecipe);

    ctx.renderBody(template);

    async function editRecipe(e, id) {
        e.preventDefault();
        let form = e.target;
        let formData = new FormData(form);
    
        let name = formData.get('name');
        let img = formData.get('img');
        let ingredients = formData.get('ingredients').split('\n');
        let steps = formData.get('steps').split('\n');
    
        let recipe = { _id: id, name, img, ingredients, steps };
        let result = await recipeService.editRecipe(recipe, id);
    
        ctx.page.show('/');
    }
}


