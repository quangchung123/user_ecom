import { useMediaQuery } from 'react-responsive';
import {breakpoints} from "@/config/constant";

type BreakpointKey = keyof typeof breakpoints;

export default function useBreakPoint<K extends BreakpointKey>(breakpointKey: K) {
    const bool = useMediaQuery({
        query: `(min-width: ${breakpoints[breakpointKey as BreakpointKey]})`,
    });
    const capitalizedKey = breakpointKey[0].toUpperCase() + breakpointKey.substring(1);

    type Key = `is${Capitalize<K>}`;

    return {
        [`is${capitalizedKey}`]: bool,
    } as Record<Key, boolean>;
}
