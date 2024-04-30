import React from 'react';
import Select from "react-select";
// @ts-ignore
import {PublicBaseSelectProps} from "react-select/dist/declarations/src/Select";
import {OptionProps} from "react-select/dist/declarations/src/components/Option";
import {IReactWithChildren} from "@/types";

export const Option = (props: Partial<OptionProps<any, any, any>>) => {
    const {cx, getStyles,children, innerProps, innerRef, isDisabled, isFocused, isSelected,data} = props;
    return (
        <div
            ref={innerRef}
            // @ts-ignore
            className={`${isFocused ? 'bg-red-200' : ""} ${isSelected ? "bg-blue-200" : ""} h-9 px-2`}
            {...innerProps}
        >
            <div className={"flex items-center h-full"}>
                {children}
            </div>
        </div>
    )
};

const SelectItem: IReactWithChildren<Partial<PublicBaseSelectProps<any, any, any>>> = ({children, ...props}) => {
    const {options} = props;
    return (
        <Select
            styles={{
                control: (state:any) => ({
                    ...state,
                    border: '1px solid #e5e7eb',
                    boxShadow: 'none',
                    '&:hover': {
                        border: '1px solid #e5e7eb',
                    }
                }),

            }}
            {...props}
            // @ts-ignore
            components={{IndicatorSeparator: () => null,Option, ...props.components}}
        />
    );
};

export default SelectItem;
