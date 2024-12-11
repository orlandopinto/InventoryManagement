import Service from '../services/service';

class AccountController {
    private readonly service = new Service();
    constructor() { }

    /**
     * GetAllUsers
     */
    public async GetAllUsers() {
        try {
            return await this.service.Get();
        } catch (error) {
            console.log(error)
        }
    }
}

export default AccountController