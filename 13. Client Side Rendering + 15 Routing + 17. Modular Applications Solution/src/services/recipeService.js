import { BaseApiService } from "./baseApiService.js";


export class RecipeService extends BaseApiService { 
    constructor(baseUrl, authDataService) {
        super(baseUrl);
        this.url = `${this.baseUrl}/data/recipes`;
        this.authDataService = authDataService;
    }

    async getRecipesWithSelectedColumns(columns) {
        let columnsString = columns.join(',');
        let encodedPart = encodeURIComponent(columnsString);
        try {
            const result = await this._internalJsonFetch(`${this.url}?select=${encodedPart}`);
            return Object.values(result);
        } catch(e) {
            if(e instanceof UserReadableError) {
                alert(e.message);
            }
        }
    
    }


    async getRecipesCount() {
        let url = `${this.url}?count`;
        const result = await this._internalJsonFetch(url);
        console.log(result);
        return result;
    }

    async getRecipesBySearch(page = 1, queryObj) {
        let take = 1;
        let skip = (page - 1) * take;
        let url = `${this.url}?offset=${skip}&pageSize=${take}`;

        if(Object.values(queryObj).length > 0) {
            let queryString = Object.entries(queryObj).map(([key, value]) => `${key} LIKE "${value}"`).join(' AND ');
            let encodedString = encodeURIComponent(queryString);
            url += `&where=${encodedString}`;
        }

        const result = await this._internalJsonFetch(url);
        return Object.values(result);
    }
    
    async getRecipeById(id) {
        const result = await this._internalJsonFetch(`${this.url}/${id}`);
        return result;
    }
    
    async createRecipe(recipe) {
        let settings = {
            method: 'Post',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': this.authDataService.getAccessToken()
            },
            body: JSON.stringify(recipe)
        };
    
        let result = await this._internalJsonFetch(this.url, settings);
        return result;
    }
    
    async editRecipe(recipe, id) {
        let settings = {
            method: 'Put',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': this.authDataService.getAccessToken()
            },
            body: JSON.stringify(recipe)
        };
    
        let result = await this._internalJsonFetch(`${url}/${id}`, settings);
        return result;
    }
}

