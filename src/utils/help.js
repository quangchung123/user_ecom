import {useSelector} from "react-redux";
import {LABEL_SORT, LOCAL_STORAGE_KEY} from "../config/constant";
import Swal from "sweetalert2";
const {NAME_A_TO_Z, NAME_Z_TO_A, PRICE_MAX_TO_MIN, PRICE_MIN_TO_MAX} = LABEL_SORT;

export const handleSaveDataToStorage = (key, value) => {
    //handle save data to localStorage
    try {
        const convertState = JSON.stringify(value);
        localStorage.setItem(key, convertState);
    } catch (err) {
        console.log('error', err);
    }
}

export const handleLoadDataFromStorage = (key) => {
    //handle get data from localStorage
    try {
        const dataStore = localStorage.getItem(key);
        if(dataStore === null) {
            return undefined;
        }
        return JSON.parse(dataStore);
    } catch (err) {
        console.log('error', err)
    }
}

export const getDataOnPage = (currentPage, dataTable, recordsPerPage) => {
    //handle show list data on each Page
    const firstIndex = (currentPage - 1) * recordsPerPage;
    const lastIndex = firstIndex + recordsPerPage;
    return dataTable?.slice(firstIndex, lastIndex);
}

export const convertToVietnameseDong = (amount) => {
    //handle convert to viet nam dong
    const parsedAmount  = parseFloat(amount)
    if (!isNaN(amount)) {
        const formattedAmount = parsedAmount .toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
        return formattedAmount;
    } else {
        return '--';
    }
}

export const getCurrentDateTime = () => {
    //handle get current time with format exp : "2024-04-25 21:20"
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const date = String(currentDate.getDate()).padStart(2, '0');
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${date} ${hours}:${minutes}`;

    return formattedDate;
}

export const getNameAddressByCode = (code, address) => {
    //handle get name city or district by code
    const addressFind = address.find(item => item.code === code);
    return addressFind ? addressFind.name : "";
}

export const getDataInPersistStore = (dataSelectorState, key) => {
    if (dataSelectorState) {
        return dataSelectorState;
    }
    const dataStored = handleLoadDataFromStorage(LOCAL_STORAGE_KEY.PERSIST_STORE);
    if (dataStored && dataStored[key]) {
        return JSON.parse(dataStored[key]);
    }
    return null;
}

export const notify = (message) => {
    // handle notify message utils
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    });
    Toast.fire({
        icon: "success",
        title: message
    });
}

export const notifyConfirm = (message) => {
    // handle notify message primary
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

export const sortProductsByName = (data, sortOrder) => {
    const sortedProducts = [...data].sort((a, b) => {
        let nameA = a.name.toUpperCase();
        let nameB = b.name.toUpperCase();
        // return -1 , 1, 0 before, after and equal
        if (sortOrder === NAME_A_TO_Z) {
            return nameA.localeCompare(nameB);
        } else if (sortOrder === NAME_Z_TO_A) {
            return nameB.localeCompare(nameA);
        }
        return 0;
    });
    return sortedProducts;
};

export const sortProductsByPrice = (data, sortOrder) => {
    const sortedProducts = [...data]?.sort((a, b) => {
        if (sortOrder === PRICE_MIN_TO_MAX) {
            return parseFloat(a.price) - parseFloat(b.price);
        } else {
            return parseFloat(b.price) - parseFloat(a.price);
        }
    });
    return sortedProducts;
};
