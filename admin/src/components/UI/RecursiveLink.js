import React from "react";
import { NavLink } from "react-router-dom";
import _uniqueId from "lodash.uniqueid";

import Expand from "./Expand";

const RecursiveLink = ({ data, activeLink }) => {
    return (
        <>
            {data.map((s, i) => {
                return (
                    <React.Fragment key={_uniqueId('sub1prefix-')}>
                        {s.subLinks && 
                            <Expand onClick={activeLink} title={s.title}>
                                {s.subLinks && <RecursiveLink data={s.subLinks} />}
                            </Expand>
                        }
                        {!s.subLinks && 
                            <NavLink onClick={activeLink} id={i + 'sub'} className={`link ${s.active ? "activeL" : ""}`} to={s.to}>
                                {s.title}
                            </NavLink>
                        }
                    </React.Fragment>
                );
            })}
        </>
    );
};

export default RecursiveLink;