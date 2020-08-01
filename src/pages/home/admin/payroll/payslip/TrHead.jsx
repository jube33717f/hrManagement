import React from "react";

const TrHead = (pros) =>{
    return(
        <thead>
            <td>{pros.firCol}</td>
            <td>{pros.secCol}</td>
            <td>{pros.thiCol}</td>
        </thead>
    );
}

export default TrHead;