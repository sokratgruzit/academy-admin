import { NavLink } from "react-router-dom";
import _uniqueId from "lodash.uniqueid";

import Expand from "./Expand";

const RecursiveLink = ({ data, activeLink }) => {
    return (
        <>
            {data.map((s, i) => {
                return (
                    <>
                        {s.subLinks && 
                            <Expand onClick={activeLink} title={s.title} key={_uniqueId('sub1prefix-')}>
                                {s.subLinks && <RecursiveLink data={s.subLinks} />}
                            </Expand>
                        }
                        {!s.subLinks && 
                            <NavLink onClick={activeLink} key={_uniqueId('sub2prefix-')} id={i + 'sub'} className={`link ${s.active ? "activeL" : ""}`} to={s.to}>
                                {s.title}
                            </NavLink>
                        }
                    </>
                );
            })}
        </>
    );
};

export default RecursiveLink;