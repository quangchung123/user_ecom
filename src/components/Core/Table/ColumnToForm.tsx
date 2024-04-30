import React from 'react';
import {Columns, IReactWithChildren} from "@/types";
import {InputField} from "@/components/Core/Field/InputField";
import UploadFile from "@/components/Core/Field/UploadFile";

const ColumnToForm:IReactWithChildren<{columns:Columns}> = ({columns},context) => {
    return (
        <React.Fragment>
            {columns.map((item,index)=>{
                if(item?.ignore){
                    return null;
                }
                if(item.input && item.input.type ==='file'){
                    return  <UploadFile
                        key={index}
                        name={item.name}
                        label={item.title}
                        accept="image/*"
                        {...item?.input}
                    />
                }
                return (
                    <InputField
                        key={index}
                        label={item.title}
                        placeholder={item.title}
                        name={item.name}
                        {...item?.input}
                    />
                )
            })}
        </React.Fragment>
    );
};

export default ColumnToForm;
