import * as recipeService from "../services/recipeService.js";
import { html } from '../../node_modules/lit-html/lit-html.js';

let createRecipeTemplate = (submitHandler) => html`
<article>
    <form @submit=${submitHandler}>
        <label>Name:<input type="text" name="name" placeholder="Recipe Name"></label>
        <label>Image:<input type="text" name="img" placeholder="Image URL"></label>
        <label>Ingredients:<textarea name="ingredients" placeholder="Enter ingredients on separate lines"></textarea></label>
        <label>Preparation:<textarea name="steps" placeholder="Enter preparation steps on separate lines"></textarea></label>
        <input type="submit" value="Create Recipe">
    </form>
</article>`;

export async function showCreateRecipe(ctx, next) {
    let populatedTemplate = createRecipeTemplate(createRecipe);
    ctx.renderBody(populatedTemplate);
    

    async function createRecipe(e) {
        e.preventDefault();
        let form = e.target;
        let formData = new FormData(form);
        
        let name = formData.get('name');
        let img = formData.get('img');
        let ingredients = formData.get('ingredients').split('\n');
        let steps = formData.get('steps').split('\n');
    
        let result = await recipeService.createRecipe({ name, img, ingredients, steps });
    
        ctx.page.show('/');
    }
}

