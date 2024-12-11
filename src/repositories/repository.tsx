import { IRepository } from "../interfaces/IRepository";

export class repository<T> implements IRepository<T> {
    getAll: () => Promise<T[]>;
    getById: (id: string) => Promise<T>;
    update: (enity: T) => Promise<boolean>;
    add: (enity: T) => Promise<boolean>;
    delete: (id: string) => Promise<boolean>;
}