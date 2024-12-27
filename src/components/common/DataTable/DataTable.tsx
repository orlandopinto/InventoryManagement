import React, { useEffect, useState } from 'react'
import { Card, Form, Table } from 'react-bootstrap';
import { FilePdf, FileSpreadsheet, PencilSquare, PrinterFill, Trash } from 'react-bootstrap-icons';
import DataTablePagination from './DataTablePagination';
import './DataTable.css';
import { Link } from 'react-router-dom';
import ModalDelete from '../../../hooks/ModalDelete';

const uniqueKey = (pre: number) => {
     return `${pre}_${new Date().getTime()}`;
};

export interface DataTableOptions {
     dataKey: string
     filters: string[]
     showPagination: boolean
     rowPerPage: number
     rowsPerPageOptions: string[]
     emptyMessage: string
     showPerPageMessage: string,
     urlEdit?: string,
     handleDelete: (idToDelete: string) => void,
     modalHeaderText?: string
}

const DataTable = <T extends Record<string, any>>({ children, data, options = {} as DataTableOptions }: { children: React.ReactNode, data: T[], options: DataTableOptions }) => {
     const [searchFilter, setSearchFilter] = useState('');
     const [pageSize, setPageSize] = useState<number>(options.rowPerPage || 10)
     const [currentPage, setCurrentPage] = useState(1);
     const [show, setShow] = useState(false);
     const [idToDelete, setIdToDelete] = useState('')

     useEffect(() => {
          setShow(false)
     }, [data])

     const handleFilter = async (e: React.ChangeEvent<HTMLInputElement>) => {
          e.preventDefault();
          setSearchFilter(e.target.value);
     };

     const filteredData = data.filter((item) => options.filters.some((field) => item[field].toLowerCase().includes(searchFilter.toLowerCase())));

     const paginatedData = filteredData.slice(
          (currentPage - 1) * pageSize,
          currentPage * pageSize
     );

     const handleOnchangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
          const _target = e.target as HTMLSelectElement;
          const pageSize = Number(_target.value);
          setPageSize(pageSize)
     }

     const validateIfFieldDate = (date: string) => {
          var regex = new RegExp("([0-9]{4}[-](0[1-9]|1[0-2])[-]([0-2]{1}[0-9]{1}|3[0-1]{1})|([0-2]{1}[0-9]{1}|3[0-1]{1})[-](0[1-9]|1[0-2])[-][0-9]{4})");
          return regex.test(date);
     }

     const handleShow = (id: string) => {
          setShow(true);
          setIdToDelete(id);
     }

     const handleClose = () => setShow(false);

     return <div>
          <Card>
               <div className='container-fluid pt-2'>
                    {options.filters && options.filters.length > 0 && (
                         <div className='search-bar'>
                              <div>
                                   <input
                                        style={{ width: "500px" }}
                                        className='form-control mb-2'
                                        placeholder='Buscar'
                                        value={searchFilter}
                                        onChange={handleFilter}
                                   />
                              </div>
                              <div className="search-bar-right-icons">
                                   <FilePdf size={20}></FilePdf>
                                   <FileSpreadsheet size={20}></FileSpreadsheet>
                                   <PrinterFill size={20}></PrinterFill>
                              </div>
                         </div>
                    )}

                    <Table>
                         <thead>
                              <tr key="1">
                                   {
                                        React.Children.map(children, child =>
                                             child && React.isValidElement(child) ? (
                                                  <th className={child?.props?.visibility === false ? 'hiddenColumn' : ''}>
                                                       {child?.props?.header}
                                                  </th>
                                             ) : null
                                        )
                                   }
                                   <th style={{ width: '72px' }}></th>
                              </tr>
                         </thead>
                         <tbody>
                              {
                                   paginatedData.map((item: T) => (
                                        <tr key={uniqueKey(item[options.dataKey])} style={{ verticalAlign: 'middle' }} >
                                             {
                                                  React.Children.map(children, child => {
                                                       return (
                                                            React.isValidElement(child)
                                                                 ?
                                                                 <td className={child?.props?.visibility === false ? 'hiddenColumn' : ''}>
                                                                      {validateIfFieldDate(item[child.props.field])
                                                                           ?
                                                                           new Date(item[child.props.field]).toLocaleDateString("es-ES")
                                                                           : (child.props.type === 'image'
                                                                                ? <img src={item[child.props.field]} alt={item[child.props.field]} width='50' height='50' />
                                                                                :
                                                                                item[child.props.field])
                                                                      }
                                                                      {/* {String(item[(child.props as { field: keyof T }).field])} */}
                                                                 </td>
                                                                 :
                                                                 null
                                                       )
                                                  })
                                             }
                                             <td>
                                                  <div className='table-row-icons'>
                                                       <Link to={`${options.urlEdit}${item[options.dataKey]}`}><PencilSquare className='table-row-icon' size={20}></PencilSquare></Link>
                                                       <Trash size={20} onClick={() => { handleShow(item[options.dataKey]) }}></Trash>
                                                  </div>
                                             </td>
                                        </tr>
                                   ))
                              }
                         </tbody>
                    </Table>
                    {options.showPagination && (
                         <div className='pagination-footer'>
                              <div className='show-per-page'>
                                   <div>{options.showPerPageMessage}:</div>
                                   <div>
                                        <Form.Select size="sm" value={pageSize} onChange={handleOnchangeSelect}>
                                             {options.rowsPerPageOptions.map((option, index) => (
                                                  <option key={index} value={option}>{option}</option>
                                             ))}
                                        </Form.Select>
                                   </div>
                              </div>
                              <div >
                                   {filteredData.length > 0 &&
                                        <DataTablePagination
                                             itemsCount={filteredData.length}
                                             itemsPerPage={pageSize}
                                             currentPage={currentPage}
                                             setCurrentPage={setCurrentPage}
                                             alwaysShown={true}
                                        />
                                   }
                              </div>

                         </div>
                    )}
               </div>
          </Card >
          {children}
          <ModalDelete show={show} headerContent={options.modalHeaderText || "¿Realmente quiere eliminar el registro?"} handleClose={handleClose} handleDelete={() => options.handleDelete(idToDelete)} />
     </div>
};

export default DataTable