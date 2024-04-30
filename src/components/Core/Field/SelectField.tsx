import * as React from "react";
import {HTMLProps, useMemo} from "react";
import {Controller, useController} from "react-hook-form";
import useFormService from "@/hooks/useFormService";
import {ControllerRenderProps} from "react-hook-form/dist/types/controller";
import {PublicBaseSelectProps} from "react-select/dist/declarations/src/Select";
import SelectItem from "@/components/Core/Field/SelectItem";
import styles from '@/components/Form/Form.module.scss';

export type InputFieldProps = HTMLProps<HTMLInputElement> & {
    className?: string | any;
    label?: string;
    callBack?: (e: any, field: ControllerRenderProps<any, any>) => void;
    selectedField: string;
    name: string;
};

export function SelectField({
                                name,
                                label,
                                callBack,
                                className = "",
                                selectedField,
                                ...rest
                            }: InputFieldProps & Partial<PublicBaseSelectProps<any, any, any>>) {
    const {control, trigger} = useFormService();
    const {
        fieldState: {error},
    } = useController({name, control});
    const {values} = useFormService();

    const onChange = async (e: any, field: ControllerRenderProps<any, any>) => {
        field.onChange(selectedField ? e[selectedField] : e);
        if (callBack) {
            callBack(e, field)
        }
        ;
        trigger(name);
    };

    const updateValue = useMemo(() => {
        return rest.options!.find((item: any) => {
            return item.id === values[name];
        }) || rest.options![0];
    }, [values]);

    return (
        <div>
            <div className={className}>
                {label &&
                    <label htmlFor={name} className="truncate block text-sm font-medium leading-6 text-gray-900">
                        {label}
                    </label>
                }
                <Controller
                    control={control}
                    name={name}
                    render={({field}) => (
                        <SelectItem
                            {...field}
                            className={styles["select-field"]}
                            id={name}
                            value={updateValue}
                            placeholder={label}
                            onChange={(e: any) => onChange(e, field)}
                            {...rest}
                        >
                        </SelectItem>
                    )}
                />
            </div>
            <div>
                {error && <p role="alert" className={"mt-2 text-red-400"}>{error?.message}</p>}
            </div>
        </div>
    );
}
