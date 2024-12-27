import { useEffect, useState } from 'react'
import { useShowMessageToast } from "../../hooks/useShowMessageToast";
import { MESSAGE_TOAST_ERROR_TYPE } from "../../utilities/Constants.d";
import { SubCategoriesViewModel } from '../../types/SubCategories';
import { useAuth } from '../../contexts/useAuth';
import { CustomError } from '../../models/CustomError';
import { Link } from 'react-router-dom';
import Loading from '../index/Loading';
import { Plus } from 'react-bootstrap-icons';
import DataTable from '../../components/common/DataTable/DataTable';
import DataColumn from '../../components/common/DataTable/DataColumn';
import { SubCategoriesController } from '../../controllers/SubCategoriesController';

function index() {

     const { tokenResult } = useAuth()
     let controller = new SubCategoriesController(tokenResult?.accessToken as string)
     const { ShowMessageToast } = useShowMessageToast()
     const [isLoading, setIsLoading] = useState(false)
     const [data, setData] = useState<SubCategoriesViewModel[]>([]);
     const [show, setShow] = useState(false);

     useEffect(() => {
          onGetData();
     }, [])

     const onGetData = () => {
          setIsLoading(true)
          controller.Get().then((response => {
               setData(response as unknown as SubCategoriesViewModel[]);
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
                    ShowMessageToast("Se ha producido un error al eliminar la sub categoría!", MESSAGE_TOAST_ERROR_TYPE.ERROR);
                    return;
               }
               onGetData();
               ShowMessageToast("Sub categoría eliminada satisfactoriamente!", MESSAGE_TOAST_ERROR_TYPE.SUCCESS);
               setShow(false);
          })).catch((err) => {
               const error = err as CustomError
               ShowMessageToast(error.message, MESSAGE_TOAST_ERROR_TYPE.ERROR);
          });
     }

     const dataTableOptions = {
          dataKey: 'id',
          filters: ['subCategoryName', 'subCategoryDescription'],
          showPagination: true,
          rowPerPage: 10,
          rowsPerPageOptions: ['5', '10', '25', '50'],
          emptyMessage: 'No se encontraron datos',
          showPerPageMessage: 'Mostrar por página',
          urlEdit: '/subcategories/AddUpdateSubCategory/',
          handleDelete: handleDelete,
          modalHeaderText: '¿Realmente quiere eliminar la sub categoría?'
     }

     return (
          <>
               {
                    isLoading && <Loading />
               }
               <div>
                    <div className='header-page'>
                         <div>
                              <h4>Sub Categorías</h4>
                              <p>Gestione sus sub categorías</p>
                         </div>
                         <div><Link to="/subcategories/AddUpdateSubCategory" className='btn btn-primary'><Plus size={20} /><span>Agregar sub categoria</span></Link></div>
                    </div>

                    <DataTable data={data} options={dataTableOptions}>
                         <DataColumn field="id" header="id" visibility={false} />
                         <DataColumn field="categoryImage" header="Ref." type='image' />
                         <DataColumn field="categoryName" header="Categoría" />
                         <DataColumn field="categoryCode" header="Código" />
                         <DataColumn field="subCategoryName" header="Sub Categoría" />
                         <DataColumn field="subCategoryDescription" header="Descripción" />
                         <DataColumn field="createBy" header="Creado por" visibility={false} />
                         <DataColumn field="creationDate" header="Fecha de creación" />
                         <DataColumn field="updateDate" header="updateDate" visibility={false} />
                    </DataTable>

               </div>
          </>
     )
}

export default index