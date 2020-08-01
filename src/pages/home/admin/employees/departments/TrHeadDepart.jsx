import React from "react";
import "./department.scss";
import {faSortAmountDownAlt} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const TrHead = (pros)=>{
    return(
        <th className="rowHeader">
            <FontAwesomeIcon className="headerIcon" onClick={()=>{
                if(pros.name !== "Action"){
                    pros.onChanged(pros.name)
                }
            }}
            icon={faSortAmountDownAlt} style={{color:pros.name===pros.tag?"white":"grey"}}/>
            <label>{pros.name}</label>
        </th>
    );
}
export default TrHead;