import React from "react";
import './theme.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaw} from '@fortawesome/free-solid-svg-icons'
import changeTheme from './state/theme-action-creators'
import { connect } from 'react-redux';
const Theme = (props) =>{
    const styleLight = {
        backgroundColor: '#F6A95E',
    }
    const {changeTheme,clicked} = props;
    
    return(
        <div className='themeBox'>
            <div className='themeBox__arrow'></div>
            <ul>
            <li onClick={
                ()=>{
                    changeTheme('classic');
                    //clicked
                }
                }><div style={{backgroundColor: '#DB8E47',}}><FontAwesomeIcon icon={faPaw} style={{marginRight:'10px',fontSize:'15px',color:'#7B8173',marginLeft:'0.4rem',marginTop:'0.4rem'}}/></div><span>Classic</span> </li>
                <li onClick={()=>{
                    changeTheme('light')
                    // clicked
                }}><div style={{backgroundColor: '#E9DDC3',}}><FontAwesomeIcon icon={faPaw} style={{marginRight:'10px',fontSize:'16px',color:'#F6F2E9',marginLeft:'0.4rem',marginTop:'0.4rem'}}/></div> <span>Light</span></li>
                <li onClick={()=>{
                    changeTheme('dark')
                }}><div style={{backgroundColor: '#8D3716',}}><FontAwesomeIcon icon={faPaw} style={{marginRight:'10px',fontSize:'15px',color:'#06234C',marginLeft:'0.4rem',marginTop:'0.4rem'}}/></div><span>Dark</span> </li>
                <li onClick={()=>{
                    changeTheme('purple')
                }}><div style={{backgroundColor: '#DD9274',}}><FontAwesomeIcon icon={faPaw} style={{marginRight:'10px',fontSize:'15px',color:'#7E789D',marginLeft:'0.4rem',marginTop:'0.4rem'}}/></div><span>Purple</span> </li>
            </ul>
        </div>
    )
}
function mapStateToProps(state) {
    return {
      theme: state.theme.current_theme,     
    }
  }
  
  
export default connect(mapStateToProps, {
    changeTheme
  })(Theme);
