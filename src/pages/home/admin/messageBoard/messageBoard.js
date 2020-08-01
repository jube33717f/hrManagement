//<PageTop currentPage='Message Board' currentPath='/ Message Board'/>
import React, { PureComponent } from "react";
import PageTop from  '../../../../components/pageTop/pageTop'
import './messageBoard.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSmile, faImages, faTags,faComments, faThumbsUp, faThumbsDown,faChevronCircleDown} from '@fortawesome/free-solid-svg-icons'
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'
import FilterBar from "../../../../components/FilterBar/filterBar";
import ImageUploading from "react-images-uploading";
import './imgUpload.scss'
import {putAdmin,changeEmployee, getMessages,getMessagesReverse,getMessagesPopular,getMessagesTopic,getMessagesSearch,postMessage,editMessage,deleteMessage,likeMessage,dislikeMessage} from '../../../../api/api'
import { connect } from "react-redux";

class MessageBoard extends PureComponent{

    state={
        emoji:'',
        emojiShow:false,
        imgShow:false,
        tagShow:false,
        textAreaShow:false,
        tags:'',
        tagsSubmit:'',
        postContent:'',
        searchContent:'',
        img:'', 
        active:[],
        //无限滚动
        items:3,
        page:1,
        loading:false,
        posts:[],
        total:0,
        topic:'All',
        type:'all'


        
    }
   
