import axios from "axios"
import { useEffect, useState } from "react"
import { useAuth } from "../contexts/useAuth"
import { CategoriesController } from "../controllers/CategoriesController"
import { DiscountsController } from "../controllers/DiscountsController"
import { SubCategoriesController } from "../controllers/SubCategoriesController"
import { CustomError } from "../models/CustomError"
import { Categories } from "../types/Categories"
import { Discount } from "../types/Discount.type"
import { Status } from "../types/Status.types"
import { SubCategories } from "../types/SubCategories"
import { Taxes } from "../types/Taxes.types"
import { API_END_POINT, MULTIMEDIA_FILES_PRODUCT_END_POINT, MESSAGE_TOAST_ERROR_TYPE, METHOD, STATUS_END_POINT, TAXES_END_POINT } from "../utilities/Constants.d"
import { useShowMessageToast } from "./useShowMessageToast"
import { MultimediaFilesProduct } from "../types/Products.types"

function useLoadListsForProduct(productId: string) {
     const { ShowMessageToast } = useShowMessageToast()

     const [categoryID, setCategoryID] = useState('')
     const [categoryList, setCategoryList] = useState<Categories[]>([] as Categories[])

     const [subCategoryID, setSubCategoryID] = useState('')
     const [subCategoryList, setSubCategoryList] = useState<SubCategories[]>([] as SubCategories[])

     const [discountID, setDiscountID] = useState('')
     const [discountList, setDiscountList] = useState<Discount[]>([] as Discount[])

     const [statusID, setStatusID] = useState('')
     const [statusList, setStatusList] = useState<Status[]>([] as Status[])

     const [taxID, setTaxID] = useState('')
     const [taxesList, setTaxesList] = useState<Taxes[]>([] as Taxes[])

     const [multimediaFilesProduct, setMultimediaFilesProduct] = useState<MultimediaFilesProduct[]>([] as MultimediaFilesProduct[])

     const { tokenResult } = useAuth()

     const populateCategoryList = async () => {
          new CategoriesController(tokenResult?.accessToken as string).Get().then((response => {
               setCategoryList(response as unknown as Categories[]);
          })).catch((err) => {
               const error = err as CustomError;
               ShowMessageToast(error.message, MESSAGE_TOAST_ERROR_TYPE.ERROR);
          });
     }

     const populateSubCategoryList = async () => {
          new SubCategoriesController(tokenResult?.accessToken as string).Get().then((response => {
               setSubCategoryList(response as unknown as SubCategories[]);
          })).catch((err) => {
               const error = err as CustomError;
               ShowMessageToast(error.message, MESSAGE_TOAST_ERROR_TYPE.ERROR);
          });
     }

     const populateDiscountList = async () => {
          new DiscountsController(tokenResult?.accessToken as string).Get().then((response => {
               setDiscountList(response as unknown as Discount[]);
          })).catch((err) => {
               const error = err as CustomError;
               ShowMessageToast(error.message, MESSAGE_TOAST_ERROR_TYPE.ERROR);
          });
     }

     const populateStatusList = async (): Promise<void> => {
          try {
               const response = await GetList(STATUS_END_POINT.URL)
               setStatusList(response as unknown as Status[]);
          } catch (err) {
               const error = err as CustomError;
               ShowMessageToast(error.message, MESSAGE_TOAST_ERROR_TYPE.ERROR);
          }
     }

     const populateTaxesList = async () => {
          try {
               const response = await GetList(TAXES_END_POINT.URL)
               setTaxesList(response as unknown as Taxes[]);
          } catch (err) {
               const error = err as CustomError;
               ShowMessageToast(error.message, MESSAGE_TOAST_ERROR_TYPE.ERROR);
          }
     }

     const populateMultimediaFilesProductList = async () => {
          try {
               const response = await GetList(MULTIMEDIA_FILES_PRODUCT_END_POINT.URL + productId)
               setMultimediaFilesProduct(response as unknown as MultimediaFilesProduct[]);
          } catch (err) {
               const error = err as CustomError;
               ShowMessageToast(error.message, MESSAGE_TOAST_ERROR_TYPE.ERROR);
          }
     }

     const GetList = (endPoint: string) => {
          return Promise.resolve(
               axios({
                    url: `${API_END_POINT.URL_BASE + endPoint}`,
                    method: METHOD.GET,
                    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${tokenResult?.accessToken as string}` }
               })
                    .then(res => res.data)
                    .catch(err => {
                         const error = err as CustomError;
                         ShowMessageToast(error.message, MESSAGE_TOAST_ERROR_TYPE.ERROR);
                    })
          )
     }

     useEffect(() => {
          populateCategoryList();
          populateSubCategoryList();
          populateDiscountList();
          populateStatusList();
          populateTaxesList();
          populateMultimediaFilesProductList();
     }, []);

     return { categoryID, categoryList, subCategoryID, subCategoryList, discountID, discountList, statusID, statusList, taxID, taxesList, multimediaFilesProduct }
}

export default useLoadListsForProduct
