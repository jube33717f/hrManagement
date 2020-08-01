import React from "react";

const modalInput = (pros)=>{
    var trueValue = null;
    switch(pros.id){
        case "name":trueValue = pros.value.name;break;
        case "head":trueValue = pros.value.head;break;
        case "total":trueValue = pros.value.total; break;
        
    }
    return(
        <div className="modal__inputBox">
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
        </div>
    );
}

export default modalInput;