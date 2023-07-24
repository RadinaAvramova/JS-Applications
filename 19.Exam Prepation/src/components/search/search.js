export class SeachComponent {
    constructor(authService, shoeService, renderHandler, templateFunction, router) {
        this.authService = authService;
        this.shoeService = shoeService;
        this.renderHandler = renderHandler;
        this.templateFunction = templateFunction;
        this.router = router;
        this.showView = this._showView.bind(this);
        this.searchandler = this._searchandler.bind(this);
    }

    async _showView(ctx) {
        let queryString = ctx.queryString;
        let shoes = [];
        let isUserLoggedIn =this.authService.isUserLoggedIn();
        if(queryString != '') {
            let queryArr = queryString.split('=');
            let value = queryArr[1];
            shoes = await this.shoeService.getByBrand(value);
        }
        
        let template = this.templateFunction(shoes,this.searchandler, isUserLoggedIn);
        this.renderHandler(template);
    }

    async _searchandler(e) {
        e.preventDefault();
        let form = e.target;
        let formData = new FormData(form);
        let searchValue = formData.get('search');


        if(searchValue == '' ) {
            alert('Brand cannot be empty');
            return;
        }

        this.router.navigate(`/search?brand=${searchValue}`);
    }
}