import { Button } from "react-bootstrap"
import { Plus } from "react-bootstrap-icons"
import { useTranslation } from 'react-i18next'
import { useNavigate } from "react-router-dom"

import DataColumn from "../../components/common/DataTable/DataColumn"
import DataTable from "../../components/common/DataTable/DataTable"
import CustomModalAlert from "../../components/common/Modals/CustomModalAlert"
import { ProductsController } from '../../controllers/ProductsController'
import useIndexEntity from "../../hooks/useIndexEntity"
import { initializeProductViewModel, Product, ProductViewModel } from "../../types/Products.types.d"
import Loading from "../index/Loading"

function index() {
     //VARIABLES
     const { t } = useTranslation();
     const newProduct: ProductViewModel = initializeProductViewModel
     const AddEditPage: string = '/products/AddUpdateProduct/';
     const Mapper = (product: Product): ProductViewModel => {
          return {
               id: product.id,
               productName: product.productName,
               productDescription: product.productDescription,
               cost: product.cost,
               price: product.price,
               quantity: product.quantity,
               minimunQuantity: product.minimunQuantity,
               codeBar: product.codeBar,
               sku: product.sku,
               createBy: product.createBy,
               categoryId: product.categoryId,
               subCategoryId: product.subCategoryId,
               discountId: product.discountId,
               statusId: product.statusId,
               taxId: product.taxId,
               active: product.active,
               creationDate: product.creationDate,
               updateDate: product.updateDate,
               addMode: false
          } as ProductViewModel
     }

     const { dataViewModel, isLoading, showAlert, bodyText, handleCloseAlert, handleDelete } = useIndexEntity(ProductsController(), initializeProductViewModel, Mapper)

     const dataTableOptions = {
          dataKey: 'id',
          filters: ['productName', 'productDescription'],
          showPagination: true,
          rowPerPage: 10,
          rowsPerPageOptions: ['5', '10', '25', '50'],
          emptyMessage: t('NoDataFound'),
          showPerPageMessage: t('ShowPerPage'),
          urlEdit: AddEditPage,
          handleDelete,
          modalHeaderText: t('DeleteQuestion')
     }

     //HOOKS
     const navigate = useNavigate();

     return (
          <>
               {isLoading && <Loading />}
               <div>
                    <div className='header-page'>
                         <div>
                              <h4>{t('Product')}</h4>
                              <p>{t('Manageyour')} {t('Product').toLocaleLowerCase()}</p>
                         </div>
                         <div>
                              <Button onClick={() => navigate(AddEditPage, { state: newProduct })} variant='primary'><Plus size={20} /><span>{t('Add')} {t('Product').toLocaleLowerCase()}</span></Button>
                         </div>
                    </div>
                    <DataTable data={dataViewModel} options={dataTableOptions}>
                         <DataColumn field="id" header="id" visibility={false} />
                         <DataColumn field="productName" header={t('ProductName')} isHeaderCentered={true} />
                         <DataColumn field="productDescription" header={t('ProductDescription')} isHeaderCentered={true} />
                         <DataColumn field="cost" header={t('Cost')} isHeaderCentered={true} isFieldCentered={true} />
                         <DataColumn field="price" header={t('Price')} isHeaderCentered={true} isFieldCentered={true} />
                         <DataColumn field="quantity" header={t('Quantity')} isHeaderCentered={true} isFieldCentered={true} />
                         <DataColumn field="createBy" header={t('CreateBy')} isHeaderCentered={true} isFieldCentered={true} />
                         <DataColumn field="active" header={t('Active')} isHeaderCentered={true} isFieldCentered={true} type='boolean' />
                         <DataColumn field="creationDate" header={t('CreationDate')} isHeaderCentered={true} isFieldCentered={true} />
                    </DataTable>
                    <CustomModalAlert show={showAlert} headerText={'Error'} bodyText={bodyText} handleClose={handleCloseAlert} hasUrlToRedirect={false} urlToRedirect={''} />
               </div>
          </>
     )
}
export default index