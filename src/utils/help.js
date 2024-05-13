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
        return 'Số không hợp lệ';
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