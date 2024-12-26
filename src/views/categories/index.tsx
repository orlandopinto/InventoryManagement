import { useEffect, useState } from 'react'
import { CategoriesController } from '../../controllers/CategoriesController';
import { useShowMessageToast } from "../../hooks/useShowMessageToast";
import { MESSAGE_TOAST_ERROR_TYPE } from "../../utilities/Constants.d";
import { Categories } from '../../types/Categories';
import { useAuth } from '../../contexts/useAuth';
import { CustomError } from '../../models/CustomError';
import { Link } from 'react-router-dom';
import Loading from '../index/Loading';
//import CustomTable from '../../components/common/custom-table/CustomTable';
import { IFormattedData } from '../../interfaces/IHeaderData';
import { Plus } from 'react-bootstrap-icons';
import DataTable from '../../components/common/DataTable/DataTable';
import DataColumn from '../../components/common/DataTable/DataColumn';

function index() {

     const { tokenResult } = useAuth()
     let controller = new CategoriesController(tokenResult?.accessToken as string)
     const { ShowMessageToast } = useShowMessageToast()
     const [isLoading, setIsLoading] = useState(false)
     const [data, setData] = useState<Categories[]>([]);
     const [show, setShow] = useState(false);
     const [idToDelete, setIdToDelete] = useState('')

     useEffect(() => {
          onGetData();
     }, [])

     const onGetData = () => {
          setIsLoading(true)
          controller.Get().then((data => {
               setData(data.result as Categories[]);
          })).catch((err) => {
               const error = err as CustomError;
               ShowMessageToast(error.message, MESSAGE_TOAST_ERROR_TYPE.ERROR);
          }).finally(() => {
               setIsLoading(false)
          });
     }

     const handleDelete = async (idToDelete: string) => {
          await controller.Delete(idToDelete).then((data => {
               onGetData();
               ShowMessageToast("categoría eliminada satisfactoriamente!", MESSAGE_TOAST_ERROR_TYPE.SUCCESS);
               setShow(false);
          })).catch((err) => {
               const error = err as CustomError
               ShowMessageToast(error.message, MESSAGE_TOAST_ERROR_TYPE.ERROR);
          });
     }

     const emptyArrayData: Categories[] = [
          {
               id: '',
               categoryName: '',
               categoryCode: '',
               categoryDescription: null,
               createBy: '',
               creationDate: null,
               updateDate: null,
               categoryImagePath: ''
          }
     ]

     const emptyData: IFormattedData[] = emptyArrayData.map((category) => [
          { value: category.id, label: 'id', visible: false, field: 'id' },
          { value: category.categoryName, label: 'Categoría', visible: true, field: 'categoryName' },
          { value: category.categoryCode, label: 'Código', visible: true, field: 'categoryCode' },
          { value: category.categoryDescription ?? '', label: 'Descripción', visible: true, field: 'categoryDescription' },
          { value: category.createBy, label: 'Creado por', visible: false, field: 'createBy' },
          { value: category.creationDate, label: 'Fecha de creación', visible: true, field: 'creationDate' },
          { value: category.updateDate ?? '', label: 'Fecha de actualización', visible: false, field: 'updateDate' },
          { value: category.categoryImagePath, label: 'Ruta imagen', visible: false, field: 'categoryImagePath' },
          { value: '' } // Buttons
     ])


     const dataFormatted: IFormattedData[] = data !== null ? data.map((category) => [
          { value: category.id, label: 'id', visible: false, field: 'id' },
          { value: category.categoryName, label: 'Categoría', visible: true, field: 'categoryName' },
          { value: category.categoryCode, label: 'Código', visible: true, field: 'categoryCode' },
          { value: category.categoryDescription ?? '', label: 'Descripción', visible: true, field: 'categoryDescription' },
          { value: category.createBy, label: 'Creado por', visible: false, field: 'createBy' },
          { value: category.creationDate, label: 'Fecha de creación', visible: true, field: 'creationDate' },
          { value: category.updateDate ?? '', label: 'Fecha de actualización', visible: false, field: 'updateDate' },
          { value: category.categoryImagePath, label: 'Ruta imagen', visible: false, field: 'categoryImagePath' },
          { value: 'Buttons' } // Buttons
     ]) :
          emptyData;


     const dataTableOptions = {
          dataKey: 'id',
          filters: ['categoryName', 'categoryDescription'],
          showPagination: true,
          rowPerPage: 10,
          rowsPerPageOptions: ['5', '10', '25', '50'],
          emptyMessage: 'No se encontraron datos',
          showPerPageMessage: 'Mostrar por página',
          urlEdit: '/categories/AddUpdateCategory/',
          handleDelete: handleDelete,
          modalHeaderText: '¿Realmente quiere eliminar la categoría?'
     }

     return (
          <>
               {
                    isLoading && <Loading />
               }
               <div>
                    <div className='header-page'>
                         <div>
                              <h4>Categorías</h4>
                              <p>Gestione sus categorías</p>
                         </div>
                         <div><Link to="/categories/AddUpdateCategory" className='btn btn-primary'><Plus size={20} /><span>Agregar categoria</span></Link></div>
                    </div>

                    <DataTable data={data} options={dataTableOptions}>
                         <DataColumn field="id" header="id" visibility={false} />
                         <DataColumn field="categoryName" header="Nombre de la categoría" />
                         <DataColumn field="categoryCode" header="Código" />
                         <DataColumn field="categoryDescription" header="Descripción" />
                         <DataColumn field="createBy" header="Creado por" visibility={false} />
                         <DataColumn field="creationDate" header="Fecha de creación" />
                         <DataColumn field="updateDate" header="updateDate" visibility={false} />
                         <DataColumn field="categoryImagePath" header="categoryImagePath" visibility={false} />
                    </DataTable>

                    {/* <CustomTable
                         datos={dataFormatted}
                         dataKey="id"
                         urlAddEdit='/categories/AddUpdateCategory/'
                         filters={['categoryName', 'categoryDescription']}
                         handleDelete={handleDelete}
                         rowPerPage={10}
                         rowsPerPageOptions={[5, 10, 25, 50]}
                         emptyMessage="No se encontraron datos"
                         showPerPageMessage="Show per page">
                    </CustomTable> */}
               </div>
          </>
     )
}

export default index