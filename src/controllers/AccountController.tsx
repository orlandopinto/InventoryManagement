import { IAccount, ILoginResult } from '../interfaces/IAccount';
import ServiceAccount from '../services/ServiceAccount';
import { LoginViewModel, RegisterViewModel } from '../types/AccountTypes';

class AccountController implements IAccount {
    
    private readonly service = new ServiceAccount();

    constructor() {

    }

    public async Login(entity: LoginViewModel): Promise<ILoginResult | undefined> {
        try {
            return await this.service.Login(entity);
        } catch (error) {
            console.log(error)
        }
    }

    public async Register(entity: RegisterViewModel): Promise<boolean | undefined> {
        try {
            return await this.service.Register(entity);
        } catch (error) {
            console.log(error)
        }
    }
}

export default AccountController