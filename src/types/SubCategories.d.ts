export type SubCategories = {
     id: string;
     categoryID: string;
     subCategoryName: string;
     subCategoryDescription: string | null;
     createBy: string;
     creationDate: Date;
     updateDate: Date | null;
}

export type CategoryOptions = {
     categoryId: string;
     categoryName: string;
     categoryCode: string;
}

export type SubCategoriesViewModel = {
     id: string;
     categoryID: string;
     categoryName: string;
     categoryCode: string;
     categoryImage: string;
     subCategoryName: string;
     subCategoryDescription: string | null;
     createBy: string;
     creationDate: Date;
     updateDate: Date | null;
}

export const initializeSubCategory = {
     id: "",
     categoryID: "",
     subCategoryName: "",
     subCategoryDescription: null,
     createBy: "",
     creationDate: new Date,
     updateDate: null,
}
