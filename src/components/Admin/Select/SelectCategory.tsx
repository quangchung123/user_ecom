import React, {useEffect, useMemo, useState} from 'react';
import {ControllerRenderProps} from "react-hook-form/dist/types/controller";
import useFormService from "@/hooks/useFormService";
import {SelectField} from "@/components/Core/Field/SelectField";
import {IReactWithChildren} from "@/types";
import db from "@/services/firebase/db";

const SelectCategory: IReactWithChildren<{}> = ({}) => {
    const {values, setValue} = useFormService();
    const [data, setData] = useState([]);
    const options: any = useMemo(() => {
        return (data || []).map((item: any) => ({
            ...item,
            label: item.title,
            value: item.id
        }))
    }, [data])

    useEffect(() => {
        db.listen("/category", "value", async (snap: any) => {
            if (snap.val() !== null) {
                setData(Object.values(snap.val()));
            }
        })
    }, [])

    return (
        <SelectField
            name={"category_id"}
            selectedField={"id"}
            options={options}
            label={"Mục sinh thái"}
            placeholder={"Mục sinh thái"}
        >
        </SelectField>
    );
};

export default SelectCategory;
