import React, { useState, useEffect } from "react";
import styles from "../styles/Select.module.css";

import Menu from "./Menu";

const Select = (props) => {
    const [anchor, setAnchor] = useState(undefined);
    const [search, setSearch] = useState("test");
    const [options, setOptions] = useState([]);

    return (
        <div>
            {props.searchable ? (
                <input
                    placeholder={props.value}
                    onClick={(e) => setAnchor(e.target)}
                />
            ) : (
                <button onClick={(e) => setAnchor(e.target)}>
                    {props.value}
                </button>
            )}
            <Menu anchor={anchor}>
                <select>{props.children}</select>
            </Menu>
        </div>
    );
};

export default Select;
