export class LoginPage {
    constructor(authService, templateFunction, renderHandler, navigate) {
        this.authService = authService;
        this.templateFunction = templateFunction;
        this.renderHandler = renderHandler;
        this.navigate = navigate;
        this.showLogin = this._showLogin.bind(this);
        this.login = this._login.bind(this);
    }

    async _showLogin(ctx, next) {
        let template = this.templateFunction(this.login);
        this.renderHandler(template);
        //ctx.renderBody(template);
    }
    
    
    async _login(e) {
        e.preventDefault();
        let form = e.target;
        let formData = new FormData(form);
    
        let user = {
            email: formData.get('email'),
            password: formData.get('password')
        };
    
        let result = await this.authService.login(user);
        this.navigate('/');
        //ctx.page.show('/');
    }


}



