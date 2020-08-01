import React, { useState , Component} from "react";

export default class Blink extends Component {
    constructor(props){
        super(props);
        this.state={showText:true};
        setInterval(()=>{
            this.setState(previousState=>{
                return {showText:!previousState.showText}
            })
        }, 500)
    }
    render(){
        let display=this.state.showText ? this.props.text: ' ';
        return(
            <h2>{display}</h2>
        )
    }
}
