import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import Image from 'react-bootstrap/Image';

interface Props {
     id: string
     setImage: Dispatch<SetStateAction<FormData>>
     arrFormDataList: { values: FormData[], setValues: Dispatch<SetStateAction<FormData[]>> }
     handleClick: (e: any) => void
     fileInputRef: any
     uploadPath: string
     imageName: string
}

function UploadProductImage({ id, arrFormDataList, setImage, handleClick, fileInputRef, uploadPath, imageName }: Props) {
     const [selectedFile, setSelectedFile] = useState('')

     useEffect(() => {
          initilizaArrayFormDataList();
          if (selectedFile === null || selectedFile === '') {
               setSelectedFile("/src/assets/images/default-image.jpg")
          }
     }, [])

     const handleFileInput = (e: any) => {
          const formData = new FormData();
          if (e.target.files.length > 0) {
               const objectUrl = URL.createObjectURL(e.target.files[0])
               const extensionFile = e.target.files[0].type.split('/')[1] as string
               formData.append('img', e.target.files[0], imageName + '.' + extensionFile);
               formData.append('id', id);
               setImage(formData);
               setSelectedFile(objectUrl)

               arrFormDataList.values.map((file) => {
                    try {
                         if (file.get('id') === 'fileInputImageOne' && id === 'fileInputImageOne') {
                              arrFormDataList.values[0] = formData
                         }
                         else if (file.get('id') === 'fileInputImageTwo' && id === 'fileInputImageTwo') {
                              arrFormDataList.values[1] = formData
                         }
                         else if (file.get('id') === 'fileInputImageThree' && id === 'fileInputImageThree') {
                              arrFormDataList.values[2] = formData
                         }
                         else if (file.get('id') === 'fileInputImageFour' && id === 'fileInputImageFour') {
                              arrFormDataList.values[3] = formData
                         }
                         else if (file.get('id') === 'fileInputImageFive' && id === 'fileInputImageFive') {
                              arrFormDataList.values[4] = formData
                         }
                    } catch (error) {
                         console.log('error: ', error)
                    }
               })

               const newArrayFormDataList: FormData[] = [...arrFormDataList.values]
               arrFormDataList.setValues(newArrayFormDataList)
          }
     }


     function initilizaArrayFormDataList() {
          if (arrFormDataList.values.length === 0) {
               //console.log('inicializando array');

               let formData = new FormData();
               formData.append('id', 'fileInputImageOne');
               arrFormDataList.values[0] = formData;

               formData = new FormData();
               formData.append('id', 'fileInputImageTwo');
               arrFormDataList.values[1] = formData;

               formData = new FormData();
               formData.append('id', 'fileInputImageThree');
               arrFormDataList.values[2] = formData;

               formData = new FormData();
               formData.append('id', 'fileInputImageFour');
               arrFormDataList.values[3] = formData;

               formData = new FormData();
               formData.append('id', 'fileInputImageFive');
               arrFormDataList.values[4] = formData;
          }
     }

     return (
          <Card className="p-2">
               <div>
                    {
                         selectedFile === ''
                              ?
                              <div className="p-2">{<Image src="/src/assets/images/default-image.jpg" className="w-100 m-2 rounded" />}</div>
                              :
                              <div className="w-100">{<Image src={selectedFile} className="w-100 rounded" />}</div>
                    }
               </div>
               <div className="">
                    <Button variant="outline-primary" className=" mt-2 button-upload w-100" onClick={handleClick}>Seleccione imagen</Button>
                    <Form.Control type="file" id={id} className="" onChange={handleFileInput} ref={fileInputRef} accept=".jpg,.jpeg,.png" style={{ display: 'none' }} />
               </div>
          </Card>
     );
}
export default UploadProductImage