import {MutableRefObject, useEffect, useRef} from 'react';
import {ITableContext} from "@/components/Core/Table/TableResponse";
import useGetBreakPoint from "@/hooks/useGetBreakPoint";
import {breakpoints} from "@/config/constant";

function UseApiTable<T>(options?: Partial<Record<keyof T, keyof typeof breakpoints>>) {
    const ref = useRef<ITableContext<T>>() as MutableRefObject<ITableContext<T>>;
    const breakPoint = useGetBreakPoint();

    useEffect(() => {
        if (Boolean(ref.current.table) && options) {
            let visible: Record<string, boolean> = {};
            for (const c in options) {
                const a = options[c] as keyof typeof breakpoints;
                const key = `is${a[0].toUpperCase() + a.substring(1)}` as keyof typeof breakPoint;
                visible[c] = breakPoint[key];
            }
            ref.current.table.setColumnVisibility(visible);
            ref.current.show =true;
        }
    }, [breakPoint]);

    return ref;
}

export default UseApiTable;
