export interface ISubCategories {
     Get: () => Promise<string>;
     GetById: (id: string) => Promise<string>;
     Post: (subCategory: SubCategories) => Promise<string>;
     Put: (subCategory: SubCategories) => Promise<string>;
     Delete: (id: string) => Promise<string>;
}
