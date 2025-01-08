export type Discount = {
     id: string;
     discountDescription: string;
     discount: number;
     createBy: string;
     creationDate: Date;
     updateDate: Date | null;
     active: boolean
}

export const initializeDiscount = {
     id: '',
     discountDescription: '',
     discount: 0,
     createBy: '',
     creationDate: new Date,
     updateDate: null,
     active: true
}