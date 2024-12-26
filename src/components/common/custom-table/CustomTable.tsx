import CustomTableRow from "./CustomTableRow";
import CustomHeaderTable from "./CustomHeaderTable";
import { Card, Form, Table } from "react-bootstrap";
import { IFormattedData } from "../../../interfaces/IHeaderData";
import { FilePdf, FileSpreadsheet, PrinterFill } from "react-bootstrap-icons";
import { useState } from "react";
import CustomPagination from "../CustomPagination";

const uniqueKey = (pre: number) => {
     return `${pre}_${new Date().getTime()}`;
};

interface IFilterableData extends IFormattedData {
     [x: string]: any;
     filters: { field: string }[];
}

const CustomTable = <T extends IFilterableData>(props: { datos: T[], urlAddEdit: string, dataKey: string, filters: string[], handleDelete: (idToDelete: string) => void, rowPerPage: number, rowsPerPageOptions: number[], emptyMessage: string, showPerPageMessage: string }) => {
     const [searchFilter, setSearchFilter] = useState('');
     const [pageSize, setPageSize] = useState<number>(Number(props.rowPerPage))
     const [currentPage, setCurrentPage] = useState(1);

     const handleFilter = async (e: React.ChangeEvent<HTMLInputElement>) => {
          e.preventDefault();
          setSearchFilter(e.target.value);
     };

     const filteredData = props.datos.filter(k => k.some((e: { field: string, value: string }) => props.filters.includes(e.field) && e.value.toLowerCase().includes(searchFilter)));

     const paginatedData = filteredData.slice(
          (currentPage - 1) * pageSize,
          currentPage * pageSize
     );

     const tableHead = () => {
          return <CustomHeaderTable headerData={paginatedData} />
     }

     const tableBody = paginatedData.map((row, index) => {
          return <CustomTableRow key={uniqueKey(index)} rowData={[row]} emptyMessage={props.emptyMessage} dataKey={props.dataKey} urlAddEdit={props.urlAddEdit} handleDelete={props.handleDelete} />
     });

     const handleOnchangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
          const _target = e.target as HTMLSelectElement;
          const pageSize = Number(_target.value);
          setPageSize(pageSize)
     }

     return (
          <>
               <Card>
                    <div className='container-fluid pt-2'>
                         <div className='search-bar'>
                              <div>
                                   <input
                                        style={{ width: "200px" }}
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
                         <Table>
                              <thead>
                                   {tableHead()}
                              </thead>
                              <tbody>
                                   {tableBody}
                              </tbody>
                         </Table>
                         <div className='pagination-footer'>
                              <div className='show-per-page'>
                                   <div>{props.showPerPageMessage}:</div>
                                   <div>
                                        <Form.Select size="sm" value={pageSize} onChange={handleOnchangeSelect}>
                                             {props.rowsPerPageOptions.map((option, index) => (
                                                  <option key={index} value={option}>{option}</option>
                                             ))}
                                        </Form.Select>
                                   </div>
                              </div>
                              <div >
                                   {filteredData.length > 0 &&
                                        <CustomPagination
                                             itemsCount={filteredData.length}
                                             itemsPerPage={pageSize}
                                             currentPage={currentPage}
                                             setCurrentPage={setCurrentPage}
                                             alwaysShown={true}
                                        />
                                   }
                              </div>

                         </div>
                    </div>
               </Card>
          </>
     );
};

export default CustomTable;
