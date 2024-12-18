import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import CustomPagination from '../../components/common/CustomPagination';
import { useAuth } from '../../contexts/useAuth';
import { UsersController } from '../../controllers/UsersController';
import { useShowMessageToast } from '../../hooks/useShowMessageToast';
import { Users } from '../../types/Users';
import { CustomError } from '../../models/CustomError';
import { MESSAGE_TOAST_ERROR_TYPE } from '../../utilities/Constants.d';

export default function UsersTable() {
     const { tokenResult } = useAuth()
     const controller = new UsersController(tokenResult as string, "")
     const { ShowMessageToast } = useShowMessageToast()

     const [data, setData] = useState<Users[]>([]);
     const [searchFilter, setSearchFilter] = useState(''); // filter the search
     const [currentPage, setCurrentPage] = useState(1); // set the current page


     const pageSize = 5; // show row in table
     //replace this code with your api
     useEffect(() => {
          controller.Get().then((data => {
               setData(data.result as Users[])
          })).catch((err) => {
               const error = err as CustomError
               ShowMessageToast(error.message, MESSAGE_TOAST_ERROR_TYPE.ERROR);
          });
     }, [])

     //end heare

     useEffect(() => {
          setCurrentPage(1);
     }, [searchFilter]);

     const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
          setSearchFilter(e.target.value);
     };

     const filteredData = data.filter(
          (item) =>
               item.userName?.toLowerCase().includes(searchFilter.toLowerCase())
               || item.lastName?.toLowerCase().includes(searchFilter)
     );

     const paginatedData = filteredData.slice(
          (currentPage - 1) * pageSize,
          currentPage * pageSize
     );

     return (
          <div className='fluid container'>
               <div className='mb-2 fw-50'>EmpReports</div>
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
     );
};

//export default UsersTable;