import React, {useState} from 'react';
import {
    PagingState,
    SelectionState,
    Table as TableBase,
    TableHeaderRow as TableHeaderRowBase,
} from '@devexpress/dx-react-grid';
import {Grid, PagingPanel, Table, TableHeaderRow,} from '@devexpress/dx-react-grid-bootstrap4';
import {Column, ICurrentPopupProps, IReactWithChildren} from "@/types";
import get from "lodash.get";
import ImagePlacerHolder from "@/components/UI/ImagePlacerHolder";
// @ts-ignore
const Cell: React.ComponentType<TableBase.DataCellProps & { column: Column & { ref: { current: ICurrentPopupProps }, setSelection, remove } }> = ({value, style, column, row, ...restProps}) => {
    return (
        // @ts-ignore
        <Table.Cell
            {...restProps}
            className={`border border-t-0 border-l-0 border-b-0`}
        >
            {column.name === 'action' ? <div className={"flex space-x-1"}>
                {column?.renderCell ? column?.renderCell(row) : value}
            </div> : column?.input?.type === 'file' ?
                <ImagePlacerHolder value={value} className={"image-table"}/>
                : (column?.renderCell ? column?.renderCell(row) : value)}
        </Table.Cell>
    )
};

const Header: React.ComponentType<TableHeaderRowBase.CellProps> = ({column, children, ...restProps}) => {
    return (
        <TableHeaderRow.Cell
            column={column}
            className={`border border-t-0 border-l-0 border-b-0 ${column.name === 'action' ? "w-[100px]" : get(column, 'className')}`}
            {...restProps}
        >
            {column.name !== 'action' ? children : column?.title}
        </TableHeaderRow.Cell>
    )
};

const TableCore: IReactWithChildren<{
    children: any
    columns: Array<any>,
    rows: Array<any>,
    isLoading?: boolean,
    remove?: (current: ICurrentPopupProps) => void
}> = ({
          columns = [], rows = [], remove = () => {
    }, children, isLoading = false
      }, context) => {
    const [selection, setSelection] = useState<any>({});
    const [currentPage, setCurrentPage] = useState(0);

    return (
        <div className="card" style={{position: 'relative'}}>
            {children}
            <Grid
                rows={rows}
                columns={columns}
            >
                <SelectionState
                    selection={selection}
                    onSelectionChange={setSelection}
                />
                {/*// @ts-ignore*/}
                <Table cellComponent={Cell}/>
                <TableHeaderRow cellComponent={Header}/>
                {/*<PagingPanel/>*/}
                {/*<PagingState*/}
                {/*    defaultCurrentPage={0}*/}
                {/*    currentPage={currentPage}*/}
                {/*    onCurrentPageChange={setCurrentPage}*/}
                {/*    pageSize={10}*/}
                {/*/>*/}
            </Grid>
        </div>
    );
};

export default TableCore;
