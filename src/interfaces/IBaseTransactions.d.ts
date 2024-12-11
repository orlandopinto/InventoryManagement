export interface IBaseTransactions {
    Get: () => Promise<Array<string>>;
    GetById: (id: string) => Promise<string>;
    Post: (entity: any) => Promise<boolean>;
    Put: (entity: any) => Promise<boolean>;
    Delete: (id: string) => Promise<boolean>;
}