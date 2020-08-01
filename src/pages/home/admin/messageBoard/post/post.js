// import {userLogin,getUserInfo} from '../../api/api'
import React, { Component } from "react";
import './post.scss';
import '../messageBoard.scss'
// import Menu from '../../../containers/menu/menu'
import {getOnePost,postComment } from '../../../../../api/api'
import { connect } from "react-redux";
// import PageTop from  '../../../../../components/pageTop/pageTop'
class Post extends Component{
    state={
        comments:[],
        commentContent:'',
        post:{},
        content:''
    }
    async componentDidMount(){
        // let res=await (getComments(this.props.history.location.pathname.replace('/post/','')))
        // if(res.status === 200){
  
        //     this.setState({comments:res.data.comment})
        // }
        let res1=await (getOnePost(this.props.history.location.pathname.replace('/home/Post/','')))
        if(res1.status === 200){
  
            this.setState({
                post:res1.data.result,
                content:res1.data.result.content,
                comments:res1.data.result.comments})
        }
        
    }
    postComment=async ()=>{
        let comment = [...this.state.comments,{
            Username:this.props.user.firstname+' '+this.props.user.lastname,
            Userphoto:this.props.user.photo,
            CommentTime:(new Date()+'').substring(0,24),
            content:this.state.commentContent
        }]
        let res = await (postComment(
            this.props.history.location.pathname.replace('/home/Post/',''),{"comments":comment}
            ))
        if(res.status === 200){
           this.setState({commentContent:""})
            alert('posted')
            
    
            let res1=await (getOnePost(this.props.history.location.pathname.replace('/home/Post/','')))
            if(res1.status === 200){
  
                this.setState({
                    post:res1.data.result,
                    content:res1.data.result.content,
                    comments:res1.data.result.comments})
                }
            }
    }
    
    render(){
        
        return(
            <>
            <div className='postss'>
            
                <div className='postss__post'>
                        <div className='postss__postbar'>   
                            
                            <div className='postss__postbar-img'>
                                <img src={this.state.post.photo}/>
                            </div>
                            <p>
                                <h4>{this.state.post.name}</h4> on <span>{this.state.post.postTime}</span></p>
                            <span>{this.state.post.tag}</span>  
                        </div>
                        <div className='postss__postcontent'>
                            <p>{this.state.content.split('<br/>').join('\n')}</p> 
                        </div>
                        
                        {this.state.post.Content_Img!==''&&
                        <div className='posts__postcontentImg'>
                            {this.state.post.img===''?null:<img src={this.state.post.img}/>}
                        </div>}
                        <div className='comment'>
                            < textarea 
                            onChange={(e)=>{
                                this.setState({commentContent:e.target.value})
                            }}
                            value={this.state.commentContent}
                            ></ textarea>
                            <button onClick={this.postComment}>Post</button>
                        </div>
                        {this.state.comments.length>0&&this.state.comments.sort((a,b)=>new Date(b.CommentTime)-new Date(a.CommentTime)).map((item,index)=>
                        <div className='comments'>
                            <div className='comments__comment'>
                                <img src={item.Userphoto}></img> 
                                <h4>{item.Username}<span style={{color:'#000'}}>on {item.CommentTime}</span></h4>
                                <div className='comments__comment-content'>
                                <p>{item.content.split('<br/>').join('\n')}</p>
                                </div>
                                
                            </div>

                        </div>)}
                        
                </div>
               
            </div>
            
            </>
        )
    }
}
function mapStateToProps(state) {
    return {
      user: state.user.current_user,     
    }
}

  
export default connect(mapStateToProps, {})(Post);