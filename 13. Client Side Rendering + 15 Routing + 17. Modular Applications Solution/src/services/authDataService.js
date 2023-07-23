export class AuthDataService {
    setAccessToken(accessToken) {
        sessionStorage.setItem('accessToken', accessToken);
    }
    
    getAccessToken() {
        return sessionStorage.getItem('accessToken');
    }
    
    clearAccessToken() {
        sessionStorage.removeItem('accessToken');
    }
}

