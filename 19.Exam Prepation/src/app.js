import page from "../node_modules/page/page.mjs";
import { render } from "../node_modules/lit-html/lit-html.jss";
import { AuthService } from "../server/AuthService.js";
import { BaseCrudApiService } from "../server/BaseCrudApiService";
import { SessionService} from "/services/SessionService.js"
import { NavComponent } from "./components/nav/nav";
import { navTemplate } from "./components/nav/navTemplate";
import { HomeComponent } from "./components/home/home";
import { homeTemplate } from "./components/home/homeTemplate";
import { LoginComponent } from "./components/login/login";
import { loginTemplate } from "./components/login/loginTemplate";
import { DashboardComponent } from "./components/dashboard/dashboard";
import { dashboardTemplate } from "./components/dashboard/dashboardTemplate";
import { RegisterComponent } from "./components/register/register";
import { registerTemplate } from "./components/register/registerTemplate";
import { CreateComponent } from "./components/create/create";
import { createTemplate } from "./components/create/createTemplate";
import { DetailsComponent } from "./components/details/details";
import { detailsTemplate } from "./components/details/detailsTemplate";
import { EditComponent } from "./components/edit/edit";
import { editTemplate } from "./components/edit/editTemplate";
import { SeachComponent } from "./components/search/search";
import { searchTemplate } from "./components/search/searchTemplate";

const main = document.querySelector('#wrapper main');
const nav = document.querySelector('#wrapper header');

//Router
let router = {
    navigate: page.show,
    redirect: page.redirect
}

//BaseUrl
const baseUrl = 'http://localhost:3030';


//Render  handlers
let renderBody = (template) => render(template, main);
let renderNav  = (template) => render(template, nav);

//Service
let sessionService = new SessionService();
let authservice = new AuthService(baseUrl, sessionService);
let shoesService = new BaseCrudApiService(baseUrl, '/data/shoes', sessionService);

//Components
let navComponent = new NavComponent(authservice, renderNav, navTemplate, router);
let homeComponent = new HomeComponent(renderBody, homeTemplate);
let loginComponent = new LoginComponent(authservice, renderBody, loginTemplate, router);
let registerComponent = new RegisterComponent(authservice, renderBody, registerTemplate, router);
let dashboardComponent = new DashboardComponent(shoesService, renderBody, dashboardTemplate);
let createComponent = new CreateComponent(shoesService, renderBody, createTemplate, router);
let detailsComponent = new DetailsComponent(authservice, shoesService, renderBody, detailsTemplate, router);
let editComponent = new EditComponent(shoesService, renderBody, editTemplate, router);
let searchComponent = new SeachComponent(authservice, shoesService, renderBody, searchTemplate, router);

// Routing
page('/index.html', '/');
page(navComponent.showView);

page('/', homeComponent.showView);
page('/login', loginComponent.showView);
page('/register', registerComponent.showView);
page('/dashboard', dashboardComponent.showView);
page('/create', createComponent.showView);
page('/details/:id', detailsComponent.showView);
page('/edit/:id', editComponent.showView);
page('search', searchComponent.showView);

page.start();


