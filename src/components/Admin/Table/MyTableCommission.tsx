import React, {useEffect, useMemo, useState, useCallback} from 'react';
import {ColumnDef} from '@tanstack/react-table';
import TableResponse from '@/components/Core/Table/TableResponse';
import useApiTable from '@/hooks/useApiTable';
import {useDispatch} from 'react-redux';
// @ts-ignore
import ResponsivePagination from 'react-responsive-pagination';
import get from "lodash.get";
import {useGetInfoCommissionQuery,
} from "@/services/api/adminApi";
import ItemPayment from "@/components/Admin/Popup/Item/ItemPayment";
import MyPopup from "@/components/Admin/Popup/MyPopup";
import popupSlice from "@/services/storage/popupSlice";
import {EPopup} from "@/types/enum";
import ItemCommission from "@/components/Admin/Popup/Item/ItemCommission";
import {schemaLogin} from "@/config/validate";
import BoxForm from "@/components/Core/BoxForm";

type ICommission = {
    level: string;
    name: string;
    percent: number;
};

function App() {
    const {data} = useGetInfoCommissionQuery({});
    const dispatch = useDispatch();
    const dataPayment = useMemo(() => get(data, 'data.data') || [], [data]);

    const ref = useApiTable<ICommission>({
        level: 'md',
        name: 'xs',
        percent: 'xl',
    });


    const defaultColumns: ColumnDef<ICommission>[] = [
        {
            accessorKey: 'level',
            header: () => <span>Cấp độ</span>,
            cell: (info) => info.getValue(),
        },
        {
            // accessorFn: (row) => row.name,
            accessorKey: 'name',
            cell: (info) => info.getValue(),
            header: () => <span>mô tả cấp độ</span>,
        },

        {
            accessorKey: 'percent',
            cell: (info) => info.getValue(),
            header: () => <span>Phần trăm hoa hồng</span>,
        },
        {
            accessorKey: 'action',
            header: '',
            size: 50,
            cell: (info) => {

                const handleGetItem = ((e: any) => {
                    dispatch(popupSlice.actions.popup({
                        popupId: [EPopup.Commission],
                        data: {
                            id: info.row.original.id,
                            dataRow: info.row.original
                        },
                    }))
                });
                return (
                        <button onClick={handleGetItem}>
                            <i className="bi bi-pencil-square"></i>
                        </button>
                );
            }
        }
    ]
    const [currentPage, setCurrentPage] = useState(1);

    const handleChangePage = (page: any) => {
        setCurrentPage(page);
        if (ref.current) {
            ref.current.table.setPageIndex(page - 1);
        }
    };

    return (
        <div className="p-2">
            <MyPopup popupId={"Commission"}>
                <BoxForm>
                    <ItemCommission />
                </BoxForm>
            </MyPopup>
            <TableResponse<ICommission> reference={ref} columns={defaultColumns} data={dataPayment}>
                <ResponsivePagination
                    className={'pagination justify-content-end my-5 space-x-1.5'}
                    total={100}
                    current={currentPage}
                    onPageChange={handleChangePage}
                    maxWidth={320}
                />
            </TableResponse>
        </div>
    );
}

export default function MyTableCommission() {
    return <App/>;
}
