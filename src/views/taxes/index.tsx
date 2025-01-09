import { Button } from "react-bootstrap"
import { Plus } from "react-bootstrap-icons"
import { useTranslation } from 'react-i18next'
import { useNavigate } from "react-router-dom"

import DataColumn from "../../components/common/DataTable/DataColumn"
import DataTable from "../../components/common/DataTable/DataTable"
import Loading from "../index/Loading"
import { initializeTaxesViewModel, Taxes, TaxesViewModel } from "../../types/Taxes.types.d"
import CustomModalAlert from "../../components/common/Modals/CustomModalAlert"
import { TaxesController } from '../../controllers/TaxesController'
import useIndexEntity from "../../hooks/useIndexEntity"

function index() {
     //VARIABLES
     const { t } = useTranslation();
     const newTax: TaxesViewModel = initializeTaxesViewModel
     const AddEditPage: string = '/taxes/AddUpdateTaxes/';
     const Mapper = (tax: Taxes): TaxesViewModel => {
          return {
               id: tax.id,
               taxDescription: tax.taxDescription,
               tax: tax.tax,
               createBy: tax.createBy,
               active: tax.active,
               dateFrom: tax.dateFrom,
               dateTo: tax.dateTo,
               creationDate: tax.creationDate,
               updateDate: tax.updateDate,
               addMode: false
          } as TaxesViewModel
     }

     const { dataViewModel, isLoading, showAlert, bodyText, handleCloseAlert, handleDelete } = useIndexEntity(TaxesController(), initializeTaxesViewModel, Mapper)

     const dataTableOptions = {
          dataKey: 'id',
          filters: ['taxDescription'],
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
                              <h4>{t('Taxes')}</h4>
                              <p>{t('Manageyour')} {t('Taxes').toLocaleLowerCase()}</p>
                         </div>
                         <div>
                              <Button onClick={() => navigate(AddEditPage, { state: newTax })} variant='primary'><Plus size={20} /><span>{t('Add')} {t('Taxes').toLocaleLowerCase()}</span></Button>
                         </div>
                    </div>
                    <DataTable data={dataViewModel} options={dataTableOptions}>
                         <DataColumn field="id" header="id" visibility={false} />
                         <DataColumn field="taxDescription" header={t('Description')} isHeaderCentered={true} />
                         <DataColumn field="tax" header={t('Tax')} isHeaderCentered={true} isFieldCentered={true} />
                         <DataColumn field="createBy" header={t('CreateBy')} isHeaderCentered={true} isFieldCentered={true} />
                         <DataColumn field="active" header={t('Active')} isHeaderCentered={true} isFieldCentered={true} type='boolean' />
                         <DataColumn field="dateFrom" header={t('From')} isHeaderCentered={true} isFieldCentered={true} />
                         <DataColumn field="dateTo" header={t('To')} isHeaderCentered={true} isFieldCentered={true} />
                         <DataColumn field="creationDate" header={t('CreationDate')} isHeaderCentered={true} isFieldCentered={true} />
                         <DataColumn field="updateDate" header={t('LastUpdate')} isHeaderCentered={true} isFieldCentered={true} />
                    </DataTable>
                    <CustomModalAlert show={showAlert} headerText={'Error'} bodyText={bodyText} handleClose={handleCloseAlert} hasUrlToRedirect={false} urlToRedirect={''} />
               </div>
          </>
     )
}
export default index