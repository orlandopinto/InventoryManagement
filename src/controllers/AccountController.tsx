import { IAccount, ILoginResult, LoginResult, TokenResult } from '../interfaces/IAccount';
import ServiceAccount from '../services/ServiceAccount';
import { LoginViewModel, RegisterViewModel } from '../types/AccountTypes';

class AccountController implements IAccount {

    private readonly service = new ServiceAccount();

    constructor() {

    }

    public async Login(entity: LoginViewModel): Promise<LoginResult> {
        let result: LoginResult = { isAuthenticated: false };
        try {
            result = await this.service.Login(entity);
        } catch (error) {
            console.log(error)
        }
        return result as LoginResult;
    }

    public async RefreshToken(entity: TokenResult): Promise<TokenResult> {
        let result: TokenResult = {};
        try {
            result = await this.service.RefreshToken(entity);
        } catch (error) {
            console.log(error)
        }
        return result as TokenResult;
    }

    public async Register(entity: RegisterViewModel): Promise<boolean> {
        let result: boolean = false
        try {
            result = await this.service.Register(entity);
        } catch (error) {
            console.log(error)
        }
        return result;
    }
}

export default AccountController