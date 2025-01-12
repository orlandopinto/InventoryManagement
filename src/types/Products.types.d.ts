export type Product = {
     id: string
     productName: string
     productDescription: string | null
     cost: decimal
     price: decimal
     quantity: number
     minimunQuantity: number
     codeBar: string | null
     sku: string | null
     createBy: string
     categoryId: string
     subCategoryId: string
     discountId: string
     statusId: string
     taxId: string
     active: boolean
     creationDate: Date
     updateDate: Date | null
     imagesProducts: ImagesProduct[]
}

export type ProductViewModel = {
     id: string
     productName: string
     productDescription: string | null
     cost: decimal
     price: decimal
     quantity: number
     minimunQuantity: number
     codeBar: string | null
     sku: string | null
     createBy: string
     categoryId: string
     subCategoryId: string
     discountId: string
     statusId: string
     taxId: string
     active: boolean
     creationDate: Date
     updateDate: Date | null
     imagesProducts: ImagesProduct[]
     addMode: boolean;
}

export type ImagesProduct = {
     id: string
     productId: string
     urlImage: string
}

export const initializeProductViewModel = {
     id: '',
     productName: '',
     productDescription: null,
     cost: 0,
     price: 0,
     quantity: 0,
     minimunQuantity: 0,
     codeBar: null,
     sku: null,
     createBy: '',
     categoryId: '',
     subCategoryId: '',
     discountId: '',
     statusId: '',
     taxId: '',
     active: true,
     creationDate: new Date,
     updateDate: null,
     imagesProducts: [],
     addMode: true
}
