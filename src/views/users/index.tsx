import React, { useEffect, useState } from 'react'
import { UsersController } from '../../controllers/UsersController';
import { useShowMessageToast } from "../../hooks/useShowMessageToast";
import { MESSAGE_TOAST_ERROR_TYPE } from "../../utilities/Constants.d";
import { Users } from '../../types/Users';
import { useAuth } from '../../contexts/useAuth';
import { CustomError } from '../../models/CustomError';
import { Button, Card, Table } from 'react-bootstrap';
import CustomPagination from './CustomPagination';
import * as Icon from "react-bootstrap-icons";
import { Form } from 'react-router-dom';

function index() {
     /*** ..:: [ ROW PER PAGE ] ::.. ***/
     const pageSize = 5;
     /***********************************/

     const { tokenResult } = useAuth()
     const controller = new UsersController(tokenResult as string, "")
     const { ShowMessageToast } = useShowMessageToast()

     const [data, setData] = useState<Users[]>([]);
     const [searchFilter, setSearchFilter] = useState('');
     const [currentPage, setCurrentPage] = useState(1);

     useEffect(() => {
          controller.Get().then((data => {
               setData(data.result as Users[])
          })).catch((err) => {
               const error = err as CustomError
               ShowMessageToast(error.message, MESSAGE_TOAST_ERROR_TYPE.ERROR);
          });
     }, [])

     const handleFilter = async (e: React.ChangeEvent<HTMLInputElement>) => {
          e.preventDefault();
          setSearchFilter(e.target.value);
     };

     const filteredData = data.filter(
          (item) =>
               item.firstName?.toLowerCase().includes(searchFilter.toLowerCase())
               || item.lastName?.toLowerCase().includes(searchFilter.toLowerCase())
     );

     const paginatedData = filteredData.slice(
          (currentPage - 1) * pageSize,
          currentPage * pageSize
     );

     return (
          <>
               <div>
                    <div className='header-page'>
                         <div>
                              <h2>Lista de Usuarios</h2>
                              <p>Administra tus usuarios</p>
                         </div>
                         <div>
                              <Button variant="primary"><Icon.Plus size={20}></Icon.Plus>Agregar usuario</Button>
                         </div>
                    </div>
                    <div>
                         <Card>
                              <div className='container-fluid pt-2'>
                                   <input
                                        style={{ width: "200px" }}
                                        className='form-control mb-2'
                                        placeholder='Search'
                                        value={searchFilter}
                                        onChange={handleFilter}
                                   />
                                   <Table striped bordered hover id='table'>
                                        <tbody>
                                             <tr>
                                                  <th style={{ width: '4%' }}>#</th>
                                                  <th>Nombre de Usuario</th>
                                                  <th>Nombre</th>
                                                  <th>Apellido</th>
                                             </tr>
                                             {paginatedData.length > 0 ? (
                                                  paginatedData.map((user, i) => (
                                                       <tr key={i} style={{ background: '#fff' }}>
                                                            <td>{(currentPage - 1) * pageSize + i + 1}</td>
                                                            <td>{user.userName}</td>
                                                            <td>{user.firstName}</td>
                                                            <td>{user.lastName}</td>
                                                       </tr>
                                                  ))
                                             ) : (
                                                  <tr>
                                                       <td colSpan={3}>No data found</td>
                                                  </tr>
                                             )}
                                        </tbody>
                                   </Table>
                                   {filteredData.length > 0 &&
                                        <>
                                             <CustomPagination
                                                  itemsCount={filteredData.length}
                                                  itemsPerPage={pageSize}
                                                  currentPage={currentPage}
                                                  setCurrentPage={setCurrentPage}
                                                  alwaysShown={true}
                                             />
                                        </>
                                   }
                              </div>
                         </Card>
                    </div>
               </div>
          </>
     )
}

export default index