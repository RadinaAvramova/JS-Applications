export class DetailsPage {
    constructor(recipeService, templateFunction, renderHandler, navigate) {
        this.recipeService = recipeService;
        this.templateFunction = templateFunction;
        this.renderHandler = renderHandler;
        this.navigate = navigate;
        this.showDetails = this._showCatalog.bind(this);
        this.goToEdit = this._goToEdit.bind(this);

    }

    async _showDetails(ctx) {
        let id = ctx.params.id;
        let recipe = await this.recipeService.getRecipeById(id);

        let template = this.templateFunction(recipe, this.goToEdit);
        this.renderHandler(template);
    }
    
    async _goToEdit(id) {
        let path = `/ediRecipe/${id}`;
        this.navigate(path);
    }
}