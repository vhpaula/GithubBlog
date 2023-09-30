import { ReactNode } from "react";

interface ProfileStatisticProps {
    statistc: string;
    children: ReactNode;
}

export function ProfileStatistic({ statistc, children } : ProfileStatisticProps) {
    return(
        <li> {children} {statistc} </li>
    )
}