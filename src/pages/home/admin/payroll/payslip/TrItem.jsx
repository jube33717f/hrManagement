import React from "react";

const TrItem = (pros) =>{
    return (
        <tbody>
            <td>{pros.num === 2?"":pros.num+1}</td>
            <td>{pros.item.item}</td>
            <td>{pros.item.amount}</td>
        </tbody>
        
    );
}

export default TrItem;