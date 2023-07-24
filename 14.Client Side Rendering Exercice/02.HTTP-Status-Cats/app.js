<div id="allCats">
    {{#each cats}}
    <div class="card col-md-4">
        <img class="card-img-center" src="{{imageLocation}}" width="250" height="250" alt="Card image cap">
        <div class="card-block">
            <button class="btn btn-primary">Show status code</button>
            <div style="display: none" id="{{id}}">
                <h4 class="card-title">Status Code: {{statusCode}}</h4>
                <p class="card-text">{{statusMessage}}</p>
            </div>
        </div>
    </div>
    {{/each}}
</div>



import { cats } from './catSeeder.js'
import { render } from 'https://unpkg.com/lit-html?module'
import { catsComponent } from './templates.js'

render(catsComponent(cats), document.getElementById('allCats'))