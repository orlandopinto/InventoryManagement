import { Dispatch, SetStateAction, useEffect } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import Image from 'react-bootstrap/Image';
import { defaultimage } from "../../assets/images/default-image.jpg"

interface Props {
     setImageFromChild: any
     setSelectedFile: Dispatch<SetStateAction<string>>
     imageName: string,
     setDataFromChild: Dispatch<SetStateAction<string>>
     selectedFile: string
     fileInpuRef: any
}

function UploadImages({ setImageFromChild, setSelectedFile, imageName, setDataFromChild, selectedFile, fileInpuRef }: Props) {

     useEffect(() => {
          if (selectedFile === null || selectedFile === '') {
               setSelectedFile("/src/assets/images/default-image.jpg")
          }
     }, [])

     const handleClick = (event: any) => {
          fileInpuRef.current.click();
     };

     const handleFileInput = (e: any) => {
          const formData = new FormData();
          if (e.target.files.length > 0) {
               const objectUrl = URL.createObjectURL(e.target.files[0])
               const extensionFile = e.target.files[0].type.split('/')[1] as string
               formData.append('img', e.target.files[0], imageName + '.' + extensionFile);
               setImageFromChild(formData);
               setSelectedFile(objectUrl)
               setDataFromChild('/src/uploaded_files/' + imageName + '.' + extensionFile)
          }
     }
     return (
          <Card>
               <div className="px-2">
                    <Row>
                         <Col sm={12} className="py-2">
                              <div className="ps-3 pt-2">
                                   <Form.Control type="file" onChange={handleFileInput} ref={fileInpuRef} accept=".jpg,.jpeg,.png" style={{ display: 'none' }} />
                                   <Button variant="outline-primary" className="button-upload " onClick={handleClick}>Seleccione imagen</Button>
                              </div>
                              <Card className="m-3 text-center">
                                   {
                                        selectedFile === ''
                                             ?
                                             <div className="p-2">{<Image src="/src/assets/images/default-image.jpg" className="w-25 m-2 rounded" />}</div>
                                             :
                                             <div className="p-2">{<Image src={selectedFile} className="w-25 m-2 rounded" />}</div>
                                   }
                              </Card>
                         </Col>
                    </Row>
               </div>
          </Card>
     );
}

export default UploadImages;