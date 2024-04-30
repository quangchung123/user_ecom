import { useMediaQuery } from 'react-responsive';
import {breakpoints} from "@/config/constant";

type BreakpointKey = keyof typeof breakpoints;

export default function useGetBreakPoint<K extends BreakpointKey>() {
    const isXs = useMediaQuery({ minWidth: breakpoints.xs });
    const isSm = useMediaQuery({ minWidth: breakpoints.sm });
    const isMd = useMediaQuery({ minWidth: breakpoints.md });
    const isLg = useMediaQuery({ minWidth: breakpoints.lg});
    const isXl = useMediaQuery({ minWidth: breakpoints.xl });
    return {
        isSm,
        isMd,
        isLg,
        isXl,
        isXs
    }
}
