import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes,faEye,faEyeSlash } from '@fortawesome/fontawesome-free-solid'
import {  Link } from "react-router-dom";
import {userLogin} from '../../api/api'
// import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {loginUser} from '../../state/user/user-action-creators'
import './auth.scss';

class Auth extends Component{
    constructor(props){
        super(props);
        this.state={
            account:'',
            accountErr:'',
            password:'',
            passwordErr:'',
            eye:false,
            loginreq:false
        }
    }

    async login(){
        
        if(this.state.account === ''){
            //this.setState({accountErr:'Account format err'})
            alert('account can not be empty')
        }else if(this.state.password === ''){
            //this.setState({passwordErr:'Password cannot be empty'})
            alert('password cannot be empty')
        }else{
            //2.请求
            //this.setState({accountErr:'',passwordErr:'',loginreq:true})
            
            
            // const details = {
            //                 method: 'POST',
            //                 headers: {'Content-Type': 'application/json'},
            //                 body: JSON.stringify({'account': this.state.account, 'password': this.state.password}),
            //                 redirect:'follow'
            //             }
            // let res =await(await fetch(`${BASE}/login`,details)).text();
            let res =(await userLogin(this.state.account,this.state.password)).data;
            
            const {loginUser} = this.props;
            // res = JSON.parse(res)
            if(res.message ==='success'){
                
                sessionStorage.setItem("userid", res.id);
                sessionStorage.setItem("auth", res.auth);
                sessionStorage.setItem("token", res.token);
                let current_user;
                if(res.auth === 'Admin'){
                    current_user={
                        auth:true,
                        email:res.account,
                        firstname: res.firstname,
                        lastname: res.lastname,
                        gender: res.gender,
                        photo: res.photo,
                        experience: res.experience,
                        clients: res.clients,
                        employeeN:res.employee
                    }
                }else {
                    current_user={
                        auth:true,
                        email:res.account,
                        firstname: res.firstname,
                        lastname: res.lastname,
                        gender: res.gender,
                        photo: res.photo,
                        role:res.role,
                        department:res.department,
                        emId:res.emId,
                        
                    }
                }
                
                loginUser(current_user)
                this.props.history.replace("/home")
                
            }else{
                alert('Account or password is wrong!')
            }
            
            
            
            
        }
        

    }
    render(){
        
        
        const regAcc = /^\w+(-\w+)*@[A-Za-z0-9]+((.|-)*[A-Za-z0-9]+).[A-Za-z0-9]+$/;
        const regPw = /^.*(?=.{6,16})(?=.*[A-Za-z]{2,})(?=.*[!@#$%^&*?\(\)]).*$/
        return(
       <div className='authbody' > 
        <div className='auth'>

            <header>    
                {/* <div><FontAwesomeIcon icon={faTimes} style={{marginLeft:'10px',marginTop:'7px'}}/></div> */}
                <Link to='/login'><h2 className='logintext'>Log in </h2></Link>
            </header>
            <div className='auth__info'>
                <div>
                    <label>Account / (Email Account)</label>
                    <label>Account</label>
                    <input onChange={(e)=>{
                        this.setState({account:e.target.value})  
                        if(!regAcc.test(this.state.account)){
                            this.setState({accountErr:'Account format err'})
                        }else{
                            this.setState({accountErr:''})
                        }             
                    }} value={this.state.account}></input>
                    <li>{this.state.accountErr}</li>
                </div>
                <div>
                    <label>Password / (Do not forget to change your original password)</label>
                    <label>Password</label>
                    <input onChange={(e)=>{
                        let v=e.target.value;

                        if(this.state.eye){
                            //e.target.type='text'
                            this.setState({password:v})
                        }else{
                            //e.target.type='password'
                            this.setState({password:v})
                        }
                        if(!regPw.test(this.state.password)){
                            this.setState({passwordErr:'Password format err!'})
                        }else{
                            this.setState({passwordErr:''})
                        }
                        
                    }} value={this.state.passwords} 
                    type={this.state.eye?'text':'password'}></input>
                    {this.state.eye&&<i onClick={()=>{
                        this.setState({eye:false})

                    }}><FontAwesomeIcon icon={faEye}/></i>}
                    {!this.state.eye&&<i onClick={()=>{
                        this.setState({eye:true})
                    }}><FontAwesomeIcon icon={faEyeSlash}/></i>}
                    <li>{this.state.passwordErr}</li>
                </div>
            </div>
            <div className='auth__bt'>
                <button onClick={this.login.bind(this)}>Log in</button>
                
                {/* <Link to='/forgotPassword'>Forgot password</Link>*/}
                <Link to='/changePassword'>Change password</Link> 
                
                
            </div>
        </div>
         </div>
        
        )
    }
}
function mapStateToProps(state) {
    return {
      user: state.user.current_user,     
    }
}

  
export default connect(mapStateToProps, {
    loginUser
  })(Auth);