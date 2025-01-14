import { useAuth } from '../contexts/useAuth';
import { CustomError } from '../models/CustomError';
import AxiosService from '../services/AxiosService';
import { ImagesProduct, Product, ResultCloudinary } from '../types/Products.types.d';
import { IMAGES_PRODUCT_END_POINT, PRODUCTS_END_POINT } from '../utilities/Constants.d';

export const ProductsController = () => {
     const { tokenResult, user } = useAuth()
     let service = new AxiosService(tokenResult?.accessToken as string, PRODUCTS_END_POINT.URL);

     const Index = async () => {
          try {
               return await service.Get();
          } catch (err) {
               //throw err as CustomError ==> registrar este error en un archivo .log
               const error = new CustomError({ message: 'Se ha producido un error al consultar los productos.', name: 'Error' });
               throw error
          }
     };

     const Create = async (product: Product) => {
          try {
               product.createBy = user?.fullName.trim() as string
               product.id = self.crypto.randomUUID();
               product.creationDate = new Date;
               const foundProduct: Product[] = await service.GetByDescription(product.productName) as unknown as Product[];
               if (foundProduct.some(data => data.productName === product.productName)) {
                    const error = new CustomError({ message: 'Nombre del producto duplicado.', name: 'Error' });
                    throw error
               }

               if (product.cost === 0 || product.price === 0 || product.quantity === 0 || product.minimunQuantity === 0) {
                    let messageList = 'Se detectaron los siguientes errores: <br>'
                    if (product.cost === 0) {
                         messageList += '- El valor del "Costo" debe ser diferente a cero.<br>'
                    }

                    if (product.price === 0) {
                         messageList += '- El valor del "Precio" debe ser diferente a cero.<br>'
                    }

                    if (product.quantity === 0) {
                         messageList += '- El valor "Cantidad"  debe ser diferente a cero.<br>'
                    }

                    if (product.minimunQuantity === 0) {
                         messageList += '- El valor "Cantidad mínima" debe ser diferente a cero.<br>'
                    }

                    const error = new CustomError({ message: messageList, name: 'Error' });
                    throw error
               }

               return await service.Post(product);
          } catch (err) {
               const error: CustomError = err as unknown as CustomError
               if (error.stack === 'handled error') {
                    error.name = 'Error';
                    error.message = 'Se ha producido un error al crear el producto, intente de nuevo.';
               }
               throw error
          }
     };

     const Edit = async (product: Product) => {
          try {
               const foundProduct: Product[] = await service.GetByDescription(product.productName) as unknown as Product[];
               if (foundProduct.some(data => data.productName === product.productName && product.id !== data.id)) {
                    const error = new CustomError({ message: 'Descripción del producto duplicado.', name: 'Error' });
                    throw error
               }
               product.updateDate = new Date;
               return await service.Put(product);
          } catch (err) {
               const error: CustomError = err as unknown as CustomError
               if (error.stack === 'handled error') {
                    error.name = 'Error';
                    error.message = 'Se ha producido un error al actualizar el producto, intente de nuevo.';
               }
               throw error
          }
     };

     const Delete = async (id: string) => {
          try {
               const response = await service.Delete(id);
               if (response as unknown as boolean !== true) {
                    throw new CustomError({ message: 'Se produjo un error al eliminar el producto, por favor intente de nuevo!', name: 'Error' });
               }
               return response;
          } catch (err) {
               const error: CustomError = err as unknown as CustomError
               if (error.stack === 'handled error') {
                    error.name = 'Error';
                    error.message = 'Se ha producido un error al eliminar el producto, intente de nuevo.';
               }
               throw error
          }
     };

     const UploadMedia = async (productId: string, formData: FormData, isImage: boolean) => {
          try {
               const resultCloudinary = await service.UploadMedia(formData) as unknown as ResultCloudinary;

               const imageProduct: ImagesProduct = {
                    id: self.crypto.randomUUID(),
                    productId: productId,
                    publicId: resultCloudinary.public_id,
                    secureUrl: resultCloudinary.secure_url,
               }

               service = new AxiosService(tokenResult?.accessToken as string, IMAGES_PRODUCT_END_POINT.URL);
               const response = await service.Post(imageProduct);
               if (response as unknown as boolean !== true) {
                    throw new CustomError({ message: 'Se produjo un error al registrar los datos de la imagen en la base de datos, por favor intente de nuevo!', name: 'Error' });
               }
               return imageProduct;
          } catch (err) {
               const error: CustomError = err as unknown as CustomError
               if (error.stack === 'handled error') {
                    error.name = 'Error';
                    error.message = `Se produjo un error al subir ${isImage ? 'la imagen' : 'el video'} , por favor intente de nuevo!`;
               }
               throw error
          }
     };

     return { Index, Create, Edit, Delete, UploadMedia }
}