import React, {createContext, MutableRefObject, useEffect, useState} from 'react'
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    TableState,
    useReactTable,
} from '@tanstack/react-table'
import {Table} from "@tanstack/table-core/src/types";

export interface ITableContext<T> {
    table: Table<T>,
    state: TableState,
    show:boolean
}

export const TableContext = createContext<ITableContext<any>>({table: {} as any, state: {} as any,show:true});

function TableResponse<T>({columns, data, reference, children}: React.PropsWithChildren<{
    reference: MutableRefObject<ITableContext<T>>,
    columns: ColumnDef<T>[],
    data: T[]
}>) {
    const [defaultColumns] = React.useState<ColumnDef<T>[]>(() => [
        ...columns,
    ]);
    // Xây dựng state
    const [columnVisibility, setColumnVisibility] = React.useState({})
    const [show,setShow] = useState(false);
    // Tạo bảng và thiết lập các khởi tạo ban đầu
    const table = useReactTable({
        data,
        state: {columnVisibility},
        columns: defaultColumns,
        onColumnVisibilityChange: setColumnVisibility,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    }) as Table<any>;

    // Đọc trạng thái riêng
    const [state, setState] = React.useState(table.initialState);

    // Ghi đè các quản lý,cấu trúc trạng thái của bảng
    table.setOptions(prev => ({
        ...prev,
        // state,
        // onStateChange: setState,
        debugTable: state.pagination.pageIndex > 2,
    }));

    useEffect(() => {
        reference.current = {...reference.current,table, state,};
        setShow(reference.current.show);
    }, [state]);

    return (
        <TableContext.Provider value={{table, state,show}}>
            <div id={"table-container"}>
                {show &&
                    <React.Fragment>
                        <table className={"w-full"}>
                            <thead className={""}>
                            {table.getHeaderGroups().map(headerGroup => (
                                <tr key={headerGroup.id}>
                                    {headerGroup.headers.map(header => (
                                        <th key={header.id} colSpan={header.colSpan} style={{width:header.getSize()}} className={'text-base'}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </th>
                                    ))}
                                </tr>
                            ))}
                            </thead>
                            <tbody>
                            {table.getRowModel().rows.map(row => (
                                <tr key={row.id}>
                                    {row.getVisibleCells().map(cell => {
                                        return (
                                            <td key={cell.id}>
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </td>
                                        )
                                    })}
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        {children}
                    </React.Fragment>
                }
            </div>
        </TableContext.Provider>
    )
}

export default React.memo(TableResponse) as typeof TableResponse;
