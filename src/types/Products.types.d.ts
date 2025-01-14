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
     publicId: string
     secureUrl: string,
}

export type ResultCloudinary = {
     asset_id: string;
     public_id: string;
     version: number;
     version_id: string;
     signature: string;
     width: number;
     height: number;
     format: string;
     resource_type: string;
     created_at: Date;
     tags: any[];
     bytes: number;
     type: string;
     etag: string;
     placeholder: boolean;
     url: string;
     secure_url: string;
     asset_folder: string;
     display_name: string;
     original_filename: string;
     api_key: string;
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
