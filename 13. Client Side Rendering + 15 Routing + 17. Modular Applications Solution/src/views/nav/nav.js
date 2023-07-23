
export class Nav { 
    constructor(authService, redirect, templateFunction, renderHandler) {
        this.authService = authService;
        this.redirect = redirect;
        this.templateFunction = templateFunction;
        this.renderHandler = renderHandler;
        this.showNavigation = this._showNavigation.bind(this);
        this.logoutHandler = this._logoutHandler.bind(this);


    }

    async _showNavigation(ctx, next) {
        let userIsLoggedIn = await this.authService.isUserLoggedIn();

        let template = this.templateFunction(userIsLoggedIn, this.logoutHandler);
        this.renderHandler(template);
        next();
    }

    async _logoutHandler() {
        await this.authService.logout();
        this.redirect('/')
        //ctx.page.redirect('/');
    }
}



