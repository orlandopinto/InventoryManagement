import { Link } from "react-router-dom";
import { IFormattedData } from "../../../interfaces/IHeaderData";
import './styles.css'
import { PencilSquare, Trash } from "react-bootstrap-icons";
import { useState } from "react";
import ModalDelete from "../../../hooks/ModalDelete";

const uniqueKey = (pre: string) => {
     return `${pre}_${new Date().getTime()}`;
};

const CustomTableRow = <T,>(props: { rowData: T[], emptyMessage: string, dataKey: string, urlAddEdit: string, handleDelete: (idToDelete: string) => void }) => {
     const data = Array.from(props.rowData as IFormattedData[]);
     const [show, setShow] = useState(false);
     const [idToDelete, setIdToDelete] = useState('')

     let ID = '';
     const handleClose = () => setShow(false);

     const handleShow = (id: string) => {
          setShow(true);
          setIdToDelete(id);
     }
     return (
          <>
               <tr>
                    {data.find(f => f.value !== '')[0].value !== '' ? (
                         data.map((col: IFormattedData, index) => (
                              Object.keys(col).map((key, cellIndex: number) => {
                                   const cell = col[key as keyof IFormattedData];
                                   if (cell.field === props.dataKey) {
                                        ID = cell.value;
                                   }
                                   if (cell.value === 'Buttons') {
                                        return (
                                             <td key={cellIndex} style={{ width: 100 }} >
                                                  <div className='table-row-icons'>
                                                       <Link to={`${props.urlAddEdit}${ID}`}><PencilSquare className='table-row-icon' size={20}></PencilSquare></Link>
                                                       <Trash size={20} onClick={() => { handleShow(ID) }}></Trash>
                                                  </div>
                                             </td>
                                        )
                                   }
                                   else {
                                        return (
                                             <td key={uniqueKey(`${cell.value}-${cellIndex}`)} className={cell.visible ? '' : 'hiddenColumn'}>
                                                  {cell.value}
                                             </td>
                                        );
                                   }
                              })
                         ))
                    ) :
                         <td colSpan={data[0].length}>
                              {props.emptyMessage}
                         </td>
                    }

               </tr >
               <ModalDelete show={show} headerContent="¿Realmente quiere eliminar la categoría?" handleClose={handleClose} handleDelete={() => props.handleDelete(idToDelete)} />
          </>

     );
};

export default CustomTableRow;
