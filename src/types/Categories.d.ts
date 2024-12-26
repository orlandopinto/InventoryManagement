export type Categories = {
     id: string;
     categoryName: string;
     categoryCode: string;
     categoryDescription: string | null;
     createBy: string;
     creationDate: Date | null;
     updateDate: Date | null;
     categoryImagePath: string;
}

export const initializeCategory = {
     id: "",
     categoryName: "",
     categoryCode: "",
     categoryDescription: null,
     createBy: "",
     creationDate: new Date,
     updateDate: null,
     categoryImagePath: ""
}
