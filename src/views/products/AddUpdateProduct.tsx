import { ChangeEvent, Dispatch, SetStateAction, useRef, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useTranslation } from 'react-i18next';
import { NumericFormat } from 'react-number-format';
import { Link } from "react-router-dom";
import CustomModalAlert from "../../components/common/Modals/CustomModalAlert";
import { ProductsController } from "../../controllers/ProductsController";
import UploadProductImage from "../../hooks/UploadProductImage";
import useAddEditEntity from "../../hooks/useAddEditEntity";
import useLoadListsForProduct from "../../hooks/useLoadListsForProduct";
import { initializeProductViewModel } from "../../types/Products.types.d";

function AddUpdateProduct() {
     const [image1, setImage1] = useState<FormData>(new FormData())
     const [image2, setImage2] = useState<FormData>(new FormData())
     const [image3, setImage3] = useState<FormData>(new FormData())
     const [image4, setImage4] = useState<FormData>(new FormData())
     const [image5, setImage5] = useState<FormData>(new FormData())

     const [selectedCategoryID, setSelectedCategoryID] = useState<string>('')
     const [selectedSubCategoryID, setSelectedSubCategoryID] = useState<string>('')
     const [selectedDiscountID, setSelectedDiscountID] = useState<string>('')
     const [selectedStatusID, setSelectedStatusID] = useState('')
     const [selectedTaxID, setSelectedTaxID] = useState('')
     const [arrFormDataList, setArrFormDataList] = useState([] as FormData[])

     const { t } = useTranslation();
     const imageUploadPath = '../uploaded_files'
     const mediaUploadPath = '../uploaded_files'

     const fileInputRefOne = useRef<HTMLInputElement>({} as HTMLInputElement);
     const fileInputRefTwo = useRef<HTMLInputElement>({} as HTMLInputElement);
     const fileInputRefThree = useRef<HTMLInputElement>({} as HTMLInputElement);
     const fileInputRefFour = useRef<HTMLInputElement>({} as HTMLInputElement);
     const fileInputRefFive = useRef<HTMLInputElement>({} as HTMLInputElement);

     const { categoryID, categoryList, subCategoryID, subCategoryList, discountID, discountList, statusID, statusList, taxID, taxesList } = useLoadListsForProduct()

     //NOTA: Mantener este orden en que se van a mostrar los mensajes en el Custom Hook
     const messages: string[] = [
          'Se ha alterado el id del impuesto, se redireccionará a la lista de estados, seleccione nuevamente el ícono de actualizar.', //alteredIdMessage
          "El impuesto se ha registrado satisfactoriamente!",                                                                          //addMessage
          "Datos del impuesto actualizado con éxito!",                                                                                 //updateMessage
     ]

     const { IndexPage, showAlert, hasUrlToRedirect, urlToRedirect, bodyText, validated, formData, isAddMode, handleSubmit, handleChange, handleChangeChecked, handleCloseAlert } =
          useAddEditEntity(ProductsController(), initializeProductViewModel, messages[0], messages[1], messages[2], '/products', true, arrFormDataList)

     const handleOnchangeSelect = (event: ChangeEvent<HTMLSelectElement>, setValueReference: Dispatch<SetStateAction<string>>) => {
          event.preventDefault();
          event.target.value !== '' ? setValueReference(event.target.value) : setValueReference('')
     }

     const handleClickImageOne = () => fileInputRefOne.current?.click();
     const handleClickImageTwo = () => fileInputRefTwo.current.click();
     const handleClickImageThree = () => fileInputRefThree.current.click();
     const handleClickImageFour = () => fileInputRefFour.current.click();
     const handleClickImageFive = () => fileInputRefFive.current.click();

     return (
          <>
               <div>
                    <div className='header-page'>
                         <div className="ps-2">
                              <h4 className="fs-3">{t('Products')}</h4>
                              <p className="fs-5">{t('Manageyour')} {t('Products').toLocaleLowerCase()}</p>
                         </div>
                    </div>
                    <div>
                         <Form noValidate validated={validated} onSubmit={handleSubmit}>
                              <Card>
                                   <div className='container-fluid pt-2'>
                                        <Row>
                                             <Col xl={4} md={6} sm={12}>
                                                  <Form.Group className="mb-3">
                                                       <Form.Label><strong>{t('ProductName')}:</strong></Form.Label>
                                                       <Form.Control type="text" id="productName" name="productName" value={formData.productName} onChange={handleChange} required />
                                                  </Form.Group>
                                             </Col >
                                             <Col xl={4} md={6} sm={12}>
                                                  <Form.Group className="mb-3">
                                                       <Form.Label><strong>{t('ProductDescription')}:</strong></Form.Label>
                                                       <Form.Control type="text" id="productDescription" name="productDescription" value={formData.productDescription ? formData.productDescription : ''} onChange={handleChange} required />
                                                  </Form.Group>
                                             </Col >
                                             <Col xl={4} md={6} sm={12}>
                                                  <Form.Group className="mb-3">
                                                       <Form.Label><strong>{t('Cost')}:</strong></Form.Label>
                                                       <NumericFormat
                                                            id="cost"
                                                            name="cost"
                                                            className="form-control"
                                                            thousandSeparator="."
                                                            decimalSeparator=","
                                                            required
                                                            value={formData.cost}
                                                            onChange={handleChange}
                                                       />
                                                  </Form.Group>
                                             </Col>
                                        </Row>
                                        <Row>
                                             <Col xl={4} md={6} sm={12}>
                                                  <Form.Group className="mb-3">
                                                       <Form.Label><strong>{t('Price')}:</strong></Form.Label>
                                                       <NumericFormat
                                                            id="price"
                                                            name="price"
                                                            className="form-control"
                                                            thousandSeparator="."
                                                            decimalSeparator=","
                                                            required
                                                            value={formData.price}
                                                            onChange={handleChange}
                                                       />
                                                  </Form.Group>
                                             </Col>
                                             <Col xl={4} md={6} sm={12}>
                                                  <Form.Group className="mb-3">
                                                       <Form.Label><strong>{t('Quantity')}:</strong></Form.Label>
                                                       <NumericFormat
                                                            id="quantity"
                                                            name="quantity"
                                                            className="form-control"
                                                            thousandSeparator="."
                                                            decimalSeparator=","
                                                            required
                                                            value={formData.quantity}
                                                            onChange={handleChange}
                                                       />
                                                  </Form.Group>
                                             </Col >
                                             <Col xl={4} md={6} sm={12}>
                                                  <Form.Group className="mb-3">
                                                       <Form.Label><strong>Cantidad minima:</strong></Form.Label>
                                                       <NumericFormat
                                                            id="minimunQuantity"
                                                            name="minimunQuantity"
                                                            className="form-control"
                                                            thousandSeparator="."
                                                            decimalSeparator=","
                                                            required
                                                            value={formData.minimunQuantity}
                                                            onChange={handleChange}
                                                       />
                                                  </Form.Group>
                                             </Col >

                                        </Row>
                                        <Row>
                                             <Col xl={4} md={6} sm={12}>
                                                  <Form.Group className="mb-3">
                                                       <Form.Label><strong>Código de barra:</strong></Form.Label>
                                                       <Form.Control type="text" id="codeBar" name="codeBar" value={formData.codeBar ? formData.codeBar : ''} onChange={handleChange} required />
                                                  </Form.Group>
                                             </Col>
                                             <Col xl={4} md={6} sm={12}>
                                                  <Form.Group className="mb-3">
                                                       <Form.Label><strong>Sku:</strong></Form.Label>
                                                       <Form.Control type="text" id="sku" name="sku" value={formData.sku ? formData.sku : ''} onChange={handleChange} required />
                                                  </Form.Group>
                                             </Col >
                                             <Col xl={4} md={6} sm={12}>
                                                  <Form.Group className="mb-3">
                                                       <Form.Label><strong>{t('Category')}:</strong></Form.Label>
                                                       <Form.Select required value={formData.categoryId = selectedCategoryID} id={categoryID} name={categoryID} onChange={(e) => handleOnchangeSelect(e, setSelectedCategoryID)}>
                                                            <option value="">Selecciona categoría</option>
                                                            {categoryList.map((option, index) => (
                                                                 <option key={index} value={option.id}>{option.categoryName}</option>
                                                            ))}
                                                       </Form.Select>
                                                  </Form.Group>
                                             </Col>
                                        </Row>
                                        <Row>
                                             <Col xl={4} md={6} sm={12}>
                                                  <Form.Group className="mb-3">
                                                       <Form.Label><strong>Sub {t('Category')}:</strong></Form.Label>
                                                       <Form.Select required value={formData.subCategoryId = selectedSubCategoryID} id={subCategoryID} name={subCategoryID} onChange={(e) => handleOnchangeSelect(e, setSelectedSubCategoryID)}>
                                                            <option value="">Selecciona sub categoría</option>
                                                            {subCategoryList.map((option, index) => (
                                                                 <option key={index} value={option.id}>{option.subCategoryName}</option>
                                                            ))}
                                                       </Form.Select>
                                                  </Form.Group>
                                             </Col >
                                             <Col xl={4} md={6} sm={12}>
                                                  <Form.Group className="mb-3">
                                                       <Form.Label><strong>{t('Discount')}:</strong></Form.Label>
                                                       <Form.Select required value={formData.discountId = selectedDiscountID} id={discountID} name={discountID} onChange={(e) => handleOnchangeSelect(e, setSelectedDiscountID)}>
                                                            <option value="">Selecciona descuento</option>
                                                            {discountList.map((option, index) => (
                                                                 <option key={index} value={option.id}>{option.discountDescription}</option>
                                                            ))}
                                                       </Form.Select>
                                                  </Form.Group>
                                             </Col >
                                             <Col xl={4} md={6} sm={12}>
                                                  <Form.Group className="mb-3">
                                                       <Form.Label><strong>{t('Status')}:</strong></Form.Label>
                                                       <Form.Select required value={formData.statusId = selectedStatusID} id={statusID} name={statusID} onChange={(e) => handleOnchangeSelect(e, setSelectedStatusID)}>
                                                            <option value="">Selecciona estado</option>
                                                            {statusList.map((option, index) => (
                                                                 <option key={index} value={option.id}>{option.statusDescription}</option>
                                                            ))}
                                                       </Form.Select>
                                                  </Form.Group>
                                             </Col>
                                        </Row>
                                        <Row>
                                             <Col xl={4} md={6} sm={12}>
                                                  <Form.Group className="mb-3">
                                                       <Form.Label><strong> {t('Tax')}:</strong></Form.Label>
                                                       <Form.Select required value={formData.taxId = selectedTaxID} id={taxID} name={taxID} onChange={(e) => handleOnchangeSelect(e, setSelectedTaxID)}>
                                                            <option value="">Selecciona impuesto</option>
                                                            {taxesList.map((option, index) => (
                                                                 <option key={index} value={option.id}>{option.taxDescription}</option>
                                                            ))}
                                                       </Form.Select>
                                                  </Form.Group>
                                             </Col >
                                             <Col xl={4} md={6} sm={12}>
                                                  <Form.Group className="mt-3">
                                                       <Form.Label></Form.Label>
                                                       <Form.Check type="switch" label={t('Active')} id="active" onChange={handleChangeChecked} checked={formData.active} />
                                                  </Form.Group>
                                             </Col >
                                        </Row>
                                        <hr className="pb-2" />
                                        <Row>
                                             <Col xl={2} md={4} sm={6}>
                                                  <UploadProductImage arrFormDataList={{ values: arrFormDataList, setValues: setArrFormDataList }} id="fileInputImageOne" setImage={setImage1} handleClick={handleClickImageOne} fileInputRef={fileInputRefOne} uploadPath={imageUploadPath} imageName={'imagen1'} />
                                             </Col>
                                             <Col xl={2} md={4} sm={6}>
                                                  <UploadProductImage arrFormDataList={{ values: arrFormDataList, setValues: setArrFormDataList }} id="fileInputImageTwo" setImage={setImage2} handleClick={handleClickImageTwo} fileInputRef={fileInputRefTwo} uploadPath={imageUploadPath} imageName={'imagen2'} />
                                             </Col>
                                             <Col xl={2} md={4} sm={6}>
                                                  <UploadProductImage arrFormDataList={{ values: arrFormDataList, setValues: setArrFormDataList }} id="fileInputImageThree" setImage={setImage3} handleClick={handleClickImageThree} fileInputRef={fileInputRefThree} uploadPath={imageUploadPath} imageName={'imagen3'} />
                                             </Col>
                                             <Col xl={2} md={4} sm={6}>
                                                  <UploadProductImage arrFormDataList={{ values: arrFormDataList, setValues: setArrFormDataList }} id="fileInputImageFour" setImage={setImage4} handleClick={handleClickImageFour} fileInputRef={fileInputRefFour} uploadPath={imageUploadPath} imageName={'imagen4'} />
                                             </Col>
                                             <Col xl={2} md={4} sm={6}>
                                                  <UploadProductImage arrFormDataList={{ values: arrFormDataList, setValues: setArrFormDataList }} id="fileInputImageFive" setImage={setImage5} handleClick={handleClickImageFive} fileInputRef={fileInputRefFive} uploadPath={imageUploadPath} imageName={'imagen5'} />
                                             </Col>
                                             <Col xl={2} md={4} sm={6}>

                                             </Col>
                                        </Row>
                                        <hr className="pb-2" />
                                        <Row>
                                             <Col xl={12}>
                                                  <Form.Group className="mb-3 buttons-section">
                                                       {
                                                            isAddMode
                                                                 ?
                                                                 <Button id="btnAdd" type="submit" variant='primary'>{t('Save')}</Button>
                                                                 :
                                                                 <Button id="btnUpdate" type="submit" variant='primary' >{t('Update')}</Button>
                                                       }
                                                       <Link to={IndexPage} className='btn btn-secondary'><span>{t('Back')}</span></Link>
                                                  </Form.Group>
                                             </Col>
                                        </Row>
                                   </div>
                              </Card>
                         </Form>
                    </div>
                    <CustomModalAlert show={showAlert} headerText={'Error'} bodyText={bodyText} handleClose={handleCloseAlert} hasUrlToRedirect={hasUrlToRedirect} urlToRedirect={urlToRedirect} />
               </div>
          </>
     )
}

export default AddUpdateProduct