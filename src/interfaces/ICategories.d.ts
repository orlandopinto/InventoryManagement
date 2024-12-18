export interface ICategories {
     Get: () => Promise<any>;
     GetById: (id: string) => Promise<string>;
     Post: (category: Categories) => Promise<string>;
     Put: (category: Categories) => Promise<string>;
     Delete: (id: string) => Promise<string>;
}
