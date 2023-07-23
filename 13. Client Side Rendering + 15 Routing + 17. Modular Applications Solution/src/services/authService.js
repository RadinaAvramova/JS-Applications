import { BaseApiService } from "./baseApiService.js";

export class AuthService extends BaseApiService {
    constructor(baseUrl, authDataService) {
        super(baseUrl);
        this.url = `${this.baseUrl}/users`;
        this.authDataService = authDataService;
    }

    async login(user) {
        let settings = {
            method: 'Post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        };
    
            let result = await this._internalJsonFetch(`${this.url}/login`, settings);
            this.authDataService.setAccessToken(result.accessToken);
            return result;
    }
    
    async register(user) {
        let settings = {
            method: 'Post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        };
    
        let result = await this._internalJsonFetch(`${this.url}/register`, settings);
        this.authDataService.setAccessToken(result.accessToken);
    }
    
    
    async logout(){
        let settings = {
            method: 'Get',
            headers: {
                'X-Authorization': getAccessToken()
            }
        };
    
        let result = await _internalJsonFetch(`${this.url}/logout`, settings);
        this.authDataService.clearAccessToken();
        return;
    }
    
    
    async isUserLoggedIn(){
        return this.authDataService.getAccessToken() != undefined;
    }



}

