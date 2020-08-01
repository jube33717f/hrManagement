import React from "react";


const modalInput = (pros)=>{
    var trueValue = null;
    return(
        <div className="modal__inputBox">
            <label for={pros.id}>{pros.header}<br/>
                <input 
                    type={pros.type} 
                    id={pros.id}
                    name={pros.id}
                    value = {pros.value} 
                    placeholder = {pros.placeholder}
                    min = {pros.type==="number"?1:null}
                    onChange={pros.handleChange} 
                    required /><br/>
            </label>
        </div>
    );
}

export default modalInput;