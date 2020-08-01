import React, { Component } from "react";
import PageTop from  '../../../../components/pageTop/pageTop'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComments, faThumbsUp, faThumbsDown,faChevronCircleDown} from '@fortawesome/free-solid-svg-icons'
import {getMyPosts} from '../../../../api/api'
import './myPosts.scss'
export default class MyPosts extends Component{
    state={
        posts:[],
        active:[],
        items:3,
        page:1,
    }
    async componentDidMount(){
        let res = await(getMyPosts())
        
        if(res.status === 200){
            console.log(res.data)
            this.setState({posts:res.data.result.map((item)=>{
                return({
                    name : item.name,
                    photo : item.photo,
                    tag : item.tag,
                    postTime: item.postTime,
                    content : item.content,
                    img : item.img,
                    like: item.like,
                    dislike:item.dislike,
                    comments:item.comments,
                    id:item._id,
                });
            }),total:res.data.total})
            setTimeout(()=>{
            const len = this.state.posts.length
            console.log(this.state.posts)
            let arr=[...Array(len)].map(_=>false)
            this.setState({active:arr,items:len})} ,500)        
        }
    }
    showItems(){
        let items = [];
        const posts = this.state.posts
        console.log(posts)
        if(posts.length===0) return;
        for(let i=0; i<this.state.posts.length; i++){
            items.push(
                <div className='posts__post'>
                <div className='posts__postbar'>          
                    <div className='posts__postbar-img'>
                        <img src={posts[i].photo}/>
                    </div>
                    <p><h4>{posts[i].name}</h4> on <span>{posts[i].postTime}</span></p>
                    <div className='posts__postbar-button'>
                        <button >Edit</button>
                        <button >Delete</button>
                    </div>
                    <span>{posts[i].tag}</span>  
                    
                </div>
                <div className='posts__postcontent'>
                
                {posts[i].content.length>600?this.state.active[i]?
                <><p>{posts[i].content}</p> <span>
                <FontAwesomeIcon 
                className="posts__postcontent-icon posts__postcontent-iconActive"
                icon={faChevronCircleDown}
                onClick={()=>{
                    let arr=[...this.state.active]
                    arr[i]=false
                    this.setState({active:arr})
                }}
                />
            </span></>:
                <><p >{posts[i].content.substring(0,600)}...</p>
                <span>
                    <FontAwesomeIcon 
                    className='posts__postcontent-icon'
                    icon={faChevronCircleDown}
                    onClick={()=>{
                        let arr=[...this.state.active]
                        arr[i]=true
                        this.setState({active:arr})
                    }}
                    />
                </span></>:
                <p>{posts[i].content}</p>}
                    
                
                
                </div>
                
                {posts[i].img!=='string'&&posts[i].img!==''&&
                <div className='posts__postcontentImg'>
                    <img src={posts[i].img}/>
                </div>}
                <ul>
                    <li><FontAwesomeIcon icon={faComments}/>{0}Comments</li>
                    <li>
                        <FontAwesomeIcon 
                        icon={faThumbsUp}
                        onClick={()=>{this.handlerLike(`${posts[i].id}`)}}
                        />{posts[i].like}</li>
                    <li>
                        <FontAwesomeIcon 
                        icon={faThumbsDown}
                        onClick={()=>{this.handlerDislike(`${posts[i].id}`)}}
                        />{posts[i].dislike}</li>
                </ul>
            </div>
            )
        }
        return items;
    }
    render(){
        return(
        
        <><PageTop currentPage='My posts' currentPath='/ My posts'/>
        <div className='posts'>
        {this.showItems()}
        </div></>

        )
    }
}