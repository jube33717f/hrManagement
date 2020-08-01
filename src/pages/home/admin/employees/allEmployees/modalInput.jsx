import React from "react";

const modalInput = (pros)=>{
    var trueValue = null;
    var type = null;
    switch(pros.id){
        case "firstname":{trueValue = pros.value.firstname;
                            type = 1}break;
        case "lastname":{trueValue = pros.value.lastname;
                            type = 1}break;
        case "mobile":{trueValue = pros.value.mobile;
                            type = 1}break;
        case "startDate":{trueValue = pros.value.startDate;
                            type = 1} break;
        case "role":{trueValue = pros.value.role;
                            type = 2} break;
        case "department":{trueValue = pros.value.role;
                            type = 3} break;
                            
    }
    return(
        <div className="modal__inputBox">
            {type != 2 && type != 3 &&
            <label for={pros.id}>{pros.header}<br/>
                <input 
                    onChange={pros.handleChange} 
                    type={pros.type} 
                    id={pros.id}
                    name={pros.id}
                    value = {trueValue} 
                    placeholder = {pros.placeholder}
                    min = {pros.type==="number"?1:null}
                    required /><br/>
            </label>
            }
            {type == 2 &&
            <label for={pros.id}>{pros.header}<br/>
                <select 
                    id={pros.id} 
                    name={pros.id} 
                    onChange={pros.handleChange}  
                    required>
                    <option value="employee" selected="selected">Employee</option>
                    <option value="head">Head</option>
                </select>
            </label>
            }
            {type == 3 &&
            <label for={pros.id}>{pros.header}<br/>
                <select 
                    id={pros.id} 
                    name={pros.id} 
                    onChange={pros.handleChange}  
                    required>
                    <option value="Development" selected="selected">Development</option>
                    <option value="Marketing">Marketing</option>
                    <option value="App Development">App Development</option>
                    <option value="Support">Support</option>
                    <option value="Accounts">Accounts</option>
                    <option value="others">others</option>
                </select>
            </label>
            }   
        </div>
    );
}

export default modalInput;