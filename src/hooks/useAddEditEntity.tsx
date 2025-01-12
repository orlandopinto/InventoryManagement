import { ChangeEvent, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CustomError } from "../models/CustomError";
import { MESSAGE_TOAST_ERROR_TYPE, METHOD } from "../utilities/Constants.d";
import { useShowMessageToast } from "./useShowMessageToast";
import axios from "axios";

interface Controller<T> {
     Index(): Promise<string>;
     Create(data: T): Promise<string>;
     Edit(data: T): Promise<string>;
     Delete(id: string): Promise<string>;
}

function useAddEditEntity<T, U extends Controller<T>>(controller: U, initializeValues: T, alteredIdMessage: string, addMessage: string, updateMessage: string, IndexPage: string, uploadImages: boolean, arrFormDataList: FormData[]) {
     //STATES
     const [showAlert, setShowAlert] = useState(false);
     const [hasUrlToRedirect, setHasUrlToRedirect] = useState(false)
     const [urlToRedirect, setUrlToRedirect] = useState('')
     const [bodyText, setBodyText] = useState('')
     const [validated, setValidated] = useState(false);
     const [formData, setFormData] = useState<T>(initializeValues);
     const [isAddMode, setIsAddMode] = useState(true)
     //HOOKS
     const location = useLocation();
     const { ShowMessageToast } = useShowMessageToast()
     const navigate = useNavigate()

     //EFFECTS
     useEffect(() => {
          if (location.state === null) {
               setShowAlert(true)
               setBodyText(alteredIdMessage)
               setHasUrlToRedirect(true)
               setUrlToRedirect(IndexPage)
               setShowAlert(true)
          }
          else {
               setIsAddMode(location.state.addMode)
               setFormData(location.state)
          }
     }, [])

     //FUNCTIONS
     const RedirectTo = (view: string) => navigate(view)

     const handleSubmit = async (event: React.SyntheticEvent<HTMLFormElement>) => {
          event.preventDefault();
          const buttonSubmitter = (event.nativeEvent as SubmitEvent).submitter;

          if (event.currentTarget.checkValidity() === false) {
               setValidated(true);
          }
          else {
               try {
                    // if (uploadImages) {
                    //      arrFormDataList.map(async (frmData) => {
                    //           if (frmData.get('id') !== null) {
                    //                const formImageData = frmData;
                    //                if (formImageData instanceof FormData) {
                    //                     await axios.post('http://localhost:4000/upload-product-images', formImageData, config)
                    //                          .then((response) => {
                    //                               console.log('response: ', response)
                    //                               console.log('imagen subida: ', frmData.get('id'))
                    //                          }).catch((error) => {
                    //                               console.log('error: ', error)
                    //                          });
                    //                } else {
                    //                     console.error('formImageData is not a FormData instance');
                    //                }
                    //           }
                    //      })
                    // }
                    let data: T = { ...formData }
                    if (buttonSubmitter?.id === 'btnAdd') {
                         addEntity(data)
                    }
                    else if (buttonSubmitter?.id === 'btnUpdate') {
                         updateEntity(data)
                    }
               } catch (error) {
                    console.log(`error:  ${error} end point: '/upload-product-images'`)
               }
          }
     };

     const addEntity = async (data: T) => {
          await controller.Create(data as any).then(() => {
               setFormData(initializeValues)
               ShowMessageToast(addMessage, MESSAGE_TOAST_ERROR_TYPE.SUCCESS);
               RedirectTo(IndexPage)
          }).catch(err => {
               showCustomError(err);
          })
     }

     const updateEntity = async (data: any) => {
          await controller.Edit(data).then(() => {
               ShowMessageToast(updateMessage, MESSAGE_TOAST_ERROR_TYPE.SUCCESS);
               RedirectTo(IndexPage)
          }).catch(err => {
               showCustomError(err);
          })
     };

     const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
          setFormData({
               ...formData,
               [event.target.id]: event.target.value,
          });
     };

     const handleChangeChecked = (event: ChangeEvent<HTMLInputElement>) => {
          setFormData({
               ...formData,
               [event.target.id]: event.target.value,
          });
     };

     const handleCloseAlert = () => setShowAlert(false);

     const showCustomError = (err: any) => {
          const error: CustomError = err as CustomError;
          setBodyText(error.message);
          setShowAlert(true);
     }

     return {
          IndexPage,
          showAlert,
          hasUrlToRedirect,
          urlToRedirect,
          bodyText,
          validated,
          formData,
          isAddMode,
          handleSubmit,
          handleChange,
          handleChangeChecked,
          handleCloseAlert
     }
}

export default useAddEditEntity;