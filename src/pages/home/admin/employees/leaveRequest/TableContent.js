import React from 'react';

const TableContent=props=>{

    return(
        <tr>
            <td><img class='profile-photo' src="https://pbs.twimg.com/profile_images/1036730403514736650/PCRxFiEt_400x400.jpg"/></td>
            <td><b>{props.name}</b></td>
            <td>{props.employeeID}</td>
            <td>{props.leaveType}</td>
            <td>{props.date}</td>
            <td>{props.reason}</td>
            <td>
                <a href="#" class='icon-yes'><i class="fas fa-check-square"></i></a>
                <a href="#" class='icon-no'><i class="fas fa-ban"></i></a>
            </td>
        </tr>
    )
}

export default TableContent;