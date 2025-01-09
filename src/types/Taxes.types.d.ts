export type Taxes = {
     id: string;
     taxDescription: string;
     tax: decimal;
     createBy: string;
     active: boolean;
     dateFrom: Date;
     dateTo: Date | null;
     creationDate: Date;
     updateDate: Date | null;
}

export type TaxesViewModel = {
     id: string;
     taxDescription: string;
     tax: decimal;
     createBy: string;
     active: boolean;
     dateFrom: Date;
     dateTo: Date | null;
     creationDate: Date;
     updateDate: Date | null;
     addMode: boolean;
}

export const initializeTaxesViewModel = {
     id: '',
     taxDescription: '',
     tax: 0.00,
     createBy: '',
     active: true,
     dateFrom: new Date,
     dateTo: null,
     creationDate: new Date,
     updateDate: null,
     addMode: true
}