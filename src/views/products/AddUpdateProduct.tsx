import { useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { CameraVideo, Images } from "react-bootstrap-icons";
import { useTranslation } from 'react-i18next';
import { NumericFormat } from 'react-number-format';
import { Link } from "react-router-dom";
import CustomModalAlert from "../../components/common/Modals/CustomModalAlert";
import { ProductsController } from "../../controllers/ProductsController";
import useAddEditEntity from "../../hooks/useAddEditEntity";
import useLoadListsForProduct from "../../hooks/useLoadListsForProduct";
import { initializeProductViewModel, MultimediaFilesProduct } from "../../types/Products.types.d";
import Loading from "../index/Loading";
import ModalAddMediaFileProduct from "./ModalAddMediaFileProduct";
import MultimediaFileProductList from "./MultimediaFileProductList";

function AddUpdateProduct() {
     const { t } = useTranslation();
     const [selectedTaxID, setSelectedTaxID] = useState('')
     const [showModalAddMediaFileProduct, SetShowModalAddMediaFileProduct] = useState(false)
     const [initializeImage, setInitializeImage] = useState(true)
     const [initializeVideo, setInitializeVideo] = useState(true)
     const [typeFile, setTypeFile] = useState<'image' | 'video'>('image')
     const [multimediaFilesProduct, setMultimediaFilesProduct] = useState({} as MultimediaFilesProduct)
     const [isLoading, setIsLoading] = useState(true)

     //NOTA: Mantener este orden en que se van a mostrar los mensajes en el Custom Hook
     const messages: string[] = [
          'Se ha alterado el id del impuesto, se redireccionará a la lista de estados, seleccione nuevamente el ícono de actualizar.', //alteredIdMessage
          "El impuesto se ha registrado satisfactoriamente!",                                                                          //addMessage
          "Datos del impuesto actualizado con éxito!",                                                                                 //updateMessage
     ]

     const { IndexPage, showAlert, hasUrlToRedirect, urlToRedirect, bodyText, validated, formData, isAddMode, handleSubmit, handleChange, handleChangeChecked, handleOnchangeSelect, handleCloseAlert } =
          useAddEditEntity(ProductsController(), initializeProductViewModel, messages[0], messages[1], messages[2], '/products')

     const { categoryList, subCategoryList, discountList, statusList, taxesList } = useLoadListsForProduct({ setIsLoading })

     const handleShowModalAddMediaFileProduct = (type: 'image' | 'video') => {
          SetShowModalAddMediaFileProduct(true)
          setTypeFile(type)
          setInitializeImage(true)
          setInitializeVideo(true)
     }

     const handleClose = () => {
          setInitializeImage(true)
          setInitializeVideo(true)
          SetShowModalAddMediaFileProduct(false)
     }

     return (
          <>
               {
                    isLoading && <Loading />
               }
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
                                                       <Form.Select required value={formData.categoryId} id="categoryId" name="categoryId" onChange={handleOnchangeSelect}>
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
                                                       <Form.Select required value={formData.subCategoryId} id="subCategoryId" name="subCategoryId" onChange={handleOnchangeSelect}>
                                                            <option value="">Selecciona sub categoría</option>
                                                            {
                                                                 subCategoryList.filter(subCategoryFilted => subCategoryFilted.categoryID == formData.categoryId).map((option, index) => (
                                                                      <option key={index} value={option.id}>{option.subCategoryName}</option>
                                                                 ))
                                                            }
                                                       </Form.Select>
                                                  </Form.Group>
                                             </Col >
                                             <Col xl={4} md={6} sm={12}>
                                                  <Form.Group className="mb-3">
                                                       <Form.Label><strong>{t('Discount')}:</strong></Form.Label>
                                                       <Form.Select required value={formData.discountId} id="discountId" name="discountId" onChange={handleOnchangeSelect}>
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
                                                       <Form.Select required value={formData.statusId} id="statusId" name="statusId" onChange={handleOnchangeSelect}>
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
                                                       <Form.Select required value={selectedTaxID !== '' ? selectedTaxID : formData.taxId} id="taxId" name="taxId" onChange={handleOnchangeSelect}>
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
                                                       <Form.Check type="switch" label={t('Active')} id="active" onChange={handleChangeChecked} defaultChecked={formData.active} />
                                                  </Form.Group>
                                             </Col >
                                        </Row>
                                        <hr className="pb-2" />
                                        <Row>
                                             <Col xl={12}>
                                                  <Form.Group className="mb-3 buttons-section">
                                                       {
                                                            isAddMode
                                                                 ?
                                                                 <Button id="btnAdd" type="submit" variant='outline-primary'>{t('Save')}</Button>
                                                                 :
                                                                 <Button id="btnUpdate" type="submit" variant='outline-primary' >{t('Update')}</Button>
                                                       }
                                                       <Link to={IndexPage} className='btn btn-outline-secondary'><span>{t('Back')}</span></Link>
                                                  </Form.Group>
                                             </Col>
                                        </Row>
                                        <hr className="pb-2" />
                                        {
                                             !formData.addMode ?
                                                  <div>
                                                       <Row>
                                                            <Col sm={12} className="d-flex justify-content-center gap-2">
                                                                 <div>
                                                                      <Button className='btnShowModalAddImageProduct' variant="outline-primary" onClick={() => handleShowModalAddMediaFileProduct('image')}>
                                                                           <div className="py-2">
                                                                                <div><Images size={30} /></div>
                                                                                <div className="pt-2">{t('AddImage')}</div>
                                                                           </div>
                                                                      </Button>
                                                                 </div>
                                                                 <div>
                                                                      <Button className='btnShowModalAddImageProduct' variant="outline-secondary" onClick={() => handleShowModalAddMediaFileProduct('video')}>
                                                                           <div className="py-2">
                                                                                <div><CameraVideo size={30} /></div>
                                                                                <div className="pt-2">{t('AddVideo')}</div>
                                                                           </div>
                                                                      </Button>
                                                                 </div>
                                                            </Col>
                                                       </Row>
                                                       <hr className="pb-2" />
                                                       <MultimediaFileProductList multimediaFilesProduct={multimediaFilesProduct} productId={formData.id} />
                                                  </div>
                                                  :
                                                  null
                                        }
                                   </div>
                              </Card>
                         </Form>
                         <ModalAddMediaFileProduct multimediaFilesProduct={multimediaFilesProduct} setMultimediaFilesProduct={setMultimediaFilesProduct} show={showModalAddMediaFileProduct} handleClose={handleClose} productId={formData.id} initializeImage={initializeImage} initializeVideo={initializeVideo} setInitializeVideo={setInitializeVideo} setInitializeImage={setInitializeImage} typeFile={typeFile} />
                    </div>
                    <CustomModalAlert show={showAlert} headerText={'Error'} bodyText={bodyText} handleClose={handleCloseAlert} hasUrlToRedirect={hasUrlToRedirect} urlToRedirect={urlToRedirect} />
               </div>
          </>
     )
}

export default AddUpdateProduct