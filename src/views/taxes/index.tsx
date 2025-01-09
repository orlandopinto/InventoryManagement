import { Plus } from "react-bootstrap-icons"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { Button } from "react-bootstrap"
import { useTranslation } from 'react-i18next'

import Loading from "../index/Loading"
import DataColumn from "../../components/common/DataTable/DataColumn"
import DataTable from "../../components/common/DataTable/DataTable"

import { initializeTaxesViewModel, Taxes, TaxesViewModel } from "../../types/Taxes.types.d"
import { MESSAGE_TOAST_ERROR_TYPE } from "../../utilities/Constants.d"

import { TaxesController } from '../../controllers/TaxesController'
import { useShowMessageToast } from "../../hooks/useShowMessageToast"
import { CustomError } from "../../models/CustomError"
import CustomModalAlert from "../../components/common/Modals/CustomModalAlert"

function index() {
     //VARIABLES
     const { t } = useTranslation();
     const translate = t;
     const { ShowMessageToast } = useShowMessageToast()
     const [isLoading, setIsLoading] = useState(false)
     const [dataViewModel, setDataViewModel] = useState<TaxesViewModel[]>([]);
     const newTax: TaxesViewModel = initializeTaxesViewModel
     let controller = TaxesController()
     const navigate = useNavigate();
     const AddEditPage: string = '/taxes/AddUpdateTaxes/';

     //STATES
     const [showAlert, setShowAlert] = useState(false);
     const [bodyText, setBodyText] = useState('')

     useEffect(() => {
          onGetData();
     }, [])

     const onGetData = () => {
          setIsLoading(true)
          controller.Index().then((response => {
               const taxesList: Taxes[] = response as unknown as Taxes[]
               const result: TaxesViewModel[] = [];
               taxesList.map((tax) => result.push(Mapper(tax)));
               setDataViewModel(result);
          })).catch((err) => {
               const error = err as CustomError;
               ShowMessageToast(error.message, MESSAGE_TOAST_ERROR_TYPE.ERROR);
          }).finally(() => {
               setIsLoading(false)
          });
     }

     const handleDelete = async (idToDelete: string) => {
          await controller.Delete(idToDelete).then((response => {
               onGetData();
               ShowMessageToast("El estado ha sido eliminado satisfactoriamente!", MESSAGE_TOAST_ERROR_TYPE.SUCCESS);
          })).catch((err) => {
               const error = err as CustomError
               setBodyText(error.message);
               setShowAlert(true);
          });
     }

     const dataTableOptions = {
          dataKey: 'id',
          filters: ['taxDescription'],
          showPagination: true,
          rowPerPage: 10,
          rowsPerPageOptions: ['5', '10', '25', '50'],
          emptyMessage: translate('NoDataFound'),
          showPerPageMessage: translate('ShowPerPage'),
          urlEdit: AddEditPage,
          handleDelete,
          modalHeaderText: translate('DeleteQuestion')
     }

     const handleCloseAlert = () => setShowAlert(false);


     const Mapper = (tax: Taxes): TaxesViewModel => {
          const taxMepped: TaxesViewModel = {
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
          }
          return taxMepped;
     }

     return (
          <>
               {isLoading && <Loading />}
               <div>
                    <div className='header-page'>
                         <div>
                              <h4>{translate('Taxes')}</h4>
                              <p>{translate('Manageyour')} {translate('Taxes').toLocaleLowerCase()}</p>
                         </div>
                         <div>
                              <Button onClick={() => navigate(AddEditPage, { state: newTax })} variant='primary'><Plus size={20} /><span>{translate('Add')} {translate('Taxes').toLocaleLowerCase()}</span></Button>
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