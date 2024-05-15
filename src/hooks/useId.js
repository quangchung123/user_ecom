import {useSelector} from "react-redux";
import {LOCAL_STORAGE_KEY} from "../config/constant";
import {handleLoadDataFromStorage} from "../utils/help";

export const useId = () => {
	// handle get id's Customer
	const customerIdStoreRedux = useSelector((state) => state.userAccount.user.customerId);
	if (customerIdStoreRedux) {
		return customerIdStoreRedux;
	}
	const storedUser = handleLoadDataFromStorage(LOCAL_STORAGE_KEY.PERSIST_STORE)?.userAccount;
	if (storedUser) {
		const parsedPersistedData = JSON.parse(storedUser);
		return parsedPersistedData.user.customerId;
	}
	return null;
}