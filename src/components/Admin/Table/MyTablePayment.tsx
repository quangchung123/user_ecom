import React, {useEffect, useMemo, useState, useCallback} from 'react';
import {ColumnDef} from '@tanstack/react-table';
import TableResponse from '@/components/Core/Table/TableResponse';
import useApiTable from '@/hooks/useApiTable';
import {useDispatch} from 'react-redux';
// @ts-ignore
import ResponsivePagination from 'react-responsive-pagination';
import ImagePlacerHolder from "@/components/UI/ImagePlacerHolder";
import get from "lodash.get";
import {useGetInfoPaymentQuery, useUpdateInfoPaymentMutation} from "@/services/api/adminApi";
import {EActions, EPayment, EPopup, EStatusPayment} from "@/types/enum";
import {useAppSelector} from "@/store";
import {convertToVietnameseDong, handleCheckPayload, handleModal, handleSelectedData} from "@/utils/help";
import popupSlice from "@/services/storage/popupSlice";
import ItemPayment from "@/components/Admin/Popup/Item/ItemPayment";
import MyPopup from "@/components/Admin/Popup/MyPopup";
import {IDataAction} from "@/types";
import MenuAction from "@/components/Core/Table/MenuAction";
import {actions} from "@/config/constant";

type PaymentShop = {
    avatar: string;
    name: string;
    amount: number;
    bank: {};
};

function App() {
    const dispatch = useDispatch();
    const selectIdTab = useAppSelector((state) => state.tab.tabId);
    useEffect(() => {
        dispatch(popupSlice.actions.popup([]))
    }, [selectIdTab]);
    const dataPayload = useMemo(() => handleCheckPayload(selectIdTab),[selectIdTab]);
    const {data, isSuccess} = useGetInfoPaymentQuery({status: dataPayload});
    const dataPayment = useMemo(() => get(data, 'data.data') || [], [data, isSuccess]);
    const [updateInfoPayment] = useUpdateInfoPaymentMutation();

    const ref = useApiTable<PaymentShop>({
        avatar: 'md',
        name: 'xs',
        bank: 'xl',
        amount: 'xl',
    });


    const defaultColumns: ColumnDef<PaymentShop>[] = [
        {
            accessorKey: 'user.avatar',
            id:"avatar",
            header: () => <span>Avatar</span>,
            cell: (info) => <ImagePlacerHolder value={`${info.getValue()}`} className={"image-table"}/>,
        },
        {
            // accessorFn: (row) => row.name,
            accessorKey: 'user.name',
            id: "name",
            cell: (info) => info.getValue(),
            header: () => <span>Chủ tài khoản</span>,
        },
        {
            accessorKey: 'user.bank',
            id: "bank",
            cell: (info) => `${info.getValue<any>().bank_account} ${info.getValue<any>().bank_name}`,
            header: () => <span>Thông tin ngân hàng</span>,
        },
        {
            accessorKey: 'amount',
            cell: (info) => convertToVietnameseDong(info.getValue()),
            header: () => 'Số tiền',
        },
        {
            accessorKey: 'id',
            header: '',
            size: 50,
            cell: (info) => {
                // eslint-disable-next-line react-hooks/rules-of-hooks
                const selectIdTab = useAppSelector((state) => state.tab.tabId);
                // eslint-disable-next-line react-hooks/rules-of-hooks
                const _actions = useMemo(() => actions.filter((action) => action.value === EActions.Detail), [selectIdTab]);
                const handleGetItem = ((e: any) => {
                    const idItem: number =  info.getValue();
                    const dataSetPopup = EPayment.Payment;
                    handleSelectedData(updateInfoPayment, e, idItem, dispatch, dataSetPopup);
                });
                return (
                    selectIdTab === 1 ? (
                        <MenuAction data={actions} onItemClick={handleGetItem} />
                    ) : (
                        <button onClick={handleGetItem}>
                            <i className="bi bi-info-circle"></i>
                        </button>
                    )
                );

            }
        }
    ]
    const [currentPage, setCurrentPage] = useState(1);

    const handleChangePage= (page: any) => {
        setCurrentPage(page);
        if (ref.current) {
            ref.current.table.setPageIndex(page - 1);
        }
    };

    return (
        <div className="p-2">
            <MyPopup popupId={"PAYMENT"}>
                <ItemPayment />
            </MyPopup>
            <TableResponse<PaymentShop> reference={ref} columns={defaultColumns} data={dataPayment}>
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

export default function MyTablePayment() {
    return <App/>;
}
