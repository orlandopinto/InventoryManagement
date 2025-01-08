export type Status = {
     id: string;
     statusDescription: string;
     createBy: string;
     creationDate: Date;
     updateDate: Date | null;
}

export type StatusViewModel = {
     id: string;
     statusDescription: string;
     createBy: string;
     creationDate: Date;
     updateDate: Date | null;
     addMode: boolean,
}

export const initializeStatusViewModel = {
     id: '',
     statusDescription: '',
     createBy: '',
     creationDate: new Date,
     updateDate: null,
     addMode: true,
}