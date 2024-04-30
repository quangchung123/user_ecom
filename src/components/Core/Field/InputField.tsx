import * as React from "react";
import {HTMLProps} from "react";
import {Controller, useController} from "react-hook-form";
import {ControllerRenderProps} from "react-hook-form/dist/types/controller";
import useFormService from "@/hooks/useFormService";
export type InputFieldProps = Omit<HTMLProps<HTMLInputElement>, 'label'> & {
    className?: string | any;
    label?: any;
    id?: string;
    callBack?: any;
    name: string;
};

export function InputField({name, label,className, callBack,children, ...rest}: InputFieldProps) {
    const {control, setValue, trigger} = useFormService();
    const {
        fieldState: {error},
    } = useController({name, control});
    const onChange = async (e: any, field: ControllerRenderProps<any, any>) => {
        let args: any = {
            field,
            event: e,
        }
        if (e.target.type === "file") {
            field.onChange('loading');
        } else {
            if (e.target.type === "checkbox") {
                field.onChange(Boolean(e.target.checked));
            } else {
                field.onChange(e.target.value);
            }
        }
        trigger(name);
        if (callBack) {
            await callBack(args);
        }
    };
    return (
        <div >
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
                        <>
                            <input
                                {...field}
                                id={name}
                                value={rest.type == "file" ? "" : field.value}
                                onChange={(e) => onChange(e, field)}
                                placeholder={label || rest.placeholder}
                                {...rest}
                            />
                        </>
                    )}
                />
                {children}
            </div>
            <div>
                {error && <p role="alert" className={"mt-2 text-red-400"}>{error?.message}</p>}
            </div>
        </div>
    );
}
