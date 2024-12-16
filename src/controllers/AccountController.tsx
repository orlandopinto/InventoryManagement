import { IAccount, TokenResult } from '../interfaces/IAccount';
import { CustomError } from '../models/CustomError';
import ServiceAccount from '../services/ServiceAccount';
import { LoginViewModel, RegisterViewModel } from '../types/AccountTypes';
import { _Body } from '../utilities/Constants.d';

class AccountController implements IAccount {

    service: ServiceAccount;

    constructor() {
        this.service = new ServiceAccount();
    }

    public async Login(entity: LoginViewModel): Promise<string> {
        try {
            return await this.service.Login(entity);
        } catch (err) {
            throw err as CustomError
        }
    }

    public async RefreshToken(entity: TokenResult): Promise<string> {
        try {
            return await this.service.RefreshToken(entity);
        } catch (err) {
            throw err as CustomError
        }
    }

    public async Register(entity: RegisterViewModel): Promise<string> {
        try {
            return await this.service.Register(entity);
        } catch (err) {
            throw err as CustomError
        }
    }
}

export default AccountController