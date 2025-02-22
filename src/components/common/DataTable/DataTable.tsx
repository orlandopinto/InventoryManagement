import React, { useEffect, useState } from 'react'
import { Card, Form, Table } from 'react-bootstrap';
import { FilePdf, FileSpreadsheet, PencilSquare, PrinterFill, Trash } from 'react-bootstrap-icons';
import DataTablePagination from './DataTablePagination';
import './DataTable.css';
import { useNavigate } from 'react-router-dom';
import ModalDelete from '../../../hooks/ModalDelete';
import { useTranslation } from 'react-i18next'
import FormatDate from '../../../views/tools/CommonFunctions';

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
     const navigate = useNavigate();
     const { t } = useTranslation();

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

     const drawControl = (item: T, child: any) => {
          if (validateIfFieldDate(item[child.props.field])) {
               return new Date(FormatDate(item[child.props.field])).toJSON().slice(0, 10).split('-').reverse().join('/')
          }

          if (child.props.type === 'image') {
               return <img src={item[child.props.field]} alt={item[child.props.field]} width='50' height='50' />
          }

          if (child.props.type === 'boolean') {
               return (
                    <div className='w-100 d-flex justify-content-center'>
                         <Form.Check type="checkbox" disabled checked={item[child.props.field]} />
                    </div>
               )
          }

          return item[child.props.field]
     };


     return <div>
          <Card>
               <div className='container-fluid pt-2'>
                    {options.filters && options.filters.length > 0 && (
                         <div className='search-bar'>
                              <div>
                                   <input
                                        style={{ width: "500px" }}
                                        className='form-control mb-2'
                                        placeholder={t('Search')}
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

                    <Table className='table-striped bordered table-hover'>
                         <thead>
                              <tr key="1" className='align-middle'>
                                   {
                                        React.Children.map(children, child =>
                                             child && React.isValidElement(child) ? (
                                                  <th className={`${child?.props?.visibility === false ? 'hiddenColumn' : ''} ${child?.props?.isHeaderCentered === true ? 'text-center' : ''}`}>
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
                                                                 <td className={`${child?.props?.visibility === false ? 'hiddenColumn' : ''} ${child?.props?.isFieldCentered === true ? 'text-center' : ''}`}>
                                                                      {drawControl(item, child)}
                                                                 </td>
                                                                 :
                                                                 null
                                                       )
                                                  })
                                             }
                                             <td>
                                                  <div className='table-row-icons'>
                                                       <PencilSquare size={20} onClick={() => navigate(`${options.urlEdit}${item[options.dataKey]}`, { state: item })} />
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
          <ModalDelete show={show} headerContent={options.modalHeaderText || t('DeleteQuestion')} handleClose={handleClose} handleDelete={() => options.handleDelete(idToDelete)} />
     </div>
};

export default DataTable