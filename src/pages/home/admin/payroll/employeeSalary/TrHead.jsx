import React from "react";
import {faSortAmountDownAlt} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const TrHead = (pros)=>{
    const handleClick = ()=>{
        pros.onChanged(pros.name);
    }
    return(
    <th className="rowHeader">
        <FontAwesomeIcon className="fontIcon headerIcon" onClick={handleClick}
        icon={faSortAmountDownAlt} style={{color:pros.name===pros.tag?"white":"grey"}}/>
        <label className="headerLabel">{pros.name}</label>
    </th>
    );
}

export default TrHead;