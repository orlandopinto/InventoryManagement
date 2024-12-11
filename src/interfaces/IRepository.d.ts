export interface IRepository<T> {
    getAll: () => Promise<Array<T>>;
    getById: (id: string) => Promise<T>;
    update: (entity: T) => Promise<boolean>;
    add: (entity: T) => Promise<boolean>;
    delete: (id: string) => Promise<boolean>;
}