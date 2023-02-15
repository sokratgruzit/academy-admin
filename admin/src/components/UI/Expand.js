import { useState } from "react";

import styles from "../../assets/css/expand/Expand.module.scss";

function Expand(props) {
    const [showExpand, setShowExpand] = useState(false);

      const onExpand = () => {
      setShowExpand(!showExpand);
   }
    return (
        <div className={styles.expand} style={{maxHeight: !showExpand ? "39px" : "157px"}} >
            <h2 className={`${styles.title} link ${showExpand ? "activLink" : ""}`} onClick={onExpand} >
                {props.title}
                <div className={styles.triangle} style={{transform: `rotate(${showExpand ? "180deg" : "0"})`}} />
            </h2>
            {props.children}
        </div>
    );
}

export default Expand;