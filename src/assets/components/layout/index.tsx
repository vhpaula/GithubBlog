import { Outlet } from "react-router-dom";

import styles from "./layout.module.css";
import backgroudHeader from "../../images/backgroudHeader.svg";

export function Layout() {

    return (
        <>
        <img src={backgroudHeader} className={styles.backgroudHeader}/>
        <div className={styles.layout}>
            <Outlet />
        </div>
        </>
    )
    
}
  
  