import { ChangeEvent, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CustomError } from "../models/CustomError";
import { MESSAGE_TOAST_ERROR_TYPE } from "../utilities/Constants.d";
import { useShowMessageToast } from "./useShowMessageToast";

interface Controller<T> {
     Create(data: T): Promise<string>;
     Edit(data: T): Promise<string>;
}

function useAddEditEntity<T, U extends Controller<T>>(controller: U, initializeValues: T, alteredIdMessage: string, addMessage: string, updateMessage: string, IndexPage: string) {
     //STATES
     const [showAlert, setShowAlert] = useState(false);
     const [hasUrlToRedirect, setHasUrlToRedirect] = useState(false)
     const [urlToRedirect, setUrlToRedirect] = useState('')
     const [bodyText, setBodyText] = useState('')
     const [validated, setValidated] = useState(false);
     const [formData, setFormData] = useState<T>(initializeValues);
     const [isAddMode, setIsAddMode] = useState(true)

     //HOOKS AND GENERAL FUNCTIONS
     const location = useLocation();
     const { ShowMessageToast } = useShowMessageToast()
     const navigate = useNavigate()
     const RedirectTo = (view: string) => navigate(view)

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
     const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
          event.preventDefault();
          const buttonSubmitter = (event.nativeEvent as SubmitEvent).submitter;

          if (event.currentTarget.checkValidity() === false) {
               setValidated(true);
          }
          else {
               let data: T = { ...formData }
               if (buttonSubmitter?.id === 'btnAdd') {
                    addEntity(data)
               }
               else if (buttonSubmitter?.id === 'btnUpdate') {
                    updateEntity(data)
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
               [event.target.id]: event.target.type === 'checkbox' ? event.target.checked : event.target.value,
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
          handleCloseAlert
     }
}

export default useAddEditEntity;