import { Plus } from "react-bootstrap-icons"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { Button } from "react-bootstrap"
import { useTranslation } from 'react-i18next'

import Loading from "../index/Loading"
import DataColumn from "../../components/common/DataTable/DataColumn"
import DataTable from "../../components/common/DataTable/DataTable"

import { initializeStatusViewModel, Status, StatusViewModel } from "../../types/Status.types.d"
import { MESSAGE_TOAST_ERROR_TYPE } from "../../utilities/Constants.d"

import { StatusController } from '../../controllers/StatusController'
import { useShowMessageToast } from "../../hooks/useShowMessageToast"
import { CustomError } from "../../models/CustomError"
import CustomModalAlert from "../../components/common/Modals/CustomModalAlert"

function index() {
     //VARIABLES
     const { t } = useTranslation();
     const translate = t;
     const { ShowMessageToast } = useShowMessageToast()
     const [isLoading, setIsLoading] = useState(false)
     const [dataViewModel, setDataViewModel] = useState<StatusViewModel[]>([]);
     const newStatus: StatusViewModel = initializeStatusViewModel
     let controller = StatusController()
     const navigate = useNavigate();
     const AddEditPage: string = '/status/AddUpdateStatus/';

     //STATES
     const [showAlert, setShowAlert] = useState(false);
     const [bodyText, setBodyText] = useState('')

     useEffect(() => {
          onGetData();
     }, [])

     const onGetData = () => {
          setIsLoading(true)
          controller.Index().then((response => {
               const statusList: Status[] = response as unknown as Status[]
               const result: StatusViewModel[] = statusList.map((status) => ({
                    id: status.id,
                    statusDescription: status.statusDescription,
                    createBy: status.createBy,
                    creationDate: status.creationDate,
                    updateDate: status.updateDate,
                    addMode: false,
               }));
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
          filters: ['statusDescription'],
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

     return (
          <>
               {isLoading && <Loading />}
               <div>
                    <div className='header-page'>
                         <div>
                              <h4>{translate('Status')}</h4>
                              <p>{translate('Manageyour')} {translate('Status').toLocaleLowerCase()}</p>
                         </div>
                         <div>
                              <Button onClick={() => navigate(AddEditPage, { state: newStatus })} variant='primary'><Plus size={20} /><span>{translate('Add')} {translate('Status').toLocaleLowerCase()}</span></Button>
                         </div>
                    </div>
                    <DataTable data={dataViewModel} options={dataTableOptions}>
                         <DataColumn field="id" header="id" visibility={false} />
                         <DataColumn field="statusDescription" header={t('Description')} isHeaderCentered={true} />
                         <DataColumn field="createBy" header={t('CreateBy')} isHeaderCentered={true} isFieldCentered={true} />
                         <DataColumn field="creationDate" header={t('CreationDate')} isHeaderCentered={true} isFieldCentered={true} />
                         <DataColumn field="updateDate" header={t('LastUpdate')} isHeaderCentered={true} isFieldCentered={true} />
                    </DataTable>
                    <CustomModalAlert show={showAlert} headerText={'Error'} bodyText={bodyText} handleClose={handleCloseAlert} hasUrlToRedirect={false} urlToRedirect={''} />
               </div>
          </>
     )
}
export default index