import {useDispatch} from "react-redux";
import {useFormContext} from "react-hook-form";
import get from "lodash.get";
import Swal from 'sweetalert2'
const useApiService = () => {
    const dispatch = useDispatch();
    const {handleSubmit, formState: {isSubmitting}} = useFormContext();
    const callApi: (callFunction: any) => Promise<{
        data: any;
        status: boolean,
        notify: () => void,
        validate: any,
    }> = async (callFunction: () => any) => {
        const action = callFunction();
        const payload = await dispatch(action);
        if (get(payload, 'data.validate')) {
            return {
                status: payload.data?.success,
                data: payload?.validate,
                notify: () => {
                    Swal.fire({
                        title: 'Lỗi!',
                        text: get(payload, 'data.message') || "Lỗi máy chủ",
                        confirmButtonText: 'Đóng',
                        customClass: {
                            popup: 'text-xs',
                        },
                        position: 'top',
                    })
                },
                validate: get(payload, 'data.validate')
            };
        }
        return {
            status: payload.data?.success,
            data: payload.data?.data,
            notify: () => {
                if (get(payload, 'data.message')) {
                    Swal.fire({
                        title: 'Thông báo!',
                        text: get(payload, 'data.message'),
                        confirmButtonText: 'Đóng',
                        customClass: {
                            popup: 'text-xs',
                        },
                        position: 'top',
                    })
                }
            },
            validate: null
        };
    }
    return {
        callApi,
        handleSubmit,
        isSubmitting,
        dispatch
    }
};

export default useApiService;
