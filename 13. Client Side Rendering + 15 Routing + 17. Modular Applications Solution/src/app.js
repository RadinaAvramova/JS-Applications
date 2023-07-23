import { render } from '../node_modules/lit-html/lit-html.js';
import page from '../node_modules/page/page.mjs'
import { AuthDataService } from './services/authDataService.js';
import { AuthService } from './services/authService.js';
import { RecipeService } from './services/recipeService.js';


import { CatalogPage } from './views/catalog/catalogPage.js';
import { catalogPageTemplate } from './views/catalog/catalogTemplate.js';
import { loginTemplate } from './views/login/loginTemplate.js';
import { LoginPage } from './views/login/loginPage.js';
//import { showCreateRecipe } from './views/createRecipePage.js';
//import { showEditPage } from './views/editRecipePage.js';
import { Nav } from './views/nav/nav.js';
import { navTemplate } from './views/nav/navTemplate.js';
import { DetailsPage } from './views/details/detailsPage.js';
import { detailsTemplate } from './views/details/detailsTemplate.js';
import { RegisterPage } from './views/register/registerPage.js';
import { registerTemplate } from './views/register/registerTemplate.js';

const main = document.querySelector('main');
const navElement = document.querySelector('nav');
const modalElement = document.getElementById('modal');

let baseUrl = 'http://localhost:3030';

//Render Handler
let renderBody = (template) => render(template, main);
let renderNav = (template) => render(template, navElement);
let renderModal = (template) => render(template, modalElement)

//Services
const authDataService = new AuthDataService();
const authService = new AuthService(baseUrl, authDataService);
const recipeService = new RecipeService(baseUrl, authDataService);
const modalService = new Modal(renderModal);

//Component 
let navView = new Nav(authService, page.redirect, navTemplate, renderNav);
let catalogPage = new CatalogPage(recipeService, catalogPageTemplate, renderBody, page.show, modalService);
let loginPage = new LoginPage(authService, loginTemplate, renderBody, page.show);
let registerPage = new RegisterPage(authService, registerTemplate, renderBody, page.show);
let detailsPage = new DetailsPage(recipeService, detailsTemplate, renderBody, page.show);

page('/index.html', '/');
page(navView.showNavigation);



page('/details/:id', detailsPage.showDetails);

//page('/createRecipe', showCreateRecipe);
//page('/editRecipe/:id', showEditPage);
page('/login', loginPage.showLogin);
page('/register', registerPage.showRegister);
page('/', catalogPage.showCatalog);
//page('/:id', catalogPage.showCatalog);

//page('/register', showRegister);

page.start();
