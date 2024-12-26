import { IFormattedData } from "../../../interfaces/IHeaderData";

const CustomHeaderTable = <T,>(props: { headerData: T[]; }) => {
     const data = Array.from(props.headerData as IFormattedData[])
     return (
          <tr>
               {
                    data.map((col: IFormattedData, index) => {
                         if (index === 0) {
                              return Object.keys(col).map((key, cellIndex) => {
                                   const cell = col[key as keyof IFormattedData];
                                   if (cell.value === 'Buttons') {
                                        return (
                                             <th key={cellIndex}>Acciones</th>
                                        )
                                   }
                                   else {
                                        return (
                                             <th key={cellIndex} className={cell.visible ? '' : 'hiddenColumn'} >
                                                  {cell.label}
                                             </th>
                                        );
                                   }
                              });
                         }
                    })
               }
          </tr>
     );
};

export default CustomHeaderTable;
