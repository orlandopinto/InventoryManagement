import { useEffect, useState } from 'react'
import { useShowMessageToast } from "../../hooks/useShowMessageToast";
import { MESSAGE_TOAST_ERROR_TYPE } from "../../utilities/Constants.d";
import { useAuth } from '../../contexts/useAuth';
import { CustomError } from '../../models/CustomError';
import { Link } from 'react-router-dom';
import Loading from '../index/Loading';
import { Plus } from 'react-bootstrap-icons';
import DataTable from '../../components/common/DataTable/DataTable';
import DataColumn from '../../components/common/DataTable/DataColumn';
import { DiscountsController } from '../../controllers/DiscountsController';
import { Discount } from '../../types/Discount.type';
import { useTranslation } from 'react-i18next';

export default function index() {

     const { tokenResult } = useAuth()
     let controller = new DiscountsController(tokenResult?.accessToken as string)
     const { ShowMessageToast } = useShowMessageToast()
     const [isLoading, setIsLoading] = useState(false)
     const [data, setData] = useState<Discount[]>([]);
     const [show, setShow] = useState(false);
     const { t } = useTranslation();

     useEffect(() => {
          onGetData();
     }, [])

     const onGetData = () => {
          setIsLoading(true)
          controller.Get().then((response => {
               setData(response as unknown as Discount[]);
          })).catch((err) => {
               const error = err as CustomError;
               ShowMessageToast(error.message, MESSAGE_TOAST_ERROR_TYPE.ERROR);
          }).finally(() => {
               setIsLoading(false)
          });
     }

     const handleDelete = async (idToDelete: string) => {
          await controller.Delete(idToDelete).then((response => {
               if (response as unknown as boolean !== true) {
                    ShowMessageToast("Se ha producido un error al eliminar el descuento!", MESSAGE_TOAST_ERROR_TYPE.ERROR);
                    return;
               }
               onGetData();
               ShowMessageToast("El descuento ha sido eliminado satisfactoriamente!", MESSAGE_TOAST_ERROR_TYPE.SUCCESS);
               setShow(false);
          })).catch((err) => {
               const error = err as CustomError
               ShowMessageToast(error.message, MESSAGE_TOAST_ERROR_TYPE.ERROR);
          });
     }

     const dataTableOptions = {
          dataKey: 'id',
          filters: ['discountDescription'],
          showPagination: true,
          rowPerPage: 10,
          rowsPerPageOptions: ['5', '10', '25', '50'],
          emptyMessage: 'No se encontraron datos',
          showPerPageMessage: t('ShowPerPage'),
          urlEdit: '/discounts/AddUpdateDiscount/',
          handleDelete,
          modalHeaderText: '¿Realmente quiere eliminar el descuento?'
     }

     return (
          <>
               {
                    isLoading && <Loading />
               }
               <div>
                    <div className='header-page'>
                         <div>
                              <h4>{t('Discounts')}</h4>
                              <p>{t('Manageyour')} {t('Discounts').toLocaleLowerCase()}</p>
                         </div>
                         <div><Link to="/discounts/AddUpdateDiscount" className='btn btn-primary'><Plus size={20} /><span>{t('Add')} {t('Discount').toLocaleLowerCase()}</span></Link></div>
                    </div>

                    <DataTable data={data} options={dataTableOptions}>
                         <DataColumn field="id" header="id" visibility={false} />
                         <DataColumn field="discountDescription" header={t('Description')} isHeaderCentered={true} />
                         <DataColumn field="discount" header={t('Discount')} isHeaderCentered={true} isFieldCentered={true} />
                         <DataColumn field="createBy" header={t('CreateBy')} isHeaderCentered={true} isFieldCentered={true} />
                         <DataColumn field="creationDate" header={t('CreationDate')} isHeaderCentered={true} isFieldCentered={true} />
                         <DataColumn field="updateDate" header={t('LastUpdate')} isHeaderCentered={true} isFieldCentered={true} />
                         <DataColumn field="active" header={t('Active')} isHeaderCentered={true} isFieldCentered={true} type='boolean' />
                    </DataTable>

               </div>
          </>
     )
}
