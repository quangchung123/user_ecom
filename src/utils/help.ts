import db from "@/services/firebase/db";
import Swal from "sweetalert2";
import {EActions, EPopup, EStatusShop} from "@/types/enum";
import popupSlice from "@/services/storage/popupSlice";

export function generateRandomString(length: number) {
    let result = "";
    const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += String.fromCharCode(characters.charCodeAt(randomIndex));
    }

    return result;
}

export const cloneObject = (value: any) => Object.assign({}, value)

export function convertToSlug(text: string) {
    return text.toLowerCase()
        .replace(/[^\w\s]/gi, '') // Loại bỏ các ký tự không phải chữ hoặc số hoặc khoảng trắng
        .replace(/\s+/g, '-') // Thay thế khoảng trắng bằng dấu gạch ngang
        .trim(); // Loại bỏ khoảng trắng ở đầu và cuối chuỗi
}

export const notify = (message?: string) => {
    Swal.fire({
        title: 'Thông báo!',
        text: message || "",
        confirmButtonText: 'Đóng',
        customClass: {
            popup: 'text-xs',
        },
        position: 'center',
    })
}

export const notifyConfirm =async  (title: string, action: any) => {
    Swal.fire({
        title: title,
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: "Đồng ý",
        denyButtonText: `Đóng`
    }).then(async (result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            await action()
        }
    });
}

export const  convertToVietnameseDong = (amount: any) => {
    if (!isNaN(amount)) {
        // Sử dụng hàm toLocaleString để định dạng số thành đơn vị tiền tệ Việt Nam đồng
        const formattedAmount = amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
        return formattedAmount;
    } else {
        return 'Số không hợp lệ';
    }
}
export const handleModal = async ( action: any, idStatus: number, statusPayment: any) => {
    Swal.fire({
        title: "Xác nhận",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Đồng ý",
        cancelButtonText: "Hủy",
    }).then(async (result) => {
        if (result.isConfirmed) {
            try {
                const data= await action({id: idStatus,status:statusPayment}).unwrap()
                Swal.fire({
                    title: "Thành công",
                    icon: "success",
                    customClass: {
                        popup: 'custom-popup-class',
                        confirmButton: 'custom-confirm-class'
                    }
                });
            } catch (error) {
                Swal.fire({
                    title: "Error!",
                    text: "There was an error deleting your file.",
                    icon: "error",
                });
            }
        }
    });
};

export function handleCheckPayload(tabId: number) : string  {
    let result : string = '';
    switch (tabId) {
        case 1:
            result = EStatusShop.Wait;
            break;
        case 2:
            result =  EStatusShop.Approve;
            break;
        case 3:
            result = EStatusShop.Reject;
            break;
    }
    return result;
}

export function handleSelectedData(callback: any, e: any, idItem: number, dispatch: any, dataSetPopup: string) {
    if(e.value === EActions.Detail || e.value == null) {
        dispatch(popupSlice.actions.popup({
            popupId: [dataSetPopup],
            data: idItem,
        }))
    } else if(e.value == EActions.Accept) {
        handleModal(callback, idItem, "APPROVE");
    }   else if(e.value == EActions.Reject) {
        handleModal(callback, idItem, "REJECT");
    }
}