    async componentDidMount(){
        const date=new Date().toString()
        if(sessionStorage.getItem('auth') === 'Admin'){
            await putAdmin({
                "messageReadTime":date
            })
            
        }else{
            await changeEmployee(sessionStorage.getItem('userid'),{
                "messageReadTime":date,
                "taxFileNumber":'1234567'
            })
            

        }
        
        this.load()
        setTimeout(this.refs.myscroll.addEventListener("scroll", () => {
            if(this.state.posts.length>=this.state.total) return
            if (
              this.refs.myscroll.scrollTop + this.refs.myscroll.clientHeight >=
              this.refs.myscroll.scrollHeight ) {
              this.loadMore();
            }
          }),500)
        
    }
    showItems(){
        let items = [];
        const posts = this.state.posts
        if(posts.length===0) return;
        for(let i=0; i<this.state.posts.length; i++){
            let like=posts[i].likePeople
            let dislike=posts[i].disLikePeople
            items.push(
                <div className='posts__post'>
                <div className='posts__postbar'>          
                    <div className='posts__postbar-img'>
                        <img src={posts[i].photo}/>
                    </div>
                    <p><h4>{posts[i].name}</h4> on <span>{posts[i].postTime}</span></p>
                    <span className='tag'>{posts[i].tag}</span>  
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
                    <li>
                        <FontAwesomeIcon 
                        icon={faComments}
                        className={"cursor"}
                        onClick={()=>{
                            this.props.history.push(`/home/Post/${posts[i].id}`)
                        }}
                        /> {posts[i].comments.length}Comments</li>
                    <li>
                        <FontAwesomeIcon 
                        icon={faThumbsUp}
                        className={like?"vote":"cursor"}
                        onClick={()=>{this.handlerLike(`${posts[i].id}`)}}
                        />{posts[i].like}</li>
                    <li>
                        <FontAwesomeIcon 
                        icon={faThumbsDown}
                        className={dislike?"vote":"cursor"}
                        // className={posts[i].dislikePeople?"vote":null}
                        onClick={()=>{this.handlerDislike(`${posts[i].id}`)}}
                        />{posts[i].dislike}</li>
                </ul>
            </div>
            )
        }
        return items;
    }
    async loadMore(){
        this.setState({ loading: true, page:this.state.page+1 });
        let res;
        switch(this.state.type){
            case 'all': res = await(getMessages(this.state.page,3));break;
            case 'timeReverse': res = await(getMessagesReverse(this.state.page,3));break;
            case 'popular': res = await(getMessagesPopular(this.state.page,3));break;
            case 'topic':{
                if(this.state.topic === 'All'){res = await(getMessages(this.state.page,3));break;}
                res = await(getMessagesTopic(this.state.page,3,this.state.topic));break;
            } 
            default:res.status = 0;
        }
        
        if(res.status === 200){
        
            this.setState({posts:this.state.posts.concat(res.data.result.map((item)=>{
                return({
                    name : item.name,
                    photo : item.photo,
                    tag : item.tag,
                    postTime: item.postTime,
                    content : item.content,
                    img : item.img,
                    like: item.like,
                    likePeople:item.likePeople,
                    dislike:item.dislike,
                    comments:item.comments,
                    id:item._id,
                });
            }))})
            
            setTimeout(()=>{
                const len = this.state.posts.length
                let arr=[...Array(len)].map(_=>false)
                this.setState({active:arr,items:len, loading: false})
              
            }
                
            ,5000)
            
        }
        
        
        
    }
    postHandler=async ()=>{
        // "name": name,
        // "photo": photo,
        // "writerId": writerId,
        // "writerRole": writerRole,
        // "tag": tag,
        // "content":content,
        // "img": img
   
        if(this.state.postContent==='') return
        
        alert(this.state.tagsSubmit)    
        let res =(await postMessage(
            this.props.user.firstname+' '+this.props.user.lastname,
            this.props.user.photo,
            sessionStorage.getItem("userid"),
            this.props.user.role,
            this.state.tagsSubmit,
            this.state.postContent,
            this.state.img
            )).data;
        if(res.message === 'Created'){
            //再拉去一次messages
            this.setState({page:1})
            let res = await(getMessages(this.state.page,3))
            if(res.status === 200){
                this.setState({posts:res.data.result.map((item)=>{
                    return({
                        name : item.name,
                        photo : item.photo,
                        tag : item.tag,
                        postTime: item.postTime,
                        content : item.content,
                        img : item.img,
                        like: item.like,
                        likePeople:(JSON.stringify(item.likePeople)==='[]'||item.likePeople.indexOf(this.props.user.id) === -1?false:true),
                        disLikePeople:(JSON.stringify(item.dislikePeople)==='[]'||item.dislikePeople.indexOf(this.props.user.id) === -1?false:true),
                        dislike:item.dislike,
                        comments:item.comments,
                        id:item._id,
                    });
                }),total:res.data.total})
                
                const len = this.state.posts.length
                let arr=[...Array(len)].map(_=>false)
                this.setState({active:arr,items:len,postContent:''})      
            }
        }
            
        
    }
    handlerLike=async (id)=>{
        let res = await likeMessage(id,sessionStorage.userid)
 
        if(res.status === 200){
            this.load();
        }
    }
    handlerDislike=async (id)=>{
        let res = await dislikeMessage(id,sessionStorage.userid)
        if(res.status === 200){
            this.load();

        }
    }
    searchHandler=async ()=>{
        //search=>this.state.searchContent(later change to this.props.searchContent)
        if(this.state.searchContent === ''){
            this.setState({type:'all'})
            this.load();
            return
        }
        this.setState({type:'none'})
        let res = await getMessagesSearch(this.state.searchContent)
        if(res.status === 200){
 
            this.setState({posts:res.data.result.map((item)=>{
                return({
                    name : item.name,
                    photo : item.photo,
                    tag : item.tag,
                    postTime: item.postTime,
                    content : item.content,
                    img : item.img,
                    like: item.like,
                    likePeople:(JSON.stringify(item.likePeople)==='[]'||item.likePeople.indexOf(this.props.user.id) === -1?false:true),
                    disLikePeople:(JSON.stringify(item.dislikePeople)==='[]'||item.dislikePeople.indexOf(this.props.user.id) === -1?false:true),
                    dislike:item.dislike,
                    comments:item.comments,
                    id:item._id,
                });
            }),total:res.data.total})
            setTimeout(()=>{
            const len = this.state.posts.length
            let arr=[...Array(len)].map(_=>false)
            this.setState({active:arr,items:len})} ,500)        
        }
    }
    load=async ()=>{
        this.setState({type:'all'})
        let res = await(getMessages(this.state.page,3))
        if(res.status === 200){
            this.setState({posts:res.data.result.map((item)=>{
                return({
                    name : item.name,
                    photo : item.photo,
                    tag : item.tag,
                    postTime: item.postTime,
                    content : item.content,
                    img : item.img,
                    like: item.like,
                    likePeople:(JSON.stringify(item.likePeople)==='[]'||item.likePeople.indexOf(this.props.user.id) === -1?false:true),
                    disLikePeople:(JSON.stringify(item.dislikePeople)==='[]'||item.dislikePeople.indexOf(this.props.user.id) === -1?false:true),
                    dislike:item.dislike,
                    comments:item.comments,
                    id:item._id,
                });
            }),total:res.data.total})
            setTimeout(()=>{
            const len = this.state.posts.length
            let arr=[...Array(len)].map(_=>false)
            this.setState({active:arr,items:len})} ,500)        
        }
    }
    changeContent=(e)=>{
        this.setState({searchContent:e.target.value})
    }
    loadReverse=async ()=>{
        this.setState({type:'timeReverse'})
        let res = await(getMessagesReverse(this.state.page,3))
        if(res.status === 200){
            this.setState({posts:res.data.result.map((item)=>{
                return({
                    name : item.name,
                    photo : item.photo,
                    tag : item.tag,
                    postTime: item.postTime,
                    content : item.content,
                    img : item.img,
                    like: item.like,
                    llikePeople:(JSON.stringify(item.likePeople)==='[]'||item.likePeople.indexOf(this.props.user.id) === -1?false:true),
                    disLikePeople:(JSON.stringify(item.dislikePeople)==='[]'||item.dislikePeople.indexOf(this.props.user.id) === -1?false:true),
                    dislike:item.dislike,
                    comments:item.comments,
                    id:item._id,
                });
            }),total:res.data.total})
            setTimeout(()=>{
            const len = this.state.posts.length
            let arr=[...Array(len)].map(_=>false)
            this.setState({active:arr,items:len})} ,500)        
        }
    }
    loadPopular=async ()=>{
        this.setState({type:'popular'})
        let res = await(getMessagesPopular(this.state.page,3))
        if(res.status === 200){
            this.setState({posts:res.data.result.map((item)=>{
                return({
                    name : item.name,
                    photo : item.photo,
                    tag : item.tag,
                    postTime: item.postTime,
                    content : item.content,
                    img : item.img,
                    like: item.like,
                    likePeople:(JSON.stringify(item.likePeople)==='[]'||item.likePeople.indexOf(this.props.user.id) === -1?false:true),
                    disLikePeople:(JSON.stringify(item.dislikePeople)==='[]'||item.dislikePeople.indexOf(this.props.user.id) === -1?false:true),
                    dislike:item.dislike,
                    comments:item.comments,
                    id:item._id,
                });
            }),total:res.data.total})
            setTimeout(()=>{
            const len = this.state.posts.length
            let arr=[...Array(len)].map(_=>false)
            this.setState({active:arr,items:len})} ,500)        
        }
    }
    topicHandler=async(topic)=>{
        // this.setState({type:'all'})
        this.setState({topic:topic})
        let res;
        setTimeout(async()=>{
            if(this.state.topic === 'All'){
                res = await(getMessages(this.state.page,3));
            }else{
                res = await(getMessagesTopic(this.state.page,3,this.state.topic));
            }
    
            if(res.status === 200){
                this.setState({posts:res.data.result.map((item)=>{
                    return({
                        name : item.name,
                        photo : item.photo,
                        tag : item.tag,
                        postTime: item.postTime,
                        content : item.content,
                        img : item.img,
                        like: item.like,
                        likePeople:(JSON.stringify(item.likePeople)==='[]'||item.likePeople.indexOf(this.props.user.id) === -1?false:true),
                        disLikePeople:(JSON.stringify(item.dislikePeople)==='[]'||item.dislikePeople.indexOf(this.props.user.id) === -1?false:true),
                        dislike:item.dislike,
                        comments:item.comments,
                        id:item._id,
                    });
                }),total:res.data.total})
                setTimeout(()=>{
                const len = this.state.posts.length
                let arr=[...Array(len)].map(_=>false)
                this.setState({active:arr,items:len})} ,500)        
            }
        },500)
    }
    addEmoji=(emoji)=>{
        
        this.setState({
            postContent:this.state.postContent+emoji.native,
            emojiShow:!this.state.emojiShow
        })
    }
    render(){
    
        const maxNumber = 1;
        return(
        
        <><PageTop currentPage='Message Board' currentPath='/ Message Board'/>


        <div className='messageBoard'>
            <section className='post' >
                <ul>
                    <li onClick={()=>{
                        this.setState({textAreaShow:!this.state.textAreaShow})
                    }}>
                        <FontAwesomeIcon icon={faChevronCircleDown} style={this.state.textAreaShow?null:{transform:'rotate(180deg)'}}/>
                    </li>
                    <li 
                    onClick={()=>{this.setState({emojiShow:!this.state.emojiShow})}}
                    >
                        <FontAwesomeIcon icon={faSmile} />
                    </li>
                    {this.state.emojiShow&&
                    <div className='emojibox'>
                        <Picker className='emojibox' set='apple' onClick={this.addEmoji}/>
                    </div>
                    }
                    
                    <li 
                    onClick={()=>{this.setState({imgShow:!this.state.imgShow})}}
                    >
                        <FontAwesomeIcon icon={faImages}/>
                    </li>
                    {this.state.imgShow&&
                    <div className='imgbox'>
                        <ImageUploading multiple onChange={(imageList)=>{
                  
                        }} maxNumber={maxNumber}>
                            {({ imageList, onImageUpload, onImageRemoveAll }) => (
                            // write your building UI
                            <div className="upload__image-wrapper">
                                
                                <button className='post-btn' onClick={onImageUpload}>Upload</button>
                                <button className='post-btn' onClick={onImageRemoveAll}>Remove</button>
                                {imageList.map(image => (
                                <div key={image.key} className="image-item">
                                    <img src={image.dataURL} alt="" width="100" />
                                    <div className="image-item__btn-wrapper">
                                    <button
                                        className='post-btn btn'
                                        onClick={() => {
                                        image.onUpdate();
                                        }}
                                    >
                                        Update
                                    </button>
                                    {/* <button className='post-btn' onClick={image.onRemove}>Remove</button> */}
                                    </div>
                                </div>
                                ))}
                            </div>
                            )}
                        </ImageUploading>
                    </div>
                    }
                    <li onClick={()=>{this.setState({tagShow:!this.state.tagShow})}}
                    ><FontAwesomeIcon icon={faTags}/></li>
                    {this.state.tagShow&&
                    <div className='tagbox'>
                        <input 
                        placeholder="format:#..#,#..#"
                        onChange={(e)=>{
                            this.setState({tags:e.target.value})
                        }}
                        value={this.state.tags}
                        ></input>
                        <p></p>
                        <button 
                            className='post-btn'
                            onClick={()=>{
                                if(this.state.tags!==''){
                                    this.setState({tagsSubmit:this.state.tags})
                                }
                        }}
                        >Submit</button>
                        <p>{this.state.tagsSubmit}</p>
                    </div>
                    }
                    {/* <button className='post-btn'>Cancel</button> */}
                    <button className='post-btn'
                    onClick={this.postHandler}
                    >Post</button>
                    
                </ul>
                {this.state.textAreaShow&&
                <textarea
                    onChange={(e)=>{
                        this.setState({postContent:e.target.value})
                    }}
                    value={this.state.postContent}
                >

                </textarea>}
                
                
                
            </section>
            <section className='filter'>
                <FilterBar 
                searchContent={this.state.searchContent} 
                changeContent={this.changeContent}  
                searchHandler={this.searchHandler}

                load={this.load}
                loadReverse={this.loadReverse}
                loadPopular={this.loadPopular}

                selectTopic={this.topicHandler}
                topic={this.state.topic}
                />
            </section>
            <section className='posts' ref="myscroll">
                {this.showItems()}
                {this.state.loading?<p className='posts__loading'>...loading</p>:''}
                
                

            </section>

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

  
export default connect(mapStateToProps, {})(MessageBoard);