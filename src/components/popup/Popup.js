import React,{Component} from 'react'
import './popup.scss'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun } from '@fortawesome/free-regular-svg-icons'
class Popup extends Component{
    state={
        isOpen:false,
        position:'',
        country:'',
        degree:0,
        description:'',
        // humidity:'',
        // wind:'',
        icon:''
    }
    async componentDidMount(){
        let latitude= -1.2884
        let longitude = 36.8233
        navigator.geolocation.getCurrentPosition((position)=>{
            latitude  = position.coords.latitude;
            longitude = position.coords.longitude;
         
            
        },()=>{console.error('error')})
        setTimeout(async ()=>{
            let apikey='5fd90c67a09815ca08b3dc39a36c4ba8'
            // ${this.state.lat}${this.state.lng}
            let requestURL=`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apikey}`
            
            const res =await axios.get(requestURL);
                
            if(res.status === 200){
            
                this.setState({position:res.data.city.name})
                this.setState({country:res.data.city.country})
                this.setState({degree:Math.round(res.data.list[0].main.temp-273.15)})
                this.setState({description:res.data.list[0].weather[0].main})
                // this.setState({humidity:res.data.list[0].main.humidity})
                // this.setState({wind:res.data.list[0].wind.speed})
                this.setState({icon:`https://openweathermap.org/img/wn/${res.data.list[0].weather[0].icon}@2x.png`})
            }
            
        },1000)
        
    }
    render(){
        const close={
            right:'0rem',
            transform: 'translateX(20.3rem)',
            transition: 'all .5s'
        }
        const open={
            right:'-20.3rem',
            transform: 'translateX(-20rem)',
            transition: 'all .5s'
        }
        
        const months = [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
            "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"
            ];
        const week= ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
        const today=new Date();
        const year = today.getFullYear();
        const day=week[today.getDay()];
        const mounth=months[today.getMonth()];
        const date=today.getDate();

        return(
            

            <div className='popup' style={this.state.isOpen?open:close}>
                 <div className='popup__button' onClick={()=>{
                     this.setState({isOpen:!this.state.isOpen})
                 }

                 }>
                     <FontAwesomeIcon className='rotate' icon={faSun} style={{color:'#fff',fontSize:'1.75rem',marginTop:'0.65rem'}}/>
                    
                 </div>
                 <div  className='popup__content'>
                     <div className='popup__content-top'>
                         Today's weather
                     </div>
                     <div className='popup__content-condition'>
                     <div className='popup__content-condition-right'>
                        
                        <div className='popup__content-condition-right-icon'><img src={this.state.icon}/></div>
                        
                        <h3>{this.state.description}</h3>
                        <h1>{this.state.degree}°C</h1>
                    </div>
                        <div className='popup__content-condition-left'>
                            <h2>{day}</h2>
                            <span>{date} {mounth} {year}<br/></span>
                            <span>📍{this.state.position}, {this.state.country}</span>
                        </div>
                        
                     </div>
                </div>
            </div>
        )
    }
    
}
export default Popup;